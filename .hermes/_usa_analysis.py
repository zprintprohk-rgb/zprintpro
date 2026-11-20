# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\.hermes\logs\gsc-query-country-2026-10-25.json', encoding='utf-8'))
rows = [x for x in d['rows'] if x['keys'][1] == 'usa']
rows.sort(key=lambda x: -x.get('impressions', 0))
print('=== USA queries: top 45 by impressions (28d) ===')
for x in rows[:45]:
    k = x['keys'][0]
    print(f"{k[:42]:42s} imps={x.get('impressions',0):5.0f} clicks={x.get('clicks',0):3.0f} ctr={x.get('ctr',0)*100:4.2f}% pos={x.get('position',0):5.1f}")
print()
print('=== 退场词候选: imps>=5, clicks==0, pos<=30 (ranked by imps) ===')
cands = [x for x in rows if x.get('impressions',0) >= 5 and x.get('clicks',0) == 0 and x.get('position',0) <= 30]
cands.sort(key=lambda x: -x.get('impressions',0))
for x in cands[:30]:
    k = x['keys'][0]
    print(f"{k[:42]:42s} imps={x.get('impressions',0):4.0f} pos={x.get('position',0):5.1f}")
print()
print('=== USA 0-click words total / imps total ===')
z = [x for x in rows if x.get('clicks',0) == 0]
print('0-click rows:', len(z), 'of', len(rows), '| imps in 0-click rows:', sum(x.get('impressions',0) for x in z))
