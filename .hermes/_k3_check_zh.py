# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# check zh-hk processSteps
for kw in ['step: \\'4\\', title: \\'生產印刷\\'',
           'step: \\'5\\', title: \\'全球配送\\'',
           'title: \\'快速交付\\'',
           'title: \\'客戶服務團隊\\'']:
    idx = src.find(kw)
    print('{0}: idx={1}'.format(kw.replace('\\\\', '\\'), idx))
print()
# count wa.me occurrences
print('wa.me: {0}'.format(src.count('wa.me')))
print('/category/: {0}'.format(src.count('/category/')))
print('/blog/: {0}'.format(src.count('/blog/')))
print('#factory: {0}'.format(src.count('#factory')))
print('/contact/: {0}'.format(src.count('/contact/')))
print('198 8085 1334: {0}'.format(src.count('198 8085 1334')))
