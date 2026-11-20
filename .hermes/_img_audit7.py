# -*- coding: utf-8 -*-
import io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
for slug in ('foil-wedding-invitations', 'wedding-thank-you-cards'):
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+9000]
    j = seg.find('seoImages')
    k = seg.find('faqSchema') if 'faqSchema' in seg else j + 1500
    print('=== %s seoImages ===' % slug)
    print(seg[j:j+1200])
    print()

# blog 数据 image 字段采样
for loc in ('zh-hk', 'en', 'ja'):
    d = json.load(io.open(ROOT / 'src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    posts = d.get('posts', d if isinstance(d, list) else [])
    with_img = sum(1 for p in posts if p.get('image'))
    print('%s: %d posts, %d with image' % (loc, len(posts), with_img))
    for p in posts:
        if not p.get('image'):
            print('   NO-IMG: %s | %s' % (p.get('slug'), (p.get('title') or '')[:40]))
