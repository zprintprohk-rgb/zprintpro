# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
import re
# find ja block: look for serviceHours after ja
i = src.find("'ja': {")
print('ja start:', i)
if i > 0:
    # find next locale block
    j = src.find("\n};\n", i)
    if j < 0:
        j = len(src)
    print('ja block content:')
    print(src[i:j])
