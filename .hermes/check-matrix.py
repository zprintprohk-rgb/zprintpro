#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)
print('v7_sku_optimizations:', len(m.get('v7_sku_optimizations', [])))
print('v7_pdp_reviews:', len(m.get('v7_pdp_reviews', [])))
print('v7_cron_sessions:', len(m.get('v7_cron_sessions', [])))
print('v7_skip_log:', len(m.get('v7_skip_log', [])))
print('k3_section6_skip_count:', m.get('k3_section6_skip_count'))
print('last_updated:', m.get('last_updated'))
print()
print('Last 6 SKU:')
for e in m['v7_sku_optimizations'][-6:]:
    print(f'  {e["id"]} | R{e.get("optimization_round",1)} | {e["slug"]} | {e.get("optimized_at","?")}')
print()
print('Last 2 PDP:')
for e in m['v7_pdp_reviews'][-2:]:
    print(f'  {e["id"]} | {e["slug"]} | {e.get("reviewed_at","?")}')
print()
print('Last 2 cron_sessions:')
for s in m['v7_cron_sessions'][-2:]:
    print(f'  {s.get("session_id","?")} | {s.get("started_at","?")} | {s.get("skus_optimized", 0)} SKU | {s.get("pdps_reviewed", 0)} PDP')
print()
print('Skip log:')
for s in m.get('v7_skip_log', []):
    print(f'  {s.get("date","?")} | {s.get("skip_type","?")} | {(s.get("reason","") or "")[:80]}')
