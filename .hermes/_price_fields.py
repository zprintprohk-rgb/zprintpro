# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
lines = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read().split('\n')
def show(start, end):
    print(f'=== L{start}..{end} ===')
    for i in range(start, end+1):
        t = lines[i-1].strip()
        if re.search(r'basePrice|minQuantity|price_range|priceRange', t):
            print(f'L{i}: {t[:110]}')
show(139, 185)
show(1992, 2040)
