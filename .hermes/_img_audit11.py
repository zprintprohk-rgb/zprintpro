# -*- coding: utf-8 -*-
import io
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
for slug in ('wedding-invitations', 'place-cards'):
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+5000]
    j = seg.find('imagesByLocale')
    print('=== %s ===' % slug)
    print(seg[j:j+700])
    print()
