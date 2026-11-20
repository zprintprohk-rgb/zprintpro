# -*- coding: utf-8 -*-
# eco-flyers imageAlt: CSV 源头修正 (MOQ100 假值 → 真值 GEO alt) -> regen 落地
import io, csv
ROOT = r'F:\zprintpro-nextjs'
NEW = {
 'ZH': '環保傳單印刷 10張起 HK$0.38起 | 再生紙雙面四色印製 | 智印港',
 'EN': 'Eco Flyer Printing 10 MOQ from $0.60 | Recycled Stock Double-Sided | ZprintPro',
 'JA': 'エコチラシ印刷 10枚から ¥75〜 | 再生紙両面フルカラー | ZprintPro',
}
# lint: 简中/品牌
for x, v in NEW.items():
    assert '智印印港' not in v and 'ZprintPro the' not in v
    if x == 'ZH':
        assert 'ZprintPro' not in v and '智印港' in v
    else:
        assert '智印港' not in v
rows = list(csv.reader(io.open(ROOT + r'\zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
n = 0
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    if r[si].strip() == 'eco-flyers':
        for x, v in NEW.items():
            r[hdr.index('图片Alt标签(%s)' % x)] = v
            n += 1
w = io.open(ROOT + r'\zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV eco-flyers alt cells fixed:', n)
