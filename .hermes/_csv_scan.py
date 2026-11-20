# -*- coding: utf-8 -*-
import io, re
t = io.open('zprintpro-sku-seo-data.csv', encoding='utf-8').read().split('\n')
hdr = t[0].split('\t')
print('cols:', len(hdr))
RETIRE = ['fluorescent-stickers','drink-tokens','cafe-table-cards','wedding-place-cards','save-the-date-cards','wedding-seating-charts','wedding-suite-bundle','eco-tote-bag','postcard-set']
rows = t[1:]
print('data rows:', len(rows))
for slug in RETIRE + ['waterproof-stickers','roll-stickers']:
    hits = [i for i, r in enumerate(rows, 2) if len(r.split('\t')) > 3 and r.split('\t')[3] == slug]
    print(slug, '->', hits)
# dump waterproof row 各列长度摘要
for i, r in enumerate(rows, 2):
    c = r.split('\t')
    if len(c) > 3 and c[3] == 'waterproof-stickers':
        print('--- waterproof row line', i)
        for j, h in enumerate(hdr):
            v = c[j] if j < len(c) else ''
            print('  [%02d] %s = %s' % (j, h, v[:60]))
        break
