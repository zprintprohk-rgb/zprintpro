# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# ja block 实际
i = src.find("'ja': {")
print('ja start:', i)
print(src[i:i+500])
