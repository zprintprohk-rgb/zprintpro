#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, re

p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
old = "en: 'Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"  # noqa
new = "en: 'Custom Calendars Free Shipping \u00b7 1000 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts',"  # noqa
# Use literal char to avoid encoding issues
old = "en: 'Custom Calendars Free Shipping \xb7 100 MOQ 2027 Desk Wall Hardcover Foil \xb7 USA Corporate Gifts',"
new = "en: 'Custom Calendars Free Shipping \xb7 1000 MOQ 2027 Desk Wall Hardcover Foil \xb7 USA Corporate Gifts',"
print('OLD present:', old in t)
print('NEW present:', new in t)
print()
# 找 191-195 行
lines = t.split('\n')
for i in range(190, 200):
    if i < len(lines):
        print(f'L{i+1}: {lines[i]}')
