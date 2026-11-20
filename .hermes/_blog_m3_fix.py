# -*- coding: utf-8 -*-
# 修正: 去重 rush-printing-hk-guide (原 89 已有), 补 rush-printing-delivery-guide + etsy-seller-printing-guide
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
mpath = ROOT / 'src/data/blog-m3-images.ts'
t = io.open(mpath, encoding='utf-8').read()

# 1) 删除我误加的重复条目行 (按行首 slug 匹配对象形态行, 不手写全串)
pat = re.compile(r"^  'rush-printing-hk-guide': \{[^\n]*\},\n", re.M)
m = pat.search(t)
assert m, 'dup line not found'
print('dup line removed:', m.group(0)[:110])
t = t[:m.start()] + t[m.end():]

# 2) 真缺的两条 → 从 products.ts 取 per-locale hero
t2 = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
base = t2.index('export const products')
def hero3(prod):
    i = t2.index("slug: '%s'" % prod, base)
    j = t2.index('imagesByLocale', i)
    blk = t2[j:j+4000]
    out = {}
    for mm in re.finditer(r"'(zh-hk|en|ja)': \[(.*?)\]", blk, re.DOTALL):
        p = re.findall(r"'(/images/[^']+)'", mm.group(2))[0]
        assert (ROOT / 'public' / p.lstrip('/')).exists(), p
        out[mm.group(1)] = p
    assert len(out) == 3
    return out

adds = {
 'rush-printing-delivery-guide': hero3('same-day-flyers'),
 'etsy-seller-printing-guide': hero3('folding-boxes'),
}
lines = ''
for slug, L in adds.items():
    lines += "  '%s': { 'zh-hk': '%s', en: '%s', ja: '%s' },\n" % (slug, L['zh-hk'], L['en'], L['ja'])
anchor = "  'print-specifications-reference-guide-2026': '/images/blog-m3/print-specifications-reference-guide-2026.webp',\n"
assert t.count(anchor) == 1
t = t.replace(anchor, anchor + lines)
io.open(mpath, 'w', encoding='utf-8', newline='\n').write(t)

# 3) 终验: 三语 JSON 全 slug 覆盖 = 0 缺口; 无重复键
src = t
keys = re.findall(r"^  '([a-z0-9-]+)':", src, re.M)
from collections import Counter
dups = [k for k, c in Counter(keys).items() if c > 1]
assert not dups, dups
allsl = set()
for loc in ('zh-hk', 'en', 'ja'):
    d = json.load(io.open(ROOT / f'src/data/blog-data/{loc}.json', encoding='utf-8'))
    allsl |= set(d.keys())
unmapped = sorted(allsl - set(keys))
print('total keys:', len(keys), '| unmapped across 3 locales:', unmapped)
assert not unmapped, unmapped
print('ALL BLOG SLUGS COVERED')
