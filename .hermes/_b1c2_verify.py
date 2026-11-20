# -*- coding: utf-8 -*-
# 落地后复核: 1) embossed 变化性质 2) foil/custom title/desc/h1 + body + imageAlt 四维
import io, json, re, difflib
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
new = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
old = io.open(ROOT/'.hermes/_bak-sku-seo-before-b1c2-bodies.ts', encoding='utf-8').read()

def block(t, slug):
    i = t.index('"%s":' % slug)
    j = t.index('\n  },', i)
    return t[i:j]

for slug in ('embossed-red-packets',):
    o, n = block(old, slug), block(new, slug)
    for line in difflib.unified_diff(o.splitlines(), n.splitlines(), lineterm='', n=1):
        if line.startswith(('+', '-')) and not line.startswith(('+++', '---')):
            print('EMB', line[:150])

dec = json.JSONDecoder()
for slug in ('foil-red-packets', 'custom-red-packets'):
    b = block(new, slug)
    for loc in ('zh-hk', 'en', 'ja'):
        li = b.index('"%s":' % loc)
        seg = b[li:]
        ti = seg.index('"title":')
        val, _ = dec.raw_decode(seg[ti + len('"title":'):].lstrip())
        bi = seg.index('"body":')
        body, _ = dec.raw_decode(seg[bi + len('"body":'):].lstrip())
        ai = seg.index('"imageAlt":')
        alt, _ = dec.raw_decode(seg[ai + len('"imageAlt":'):].lstrip())
        assert '名片' not in val and '名刺' not in val and 'Business Card' not in val, (slug, loc, 'BC leak in title')
        print('%s %s title=%s' % (slug, loc, val))
        print('  body_len=%d alt=%s' % (len(body), alt[:60]))
