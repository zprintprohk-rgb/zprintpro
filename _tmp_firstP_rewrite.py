#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""重写 firstP (RULE 1 倒金字塔 < 100 字) + 補 3 內鏈 (RULE 9 ≥10)"""
import json
import sys

FILE = r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'

NEW_FIRST_P = '<p>香港餐廳菜單 4 種材質 5 維度對比:PP 過膠 HK$0.50-2、硬皮精裝 HK$80-200、PVC 防水 HK$15-50、紙巾式 HK$0.50-2。50 張起印,FDA + EU REACH 雙認證,5-7 個工作天交貨。</p>'

OLD_FIRST_P = '<p>2026 年香港餐飲業迎來體驗升級新時代,菜單不再只是一張紙,而是顧客下單決定的「最後一關」,也是品牌形象的延伸。一份高質素、設計精美的菜單能讓人均消費提升 15-25%,回頭率提升 30%。智印港為香港餐飲品牌提供 50-多年急件小至大批量菜單印刷,防水 PP 過膠 / 硬皮精裝 / 紙巾式拋棄菜單全系列,5-7 個工作天交付。</p>'

# 補 3 內鏈 (到 ≥10, 现有 7, 加 3 个) - 加在合适位置
# 现有 7 internal links 主要是 menus / packaging 类目
# 加 3 个: blog/packaging-box-pricing-2026 / product/waterproof-stickers / category/paper-bags

# 加在材質速贏段後 (材质选择速赢: 跨境连锁 → PP 过胶...)
INTERNAL_LINKS_BLOCK = '''<p>相關閱讀:<a href="/zh-hk/blog/packaging-box-pricing-2026/">包裝盒印刷價格 2026 完整指南</a> · <a href="/zh-hk/product/waterproof-stickers/">PVC 防水貼紙 SKU</a> · <a href="/zh-hk/category/paper-bags/">紙袋印刷類目</a></p>'''

# 找插入位置: 材质速赢段后 (材质选择速赢: ...)
INSERT_AFTER = '<p>材質選擇速贏:'

def main():
    with open(FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    post = data['restaurant-menu-printing-guide']
    c = post['content']
    old_len = len(c)

    # 1. 重写 firstP
    if OLD_FIRST_P in c:
        c = c.replace(OLD_FIRST_P, NEW_FIRST_P, 1)
        new_len_1 = len(c)
        print(f'1. Replaced firstP: {len(OLD_FIRST_P)} -> {len(NEW_FIRST_P)} chars (delta {len(NEW_FIRST_P) - len(OLD_FIRST_P)})')
    else:
        print('WARN: OLD_FIRST_P not found, skipping')
        new_len_1 = new_len_3 = new_len_4 = old_len

    # 2. 補 3 內鏈
    if INSERT_AFTER in c:
        # 找 INSERT_AFTER 對應的 </p> 結尾
        idx = c.index(INSERT_AFTER)
        p_end = c.index('</p>', idx) + len('</p>')
        c = c[:p_end] + '\n\n' + INTERNAL_LINKS_BLOCK + c[p_end:]
        print(f'2. Inserted 3 internal links after material selection quick win')
    else:
        print('WARN: INSERT_AFTER not found, skipping')

    new_len = len(c)
    print(f'NEW content length: {new_len} (delta {new_len - old_len})')

    post['content'] = c
    with open(FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Written {FILE}')

if __name__ == '__main__':
    main()
