# -*- coding: utf-8 -*-
import io, json, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')

# ① 两 slug 在 sku-seo-data.ts 的 imageAlt
t = io.open(ROOT / 'src/data/sku-seo-data.ts', encoding='utf-8').read()
for slug in ('foil-wedding-invitations', 'wedding-thank-you-cards'):
    i = t.index('"%s": {' % slug)
    seg = t[i:i+12000]
    alts = re.findall(r'"imageAlt": "(.*?)"', seg)
    print(slug, 'imageAlts:', json.dumps(alts, ensure_ascii=False)[:400])

# ② blog image 审计
for loc in ('zh-hk', 'en', 'ja'):
    p = ROOT / 'src/data/blog-data' / (loc + '.json')
    d = json.load(io.open(p, encoding='utf-8'))
    posts = d.get('posts', d if isinstance(d, list) else [])
    noimg = [x for x in posts if not x.get('image')]
    print('\n%s: %d posts, %d no-image' % (loc, len(posts), len(noimg)))
    for x in noimg:
        print('   %-45s %s' % (x.get('slug'), (x.get('title') or '')[:42]))
    # 有图 post 的 image 字段样例
    for x in posts:
        if x.get('image'):
            print('   sample image field:', x['image'][:110])
            break
