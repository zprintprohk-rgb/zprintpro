# -*- coding: utf-8 -*-
# B1c2 事故修复 v2 — 全部字段读写锚定 "seo": 之后, 杜绝 name 块 locale 键误配
import io, json, csv
from pathlib import Path
from collections import Counter
ROOT = Path(r'F:\zprintpro-nextjs')

CUR = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
BAK = io.open(ROOT/'.hermes/_bak-sku-seo-before-b1c2-bodies.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
LOCS = ['zh-hk', 'en', 'ja']
FIELDS = ['title', 'description', 'h1', 'keywords']

def get_block(t, slug):
    i = t.index('"%s":' % slug)
    return t[i:i + 80000]

def loc_seg(block, loc):
    si = block.index('"seo":')
    li = block.index('"%s":' % loc, si)
    return block[li:]

def get_field(t, slug, loc, field):
    seg = loc_seg(get_block(t, slug), loc)
    fi = seg.index('"%s":' % field)
    v, _ = dec.raw_decode(seg[fi + len('"%s":' % field):].lstrip())
    return v

def set_field(t, slug, loc, field, value):
    i = t.index('"%s":' % slug)
    block = t[i:i + 80000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    abs_fi = i + li2 + fi + len('"%s":' % field)
    txt = t[abs_fi:].lstrip()
    lead = len(t[abs_fi:]) - len(txt)
    _, used = dec.raw_decode(txt)
    return t[:abs_fi + lead] + json.dumps(value, ensure_ascii=False) + t[abs_fi + lead + used:]

# 自检: 锚定函数在备份上读 foil zh title 应=旧值
assert get_field(BAK, 'foil-red-packets', 'zh-hk', 'title') == '燙金利是封印刷 | 燙金 局部UV | 100個起 HK$1.10起 | 智印港', get_field(BAK, 'foil-red-packets', 'zh-hk', 'title')
assert 'MOQ' in get_field(BAK, 'embossed-red-packets', 'en', 'title'), get_field(BAK, 'embossed-red-packets', 'en', 'title')
print('anchor self-check OK')

NEW_TITLES = {
 'foil-red-packets': {
  'zh-hk': '燙金利是封印刷 | 金箔銀箔12色 100個起 HK$1.10起 | 智印港',
  'en': 'Hot Stamp Red Packet Printing | 12 Foil Colors 100pcs HK$1.10+ | ZprintPro',
  'ja': '箔押しポチ袋印刷 | 12色の箔 100個から HK$1.10起 | ZprintPro'},
 'custom-red-packets': {
  'zh-hk': '企業利是封定製 | 品牌Logo利是封 100個起 HK$1.90起 | 智印港',
  'en': 'Corporate Red Packet Customization | Brand Logo 100pcs HK$1.90+ | ZprintPro',
  'ja': '企業向けポチ袋カスタマイズ | ロゴ入り 100個から HK$1.90起 | ZprintPro'},
}

# --- CSV 修复 ---
rows = list(csv.reader(io.open(ROOT/'zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
labels = {'title': 'SEO标题', 'keywords': 'SEO关键词', 'description': 'SEO描述', 'h1': 'H1标题'}
col = {f: [hdr.index('%s(%s)' % (lab, x)) for x in ('ZH', 'EN', 'JA')] for f, lab in labels.items()}
fixed = []
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[si].strip()
    if slug == 'embossed-red-packets':
        for f in FIELDS:
            for li, loc in enumerate(LOCS):
                v = get_field(BAK, slug, loc, f)
                r[col[f][li]] = ','.join(v) if isinstance(v, list) else v
        fixed.append(slug)
    elif slug in NEW_TITLES:
        for li, loc in enumerate(LOCS):
            r[col['title'][li]] = NEW_TITLES[slug][loc]
        fixed.append(slug)
w = io.open(ROOT/'zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV repaired:', fixed)

# --- ts 同步 ---
for slug in NEW_TITLES:
    for loc in LOCS:
        CUR = set_field(CUR, slug, loc, 'title', NEW_TITLES[slug][loc])
for f in ('description', 'h1'):
    for loc in LOCS:
        CUR = set_field(CUR, 'embossed-red-packets', loc, f, get_field(BAK, 'embossed-red-packets', loc, f))
io.open(ROOT/'src/data/sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(CUR)
print('ts titles(foil/custom) + embossed desc/h1 restored')

# --- 全雷审计 (锚定版) ---
CUR2 = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
mines = []
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[si].strip()
    if not slug or ('"%s":' % slug) not in CUR2:
        continue
    for f in FIELDS:
        for li, loc in enumerate(LOCS):
            try:
                tv = get_field(CUR2, slug, loc, f)
            except Exception:
                continue
            tv = ','.join(str(x) for x in tv) if isinstance(tv, list) else str(tv)
            cv = r[col[f][li]].strip()
            if tv.strip() != cv:
                mines.append((slug, f, loc))
repaired = {'foil-red-packets', 'custom-red-packets', 'embossed-red-packets'}
others = [m for m in mines if m[0] not in repaired]
print('landmine audit: total mismatches=%d, outside repaired 3 = %d' % (len(mines), len(others)))
for slug, n in Counter(m[0] for m in others).most_common(12):
    print('  ', slug, n)
