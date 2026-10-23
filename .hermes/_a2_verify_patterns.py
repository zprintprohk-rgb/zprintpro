# -*- coding: utf-8 -*-
# A2 pre-fix pattern verification: exact counts + sanctioned-phrase anchor
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

raw = open(r'F:\zprintpro-nextjs\src\data\blog-data\ja.json', encoding='utf-8').read()

patterns = {
 'R1 多個基本価格は業界最安水準': '多個基本価格は業界最安水準',
 'R2 個〜業界最安水準': '個〜業界最安水準',
 'R3 、多個 14 日納品': '、多個 14 日納品',
 'R4 多個超量産': '多個超量産',
 'R5 ISO9001 atom': '【ISO 9001品質体制】工場はISO 9001品質管理体制で認証済み。',
 'R6 attribution A': 'EU REACH + ISO 9001 + FSC 認証',
 'R7 attribution B': '+ FSC + ISO 9001 認証完備',
}
for name, p in patterns.items():
    print(f'{name}: {raw.count(p)}')

# sanctioned anchor: about-page quality phrase
for anchor in ['印刷責任者レベルの色校正', '色校正']:
    print(f'anchor [{anchor}]: {raw.count(anchor)}')

# show R5 exact byte context once
i = raw.find('【ISO 9001品質体制】')
print('R5 ctx:', raw[max(0,i-80):i+120].replace('\n',' | '))
