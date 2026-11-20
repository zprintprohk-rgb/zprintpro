# -*- coding: utf-8 -*-
import urllib.request, re
for path in ('/zh-hk/category/menus/', '/en/category/paper-bags/', '/en/category/menus/'):
    h = urllib.request.urlopen(urllib.request.Request('https://zprintpro.com' + path, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read().decode('utf-8', 'ignore')
    print('==', path)
    for m in re.finditer(r'HK\$0\.22', h):
        s = max(0, m.start() - 80)
        seg = re.sub(r'<[^>]+>', ' ', h[s:m.end() + 60])
        print('  HK$0.22 ctx:', ' '.join(seg.split())[:150])
    if path.startswith('/en'):
        print('  title tag:', re.search(r'<title>([^<]+)</title>', h).group(1)[:100])
        print('  has &amp;:', '&amp;' in h)
