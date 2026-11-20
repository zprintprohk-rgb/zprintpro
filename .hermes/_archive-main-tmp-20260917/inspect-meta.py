#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Full structure of recent blog meta entries + articleSlugs tail + JSON entry key order."""
import os, re, json

os.chdir(r'F:\zprintpro-nextjs')

bp = open('src/data/blog-posts.ts', encoding='utf-8').read()

# a5-vs-a6-flyer-size full entry
idx = bp.find("slug: 'a5-vs-a6-flyer-size'")
print('=== a5-vs-a6-flyer-size entry (start at %d) ===' % idx)
print(bp[idx-100:idx+900])

# check BlogPostMeta type def
tidx = bp.find('interface BlogPostMeta')
if tidx < 0:
    tidx = bp.find('type BlogPostMeta')
print()
print('=== BlogPostMeta def ===')
print(bp[tidx:tidx+700] if tidx >= 0 else 'not found')
