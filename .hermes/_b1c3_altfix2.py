# -*- coding: utf-8 -*-
# folded-leaflets imageAlt 修正为 Record<Locale,string> 对象
import io, json
ROOT = r'F:\zprintpro-nextjs'
t = io.open(ROOT + r'\src\data\sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
SLUG = 'folded-leaflets'
NEW = {
 'zh-hk': '摺頁印刷 10份起 HK$0.70起 | 二摺三摺風琴摺摺疊傳單 | 智印港',
 'en': 'Folded Leaflet Printing 10 MOQ from $0.80 | Bi-Fold Tri-Fold Z-Fold | ZprintPro',
 'ja': 'リーフレット印刷 10枚から ¥110〜 | 二つ折り・三つ折り対応 | ZprintPro',
}
i = t.index('"%s":' % SLUG)
blk = t[i:i + 90000]
fi = blk.index('"imageAlt":')
abs_fi = i + fi + len('"imageAlt":')
txt = t[abs_fi:].lstrip()
lead = len(t[abs_fi:]) - len(txt)
_, used = dec.raw_decode(txt)
t = t[:abs_fi + lead] + json.dumps(NEW, ensure_ascii=False, indent=2).replace('\n', '\n    ').replace('    "zh-hk"', '  "zh-hk"') + t[abs_fi + lead + used:]
io.open(ROOT + r'\src\data\sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(t)
print('imageAlt object restored')
