# -*- coding: utf-8 -*-
import urllib.request, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-find'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# Find the actual Bento section
for kw in ['廠房與設備', 'factorySectionTitle', 'Bento', 'Heidelberg Speedmaster', 'press-pano', 'Color management', '色彩管理', 'Post-press', 'post-press', 'Finished', 'Finished box', 'Giftbox', 'giftbox', 'Showcase', 'showcase', 'imageSlotFactory']:
    idx = body.find(kw)
    print('{0:30s} idx={1}'.format(kw[:30], idx))
print()
# Body size & all factory refs
print('body bytes:', len(body))
print('factory refs in /images/factory/:', body.count('/images/factory/'))
print('figure tags:', body.count('<figure'))
print('img tags:', body.count('<img'))
print('factory-banner refs:', body.count('factory-banner.webp'))
print('press-pano refs:', body.count('press-pano.webp'))
print('showcase refs:', body.count('showcase'))
print('craft refs:', body.count('craft-'))
