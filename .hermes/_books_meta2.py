# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = seo.find("'books': {")
j = seo.find('descriptions:', i)
# wide window from descriptions: to the next top-level slug entry (closing of descriptions object at '},' followed by slug)
seg = seo[j:j+4000]
# find each locale desc via quoted-key pattern
for loc in ["'zh-hk'", "'en'", "'ja'"]:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", seg)
    if m:
        s = m.group(1)
        print(f'[{loc}] len={len(s)}')
        print('   ', s)
        print()
