# -*- coding: utf-8 -*-
# 旧 key 拉取模型清单, 找 seedream flash 真名
import requests, json
KEY = 'ark-cd021d85-1691-4f1c-bb05-986546a1949d-83434'
r = requests.get('https://ark.cn-beijing.volces.com/api/v3/models', headers={'Authorization': 'Bearer %s' % KEY}, timeout=60)
print('HTTP', r.status_code)
t = r.text
if r.status_code == 200:
    ids = [m.get('id') for m in r.json().get('data', [])]
    sd = [i for i in ids if 'seedream' in i.lower() or 'image' in i.lower()]
    print('total models:', len(ids))
    print('seedream/image models:')
    for i in sd:
        print('  ', i)
else:
    print(t[:300])
