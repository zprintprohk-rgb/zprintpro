# -*- coding: utf-8 -*-
"""Inspect blog-data JSON structure for poster-printing-price-guide insertion."""
import json

with open('src/data/blog-data/zh-hk.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("type:", type(data))
if isinstance(data, dict):
    keys = list(data.keys())
    print("num keys:", len(keys))
    print("sample keys:", keys[:10])
    k = 'a5-vs-a6-flyer-size' if 'a5-vs-a6-flyer-size' in data else keys[0]
    v = data[k]
    print("entry type:", type(v), "keys:", list(v.keys()) if isinstance(v, dict) else None)
    if isinstance(v, dict):
        for kk, vv in v.items():
            s = str(vv)
            print(f"  {kk}: {s[:200]}")
elif isinstance(data, list):
    print("num items:", len(data))
    print("sample:", json.dumps(data[0], ensure_ascii=False)[:500])
