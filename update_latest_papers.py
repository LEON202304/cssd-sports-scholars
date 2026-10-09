#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
体育学人门户 · 重点体育学期刊最新论文自动抓取

由 GitHub Actions（.github/workflows/update-papers.yml）每天北京时间 07:17 左右运行，
也可本地运行：  pip install requests beautifulsoup4 lxml && python update_latest_papers.py

数据来源：
  - 国内：各期刊官网公开的「当期目录 / 本期目次 / 网络首发」页面（玛格泰克/仁和 xml-journal、
    知网腾云 cbpt 期刊官网、WKG 期刊官网、编辑部自建站）。不访问 CNKI 检索/登录页，
    不处理验证码，不绕过任何访问控制；遇到防火墙/人机验证的源直接跳过。
  - 国外：Crossref 公开 API（按 ISSN 拉最新 works，链接用 https://doi.org/{DOI}）。

输出（字段与前端约定一致）：
  latest_papers.json   [ {journal,title,authors,link,date}, ... ]
  news-snapshot.json   {generatedAt, source, statusHint, items:[同上]}

安全约束：
  - 每个源独立 try/except + 超时，单源失败不影响其他源；
  - 所有源都失败或本次抓到 0 条时不写任何文件（绝不清空），正常退出并打印告警；
  - 与现有数据按标题/链接合并去重，按日期降序，每刊最多 MAX_PER_JOURNAL 条，总计 MAX_ITEMS 条；
  - latest_papers.json 内容不变时不重写，避免无意义 diff。
"""
from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
LATEST_FILE = ROOT / "latest_papers.json"
SNAPSHOT_FILE = ROOT / "news-snapshot.json"

MAX_ITEMS = 45          # 输出总条数上限（约 15 源 × 3 ≈ 45，保证中外各刊都能露出）
MAX_PER_JOURNAL = 3     # 每刊最多保留条数
PER_SOURCE_FETCH = 8    # 每个源最多取多少条候选
SHOUFA_MAX_AGE_DAYS = 180  # 网络首发只取近半年的
TIMEOUT = (10, 45)      # (连接, 读取) 秒
RETRIES = 2

BJT = dt.timezone(dt.timedelta(hours=8))
UA = ("tiyuxueren-bot/1.0 (http://tiyuxueren.com/; mailto:admin@tiyuxueren.com) "
      "Mozilla/5.0 (compatible; academic-portal-bot)")

SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
})


def log(msg: str) -> None:
    print(msg, flush=True)


def today_bjt() -> dt.date:
    return dt.datetime.now(BJT).date()


def fetch(url: str) -> requests.Response:
    last: Exception | None = None
    for attempt in range(RETRIES + 1):
        try:
            r = SESSION.get(url, timeout=TIMEOUT, allow_redirects=True)
            r.raise_for_status()
            if not r.encoding or r.encoding.lower() in ("iso-8859-1", "ascii"):
                r.encoding = r.apparent_encoding or "utf-8"
            if "showValidateCode" in r.url or "WEB 应用防火墙" in r.text[:3000]:
                raise RuntimeError(f"被验证码/防火墙拦截：{r.url}（按规则跳过，不绕过）")
            return r
        except Exception as e:  # noqa: BLE001
            last = e
            if isinstance(e, RuntimeError):
                break
            if attempt < RETRIES:
                time.sleep(2 * (attempt + 1))
    raise last  # type: ignore[misc]


def soup_of(r: requests.Response) -> BeautifulSoup:
    return BeautifulSoup(r.text, "lxml")


def clean(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


def norm_authors(s: str | None) -> str:
    parts = [clean(p) for p in re.split(r"[;；,，、]", s or "")]
    return ", ".join(p for p in parts if p)


def ym(year: int | str, month: int | str) -> str:
    return f"{int(year):04d}-{int(month):02d}"


def item(journal: str, title: str, authors: str, link: str, date: str) -> dict:
    return {
        "journal": journal,
        "title": clean(title),
        "authors": norm_authors(authors),
        "link": link,
        "date": date,
    }


# ─────────────────────────── 仁和 xml-journal 平台（体育科学、上海体育大学学报） ───────────────────────────
def src_xml_journal(journal: str, base: str) -> list[dict]:
    r = fetch(base.rstrip("/") + "/cn/article/current")
    s = soup_of(r)
    html = r.text
    out: list[dict] = []
    issue_date_cache: dict[tuple[str, str], str] = {}

    def issue_date(year: str, issue: str) -> str:
        key = (year, issue)
        if key in issue_date_cache:
            return issue_date_cache[key]
        date = ""
        pat = re.compile(
            r'"issue":"%s"(?:(?!"issue":).){0,2000}?"publishDate":(\d{12,13})(?:(?!"issue":).){0,800}?"year":"%s"'
            % (re.escape(issue), re.escape(year)), re.S)
        m = pat.search(html)
        if m:
            date = dt.datetime.fromtimestamp(int(m.group(1)) / 1000, BJT).date().isoformat()
        if not date:
            date = ym(year, issue) if int(issue) <= 12 else str(year)
        issue_date_cache[key] = date
        return date

    for box in s.select("div.article-list"):
        a = box.select_one(".article-list-title a[href]")
        if not a:
            continue
        title = clean(a.get_text())
        if not title:
            continue
        authors = ", ".join(clean(x.get_text()) for x in box.select(".article-list-author a"))
        tm = clean(box.select_one(".article-list-time").get_text(" ")) if box.select_one(".article-list-time") else ""
        m = re.search(r"(20\d\d)\s*,\s*\d+\s*\((\d+)\)", tm)
        date = issue_date(m.group(1), m.group(2)) if m else ""
        link = urljoin(base.rstrip("/") + "/", a["href"].lstrip("/"))
        out.append(item(journal, title, authors, link, date))
        if len(out) >= PER_SOURCE_FETCH:
            break
    return out


# ─────────────────────────── 知网腾云 cbpt 期刊官网（中国体育科技、天津体院学报 等） ───────────────────────────
def _cbpt_boxes(s: BeautifulSoup):
    for box in s.select(".paperBox"):
        a = box.select_one("h3 a[href]")
        if not a:
            continue
        sp = box.find("span")
        info = clean(box.select_one(".paperInfo").get_text(" ")) if box.select_one(".paperInfo") else ""
        yield a, (sp.get_text() if sp else ""), info


def src_cbpt(journal: str, code: str) -> list[dict]:
    base = f"https://{code}.cbpt.cnki.net/portal/journal/portal/client/"
    out: list[dict] = []

    # 1) 当期目录
    try:
        s = soup_of(fetch(base + "paperback_list"))
        rows = list(_cbpt_boxes(s))[:PER_SOURCE_FETCH]
        issue_date = ""
        if rows:
            m = re.search(r"(20\d\d)\s*年\s*(\d+)\s*期", rows[0][2])
            # 用第一篇文章详情页上的「出版时间」作为本期出版日期（每刊只多请求 1 次）
            try:
                d = fetch(rows[0][0]["href"]).text
                mm = re.search(r"出版时间[\s\S]{0,200}?(20\d\d-\d\d-\d\d)", d)
                if mm:
                    issue_date = mm.group(1)
            except Exception as e:  # noqa: BLE001
                log(f"    [{journal}] 详情页取出版日期失败，退回 年-月：{e}")
            if not issue_date and m:
                issue_date = ym(m.group(1), m.group(2)) if int(m.group(2)) <= 12 else m.group(1)
        for a, au, info in rows:
            m = re.search(r"(20\d\d)\s*年\s*(\d+)\s*期", info)
            date = issue_date
            if m and issue_date and not issue_date.startswith(m.group(1)):
                date = m.group(1)
            out.append(item(journal, a.get_text(), au, a["href"], date))
    except Exception as e:  # noqa: BLE001
        log(f"    [{journal}] 当期目录失败：{e}")

    # 2) 网络首发（带精确日期，只取近半年）
    try:
        s = soup_of(fetch(base + "shoufa_list"))
        cutoff = today_bjt() - dt.timedelta(days=SHOUFA_MAX_AGE_DAYS)
        for a, au, info in list(_cbpt_boxes(s))[:PER_SOURCE_FETCH]:
            m = re.search(r"网络首发时间[:：]\s*(20\d\d-\d\d-\d\d)", info)
            if not m:
                continue
            if dt.date.fromisoformat(m.group(1)) < cutoff:
                continue
            out.append(item(journal, a.get_text(), au, a["href"], m.group(1)))
    except Exception as e:  # noqa: BLE001
        log(f"    [{journal}] 网络首发失败：{e}")

    if not out:
        raise RuntimeError("当期目录与网络首发均未取到数据")
    return out


# ─────────────────────────── WKG 期刊官网（北京体育大学学报、武汉体育学院学报） ───────────────────────────
def src_wkg(journal: str, index_url: str) -> list[dict]:
    r = fetch(index_url)
    s = soup_of(r)
    out: list[dict] = []
    for li in s.select("ul.column_contbox_zxlist li"):
        a = li.select_one("h3 a[href]")
        if not a or "paperDigest" not in a["href"]:
            continue
        sm = li.find("samp")
        sp = clean(li.find("span").get_text(" ")) if li.find("span") else ""
        m = re.search(r"(20\d\d)\s*年\s*(\d+)\s*期", sp)
        date = (ym(m.group(1), m.group(2)) if int(m.group(2)) <= 12 else m.group(1)) if m else ""
        out.append(item(journal, a.get_text(), sm.get_text() if sm else "", urljoin(index_url, a["href"]), date))
        if len(out) >= PER_SOURCE_FETCH:
            break
    return out


# ─────────────────────────── 体育学刊（华南师范大学编辑部官网「期刊导读」目次） ───────────────────────────
def src_tyxk(journal: str = "体育学刊") -> list[dict]:
    lst = "https://tyxk.scnu.edu.cn/xinwengonggao/qikandaodu/"
    s = soup_of(fetch(lst))
    a = next((x for x in s.find_all("a", href=True) if "目次" in x.get_text()), None)
    if not a:
        raise RuntimeError("期刊导读页未找到目次链接")
    toc_url = urljoin(lst, a["href"])
    m = re.search(r"/a/(20\d\d)(\d\d)(\d\d)/", toc_url)
    date = f"{m.group(1)}-{m.group(2)}-{m.group(3)}" if m else ""
    ts = soup_of(fetch(toc_url))
    body = ts.select_one(".article-content") or ts.body
    lines = [clean(x) for x in body.get_text("\n").split("\n")]
    lines = [x for x in lines if x]
    out: list[dict] = []
    buf: list[str] = []
    entry = re.compile(r"^(.*?)[…\.·]{3,}\s*(.+?)\s*[（(]\s*\d+\s*[)）]$")
    for ln in lines:
        mm = entry.match(ln)
        if not mm:
            if ln.startswith("——") and buf:
                buf[-1] += ln
            else:
                buf.append(ln)
            continue
        head, authors = mm.group(1).strip(), mm.group(2).strip()
        if not head:
            title = buf[-1] if buf else ""
        elif head.startswith("——"):
            title = (buf[-1] if buf else "") + head
        else:
            title = head
        buf = []
        if title:
            out.append(item(journal, title, authors, toc_url, date))
        if len(out) >= PER_SOURCE_FETCH:
            break
    return out



# ─────────────────────────── Crossref 公开 API（国外体育学期刊，按 ISSN） ───────────────────────────
def _crossref_date(issued: dict | None) -> str:
    """Crossref issued.date-parts → YYYY-MM-DD / YYYY-MM / YYYY（与国内源一致）。"""
    parts = (issued or {}).get("date-parts") or []
    if not parts or not parts[0]:
        return ""
    ymd = parts[0]
    if len(ymd) >= 3 and ymd[0] and ymd[1] and ymd[2]:
        return f"{int(ymd[0]):04d}-{int(ymd[1]):02d}-{int(ymd[2]):02d}"
    if len(ymd) >= 2 and ymd[0] and ymd[1]:
        return ym(ymd[0], ymd[1])
    if ymd and ymd[0]:
        return f"{int(ymd[0]):04d}"
    return ""


def _crossref_authors(authors) -> str:
    names: list[str] = []
    for a in authors or []:
        given = clean(a.get("given") or "")
        family = clean(a.get("family") or "")
        name = clean(a.get("name") or "")
        if family and given:
            names.append(f"{given} {family}")
        elif family:
            names.append(family)
        elif given:
            names.append(given)
        elif name:
            names.append(name)
    return ", ".join(names)


def src_crossref(journal: str, issn: str) -> list[dict]:
    """按 ISSN 从 Crossref 拉最新论文。单源失败由外层 try/except 跳过，不清空已有数据。"""
    url = f"https://api.crossref.org/journals/{issn}/works"
    params = {
        "rows": PER_SOURCE_FETCH,
        "sort": "published",
        "order": "desc",
        "select": "title,author,issued,DOI,container-title",
    }
    headers = {
        "User-Agent": UA,
        "Accept": "application/json",
    }
    last: Exception | None = None
    r = None
    for attempt in range(RETRIES + 1):
        try:
            r = SESSION.get(url, params=params, headers=headers, timeout=TIMEOUT)
            r.raise_for_status()
            break
        except Exception as e:  # noqa: BLE001
            last = e
            r = None
            if attempt < RETRIES:
                time.sleep(2 * (attempt + 1))
    if r is None:
        raise last  # type: ignore[misc]
    payload = r.json()
    works = (payload.get("message") or {}).get("items") or []
    out: list[dict] = []
    for w in works:
        titles = w.get("title") or []
        title = titles[0] if titles else ""
        doi = (w.get("DOI") or "").strip()
        if not title or not doi:
            continue
        out.append(item(
            journal,
            title,
            _crossref_authors(w.get("author")),
            f"https://doi.org/{doi}",
            _crossref_date(w.get("issued")),
        ))
        if len(out) >= PER_SOURCE_FETCH:
            break
    if not out:
        raise RuntimeError(f"Crossref 返回 0 条可用作品（ISSN {issn}）")
    return out


SOURCES = [
    ("体育科学", lambda: src_xml_journal("体育科学", "http://tykx.xml-journal.net/")),
    ("上海体育大学学报", lambda: src_xml_journal("上海体育大学学报", "https://shtyxyxb.xml-journal.net/")),
    ("中国体育科技", lambda: src_cbpt("中国体育科技", "zgty")),
    ("北京体育大学学报", lambda: src_wkg("北京体育大学学报", "https://bjtd.chinajournal.net.cn/WKG/WebPublication/index.aspx?mid=bjtd")),
    ("武汉体育学院学报", lambda: src_wkg("武汉体育学院学报", "https://wtxb.cbpt.cnki.net/WKD/WebPublication/index.aspx?mid=wtxb")),
    ("体育学刊", lambda: src_tyxk("体育学刊")),
    ("天津体育学院学报", lambda: src_cbpt("天津体育学院学报", "tjty")),
    ("体育与科学", lambda: src_cbpt("体育与科学", "tyyk")),
    ("西安体育学院学报", lambda: src_cbpt("西安体育学院学报", "xaty")),
    # 成都体育学院学报（cdtyxb.cdsu.edu.cn）：官网启用 WAF 人机验证，按规则不抓取。
    # 国外体育学期刊（Crossref 公开 API，按 ISSN；显示名用规范全称）
    ("British Journal of Sports Medicine", lambda: src_crossref("British Journal of Sports Medicine", "0306-3674")),  # BJSM
    ("Sports Medicine", lambda: src_crossref("Sports Medicine", "0112-1642")),
    ("Journal of Sport and Health Science", lambda: src_crossref("Journal of Sport and Health Science", "2095-2546")),  # JSHS
    ("Medicine & Science in Sports & Exercise", lambda: src_crossref("Medicine & Science in Sports & Exercise", "0195-9131")),  # MSSE
    ("Journal of Sports Sciences", lambda: src_crossref("Journal of Sports Sciences", "0264-0414")),  # JSS
    ("Scandinavian Journal of Medicine & Science in Sports", lambda: src_crossref("Scandinavian Journal of Medicine & Science in Sports", "0905-7188")),  # SJMSS
]


def key_of(it: dict) -> str:
    return re.sub(r"[\s\W_]+", "", it.get("title", "")).lower()


def date_key(d: str) -> str:
    # 2026-09 与 2026-09-15 混排：缺日的按当月 00 日处理，排在同月有日期的条目之后
    d = (d or "").strip()
    if re.fullmatch(r"\d{4}-\d{2}", d):
        return d + "-00"
    if re.fullmatch(r"\d{4}", d):
        return d + "-00-00"
    return d


def merge(new: list[dict], old: list[dict]) -> list[dict]:
    seen_title: set[str] = set()
    seen_link: set[str] = set()
    merged: list[dict] = []
    for it in new + old:  # 新数据优先（同标题以新抓取为准）
        if not it.get("title"):
            continue
        k = key_of(it)
        link = it.get("link") or ""
        # 体育学刊整期共用目次页链接，因此链接去重只对“单篇”链接生效
        if k in seen_title or (link and link in seen_link and "tyxk.scnu.edu.cn/a/" not in link):
            continue
        seen_title.add(k)
        if link:
            seen_link.add(link)
        merged.append({f: it.get(f, "") for f in ("journal", "title", "authors", "link", "date")})
    merged.sort(key=lambda x: date_key(x["date"]), reverse=True)  # 稳定排序：同日期保持页面原顺序
    per: dict[str, int] = {}
    out: list[dict] = []
    for it in merged:
        n = per.get(it["journal"], 0)
        if n >= MAX_PER_JOURNAL:
            continue
        per[it["journal"]] = n + 1
        out.append(it)
        if len(out) >= MAX_ITEMS:
            break
    return out


def load_json(p: Path, default):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:  # noqa: BLE001
        return default


def dump(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2) + "\n"


def main() -> int:
    log(f"== 体育学人 · 最新论文抓取  {dt.datetime.now(BJT):%Y-%m-%d %H:%M} 北京时间")
    new: list[dict] = []
    ok, bad = [], []
    for name, fn in SOURCES:
        t0 = time.time()
        try:
            got = [x for x in fn() if x["title"]]
            if not got:
                raise RuntimeError("解析结果为 0 条（页面结构可能变化）")
            new.extend(got)
            ok.append(name)
            log(f"  ✓ {name:<10} {len(got):>2} 条  {time.time()-t0:5.1f}s  最新 {max(date_key(x['date']) for x in got)}")
        except Exception as e:  # noqa: BLE001
            bad.append(name)
            log(f"  ✗ {name:<10} 失败  {time.time()-t0:5.1f}s  {type(e).__name__}: {str(e)[:160]}")

    log(f"可用源 {len(ok)}/{len(SOURCES)}：{'、'.join(ok) or '无'}；失败：{'、'.join(bad) or '无'}")
    if not new:
        log("::warning::所有源均失败或 0 条新数据，保留现有 latest_papers.json / news-snapshot.json 不变。")
        return 0

    old = load_json(LATEST_FILE, [])
    if not isinstance(old, list):
        old = []
    items = merge(new, old)
    if not items:
        log("::warning::合并后为 0 条，不写文件。")
        return 0

    latest_txt = dump(items)
    if not LATEST_FILE.exists() or LATEST_FILE.read_text(encoding="utf-8") != latest_txt:
        LATEST_FILE.write_text(latest_txt, encoding="utf-8")
        log(f"latest_papers.json 已更新：{len(items)} 条")
    else:
        log("latest_papers.json 内容无变化，未重写")

    snap = {
        "generatedAt": today_bjt().isoformat(),
        "source": "期刊官网 TOC + Crossref 自动抓取（GitHub Actions 每日）：" + "、".join(ok),
        "statusHint": "live",
        "items": items,
    }
    snap_txt = dump(snap)
    if not SNAPSHOT_FILE.exists() or SNAPSHOT_FILE.read_text(encoding="utf-8") != snap_txt:
        SNAPSHOT_FILE.write_text(snap_txt, encoding="utf-8")
        log(f"news-snapshot.json 已更新：generatedAt={snap['generatedAt']}")
    else:
        log("news-snapshot.json 无变化")

    if len(ok) < 3:
        log(f"::warning::今日仅 {len(ok)} 个源可用，请检查日志。")
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(f"### 最新论文抓取\n\n- 可用源：{'、'.join(ok) or '无'}\n- 失败源：{'、'.join(bad) or '无'}\n"
                    f"- 输出条数：{len(items)}，最新日期：{items[0]['date']}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
