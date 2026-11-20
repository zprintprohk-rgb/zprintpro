# -*- coding: utf-8 -*-
# 全类目 SKU 枚举 (category_slug 字段真值) — 双方法复算 §0.23.2
import io, re
p = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
rows = []
for m in re.finditer(r"slug: '([a-z0-9-]+)'", p):
    slug = m.group(1)
    seg = p[m.start():m.start() + 4000]
    cs = re.search(r"category_slug: '([a-z-]+)'", seg)
    if not cs:
        continue
    cat = cs.group(1)
    if cat not in ('menus', 'packaging', 'paper-bags'):
        continue
    def g(k):
        mm = re.search(k + r":\s*'?([^,'\"\n]*)", seg)
        return mm.group(1).strip() if mm else '?'
    nm = re.search(r"name: '([^']+)'", seg)
    rows.append((cat, slug, (nm.group(1)[:18] if nm else '?'), g('basePrice'), g('basePrice_en'), g('basePrice_ja'), g('minQuantity'), g('price_range')))
for r in sorted(rows):
    print('%-11s %-26s %-20s zh=%-6s en=%-6s ja=%-7s minQ=%-5s %s' % r)
print('counts:', {c: sum(1 for r in rows if r[0] == c) for c in ('menus', 'packaging', 'paper-bags')})
