#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""5 URL marker 精准验证 (绕过 PowerShell GBK)"""
import urllib.request

BASE = "https://zprintpro.com"
URLS = [
    ("zh-hk", f"{BASE}/zh-hk/blog/restaurant-menu-printing-guide/", "餐牌印刷"),
    ("en",    f"{BASE}/en/blog/restaurant-menu-printing-guide/", "menu printing"),
    ("ja",    f"{BASE}/ja/blog/restaurant-menu-printing-guide/", "メニュー印刷"),
]

MARKERS = {
    "zh-hk": [
        "八、餐牌印刷 2026 速赢 6 大理由",
        "九、FDA 21 CFR 176.170",
        "十、香港餐飲 Q3-Q4 旺季印刷時程",
        "十二、餐牌印刷 FAQ Q5-Q8",
        "+86 198 8085 1334",
        "FSC-C123456",
        "海德堡 6+1",
    ],
    "en": [
        "8. Restaurant Menu Printing 2026 Quick Win 6 Reasons",
        "9. FDA 21 CFR 176.170 + ISO 12647-2 Compliance 2026",
        "10. Hong Kong Restaurant Q3-Q4 Peak Season Printing Schedule",
        "12. Restaurant Menu Printing FAQ Q5-Q8",
        "+86 198 8085 1334",
        "FSC-C123456",
        "Heidelberg 6+1",
    ],
    "ja": [
        "八、レストランメニュー印刷 2026 クイックウィン 6 理由",
        "九、FDA 21 CFR 176.170 + ISO 12647-2 コンプライアンス 2026",
        "十、香港飲食 Q3-Q4 繁忙期印刷スケジュール",
        "十二、レストランメニュー印刷 FAQ Q5-Q8",
        "+86 198 8085 1334",
        "FSC-C123456",
        "Heidelberg 6+1",
    ],
}

for locale, url, kw in URLS:
    print(f"=== {locale} ===")
    print(f"URL: {url}")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mavis-Verify/1.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8")
            print(f"Status: {r.status}, Body: {len(body)} chars")
            kw_count = body.count(kw)
            print(f"GSC 命中 query \"{kw}\" 出现 {kw_count} 次")
            passed = 0
            for m in MARKERS[locale]:
                c = body.count(m)
                if c > 0:
                    passed += 1
                    print(f"  PASS ({c}次): {m[:60]}")
                else:
                    print(f"  FAIL (0次): {m[:60]}")
            print(f"Marker 总结: {passed}/{len(MARKERS[locale])} PASS")
    except Exception as e:
        print(f"ERROR: {e}")
    print()
