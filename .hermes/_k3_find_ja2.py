# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
import re
m = re.search(r"serviceHours: '月", src)
if m:
    print('found at', m.start())
    print(src[max(0,m.start()-200):m.start()+400])
else:
    print('NOT FOUND')
    # try search all ja fragments
    for kw in ['ja', 'followUs', 'friendLinks', 'copyright', 'serviceHours', 'whatsapp247', 'supportCN', 'supportJA']:
        print(kw, ':', src.count(kw))
