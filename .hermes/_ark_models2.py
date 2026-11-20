# -*- coding: utf-8 -*-
# 新 key 账户模型清单: 找 flash
import requests
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
r = requests.get('https://ark.cn-beijing.volces.com/api/v3/models', headers={'Authorization': 'Bearer %s' % KEY}, timeout=60)
ids = [m.get('id') for m in r.json().get('data', [])]
sd = [i for i in ids if 'seedream' in i.lower()]
print('seedream models on 2122227803:')
for i in sd:
    print('  ', i)
