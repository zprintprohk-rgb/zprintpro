# -*- coding: utf-8 -*-
# 新 key: flash 实测 (200=图1直接可用) → 若 401 则 pro 判别
import requests, time
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
H = {'Authorization': 'Bearer %s' % KEY, 'Content-Type': 'application/json'}
URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
PROMPT = 'A single roll of custom die-cut paper labels on a white 4cm cardboard core, grid backing visible, honeycomb artwork label, studio product photo, square'

def probe(model):
    body = {'model': model, 'prompt': PROMPT, 'response_format': 'url', 'size': '2048x2048',
            'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'}
    r = requests.post(URL, json=body, headers=H, timeout=180)
    return r.status_code, r.text[:200]

s, t = probe('doubao-seedream-5-0-flash-260915')
print('flash ->', s, t.replace('\n', ' '))
if s != 200:
    s2, t2 = probe('doubao-seedream-5-0-pro-260628')
    print('pro   ->', s2, t2.replace('\n', ' '))
