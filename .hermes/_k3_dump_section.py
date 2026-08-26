# -*- coding: utf-8 -*-
import urllib.request, time, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-dump'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
idx = body.find('設備實拍圖')
if idx == -1:
    idx = body.find('equipment real photos')
if idx == -1:
    idx = body.find('拍板: 廠房')
if idx == -1:
    idx = body.find('廠房')
if idx >= 0:
    # Save a slice
    with open(r'F:\zprintpro-nextjs\.hermes\_k3_factory_section.html', 'w', encoding='utf-8') as f:
        f.write(body[idx:idx+12000])
    print('saved section to .hermes/_k3_factory_section.html, idx=', idx)
    # Show 1500 chars
    print(body[idx:idx+1500])
else:
    # dump first 5000 chars
    print('factory section not found, body head:')
    print(body[:3000])
