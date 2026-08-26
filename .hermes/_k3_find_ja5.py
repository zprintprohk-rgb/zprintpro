# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# search for ja block in translations
# find all 'followUs:' occurrences
import re
for m in re.finditer(r"followUs:", src):
    pos = m.start()
    print('--- at {0} ---'.format(pos))
    print(src[max(0,pos-30):pos+100])
    print()
