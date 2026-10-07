# -*- coding: utf-8 -*-
"""Locate en/ja faq first entries INSIDE books block (163808-186000)"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
seg = csc[163808:186000]
for m in re.finditer(r"faq: \[\s*\n\s*\{ q: '([^']{5,70})'", seg):
    print('faq @%d: %s' % (163808 + m.start(), m.group(1)))
