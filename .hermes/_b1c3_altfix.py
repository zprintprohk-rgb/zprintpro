# -*- coding: utf-8 -*-
# 1) 扫全 SKU imageAlt 类型, 2) 修 folded-leaflets 三层嵌套 → 扁平真值字符串, 3) 同步 CSV
import io, json, csv, re
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT/'src/data/sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()

def iter_skus(t):
    i = t.index('{', t.index('export const skuSeoData') if 'export const skuSeoData' in t else 0)

# 粗扫: 每个 slug 的 imageAlt 值类型
slugs = re.findall(r'^  "([a-z0-9-]+)": \{', t, re.M)
odd = []
for slug in slugs:
    try:
        i = t.index('"%s":' % slug)
        blk = t[i:i + 90000]
        li = blk.index('"seo":')
        li2 = blk.index('"zh-hk":', li)
        seg = blk[li2:]
        fi = seg.index('"imageAlt":')
        v, _ = dec.raw_decode(seg[fi+11:].lstrip())
        if not isinstance(v, str):
            odd.append((slug, type(v).__name__))
    except Exception:
        pass
print('non-string imageAlt SKUs:', odd)

# 2) 修 folded-leaflets: 新真值 alt
NEW_ALT = {
 'zh-hk': '摺頁印刷 10份起 HK$0.70起 | 二摺三摺風琴摺摺疊傳單 | 智印港',
 'en': 'Folded Leaflet Printing 10 MOQ from $0.80 | Bi-Fold Tri-Fold Z-Fold | ZprintPro',
 'ja': 'リーフレット印刷 10枚から ¥110〜 | 二つ折り・三つ折り対応 | ZprintPro',
}
SLUG = 'folded-leaflets'

def set_field(src, loc, field, value):
    i = src.index('"%s":' % SLUG)
    block = src[i:i + 90000]
    li = block.index('"seo":')
    li2 = block.index('"%s":' % loc, li)
    seg = block[li2:]
    fi = seg.index('"%s":' % field)
    abs_fi = i + li2 + fi + len('"%s":' % field)
    txt = src[abs_fi:].lstrip()
    lead = len(src[abs_fi:]) - len(txt)
    _, used = dec.raw_decode(txt)
    return src[:abs_fi + lead] + json.dumps(value, ensure_ascii=False) + src[abs_fi + lead + used:]

for loc, v in NEW_ALT.items():
    t = set_field(t, loc, 'imageAlt', v)
io.open(ROOT/'src/data/sku-seo-data.ts', 'w', encoding='utf-8', newline='\n').write(t)
print('ts imageAlt fixed ×3 locales')

# 3) CSV alt 格同步
rows = list(csv.reader(io.open(ROOT/'zprintpro-sku-seo-data.csv', encoding='utf-8-sig'), delimiter='\t'))
hdr = [h.strip() for h in rows[0]]
si = hdr.index('Slug')
for r in rows[1:]:
    if len(r) < len(hdr):
        continue
    if r[si].strip() == SLUG:
        for li, loc in enumerate(('zh-hk', 'en', 'ja')):
            x = ('ZH', 'EN', 'JA')[li]
            r[hdr.index('图片Alt标签(%s)' % x)] = NEW_ALT[loc]
w = io.open(ROOT/'zprintpro-sku-seo-data.csv', 'w', encoding='utf-8', newline='')
csv.writer(w, delimiter='\t', lineterminator='\n').writerows(rows)
w.close()
print('CSV alt cells fixed')
