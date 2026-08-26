# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# Find zh-hk processSteps - look for 海德堡
i = 0
for idx in range(0, len(src), 1):
    j = src.find("海德堡 4 色柯式", idx)
    if j < 0:
        break
    print('idx={0}: {1}'.format(j, src[j:j+200].replace(chr(10), ' ')))
    idx = j + 1
    i += 1
    if i > 5:
        break
