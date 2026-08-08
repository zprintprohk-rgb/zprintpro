#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Check poster-size-guide content in page.tsx + retail/wedding red packet overlap."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

# 1) page.tsx poster-size-guide content head
content = open('src/app/[locale]/blog/[slug]/page.tsx', encoding='utf-8').read()
print('page.tsx size:', len(content))

# find zh-hk poster-size-guide entry
idx = content.find("'poster-size-guide'")
print('poster-size-guide first idx:', idx)
if idx >= 0:
    chunk = content[idx:idx+3000]
    # print first 2000 chars of the content
    print(chunk[:2000])
