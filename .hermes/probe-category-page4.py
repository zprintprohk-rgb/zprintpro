#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, re
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
lines = t.split('\n')
line193 = lines[192]
m = re.search(r"en:\s*'(Custom[^']+)'", line193)
s = m.group(1)
target = "Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts"
# Write to file with explicit encoding
out = io.open(r'F:\zprintpro-nextjs\.hermes\probe-out.txt', 'w', encoding='utf-8')
out.write(f's == target: {s == target}\n')
out.write(f'len(s) = {len(s)}, len(target) = {len(target)}\n')
if s != target:
    for i in range(min(len(s), len(target))):
        if s[i] != target[i]:
            out.write(f'first diff at {i}: s={hex(ord(s[i]))} target={hex(ord(target[i]))}\n')
            break
out.write(f's bytes around 100: {[hex(ord(c)) for c in s[30:55]]}\n')
out.write(f'target bytes around 100: {[hex(ord(c)) for c in target[30:55]]}\n')
out.close()
print('written to probe-out.txt')
