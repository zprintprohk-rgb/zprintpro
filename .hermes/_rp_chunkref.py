# -*- coding: utf-8 -*-
import requests, re
UA = {'User-Agent': 'Mozilla/5.0'}
html = requests.get('https://zprintpro.com/zh-hk/product/foil-red-packets/', headers=UA, timeout=30).text
print('html refs 2342-977b4abaf1c34676:', '2342-977b4abaf1c34676' in html)
print('html chunk 2342 hashes:', set(re.findall(r'2342-[a-f0-9]+\.js', html)))
# 对照: 该 hash 是否也出现在上一部署就该稳定的其他页面
html2 = requests.get('https://zprintpro.com/zh-hk/product/roll-stickers/', headers=UA, timeout=30).text
print('roll page refs same hash:', '2342-977b4abaf1c34676' in html2)
