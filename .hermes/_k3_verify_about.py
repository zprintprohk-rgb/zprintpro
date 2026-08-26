# -*- coding: utf-8 -*-
import urllib.request, time, re
locales = ['zh-hk', 'en', 'ja']
paths = ['/about/']
print('=== curl 3 locale /about/ + factory-banner 检查 ===')
for loc in locales:
    for p in paths:
        url = 'https://zprintpro.com/{0}{1}'.format(loc, p)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify-about/8.16'})
            t0 = time.time()
            with urllib.request.urlopen(req, timeout=15) as resp:
                elapsed = time.time() - t0
                body = resp.read().decode('utf-8')
                # 找 factory-banner
                banner_count = body.count('factory-banner.webp')
                # 找工序流关键图
                keys = ['factory-heidelberg-speedmaster', 'factory-press-pano', 'factory-folding-machine-line', 'showcase-rigid-box', 'craft-folding-box']
                counts = {k: body.count(k) for k in keys}
                # 找 LocalBusiness JSON-LD
                has_schema = '"@type":"LocalBusiness"' in body or 'LocalBusiness' in body
                print('{0:35s} {1} bytes {2:.2f}s banner={3} schema={4}'.format(url, len(body), elapsed, banner_count, has_schema))
                print('  工序图计数: {0}'.format(counts))
        except Exception as e:
            print('{0:35s} ERROR: {1}'.format(url, e))
print()
# curl factory-banner.webp
print('=== factory-banner.webp 直验 ===')
for loc in locales:
    url = 'https://zprintpro.com/{0}/images/factory/factory-banner.webp'.format(loc)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify-banner'})
        t0 = time.time()
        with urllib.request.urlopen(req, timeout=10) as resp:
            elapsed = time.time() - t0
            body = resp.read()
            print('{0:60s} {1} bytes {2:.2f}s CT={3}'.format(url, len(body), elapsed, resp.headers.get('Content-Type')))
    except Exception as e:
        print('{0:60s} ERROR: {1}'.format(url, e))
