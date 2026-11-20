# -*- coding: utf-8 -*-
# B1c2 线上探针: 9 URL x 状态/长度/新内容标记, 三重校验 (§0.23.2)
import urllib.request, time, sys

BASE = 'https://zprintpro.com'
PROBES = [
    ('/zh-hk/category/red-packets/', ['材質×工藝×尺寸完整指南', '香港利是封印刷 100 個起印']),
    ('/en/category/red-packets/', ['Materials, Finishing', '100 pcs, foil-stamped']),
    ('/ja/category/red-packets/', ['素材×加工×サイズ完全ガイド', '100個から']),
    ('/zh-hk/product/foil-red-packets/', ['金箔銀箔12色', '分版套印']),
    ('/en/product/foil-red-packets/', ['Foil Stamp Red Packets', 'Split-plate registration']),
    ('/ja/product/foil-red-packets/', ['12色の箔', '分割版見当']),
    ('/zh-hk/product/custom-red-packets/', ['企業利是封定製 | 品牌Logo', '分點包裝']),
    ('/en/product/custom-red-packets/', ['Logo 100 MOQ $0.74', 'Multi-Site Delivery']),
    ('/ja/product/custom-red-packets/', ['ロゴ入り 100個から', '拠点別梱包']),
]

def fetch(path):
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 (probe)'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode('utf-8', 'ignore')

ok = fail = 0
for path, markers in PROBES:
    got = None
    for attempt in range(4):
        try:
            st, html = fetch(path)
            if st == 200 and len(html) > 20000:
                got = html
                break
        except Exception as e:
            time.sleep(5)
    if got is None:
        print('INVALID', path)
        fail += 1
        continue
    missing = [m for m in markers if m not in got]
    if missing:
        print('MISS', path, missing)
        fail += 1
    else:
        print('OK  ', path)
        ok += 1
print('PROBE RESULT: %d/9 ok, %d fail' % (ok, fail))
sys.exit(1 if fail else 0)
