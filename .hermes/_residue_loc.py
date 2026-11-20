# -*- coding: utf-8 -*-
# locate residues
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
lines = t.split('\n')
for pat in [r'HK\$3\.5', r'US\$0\.23', r'128g', r'128gsm']:
    print('====', pat)
    for i, l in enumerate(lines):
        if re.search(pat, l) and not l.strip().startswith('//'):
            print(f'  L{i+1}: {l.strip()[:130]}')
    print()
