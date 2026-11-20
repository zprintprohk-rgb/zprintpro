# -*- coding: utf-8 -*-
import io, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
p = ROOT / 'src/data/blog-data/zh-hk.json'
d = json.load(io.open(p, encoding='utf-8'))
print('top-level type:', type(d).__name__)
if isinstance(d, dict):
    print('keys:', list(d.keys())[:10])
    for k, v in d.items():
        print(' %s -> %s len=%d' % (k, type(v).__name__, len(v) if hasattr(v, '__len__') else 0))
        if isinstance(v, list) and v:
            print('   first item keys:', list(v[0].keys())[:15])
            print('   image field sample:', v[0].get('image'))
            noimg = [x for x in v if not x.get('image')]
            print('   no-image count:', len(noimg), [x.get('slug') for x in noimg][:10])
            break
