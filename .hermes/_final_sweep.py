# -*- coding: utf-8 -*-
# final sweep: bare-number price tokens in paperBagsContent/postersContent regions
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
lines = t.split('\n')
for name, a, b in [('paperBagsContent', 3595, 3935), ('postersContent', 3295, 3595)]:
    print(f'==== {name} ====')
    for i in range(a, b):
        l = lines[i]
        if l.strip().startswith('//'):
            continue
        # tokens: 1.5 / 1.8 / 3.5 / 0.19 / 0.23 / 0.45 / 22 / 28 / 55 with currency OR bare
        for pat in [r'1\.5', r'1\.8', r'3\.5', r'0\.19', r'0\.23', r'0\.45', r'¥22', r'¥28', r'¥55', r'HK\$1\.5', r'US\$0\.19']:
            if re.search(pat, l):
                print(f'  L{i+1} [{pat}]: {l.strip()[:150]}')
                break
    print()
