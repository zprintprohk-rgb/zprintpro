# -*- coding: utf-8 -*-
# locate paper-bags / posters entries in category-seo-content.ts
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for key in ['paper-bags', 'posters']:
    print('#####', key)
    for m in re.finditer(re.escape(key), t):
        s = max(0, m.start()-120)
        print('  ...', t[s:m.end()+80].replace('\n', ' ')[:200])
        print()
    print('---')
