# -*- coding: utf-8 -*-
# dump ja.json top-level structure (real sample before regex, per 0.23.2 gate 1)
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8'))
print('top type:', type(d).__name__)
if isinstance(d, dict):
    for k, v in list(d.items())[:5]:
        print(' key:', repr(k), '->', type(v).__name__, (len(v) if hasattr(v, '__len__') else v))
    for k, v in d.items():
        if isinstance(v, list) and v and isinstance(v[0], dict):
            print('FIRST LIST ITEM KEYS under', repr(k), ':', list(v[0].keys())[:14])
            break
elif isinstance(d, list):
    print('list len:', len(d))
    if d: print('item keys:', list(d[0].keys())[:14])
