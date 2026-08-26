#!/usr/bin/env python3
"""v7 verify 5 SKU 优化结果"""
import re
from pathlib import Path

c = Path("src/data/products.ts").read_text(encoding="utf-8")

for slug in ['white-card-bags', 'handle-bags', 'mailer-boxes', 'food-boxes', 'kraft-paper-packaging-box']:
    m = re.search(rf"slug: '{slug}',[\s\S]{{0,3500}}", c)
    if not m:
        print(slug, 'NOT FOUND')
        continue
    block = m.group(0)
    has_opt = "optimizedAt: '2026-07-21'" in block
    has_round = "optimizationRound: 1," in block
    # Find title_zh value
    title_m = re.search(r"title_zh: '([^']+)'", block)
    title = title_m.group(1) if title_m else 'NONE'
    # Check description has industry list
    desc_m = re.search(r"description: '([^']+)'", block)
    desc = desc_m.group(1) if desc_m else 'NONE'
    has_industry_zh = '適配行業' in desc
    has_industry_en = 'Best for:' in re.search(r"descriptionEn: '([^']+)'", block).group(1) if re.search(r"descriptionEn:", block) else False
    has_industry_ja = '適用業界' in re.search(r"descriptionJa: '([^']+)'", block).group(1) if re.search(r"descriptionJa:", block) else False
    print(f"\n{slug}:")
    print(f"  optimizedAt: {has_opt}, round 1: {has_round}")
    print(f"  title_zh: {title[:100]}...")
    print(f"  industry list: zh={has_industry_zh}, en={has_industry_en}, ja={has_industry_ja}")
    print(f"  desc industries: {[s for s in desc.split('、') if any(c in s for c in '行業店坊品')][:5]}")
