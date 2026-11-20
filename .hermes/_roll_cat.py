# -*- coding: utf-8 -*-
import io, re
t = io.open('src/lib/price-data.generated.ts', encoding='utf-8').read()
# 找卷裝配置所属的顶层 category key (形如  'xxx': {)
p = t.find('"zh-hk": "卷裝')
# 向前找最近的 "category" 或顶层 key 形态
seg = t[:p]
keys = list(re.finditer(r"^  '([a-z0-9-]+)': \{", seg, re.M))
print('所属顶层键:', keys[-1].group(1) if keys else '?')
start = keys[-1].start() if keys else 0
block = t[start:p+2500]
# 该 category 内全部配置的 zh-hk 名
labels = re.findall(r'"zh-hk": "([^"]*)"', block)
print('该键下配置数:', len(labels))
for l in labels:
    print('  -', l[:100])
