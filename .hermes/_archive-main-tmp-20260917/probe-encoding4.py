#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io

DOT = "\u00b7"
OLD = "      'en': 'Custom Calendars Free Shipping" + DOT + " 100 MOQ 2027 Desk Wall Hardcover Foil" + DOT + " USA Corporate Gifts',"

p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f'OLD in t: {OLD in t}\n')
out.write(f'OLD len: {len(OLD)}\n')
# Find first 'Custom Calendars'
idx = t.find('Custom Calendars')
out.write(f'Custom Calendars idx: {idx}\n')
# Get 12 chars before
prefix = t[idx-12:idx]
out.write(f'prefix: {repr(prefix)}\n')
out.write(f'prefix bytes: {[hex(ord(c)) for c in prefix]}\n')
# Manual construct
manual = "      'en': 'Custom Calendars"
out.write(f'manual in t: {manual in t}\n')
out.write(f'manual bytes: {[hex(ord(c)) for c in manual]}\n')
# Maybe it's tab not space
out.close()
print('done')
