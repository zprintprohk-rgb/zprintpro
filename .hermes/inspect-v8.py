#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Extract v8 template structure from Q-006 + articleSlugs location."""
import os, re, json

os.chdir(r'F:\zprintpro-nextjs')

d = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
c = d['tea-beverage-gift-box-printing-guide']['content']
print('=== Q-006 zh-hk content (v8 template) length:', len(c))
# print structure markers: h2/h3/p/strong/div classes
print(c[:6000])
