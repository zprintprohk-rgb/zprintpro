# -*- coding: utf-8 -*-
# 卷裝標籤报价真值提取: price-data.generated.ts
import io, json, re
t = io.open('src/lib/price-data.generated.ts', encoding='utf-8').read()
# 结构: 配置数组含 zh-hk 配置名; 找含 卷裝 的配置及价格
roll_idx = [m.start() for m in re.finditer('卷裝', t)]
print('卷裝 mentions:', len(roll_idx))
# 看上下文结构: 配置对象含 name 与 prices
for pos in roll_idx[:4]:
    seg = t[max(0,pos-600):pos+600]
    print('---CTX---')
    print(seg[:900].replace('\n',' ')[:900])
    break
# 提取含卷裝的完整配置块: 以 "  {" 边界切
blocks = re.split(r'\n      \{', t)
kept = []
for b in blocks:
    if '卷裝' in b and ('"price"' in b or 'price:' in b or 'HK$' in b):
        kept.append(b)
print('roll blocks with price:', len(kept))
for b in kept[:8]:
    m = re.search(r'"zh-hk": "([^"]*)"', b)
    p = re.findall(r'"(?:price|HKD|value)":?\s*"?([\d.]+)', b)
    print(' *', (m.group(1)[:110] if m else '?'))
    print('   prices:', p[:12])
