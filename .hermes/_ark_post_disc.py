# -*- coding: utf-8 -*-
# 判别: 新 key 是 "POST 全拒" 还是 "仅图像服务无权限"
import requests
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
H = {'Authorization': 'Bearer %s' % KEY, 'Content-Type': 'application/json'}

# A) POST chat (1 token, 近乎零成本)
try:
    r = requests.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions',
                      json={'model': 'doubao-lite-128k-240428', 'messages': [{'role': 'user', 'content': 'hi'}], 'max_tokens': 1},
                      headers=H, timeout=60)
    print('POST chat -> HTTP', r.status_code, r.text[:180].replace('\n', ' '))
except Exception as e:
    print('POST chat EXC:', str(e)[:120])

# B) POST images with 故意不存在的 model: 401=认证层拦截; 404=认证通过但模型/权限问题
try:
    r = requests.post('https://ark.cn-beijing.volces.com/api/v3/images/generations',
                      json={'model': 'no-such-model-xxx', 'prompt': 'test', 'response_format': 'url', 'size': '1024x1024', 'n': 1},
                      headers=H, timeout=60)
    print('POST images(bad model) -> HTTP', r.status_code, r.text[:220].replace('\n', ' '))
except Exception as e:
    print('POST images EXC:', str(e)[:120])
