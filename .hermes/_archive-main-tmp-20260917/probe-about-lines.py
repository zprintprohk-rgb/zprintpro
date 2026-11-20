# -*- coding: utf-8 -*-
"""probe about L260-265 exact bytes"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(258, 268):
    print(f'  L{i+1}: {lines[i].rstrip()!r}')
