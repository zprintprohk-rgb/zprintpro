# -*- coding: utf-8 -*-
import io, json
j = json.load(io.open('.hermes/logs/sku-title-v5-audit-2026-10-12.json', encoding='utf-8'))
slots = j if isinstance(j, list) else j.get('slots', [])
for s in slots:
    if s.get('slug') in ('waterproof-stickers','transparent-stickers','foil-stickers','security-stickers','fluorescent-stickers'):
        print(s['slug'], s.get('locale'), 'eq=' + str(s.get('equiv')), 'hard=' + str(len(s.get('hard',[]))), 'warn=' + str(len(s.get('warn',[]))))
        for h in s.get('hard', []):
            print('   HARD:', h.get('rule'), h.get('msg')[:80])
