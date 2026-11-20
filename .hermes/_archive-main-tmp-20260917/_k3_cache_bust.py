# -*- coding: utf-8 -*-
import urllib.request, time, re, hashlib
url_base = 'https://zprintpro.com/zh-hk/about/'
# Try different cache-bust + different routes
for url in [
    url_base,
    url_base + '?v=2',
    url_base + '?v=' + str(int(time.time())),
    'https://zprintpro.com/en/about/',
    'https://zprintpro.com/ja/about/',
]:
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'M3-' + hashlib.md5(url.encode()).hexdigest()[:6],
            'Cache-Control': 'no-cache, max-age=0',
            'Pragma': 'no-cache',
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode('utf-8')
            figures = body.count('<figure')
            webps = len(set(re.findall(r'/images/factory/[\w-]+\.webp', body)))
            cf_status = resp.headers.get('CF-Cache-Status', 'N/A')
            print('{0:60s} figures={1} webps={2} cf-cache={3} bytes={4}'.format(url[:60], figures, webps, cf_status, len(body)))
    except Exception as e:
        print(url, 'err:', e)
