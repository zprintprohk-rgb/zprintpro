# -*- coding: utf-8 -*-
"""Locate books block en/ja faq first entries for money FAQ injection"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
# books block: find '"books"' style key then faq arrays within
i = csc.find('books')
# crude: find the big books block by a known A5 marker
for marker in ["slug: 'books'", "'books':", 'books: {']:
    j = csc.find(marker)
    print('marker %-14s at %s' % (repr(marker), j))
# print faq first entries near books region
seg = csc[154000:175000]
for m in re.finditer(r'faq: \[\s*\n\s*\{ q: \'([^\']{5,60})', seg):
    print('faq first entry @%d: %s' % (154000 + m.start(), m.group(1)))
