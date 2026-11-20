# -*- coding: utf-8 -*-
import io, re
t = io.open('src/lib/price-data.generated.ts', encoding='utf-8').read()
idx = [m.start() for m in re.finditer('卷裝', t)]
for p in idx:
    seg = t[p-120:p+40]
    print(repr(seg))
    print('---')
