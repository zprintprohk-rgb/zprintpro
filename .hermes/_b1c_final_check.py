# -*- coding: utf-8 -*-
import io, re
t = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
tg = ['waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers']
for s in tg:
    i = t.index('"%s": {' % s)
    seg = t[i:i+30000]
    print(s, '| pet残留:', 'pet food' in seg)
m = re.search(r'"transparent-stickers": \{[\s\S]{0,1500}?"h1": "([^"]*)"', t)
print('transparent first h1 =', m.group(1))
# 每槽 h1 检查（zh）
for s in tg:
    i = t.index('"%s": {' % s)
    seg = t[i:i+30000]
    hz = re.search(r'"zh-hk": \{[\s\S]{0,600}?"h1": "((?:[^"\\]|\\.)*)"', seg)
    he = re.search(r'"en": \{[\s\S]{0,600}?"h1": "((?:[^"\\]|\\.)*)"', seg)
    hj = re.search(r'"ja": \{[\s\S]{0,600}?"h1": "((?:[^"\\]|\\.)*)"', seg)
    print(s[:20], '| zh:', hz.group(1)[:30], '| ja:', hj.group(1)[:40])
