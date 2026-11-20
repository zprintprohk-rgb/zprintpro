# -*- coding: utf-8 -*-
# dump raw paperBagsContent head to see full per-locale structure
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = t.find('const paperBagsContent')
print(t[i:i+4200])
