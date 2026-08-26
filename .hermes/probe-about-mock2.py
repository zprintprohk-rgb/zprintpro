# -*- coding: utf-8 -*-
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
# find first testimonial
idx = content.find("MOCK - 香港")
print(f'MOCK at idx={idx}')
if idx >= 0:
    print('---bytes 200 around MOCK---')
    chunk = content[idx-50:idx+250]
    print(repr(chunk))

# raw string vs file byte count
test_raw = r"""3000 張只花了 HK\$ 1,200"""
print(f'\nraw string len: {len(test_raw)}')
print(f'raw repr: {test_raw!r}')

# 找 raw string 是否在 content
print(f'raw in content: {test_raw in content}')
