# -*- coding: utf-8 -*-
"""测量底座审计 v2 (正确列序): 国家分布 + 带钱词精确/包含匹配 + 输出 JSON
查询数 sheet 列: (查询, 展示, 点击, 点击率, 排名)
国家_地区 列: (国家/地区, 点击次数, 展示, 点击率, 排名)
"""
import openpyxl, json, io, sys, glob, datetime
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

f = glob.glob('GSC数据/28天三站点汇总数据*2026-10-30*.xlsx')[0]
wb = openpyxl.load_workbook(f, read_only=True, data_only=True)

# 国家
ws = wb['国家_地区']
rows = list(ws.iter_rows(values_only=True))
countries = []
for r in rows[1:]:
    try:
        countries.append({'country': str(r[0] or ''), 'clicks': float(r[1] or 0),
                          'impressions': float(r[2] or 0), 'position': float(r[4] or 0)})
    except Exception:
        pass
total_imp = sum(c['impressions'] for c in countries)
countries.sort(key=lambda x: -x['impressions'])

def bucket(c):
    n = c['country'].lower()
    if n in ('中国香港', 'hong kong', '香港'):
        return 'zh-hk'
    if n in ('日本', 'japan'):
        return 'ja'
    if n in ('美国', 'united states', '美國'):
        return 'en-us'
    if n in ('英国', 'united kingdom', '英國', '加拿大', 'canada', '澳大利亚', 'australia', 'new zealand', '新西兰'):
        return 'en-other'
    if n in ('台湾', '台湾省', 'taiwan', '新加坡', 'singapore', '马来西亚', 'malaysia', '澳门', 'macau', '中国', 'china'):
        return 'apac'
    return 'other'

market = {}
for c in countries:
    b = bucket(c)
    m = market.setdefault(b, {'impressions': 0, 'clicks': 0})
    m['impressions'] += c['impressions']
    m['clicks'] += c['clicks']

# 查询 (列序: 查询, 展示, 点击, 点击率, 排名)
ws2 = wb['查询数']
rows2 = list(ws2.iter_rows(values_only=True))
qmap = {}
for r in rows2[1:]:
    try:
        q = str(r[0] or '').strip()
        if q:
            qmap[q] = {'impressions': float(r[2] or 0), 'clicks': float(r[1] or 0), 'position': float(r[4] or 0)}
    except Exception:
        pass

d = json.load(open('.hermes/cron-prompts/blog-money-keyword-queue.json', encoding='utf-8'))
items = []
for it in d['items']:
    for q in (it.get('money_queries') or []):
        exact = qmap.get(q)
        containing = [k for k in qmap if q in k and k != q][:5]
        items.append({
            'cluster': it['cluster'], 'query': q,
            'exact': exact,
            'containing_sample': containing,
        })

out = {
    'schema': 'money-keyword-measurement-audit/v1',
    'date': '2026-11-01',
    'source_file': f.replace('\\', '/'),
    'window': '2026-09-30..2026-10-27',
    'caliber': 'all countries (GSC 汇总档); query/page/country tables independent (no query x country join in xlsx)',
    'site_total_impressions': total_imp,
    'countries_total': len(countries),
    'market_split': {k: {'impressions': v['impressions'], 'clicks': v['clicks'],
                         'share_pct': round(v['impressions'] / total_imp * 100, 1)}
                     for k, v in sorted(market.items(), key=lambda x: -x[1]['impressions'])},
    'top_countries': [{'country': c['country'], 'impressions': c['impressions'],
                       'clicks': c['clicks'], 'position': c['position']} for c in countries[:12]],
    'money_queries': items,
}
path = '.hermes/logs/money-keyword-measurement-audit-2026-11-01.json'
open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print('saved:', path)
print('total_imp=%d' % total_imp)
print('market:', {k: round(v['impressions'] / total_imp * 100, 1) for k, v in market.items()})
print()
for it in items:
    e = it['exact']
    print('%-16s %-28s %s' % (it['cluster'], it['query'],
                              ('imp=%.0f clk=%.0f pos=%.1f' % (e['impressions'], e['clicks'], e['position'])) if e else 'NO_EXACT_MATCH'))
