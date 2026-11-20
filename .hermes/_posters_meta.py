# -*- coding: utf-8 -*-
# posters descriptions block verbatim + getDefaultCategorySeo fallback
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = t.find('categorySeoData')
eq = t.find('=', i)
j = t.find('{', eq)
depth = 0; k = j
while k < len(t):
    c = t[k]
    if c == '{': depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0: break
    k += 1
body = t[j+1:k]
m = re.search(r"'posters': \{", body)
if m:
    start = m.end()
    d = 1; p = start
    while p < len(body):
        c = body[p]
        if c == '{': d += 1
        elif c == '}':
            d -= 1
            if d == 0: break
        p += 1
    sub = body[start:p]
    print('=== posters sub-object (first 1600 chars) ===')
    print(sub[:1600])
print()
g = t.find('function getDefaultCategorySeo')
print('=== getDefaultCategorySeo ===')
print(t[g:g+900])
