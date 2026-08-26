#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Show full a5-vs-a6-flyer-size entries in all 3 blocks (page.tsx)."""
import os, re

os.chdir(r'F:\zprintpro-nextjs')

content = open('src/app/[locale]/blog/[slug]/page.tsx', encoding='utf-8').read()

# positions of a5-vs-a6-flyer-size (4: zh-hk entry, en entry, ja entry, articleSlugs)
for m in re.finditer(r"'a5-vs-a6-flyer-size'", content):
    pos = m.start()
    # check if it's inside an object (followed by ': {')
    after = content[pos+len("'a5-vs-a6-flyer-size'"):pos+len("'a5-vs-a6-flyer-size'")+30]
    print(f'--- pos {pos}: next 30 chars: {after!r}')
    if ': {' in after:
        # print full entry: from pos to closing '},' at same indent
        entry = content[pos:pos+900]
        print(entry[:900])
        print()
