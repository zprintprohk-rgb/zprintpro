#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Read GSC csv + list existing blog slugs."""
import os, csv, re

os.chdir(r'F:\zprintpro-nextjs')

print('=== gsc-7d-2026-08-05-utf8.csv ===')
try:
    for line in open('.hermes/gsc-7d-2026-08-05-utf8.csv', encoding='utf-8'):
        print(line.rstrip())
except Exception as e:
    print('ERR', e)

print()
print('=== blog slugs in blog-posts.ts ===')
content = open('src/data/blog-posts.ts', encoding='utf-8').read()
slugs = re.findall(r"slug:\s*'([^']+)'", content)
print('count:', len(slugs))
for s in sorted(slugs):
    print(' -', s)
