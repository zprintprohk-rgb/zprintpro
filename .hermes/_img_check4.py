# -*- coding: utf-8 -*-
import io
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
for slug in ('place-cards', 'hardcover-books', 'red-packets'):
    i = t.index("slug: '%s'" % slug)
    seg = t[i-100:i+2200]
    has = 'imagesByLocale' in t[i:i+3000]
    j = t.index('imagesByLocale', i) if has else -1
    print('=== %s (imagesByLocale=%s) ===' % (slug, has))
    print(seg[100:700].replace('\n', ' | ')[:600])
    if has:
        print('block head:', t[j:j+260].replace('\n', ' '))
    print()
