# -*- coding: utf-8 -*-
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(60, 135):
    if i < len(lines):
        s = lines[i].rstrip()
        sys.stdout.write('  L{0:3}: {1}\n'.format(i+1, s))
