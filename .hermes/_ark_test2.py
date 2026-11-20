# -*- coding: utf-8 -*-
# 旧 key + flash-260915 单张试跑
import requests, time
KEY = 'ark-cd021d85-1691-4f1c-bb05-986546a1949d-83434'
URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
body = {'model': 'doubao-seedream-5-0-flash-260915', 'prompt': 'A single roll of custom die-cut paper labels on a white 4cm cardboard core, grid backing visible, honeycomb artwork label, studio product photo, square', 'response_format': 'url', 'size': '2048x2048', 'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'}
t0 = time.time()
r = requests.post(URL, json=body, headers={'Authorization': 'Bearer %s' % KEY, 'Content-Type': 'application/json'}, timeout=120)
print('HTTP', r.status_code, '%.1fs' % (time.time()-t0))
print(r.text[:260])
