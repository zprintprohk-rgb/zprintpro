# -*- coding: utf-8 -*-
"""读队列 observed_top_url / observed_top_share_pct + 其余观测字段"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open('.hermes/cron-prompts/blog-money-keyword-queue.json', encoding='utf-8'))
for it in d['items']:
    obs = {k: v for k, v in it.items() if k.startswith('observed') or k in ('baseline',)}
    print('===', it['cluster'], '|', it['status'])
    print('  ', json.dumps(obs, ensure_ascii=False)[:800])
    print()
