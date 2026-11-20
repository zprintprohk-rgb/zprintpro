# -*- coding: utf-8 -*-
import urllib.request, time, re, json
url = 'https://zprintpro.com/zh-hk/about/'
# check-runs
runs_url = 'https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/717825f/check-runs'
try:
    req = urllib.request.Request(runs_url, headers={'User-Agent': 'M3-verify'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        for c in data.get('check_runs', [])[:3]:
            print('check-run: {0} {1}/{2}'.format(c.get('name'), c.get('status'), c.get('conclusion')))
except Exception as e:
    print('check-runs err:', e)
print()
# Curl page
for loc in ['zh-hk', 'en', 'ja']:
    u = 'https://zprintpro.com/{0}/about/?_={1}'.format(loc, int(time.time()))
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'M3-verify-{0}'.format(loc), 'Cache-Control': 'no-cache'})
        t0 = time.time()
        with urllib.request.urlopen(req, timeout=15) as resp:
            elapsed = time.time() - t0
            body = resp.read().decode('utf-8')
            figures = body.count('<figure')
            imgs = body.count('<img')
            webps = sorted(set(re.findall(r'/images/factory/[\w-]+\.webp', body)))
            print('{0}/about/: {1} bytes {2:.2f}s figure={3} img={4} webp={5}'.format(loc, len(body), elapsed, figures, imgs, len(webps)))
            # find stage labels
            for n in range(1, 7):
                s = str(n).zfill(2)
                if '>{0}<'.format(s) in body:
                    print('  stage {0} ✓'.format(s))
            # find banner
            if 'factory-banner.webp' in body:
                print('  factory-banner ✓')
            # find press-pano
            if 'factory-press-pano.webp' in body:
                print('  press-pano ✓')
            # find showcase
            showcase = body.count('showcase-')
            print('  showcase refs: {0}'.format(showcase))
    except Exception as e:
        print('{0}/about/ err:'.format(loc), e)
