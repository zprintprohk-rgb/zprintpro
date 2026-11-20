# -*- coding: utf-8 -*-
"""Check JSON formatting: indent, key order, insertion point."""
import json

for loc in ['zh-hk', 'en', 'ja']:
    path = f'src/data/blog-data/{loc}.json'
    with open(path, 'r', encoding='utf-8') as f:
        raw = f.read()
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # Find position of a5-vs-a6-flyer-size key
    marker = '"a5-vs-a6-flyer-size"'
    idx = raw.find(marker)
    print(f"{loc}: file starts {raw[:40]!r} | marker at {idx} | before marker: {raw[idx-80:idx+30]!r}")
    print(f"  keys: {list(data.keys())[:8]} ... total {len(data)}")
    # check indent style
    line = raw[idx-200:idx].split('\n')[-1] if idx > 0 else ''
    print(f"  line before marker: {line!r}")
