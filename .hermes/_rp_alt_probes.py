# -*- coding: utf-8 -*-
# 利是封终验: PDP 主图 gallery alt 渲染 GEO 串 ×18 (等 push+CF build 后跑)
import sys, time, requests

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
BASE = 'https://zprintpro.com'
ALTS = {
 ('foil-red-packets', 'zh-hk'): '利是封印刷 / 燙金 / 春節紅包 | 香港燙金利是封印刷 120g紅色紙張 燙金 100個起印 | 智印港',
 ('foil-red-packets', 'en'): 'Red Packet Printing / Gold Foil / Lunar New Year | Foil Red Packets 120gsm, 100 pcs MOQ | ZprintPro',
 ('foil-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / 箔押し | 箔押しポチ袋 120g・100枚から | ZprintPro',
 ('embossed-red-packets', 'zh-hk'): '利是封印刷 / 浮雕 / 春節紅包 | 香港浮雕利是封印刷 150g紅色紙張 浮雕 100個起印 | 智印港',
 ('embossed-red-packets', 'en'): 'Red Packet Printing / Embossed / Lunar New Year | Embossed Red Packets 150gsm, 100 pcs MOQ | ZprintPro',
 ('embossed-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / エンボス | エンボスポチ袋 150g・100枚から | ZprintPro',
 ('custom-red-packets', 'zh-hk'): '利是封印刷 / 定製 / 春節紅包 | 香港定製利是封印刷 120g–150g紅色紙張 100個起印 | 智印港',
 ('custom-red-packets', 'en'): 'Red Packet Printing / Custom / Lunar New Year | Custom Red Packets 120–150gsm, 100 pcs MOQ | ZprintPro',
 ('custom-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / オリジナル | オリジナルポチ袋 120g–150g・100枚から | ZprintPro',
 ('cartoon-red-packets', 'zh-hk'): '利是封印刷 / 卡通 / 春節紅包 | 香港卡通利是封印刷 120g銅版紙 彩色 100個起印 | 智印港',
 ('cartoon-red-packets', 'en'): 'Red Packet Printing / Cartoon / Lunar New Year | Cartoon Red Packets 120gsm Art Paper, 100 pcs MOQ | ZprintPro',
 ('cartoon-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / キャラクター | キャラクターポチ袋 120gコート紙・100枚から | ZprintPro',
 ('eco-red-packets', 'zh-hk'): '利是封印刷 / 環保 / 春節紅包 | 香港環保利是封印刷 FSC認證再生紙 無覆膜 100個起印 | 智印港',
 ('eco-red-packets', 'en'): 'Red Packet Printing / Eco / Lunar New Year | Eco Red Packets FSC Recycled Paper Unlaminated, 100 pcs MOQ | ZprintPro',
 ('eco-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / エコ | エコポチ袋 FSC再生紙 無PP加工・100枚から | ZprintPro',
 ('large-red-packets', 'zh-hk'): '利是封印刷 / 大號 / 春節紅包 | 香港大號利是封印刷 150g–200g紅色紙張 100個起印 | 智印港',
 ('large-red-packets', 'en'): 'Red Packet Printing / Large Size / Lunar New Year | Large Red Packets 150–200gsm, 100 pcs MOQ | ZprintPro',
 ('large-red-packets', 'ja'): 'ポチ袋印刷 / 旧正月 / 大判 | 大判ポチ袋 150g–200g・100枚から | ZprintPro',
}

def get(url, tries=12, delay=20):
    for i in range(tries):
        try:
            r = requests.get(url, headers=UA, timeout=30)
            if r.status_code == 200 and len(r.content) > 2000:
                return r
        except Exception:
            pass
        time.sleep(delay)
    raise RuntimeError('give up ' + url)

fails = 0
for (slug, loc), alt in ALTS.items():
    url = BASE + '/%s/product/%s/' % (loc, slug)
    r = get(url)
    ok = alt in r.text
    if not ok and fails == 0:
        # HTML 转义容错: | 等不转义, 但双引号会变体 — 二次定位取证
        import re
        m = re.findall(r'alt="([^"]*(?:利是封|Red Packet|ポチ袋)[^"]*)"', r.text)
        print('  diag %s %s: %s' % (loc, slug, [a[:60] for a in m[:2]]))
    print('%-42s %s' % (loc + '/' + slug, 'PASS' if ok else 'FAIL'))
    fails += not ok
print('\n=== %d/%d PASS ===' % (18 - fails, 18))
sys.exit(1 if fails else 0)
