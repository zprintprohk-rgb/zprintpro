# -*- coding: utf-8 -*-
"""Verify a5-vs-a6 position and tail of each blog-data JSON."""
import json

for loc in ['zh-hk', 'en', 'ja']:
    path = f'src/data/blog-data/{loc}.json'
    with open(path, 'r', encoding='utf-8') as f:
        raw = f.read()
    data = json.loads(raw)
    keys = list(data.keys())
    print(f"{loc}: total {len(keys)} | a5 pos {keys.index('a5-vs-a6-flyer-size')} | last 3 keys: {keys[-3:]}")
    idx = raw.find('"a5-vs-a6-flyer-size": {')
    tail = raw[idx+30:idx+200]
    print(f"  after marker: {tail[:120]!r}")
