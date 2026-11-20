# -*- coding: utf-8 -*-
# 全档 dump: posters A2 / books A4 8P / flyers A5 — 找 9 起 / 16 / 0.35 来源
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def dump_tiers(fn, match, maxcfg=2):
    pj = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\\' + fn, encoding='utf-8'))
    found = 0
    def walk(o, path=''):
        nonlocal found
        if isinstance(o, dict):
            if 'tiers' in o and isinstance(o['tiers'], list):
                label = str(o.get('size') or o.get('pages') or o.get('label') or o.get('config') or o.get('name') or '')
                if match.lower() in label.lower():
                    found += 1
                    print(f'\n=== {fn} :: {label} ===')
                    for t in o['tiers']:
                        p = t.get('price')
                        if p is None: p = t.get('sell_hkd')
                        print(f"  qty={t.get('qty'):>6} | price={p:>7} | ppu={round(float(p)/t.get('qty'),3) if p else '?':>8} | src={str(t.get('src'))[:30]:30s} | cal={str(t.get('calibratedAt'))[:12]}")
                    if found >= maxcfg:
                        return
            for v in o.values():
                walk(v, path)
        elif isinstance(o, list):
            for v in o:
                walk(v, path)
    walk(pj)

dump_tiers('posters.json', 'A2 · 铜版纸 · 157g · 單面')
dump_tiers('books.json', 'A4', 1)
dump_tiers('flyers.json', 'A5 (210x148mm)', 1)
dump_tiers('stickers.json', '60×30mm 基准 (按面积缩放)', 1)
