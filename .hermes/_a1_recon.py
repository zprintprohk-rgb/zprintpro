# -*- coding: utf-8 -*-
# A1 recon: ISO 9001 extent in authoritative domains + calendars fix targets
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for f in [r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts',
          r'F:\zprintpro-nextjs\src\data\products.ts',
          r'F:\zprintpro-nextjs\src\data\category-seo-content.ts',
          r'F:\zprintpro-nextjs\src\data\product-faqs.ts']:
    raw = open(f, encoding='utf-8').read()
    print(f.split('\\')[-1], '| ISO 9001:', raw.count('ISO 9001'), '| 業界最安:', raw.count('業界最安'),
          '| 激安:', raw.count('激安'), '| SGS:', raw.count('SGS'))

# calendars conversion block: locate en calendars block price lines
raw = open(r'F:\zprintpro-nextjs\src\data\category-conversion-blocks.ts', encoding='utf-8').read()
print()
print('conv-blocks US$3.60 count:', raw.count('US$3.60'))
print('conv-blocks $0.40 count:', raw.count('$0.40'))
print('conv-blocks $3.60 count:', raw.count('$3.60'))
i = raw.find('US$3.60')
print('US$3.60 ctx:', raw[max(0,i-300):i+200].replace('\n',' | '))
