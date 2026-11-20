# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# Find zh-hk processSteps block
idx = src.find("processSubtitle: '順豐速運覆蓋香港全境")
if idx == -1:
    idx = src.find("順豐速運")
if idx == -1:
    idx = src.find("SF Express")
if idx == -1:
    # Try any processSteps
    idx = src.find("processSteps: [")
if idx > 0:
    print('found at', idx)
    print(src[idx:idx+1500])
else:
    print('not found')
