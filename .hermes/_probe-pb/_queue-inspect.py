# -*- coding: utf-8 -*-
"""读队列 books 交付详情 + 各 remeasure 的 delivery_note + audit_notes"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open('.hermes/cron-prompts/blog-money-keyword-queue.json', encoding='utf-8'))
for it in d['items']:
    if it.get('last_delivered'):
        print('===', it['cluster'], '|', it.get('status'), '| delivered:', it.get('delivered_url'))
        print(' note:', (it.get('delivery_note') or '')[:400])
        print(' learning:', json.dumps(it.get('learning'), ensure_ascii=False)[:300])
        mh = it.get('measurement_history') or []
        print(' measurement_history:', len(mh))
        print()
print('=== audit_notes ===')
for n in (d.get('audit_notes') or []):
    if isinstance(n, dict):
        print('-', n.get('date'), '|', (n.get('finding') or '')[:220])
    else:
        print('-', str(n)[:220])
