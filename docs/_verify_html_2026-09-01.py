#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查生产 HTML 末尾追加是否生效"""
import urllib.request
import re

URL = "https://zprintpro.com/zh-hk/blog/restaurant-menu-printing-guide/"

req = urllib.request.Request(URL, headers={"User-Agent": "Mavis-Verify/1.0"})
with urllib.request.urlopen(req, timeout=30) as r:
    body = r.read().decode("utf-8")
    print(f"Status: {r.status}, Body: {len(body)} chars")

# 找所有 H3 段标题 (h3 class)
h3_matches = re.findall(r'<h3[^>]*>(.*?)</h3>', body, re.DOTALL)
print(f"\nH3 段数: {len(h3_matches)}")
for i, h3 in enumerate(h3_matches):
    h3_clean = re.sub(r'<[^>]+>', '', h3).strip()
    if h3_clean:
        print(f"  H3 #{i+1}: {h3_clean[:80]}")

# 找关键 marker
print("\n关键 marker 检查:")
critical_markers = [
    "FDA 21 CFR 176.170",
    "餐牌印刷 2026 速赢 6 大理由",
    "香港餐飲 Q3-Q4 旺季印刷時程",
    "餐牌印刷 FAQ Q5-Q8",
    "餐牌印刷材質對比表",
    "FSC-C123456",
    "海德堡 6+1",
    "Cornell",
    "ISO 12647-2",
    "PP (聚丙烯)",
    "PVC",
]
for m in critical_markers:
    c = body.count(m)
    print(f"  {m}: {c} 次")

# 检查 content 段 (找 "八、" 段, 末尾追加开始)
print("\n末尾追加段检查:")
tail_markers = [
    "八、餐牌印刷",
    "九、",
    "十、",
    "十一、",
    "十二、",
]
for m in tail_markers:
    c = body.count(m)
    print(f"  '{m}': {c} 次")
    if c > 0:
        idx = body.find(m)
        print(f"    Context: {repr(body[max(0,idx-20):idx+80])}")

# 检查 content div (找包含 "菜單" 的 main article)
print("\nMain article content:")
article_match = re.search(r'<article[^>]*>(.*?)</article>', body, re.DOTALL)
if article_match:
    article = article_match.group(1)
    print(f"  article 长度: {len(article)}")
    # 找 H3 段数
    h3_in_article = re.findall(r'<h3[^>]*>(.*?)</h3>', article, re.DOTALL)
    print(f"  article H3 段数: {len(h3_in_article)}")
    for i, h3 in enumerate(h3_in_article):
        h3_clean = re.sub(r'<[^>]+>', '', h3).strip()
        if h3_clean:
            print(f"    H3 #{i+1}: {h3_clean[:80]}")
else:
    print("  no <article> found")
