# -*- coding: utf-8 -*-
import io
pp = 'src/data/products.ts'
p = io.open(pp, encoding='utf-8').read()
fixes = [
 ('glass decoration. 适配行业: Beauty', 'glass decoration. **Best for**: Beauty'),
 ('ガラス裝飾に最適。 适配行业: 美容', 'ガラス装飾に最適。 **適合業種**: 美容'),
]
n = 0
for old, new in fixes:
    c = p.count(old)
    assert c == 1, 'expected 1 got %d for %s' % (c, old[:40])
    p = p.replace(old, new)
    n += 1
io.open(pp, 'w', encoding='utf-8', newline='\n').write(p)
print('transparent desc fixes:', n)
