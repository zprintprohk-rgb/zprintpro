# -*- coding: utf-8 -*-
"""Locate residual template strings: which slug blocks still contain them?"""
import io, re

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
parts = re.split(r'\n  "([a-z0-9-]+)": \{', ts)
entries = {}
order = []
for i in range(1, len(parts) - 1, 2):
    entries[parts[i]] = parts[i + 1]
    order.append(parts[i])

NEEDLES = [
    "即日少量の急ぎは10枚から",
    "少量の即日対応は10枚から",
    "24〜48時間以内",
    "標準納期は3〜5営業日",
    "from ZprintPro the US",
    "高品質・短納期・グローバル配送",
]
for needle in NEEDLES:
    holders = [s for s in order if needle in entries.get(s, "")]
    print("%-40s -> %d blocks: %s" % (needle, len(holders), ", ".join(holders[:12]) + ("..." if len(holders) > 12 else "")))
