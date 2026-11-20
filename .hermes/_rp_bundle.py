# -*- coding: utf-8 -*-
# 决定性取证: 生产 JS bundle 是否含新 alt 串
import re, requests
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
html = requests.get('https://zprintpro.com/zh-hk/product/foil-red-packets/', headers=UA, timeout=30).text
scripts = re.findall(r'<script[^>]+src="([^"]+\.js[^"]*)"', html)
print('scripts:', len(scripts))
found = False
for s in scripts:
    u = s if s.startswith('http') else 'https://zprintpro.com' + s
    try:
        js = requests.get(u, headers=UA, timeout=30).text
    except Exception:
        continue
    if 'Lunar New Year' in js or '120gsm' in js:
        print('NEW ALT FOUND in bundle:', u[-70:])
        found = True
        break
if not found:
    print('NEW ALT ABSENT from all bundles — deployment 未含 a9f8a7de 数据')
