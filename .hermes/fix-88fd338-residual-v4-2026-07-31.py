# -*- coding: utf-8 -*-
"""
fix-88fd338-residual-v4-2026-07-31.py

v3 用 line index 错了, v4 改用 regex 找 statsLabels + processTitle 模式

[fix1 已 DONE]
[fix4 已 DONE]
[fix2-3 v4 重做]
"""
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ABOUT = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    content = f.read()

# pattern: statsLabels: { ... },    processTitle: 'XXX',
# 修: 在 processTitle 前加 \n + 4 空格

# en
m_en = re.search(r"statsLabels: \{[^}]+\},\s+processTitle: 'Our Production Process',", content)
if m_en:
    before = m_en.group(0)
    # 改成 statsLabels: { ... },\n    processTitle: ...
    after = re.sub(r"(statsLabels: \{[^}]+\}),\s+processTitle:", r"\1,\n    processTitle:", before)
    content = content.replace(before, after)
    print(f'[fix2] en pattern found, len before/after = {len(before)}/{len(after)}')
else:
    print('[fix2] en pattern NOT FOUND')

# ja
m_ja = re.search(r"statsLabels: \{[^}]+\},\s+processTitle: '印刷の流れ',", content)
if m_ja:
    before = m_ja.group(0)
    after = re.sub(r"(statsLabels: \{[^}]+\}),\s+processTitle:", r"\1,\n    processTitle:", before)
    content = content.replace(before, after)
    print(f'[fix3] ja pattern found, len before/after = {len(before)}/{len(after)}')
else:
    print('[fix3] ja pattern NOT FOUND')

with io.open(ABOUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print('[fix2-3] saved about/page.tsx')

# verify: 重新读 L80-200
with io.open(ABOUT, 'r', encoding='utf-8') as f:
    lines = f.readlines()
print('=== verify L80-200 ===')
for i in range(80, 200):
    if i < len(lines):
        sys.stdout.write('  L{0:3}: {1}\n'.format(i+1, lines[i].rstrip()))
