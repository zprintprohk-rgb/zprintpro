# -*- coding: utf-8 -*-
import urllib.request
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# body size + 看是否有 "figure" 标签
print('body bytes: {0}'.format(len(body)))
print('figure 数:', body.count('<figure'))
print('img 数:', body.count('<img'))
print('loading="lazy" 数:', body.count('loading="lazy"'))
print('loading="eager" 数:', body.count('loading="eager"'))
# 看 "showcase" / "factory-press-pano" 在 body 出现位置
for kw in ['showcase', 'factory-press-pano', 'factory-folding', 'showcase-rigid', 'showcase-black', 'showcase-vending', 'showcase-international', 'factory-gluing']:
    cnt = body.count(kw)
    print('  {0}: {1}'.format(kw, cnt))
