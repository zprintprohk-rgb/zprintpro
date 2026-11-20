# -*- coding: utf-8 -*-
import io, json
d = json.load(io.open(r'F:\zprintpro-nextjs\.hermes\logs\sku-title-v5-audit-2026-10-13.json', encoding='utf-8'))
def walk(o):
    if isinstance(o, dict):
        if 'slug' in o:
            yield o
        for v in o.values():
            yield from walk(v)
    elif isinstance(o, list):
        for v in o:
            yield from walk(v)
for x in walk(d):
    if x.get('slug') == 'custom-red-packets':
        print(json.dumps(x, ensure_ascii=False, indent=1)[:800])
