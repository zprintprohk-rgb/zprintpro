# -*- coding: utf-8 -*-
"""Find titles whose VALUE truly changed in staged regen (CSV overwrote ts hand-fixes)"""
import io, re, json, subprocess

diff = subprocess.run(['git', 'diff', '--cached', 'src/data/sku-seo-data.ts'],
                      capture_output=True, text=True, encoding='utf-8', errors='replace').stdout
minus, plus = {}, {}
cur_key = None
key_rx = re.compile(r'^\+?\-?\s*"([a-z0-9-]+)":\s*\{')
title_rx = re.compile(r'^\+\s*"title":\s*"(.*)",?$')
title_rx_m = re.compile(r'^-\s*"title":\s*"(.*)",?$')
for line in diff.split('\n'):
    km = key_rx.match(line)
    if km:
        cur_key = km.group(1)
    tm = title_rx.match(line)
    if tm and cur_key:
        plus.setdefault(cur_key, []).append(tm.group(1))
    tm = title_rx_m.match(line)
    if tm and cur_key:
        minus.setdefault(cur_key, []).append(tm.group(1))

changed = []
for k, ps in plus.items():
    ms = minus.get(k, [])
    if ps != ms:
        changed.append((k, ms, ps))
print('blocks with REAL title value changes:', len(changed))
for k, m, p in changed[:20]:
    print('==', k)
    for a, b in zip(m, p):
        if a != b:
            print('  OLD:', a[:90])
            print('  NEW:', b[:90])
