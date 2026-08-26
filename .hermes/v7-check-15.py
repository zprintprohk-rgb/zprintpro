#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check 15+ years trust signal in HTML body (HTML-escaped)"""
import sys
import re
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SLUG = "apparel-shopping-bag-printing-guide"
LOCALES = ["zh-hk", "en", "ja"]

for loc in LOCALES:
    url = f"https://zprintpro.com/{loc}/blog/{SLUG}/"
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            body = r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"{loc}: ERR {e}")
        continue

    # Find all '15' occurrences with context
    matches = re.findall(r"15.{0,80}", body)
    trust_matches = [m for m in matches if "年" in m or "year" in m.lower() or "Years" in m]
    print(f"\n=== {loc} ({len(trust_matches)} trust matches) ===")
    for m in trust_matches[:5]:
        print(f"  {m[:100]!r}")
