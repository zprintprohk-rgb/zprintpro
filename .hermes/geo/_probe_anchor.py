# -*- coding: utf-8 -*-
import io, re
t = io.open(r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json", encoding='utf-8').read()
i = t.find('三地認證')
print('raw 三地認證 idx:', i)
if i > 0:
    print(repr(t[i-160:i+80]))
else:
    j = t.find('food-packaging-printing-guide')
    print(repr(t[j:j+400]))
    # 查认证周边
    k = t.find('認證', j)
    print('first 認證 after entry at', k, repr(t[k-60:k+60]) if k>0 else '')
