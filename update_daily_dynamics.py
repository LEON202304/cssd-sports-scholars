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


def in_window(d: str, days: int) -> bool:
    k = date_key(d)
    m = re.match(r"^(\d{4})-(\d{2})(?:-(\d{2}))?", k)
    if not m:
        return False
    try:
        base = dt.date(int(m.group(1)), int(m.group(2)), int(m.group(3) or "01"))
    except ValueError:
        return False
    return (today_bjt() - base).days <= days


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


def main() -> int:
    log(f"== 体育学人 · 每日动态日报  {dt.datetime.now(BJT):%Y-%m-%d %H:%M} 北京时间 ==")
    jobs = [(s["name"], s) for s in SM_CONFIG.JOURNALS if s.get("enabled")]
    jobs += [(s["name"], s) for s in SM_CONFIG.UNIVERSITIES]
    ok, bad = [], []

    results: dict[str, list[dict]] = {}
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = {ex.submit(collect, src): name for name, src in jobs}
        for fut in as_completed(futs):
            name = futs[fut]
            try:
                got = fut.result()
                results[name] = got
                if got:
                    ok.append(name)
                    log(f"  ✓ {name}  {len(got)} 条")
                else:
                    ok.append(name + "(0)")
                    log(f"  · {name}  0 条")
            except Exception as e:  # noqa: BLE001
                bad.append(name)
                log(f"  ✗ {name}  失败 {type(e).__name__}: {str(e)[:120]}")

    # —— 期刊：每刊最多 MAX_PER_JOURNAL 条 ——
    j_items: list[dict] = []
    for name in sorted(results):
        items = sorted(results[name], key=lambda x: date_key(x["date"]), reverse=True)
        j_items.extend(items[:MAX_PER_JOURNAL])

    # —— 院校：优先近窗口内有日期条目；无日期仅补足（每校上限 UNIV_UNDATED_CAP）——
    u_items: list[dict] = []
    for name in sorted(results):
        items = results[name]
        dated = [x for x in items if x["date"] and in_window(x["date"], UNIV_WINDOW_DAYS)]
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

    log(f"可用源 {len(ok)}/{len(jobs)}；失败：{'、'.join(bad) or '无'}")
    for it in merged[:5]:
        log(f"  · [{it['cat']}] {it['date']} {it['source']} | {it['title'][:46]}")
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(f"### 每日动态日报\n\n- 可用源：{'、'.join(ok) or '无'}\n"
                    f"- 失败源：{'、'.join(bad) or '无'}\n- 输出条数：{len(merged)}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
