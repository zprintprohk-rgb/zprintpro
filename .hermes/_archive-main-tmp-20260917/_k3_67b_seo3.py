#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/17 67-B v3: 精准替换 menus/calendars zh-hk titles"""
from pathlib import Path

ROOT = Path(__file__).parent.parent
SEO_TS = ROOT / 'src' / 'lib' / 'seo.ts'

# Menus old → new (K3 战略: 数字+卖点+CTA 前置)
OLD_MENUS_ZH = "'zh-hk': '餐牌印刷 | HK$0.22起・免費設計・最快即日 | 智印港 ZprintPro'"
NEW_MENUS_ZH = "'zh-hk': '餐牌印刷 防水耐用 | 多尺寸 + 免费设计 | 智印港'"

# Calendars old → new
OLD_CAL_ZH = "'zh-hk': '月曆印刷 100本起 · 座檯/掛牆/2027 燙金精裝 ISO認證 DHL 2-4天 | 智印港'"
NEW_CAL_ZH = "'zh-hk': '月曆印刷 2027 | 台曆 + 掛曆 | 30 秒报价 | 智印港'"

with open(SEO_TS, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0
for old, new, name in [(OLD_MENUS_ZH, NEW_MENUS_ZH, 'menus.zh-hk'),
                       (OLD_CAL_ZH, NEW_CAL_ZH, 'calendars.zh-hk')]:
    if old in content:
        content = content.replace(old, new, 1)
        changes += 1
        print('  OK: replaced ' + name)
    else:
        print('  MISS: ' + name + ' (pattern not found)')
        # Debug: try to find partial match
        first_50 = old[:50]
        if first_50 in content:
            print('    partial match at first 50 chars')

if changes > 0:
    SEO_TS.write_text(content, encoding='utf-8')
    print('Wrote ' + str(changes) + ' changes')
