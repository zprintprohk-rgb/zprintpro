# -*- coding: utf-8 -*-
"""B1.5: write live ts titles back into CSV title columns (truth source = ts), then regen"""
import io, re

TS = r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts'
CSV = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'

ts = io.open(TS, encoding='utf-8').read()

def block_titles(slug):
    i = ts.find('"%s"' % slug)
    if i < 0:
        return None
    j = ts.find('\n  "', i + 10)
    seg = ts[i:j if j > 0 else len(ts)]
    return re.findall(r'"title":\s*"((?:[^"\\]|\\.)*)"', seg)[:3]

lines = io.open(CSV, encoding='utf-8').read().split('\n')
out = [lines[0]]
fixed = missing = 0
for l in lines[1:]:
    if not l.strip():
        continue
    f = l.split('\t')
    slug = f[3].strip()
    t = block_titles(slug)
    if t and len(t) == 3:
        f[5], f[6], f[7] = t[0], t[1], t[2]
        fixed += 1
    else:
        missing += 1
        print('WARN no ts titles for:', slug)
    out.append('\t'.join(f))
io.open(CSV, 'w', encoding='utf-8', newline='\n').write('\n'.join(out))
print('titles written back: %d | missing: %d' % (fixed, missing))
