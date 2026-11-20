# -*- coding: utf-8 -*-
import urllib.request
req = urllib.request.Request('https://zprintpro.com/zh-hk/category/red-packets/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore')
print('len:', len(html))
for probe in ['材質×工藝×尺寸完整指南', '專業品質，價格透明', '核心競爭優勢', '銅版紙 157', '利是封印刷完整指南', 'featuredSnippet', '過膠']:
    print(probe, '->', probe in html)
import re
m = re.search(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
print('first h2:', m.group(1)[:120] if m else None)
