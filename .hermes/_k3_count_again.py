# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
opens = re.findall(r'<figure', src)
closes = re.findall(r'</figure>', src)
print('source <figure: {0}, </figure>: {1}'.format(len(opens), len(closes)))
imgs = re.findall(r'<img', src)
print('source <img: {0}'.format(len(imgs)))
mobile = src.count('factory-press-mobile')
print('factory-press-mobile refs: {0}'.format(mobile))
# All webp
all_webps = re.findall(r'/images/factory/[\w-]+\.webp', src)
from collections import Counter
c = Counter(all_webps)
print('all webp (with repeats): {0}'.format(len(all_webps)))
print('unique: {0}'.format(len(set(all_webps))))
for w, n in sorted(c.items()):
    print('  {0} x{1}'.format(w, n))
