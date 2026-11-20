# -*- coding: utf-8 -*-
# CSV 源头修正: 利是封 6 行 × 图片Alt标签(ZH/EN/JA) → GEO 公式终版 (与 products.ts seoImages.alt 逐字一致)
# 防御: 逐格断言旧值非空才写入; 写后重读校验
import io, csv
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
CSV = ROOT / 'zprintpro-sku-seo-data.csv'

NEW = {
 'foil-red-packets': {
  'zh-hk': '利是封印刷 / 燙金 / 春節紅包 | 香港燙金利是封印刷 120g紅色紙張 燙金 100個起印 | 智印港',
  'en': 'Red Packet Printing / Gold Foil / Lunar New Year | Foil Red Packets 120gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / 箔押し | 箔押しポチ袋 120g・100枚から | ZprintPro',
 },
 'embossed-red-packets': {
  'zh-hk': '利是封印刷 / 浮雕 / 春節紅包 | 香港浮雕利是封印刷 150g紅色紙張 浮雕 100個起印 | 智印港',
  'en': 'Red Packet Printing / Embossed / Lunar New Year | Embossed Red Packets 150gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / エンボス | エンボスポチ袋 150g・100枚から | ZprintPro',
 },
 'custom-red-packets': {
  'zh-hk': '利是封印刷 / 定製 / 春節紅包 | 香港定製利是封印刷 120g–150g紅色紙張 100個起印 | 智印港',
  'en': 'Red Packet Printing / Custom / Lunar New Year | Custom Red Packets 120–150gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / オリジナル | オリジナルポチ袋 120g–150g・100枚から | ZprintPro',
 },
 'cartoon-red-packets': {
  'zh-hk': '利是封印刷 / 卡通 / 春節紅包 | 香港卡通利是封印刷 120g銅版紙 彩色 100個起印 | 智印港',
  'en': 'Red Packet Printing / Cartoon / Lunar New Year | Cartoon Red Packets 120gsm Art Paper, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / キャラクター | キャラクターポチ袋 120gコート紙・100枚から | ZprintPro',
 },
 'eco-red-packets': {
  'zh-hk': '利是封印刷 / 環保 / 春節紅包 | 香港環保利是封印刷 FSC認證再生紙 無覆膜 100個起印 | 智印港',
  'en': 'Red Packet Printing / Eco / Lunar New Year | Eco Red Packets FSC Recycled Paper Unlaminated, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / エコ | エコポチ袋 FSC再生紙 無PP加工・100枚から | ZprintPro',
 },
 'large-red-packets': {
  'zh-hk': '利是封印刷 / 大號 / 春節紅包 | 香港大號利是封印刷 150g–200g紅色紙張 100個起印 | 智印港',
  'en': 'Red Packet Printing / Large Size / Lunar New Year | Large Red Packets 150–200gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / 大判 | 大判ポチ袋 150g–200g・100枚から | ZprintPro',
 },
}
LOC2COL = {'zh-hk': '图片Alt标签(ZH)', 'en': '图片Alt标签(EN)', 'ja': '图片Alt标签(JA)'}

rows = list(csv.reader(io.open(CSV, encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
slug_i = hdr.index('Slug')
col_i = {loc: hdr.index(c) for loc, c in LOC2COL.items()}
print('cols:', {k: v for k, v in col_i.items()}, 'slug_i=', slug_i)

patched = 0
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[slug_i].strip()
    if slug in NEW:
        for loc, ci in col_i.items():
            old = r[ci]
            assert old.strip(), (slug, loc, 'empty old')
            r[ci] = NEW[slug][loc]
        patched += 1
assert patched == 6, patched

w = io.open(CSV, 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV patched rows:', patched)

# 重读校验
rows2 = list(csv.reader(io.open(CSV, encoding='utf-8-sig'), delimiter='\t'))
ok = 0
for r in rows2[1:]:
    if len(r) < len(hdr):
        continue
    slug = r[slug_i].strip()
    if slug in NEW:
        for loc, ci in col_i.items():
            assert r[ci] == NEW[slug][loc], (slug, loc)
            ok += 1
assert ok == 18, ok
print('CSV re-read verify: 18/18 OK')
