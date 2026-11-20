# -*- coding: utf-8 -*-
import io, json
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
i = t.index('"foil-red-packets":')
seg = t[i:i+40000]
for loc in ('zh-hk', 'en', 'ja'):
    li = seg.index('"%s":' % loc, seg.index('"seo":'))
    s2 = seg[li:]
    fi = s2.index('"title":')
    v, _ = dec.raw_decode(s2[fi+8:].lstrip())
    print(loc, '=', v)
