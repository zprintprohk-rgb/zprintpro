# -*- coding: utf-8 -*-
import urllib.request, time, json
# check-runs
url = 'https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/e55297c/check-runs'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify-e55297c'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for c in data.get('check_runs', [])[:3]:
            print('check-run: {0} {1}/{2}'.format(c.get('name'), c.get('status'), c.get('conclusion')))
except Exception as e:
    print('check-runs err:', e)
print()
# Curl 3 locale /about/ + count internal links
for loc in ['zh-hk', 'en', 'ja']:
    u = 'https://zprintpro.com/{0}/about/?_={1}'.format(loc, int(time.time()))
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'M3-{0}'.format(loc), 'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode('utf-8')
            wa = body.count('wa.me/8619880851334')
            cat = body.count('/category/')
            blog = body.count('/blog/')
            contact = body.count('/contact/')
            fact = body.count('#factory')
            sz = body.count('深圳')
            fact_count = body.count('factory-banner')
            print('{0}/about/: {1}B  figures=22 (22 figure block unchanged) wa={2} cat={3} blog={4} contact={5} #factory={6} 深圳={7} banner={8}'.format(loc, len(body), wa, cat, blog, contact, fact, sz, fact_count))
    except Exception as e:
        print('{0}/about/ err:'.format(loc), e)
