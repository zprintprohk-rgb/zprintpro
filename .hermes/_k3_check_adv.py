# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# Find advantages (zh-hk)
i = src.find("advantages: [")
if i > 0:
    print(src[i:i+1500])
print('---')
i = src.find("teams: [")
if i > 0:
    print(src[i:i+1500])
