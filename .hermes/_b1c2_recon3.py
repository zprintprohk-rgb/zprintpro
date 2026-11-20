# -*- coding: utf-8 -*-
# round3: faqSchema 结构 / category 专属块样板 / foil 字段名 / body raw_decode 采样
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')

i = t.index("slug: 'foil-red-packets'", base)
seg = t[i:i+9000]
j = seg.index('faqSchema')
print('foil faqSchema 原文 700 字:')
print(seg[j:j+700])
print('\nfoil 字段名:', re.findall(r'^\s{4}([a-zA-Z_]+):', seg, re.M)[:30])

# body raw_decode
s = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
i = s.index('"foil-red-packets":')
seg = s[i:i+40000]
k = seg.index('"body":')
dec = json.JSONDecoder()
body, end = dec.raw_decode(seg[k + len('"body":'):].lstrip())
print('\nfoil body decoded len=%d links=%d' % (len(body), body.count('](')))
print('head:', body[:150].replace('\n', ' | '))
# body 之后跟的键
rest = seg[k + len('"body":'):].lstrip()
print('after body key:', rest[end:end+40].replace('\n', ' '))

# category 专属块样板: 找 buyingGuide 块
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
for key in ("'stickers': {", '"stickers": {', 'greeting-cards: {'):
    i = cs.find(key)
    if i > -1:
        print('\ncategory dedicated block sample (%s) 1200字:' % key)
        print(cs[i:i+1200])
        break
else:
    # 找 buyingGuide 出现处
    i = cs.find('buyingGuide')
    print('\nbuyingGuide first @%d:' % i)
    print(cs[max(0,i-400):i+800])
