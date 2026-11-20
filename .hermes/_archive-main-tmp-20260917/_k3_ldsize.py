import re
src = open('src/data/products.ts', encoding='utf-8').read()
total = len(src.encode('utf-8'))
# find usage positions after interface definition (line ~24-26 are type decls)
# values may use single quote, double quote, or backtick
pat = re.compile(r"longDescription(?:En|Ja)?:\s*")
sizes = 0
n = 0
for m in pat.finditer(src):
    i = m.end()
    if i >= len(src) or src[i] not in ("'", '"', '`'):
        continue
    q = src[i]
    i += 1
    start = i
    while i < len(src):
        c = src[i]
        if c == chr(92):
            i += 2
            continue
        if c == q:
            break
        if q == '`' and src[i] == '$' and i + 1 < len(src) and src[i+1] == '{':
            i += 2
            continue
        i += 1
    sizes += i - start
    n += 1
print('total file bytes:', total)
print('longDescription* values:', n, 'bytes ~', sizes, '=', round(sizes/1024), 'KB =', str(round(100*sizes/total)) + '%')
# also measure description* family for context
pat2 = re.compile(r"description(?:En|Ja|_zh)?:\s*")
s2 = 0
n2 = 0
for m in pat2.finditer(src):
    i = m.end()
    if i >= len(src) or src[i] not in ("'", '"', '`'):
        continue
    q = src[i]
    i += 1
    start = i
    while i < len(src):
        c = src[i]
        if c == chr(92):
            i += 2
            continue
        if c == q:
            break
        i += 1
    s2 += i - start
    n2 += 1
print('description* values:', n2, 'bytes ~', s2, '=', round(s2/1024), 'KB =', str(round(100*s2/total)) + '%')
