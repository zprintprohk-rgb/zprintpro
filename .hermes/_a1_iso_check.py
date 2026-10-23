# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
raw = open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
print('plain 9001:', raw.count('9001'))
for m in re.finditer('9001', raw):
    s = max(0, m.start()-80); e = min(len(raw), m.end()+80)
    seg = raw[s:e]
    print('---', repr(seg))
# search flexible ISO-9001
for m in re.finditer(r'ISO\s*9001', raw):
    print('FLEX HIT at', m.start(), repr(raw[max(0,m.start()-60):m.end()+60]))
