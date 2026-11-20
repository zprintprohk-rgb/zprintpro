# -*- coding: utf-8 -*-
# roll body vs 贴纸 5 兄弟 8-gram Jaccard (B1c dedup 口径)
import io, re, json

def norm(s):
    return re.sub(r'[^\w\u4e00-\u9fff\u3040-\u30ff]+', '', s.lower())

def ngrams(s, n=8):
    s = norm(s)
    return set(s[i:i+n] for i in range(max(0, len(s)-n+1)))

t = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
def get_body(slug):
    i = t.index('"%s": {' % slug)
    seg = t[i:i+40000]
    m = re.search(r'"body": "(.*?)"\n      \},\n      "(?:en|ja)"', seg, re.DOTALL)
    if not m:
        m = re.search(r'"body": "(.*?)"\n      \}\n    \},', seg, DOTALL)
    return m.group(1) if m else ''

def get_body_loc(slug, loc):
    i = t.index('"%s": {' % slug)
    seg = t[i:i+60000]
    j = seg.index('"%s": {' % loc)
    seg2 = seg[j:j+20000]
    m = re.search(r'"body": "(.*?)",\n        "imageAlt"', seg2, re.DOTALL) or \
        re.search(r'"body": "(.*?)"\n      \}', seg2, re.DOTALL)
    return m.group(1) if m else ''

SIBLINGS = ['waterproof-stickers','transparent-stickers','removable-stickers','small-batch-stickers','die-cut-stickers','foil-stickers','security-stickers','fruit-food-label-stickers']
out = {}
for loc in ('zh-hk', 'en', 'ja'):
    rb = get_body_loc('roll-stickers', loc)
    assert len(rb) > 200, 'roll body %s too short: %d' % (loc, len(rb))
    rg = ngrams(rb)
    row = {}
    for s in SIBLINGS:
        try:
            sb = get_body_loc(s, loc)
        except Exception:
            continue
        sg = ngrams(sb)
        if not sg:
            continue
        row[s] = round(len(rg & sg) / len(rg | sg), 3)
    out[loc] = row
    print(loc, json.dumps(row, ensure_ascii=False))
mx = max(max(v.values()) for v in out.values())
print('MAX similarity = %.3f (B1c 簇 1 门槛 <0.35)' % mx)
assert mx < 0.35, 'TOO SIMILAR'
print('DEDUP PASS')
