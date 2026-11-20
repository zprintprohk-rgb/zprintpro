# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\.hermes\logs\sku-title-v5-audit-2026-10-25.json', encoding='utf-8'))
print('hardByRule:', d.get('hardByRule'))
for f in d.get('findings', []):
    if f.get('hard'):
        print('HARD:', f['slug'], f['locale'], '|', f['title'][:55], '|', [h['rule'] for h in f['hard']])
print()
for f in d.get('findings', []):
    if 'saddle' in f['slug']:
        print('BOOKS:', f['slug'], f['locale'], '|', f['title'][:70], '| hard:', len(f.get('hard', [])), 'warn:', len(f.get('warn', [])))
