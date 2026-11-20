# -*- coding: utf-8 -*-
import io, re
p = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
out = []
for slug in ('kraft-paper-bags', 'white-card-bags', 'eco-paper-bags', 'handle-bags', 'small-bags', 'large-bags', 'gift-bags',
             'pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus',
             'food-boxes', 'folding-boxes', 'mailer-boxes', 'cosmetic-boxes', 'kraft-paper-packaging-box'):
    i = p.find("slug: '%s'" % slug)
    if i < 0:
        continue
    seg = p[i:i + 3000]
    def g(k):
        m = re.search(k + r":\s*'?([^,'\"\n]*)", seg)
        return m.group(1).strip() if m else '?'
    out.append((slug, g('basePrice'), g('basePrice_en'), g('basePrice_ja'), g('price_range'), g('minQuantity')))
for r in out:
    print('%-28s zh=%-7s en=%-7s ja=%-7s range=%-24s minQ=%s' % r)
# packaging zh desc
s = io.open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = s.index("'packaging': {")
seg = s[i:i + 2600]
m = re.search(r"'zh-hk': '([^']+)'", seg)
d = m.group(1)
print('\npackaging.zh desc (%d chars): %s' % (len(d), d[:120]))
m2 = re.search(r"ja: '([^']+)'", seg)
print('packaging.ja title:', m2.group(1) if m2 else '?')
