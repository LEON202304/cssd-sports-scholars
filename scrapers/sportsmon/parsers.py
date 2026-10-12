# -*- coding: utf-8 -*-
"""各平台列表页解析适配器（由 sports-monitor/core/parsers.py 移植）。"""
import re
from dataclasses import dataclass
from urllib.parse import urljoin

from bs4 import BeautifulSoup

from .fetcher import Fetcher, is_waf

# 主日期格式：2026-09-25 / 2026.09.25 / 2026年9月25日 / 2026/09/25
DATE_RE = re.compile(r"(20\d{2})[-/年.](0?[1-9]|1[0-2])[-/月.](0?[1-9]|[12]\d|3[01])(?![0-9])日?")
# 副日期格式1：09-25 2026 / 09.25 2026（月份在前、年份在后）
DATE_RE2 = re.compile(r"(?<!\d)(0?[1-9]|1[0-2])[-/月.](0?[1-9]|[12]\d|3[01])(?![0-9])日?[、\s\-—]*(20\d{2})")
# 副日期格式2：10 2026-10 / 28 2026.09（日在前，后随年-月）
DATE_RE3 = re.compile(r"(?<!\d)(0?[1-9]|[12]\d|3[01])(?![0-9])[、\s\-—]*(20\d{2})[-/年.](0?[1-9]|1[0-2])(?![0-9])日?")

SKIP_HREFS = re.compile(
    r"(javascript:|mailto:|\.css(?:[?#]|$)|\.js(?:[?#]|$)|\.png(?:[?#]|$)|"
    r"\.jpg(?:[?#]|$)|\.jpeg(?:[?#]|$)|\.gif(?:[?#]|$)|#|login|logout|register|"
    r"download|showValidateCode|/EN/|column/column|/EN/home)", re.I)

# 院校/期刊列表页中常见的导航类垃圾标题
JUNK_TITLES = (
    "学校概况", "学校简介", "校史沿革", "现任领导", "历任领导", "组织机构", "学部院系",
    "学院简介", "学校领导", "校训校徽", "学校视频", "历史底蕴", "师生服务热线", "校长信箱",
    "书记信箱", "党委巡察", "服务门户", "统一认证", "校友工作", "联系我们", "网站首页",
    "首页", "English", "登录", "注册", "刷新页面", "学校主页", "设为首页", "加入收藏",
    "版权所有", "版权声明", "访问统计", "友情链接", "更多", "更多>>", "更多+", "期刊订阅",
    "期刊征订", "版权协议", "投稿须知", "投稿指南", "期刊介绍", "本刊介绍", "浏览排行",
    "下载排行", "引用排行", "高级检索", "过刊浏览", "当期目录", "精品文章", "邮件订阅",
    "返回顶部", "信息搜索", "下载专区", "学校标识", "信息公开", "联系方式", "地理位置",
    "管理登录", "后台管理", "进入后台", "作者中心", "审稿中心", "在线期刊", "编辑办公",
    "专家审稿", "作者投稿", "公告栏", "通知公告", "新闻公告", "新闻动态",
    # 院校导航常见栏目
    "历史沿革", "机构设置", "党政职能部门", "群团组织", "教学训练科研单位", "直属单位",
    "独立学院", "合作办学", "师资队伍", "高层次人才", "教学名师", "国家级教练", "学校章程",
    "院部设置", "人才培养", "学科建设", "研究生招生", "科学研究", "交流合作", "学院概况",
    "校园风光", "系部设置", "招生就业", "竞赛训练", "校园文化", "文化讲堂", "公共服务",
    "数字图书馆", "天体概况", "学习在线", "媒体聚焦", "校园动态", "校园要闻", "学校要闻",
    "科研动态", "吉体要闻", "体院学报", "校园地图", "综合新闻", "相关新闻", "校园快讯",
    "媒体关注", "官微热点", "相关下载", "视频新闻", "音频广播", "图片新闻", "广体概况",
    "广体要闻", "焦点新闻", "新闻中心", "学校新闻", "校园新闻", "新闻资讯",
    "教学研究", "科研平台", "训练竞赛", "学校校历", "作息时间", "合作交流", "校园服务",
    "武体党建", "周工作安排", "校内通知", "招生信息", "团学活动", "校历查询", "摆渡车时刻",
    "校园规划处", "VPN服务", "附属学制教育", "校园生活", "学生活动", "教工活动", "志愿公益",
    "学校向导", "管理服务", "查看更多", "here", "Here", "English Version", "网上办事",
    "办事指南", "信息服务", "网站地图", "院长信箱", "书记信箱", "人才招聘", "招标信息",
    "武体公告", "精神文化", "信息门户", "足球运动系", "校旗内涵", "校园公告", "学校公告",
    "通知公告列表", "新闻列表", "公告公示", "教育教学",
)

# 院校/期刊“文章类”URL 特征（用于无日期时决定是否保留）
ARTICLE_URL_RE = re.compile(
    r"(/info/\d+/\d+\.htm|/info/\d+\.htm|/content_|news-show-\d+\.html|"
    r"/columns/[0-9a-fA-F-]{8,}/|/a/20\d{6}/|/20\d{2}/\d{4}/|/page\.htm|"
    r"/xwzx/|/tzgg|/jtyw|/xxyw|/xydt|/xxxw|/xysh|/kydt|/xyyw|/xwdt|/zhxw/|node/\d+|"
    r"/[0-9a-fA-F]{20,}\.htm|/article/|/paper/|/wkTextContent|/wkg/)", re.I)


@dataclass
class Article:
    source_key: str      # 配置键
    source_name: str     # 展示名
    category: str        # 期刊 / 院校 / 公众号
    section: str         # 栏目/区块
    title: str
    url: str
    date: str = ""
    note: str = ""

    def to_dict(self):
        return {"source": self.source_name, "category": self.category,
                "section": self.section, "title": self.title,
                "url": self.url, "date": self.date, "note": self.note}


def norm(s):
    return re.sub(r"\s+", " ", s or "").strip()


def _normalize_date(m, order):
    g = m.groups()
    if len(g) != 3:
        return ""
    a, b, c = g
    if order == "ymd":
        y, mo, d = a, int(b), int(c)
    elif order == "mdy":
        mo, d, y = int(a), int(b), c
    else:  # dym：组序为(日, 年, 月)
        d, y, mo = int(a), int(b), int(c)
    return f"{int(y):04d}-{mo:02d}-{d:02d}"


def _container_text(a, levels=6):
    node = a
    for _ in range(levels):
        if node.parent is None:
            break
        node = node.parent
        if node.name in ("li", "tr", "div", "dd", "dt", "table"):
            break
    return norm(node.get_text(" ", strip=True)) if node is not None else ""


def find_date(ctx):
    """在容器文本中找日期；返回规范 YYYY-MM-DD 或 ''。"""
    for pat, order in ((DATE_RE, "ymd"), (DATE_RE2, "mdy"), (DATE_RE3, "dym")):
        m = pat.search(ctx)
        if m:
            return _normalize_date(m, order)
    return ""


def parse_generic_list(html, base_url, *, href_keep=None, href_skip=None,
                       min_len=4, max_items=60, keep_url_re=None, stopwords=True):
    """通用列表页解析：提取标题链接 + 容器日期，返回 (title, url, date, ctx) 列表。

    keep_url_re：提供时，无日期的条目仅当其 URL 匹配该正则才保留（过滤导航垃圾）。
    stopwords：True 时跳过导航类常见标题。
    """
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    out, seen = [], set()
    href_skip_re = href_skip if isinstance(href_skip, re.Pattern) else (
        re.compile(href_skip, re.I) if href_skip else None)
    href_keep_re = href_keep if isinstance(href_keep, re.Pattern) else (
        re.compile(href_keep, re.I) if href_keep else None)
    keep_url = keep_url_re if isinstance(keep_url_re, re.Pattern) else (
        re.compile(keep_url_re, re.I) if keep_url_re else None)
    for a in soup.find_all("a", href=True):
        txt = norm(a.get_text())
        # 去掉标题里粘连的日期尾巴（如 "12 2026-10 项目结项公示"）
        txt = DATE_RE3.sub("", txt)
        txt = DATE_RE2.sub("", txt)
        txt = DATE_RE.sub("", txt)
        txt = norm(txt)
        if len(txt) < min_len:
            continue
        if stopwords and txt in JUNK_TITLES:
            continue
        href = urljoin(base_url, a["href"].strip())
        low = href.lower()
        if href in seen:
            continue
        if href_keep_re and not href_keep_re.search(low):
            continue
        if href_skip_re and href_skip_re.search(low):
            continue
        if SKIP_HREFS.search(low):
            continue
        ctx = _container_text(a)
        # 容器内无日期时向上多看两级，避免因内层 div 隔断日期
        date = find_date(ctx)
        if not date:
            node = a
            for _ in range(2):
                if node.parent is None:
                    break
                node = node.parent
                if node.name in ("li", "tr", "div", "dd", "dt", "table"):
                    ctx2 = norm(node.get_text(" ", strip=True))
                    date = find_date(ctx2)
                    if date:
                        break
        if not date and keep_url and not keep_url.search(low):
            continue
        out.append((txt, href, date))
        seen.add(href)
        if len(out) >= max_items:
            break
    return out


# ---------------------------------------------------------------------------
# 平台适配器
# ---------------------------------------------------------------------------

def adapt_xml_journal(fetcher: Fetcher, src: dict):
    """xml-journal 平台（体育科学、上海体育大学学报等）：首页含 最新录用/优先发表/当期目录 文章链接。
    同一 DOI 会对应多个锚点（标题/DOI号/摘要/HTML全文），按 URL 取最长标题。"""
    html = fetcher.text_of(fetcher.get(src["url"]))
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    junk = ("HTML全文", "PDF全文", "摘要", "全文", "PDF", "HTML", "引用本文", "下载", "分享")
    best = {}
    for a in soup.find_all("a", href=True):
        href = urljoin(src["url"], a["href"].strip())
        if not re.search(r"/article/doi/", href, re.I):
            continue
        if SKIP_HREFS.search(href.lower()):
            continue
        txt = norm(a.get_text())
        if len(txt) < 4 or txt in junk:
            continue
        if re.match(r"^10\.\d{4,}/\S+$", txt):  # 纯 DOI 编号锚点
            continue
        key = href.split("?")[0]
        if len(txt) > len(best.get(key, ("", ""))[0]):
            best[key] = (txt, href)
    return [Article(src["key"], src["name"], "期刊", "最新发表", t, u, "")
            for t, u in best.values()]


def adapt_cbpt_portal(fetcher: Fetcher, src: dict):
    """CNKI 腾云门户：网络首发(shoufa_list) + 当期目录(paper_list/type_benqi)。
    两个列表页均失效时才退回门户首页论文区（可能混入高被引旧文）。"""
    base = src["url"].rstrip("/")
    arts = []
    got = False
    for suffix, section in (("/portal/journal/portal/client/shoufa_list", "网络首发"),
                            ("/portal/journal/portal/client/paper_list/type_benqi", "当期目录")):
        resp = fetcher.get(base + suffix)
        html = fetcher.text_of(resp)
        if html and not is_waf(html):
            items = parse_generic_list(html, base + suffix,
                                       href_keep=r"/portal/journal/portal/client/paper/",
                                       max_items=60)
            for title, url, date in items:
                arts.append(Article(src["key"], src["name"], "期刊", section, title, url, date))
            if items:
                got = True
    if not got:
        html = fetcher.text_of(fetcher.get(base + "/portal"))
        if html:
            for title, url, date in parse_generic_list(html, base + "/portal",
                                                       href_keep=r"/portal/journal/portal/client/paper/",
                                                       max_items=60):
                arts.append(Article(src["key"], src["name"], "期刊", "门户论文", title, url, date))
    return arts


def adapt_magtech(fetcher: Fetcher, src: dict):
    """玛格泰克平台：当期目录文章（/CN/Y年/V卷/I期/页 或 /CN/DOI 形式）。"""
    arts = []
    for u in (src["url"], src.get("url2", "")):
        if not u:
            continue
        html = fetcher.text_of(fetcher.get(u))
        if not html or is_waf(html):
            continue
        items = parse_generic_list(html, u,
                                   href_keep=r"/CN/(?:Y\d{4}/V\d+/I\d+/|10\.\d+)",
                                   href_skip=r"(?:/CN/current|/CN/home)",
                                   max_items=80)
        for title, url, date in items:
            arts.append(Article(src["key"], src["name"], "期刊", "当期目录", title, url, date))
    return arts


def adapt_nsi(fetcher: Fetcher, src: dict):
    """南京体育学院期刊中心：体育学研究 + 南京体育学院学报（论文 + 编辑部公告）。"""
    html = fetcher.text_of(fetcher.get(src["url"]))
    if not html:
        return []
    arts = []
    # 论文：/tyxyj/njtyxyxbsk/article/abstract/ 或 /xb/njtyxyxbzk/article/abstract/
    for title, url, date in parse_generic_list(html, src["url"],
                                               href_keep=r"/article/abstract/", max_items=60):
        m = re.search(r"/abstract/(\d{8})", url)
        d = f"{m.group(1)[:4]}-{m.group(1)[4:6]}-{m.group(1)[6:8]}" if m else date
        arts.append(Article(src["key"], src["name"], "期刊", "当期目录", title, url, d))
    # 公告：/ch/reader/view_news.aspx?id=20260422...
    for title, url, date in parse_generic_list(html, src["url"],
                                               href_keep=r"/ch/reader/view_news\.aspx", max_items=30):
        m = re.search(r"id=(\d{8})", url)
        d = f"{m.group(1)[:4]}-{m.group(1)[4:6]}-{m.group(1)[6:8]}" if m else date
        arts.append(Article(src["key"], src["name"], "期刊", "编辑部公告", title, url, d))
    return arts


def adapt_old_cnki(fetcher: Fetcher, src: dict):
    """旧版 CNKI WebPublication（北京体育大学学报）：需会话，逐层进入过刊浏览最新一期。"""
    base = src["base"]
    arts = []
    s = fetcher.session
    got = False
    try:
        resp = fetcher.get(base, session=s)
        if resp is not None:
            html = fetcher.text_of(resp)
            if html and not is_waf(html):
                gklb = fetcher.get(base.replace("index.aspx",
                                                "wkTextContent.aspx?colType=4&tp=gklb&mid=bjtd"),
                                   session=s)
                html2 = fetcher.text_of(gklb)
                if html2 and not is_waf(html2):
                    year_links = parse_generic_list(html2, gklb.url,
                                                    href_keep=r"colType=4&yt=\d{4}&tp=gklb",
                                                    max_items=5)
                    if year_links:
                        year_url = year_links[0][1]
                        yhtml = fetcher.text_of(fetcher.get(year_url, session=s))
                        issue_links = parse_generic_list(yhtml, year_url,
                                                         href_keep=r"colType=4&yt=\d{4}&st=\d+",
                                                         max_items=20)
                        if issue_links:
                            issue_url = issue_links[0][1]
                            ihtml = fetcher.text_of(fetcher.get(issue_url, session=s))
                            for title, url, date in parse_generic_list(
                                    ihtml, issue_url,
                                    href_keep=r"wkArticleContent|colType=4&yt",
                                    max_items=60):
                                if "wkArticleContent" in url or "colType=4" in url:
                                    arts.append(Article(src["key"], src["name"], "期刊",
                                                        "本期栏目", title, url, date))
                            got = bool(arts)
    except Exception:
        return arts
    return arts


def adapt_generic(fetcher: Fetcher, src: dict):
    """通用列表页（期刊新闻公告、院校新闻/通知公告等）。"""
    arts = []
    urls = src["urls"] if isinstance(src.get("urls"), list) else [src["url"]]
    for entry in urls:
        if isinstance(entry, str):
            url, section = entry, src.get("section", "动态")
            keep_url = None
        else:
            url, section = entry["url"], entry.get("section", "动态")
            keep_url = entry.get("keep_url")
        resp = fetcher.get(url)
        html = fetcher.text_of(resp)
        if not html:
            continue
        if is_waf(html):
            continue
        for title, link, date in parse_generic_list(html, url,
                                                    max_items=src.get("max_items", 50),
                                                    keep_url_re=keep_url or ARTICLE_URL_RE):
            arts.append(Article(src["key"], src["name"], src.get("category", "院校"),
                                section, title, link, date))
    return arts


def run_source(fetcher: Fetcher, src: dict):
    """按 type 分发到对应适配器。"""
    kind = src.get("type", "generic")
    fn = {"xml_journal": adapt_xml_journal, "cbpt": adapt_cbpt_portal,
          "magtech": adapt_magtech, "nsi": adapt_nsi,
          "old_cnki": adapt_old_cnki, "generic": adapt_generic}.get(kind)
    if fn is None:
        return []
    return fn(fetcher, src)
