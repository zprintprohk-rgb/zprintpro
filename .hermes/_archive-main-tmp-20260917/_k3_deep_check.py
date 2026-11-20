# -*- coding: utf-8 -*-
import urllib.request, re
# 1. curl 根 URL factory-banner (无 locale 前缀)
for u in ['https://zprintpro.com/images/factory/factory-banner.webp',
          'https://zprintpro.com/images/factory/factory-press-pano.webp',
          'https://zprintpro.com/images/factory/factory-folding-machine-line.webp',
          'https://zprintpro.com/images/factory/showcase-rigid-box-cabinet.webp']:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'M3-verify'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            print('{0:80s} {1} {2}'.format(u, resp.status, len(resp.read())))
    except Exception as e:
        print('{0:80s} ERROR {1}'.format(u, e))
print()
# 2. 看 zh-hk /about/ HTML 实际 srcset/src
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# 找所有 webp 引用
webp_hits = re.findall(r'[a-z-]+(?:press|factory|showcase|craft)[a-z0-9-]*\.webp', body)
print('zh-hk /about/ 全部 webp 引用 ({0}):'.format(len(webp_hits)))
seen = set()
for w in webp_hits:
    if w not in seen:
        seen.add(w)
        print('  -', w)
