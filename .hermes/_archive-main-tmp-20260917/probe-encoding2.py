#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io

DOT = "\u00b7"
OLD2 = "en: 'Custom Calendars Free Shipping" + DOT + " 100 MOQ 2027 Desk Wall Hardcover Foil" + DOT + " USA Corporate Gifts',"

p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f'OLD2 in t: {OLD2 in t}\n')
out.write(f'OLD2 len: {len(OLD2)}\n')
out.write(f'OLD2 bytes 40-60: {[hex(ord(c)) for c in OLD2[40:60]]}\n')

# Compare to file bytes
idx = t.find('Custom Calendars Free Shipping')
file_line = t[idx:idx+80]
out.write(f'file bytes 0-40: {[hex(ord(c)) for c in file_line[0:40]]}\n')
out.write(f'OLD2 bytes 0-40: {[hex(ord(c)) for c in OLD2[0:40]]}\n')

# Direct search
test = "100 MOQ 2027 Desk"
out.write(f'test in t: {test in t}\n')
out.close()
print('done')
