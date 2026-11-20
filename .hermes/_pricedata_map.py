# -*- coding: utf-8 -*-
# 顶层键 ← 价格表映射 + digital-stickers-cost.json 全部 config 清单
import io, re, json
g = io.open('scripts/gen-price-data.mjs', encoding='utf-8').read()
# 找映射表: 顶层键 = 表名 的对应 (LOAD / TABLE / key 等)
for m in re.finditer(r"(?:const|let)\s+(\w+)\s*=\s*\{[^}]*\}", g[:8000]):
    seg = m.group(0)
    if 'digital-stickers' in seg or 'waterproof' in seg:
        print(seg[:1500])
        print('====')
j = json.load(io.open('src/data/price-tables/digital-stickers-cost.json', encoding='utf-8'))
print('META:', json.dumps(j.get('_meta', {}), ensure_ascii=False)[:400])
for i, p in enumerate(j.get('products', j if isinstance(j, list) else [])):
    if isinstance(p, dict) and 'config' in p:
        t = p['tiers']
        print('cfg[%d] %s | tiers=%d | %s' % (i, p['config'][:80], len(t), ', '.join('%d@HK$%g' % (x['qty'], x['sell_hkd']) for x in t[:6])))
