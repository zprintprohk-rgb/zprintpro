# -*- coding: utf-8 -*-
import re
# check ja
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# find ja block
i = src.find("'ja': {")
if i > 0:
    j = src.find("'zh-hk': {", i)
    if j < 0:
        j = len(src)
    print('ja block:')
    print(src[i:j][:2000])
print()
# check ContactFormWrapper
with open(r'F:\zprintpro-nextjs\src\app\[locale]\contact\ContactFormWrapper.tsx', 'r', encoding='utf-8') as f:
    wrapper = f.read()
print('form tags in wrapper:', wrapper.count('<form'))
print('<form variants:')
for m in re.finditer(r'<form[^>]{0,200}>', wrapper):
    print(' ', m.group(0)[:200])
print()
# check about
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    about = f.read()
print('about /quote/ count:', about.count('href="/quote/"'))
print('about /contact/ count:', about.count('href="/contact/"'))
print('about /category/ count:', about.count('href="/category/'))
print('about data-cf-analytics count:', about.count('data-cf-analytics'))
