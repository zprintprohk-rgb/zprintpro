# -*- coding: utf-8 -*-
# W1 CTR 批 线上探针: 3 类目 ×3 locale <title> 新值
import urllib.request, time, sys
BASE = 'https://zprintpro.com'
PROBES = [
    ('/zh-hk/category/paper-bags/', ['紙袋印刷 100個起 HK$3-8/個', '牛皮白卡環保袋', '智印港']),
    ('/en/category/paper-bags/', ['Paper Bags 100 MOQ $1.84', 'Kraft & White Card']),
    ('/ja/category/paper-bags/', ['紙袋印刷 100個〜 ¥240〜', 'クラフト/白カード']),
    ('/zh-hk/category/menus/', ['餐牌印刷 10張起 HK$5起', '過膠PVC防水']),
    ('/en/category/menus/', ['Menu Printing 10 MOQ $1.84', 'PVC & Hardcover']),
    ('/ja/category/menus/', ['メニュー印刷 10枚〜 ¥258〜', 'PVC/ラミネート']),
    ('/zh-hk/category/packaging/', ['包裝盒訂製 100個起', '防油卡 3D打稿']),
    ('/en/category/packaging/', ['Packaging Boxes 100 MOQ $0.51', 'Food-Safe']),
    ('/ja/category/packaging/', ['パッケージ印刷 100個〜 ¥69〜', '食品紙箱/紙袋']),
]
ok = fail = 0
for path, markers in PROBES:
    got = None
    for _ in range(4):
        try:
            h = urllib.request.urlopen(urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read().decode('utf-8', 'ignore')
            if len(h) > 20000:
                got = h
                break
        except Exception:
            time.sleep(5)
    if not got:
        print('INVALID', path); fail += 1; continue
    miss = [m for m in markers if m not in got]
    if miss:
        print('MISS', path, miss); fail += 1
    else:
        print('OK  ', path); ok += 1
# 旧假价绝迹检查
    for stale in ('HK$0.22', '$0.14', '¥20〜', '$0.85'):
        if stale in got:
            print('  STALE PRESENT', path, stale)
print('PROBE: %d/9 ok, %d fail' % (ok, fail))
sys.exit(1 if fail else 0)
