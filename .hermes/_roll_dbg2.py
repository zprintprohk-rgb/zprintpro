# -*- coding: utf-8 -*-
import io, re
t = io.open('src/lib/price-data.generated.ts', encoding='utf-8').read()
p = t.find('"zh-hk": "卷裝')
print(repr(t[p:p+1400]))
