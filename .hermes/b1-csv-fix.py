# -*- coding: utf-8 -*-
"""B1: en USD garbage cleanup + ja tail-cluster dump/cleanup on CSV col 9/10"""
import io, re, json, shutil

P = r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv'
shutil.copy(P, P + '.bak-20261006')
lines = io.open(P, encoding='utf-8').read().split('\n')
rows = [l.split('\t') for l in lines[1:] if l.strip()]
print('rows:', len(rows))

# --- 1. dump ja tail clusters (col 10) ---
tails = {}
for f in rows:
    for k in (f[10] if len(f) > 10 else '').split(','):
        k = k.strip()
        if k:
            tails.setdefault(k[-12:], set()).add(f[3])
print('\n== ja tail clusters >=3 rows:')
big = sorted(((t, s) for t, s in tails.items() if len(s) >= 3), key=lambda x: -len(x[1]))
for t, s in big[:14]:
    print('  %2d | ...%s | %s' % (len(s), t, sorted(s)[0]))

# --- 2. en USD garbage (col 9) ---
usd_rx = re.compile(r',[^,]*\bUSD\b(?=,|$)|\bUSD\b$')
usd_rows = 0
for f in rows:
    if len(f) > 9 and usd_rx.search(f[9]):
        usd_rows += 1
print('\n== en USD garbage rows:', usd_rows)

# --- 3. apply USD cleanup: drop any keyword token ending with bare 'USD' ---
fixed_usd = 0
for f in rows:
    if len(f) > 9:
        kws = [k.strip() for k in f[9].split(',') if k.strip()]
        clean = [k for k in kws if not re.search(r'\bUSD\b$', k)]
        if len(clean) != len(kws):
            fixed_usd += 1
            f[9] = ','.join(clean)
print('USD tokens cleaned in rows:', fixed_usd)

# --- 4. ja contamination: remove cross-category tail tokens ---
# Known polluting families (verified below in dump output)
POLLUT = ['箔押し証書', '表彰状', '偽造防止', '年賀状', 'クリスマスカード', '結婚式招待状',
          '2時間受取', '48時間出荷', '2小時快印', '銅鑼灣快印', 'ビジネスカード', '名刺']
fixed_ja = 0
for f in rows:
    if len(f) > 10:
        kws = [k.strip() for k in f[10].split(',') if k.strip()]
        clean = [k for k in kws if not any(p in k for p in POLLUT)]
        if len(clean) != len(kws):
            fixed_ja += 1
            f[10] = ','.join(clean)
print('ja rows cleaned of pollutant tokens:', fixed_ja)

io.open(P, 'w', encoding='utf-8', newline='\n').write(lines[0] + '\n' + '\n'.join('\t'.join(f) for f in rows))
print('CSV written; backup at .bak-20261006')
