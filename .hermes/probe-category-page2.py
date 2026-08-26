#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
p = r'F:\zprintpro-nextjs\src\app\[locale]\category\[slug]\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
# 找 L193 完整内容
lines = t.split('\n')
line193 = lines[192]
print('L193 raw bytes (UTF-8):', line193.encode('utf-8'))
print('L193 length:', len(line193))
# 找 en 字符串
import re
m = re.search(r"en:\s*'(Custom[^']+)'", line193)
if m:
    s = m.group(1)
    print('en string:', s)
    print('en hex of "100 MOQ":', hex(ord(s[s.find('100')+3])))
    print('en hex of "·":', hex(ord('·')))
    # 检查
    target = "Custom Calendars Free Shipping \u00b7 100 MOQ 2027 Desk Wall Hardcover Foil \u00b7 USA Corporate Gifts"
    print('target == en:', target == s)
    # 列出不同的字符
    for i in range(min(len(s), len(target))):
        if s[i] != target[i]:
            print(f'  diff at {i}: s={hex(ord(s[i]))} target={hex(ord(target[i]))}  s_char="{s[i]}" target_char="{target[i]}"')
            break
