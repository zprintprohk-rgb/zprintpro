# -*- coding: utf-8 -*-
# REAL paper-bags descriptions block (brace-matched, like posters verify)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = t.find("'paper-bags': {")
j = t.find('descriptions:', i)
k = t.find('{', j)
# brace-match, skipping braces inside strings is NOT needed (no braces in descs) but do naive count
d = 1; p = k
while p < len(t):
    c = t[p]
    if c == '{': d += 1
    elif c == '}':
        d -= 1
        if d == 0: break
    p += 1
block = t[k:p]
for loc in ["'zh-hk'", 'en', 'ja']:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", block)
    if m:
        s = m.group(1)
        print(f'[paper-bags {loc}] len={len(s)}')
        print('   ', s)
        print()
# also en/ja titles
ti = t.find('titles:', i)
seg = t[ti:ti+700]
print('=== titles ===')
print(seg[:600])
