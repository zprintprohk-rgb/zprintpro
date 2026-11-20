#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Understand blog data architecture: page.tsx imports + blog-data JSON structure."""
import os, re, json

os.chdir(r'F:\zprintpro-nextjs')

content = open('src/app/[locale]/blog/[slug]/page.tsx', encoding='utf-8').read()

# find imports
print('=== imports ===')
for line in content.split('\n')[:60]:
    if 'import' in line or 'require' in line:
        print(line)

print()
print('=== blog-data refs in page.tsx ===')
for m in re.finditer(r'blog-data[^\'"]*', content):
    print(m.group(0))

print()
print('=== how content is used: search content: usage ===')
idx = content.find('posts[')
print(content[idx-200:idx+500] if idx >= 0 else 'not found')
