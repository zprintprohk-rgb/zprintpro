# -*- coding: utf-8 -*-
import io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
for loc in ('zh-hk', 'en', 'ja'):
    d = json.load(io.open(ROOT / 'src/data/blog-data' / (loc + '.json'), encoding='utf-8'))
    key0 = next(iter(d))
    print('%s post keys: %s' % (loc, list(d[key0].keys())))
    # 找 image 类字段
    img_fields = [k for k in d[key0] if 'img' in k.lower() or 'image' in k.lower()]
    print('  image-ish fields:', img_fields)
    if img_fields:
        f = img_fields[0]
        noimg = [s for s, v in d.items() if not v.get(f)]
        print('  field "%s": %d/%d posts EMPTY' % (f, len(noimg), len(d)))
        print('  empty slugs:', noimg[:15])
        # 有值的样例
        for s, v in d.items():
            if v.get(f):
                print('  sample:', s, '->', str(v[f])[:100])
                break
    print()
