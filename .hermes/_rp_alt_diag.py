# -*- coding: utf-8 -*-
# 诊断: ① foil zh-hk live hero sha 复核 (排除 CF 边缘缓存时差) ② alt 渲染方式取证
import hashlib, re, time, requests
from pathlib import Path
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
BASE = 'https://zprintpro.com'
DST = Path(r'F:\zprintpro-nextjs/public/images/products/seedream-webp')

# ① 重试 5 次取 live foil zh-hk hero 对 sha
local = (DST / 'zprintpro-red-packets-foil-red-packets-zh-hk.webp').read_bytes()
for i in range(5):
    live = requests.get(BASE + '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk.webp',
                        headers=UA, timeout=30).content
    m = hashlib.sha256(live).hexdigest() == hashlib.sha256(local).hexdigest()
    print('try%d sha_match=%s bytes=%d' % (i, m, len(live)))
    if m:
        break
    time.sleep(30)

# ② alt 渲染取证: PDP HTML 中 hero 附近的 alt 属性原文
for loc, slug in (('zh-hk', 'foil-red-packets'), ('ja', 'cartoon-red-packets'), ('en', 'eco-red-packets'), ('zh-hk', 'large-red-packets')):
    r = requests.get(BASE + '/%s/product/%s/' % (loc, slug), headers=UA, timeout=30)
    name = 'zprintpro-red-packets-%s-%s.webp' % (slug, loc)
    # 找所有含该图名的标签
    tags = re.findall(r'<img[^>]*' + re.escape(name) + r'[^>]*>', r.text)
    print('\n--- %s %s: %d img tags ---' % (loc, slug, len(tags)))
    for tg in tags[:2]:
        m = re.search(r'alt="([^"]*)"', tg)
        print('ALT:', (m.group(1)[:110] if m else 'NO-ALT'))
    # 全页 alt 抽样 (含 利是封/Red Packet/ポチ袋 的 alt)
    alts = re.findall(r'alt="([^"]*(?:利是封|Red Packet|ポチ袋)[^"]*)"', r.text)
    print('keyword alts in page:', len(alts))
    for a in alts[:3]:
        print('  >', a[:110])
