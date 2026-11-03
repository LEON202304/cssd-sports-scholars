#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
下载「体育学人」公众号文章封面图到 assets/wechat/，并回填 wechat-articles.json 的 cover 字段。
用法（仓库根目录，用带 requests 的 python）：
    python download_wechat_covers.py
成功下载的图保存为 assets/wechat/<id>.jpg，cover 字段填该相对路径；
失败的条目 cover 留空，前端自动回退渐变色块。
"""
import json, os, re, time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(HERE, "wechat-articles.json")
IMG_DIR = os.path.join(HERE, "assets", "wechat")
os.makedirs(IMG_DIR, exist_ok=True)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Referer": "https://mp.weixin.qq.com/"}

OG_RE = re.compile(r'property="og:image"\s+content="([^"]+)"')
CDN_RE = re.compile(r'(https?://mmbiz\.qpic\.ct?/[^\s"\'<>]+?wx_fmt=[a-z]+)')

def find_cover_url(html: str):
    m = OG_RE.search(html)
    if m:
        return m.group(1)
    m = CDN_RE.search(html)
    return m.group(1) if m else None

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    ok, fail = 0, 0
    for art in data["articles"]:
        art_id = art["id"]
        out_path = os.path.join(IMG_DIR, art_id + ".jpg")
        if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
            art["cover"] = f"assets/wechat/{art_id}.jpg"
            ok += 1
            print(f"[skip] {art_id} 已存在")
            continue
        try:
            r = requests.get(art["url"], headers=HEADERS, timeout=20)
            r.encoding = "utf-8"
            if "环境异常" in r.text or "完成验证" in r.text:
                print(f"[fail] {art_id} 触发微信验证页，稍后重试或手动保存头图")
                fail += 1
                continue
            img_url = find_cover_url(r.text)
            if not img_url:
                print(f"[fail] {art_id} 未找到封面图")
                fail += 1
                continue
            ir = requests.get(img_url, headers=HEADERS, timeout=20)
            if ir.status_code == 200 and len(ir.content) > 5000:
                with open(out_path, "wb") as f:
                    f.write(ir.content)
                art["cover"] = f"assets/wechat/{art_id}.jpg"
                ok += 1
                print(f"[ok]   {art_id} -> assets/wechat/{art_id}.jpg ({len(ir.content)//1024}KB)")
            else:
                print(f"[fail] {art_id} 图片下载 status={ir.status_code}")
                fail += 1
            time.sleep(2)
        except Exception as e:
            print(f"[fail] {art_id} 异常: {e}")
            fail += 1

    data["updatedAt"] = time.strftime("%Y-%m-%d")
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n完成：成功 {ok}，失败 {fail}。已回填 cover 字段。")

if __name__ == "__main__":
    main()
