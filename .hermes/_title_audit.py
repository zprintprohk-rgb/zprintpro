# -*- coding: utf-8 -*-
import io, json
j = json.load(io.open('.hermes/logs/sku-title-v5-audit-2026-10-12.json', encoding='utf-8'))
print(type(j).__name__, list(j.keys())[:8] if isinstance(j, dict) else len(j))
# 找出 roll-stickers 相关 + HARD 明细
def walk(o, path=''):
    if isinstance(o, dict):
        for k, v in o.items():
            walk(v, path + '/' + str(k))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, path + '/%d' % i)
    else:
        pass
# 直接 json dump 找 roll
s = json.dumps(j, ensure_ascii=False)
print('roll mentions:', s.count('roll-stickers'))
import re
# HARD 明细通常在 hard 数组
hard = j.get('hard') or j.get('HARD') or []
print('hard count:', len(hard))
for h in hard:
    print(json.dumps(h, ensure_ascii=False)[:220])
