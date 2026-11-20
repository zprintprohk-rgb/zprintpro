# -*- coding: utf-8 -*-
# 单张试跑: 定位网络/依赖问题
import sys, io, json
sys.stdout.reconfigure(encoding='utf-8')
try:
    import requests
    print('requests OK', requests.__version__)
except ImportError as e:
    print('requests MISSING:', e)
    sys.exit(1)
import time
ARK_KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
ARK_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
body = {'model': 'doubao-seedream-5-0-pro-260628', 'prompt': 'A single roll of custom die-cut paper labels on a white 4cm cardboard core, grid backing visible, one label unwound, honeycomb artwork, studio product photo, square', 'response_format': 'url', 'size': '1536x1536', 'stream': False, 'watermark': False, 'n': 1, 'quality': 'high', 'output_format': 'png'}
t0 = time.time()
try:
    r = requests.post(ARK_URL, json=body, headers={'Authorization': 'Bearer %s' % ARK_KEY, 'Content-Type': 'application/json'}, timeout=60)
    print('HTTP', r.status_code, '%.1fs' % (time.time()-t0))
    print(r.text[:300])
except Exception as e:
    print('EXC after %.1fs: %s' % (time.time()-t0, str(e)[:200]))
