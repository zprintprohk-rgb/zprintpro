# -*- coding: utf-8 -*-
import io, re, urllib.request
# 1) packaging 页 HK$0.22 上下文
h = urllib.request.urlopen(urllib.request.Request('https://zprintpro.com/zh-hk/category/packaging/', headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read().decode('utf-8', 'ignore')
for m in list(re.finditer(r'HK\$0\.22', h))[:4]:
    seg = re.sub(r'<[^>]+>', ' ', h[max(0, m.start() - 100):m.end() + 60])
    print('PKG ctx:', ' '.join(seg.split())[:160])
# 2) conversion blocks 结构: menus 块各 locale 键
c = io.open(r'F:\zprintpro-nextjs\src\data\category-conversion-blocks.ts', encoding='utf-8').read()
i = c.index('一次性餐牌 HK$0.22')
print('\nconversion block around first hit:')
print(c[max(0, i - 1200):i + 200].split('\n\n')[0][-600:])
