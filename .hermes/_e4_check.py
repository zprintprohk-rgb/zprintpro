# -*- coding: utf-8 -*-
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
lines = open(r'F:\zprintpro-nextjs\src\data\blog-data\en.json', encoding='utf-8').read().split('\n')
print('=== blog-data en.json 指向 doujinshi PDP 的链接形态 ===')
for ln in [264, 512, 788]:
    l = lines[ln-1]
    i = l.find('product/doujinshi-printing')
    if i >= 0:
        s = max(0, i-80)
        print(f'L{ln}: ...{l[s:s+200]}...')
        print()
print('=== Comiket C109 页 doujinshi 链接 ===')
c109 = open(r'F:\zprintpro-nextjs\src\app\[locale]\comiket-c109\page.tsx', encoding='utf-8').read()
import re
for m in re.finditer(r'product/[a-z-]+', c109):
    s = max(0, m.start()-40)
    print(f'...{c109[s:m.end()+30]}...')
