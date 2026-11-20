# -*- coding: utf-8 -*-
# 新 key 认证纯检查: /models (免费端点) + 完整错误
import requests
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
KEY = KEY.strip()
print('key len:', len(KEY))
r = requests.get('https://ark.cn-beijing.volces.com/api/v3/models', headers={'Authorization': 'Bearer %s' % KEY}, timeout=60)
print('models HTTP', r.status_code)
print(r.text[:300])
