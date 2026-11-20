# -*- coding: utf-8 -*-
import io, re
t = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
tg = ['waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers']
for s in tg:
    i = t.index('"%s": {' % s)
    m = re.search(r'\n  "[a-z0-9-]+": \{', t[i+10:])
    j = i + 10 + m.start()
    seg = t[i:j]
    print(s, '| block_len=', len(seg), '| pet残留=', 'pet food' in seg, '| 舊FAQ張冠李戴=', '防水貼紙戶外可維持多久' in seg)
