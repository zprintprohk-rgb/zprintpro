# -*- coding: utf-8 -*-
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()

def block_span(t, start_marker):
    j = t.find(start_marker)
    assert j > -1, start_marker
    depth, instr, esc = 0, False, False
    i = t.index('{', j)
    k = i
    while k < len(t):
        c = t[k]
        if instr:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == "'": instr = False
        else:
            if c == "'": instr = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: break
        k += 1
    end = t.index(';', k) + 1
    return j, end

for name in ('flyersContent', 'postersContent'):
    j, end = block_span(cs, 'const %s' % name)
    blk = cs[j:end]
    print('== %s span=%d len=%d' % (name, j, end - j))
    for loc in ('zh-hk', 'en:', 'ja:'):
        key = "'zh-hk': {" if loc == 'zh-hk' else loc + ' {'
        li = blk.find(key)
        if li > -1:
            seg_end = blk.find("\n  },", li)
            seg = blk[li:seg_end if seg_end > -1 else li+6000]
            print('  %s fields: %s' % (loc.strip(':'), re.findall(r'^\s{4}(\w+):', seg, re.M)))
    io.open(str(ROOT/('.hermes/_c3_%s_orig.txt' % name)), 'w', encoding='utf-8').write(blk)

# folded-leaflets ts 块现值
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
i = t.index('"folded-leaflets":')
blk = t[i:i+40000]
dec = json.JSONDecoder()
si = blk.index('"seo":')
for loc in ('zh-hk', 'en', 'ja'):
    li = blk.index('"%s":' % loc, si)
    seg = blk[li:]
    for f in ('title', 'description', 'h1'):
        fi = seg.index('"%s":' % f)
        v, _ = dec.raw_decode(seg[fi + len('"%s":' % f):].lstrip())
        print('leaflet', loc, f, '=', v[:70])
fi = blk.index('"body":')
body, _ = dec.raw_decode(blk[fi+7:].lstrip())
print('leaflet zh body len=%d head=%s' % (len(body), body[:80]))
# faqSchema in products.ts
p = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
pi = p.index("slug: 'folded-leaflets'")
pseg = p[pi:pi+60000]
fj = pseg.index('faqSchema:')
arr, _ = dec.raw_decode(pseg[fj+10:].lstrip())
print('leaflet faqSchema items:', len(arr))
# products.ts 是否有 basePrice 字段 (簇2 guard 用 basePrice_en)
print('basePrice_en present:', 'basePrice_en' in p[pi:pi+90000])
