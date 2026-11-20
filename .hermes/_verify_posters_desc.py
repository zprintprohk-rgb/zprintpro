# -*- coding: utf-8 -*-
# verify posters descriptions block final state (3 locales)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = t.find("'posters': {")
j = t.find('descriptions:', i)
# brace-match the descriptions object
k = t.find('{', j)
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
        print(f'[{loc}] len={len(s)}')
        print('   ', s)
        print()
