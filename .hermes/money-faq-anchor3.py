# -*- coding: utf-8 -*-
"""All faq-like keys inside books block region"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
seg = csc[163808:190000]
for m in re.finditer(r'(faq\w*|quickAnswer)\s*[:=]', seg):
    print('%s @%d: %s' % (m.group(1), 163808 + m.start(), seg[m.start():m.start() + 130].replace('\n', ' ')))
