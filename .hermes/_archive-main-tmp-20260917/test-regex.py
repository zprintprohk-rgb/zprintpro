#!/usr/bin/env python3
import re, io
p = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
t = io.open(p, 'r', encoding='utf-8').read()
print(f'total len: {len(t)}')
for loc in ['zh-hk','en','ja']:
    pat = "  '" + loc + "': \\{[\\s\\S]+?    statsLabels: \\{[^}]+\\},"
    m = re.search(pat, t)
    print(loc, 'match=', bool(m), 'start=', m.start() if m else None, 'end=', m.end() if m else None)
