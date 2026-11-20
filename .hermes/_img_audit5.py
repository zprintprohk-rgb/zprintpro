# -*- coding: utf-8 -*-
import io, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
lines = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read().split('\n')
opens = [i for i, ln in enumerate(lines) if ln.strip() == '{']
odd = [(i + 1, repr(lines[i])) for i in opens if not (lines[i].startswith('  {') or lines[i].startswith('    {'))]
print('odd-indent openers:', odd)
t = '\n'.join(lines)
i = t.index("slug: 'premium-greeting-cards'")
seg = t[i:i+6000]
j = seg.index('imagesByLocale')
print('--- premium imagesByLocale ---')
print(seg[j:j+1200])
