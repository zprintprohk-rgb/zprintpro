#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Diff matrix slugs vs blog-posts.ts slugs."""
import json, os, re

os.chdir(r'F:\zprintpro-nextjs')

m = json.load(open('.hermes/industry-keyword-matrix.json', encoding='utf-8'))
queue = m.get('queue', [])
bp = open('src/data/blog-posts.ts', encoding='utf-8').read()
bp_slugs = set(re.findall(r"slug:\s*'([^']+)'", bp))

print('=== Matrix queue items NOT yet in blog-posts.ts ===')
for item in queue:
    if not isinstance(item, dict):
        continue
    slug = item.get('slug', '')
    status = item.get('status', 'pending')
    if slug and slug not in bp_slugs:
        print(f"- {item.get('id')} | {slug} | status={status} | cat={item.get('category')} | prio={item.get('priority')} | ind={item.get('industry')}")

print()
print('=== Covered count ===', sum(1 for i in queue if isinstance(i, dict) and i.get('slug') in bp_slugs), '/', len(queue))

# also list all blog-posts.ts slugs w/ dates to see recent output cadence
print()
print('=== Recent blogs by date (tail) ===')
entries = re.findall(r"slug:\s*'([^']+)',\s*\n\s*categoryKey:\s*'([^']+)',\s*\n\s*source:\s*'([^']+)',\s*\n\s*date:\s*'([^']+)'", bp)
for e in sorted(entries, key=lambda x: x[3])[-15:]:
    print(e)
