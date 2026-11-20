#!/usr/bin/env python3
"""Side-by-side compare V23.4 vs V23.5 PC-001 HERO."""
import re

def get_hero_body(path, sku):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku)}\s*', b)
        if not m:
            continue
        hero_m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if hero_m:
            return hero_m.group(1).strip()
    return None

v234 = get_hero_body(r'F:\zprintpro-nextjs\seedream\v23.4-prompts-en.txt', 'PC-001')
v235 = get_hero_body(r'F:\zprintpro-nextjs\seedream\v23.5-prompts-en.txt', 'PC-001')

print('=' * 80)
print('V23.4 PC-001 HERO (旧) — 2306 chars')
print('=' * 80)
print(v234)
print()
print('=' * 80)
print('V23.5 PC-001 HERO (新) — 3195 chars')
print('=' * 80)
print(v235)
