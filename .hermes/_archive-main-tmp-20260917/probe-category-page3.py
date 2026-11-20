#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, re, sys
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
lines = t.split('\n')
line193 = lines[192]
m = re.search(r"en:\s*'(Custom[^']+)'", line193)
if m:
    s = m.group(1)
    target = "Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts"
    if s == target:
        print('MATCH')
    else:
        print('MISMATCH')
        # Find first diff
        for i in range(min(len(s), len(target))):
            if s[i] != target[i]:
                print('first diff at', i, 's=', hex(ord(s[i])), repr(s[i]), 'target=', hex(ord(target[i])), repr(target[i]))
                break
    # Check exact char codes for "100" and "·"
    print('s hex around 100:', [hex(ord(c)) for c in s[35:50]])
    print('target hex around 100:', [hex(ord(c)) for c in target[35:50]])
