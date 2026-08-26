# -*- coding: utf-8 -*-
import urllib.request, time, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url + '?t=' + str(int(time.time())), headers={'User-Agent': 'M3-reverify2/15:48', 'Cache-Control': 'no-cache'})
t0 = time.time()
with urllib.request.urlopen(req, timeout=15) as resp:
    elapsed = time.time() - t0
    body = resp.read().decode('utf-8')
print('body bytes: {0} ({1:.2f}s)'.format(len(body), elapsed))
print('figure:', body.count('<figure'))
print('img:', body.count('<img'))
print('loading=lazy:', body.count('loading="lazy"'))
webps = sorted(set(re.findall(r'/images/factory/[\w-]+\.webp', body)))
print('unique webp: {0}'.format(len(webps)))
for w in webps:
    print('  -', w)
# Search for press-pano and others
for kw in ['press-pano', 'press-mobile', 'rigid-box', 'tactile-paper', 'conjoined', 'folding-machine', 'gluing', 'cabinet', 'vending', 'textbook', 'color-chart', 'hp-digital', 'label-press', 'offset-press', '6plus1', 'speedmaster', 'banner']:
    cnt = body.count(kw)
    print('  {0}: {1}'.format(kw, cnt))
