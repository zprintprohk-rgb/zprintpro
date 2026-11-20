# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
for slug in ["'food-boxes'"]:
    i = t.find(slug + ': {')
    print(slug, 'at', i)
    j = t.find('titles:', i)
    if j < 0: j = t.find('title:', i)
    seg = t[j:j+900]
    for loc in ["'zh-hk'", 'en', 'ja']:
        m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", seg)
        if m:
            s = m.group(1)
            # compute halfwidth equiv roughly (CJK=2, ascii=1)
            eq = sum(2 if ord(ch) > 0x2E7F else 1 for ch in s)
            print(f'[{loc}] len={len(s)} eq={eq}')
            print('   ', s)
