#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""en + ja 二次 verify"""
import urllib.request

URLS = [
    ("en", "https://zprintpro.com/en/blog/restaurant-menu-printing-guide/", "menu printing"),
    ("ja", "https://zprintpro.com/ja/blog/restaurant-menu-printing-guide/", "メニュー印刷"),
]
MARKERS = {
    "en": [
        "8. Restaurant Menu Printing 2026 Quick Win 6 Reasons",
        "9. FDA 21 CFR 176.170 + ISO 12647-2 Compliance 2026",
        "10. Hong Kong Restaurant Q3-Q4 Peak Season Printing Schedule",
        "12. Restaurant Menu Printing FAQ Q5-Q8",
        "+86 198 8085 1334",
        "FSC-C123456",
        "Heidelberg 6+1",
        "Cornell",
        "ISO 12647-2",
        "PP (polypropylene)",
        "PVC",
    ],
    "ja": [
        "八、レストランメニュー印刷 2026 クイックウィン 6 理由",
        "九、FDA 21 CFR 176.170 + ISO 12647-2 コンプライアンス 2026",
        "十、香港飲食 Q3-Q4 繁忙期印刷スケジュール",
        "十二、レストランメニュー印刷 FAQ Q5-Q8",
        "+86 198 8085 1334",
        "FSC-C123456",
        "Heidelberg 6+1",
        "Cornell",
        "ISO 12647-2",
        "PP (ポリプロピレン)",
        "PVC",
    ],
}

for locale, url, kw in URLS:
    print(f"=== {locale} ===")
    req = urllib.request.Request(url, headers={"User-Agent": "Mavis-Verify/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8")
        print(f"Status: {r.status}, Body: {len(body)} chars")
        print(f"GSC 命中 query \"{kw}\" 出现 {body.count(kw)} 次")
        passed = 0
        for m in MARKERS[locale]:
            c = body.count(m)
            if c > 0:
                passed += 1
                print(f"  PASS ({c}次): {m[:60]}")
            else:
                print(f"  FAIL (0次): {m[:60]}")
        print(f"Marker: {passed}/{len(MARKERS[locale])} PASS")
    print()
