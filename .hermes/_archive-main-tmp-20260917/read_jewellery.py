#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Read jewellery-shopping-bag-printing-guide content from zh-hk.json"""
import json
import sys

with open(r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Check if it's a dict with the slug as key, or some other structure
print(f"Type: {type(data)}")
if isinstance(data, dict):
    print(f"Top keys: {list(data.keys())[:5]}")
    slug = "jewellery-shopping-bag-printing-guide"
    if slug in data:
        entry = data[slug]
        print(f"\n=== {slug} ===")
        print(f"Slug: {entry.get('slug', 'N/A')}")
        print(f"Title: {entry.get('title', 'N/A')}")
        print(f"Description: {entry.get('description', 'N/A')}")
        content = entry.get("content", "")
        print(f"\nContent length: {len(content)} chars")
        print(f"\n=== First 500 chars of content ===")
        print(content[:500])
        print(f"\n=== Last 500 chars of content ===")
        print(content[-500:])
    else:
        print(f"Slug not found. Available: {[k for k in data.keys() if 'jewel' in k.lower()]}")
