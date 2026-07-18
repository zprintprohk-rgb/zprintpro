#!/usr/bin/env python3
"""Find current articleSlugs tail in page.tsx"""
import re
p = r'F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
m = re.search(r'articleSlugs.*?\];', text, re.DOTALL)
if m:
    print('---articleSlugs last 200 chars---')
    print(repr(m.group()[-200:]))
