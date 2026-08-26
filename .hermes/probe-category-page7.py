#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
with io.open(p, 'r', encoding='utf-8') as f:
    t = f.read()
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f't length: {len(t)}\n')
# Find 'Custom Calendars'
idx = t.find('Custom Calendars')
out.write(f'idx of "Custom Calendars": {idx}\n')
if idx > 0:
    out.write(f't around idx: {repr(t[idx:idx+30])}\n')
    out.write(f't[idx:idx+30] bytes: {[hex(ord(c)) for c in t[idx:idx+30]]}\n')
# Test exact substring
test = "en: 'Custom Calendars Free Shipping \u00b7 100 MOQ"
out.write(f'idx of test: {t.find(test)}\n')
# Direct search
test2 = "100 MOQ 2027 Desk"
out.write(f'idx of test2: {t.find(test2)}\n')
# More verbose
test3 = "Custom Calendars Free Shipping"
out.write(f'idx of test3: {t.find(test3)}\n')
# Hex dump of L193 area
if idx > 0:
    out.write(f't bytes around 100: {[hex(ord(c)) for c in t[idx:idx+80]]}\n')
out.close()
print('done')
