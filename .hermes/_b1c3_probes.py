# -*- coding: utf-8 -*-
# 簇3 线上探针 9 URL: 状态/长度/渲染标记三重校验
import urllib.request, time, sys
BASE = 'https://zprintpro.com'
PROBES = [
    ('/zh-hk/category/flyers/', ['香港傳單印刷完整指南', '128g 銅版紙（光面）', '街派傳單用咩紙最抵？']),
    ('/en/category/flyers/', ['The Complete Flyer Printing Guide', '128gsm coated (gloss)']),
    ('/ja/category/flyers/', ['チラシ印刷完全ガイド', '128g コート紙（グロス）']),
    ('/zh-hk/category/posters/', ['香港海報印刷完整指南', 'PVC 燈箱布', '戶外海報可以保持幾耐']),
    ('/en/category/posters/', ['The Complete Poster Printing Guide', '440g']),
    ('/ja/category/posters/', ['ポスター印刷完全ガイド', 'PVCターポリン']),
    ('/zh-hk/product/folded-leaflets/', ['摺頁印刷 | 二摺三摺風琴摺', '六種摺疊結構與信息容量']),
    ('/en/product/folded-leaflets/', ['Folded Leaflets | Tri-Fold 10 MOQ', 'Six Fold Structures']),
    ('/ja/product/folded-leaflets/', ['三つ折り 10枚から ¥110', '6種の折り構造']),
]
ok = fail = 0
for path, markers in PROBES:
    got = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 (probe)'})
            with urllib.request.urlopen(req, timeout=30) as r:
                html = r.read().decode('utf-8', 'ignore')
            if len(html) > 20000:
                got = html
                break
        except Exception:
            time.sleep(5)
    if got is None:
        print('INVALID', path)
        fail += 1
        continue
    miss = [m for m in markers if m not in got]
    if miss:
        print('MISS', path, miss)
        fail += 1
    else:
        print('OK  ', path)
        ok += 1
print('PROBE RESULT: %d/9 ok, %d fail' % (ok, fail))
sys.exit(1 if fail else 0)
