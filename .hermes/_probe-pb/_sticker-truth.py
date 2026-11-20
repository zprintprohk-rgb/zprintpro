# -*- coding: utf-8 -*-
"""sticker-guide 真值审计: 荧光 SKU 存在性 + 各 SKU 交期/加工参数"""
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open('src/data/products.ts', encoding='utf-8').read()

# 所有 sticker 类 slug
slugs = sorted(set(re.findall(r"slug: '([a-z0-9-]*sticker[a-z0-9-]*)'", src)))
print('sticker slugs:', slugs)

# 荧光/glow 搜索
for kw in ['螢光', '荧光', 'fluorescent', 'glow']:
    n = src.count(kw)
    print('%s count=%d' % (kw, n))

# 各 sticker SKU 的 price_range/minQuantity/description 里的交期
for s in slugs:
    i = src.find("slug: '%s'" % s)
    seg = src[i:i + 2600]
    pr = re.search(r'price_range:\s*["\']([^"\']+)["\']', seg)
    mq = re.search(r'minQuantity:\s*(\d+)', seg)
    f = re.search(r'finishings:\s*\[([\s\S]{0,400}?)\n\s*\]', seg)
    desc = re.search(r'description:\s*[\'"]([\s\S]{0,300}?)[\'"]', seg)
    print('\n== %s ==' % s)
    print(' price=%s minQ=%s' % (pr.group(1) if pr else '?', mq.group(1) if mq else '?'))
    print(' finishings:', (re.sub(r'\s+', ' ', f.group(1))[:260] if f else 'NONE'))
    d = (desc.group(1) if desc else '')
    lead = re.findall(r'(\d+\s*[小時小时天工作日]|48小時|24小時|3-5)', d)
    print(' desc lead-time hints:', lead[:6])
