# -*- coding: utf-8 -*-
import urllib.request, time, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-reverify/15:47'})
t0 = time.time()
with urllib.request.urlopen(req, timeout=15) as resp:
    elapsed = time.time() - t0
    body = resp.read().decode('utf-8')
print('body bytes: {0} ({1:.2f}s)'.format(len(body), elapsed))
print('figure count:', body.count('<figure'))
print('img count:', body.count('<img'))
print('loading="lazy":', body.count('loading="lazy"'))
# Find all unique webp
webps = sorted(set(re.findall(r'/images/factory/[\w-]+\.webp', body)))
print('unique /images/factory/ webp: {0}'.format(len(webps)))
for w in webps:
    print('  -', w)
# Stage headers (01-06)
for n in ['01', '02', '03', '04', '05', '06']:
    if n in body:
        idx = body.find(n)
        ctx = body[max(0,idx-50):idx+50]
        print('  stage {0}: found at idx {1}, ctx: {2}'.format(n, idx, ctx[:100]))
