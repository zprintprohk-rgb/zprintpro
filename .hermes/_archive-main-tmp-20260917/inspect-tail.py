#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Find blogPosts array tail + page.tsx en/ja block tail insertion points."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

bp = open('src/data/blog-posts.ts', encoding='utf-8').read()
# blogPosts array — find last entries before closing
idx = bp.find('export const blogPosts')
print('=== blogPosts tail ===')
tail = bp[idx:idx+4000]
# find the last entry reference
print(tail[-2500:])
