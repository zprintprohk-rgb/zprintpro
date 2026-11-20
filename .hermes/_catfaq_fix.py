# -*- coding: utf-8 -*-
# fix paper-bags category en FAQ saddle-stitch price $1.20 -> $1.84 (books SSoT)
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
t = open(P, encoding='utf-8').read()
old = "same saddle stitch pricing from $1.20"
new = "same saddle stitch pricing from $1.84"
n = t.count(old)
print('count:', n)
if n == 1:
    t = t.replace(old, new)
    open(P, 'w', encoding='utf-8', newline='\n').write(t)
    print('patched')
else:
    print('abort (not unique)')
