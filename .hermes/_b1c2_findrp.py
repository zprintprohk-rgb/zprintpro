# -*- coding: utf-8 -*-
import io
t = io.open('src/data/category-seo-content.ts', encoding='utf-8').read()
j = t.find('const redPacketsContent')
print('const @', j)
if j > -1:
    print(t[j:j+2600])
else:
    k = t.find("'red-packets': redPacketsContent")
    print('map ref @', k)
    # 找前一个 const 块名
    import re
    for m in re.finditer(r'const (\w+Content)', t):
        pass
    names = re.findall(r'const (\w+Content)', t)
    print('all content consts:', names)
