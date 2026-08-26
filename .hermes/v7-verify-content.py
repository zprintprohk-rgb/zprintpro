#!/usr/bin/env python3
"""v7 verify blog content quality (zh-hk 1200+/en 400+/ja 400+)"""
import json, re, sys
from pathlib import Path

SLUG = "apparel-shopping-bag-printing-guide"

def check_locale(loc, content, min_chars):
    issues = []
    h3 = len(re.findall(r"<h3", content))
    tables = len(re.findall(r"<table", content))
    details = len(re.findall(r"<details", content))
    links = re.findall(r'href="([^"]+)"', content)
    internal = [l for l in links if l.startswith("/") and not l.startswith("//") and "zprintpro.com" not in l]
    nap = len(re.findall(r"Shenzhen|深圳|深セン|China factory", content))
    price_count = len(re.findall(r"(HK\$|US\$|JPY|¥|NT\$)", content))
    has_y15 = len(re.findall(r"15\+\s*年|15\+ Years|15\+ 年", content))
    has_img = len(re.findall(r"<img", content, re.IGNORECASE))
    has_cover = "cover" in content.lower() and len(re.findall(r"cover[-_]", content.lower()))
    print(f"--- {loc} ---")
    print(f"  length: {len(content)} chars (min {min_chars}) {'PASS' if len(content) >= min_chars else 'FAIL'}")
    print(f"  h3: {h3}")
    print(f"  tables: {tables}")
    print(f"  FAQ (details): {details} {'PASS' if details >= 4 else 'FAIL'}")
    print(f"  internal links: {len(internal)}")
    if internal:
        for l in internal[:8]:
            print(f"    -> {l}")
    print(f"  price anchors: {price_count}")
    print(f"  15+ years: {has_y15}")
    print(f"  NAP pollution (Shenzhen/深圳/etc): {nap} {'OK' if nap == 0 else 'FAIL'}")
    print(f"  <img> tags: {has_img} {'OK' if has_img == 0 else 'FAIL'}")
    return issues

for loc, min_chars in [("zh-hk", 1200), ("en", 400), ("ja", 400)]:
    p = Path(f"src/data/blog-data/{loc}.json")
    j = json.loads(p.read_text(encoding="utf-8"))
    content = j.get(SLUG, {}).get("content", "")
    if not content:
        print(f"!! {loc}: content EMPTY")
        continue
    check_locale(loc, content, min_chars)
