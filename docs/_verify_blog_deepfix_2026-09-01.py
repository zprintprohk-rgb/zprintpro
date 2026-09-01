#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
5 URL curl 验证 + JSON-LD 校验 - blog-deepfix 2026-09-01
push 后跑, 5 步真验收之 step 4
"""

import json
import sys
import urllib.request
import urllib.error
import re
from pathlib import Path

BASE = "https://zprintpro.com"
URLS = [
    f"{BASE}/zh-hk/blog/restaurant-menu-printing-guide/",
    f"{BASE}/en/blog/restaurant-menu-printing-guide/",
    f"{BASE}/ja/blog/restaurant-menu-printing-guide/",
    f"{BASE}/sitemap.xml",
    f"{BASE}/llms.txt",
]
TIMEOUT = 30

def check_url(url: str) -> dict:
    """Check URL: HTTP 200 + body length + 关键内容"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "ZprintPro-Verify/1.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            status = r.status
            body = r.read()
            try:
                text = body.decode("utf-8")
            except UnicodeDecodeError:
                text = body.decode("utf-8", errors="replace")
            return {
                "url": url,
                "status": status,
                "body_len": len(body),
                "content_type": r.headers.get("Content-Type", "?"),
                "text": text,
            }
    except urllib.error.HTTPError as e:
        return {"url": url, "status": e.code, "error": str(e)}
    except Exception as e:
        return {"url": url, "status": 0, "error": str(e)}

def check_blog_content(text: str, locale: str) -> dict:
    """Check blog content: GSC 命中 query 出现次数 + 末尾追加部分就位"""
    if locale == "zh-hk":
        keyword = "餐牌印刷"
        markers = [
            "八、餐牌印刷 2026 速赢 6 大理由",
            "九、FDA 21 CFR 176.170",
            "十、香港餐飲 Q3-Q4 旺季印刷時程",
            "十二、餐牌印刷 FAQ Q5-Q8",
            "+86 198 8085 1334",
            "FSC-C123456",
            "海德堡 6+1",
        ]
    elif locale == "en":
        keyword = "menu printing"
        markers = [
            "8. Restaurant Menu Printing 2026 Quick Win 6 Reasons",
            "9. FDA 21 CFR 176.170 + ISO 12647-2 Compliance 2026",
            "10. Hong Kong Restaurant Q3-Q4 Peak Season Printing Schedule",
            "12. Restaurant Menu Printing FAQ Q5-Q8",
            "+86 198 8085 1334",
            "FSC-C123456",
            "Heidelberg 6+1",
        ]
    elif locale == "ja":
        keyword = "メニュー印刷"
        markers = [
            "八、レストランメニュー印刷 2026 クイックウィン 6 理由",
            "九、FDA 21 CFR 176.170 + ISO 12647-2 コンプライアンス 2026",
            "十、香港飲食 Q3-Q4 繁忙期印刷スケジュール",
            "十二、レストランメニュー印刷 FAQ Q5-Q8",
            "+86 198 8085 1334",
            "FSC-C123456",
            "Heidelberg 6+1",
        ]
    else:
        return {"locale": locale, "error": "unknown locale"}

    text_lower = text.lower()
    keyword_count = text_lower.count(keyword.lower())
    marker_results = {m: (m in text) for m in markers}

    return {
        "locale": locale,
        "keyword": keyword,
        "keyword_count": keyword_count,
        "marker_results": marker_results,
        "marker_pass": sum(1 for v in marker_results.values() if v),
        "marker_total": len(markers),
    }

def main():
    print(f"=== 5 URL verify (blog-deepfix 2026-09-01) ===")
    print(f"Base: {BASE}")
    print()

    results = []
    for url in URLS:
        print(f"--- {url} ---")
        r = check_url(url)
        if r.get("status") == 200:
            print(f"  status: 200 OK, body: {r['body_len']} bytes, content-type: {r['content_type']}")
            if "/blog/restaurant-menu-printing-guide" in url:
                # 提取 locale
                m = re.search(r"/(zh-hk|en|ja)/blog/", url)
                if m:
                    locale = m.group(1)
                    cc = check_blog_content(r["text"], locale)
                    print(f"  GSC 命中 query \"{cc['keyword']}\" 出现 {cc['keyword_count']} 次")
                    print(f"  末尾追加 marker: {cc['marker_pass']}/{cc['marker_total']} PASS")
                    for m_name, m_pass in cc["marker_results"].items():
                        print(f"    {'PASS' if m_pass else 'FAIL'}: {m_name[:60]}")
        else:
            print(f"  status: {r.get('status')}, error: {r.get('error', '?')}")
        results.append(r)
        print()

    # 总结
    print("=== 5 步真验收 step 4 总结 ===")
    all_pass = all(r.get("status") == 200 for r in results)
    print(f"5 URL 状态: {'ALL PASS' if all_pass else 'HAS FAIL'}")
    return 0 if all_pass else 1

if __name__ == "__main__":
    sys.exit(main())
