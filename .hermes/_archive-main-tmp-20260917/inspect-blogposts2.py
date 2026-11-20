#!/usr/bin/env python3
"""Inspect blog-posts.ts - find blogPosts array end"""
import re
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
print('TOTAL_SIZE=', len(text))

# Find blogPosts array
m = re.search(r'export const blogPosts\s*=\s*\[', text)
if m:
    start_pos = m.start()
    # Find matching ];
    # Just look for next \n]; after start_pos
    end_match = re.search(r'\n\];', text[start_pos:])
    if end_match:
        end_pos = start_pos + end_match.start()
        print(f'blogPosts array: pos {start_pos} - {end_pos}')
        # Show last 500 chars of array
        print('---array last 500 chars---')
        print(repr(text[end_pos-500:end_pos+10]))

# Find all lp* definitions
print('---all lp* defs---')
for m in re.finditer(r'const (lp\w+): BlogPostMeta', text):
    print(f'  {m.group(1)} at pos {m.start()}')

# Find all references in blogPosts array
print('---all lp* references in blogPosts---')
# Find the array range
if start_pos and end_pos:
    array_text = text[start_pos:end_pos]
    for m in re.finditer(r'\b(lp\w+),', array_text):
        print(f'  {m.group(1)}')
