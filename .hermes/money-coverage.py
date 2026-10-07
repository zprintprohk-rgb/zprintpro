# -*- coding: utf-8 -*-
"""Money-word coverage check: top money queries vs current CSV kw/title coverage"""
import io, json, re

money = json.loads(io.open(r'F:\zprintpro-nextjs\.hermes\money-kw-20261005.json', encoding='utf-8').read())
csv = io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8').read().lower()

# aggregate unique money queries by imps
def agg(rows):
    d = {}
    for r in rows:
        q = r['q'].strip().lower()
        if q not in d or r['imps'] > d[q]['imps']:
            d[q] = r
    return sorted(d.values(), key=lambda x: -x['imps'])

en_targets = [r for r in agg(money['us']) if r['imps'] >= 6]
ja_targets = [r for r in agg(money['jp']) if r['imps'] >= 6]
zh_targets = [r for r in agg(money['hk']) if r['imps'] >= 6]

print('== EN money words (imps>=6): coverage in CSV kw/title ==')
for r in en_targets[:20]:
    q = r['q']
    key = q.replace(' printing', '').replace('print ', '').split()[0] if ' ' in q else q
    covered = q in csv or key in csv
    print('  %-42s im=%-4g pos=%-5g %s' % (q, r['imps'], r['pos'], 'COVERED' if covered else '*** GAP ***'))

print('\n== JA money words (imps>=6) ==')
for r in ja_targets[:16]:
    q = r['q']
    core = re.sub(r'(印刷|特急|即日|激安|安い|格安)', '', q).strip() or q
    covered = q in csv or core in csv
    print('  %-38s im=%-4g pos=%-5g %s' % (q, r['imps'], r['pos'], 'COVERED' if covered else '*** GAP ***'))

print('\n== ZH money words reference (imps>=25, already handled) ==')
for r in zh_targets[:10]:
    print('  %-30s im=%-4g pos=%g' % (r['q'], r['imps'], r['pos']))
