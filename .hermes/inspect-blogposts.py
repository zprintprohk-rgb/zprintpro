#!/usr/bin/env python3
"""Inspect blog-posts.ts tail structure"""
import re
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
print('TOTAL_SIZE=', len(text))

# Find blogPosts array end
m = re.search(r'export const blogPosts\s*=\s*\[(.*?)\];', text, re.DOTALL)
if m:
    print('---blogPosts last 500 chars---')
    print(repr(m.group()[-500:]))
else:
    # Try simpler pattern
    print('---last 1000 chars---')
    print(repr(text[-1000:]))
