#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Check en/ja blocks for poster-size-guide + a5-vs-a6 entries + last entries before closing."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

content = open('src/app/[locale]/blog/[slug]/page.tsx', encoding='utf-8').read()

# find all occurrences of poster-size-guide and a5-vs-a6
for slug in ['poster-size-guide', 'a5-vs-a6-flyer-size']:
    positions = [m.start() for m in re.finditer(re.escape(slug), content)]
    print(f'{slug}: {len(positions)} occurrences at {positions}')

# find the zh-hk/en/ja block boundaries
for loc in ['zh-hk', 'en', 'ja']:
    p = content.find(f'  {loc}: {{')
    print(f'--- {loc} block at {p}')

# find end of each block: look for closing pattern of posts object
# show context around last a5-vs-a6 occurrence (which is likely in zh-hk block per earlier read)
last = content.rfind('a5-vs-a6-flyer-size')
print()
print('=== last a5-vs-a6 context ===')
print(content[last-200:last+1500])
