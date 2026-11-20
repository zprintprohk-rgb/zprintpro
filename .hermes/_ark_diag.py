# -*- coding: utf-8 -*-
# 双 key 诊断: 旧 key (账户欠费) vs 新 key (401)
import requests, time
KEYS = {
 'OLD': 'ark-cd021d85-1691-4f1c-bb05-986546a1949d-83434',
 'NEW': 'ark-8e2384ed-2d10-4624-b9e2-c80230543ea8-e9e4d',
}
URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
body = {'model': 'doubao-seedream-5-0-flash-260628', 'prompt': 'a red apple on white table, product photo', 'response_format': 'url', 'size': '2048x2048', 'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'}
for name, k in KEYS.items():
    r = requests.post(URL, json=body, headers={'Authorization': 'Bearer %s' % k, 'Content-Type': 'application/json'}, timeout=60)
    print('%s -> HTTP %s' % (name, r.status_code))
    print('   ', r.text[:400].replace('\n', ' '))
