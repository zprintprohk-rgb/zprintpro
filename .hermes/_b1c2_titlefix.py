# -*- coding: utf-8 -*-
# 5 个超带标题修正 (foil zh 56 在带内不动): CSV + ts 同步 -> regen -> guard 复跑
import io, json, csv
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
LOCS = ['zh-hk', 'en', 'ja']
FIX = {
 'foil-red-packets': {
  'en': 'Foil Stamp Red Packets | 12 Colors 100 MOQ | ZprintPro',
  'ja': '箔押しポチ袋印刷 | 12色 100個から HK$1.10起 | ZprintPro'},
 'custom-red-packets': {
  'zh-hk': '企業利是封定製 | 品牌Logo 100個起 HK$1.90起 | 智印港',
  'en': 'Corporate Red Packets | Logo 100 MOQ HK$1.90 | ZprintPro',
  'ja': '企業向けポチ袋 | ロゴ入り 100個から HK$1.90起 | ZprintPro'},
}
dec = json.JSONDecoder()

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

# CSV
rows = list(csv.reader(io.open(ROOT/'zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
tcol = [hdr.index('SEO标题(%s)' % x) for x in ('ZH', 'EN', 'JA')]
n = 0
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[si].strip()
    if slug in FIX:
        for li, loc in enumerate(LOCS):
            if loc in FIX[slug]:
                r[tcol[li]] = FIX[slug][loc]
                n += 1
w = io.open(ROOT/'zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV titles fixed:', n)

# ts
cur = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
for slug, m in FIX.items():
    for loc, v in m.items():
        cur = set_field(cur, slug, loc, 'title', v)
io.open(ROOT/'src/data/sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(cur)
print('ts titles fixed')
