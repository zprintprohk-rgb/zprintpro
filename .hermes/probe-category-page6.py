#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
old = "en: 'Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"
new = "en: 'Custom Calendars Free Shipping \u00b7 1000 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"
# Use real U+00B7 char
old_actual = "en: 'Custom Calendars Free Shipping · 100 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts',"
new_actual = "en: 'Custom Calendars Free Shipping · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts',"
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f'old (\\u00b7) in t: {old in t}\n')
out.write(f'new (\\u00b7) in t: {new in t}\n')
out.write(f'old (real ·) in t: {old_actual in t}\n')
out.write(f'new (real ·) in t: {new_actual in t}\n')
# Try replace
t2 = t.replace(old_actual, new_actual, 1)
out.write(f'after replace, changed: {t != t2}\n')
if t != t2:
    io.open(p, 'w', encoding='utf-8', newline='\n').write(t2)
    out.write('WROTE to file\n')
out.close()
print('done')
