#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Check slug list tail + poster blog coverage."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

content = open('src/data/blog-posts.ts', encoding='utf-8').read()
slugs = re.findall(r"slug:\s*'([^']+)'", content)
print('total slugs:', len(slugs))
print('tail:', sorted(slugs)[-30:])

# check poster-related entries
for s in ['poster-size-guide', 'poster-printing-guide', 'retail-shop-poster-printing-guide', 'a5-vs-a6-flyer-size']:
    idx = content.find("slug: '" + s + "'")
    print('\n===', s, 'at', idx)
    if idx >= 0:
        chunk = content[idx:idx+1200]
        print(chunk[:1200])
