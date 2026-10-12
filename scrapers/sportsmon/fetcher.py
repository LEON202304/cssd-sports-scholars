# -*- coding: utf-8 -*-
"""HTTP 抓取基础：统一会话、重试、编码、WAF 识别。"""
import threading
import time
import requests
import urllib3
from urllib3.exceptions import InsecureRequestWarning

urllib3.disable_warnings(InsecureRequestWarning)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

WAF_MARKERS = ("WEB 应用防火墙", "人机识别", "当前正在对访问请求进行", "webshieldsessionverify", "waf")

DEFAULT_HEADERS = {
    "User-Agent": UA,
    "Accept": ("text/html,application/xhtml+xml,application/xml;q=0.9,"
               "image/avif,image/webp,*/*;q=0.8"),
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Connection": "keep-alive",
}


def is_waf(text: str) -> bool:
    """判断响应是否为 WAF 人机识别拦截页。"""
    if not text:
        return False
    return len(text) < 8000 and any(k in text for k in WAF_MARKERS)


class Fetcher:
    """带重试与限速的统一抓取器（线程安全：每个线程独立的 requests.Session）。"""

    def __init__(self, timeout=25, retries=2, delay=0.4, max_retry_sleep=8):
        self.timeout = timeout
        self.retries = retries
        self.delay = delay
        self.max_retry_sleep = max_retry_sleep
        self._local = threading.local()

    @property
    def session(self):
        s = getattr(self._local, "session", None)
        if s is None:
            s = requests.Session()
            s.headers.update(DEFAULT_HEADERS)
            self._local.session = s
        return s

    def get(self, url, *, session=None, headers=None, timeout=None, retries=None):
        """GET 并返回 Response；失败返回 None；WAF 页返回该 Response（由调用方识别）。"""
        s = session or self.session
        hdrs = dict(headers) if headers else None
        to = timeout or self.timeout
        rts = self.retries if retries is None else retries
        last = None
        for i in range(rts + 1):
            try:
                resp = s.get(url, headers=hdrs, timeout=to, verify=False,
                             allow_redirects=True)
                if is_waf(resp.text):
                    # 部分站点 WAF 第一次访问返回 JS 挑战，稍作等待换请求头重试一次
                    if i < rts:
                        time.sleep(min(3 + i * 3, self.max_retry_sleep))
                        hdrs = dict(hdrs or DEFAULT_HEADERS)
                        hdrs["User-Agent"] = UA.replace("126.0.0.0", "125.0.0.0")
                        continue
                return resp
            except requests.RequestException as e:
                last = e
                if i < rts:
                    time.sleep(min(1.5 * (i + 1), self.max_retry_sleep))
        if last is not None:
            raise last
        return None

    def text_of(self, resp):
        """按页面编码还原文本。"""
        if resp is None:
            return ""
        enc = resp.apparent_encoding or "utf-8"
        try:
            return resp.content.decode(enc, errors="replace")
        except Exception:
            return resp.text

    def sleep(self, sec=None):
        time.sleep(self.delay if sec is None else sec)
