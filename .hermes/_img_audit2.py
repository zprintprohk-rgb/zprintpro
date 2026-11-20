# -*- coding: utf-8 -*-
# ① 全量 slug 名单 vs 审计 parse 差集 ② greeting 家族磁盘实况 ③ 全站 legacy jpg 引用实况
import re, io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
all_slugs = re.findall(r"(?<!_)slug: '([a-z0-9-]+)'", t)
print('total product slugs:', len(all_slugs))
audit = json.load(io.open(ROOT / '.hermes/_img_audit.json', encoding='utf-8'))
audit_slugs = {r['slug'] for r in audit}
# 用 imagesByLocale 块独立反查每个 slug 的引用存在性 (与 parse 无关)
missing_products = []
for slug in set(all_slugs):
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+30000]
    j = seg.find('imagesByLocale')
    k = seg.find('faqSchema') if 'faqSchema' in seg else len(seg)
    block = seg[j:k] if j >= 0 else ''
    imgs = re.findall(r"'(/images/[^']+\.webp)'", block)
    ex = [(p, (ROOT / 'public' / p.lstrip('/')).exists()) for p in imgs]
    if block and not any(ok for _, ok in ex):
        missing_products.append(slug)
    if not block:
        # 无 imagesByLocale 块 — 纯 legacy?
        m = re.search(r"images: \['(/images/[^']+)'\]", seg)
        if m and not (ROOT / 'public' / m.group(1).lstrip('/')).exists():
            missing_products.append(slug + ' [legacy-only]')
print('products with ZERO existing webp (imagesByLocale):', missing_products)

print('\n--- greeting 家族 (stickers-premium/... 名) 磁盘文件 ---')
d = ROOT / 'public/images/products/seedream-webp'
for pat in ('premium-stickers', 'thick-stickers', 'foil-stickers', 'spot-uv', 'matte-stickers', 'rounded-corner'):
    fs = sorted(p.name for p in d.glob('*%s*' % pat))
    print('%-22s %d files: %s' % (pat, len(fs), fs))

print('\n--- legacy jpg 全站引用实况 ---')
for slug in all_slugs:
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+4000]
    m = re.search(r"images: \['(/images/products/[^']+\.jpg)'\]", seg)
    if m:
        exists = (ROOT / 'public' / m.group(1).lstrip('/')).exists()
        if not exists:
            print('MISSING legacy jpg: %-30s %s' % (slug, m.group(1)))
