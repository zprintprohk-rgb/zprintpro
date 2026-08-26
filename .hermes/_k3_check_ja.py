# -*- coding: utf-8 -*-
import os
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
for i, line in enumerate(src.split('\n'), 1):
    if i > 150 and i < 220:
        print(i, repr(line))
