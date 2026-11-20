# -*- coding: utf-8 -*-
# 401 触发矩阵: watermark / size / 参数逐个隔离 (全用不存在的 model, 只看状态码)
import requests
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
H = {'Authorization': 'Bearer %s' % KEY, 'Content-Type': 'application/json'}
URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
BAD = 'no-such-model-xxx'
cases = [
 ('baseline 1024 no-wm',     {'model': BAD, 'prompt': 'test', 'response_format': 'url', 'size': '1024x1024', 'n': 1}),
 ('watermark False',         {'model': BAD, 'prompt': 'test', 'response_format': 'url', 'size': '1024x1024', 'watermark': False, 'n': 1}),
 ('size 2048',               {'model': BAD, 'prompt': 'test', 'response_format': 'url', 'size': '2048x2048', 'n': 1}),
 ('2048 + wmFalse',          {'model': BAD, 'prompt': 'test', 'response_format': 'url', 'size': '2048x2048', 'watermark': False, 'n': 1}),
 ('1024 + wmFalse + fmt',    {'model': BAD, 'prompt': 'test', 'response_format': 'url', 'size': '1024x1024', 'watermark': False, 'n': 1, 'output_format': 'png', 'stream': False}),
 ('1024 wmFalse longprompt', {'model': BAD, 'prompt': 'x ' * 300, 'response_format': 'url', 'size': '1024x1024', 'watermark': False, 'n': 1, 'output_format': 'png', 'stream': False}),
]
for name, body in cases:
    r = requests.post(URL, json=body, headers=H, timeout=60)
    print('%-26s -> %s  %s' % (name, r.status_code, r.text[:110].replace('\n', ' ')))
