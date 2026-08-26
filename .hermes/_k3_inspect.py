#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/17 开干 - 检视类目页 title 与博客清单"""
import os
import re

# 1. Find category page titles
print("=== 类目页 title 检视 ===")
for root, dirs, files in os.walk(r'src\app\[locale]'):
    if 'category' in root and 'page.tsx' in files:
        parts = root.split(os.sep)
        for i, p in enumerate(parts):
            if p == 'category' and i + 1 < len(parts):
                slug = parts[i + 1]
                full = os.path.join(root, 'page.tsx')
                with open(full, 'r', encoding='utf-8') as f:
                    content = f.read(3000)
                # Find first <title> or title prop
                m = re.search(r"title:\s*['\"]([^'\"]+)['\"]", content)
                if m:
                    print('  ' + slug + ': ' + m.group(1)[:80])
                else:
                    print('  ' + slug + ': (no title prop in first 3KB)')
                break

# 2. Find blog slugs
print()
print("=== 博客 slug 清单 ===")
with open(r'src\data\blog-posts.ts', 'r', encoding='utf-8') as f:
    content = f.read()
slugs = re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", content)
print('Total: ' + str(len(slugs)))
for s in slugs:
    print('  ' + s)
