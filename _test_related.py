#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""16413b0-related-fix 本地 test: blog 标题 → 相关产品 SKU 类目"""
import re
import urllib.request
import json

def fetch(url):
    headers = {"User-Agent": "Mozilla/5.0 (M3-Verify)"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", errors="replace")
    except Exception as e:
        return 0, str(e)

# 加载 products.ts mapping
PROD_TS = "F:\\zprintpro-nextjs\\src\\data\\products.ts"
products_data = {}
try:
    with open(PROD_TS, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = re.compile(r"slug:\s*'([^']+)',.*?category_slug:\s*'([^']+)'", re.DOTALL)
    for m in pattern.finditer(content):
        products_data[m.group(1)] = m.group(2)
except Exception as e:
    print(f"ERR: {e}")
    exit(1)

# 测试 4 个 blog 跨 3 locale (12 个 URL)
TEST_CASES = [
    # (locale, blog_slug, expected_category, description)
    ("zh-hk", "apparel-shopping-bag-printing-guide", "paper-bags", "服裝品牌紙袋 blog"),
    ("zh-hk", "same-day-flyers-printing-hong-kong-guide", "flyers", "即日宣傳單張 blog"),
    ("zh-hk", "gang-run-card-boxes-hk-guide", "packaging", "拼版白卡彩盒 blog"),
    ("en", "apparel-shopping-bag-printing-guide", "paper-bags", "Apparel Shopping Bag EN blog"),
    ("ja", "apparel-shopping-bag-printing-guide", "paper-bags", "アパレルバッグ JA blog"),
    ("zh-hk", "real-estate-flyer-printing-guide", "flyers", "地產 flyer blog"),
]

print("=" * 80)
print("16413b0-related-fix 本地 test (8/5 14:20 K3 拍板)")
print("=" * 80)
print()

passed = 0
total = len(TEST_CASES)
for locale, slug, expected, desc in TEST_CASES:
    url = f"https://zprintpro.com/{locale}/blog/{slug}/"
    s, body = fetch(url)
    if s != 200:
        print(f"  ❌ {desc} | URL: {url} | HTTP {s}")
        continue
    # Find related products section
    idx = body.find("相關產品推薦") if locale == "zh-hk" else body.find("Related Products") if locale == "en" else body.find("関連製品")
    if idx == -1:
        # Try alternative
        m = re.search(r'相[關关].{0,5}產品.{0,5}推薦|Related.{0,5}Products|関連.{0,5}製品', body)
        idx = m.start() if m else -1
    if idx < 0:
        print(f"  ❌ {desc} | 没找到相关产品 section")
        continue
    # Extract slugs in next 8KB
    section = body[idx:idx+10000]
    slugs = re.findall(r'/product/([^/]+)/', section)
    seen = set()
    unique = []
    for ps in slugs:
        if ps not in seen:
            seen.add(ps)
            unique.append(ps)
    unique = unique[:4]
    cats = [products_data.get(s, "?") for s in unique]
    all_match = all(c == expected for c in cats)
    mark = "✅" if all_match else "❌"
    print(f"  {mark} {desc}")
    print(f"    URL: {url}")
    print(f"    Expected: {expected}")
    print(f"    Got: {cats}")
    for s, c in zip(unique, cats):
        check = "✓" if c == expected else "✗"
        print(f"      [{check}] {s} → {c}")
    if all_match:
        passed += 1

print()
print("=" * 80)
print(f"Result: {passed}/{total} PASS")
print("=" * 80)
