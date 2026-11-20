# -*- coding: utf-8 -*-
# SKU 盘点 v2: 条目边界 = slug 前最近的 "\n  {"; 关联 GSC 28d 网页级曝光
import io, re, json
t = io.open('src/data/products.ts', encoding='utf-8').read()
slugs = [(m.group(1), m.start()) for m in re.finditer(r"slug: '([a-z0-9-]+)'", t)]
inv = []
for k, (s, pos) in enumerate(slugs):
    # 条目起点: pos 之前最近的 "\n  {"
    start = t.rfind('\n  {', 0, pos)
    end = slugs[k+1][1] if k+1 < len(slugs) else len(t)
    # 下一个条目的起点
    nxt = t.find('\n  {', pos + 20)
    if nxt != -1 and nxt < end:
        end = nxt
    seg = t[start:end]
    if 'minQuantity' not in seg or 'basePrice' not in seg:
        continue
    def g(pat, default=''):
        mm = re.search(pat, seg)
        return mm.group(1) if mm else default
    inv.append({'slug':s,'name':g(r"name: '([^']*)'")[:40],
                'weight':int(g(r"weight_score: (\d+)",'0') or 0),
                'hot':'isHot: true' in seg,
                'minQ':g(r"minQuantity: (\d+)"),'opt':g(r"optimizedAt: '([^']*)'")})

# GSC 网页级
j = json.load(io.open('.hermes/gsc-2026-10-09/extract.json', encoding='utf-8'))
page_imps = {}
for win in ('hk','us','jp'):
    for row in j[win].get('网页', []):
        u = str(row.get('网页',''))
        m = re.search(r'/product/([a-z0-9-]+)/', u)
        if not m: continue
        sl = m.group(1)
        a = page_imps.setdefault(sl, [0,0])
        a[0] += int(row.get('展示') or 0); a[1] += int(row.get('点击次数') or 0)

json.dump({'inventory':inv,'page_imps':page_imps},
          io.open('.hermes/analysis/sku-inventory-2026-10-12.json','w',encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('SKUs:', len(inv), '| GSC product pages seen:', len(page_imps))
zero = [x for x in inv if page_imps.get(x['slug'],[0,0])[0] == 0]
print('GSC 28d 零曝光 SKU:', len(zero))
for x in zero:
    print('  ', x['slug'], '::', x['name'][:30], 'w=' + str(x['weight']), x['opt'])
