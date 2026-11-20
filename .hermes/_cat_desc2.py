# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
for slug in ["'flyers'", "'wedding-invitations'"]:
    i = t.find(slug + ': {')
    if i < 0:
        print(slug, 'not found'); continue
    j = t.find('descriptions:', i)
    seg = t[j:j+2600]
    for loc in ["'zh-hk'", 'en', 'ja']:
        m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", seg)
        if m:
            s = m.group(1)
            print(f'[{slug} {loc}] len={len(s)}: {s[:170]}')
    print()
