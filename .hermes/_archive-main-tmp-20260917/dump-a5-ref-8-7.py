# -*- coding: utf-8 -*-
"""Dump full a5-vs-a6-flyer-size entry from zh-hk.json as v8 format reference + check poster entry in page.tsx."""
import json

with open('src/data/blog-data/zh-hk.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

entry = data.get('a5-vs-a6-flyer-size')
if entry:
    print("TITLE:", entry['title'])
    print("DESC:", entry['description'])
    print("DATE:", entry['date'], "| CAT:", entry['category'])
    print("=== CONTENT (full) ===")
    print(entry['content'])
