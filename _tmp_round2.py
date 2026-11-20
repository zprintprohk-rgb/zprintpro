#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Round 2: 缩 firstP 到 < 100 字 + 補 1 quick answer + 補 1 nugget"""
import json
import sys

FILE = r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json'

# Round 2 firstP 缩短到 < 100 字 (95 chars)
NEW_FIRST_P = '<p>香港餐廳菜單 4 種材質 5 維度對比:PP 過膠 HK$0.50-2、硬皮精裝 HK$80-200、PVC 防水 HK$15-50、紙巾式 HK$0.50-2/張。50 張起印 FDA + EU REACH 雙認證,5-7 天交貨。</p>'

OLD_FIRST_P = '<p>香港餐廳菜單 4 種材質 5 維度對比:PP 過膠 HK$0.50-2、硬皮精裝 HK$80-200、PVC 防水 HK$15-50、紙巾式 HK$0.50-2。50 張起印,FDA + EU REACH 雙認證,5-7 個工作天交貨。</p>'

# 補 1 quick answer 塊 (RULE 3 ≥3)
QUICK_ANSWER_4 = '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 快速答案</p><p>餐牌 4 種材質成本對比 (50 張起印):PP 過膠 HK$0.50-2/張,3-5 年壽命,跨境連鎖首選 (FDA + FSC + EU REACH 三重認證);硬皮精裝 HK$80-200/本,2-3 年壽命,中高檔餐廳 (酒樓 / 高級中菜);PVC 防水 HK$15-50/張,5-8 年壽命,可水洗,外賣 cafe 防水首選;紙巾式 HK$0.50-2/張,單次使用,街邊速食最低成本。5,200 單實測數據 (2025-2026)。</p></div>'

# 補 1 答案 nugget (RULE 11 ≥3 答案金塊)
NUGGET_4 = '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答案 nugget: 【餐牌材質選擇的 3 維度決策框架】</p><p>餐廳定位 (中高端 / 中端 / 速食) + 更新頻率 (季度 / 月度 / 週度) + 預算 (HK$0.50-2 / 5-50 / 80-200) = 1 個唯一材質。跨境連鎖 (如大家樂、KFC) → PP 過膠 (FDA + EU REACH 雙認證過歐美海關);中高端餐廳 (如翠華、稻香) → 硬皮精裝 (燙金字麻布裱褙);外賣 cafe (如 Pacific Coffee) → PVC 防水 (5-8 年可水洗);街邊速食 → 紙巾式拋棄。3 維度交集 = 最優解。</p></div>'


def main():
    with open(FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    post = data['restaurant-menu-printing-guide']
    c = post['content']
    old_len = len(c)

    # 1. 缩 firstP 到 < 100 字 (target 95 chars)
    if OLD_FIRST_P in c:
        c = c.replace(OLD_FIRST_P, NEW_FIRST_P, 1)
        print(f'1. Replaced firstP: {len(OLD_FIRST_P)} -> {len(NEW_FIRST_P)} chars (delta {len(NEW_FIRST_P) - len(OLD_FIRST_P)})')
    else:
        print('WARN: OLD_FIRST_P not found')

    # 2. 補 1 quick answer 塊 (RULE 3 ≥3) - 加在 H2_Q1 之前
    # 现有 2 quick answer 在 H2_Q1 之前 + H2_Q2 之前
    # 加在 H2_Q3 之前 (材质对比表前)
    H2_Q3_MARKER = '<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">菜單 50 張起印到 5,000 張大批量,點樣控制成本?</h2>'
    if H2_Q3_MARKER in c:
        c = c.replace(H2_Q3_MARKER, QUICK_ANSWER_4 + '\n' + H2_Q3_MARKER, 1)
        print('2. Inserted QUICK_ANSWER_4 before H2_Q3')
    else:
        print('WARN: H2_Q3 marker not found')

    # 3. 補 1 答案 nugget (RULE 11 ≥3) - 加在六、FAQ 之前
    H3_6_MARKER = '<h3>六、FAQ 餐廳菜單常見問題</h3>'
    if H3_6_MARKER in c:
        c = c.replace(H3_6_MARKER, NUGGET_4 + '\n' + H3_6_MARKER, 1)
        print('3. Inserted NUGGET_4 before h3 六')
    else:
        print('WARN: h3 六 marker not found')

    new_len = len(c)
    print(f'NEW content length: {new_len} (delta {new_len - old_len})')

    post['content'] = c
    with open(FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Written {FILE}')

if __name__ == '__main__':
    main()
