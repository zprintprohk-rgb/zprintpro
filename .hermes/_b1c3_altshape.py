# -*- coding: utf-8 -*-
import io, json
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
for slug in ('a5-flyers', 'a2-posters', 'roll-stickers', 'folded-leaflets'):
    i = t.index('"%s":' % slug)
    blk = t[i:i + 90000]
    li = blk.index('"seo":')
    li2 = blk.index('"zh-hk":', li)
    seg = blk[li2:]
    fi = seg.index('"imageAlt":')
    v, _ = dec.raw_decode(seg[fi+11:].lstrip())
    if isinstance(v, dict):
        print(slug, 'dict keys:', list(v)[:6], '| zh val sample:', json.dumps(v.get(list(v)[0]), ensure_ascii=False)[:80])
    else:
        print(slug, 'STR:', v[:80])
# 类型定义
import re
m = re.search(r'imageAlt[^;]{0,200}', t[:6000])
print('TYPE:', m.group(0)[:200] if m else 'not in head')
