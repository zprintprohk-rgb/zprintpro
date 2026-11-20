#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Verify URL route patterns from sitemap + check category config."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

# check sitemap for route patterns
sm = open('public/sitemap-zh-hk.xml', encoding='utf-8').read()
urls = re.findall(r'<loc>([^<]+)</loc>', sm)
print('sitemap-zh-hk urls:', len(urls))
# sample poster-related
for u in urls:
    if 'poster' in u or 'category' in u:
        print(' -', u)
