# -*- coding: utf-8 -*-
import requests
for p in ('/zh-hk/product/paper-bags/', '/en/product/paper-bags/', '/ja/product/paper-bags/'):
    r = requests.get('https://zprintpro.com' + p, timeout=25, allow_redirects=False,
                     headers={'User-Agent': 'Mozilla/5.0'})
    loc = r.headers.get('Location', '')
    code2 = ''
    if r.is_redirect and loc:
        r2 = requests.get(loc if loc.startswith('http') else 'https://zprintpro.com' + loc,
                          timeout=25, allow_redirects=False, headers={'User-Agent': 'Mozilla/5.0'})
        code2 = ' -> final hop %d' % r2.status_code
    print('%s %d Location=%s%s' % (p, r.status_code, loc, code2))
