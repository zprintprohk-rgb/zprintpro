# -*- coding: utf-8 -*-
"""Extract live 3-locale titles per slug from ts (JSON format)"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()

def block(slug):
    i = ts.find('"%s"' % slug)
    if i < 0:
        return None
    # block ends at next top-level "\n  \"" key after i+1
    j = ts.find('\n  "', i + 10)
    return ts[i:j if j > 0 else len(ts)]

for slug in ['foil-red-packets', 'custom-red-packets', 'wall-calendars', 'outdoor-posters', 'waterproof-stickers']:
    b = block(slug)
    if not b:
        print(slug, 'NOT FOUND'); continue
    titles = re.findall(r'"title":\s*"((?:[^"\\]|\\.)*)"', b)
    print(slug, '| n_titles:', len(titles))
    for t in titles:
        print('   ', t[:80])
