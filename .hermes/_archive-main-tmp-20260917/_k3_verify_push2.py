# -*- coding: utf-8 -*-
import urllib.request, time, json
# check-runs
url = 'https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/4286c0c/check-runs'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify-4286c0c'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for c in data.get('check_runs', [])[:3]:
            print('check-run: {0} {1}/{2}'.format(c.get('name'), c.get('status'), c.get('conclusion')))
except Exception as e:
    print('check-runs err:', e)
print()
# Curl footer + contact
for loc in ['zh-hk', 'en', 'ja']:
    for path, label in [('/contact/', 'contact'), ('/', 'home')]:
        u = 'https://zprintpro.com/{0}{1}?_={2}'.format(loc, path, int(time.time()))
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'M3-{0}-{1}'.format(loc, label), 'Cache-Control': 'no-cache'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                body = resp.read().decode('utf-8')
                cf_an = body.count('data-cf-analytics=')
                svc_hrs = body.count('週一至週六') + body.count('Mon - Sat') + body.count('月〜土')
                wa247 = body.count('24/7') + body.count('24時間')
                sup = body.count('中國大陸 24h') + body.count('China mainland 24h') + body.count('中国本土 24時間')
                print('{0}{1:9s}: {2}B  data-cf={3}  svc={4}  24-7={5}  support={6}'.format(loc, label, len(body), cf_an, svc_hrs, wa247, sup))
        except Exception as e:
            print('{0}{1} err:'.format(loc, label), e)
