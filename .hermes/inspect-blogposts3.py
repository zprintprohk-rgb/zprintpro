#!/usr/bin/env python3
"""Find blogPosts array tail in blog-posts.ts"""
import re
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
# Search for the closing ]; of blogPosts array
# It should be after the last 'const lpXxx' definition
# Find all '];' (top-level) - the blogPosts array has 40+ entries
print('---all "];\\n" positions---')
for m in re.finditer(r'\n\];', text):
    pos = m.start()
    # Show context
    print(f'  pos {pos}: ...{text[max(0,pos-150):pos+5]!r}...')
    print()
