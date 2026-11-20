# -*- coding: utf-8 -*-
# 对照实验: A=极简(曾成功) B=极简重发 C=batch同款, 各打 2 次, 打印完整响应
import requests, time, json
KEY = 'ark-18a3e74b-6c4b-4e60-a4b2-cc9798b75246-2835b'
H = {'Authorization': 'Bearer %s' % KEY, 'Content-Type': 'application/json'}
URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
P_SHORT = 'A single roll of custom die-cut paper labels on a white 4cm cardboard core, grid backing visible, honeycomb artwork label, studio product photo, square'

def call(tag, body):
    r = requests.post(URL, json=body, headers=H, timeout=180)
    print('%s -> %s' % (tag, r.status_code))
    print('   full:', r.text[:400].replace('\n', ' '))
    return r.status_code

# A: 与曾成功的 test4 完全一致
bodyA = {'model': 'doubao-seedream-5-0-flash-260915', 'prompt': P_SHORT, 'response_format': 'url', 'size': '2048x2048', 'stream': False, 'watermark': False, 'n': 1, 'output_format': 'png'}
call('A1', bodyA)
time.sleep(3)
call('A2', bodyA)
time.sleep(3)
# B: batch 的长 CJK prompt (zh-hk hero) — 从脚本 exec 纯常量段取得
src = open(r'F:\zprintpro-nextjs\.hermes\_roll_images2.py', encoding='utf-8').read()
ns = {}
exec(src[:src.index('def make_exif')], ns)
P_ZH = ns['build_prompt']('zh-hk', 'hero')
print('   P_ZH len =', len(P_ZH), 'bytes ≈', len(P_ZH.encode('utf-8')))
bodyB = dict(bodyA); bodyB['prompt'] = P_ZH
call('B1 zh-long', bodyB)
time.sleep(3)
call('B2 zh-long', bodyB)
