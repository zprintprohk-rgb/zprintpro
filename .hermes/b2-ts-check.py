# -*- coding: utf-8 -*-
import io, re
ts = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
for slug in ['greeting-cards', 'japan-doujin', 'calendars', 'envelopes', 'graduation-yearbook', 'doujinshi-printing', 'postcard-set', 'eco-tote-bag']:
    m = re.search("'" + slug + "':\\s*\\{[\\s\\S]{0,400}?", ts)
    if m:
        seg = m.group(0)
        t = re.search(r"seoTitle:\s*\{([\s\S]{0,260}?)\}", seg)
        print(slug, '| in-ts YES |', (t.group(1)[:200].replace('\n', ' ') if t else 'no seoTitle in seg'))
    else:
        print(slug, '| in-ts NO')
