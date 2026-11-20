# -*- coding: utf-8 -*-
import io, re
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
print('occurrences of "foil-red-packets":', [m.start() for m in re.finditer(r'"foil-red-packets":', t)])
print('new zh title present:', '燙金利是封印刷 | 金箔銀箔12色' in t)
print('old zh title present:', '燙金利是封印刷 | 燙金 局部UV' in t)
# 找 title 出现位置分布
i = t.find('"foil-red-packets":')
seg = t[i:i+3000]
m = re.search(r'"title":\s*"([^"]+)"', seg)
print('first block first title:', m.group(1) if m else None)
