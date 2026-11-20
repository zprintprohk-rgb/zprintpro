#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
A 选项 - 节奏 A 变体: 改 rush-printing-delivery 服务页 metaMap
- 加 keywords 字段 (3 词: 即日印刷 + 印刷 カラー cmyk + 印刷 カラー モード + 关联)
- 改 title 把即日印刷 / CMYK 全彩 放最前 (per 7481e51 模式)
- 改 desc 把 CMYK 全彩 + DHL 2-4 天 + 順豐本地 卖点前置
"""
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs'
PAGE = os.path.join(ROOT, 'src', 'app', '[locale]', 'services', 'rush-printing-delivery', 'page.tsx')

NEW_META = """const metaMap: Record<string, { title: string; desc: string; keywords: string }> = {
  'zh-hk': {
    // 2026-08-18 节奏 A 变体: 即日印刷 + 印刷 cmyk + 印刷 cmyk 模式 (K3 v3.2 §二, B 22 词清单 8/18 续)
    // 模式 per 7481e51 (menus/calendars 改法): 机会词前置 + CMYK 全彩卖点 + 品牌后置
    title: '即日印刷 CMYK 全彩 | 18:00 截單 + 順豐本地 | 智印港',
    desc: '即日印刷 CMYK 全彩服務 100 張起印, 18:00 截單, 順豐本地滿 HK$500 免費, DHL 全球 2-4 天配送. 傳單、海報、貼紙、紙袋、畫冊、易拉寶通用, 防水抗 UV. WhatsApp 30 秒即時報價, ISO 9001 + FSC 認證.',
    keywords: '即日印刷,印刷 カラー cmyk,印刷 カラー モード,CMYK 印刷,同日交貨,急件印刷,香港即日印,順豐即日,印刷急單,小批量急件,當日印刷,24小時印刷,通宵印刷,印刷 カラー モード cmyk',
  },
  en: {
    title: 'Same-Day CMYK Printing | 100 MOQ + Rush + ZprintPro',
    desc: 'Same-day CMYK printing from 100 sheets, 6PM HKT cut-off, free local delivery over $200, DHL 2-4 day global. Flyers, posters, stickers, paper bags, booklets, roll-up banners, waterproof UV. 30-second AI quote. ISO 9001 + FSC certified.',
    keywords: 'same day printing,CMYK printing,color printing,rush printing,same day delivery,print rush,express printing,urgent print USA,quick printing,small batch rush,CMYK print mode,color print mode,24 hour printing,overnight printing',
  },
  ja: {
    title: '当日 CMYK 印刷｜100枚〜・即納・短納期｜ZprintPro',
    desc: '当日 CMYK 印刷サービス 100 枚から対応, 平日 18 時までのご注文で徹夜印刷, DHL 国際配送 2-4 日. チラシ・ポスター・ステッカー・紙袋・冊子・ロールアップバナー, 防水 UV. 30 秒 AI 無料見積もり. ISO 9001 + FSC 認証.',
    keywords: '当日印刷,CMYK 印刷,カラー印刷,緊急印刷,速達印刷,当日発送,即納印刷,小ロット緊急,短納期印刷,印刷 cmyk モード,印刷 カラー モード,徹夜印刷,24時間印刷',
  },
};"""

with open(PAGE, 'r', encoding='utf-8') as f:
    content = f.read()

# 找现有 metaMap 段
pat = re.compile(
    r"const metaMap: Record<string, \{[^}]+\}> = \{[\s\S]*?\n\};",
    re.MULTILINE
)
m = pat.search(content)
if not m:
    print('ERROR: metaMap 段未找到')
    sys.exit(1)

# 替换
new_content = content[:m.start()] + NEW_META + content[m.end():]
print(f'  ✓ 替换 metaMap ({m.end() - m.start()} chars → {len(NEW_META)} chars)')

# 同时改 generateMetadata 加 keywords 字段
m2 = re.search(r"return \{\s*title: m\.title,\s*description: m\.desc,", new_content)
if m2:
    new_content = new_content[:m2.start()] + 'return {\n    title: m.title,\n    description: m.desc,\n    keywords: m.keywords,' + new_content[m2.end():]
    print(f'  ✓ generateMetadata 加 keywords 字段')
else:
    print('  ⚠ generateMetadata return 段未找到, 跳过 keywords 加')

with open(PAGE, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f'  ✓ 写回 {PAGE}')
print(f'  size: {len(new_content):,}')
