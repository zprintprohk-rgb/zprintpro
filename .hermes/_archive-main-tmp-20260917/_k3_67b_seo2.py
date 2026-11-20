#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/17 06:44 67-B v2: 直接替换 seo.ts 中 3 个类目 titles"""
from pathlib import Path

ROOT = Path(__file__).parent.parent
SEO_TS = ROOT / 'src' / 'lib' / 'seo.ts'

# Old → new mappings (current state of seo.ts)
# flyers.ja 已经被改, 不重复
# menus.zh-hk: 旧 + 新
# calendars.zh-hk: 旧 + 新

REPLACEMENTS = [
    # 餐牌印刷 - menus
    {
        'old': "'menus': {\n    // 餐牌印刷 / Menus / メニュー印刷 - 餐厅/咖啡厅菜单\n    titles: {\n      'zh-hk': '餐牌印刷 | 防水覆膜 + 30 秒 AI 报价 | 智印港',",
        'new': "'menus': {\n    // 2026-08-17 K3 CEO 战略定调: 餐牌印刷 CTR 收割 (60.61% -> 3%)\n    titles: {\n      'zh-hk': '餐牌印刷 防水耐用 | 多尺寸 + 免费设计 | 智印港',"
    },
    # 月曆印刷 - calendars
    {
        'old': "'calendars': {\n    // 月曆印刷 / Calendars / カレンダー印刷 - 2027 台曆/掛曆\n    titles: {\n      'zh-hk': '月曆印刷 | 2027 台曆/掛曆 + 30 秒 AI 报价 | 智印港',",
        'new': "'calendars': {\n    // 2026-08-17 K3 CEO 战略定调: 月曆印刷 CTR 收割 (60.61% -> 3%)\n    titles: {\n      'zh-hk': '月曆印刷 2027 | 台曆 + 掛曆 | 30 秒报价 | 智印港',"
    }
]

with open(SEO_TS, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0
for r in REPLACEMENTS:
    if r['old'] in content:
        content = content.replace(r['old'], r['new'], 1)
        changes += 1
        print('  OK: replaced ' + r['old'][:50] + '...')
    else:
        print('  MISS: ' + r['old'][:80] + '...')

if changes > 0:
    SEO_TS.write_text(content, encoding='utf-8')
    print('Wrote ' + str(changes) + ' changes')
else:
    print('No changes - need to inspect actual content')
