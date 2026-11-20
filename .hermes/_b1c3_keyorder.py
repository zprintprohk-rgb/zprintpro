# -*- coding: utf-8 -*-
import io, re
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
i = t.index('"a5-flyers":')
blk = t[i:i+7000]
keys = [k[1] for k in re.findall(r'^(\s*)"(\w+)":', blk, re.M)]
print(' '.join(keys))
