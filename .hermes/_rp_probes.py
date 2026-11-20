# -*- coding: utf-8 -*-
# 利是封上线探针: PDP×18 + alt 渲染 + 字节 sha 对账 + cartoon ja 4 图 + sitemap
import re, sys, time, hashlib, requests
from pathlib import Path

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
BASE = 'https://zprintpro.com'
DST = Path(r'F:\zprintpro-nextjs/public/images/products/seedream-webp')
results = []

def get(url, tries=10, delay=20):
    last = None
    for i in range(tries):
        try:
            r = requests.get(url, headers=UA, timeout=30)
            if r.status_code == 200 and len(r.content) > 2000:
                return r
            last = r.status_code
        except Exception:
            last = 'ERR'
        time.sleep(delay)
    raise RuntimeError('give up %s last=%s' % (url, last))

def check(name, ok, detail=''):
    results.append((name, ok))
    print('%-52s %s %s' % (name, 'PASS' if ok else 'FAIL', detail))

NEWALTS = {
 ('foil-red-packets', 'zh-hk'): '利是封印刷 / 燙金 / 春節紅包 | 香港燙金利是封印刷 120g紅色紙張 燙金 100個起印 | 智印港',
 ('foil-red-packets', 'en'): 'Red Packet Printing / Gold Foil / Lunar New Year | Foil Red Packets 120gsm, 100 pcs MOQ | ZprintPro',
 ('foil-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / 箔押し | 箔押しポチ袋 120g・100枚から | ZprintPro',
 ('cartoon-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / キャラクター | キャラクターポチ袋 120gコート紙・100枚から | ZprintPro',
 ('eco-red-packets', 'en'): 'Red Packet Printing / Eco / Lunar New Year | Eco Red Packets FSC Recycled Paper Unlaminated, 100 pcs MOQ | ZprintPro',
 ('large-red-packets', 'zh-hk'): '利是封印刷 / 大號 / 春節紅包 | 香港大號利是封印刷 150g–200g紅色紙張 100個起印 | 智印港',
}
SLUGS = ['foil-red-packets', 'embossed-red-packets', 'custom-red-packets',
         'cartoon-red-packets', 'eco-red-packets', 'large-red-packets']

# 1) PDP × 18: 200 + alt 渲染 + 首图 sha 对账
for slug in SLUGS:
    for loc in ('zh-hk', 'en', 'ja'):
        p = '/%s/product/%s/' % (loc, slug)
        r = get(BASE + p)
        alt = NEWALTS.get((slug, loc))
        alt_in_html = (alt in r.text) if alt else None
        hero_web = '/images/products/seedream-webp/zprintpro-red-packets-%s-%s.webp' % (slug, loc)
        hero_ok = hero_web in r.text
        sha_ok = False
        if hero_ok:
            live = get(BASE + hero_web).content
            local = (DST / hero_web.split('/')[-1]).read_bytes()
            sha_ok = hashlib.sha256(live).hexdigest() == hashlib.sha256(local).hexdigest()
        jpg_gone = ('/images/products/%s.jpg' % slug) not in r.text
        check('pdp %s %s' % (loc, slug),
              r.status_code == 200 and hero_ok and sha_ok and jpg_gone and (alt_in_html in (True, None)),
              'alt_rendered=%s sha_match=%s jpg_gone=%s' % (alt_in_html, sha_ok, jpg_gone))

# 2) cartoon ja 四图
r = get(BASE + '/ja/product/cartoon-red-packets/')
n_ja = len(re.findall(r'/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja[^"]*\.webp', r.text))
check('cartoon ja 4 views', n_ja >= 4, 'ja_imgs=%d' % n_ja)

# 3) live EXIF alt 字节级 (下载 live webp 搜 alt)
live_webp = get(BASE + '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-ja.webp').content
alt_ja = NEWALTS[('foil-red-packets', 'ja')].encode('utf-8')
check('live EXIF alt (foil ja hero)', alt_ja in live_webp)

# 4) sitemap live
r = get(BASE + '/sitemap-image.xml')
ok = ('zprintpro-red-packets-cartoon-red-packets-ja-3.webp' in r.text and
      'zprintpro-red-packets-cartoon-red-packets-ja-4.webp' in r.text)
check('sitemap cartoon ja -3/-4', ok)

fails = [n for n, ok in results if not ok]
print('\n=== %d/%d PASS ===' % (len(results) - len(fails), len(results)))
sys.exit(1 if fails else 0)
