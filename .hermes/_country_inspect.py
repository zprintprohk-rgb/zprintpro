# -*- coding: utf-8 -*-
import io, sys, json
from collections import Counter
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\.hermes\logs\gsc-query-country-2026-10-25.json', encoding='utf-8'))
rows = d['rows']
print('rows:', len(rows))
# country code shapes
codes = Counter(x['keys'][1] for x in rows)
print('country codes:', dict(codes))
# total by country
by_country = Counter()
for x in rows:
    by_country[x['keys'][1]] += x.get('impressions', 0)
print('imps by country:', dict(by_country.most_common(10)))
# sample rows
for x in rows[:6]:
    print(x['keys'], x.get('impressions'), x.get('clicks'), x.get('position'))
