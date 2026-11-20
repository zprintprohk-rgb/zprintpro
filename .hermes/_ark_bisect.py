# -*- coding: utf-8 -*-
# 同进程对照: 直接用 batch 的 gen() vs 手写请求
import sys, time
sys.stdout.reconfigure(encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\.hermes\_roll_images2.py', encoding='utf-8').read()
ns = {'__name__': 'batchmod'}
exec(src[:src.index('# 前台分片跑')], ns)
print('repr(ARK_KEY)  =', repr(ns['ARK_KEY']))
print('repr(MODEL_CANDIDATES) =', repr(ns['MODEL_CANDIDATES']))
print('repr(ARK_URL)  =', repr(ns['ARK_URL']))
print('key len =', len(ns['ARK_KEY']))
print('header preview =', repr({'Authorization': 'Bearer %s' % ns['ARK_KEY']})[:80])

# 试验1: 直接调 batch 的 gen()
try:
    d = ns['gen']('a red apple on a white table')
    print('gen() -> 200, model =', d.get('model'))
except Exception as e:
    print('gen() FAIL:', str(e)[:200])

time.sleep(3)

# 试验2: 同进程手写 (ab 风格)
import requests
r = requests.post(ns['ARK_URL'], json={'model': ns['MODEL_CANDIDATES'][0], 'prompt': 'a red apple on a white table', 'response_format': 'url', 'size': '2048x2048', 'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'},
                  headers={'Authorization': 'Bearer %s' % ns['ARK_KEY'], 'Content-Type': 'application/json'}, timeout=180)
print('manual ->', r.status_code, r.text[:150].replace('\n', ' '))
