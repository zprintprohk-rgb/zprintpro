#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io

DOT = "\u00b7"
OLD2 = "en: 'Custom Calendars Free Shipping" + DOT + " 100 MOQ 2027 Desk Wall Hardcover Foil" + DOT + " USA Corporate Gifts',"

p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f'OLD2 all bytes: {[hex(ord(c)) for c in OLD2]}\n')

# Find exactly where DOTs are
for i, c in enumerate(OLD2):
    if c == DOT:
        out.write(f'DOT at {i}\n')

# Find substring
idx = t.find(OLD2)
out.write(f'OLD2 in t: {idx}\n')

# Try simpler
short = "Custom Calendars Free Shipping" + DOT
out.write(f'short: {[hex(ord(c)) for c in short]}\n')
out.write(f'short in t: {t.find(short)}\n')

# Maybe there's invisible char
out.write(f'OLD2 char count: {len(OLD2)}\n')
out.write(f'OLD2 actual chars: {[hex(ord(c)) for c in OLD2[:50]]}\n')
# After Shipping, what is next
idx2 = t.find('Shipping')
out.write(f't at idx2: {[hex(ord(c)) for c in t[idx2:idx2+30]]}\n')
# OLD2 after Shipping
idx3 = OLD2.find('Shipping')
out.write(f'OLD2 at idx3: {[hex(ord(c)) for c in OLD2[idx3:idx3+30]]}\n')
out.close()
print('done')
