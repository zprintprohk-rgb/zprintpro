# -*- coding: utf-8 -*-
import io
t = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
tg = ['waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers']
for k, s in enumerate(tg):
    i = t.index('"%s": {' % s)
    j = t.index('"%s": {' % tg[k+1]) if k+1 < len(tg) else t.index('"removable-stickers": {')
    seg = t[i:j]
    pos = seg.find('pet food')
    print(s, '| block_len=', len(seg), '| pet_pos=', pos, ('| CTX: ' + seg[max(0,pos-60):pos+40].replace('\n',' ')) if pos >= 0 else '')
