# -*- coding: utf-8 -*-
import urllib.request, time
u = 'https://zprintpro.com/zh-hk/product/eco-flyers/'
mark = '10張起 HK$0.38起'
h = None
for _ in range(4):
    try:
        h = urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read().decode('utf-8', 'ignore')
        if len(h) > 20000:
            break
    except Exception:
        time.sleep(5)
print('len:', len(h) if h else 0)
print('marker present:', mark in h if h else False)
print('stale MOQ100 present:', ('100張起訂' in h) if h else '-')
