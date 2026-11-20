# -*- coding: utf-8 -*-
# 卷裝配置完整提取: label + 其後 prices 数组
import io, re, json
t = io.open('src/lib/price-data.generated.ts', encoding='utf-8').read()
out = []
for m in re.finditer('"zh-hk": "([^"]*卷裝[^"]*)"', t):
    label = m.group(1)
    seg = t[m.end():m.end()+4000]
    pm = re.search(r'"prices":\s*\[', seg)
    if not pm:
        continue
    arr = seg[pm.end()-1:]
    depth = 0; end = None
    for i, c in enumerate(arr):
        if c == '[': depth += 1
        elif c == ']':
            depth -= 1
            if depth == 0: end = i; break
    tiers = re.findall(r'\{\s*"qty":\s*(\d+),\s*"priceHKD":\s*([\d.]+),\s*"priceUSD":\s*([\d.]+),\s*"priceJPY":\s*([\d.]+)', arr[:end])
    # en label
    em = re.search(r'"en": "([^"]*)"', seg[:600])
    out.append({'zh': label, 'en': em.group(1) if em else '', 'tiers': [{'qty':int(q),'hkd':float(h),'usd':float(u),'jpy':float(j)} for q,h,u,j in tiers]})
json.dump(out, io.open('.hermes/analysis/roll-label-pricing-truth.json','w',encoding='utf-8'), ensure_ascii=False, indent=1)
for o in out:
    print(o['zh'][:120])
    print('  en:', o['en'][:130])
    for t2 in o['tiers']:
        print('   qty %(qty)d → HK$%(hkd)g / $%(usd)g / ¥%(jpy)g' % t2)
    print()
