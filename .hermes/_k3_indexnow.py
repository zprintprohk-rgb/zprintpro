import urllib.request, json
urls = [
    'https://zprintpro.com/zh-hk/blog/wedding-invitation-pricing-guide/',
    'https://zprintpro.com/en/blog/wedding-invitation-pricing-guide/',
    'https://zprintpro.com/ja/blog/wedding-invitation-pricing-guide/',
]
payload = {
    'host': 'zprintpro.com',
    'key': 'zprintpro-indexnow-2026',
    'urlList': urls,
}
try:
    req = urllib.request.Request('https://api.indexnow.org/indexnow',
                                 data=json.dumps(payload).encode('utf-8'),
                                 headers={'Content-Type': 'application/json'},
                                 method='POST')
    with urllib.request.urlopen(req, timeout=15) as r:
        print('IndexNow status:', r.status)
        print('IndexNow body:', r.read().decode('utf-8')[:200])
except urllib.error.HTTPError as e:
    print('IndexNow HTTP error:', e.code, e.reason)
except Exception as e:
    print('IndexNow FAIL:', e)
