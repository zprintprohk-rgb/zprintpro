# -*- coding: utf-8 -*-
import io, csv
rows = list(csv.reader(io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = rows[0]
for r in rows[1:]:
    if len(r) > 3 and r[3].strip() in ('foil-red-packets', 'custom-red-packets', 'embossed-red-packets'):
        print('CSV', r[3].strip(), '| title zh:', r[5][:50])
        print('     desc zh:', r[11][:60])
        print('     h1 zh:', r[14][:60])
