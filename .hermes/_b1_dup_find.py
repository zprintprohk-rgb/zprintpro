# -*- coding: utf-8 -*-
# locate duplicate keys in product-faqs.ts
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
lines = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read().split('\n')
for i, ln in enumerate(lines, 1):
    for k in ['textbooks', 'certificates']:
        if re.search(r"'" + k + r"'\s*:", ln):
            print(f'L{i}: {ln.strip()[:80]}')
