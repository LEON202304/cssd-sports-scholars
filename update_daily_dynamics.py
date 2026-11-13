#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
体育学人门户 · 每日动态日报（C 刊官网 + 体育院校官网）

由 GitHub Actions（.github/workflows/update-papers.yml）与论文/学界动态同调度运行，
也可本地运行：  pip install requests beautifulsoup4 lxml && python update_daily_dynamics.py

数据来源（scrapers/sportsmon/，自 sports-monitor 工具移植，均为官网公开列表页）：
  - 体育学 CSSCI 来源期刊 12 种：当期目录 / 网络首发 / 最新发表
  - 全国独立设置体育院校 14 所：校园要闻 / 通知公告 / 学校主页等栏目

输出：
  daily-dynamics.json  {generatedAt, source, statusHint, items:[
      {cat:"期刊"|"院校", source, section, title, date, link}, ... ]}
  前端首页「每日动态」频道读取渲染（home-daily.js）。

安全约束：
  - 每个源独立 try/except + 超时，单源失败不影响其他源；
  - 单个源返回 0 条或抛错时，按退避再抓几次；
  - 重试后仍为空、且上一版已提交快照里该源有条目时，原样沿用那些条目
    （日期、链接、标题、来源及其他字段都不改；空日期保持为空），
    再套用原有的日期窗口与条数上限；
  - 所有源都失败时不写文件（绝不清空）；
  - 期刊每刊最多 4 条；院校每校最多 5 条且优先近 14 天有日期条目；
  - 不访问登录页，不处理验证码，不绕过访问控制；遇防火墙/人机验证的源直接跳过。
"""
from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT_FILE = ROOT / "daily-dynamics.json"

MAX_PER_JOURNAL = 4     # 每刊最多条数
MAX_PER_UNIV = 5        # 每校最多条数
UNIV_WINDOW_DAYS = 14   # 院校新闻保留近 14 天
UNIV_UNDATED_CAP = 2    # 每校无日期条目上限（主页轮播类）
TOTAL_CAP = 120         # 输出总量上限
WORKERS = 4
# 整源重试：夜间官网常直接返回空页。含首次共 3 次，两次间隔 2s、5s。
SOURCE_ATTEMPTS = 3
SOURCE_BACKOFF_SEC = (2.0, 5.0)

BJT = dt.timezone(dt.timedelta(hours=8))

sys.path.insert(0, str(ROOT))
from scrapers.sportsmon import config as SM_CONFIG        # noqa: E402
from scrapers.sportsmon.fetcher import Fetcher            # noqa: E402
from scrapers.sportsmon.parsers import run_source         # noqa: E402


def log(msg: str) -> None:
    print(msg, flush=True)


def today_bjt() -> dt.date:
    return dt.datetime.now(BJT).date()


def clean(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


# —— 脏标题过滤（抓取侧）————————————————————————————
# 规则：strip 后为空、长度 < MIN_TITLE_LEN、或命中黑名单（短词仅精确匹配，
# ≥4 字短语允许子串命中）。MIN_TITLE_LEN=6：4 字壳标题（动态速递/期刊新闻/
# 期刊导读/通知公告）一律丢弃；6 字及以上真实标题（如「干部任前公示」）保留。
MIN_TITLE_LEN = 6
_TITLE_EXACT_BLOCK = {
    "首页", "更多", "版权", "网站地图", "无标题", "untitled", "no title",
    "通知公告", "期刊新闻", "期刊导读", "动态速递",
    "null", "none", "n/a", "na", "-", "—", "–",
}
_TITLE_CONTAIN_BLOCK = (
    "通知公告", "期刊新闻", "期刊导读", "动态速递", "网站地图", "无标题",
)


def is_noise_title(title: str | None) -> bool:
    """True = 应丢弃的壳/噪声标题。"""
    t = clean(title)
    if not t:
        return True
    if len(t) < MIN_TITLE_LEN:
        return True
    low = t.lower()
    if t in _TITLE_EXACT_BLOCK or low in _TITLE_EXACT_BLOCK:
        return True
    for phrase in _TITLE_CONTAIN_BLOCK:
        if phrase in t or phrase.lower() in low:
            return True
    return False


def date_key(d: str) -> str:
    d = (d or "").strip()
    if re.fullmatch(r"\d{4}-\d{2}", d):
        return d + "-00"
    if re.fullmatch(r"\d{4}", d):
        return d + "-00-00"
    return d


def in_window(d: str, days: int, today: dt.date | None = None) -> bool:
    if today is None:
        today = today_bjt()
    k = date_key(d)
    m = re.match(r"^(\d{4})-(\d{2})(?:-(\d{2}))?", k)
    if not m:
        return False
    try:
        base = dt.date(int(m.group(1)), int(m.group(2)), int(m.group(3) or "01"))
    except ValueError:
        return False
    return (today - base).days <= days


def collect(src: dict) -> list[dict]:
    arts = run_source(Fetcher(), src)
    out = []
    for a in arts:
        if a.note or not a.url or not a.title:
            continue
        title = clean(a.title)
        if is_noise_title(title):
            continue
        out.append({"cat": "期刊" if src.get("category", "期刊") == "期刊" else "院校",
                    "source": a.source_name, "section": a.section,
                    "title": title, "date": a.date,
                    "link": a.url})
    return out


def load_previous_by_source(path: Path | None = None) -> dict[str, list[dict]]:
    """按 source 分组读取已提交快照。读不到文件时返回空，不编造条目。"""
    path = OUT_FILE if path is None else path
    if not path.is_file():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        log(f"::warning::无法读取上一版 {path.name}（{type(e).__name__}），本次不沿用历史条目。")
        return {}
    items = data.get("items") if isinstance(data, dict) else None
    if not isinstance(items, list):
        return {}
    grouped: dict[str, list[dict]] = {}
    for it in items:
        if not isinstance(it, dict):
            continue
        name = it.get("source")
        if not isinstance(name, str) or not name:
            continue
        grouped.setdefault(name, []).append(dict(it))
    return grouped


def copy_items(items: list[dict]) -> list[dict]:
    """原样拷贝。空日期仍是空字符串，不补今天，不加字段。"""
    return [dict(it) for it in items]


def scrape_source(src: dict, *, name: str | None = None, collect_fn=None,
                  attempts: int = SOURCE_ATTEMPTS, backoff=SOURCE_BACKOFF_SEC,
                  sleeper=None):
    """抓一个源。0 条或抛错都重试，成功即停。返回 (items, error, used, notes)。"""
    collect_fn = collect if collect_fn is None else collect_fn
    sleeper = time.sleep if sleeper is None else sleeper
    label = name or src.get("name") or "?"
    last_error: Exception | None = None
    notes: list[str] = []
    for attempt in range(1, attempts + 1):
        try:
            got = collect_fn(src)
        except Exception as e:  # noqa: BLE001
            got = []
            last_error = e
        else:
            last_error = None
        if not got:
            got = []
        if got:
            return got, None, attempt, notes
        if attempt < attempts:
            delay = backoff[min(attempt - 1, len(backoff) - 1)]
            why = "失败" if last_error else "0 条"
            notes.append(f"  · {label}  第 {attempt} 次{why}，{delay:g}s 后重试")
            sleeper(delay)
    return [], last_error, attempts, notes


def settle_source(fetched: list[dict], error: Exception | None,
                  previous_items: list[dict]) -> tuple[list[dict], str]:
    """非空抓取用本次结果。仍为空且上一版有该源时，原样沿用。

    返回的 status：fresh / carry / error / empty。
    日期窗口与条数上限不在这里做，交给 assemble_items，和当场抓到这些条目时一样。
    """
    if fetched:
        return list(fetched), "fresh"
    if previous_items:
        return copy_items(previous_items), "carry"
    if error is not None:
        return [], "error"
    return [], "empty"


def carry_warning(name: str, count: int, attempts: int,
                  error: BaseException | None) -> str:
    if error is None:
        reason = "空结果（0 条）"
    else:
        detail = str(error).replace("\n", " ")[:120]
        reason = f"失败（{type(error).__name__}: {detail}）"
    return (
        f"::warning::{name} 连续 {attempts} 次抓取{reason}，"
        f"沿用上一版快照中的 {count} 条；条目字段保持原样，仍按既有日期窗口与条数上限过滤。"
    )


def assemble_items(results: dict[str, list[dict]], *,
                   today: dt.date | None = None) -> list[dict]:
    """与原先 main 里的筛选相同：期刊条数上限、院校日期窗口、去重、总量上限。"""
    if today is None:
        today = today_bjt()

    # —— 期刊：每刊最多 MAX_PER_JOURNAL 条 ——
    j_items: list[dict] = []
    for name in sorted(results):
        items = sorted(results[name], key=lambda x: date_key(x["date"]), reverse=True)
        j_items.extend(items[:MAX_PER_JOURNAL])

    # —— 院校：优先近窗口内有日期条目；无日期仅补足（每校上限 UNIV_UNDATED_CAP）——
    u_items: list[dict] = []
    for name in sorted(results):
        items = results[name]
        dated = [x for x in items if x["date"] and in_window(x["date"], UNIV_WINDOW_DAYS, today)]
        dated.sort(key=lambda x: date_key(x["date"]), reverse=True)
        undated = [x for x in items if not x["date"]][:UNIV_UNDATED_CAP]
        u_items.extend((dated + undated)[:MAX_PER_UNIV])

    # —— 合并去重（source+title）——
    seen: set[tuple[str, str]] = set()
    merged: list[dict] = []
    for it in j_items + u_items:
        k = (it["source"], clean(it["title"]).lower())
        if k in seen:
            continue
        seen.add(k)
        merged.append(it)
    merged = merged[:TOTAL_CAP]
    merged.sort(key=lambda x: date_key(x["date"]), reverse=True)
    return merged


def gather(jobs, previous: dict[str, list[dict]], *, collect_fn=None,
           attempts: int = SOURCE_ATTEMPTS, backoff=SOURCE_BACKOFF_SEC,
           sleeper=None, log_fn=None, workers: int = WORKERS):
    """抓取全部源。返回 (results, ok, bad, carried)。"""
    log_fn = log if log_fn is None else log_fn
    outcomes: dict[str, tuple] = {}
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futs = {
            ex.submit(scrape_source, src, name=name, collect_fn=collect_fn,
                      attempts=attempts, backoff=backoff, sleeper=sleeper): name
            for name, src in jobs
        }
        for fut in as_completed(futs):
            name = futs[fut]
            try:
                outcomes[name] = fut.result()
            except Exception as e:  # noqa: BLE001
                outcomes[name] = ([], e, attempts, [])

    results: dict[str, list[dict]] = {}
    ok: list[str] = []
    bad: list[str] = []
    carried: list[str] = []
    for name, _src in jobs:
        fetched, error, used, notes = outcomes[name]
        for line in notes:
            log_fn(line)
        items, status = settle_source(fetched, error, previous.get(name) or [])
        if status == "fresh":
            results[name] = items
            ok.append(name)
            suffix = f"（第 {used} 次）" if used > 1 else ""
            log_fn(f"  ✓ {name}  {len(items)} 条{suffix}")
        elif status == "carry":
            results[name] = items
            ok.append(f"{name}(沿用)")
            carried.append(name)
            log_fn(carry_warning(name, len(items), attempts, error))
        elif status == "error":
            bad.append(name)
            detail = str(error).replace("\n", " ")[:120]
            log_fn(f"  ✗ {name}  失败 {type(error).__name__}: {detail}")
        else:
            ok.append(f"{name}(0)")
            log_fn(f"  · {name}  0 条")
    return results, ok, bad, carried


def main() -> int:
    log(f"== 体育学人 · 每日动态日报  {dt.datetime.now(BJT):%Y-%m-%d %H:%M} 北京时间 ==")
    jobs = [(s["name"], s) for s in SM_CONFIG.JOURNALS if s.get("enabled")]
    jobs += [(s["name"], s) for s in SM_CONFIG.UNIVERSITIES]
    previous = load_previous_by_source(OUT_FILE)
    log(f"上一版快照：{sum(len(v) for v in previous.values())} 条 / {len(previous)} 个源")
    results, ok, bad, carried = gather(jobs, previous)
    merged = assemble_items(results)

    if not merged:
        log("::warning::全部源均失败或 0 条，不写文件，保留现有 daily-dynamics.json。")
        return 0

    snap = {
        "generatedAt": today_bjt().isoformat(),
        "source": "C刊官网 + 体育院校官网（GitHub Actions 每日）",
        "statusHint": "live",
        "items": merged,
    }
    txt = json.dumps(snap, ensure_ascii=False, indent=2) + "\n"
    if OUT_FILE.exists() and OUT_FILE.read_text(encoding="utf-8") == txt:
        log("daily-dynamics.json 内容无变化，未重写")
    else:
        OUT_FILE.write_text(txt, encoding="utf-8")
        log(f"daily-dynamics.json 已更新：{len(merged)} 条"
            f"（期刊{sum(1 for x in merged if x['cat'] == '期刊')}/"
            f"院校{sum(1 for x in merged if x['cat'] == '院校')}）")

    log(f"可用源 {len(ok)}/{len(jobs)}；失败：{'、'.join(bad) or '无'}"
        f"；沿用上一版：{'、'.join(carried) or '无'}")
    for it in merged[:5]:
        log(f"  · [{it['cat']}] {it['date']} {it['source']} | {it['title'][:46]}")
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(f"### 每日动态日报\n\n- 可用源：{'、'.join(ok) or '无'}\n"
                    f"- 失败源：{'、'.join(bad) or '无'}\n"
                    f"- 沿用上一版：{'、'.join(carried) or '无'}\n"
                    f"- 输出条数：{len(merged)}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
