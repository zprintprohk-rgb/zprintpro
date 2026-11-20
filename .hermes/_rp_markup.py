# -*- coding: utf-8 -*-
# 线上取证: PDP 中 foil zh-hk hero 图标签的精确 markup + 新串成分存在性
import re, requests
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
r = requests.get('https://zprintpro.com/zh-hk/product/foil-red-packets/', headers=UA, timeout=30)
html = r.text
name = 'zprintpro-red-packets-foil-red-packets-zh-hk.webp'
for m in re.finditer(re.escape(name), html):
    s = max(0, m.start() - 400)
    seg = html[s:m.end() + 60]
    tag = re.findall(r'<img[^>]*>', seg)
    print('--- occurrence ---')
    for tg in tag[-2:]:
        print(tg[:400])
for probe in ('100 pcs MOQ', '120gsm', '100個起印', 'Lunar New Year', '舊正月', '旧正月'):
    print('%r in html: %s' % (probe, probe in html))
print('response encoding:', r.encoding, '| apparent:', r.apparent_encoding)
