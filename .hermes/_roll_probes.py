# -*- coding: utf-8 -*-
# 线上探针: 等 CF 生效后全量验收 (串行+间隔, 三重校验 per §0.23.2)
import requests, time, sys
sys.stdout.reconfigure(encoding='utf-8')

BASE = 'https://zprintpro.com'
PROBES = [
 ('/zh-hk/product/roll-stickers/', 200),
 ('/en/product/roll-stickers/', 200),
 ('/ja/product/roll-stickers/', 200),
 ('/zh-hk/product/fluorescent-stickers/', 301),
 ('/en/product/fluorescent-stickers/', 301),
 ('/ja/product/fluorescent-stickers/', 301),
 ('/zh-hk/product/drink-tokens/', 301),
 ('/zh-hk/product/cafe-table-cards/', 301),
 ('/zh-hk/product/wedding-place-cards/', 301),
 ('/en/product/save-the-date-cards/', 301),
 ('/ja/product/wedding-seating-charts/', 301),
 ('/en/product/wedding-suite-bundle/', 301),
 ('/ja/product/eco-tote-bag/', 301),
 ('/en/product/postcard-set/', 301),
 ('/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-1.webp', 200),
 ('/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-4.webp', 200),
]
UA = {'User-Agent': 'Mozilla/5.0 (probe)'}
t0 = time.time()
# 第一步: 等 roll PDP 上线 (最多 8 min)
live = False
while time.time() - t0 < 480:
    try:
        r = requests.get(BASE + '/en/product/roll-stickers/', headers=UA, timeout=30, allow_redirects=False)
        if r.status_code == 200 and b'Roll Labels' in r.content:
            live = True
            print('roll PDP live after %.0fs (HTTP 200 + marker)' % (time.time() - t0))
            break
    except Exception as e:
        print('wait: %s' % str(e)[:80])
    time.sleep(20)
if not live:
    print('TIMEOUT: roll PDP not live in 8 min')
    sys.exit(2)

fails = 0
for path, expect in PROBES:
    try:
        r = requests.get(BASE + path, headers=UA, timeout=30, allow_redirects=False)
        ok = r.status_code == expect
        extra = ''
        if expect == 301:
            loc = r.headers.get('Location', '')
            ok = ok and loc
            extra = ' -> %s' % loc
        if expect == 200 and 'product' in path:
            ok = ok and len(r.content) > 5000
        print('%-62s %d (expect %d)%s %s' % (path, r.status_code, expect, extra, 'PASS' if ok else 'FAIL'))
        fails += 0 if ok else 1
    except Exception as e:
        print('%-62s EXC %s FAIL' % (path, str(e)[:80]))
        fails += 1
    time.sleep(1.5)
print('=== %d/%d PASS ===' % (len(PROBES) - fails, len(PROBES)))
sys.exit(0 if fails == 0 else 1)
