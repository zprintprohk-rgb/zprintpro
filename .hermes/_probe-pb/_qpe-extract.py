# -*- coding: utf-8 -*-
"""提取队列 query_page_evidence 全部 8 项 + 合并国家审计 -> measurement audit v2"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

d = json.load(open('.hermes/cron-prompts/blog-money-keyword-queue.json', encoding='utf-8'))
rows = []
for it in d['items']:
    qpe = it.get('query_page_evidence')
    if not qpe:
        rows.append({'cluster': it['cluster'], 'status': it['status'], 'query_page_evidence': None})
        continue
    for q in qpe.get('queries', []):
        rows.append({
            'cluster': it['cluster'], 'status': it['status'],
            'query': q.get('query'), 'found': q.get('found'),
            'imps': q.get('imps'), 'clicks': q.get('clicks'),
            'pos_weighted': q.get('pos_weighted'),
            'urls_with_impressions': q.get('urls_with_impressions'),
            'top_url': q.get('observed_top_url'), 'top_share_pct': q.get('observed_top_share_pct'),
            'concentration': q.get('concentration'),
            'top5': q.get('top5'),
        })

print('=== query×page 承接 (全部) ===')
for r in rows:
    if not r.get('query'):
        print('%-16s %-16s (no query_page_evidence)' % (r['cluster'], r['status']))
        continue
    print('%-16s %-22s imps=%-4s clk=%-2s pos=%-6s urls=%-2s top=%-42s share=%-5s %s' % (
        r['cluster'], r['query'], r['imps'], r['clicks'], r['pos_weighted'],
        r['urls_with_impressions'], (r['top_url'] or '')[:42], r['top_share_pct'], r['concentration']))

out = {
    'schema': 'money-keyword-measurement-audit/v2',
    'date': '2026-11-01',
    'sources': [
        'GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx（国家_地区 150 行 / 查询数 1000 行；窗口 2026-09-30..2026-10-27）',
        '.hermes/cron-prompts/blog-money-keyword-queue.json → items[].query_page_evidence（GSC数据/money-kw-query-page-2026-10-31.csv, measured 2026-10-31T15:14Z）',
    ],
    'caliber': 'query×page 承接来自独立 CSV（同窗口）；国家维度与查询维度仍不可联接（xlsx 独立 sheet）',
    'query_page_attribution': rows,
}
open('.hermes/logs/money-keyword-measurement-audit-2026-11-01.json', 'w', encoding='utf-8', newline='\n').write(
    json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print('\nsaved .hermes/logs/money-keyword-measurement-audit-2026-11-01.json')
