#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
# 找 'Custom Calendars' 行
idx = t.find('Custom Calendars Free Shipping')
if idx < 0:
    print('NOT FOUND')
else:
    line_start = t.rfind('\n', 0, idx) + 1
    line_end = t.find('\n', idx)
    line = t[line_start:line_end]
    out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
    out.write(f'line: {line}\n')
    out.write(f'line length: {len(line)}\n')
    out.write(f'line bytes: {[hex(ord(c)) for c in line[:60]]}\n')
    out.close()
    print('written')
