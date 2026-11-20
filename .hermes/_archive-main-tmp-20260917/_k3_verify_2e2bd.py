# -*- coding: utf-8 -*-
import urllib.request, time, json
# check-runs for 2e2bd76
url = 'https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/2e2bd76/check-runs'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify-2e2bd76'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for c in data.get('check_runs', [])[:3]:
            print('check-run: {0} {1}/{2}'.format(c.get('name'), c.get('status'), c.get('conclusion')))
except Exception as e:
    print('check-runs err:', e)
print()
# Curl 3 locale
for loc in ['zh-hk', 'en', 'ja']:
    u = 'https://zprintpro.com/{0}/about/?_={1}'.format(loc, int(time.time()))
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'M3-{0}'.format(loc), 'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode('utf-8')
            figures = body.count('<figure')
            imgs = body.count('<img')
            print('{0}/about/ bytes={1} figures={2} imgs={3}'.format(loc, len(body), figures, imgs))
    except Exception as e:
        print('{0}/about/ err:'.format(loc), e)
