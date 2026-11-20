# -*- coding: utf-8 -*-
# 簇3 验证: leaflet 字段回读 + 全雷审计
import io, json, csv
from pathlib import Path
from collections import Counter
ROOT = Path(r'F:\zprintpro-nextjs')
CUR = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
LOCS = ['zh-hk', 'en', 'ja']
FIELDS = ['title', 'description', 'h1', 'keywords']

def get_field(t, slug, loc, field):
    i = t.index('"%s":' % slug)
    block = t[i:i + 90000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    v, _ = dec.raw_decode(seg[fi + len('"%s":' % field):].lstrip())
    return v

import sys
sys.path.insert(0, str(ROOT/'.hermes'))
from _b1c3_content2 import LEAFLET_CSV
ok = True
for f in FIELDS:
    for loc in LOCS:
        tv = get_field(CUR, 'folded-leaflets', loc, f)
        tv = ','.join(tv) if isinstance(tv, list) else tv
        ev = LEAFLET_CSV[f][loc] if f != 'keywords' else LEAFLET_CSV['keywords'][loc]
        if tv.strip() != ev.strip():
            print('MISMATCH', f, loc, '|ts:', tv[:60], '|exp:', ev[:60])
            ok = False
print('leaflet fields verify:', 'OK' if ok else 'FAIL')

body = get_field(CUR, 'folded-leaflets', 'zh-hk', 'body')
print('leaflet zh body head:', body[:50].replace('\n', ' '))
assert '六種摺疊結構' in body

# 全雷审计
rows = list(csv.reader(io.open(ROOT/'zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
labels = {'title': 'SEO标题', 'keywords': 'SEO关键词', 'description': 'SEO描述', 'h1': 'H1标题'}
col = {f: [hdr.index('%s(%s)' % (lab, x)) for x in ('ZH', 'EN', 'JA')] for f, lab in labels.items()}
mines = []
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[si].strip()
    if not slug or ('"%s":' % slug) not in CUR:
        continue
    for f in FIELDS:
        for li, loc in enumerate(LOCS):
            try:
                tv = get_field(CUR, slug, loc, f)
            except Exception:
                continue
            tv = ','.join(str(x) for x in tv) if isinstance(tv, list) else str(tv)
            cv = r[col[f][li]].strip()
            if tv.strip() != cv:
                mines.append((slug, f, loc))
print('landmine audit: total mismatches =', len(mines))
for slug, n in Counter(m[0] for m in mines).most_common(10):
    print('  ', slug, n, [m[1] for m in mines if m[0] == slug][:6])
