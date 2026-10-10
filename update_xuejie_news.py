#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
体育学人门户 · 学界动态（荣誉 / 活动 / 会议）自动抓取

由 GitHub Actions（.github/workflows/update-papers.yml）与论文更新同调度运行，也可本地：
  pip install requests beautifulsoup4 lxml && python update_xuejie_news.py

范围（严格控）：
  honor  荣誉：长江学者、楚天学者、杰青、优青、万人计划、黄大年、教学名师、人才称号等
  event  活动：论坛、峰会、主旨报告、开幕式、学术报告等
  meet   会议：会议通知、征文、体育科学大会、学会、研讨会、年会等

不做泛体育娱乐、赛事比分、招生迎新、采购招标、日常行政。
每源独立 try/except；全失败不写文件；合并去重；按日期降序；约 20–30 条。
"""
from __future__ import annotations

import datetime as dt
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
SNAPSHOT_FILE = ROOT / "xuejie-snapshot.json"

MAX_ITEMS = 28
MAX_PER_ORG = 6
PER_SOURCE_FETCH = 40
TIMEOUT = (10, 40)
RETRIES = 2
BJT = dt.timezone(dt.timedelta(hours=8))

UA = (
    "tiyuxueren-bot/1.0 (http://tiyuxueren.com/; mailto:admin@tiyuxueren.com) "
    "Mozilla/5.0 (compatible; academic-portal-bot)"
)
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.6",
})

# —— 关键词（标题匹配）—————————————————————————————
HONOR_RE = re.compile(
    r"(长江学者|楚天学者|杰青|国家杰出青年|优青|优秀青年科学基金|万人计划|"
    r"黄大年|教学名师|人才称号|国家级人才|青年拔尖|特聘教授|入选.*学者|"
    r"获聘.*学者|国务院政府特殊津贴|百千万人才|飞天学者|泰山学者|珠江学者|"
    r"芙蓉学者|燕赵学者|中原学者|天山学者|龙马学者|紫江学者|东方学者|"
    r"国家级教学名师|全国优秀教师|国家高层次人才)"
)
EVENT_RE = re.compile(
    r"(论坛|峰会|主旨报告|开幕式|学术报告|高端论坛|学术讲座|"
    r"发布会|研讨会.*举行|举行.*研讨|召开.*论坛|召开.*峰会|"
    r"讲堂|学术交流会)"
)
MEET_RE = re.compile(
    r"(会议通知|征文通知|征文及|征稿|体育科学大会|学术会议|"
    r"研讨会|学术年会|年会(?!表彰)|参会通知|论文报告会|"
    r"录取通知|征集通知|分会场|大会征文|会议征文|"
    r"学会.*?(会议|论坛|征文|通知|年会)|"
    r"(会议|论坛|年会).*?(通知|征文|征稿|录取))"
)

# 明确排除：赛事比分、迎新军训、采购行政等
EXCLUDE_RE = re.compile(
    r"(亚运会.{0,8}(金|银|铜)|斩获.{0,6}(金|银|铜)|夺得.{0,6}(金|银|铜)|"
    r"摘得.{0,4}(金|银|铜)|金牌|银牌|铜牌|"
    r"锦标赛|联赛|冠军赛|对抗赛|"
    r"军训|迎新|开学典礼|报到|录取分数|招生简章|"
    r"采购|招标|比选|中选公告|询价|出版项目|"
    r"校园安全|慰问|巡察|党课(?!.*学术)|思政课|"
    r"教师节庆祝|建党\d+周年表彰|"
    r"足球邀请赛|篮球邀请赛|体能挑战赛|"
    r"结项评审|团体标准.*?审查会|规范化治理|中选公告|"
    r"培训班报名|证书续期|公开招聘实习)"
)

DATE_RE = re.compile(
    r"(20\d{2})\s*[年\-/\.]\s*(\d{1,2})\s*(?:[月\-/\.]\s*(\d{1,2}))?"
)
ART_HREF_RE = re.compile(
    r"(info/\d+/\d+|[0-9a-f]{16,}\.htm|a\d+\.html|/page\.htm|"
    r"content\.jsp|/info/\d+|mp\.weixin\.qq\.com)",
    re.I,
)


def log(msg: str) -> None:
    print(msg, flush=True)


def today_bjt() -> dt.date:
    return dt.datetime.now(BJT).date()


def clean(s: str | None) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


def fetch(url: str) -> requests.Response:
    last: Exception | None = None
    for attempt in range(RETRIES + 1):
        try:
            r = SESSION.get(url, timeout=TIMEOUT, allow_redirects=True)
            r.raise_for_status()
            if not r.encoding or r.encoding.lower() in ("iso-8859-1", "ascii"):
                r.encoding = r.apparent_encoding or "utf-8"
            head = r.text[:3000]
            if "showValidateCode" in r.url or "WEB 应用防火墙" in head:
                raise RuntimeError(f"被验证码/防火墙拦截：{r.url}")
            # 反爬混淆壳（几乎无正文）
            if len(r.text) < 80000 and r.text.lstrip().startswith("<!DOCTYPE html><meta") and "_0x" in r.text[:500]:
                raise RuntimeError(f"反爬 JS 壳，跳过：{r.url}")
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


def normalize_date(raw: str | None) -> str:
    """返回 YYYY-MM-DD 或 YYYY-MM；解析失败返回空串。"""
    if not raw:
        return ""
    m = DATE_RE.search(raw)
    if not m:
        return ""
    y, mo = int(m.group(1)), int(m.group(2))
    if not (1990 <= y <= 2100 and 1 <= mo <= 12):
        return ""
    day = m.group(3)
    if day:
        d = int(day)
        if 1 <= d <= 31:
            return f"{y:04d}-{mo:02d}-{d:02d}"
    return f"{y:04d}-{mo:02d}"


def classify(title: str) -> str | None:
    """返回 honor|event|meet，或 None 表示不收录。先排除再分类。"""
    t = clean(title)
    if len(t) < 8:
        return None
    if EXCLUDE_RE.search(t):
        return None
    # 会议优先于活动（「XX论坛征文通知」应标会议）
    if MEET_RE.search(t):
        return "meet"
    if HONOR_RE.search(t):
        return "honor"
    if EVENT_RE.search(t):
        return "event"
    return None


def abs_url(base: str, href: str) -> str:
    href = (href or "").strip()
    if not href or href.startswith("javascript") or href == "#":
        return ""
    # 去掉怪异端口 :80
    full = urljoin(base, href)
    p = urlparse(full)
    if p.port == 80 and p.scheme == "http":
        full = f"http://{p.hostname}{p.path}" + (f"?{p.query}" if p.query else "")
    elif p.port == 443 and p.scheme == "https":
        full = f"https://{p.hostname}{p.path}" + (f"?{p.query}" if p.query else "")
    return full


def extract_list_items(soup: BeautifulSoup, base_url: str) -> list[dict]:
    """通用列表抽取：带日期或文章型链接的 a 标签。"""
    out: list[dict] = []
    seen_href: set[str] = set()
    for a in soup.find_all("a", href=True):
        title = clean(a.get_text(" ", strip=True))
        # 去掉标题里粘连的日期尾巴
        title = DATE_RE.sub("", title)
        title = re.sub(r"\s*(MORE|查看详情|详情)\s*$", "", title).strip()
        title = clean(title)
        if not (8 <= len(title) <= 120):
            continue
        href = abs_url(base_url, a["href"])
        if not href or href.rstrip("/") == base_url.rstrip("/"):
            continue
        if href in seen_href:
            continue
        # 上下文找日期
        ctx = title
        p = a.parent
        for _ in range(4):
            if not p:
                break
            ctx = p.get_text(" ", strip=True)
            if DATE_RE.search(ctx):
                break
            p = p.parent
        # 兄弟节点日期（常见于 li > a + span）
        if a.parent:
            for sib in list(a.parent.children):
                if sib is a:
                    continue
                if getattr(sib, "get_text", None):
                    ctx += " " + sib.get_text(" ", strip=True)
                elif isinstance(sib, str):
                    ctx += " " + sib
        date = normalize_date(ctx)
        art_like = bool(ART_HREF_RE.search(href)) or bool(date)
        if not art_like:
            continue
        # 过滤导航噪音
        if title in ("更多", "更多>>", "MORE", "首页", "返回"):
            continue
        seen_href.add(href)
        out.append({"title": title, "link": href, "date": date})
        if len(out) >= PER_SOURCE_FETCH:
            break
    return out


def make_item(type_: str, title: str, org: str, date: str, link: str, summary: str = "") -> dict:
    it = {
        "type": type_,
        "title": clean(title),
        "org": clean(org),
        "date": date,
        "link": link,
    }
    if summary:
        it["summary"] = clean(summary)[:160]
    return it


def run_source(name: str, org: str, url: str, force_type: str | None = None) -> list[dict]:
    """抓一个列表页。force_type 用于学会会议栏目（几乎全是会议）。"""
    r = fetch(url)
    soup = soup_of(r)
    raw_items = extract_list_items(soup, r.url)
    kept: list[dict] = []
    for raw in raw_items:
        title = raw["title"]
        if force_type:
            if EXCLUDE_RE.search(title):
                continue
            typ = classify(title) or force_type
        else:
            typ = classify(title)
        if not typ:
            continue
        if not raw["link"]:
            continue
        # 无日期的条目：保留但排后；学会会议栏允许
        date = raw["date"] or ""
        kept.append(make_item(typ, title, org, date, raw["link"]))
    log(f"  [{name}] 列表 {len(raw_items)} → 收录 {len(kept)}")
    return kept


# —— 第一期来源（公开列表，失败跳过）—————————————————
SOURCES: list[tuple[str, str, str, str | None]] = [
    # (短名, 单位, URL, force_type)
    ("csss-meet", "中国体育科学学会", "https://www.csss.cn/c190", "meet"),
    ("csss-notice", "中国体育科学学会", "https://www.csss.cn/c194", None),
    ("csss-news", "中国体育科学学会", "https://www.csss.cn/c189", None),
    ("bsu-xshd", "北京体育大学", "https://www.bsu.edu.cn/xshd/index.htm", None),
    ("bsu-sydt", "北京体育大学", "https://www.bsu.edu.cn/sydt/index.htm", None),
    ("bsu-xyyw", "北京体育大学", "https://www.bsu.edu.cn/xyyw/index.htm", None),
    ("whsu-home", "武汉体育学院", "https://www.whsu.edu.cn/", None),
    ("whsu-news", "武汉体育学院", "https://news.whsu.edu.cn/", None),
    ("cupes-xshd", "首都体育学院", "https://www.cupes.edu.cn/kxyj/xshd/index.htm", None),
    ("cupes-news", "首都体育学院", "https://news.cupes.edu.cn/", None),
    ("gzsport-home", "广州体育学院", "https://www.gzsport.edu.cn/", None),
    ("nsi-home", "南京体育学院", "https://www.nsi.edu.cn/", None),
    ("tjus-xxyw", "天津体育学院", "https://www.tjus.edu.cn/xwzx/xxyw.htm", None),
]


def dedupe(items: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for it in items:
        key = (it.get("link") or "").rstrip("/").lower()
        if not key:
            key = "t:" + clean(it.get("title")).lower()
        if key in seen:
            continue
        seen.add(key)
        # 同标题不同链接也去重
        tkey = "title:" + clean(it.get("title")).lower()
        if tkey in seen:
            continue
        seen.add(tkey)
        out.append(it)
    return out


def sort_key(it: dict) -> tuple:
    d = it.get("date") or ""
    m = re.match(r"^(\d{4})-(\d{2})(?:-(\d{2}))?", d)
    if not m:
        return (0, 0, 0)
    return (int(m.group(1)), int(m.group(2)), int(m.group(3) or 0))


def load_old() -> list[dict]:
    if not SNAPSHOT_FILE.exists():
        return []
    try:
        data = json.loads(SNAPSHOT_FILE.read_text(encoding="utf-8"))
        items = data.get("items") if isinstance(data, dict) else data
        return [x for x in (items or []) if isinstance(x, dict) and x.get("title")]
    except Exception:  # noqa: BLE001
        return []


def write_json(path: Path, obj: object) -> bool:
    new = json.dumps(obj, ensure_ascii=False, indent=2) + "\n"
    old = path.read_text(encoding="utf-8") if path.exists() else None
    if old == new:
        return False
    path.write_text(new, encoding="utf-8")
    return True


def main() -> int:
    log(f"== 学界动态抓取 {today_bjt().isoformat()} ==")
    collected: list[dict] = []
    ok_sources: list[str] = []
    for name, org, url, force in SOURCES:
        try:
            items = run_source(name, org, url, force)
            collected.extend(items)
            if items:
                ok_sources.append(name)
            else:
                # 源通了但关键词没命中，也算可用源
                ok_sources.append(name + "(0)")
        except Exception as e:  # noqa: BLE001
            log(f"  [{name}] 跳过：{e}")

    # 与旧数据合并（保留仍有效的旧条目链接，避免一天波动清空）
    old = load_old()
    merged = dedupe(collected + old)
    merged.sort(key=sort_key, reverse=True)
    # 每单位上限，避免单校讲座刷屏
    capped: list[dict] = []
    org_n: dict[str, int] = {}
    for it in merged:
        org = it.get("org") or ""
        if org_n.get(org, 0) >= MAX_PER_ORG:
            continue
        org_n[org] = org_n.get(org, 0) + 1
        capped.append(it)
        if len(capped) >= MAX_ITEMS:
            break
    merged = capped

    if not collected and not old:
        log("::warning::所有源均失败或 0 条，且无旧数据，不写文件。")
        return 0
    if not collected:
        log("::warning::本次新抓 0 条，保留现有 xuejie-snapshot.json。")
        return 0

    by_type: dict[str, int] = {}
    for it in merged:
        by_type[it["type"]] = by_type.get(it["type"], 0) + 1

    snap = {
        "generatedAt": today_bjt().isoformat(),
        "source": "cssd-xuejie-scraper",
        "statusHint": "live",
        "items": merged,
    }
    changed = write_json(SNAPSHOT_FILE, snap)
    log(f"可用源: {', '.join(ok_sources) or '(无)'}")
    log(f"新抓 {len(collected)} → 去重后 {len(merged)} "
        f"(荣誉{by_type.get('honor',0)}/活动{by_type.get('event',0)}/会议{by_type.get('meet',0)})")
    if changed:
        log(f"xuejie-snapshot.json 已更新：generatedAt={snap['generatedAt']}")
    else:
        log("xuejie-snapshot.json 无变化")
    # 样例
    for it in merged[:5]:
        log(f"  · [{it['type']}] {it['date']} {it['org']} | {it['title'][:50]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
