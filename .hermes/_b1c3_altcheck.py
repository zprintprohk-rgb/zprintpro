# -*- coding: utf-8 -*-
import io, json
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
i = t.index('"folded-leaflets":')
blk = t[i:i+90000]
dec = json.JSONDecoder()
li = blk.index('"seo":')
for loc in ('zh-hk', 'en', 'ja'):
    li2 = blk.index('"%s":' % loc, li)
    seg = blk[li2:]
    fi = seg.index('"imageAlt":')
    txt = seg[fi+11:].lstrip()
    v, used = dec.raw_decode(txt)
    print(loc, type(v).__name__, json.dumps(v, ensure_ascii=False)[:160])
# CSV 当前 leaflet alt 格
import csv
rows = list(csv.reader(io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
for r in rows[1:]:
    if r[si].strip() == 'folded-leaflets':
        for x in ('ZH', 'EN', 'JA'):
            c = hdr.index('图片Alt标签(%s)' % x)
            print('CSV', x, ':', r[c][:100])
