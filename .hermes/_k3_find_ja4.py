# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
import re
# find all "serviceHours:" occurrences
for m in re.finditer(r"serviceHours:", src):
    pos = m.start()
    # show 50 chars before and 200 after
    print('--- at {0} ---'.format(pos))
    print(src[max(0,pos-100):pos+250])
    print()
