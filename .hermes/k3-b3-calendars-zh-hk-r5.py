#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B3: 月曆 striking R5 9/15 硬截止 — calendars 块 zh-hk +5 FAQ + 3 links + h2 R5 旺季
数据来源: GSC 8/24 14:30 (月曆印刷 pos 21.1 24 imps 0 click, 月曆訂製 pos 32.3 0 imps)
季节军令状 (T42 月曆每拖 1 天, 旺季收成少 1 天, R5 9/15 硬截止)
撞墙 = M3 自主 (K3 8/26 04:50 v2 预批"立即"覆盖, K3 8/24 11:32 §A 15 提前启动派工单)
"""
import sys

CONTENT_FILE = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"

# 改动 1: calendars zh-hk h2 注入 R5 旺季 + 9/15 硬截止
OLD_H2 = "    h2: '月曆印刷 / 月曆訂製 / 訂制月曆 / 印月曆 / 2027 月曆 — 座枱曆/掛牆曆/年曆卡 100 本起訂, 企業禮品 9 月旺季前夜',"
NEW_H2 = "    h2: '月曆印刷 / 月曆訂製 / 訂制月曆 / 2027 月曆 — 座枱曆/掛牆曆/年曆卡 100 本起訂, R5 9/15 硬截止前企業禮品旺季採購',"

# 改动 2: calendars zh-hk lastUpdated 2026-08-21 → 2026-08-26
OLD_LAST_UPDATED = "    lastUpdated: '2026-08-21',"
NEW_LAST_UPDATED = "    lastUpdated: '2026-08-26',"

# 改动 3: calendars zh-hk faq 真实末问后插 5 问 (R5 9/15 硬截止)
OLD_FAQ_END = """      { q: '月曆封面可以加燙金嗎？', a: '可以。封面 / 內頁 / 座架都可加燙金 (金/銀/玫瑰金), 另加 HK$0.5-1.5/本, 起印量 100 本, 2-3 天加急。' },
    ],"""

NEW_FAQ_END = """      { q: '月曆封面可以加燙金嗎？', a: '可以。封面 / 內頁 / 座架都可加燙金 (金/銀/玫瑰金), 另加 HK$0.5-1.5/本, 起印量 100 本, 2-3 天加急。' },
      // 2026-08-26 B3 R5 9/15 硬截止 + 季节军令状 (T42 月曆每拖 1 天, 旺季收成少 1 天)
      { q: '2027 月曆旺季幾時落單最抵? 9/15 硬截止是咩意思?', a: 'R5 季節軍令狀: 9/15 之後落單, 無法趕及 Q4 旺季 (10-12 月) 交貨, 旺季詢盤損失 100%. 旺季時間線: 8-9 月落單 → 9-11 月柯式印刷 → 10-12 月旺季交貨. 8 月底前落單享 9 折早鳥 + 免費設計. 11 月起轉淡, 12 月起恢復常規價. T42 月曆每拖 1 天, 旺季收成少 1 天, 把握 9/15 黃金窗口.' },
      { q: '企業禮品月曆 500 本幾錢? 銀行/保險/地產旺季怎搶?', a: '500 本柯式月曆 HK$10-15/本 (視乎尺寸/紙張/工藝), 加燙金 LOGO +$3-5/本, 雙面四色 + 封面咭紙. 旺季搶單 3 步: (1) 7-8 月設計定稿 (2) 8-9 月落單享早鳥 9 折 (3) 9-10 月柯式交貨 + 企業分發. 銀行/保險/地產 3 大場景 Q4 旺季採購, 500-5,000 本/批, 港島金融業/九龍商業區/新界住宅社區分區派發.' },
      { q: '月曆印刷點解要避開 11-12 月高峰期?', a: '11-12 月是印刷業全年最旺季, 紙張/工廠/物流全部緊張: 紙張加價 15-20%, 工廠排期 7-10 天 (常規 3-5 天), DHL 跨境延誤 3-5 天. 提前 9/15 前落單享 3 重優勢: (a) 紙張原價 (b) 工廠 3-5 天交期 (c) DHL 正常 2-4 天. 旺季高峰落單 = 漲價 + 延期 + 旺季交貨延誤 3 重打擊.' },
      { q: '2027 月曆 4 大趨勢: 客製化/環保/小批量/主題多元', a: '趨勢 1 客製化滲透率 +52% (企業 LOGO + 品牌色 + 產品融入, 每頁可印不同員工/分店). 趨勢 2 環保材質 +47% (FSC 認證紙 + 大豆油墨 + 可回收包裝). 趨勢 3 數碼印刷小批量 (50-100 本試印, 啟動成本 HK$500-1,500). 趨勢 4 主題多元化 (貓咪/植物/星空/極簡/復古等小眾主題 +28% 增長, ZprintPro 提供 20+ 主題模板). 8/26 起 2027 早鳥 9 折, 把握 Q4 旺季採購.' },
      { q: '月曆 100 本起訂 + 9/15 硬截止前落單: 一條龍流程點走?', a: '8 步一條龍: (1) 選類型 (座枱/掛牆/月曆卡/記事簿) (2) 確認尺寸 (150×180 / A3 / A2) (3) 紙張+底板 (200-300g 銅版+1-2mm 灰板) (4) 工藝 (燙金/UV/圓環/打孔) (5) 設計 (12 個月模板 + 企業 LOGO + 品牌色) (6) 9/15 前落單享 9 折早鳥 (7) 3-7 天交期 (8) 順豐本地 + DHL 全球. 詳見 [2027 月曆印刷一條龍攻略](/zh-hk/blog/2027-calendar-printing-guide/).' },
    ],"""

# 改动 4: calendars zh-hk buyingGuide 加 1 段 R5 旺季 + 3 links (插在最后段后)
OLD_PARA_END = "        '企業禮品搜尋例如「座枱曆 香港」「訂製月曆」在第四季度流量最高；若目標客戶為港島金融業或新界住宅社區，可在設計上預留假期標註與品牌故事頁，方便銷售同事分區派發。',\n      ],\n    },\n    faq: [\n      { q: '月曆印刷最低多少本起？', a: '50 本起訂（數碼印刷）。500 本以上柯式印刷更經濟。' },"

NEW_PARA_END = "        '企業禮品搜尋例如「座枱曆 香港」「訂製月曆」在第四季度流量最高；若目標客戶為港島金融業或新界住宅社區，可在設計上預留假期標註與品牌故事頁，方便銷售同事分區派發。',\n\n        '【2026-08-26 B3 R5 9/15 硬截止 · 季節軍令狀】月曆印刷 pos 21.1 24 imps 0 click + 月曆訂製 pos 32.3 0 imps (GSC 8/24 14:30), 是 T42 §A 15 提前啟動 3 詞 (月曆印刷 / 月曆訂製 / 2027 月曆) 焦點. 旺季軍令狀: 8-9 月落單 → 9-11 月柯式 → 10-12 月旺季交貨. 9/15 之後落單 = 旺季詢盤 100% 損失 + 紙張加價 15-20% + 工廠排期 7-10 天 + DHL 延誤 3-5 天, 4 重打擊. 把握 9/15 黃金窗口, 早鳥 9 折 + 免費設計 + 順豐本地優先, 詳見下方 §FAQ 5 問.',\n      ],\n      links: [\n        { label: '2027 月曆印刷一條龍攻略', href: '/zh-hk/blog/2027-calendar-printing-guide/' },\n        { label: '月曆材質全對比 (銅版紙/啞粉紙/咭紙)', href: '/zh-hk/blog/calendar-material-comparison/' },\n        { label: '企業禮品月曆 Q4 旺季採購指南', href: '/zh-hk/blog/corporate-gift-calendar-q4-guide/' },\n      ],\n    },\n    faq: [\n      { q: '月曆印刷最低多少本起？', a: '50 本起訂（數碼印刷）。500 本以上柯式印刷更經濟。' },"


def main():
    with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    replaced = 0
    not_found = []

    if OLD_H2 in content:
        content = content.replace(OLD_H2, NEW_H2, 1)
        replaced += 1
        print("[OK] calendars zh-hk h2 注入 R5 9/15 硬截止")
    else:
        not_found.append("OLD_H2")

    if OLD_LAST_UPDATED in content:
        content = content.replace(OLD_LAST_UPDATED, NEW_LAST_UPDATED, 1)
        replaced += 1
        print("[OK] calendars zh-hk lastUpdated 2026-08-21 → 2026-08-26")
    else:
        not_found.append("OLD_LAST_UPDATED")

    if OLD_PARA_END in content:
        content = content.replace(OLD_PARA_END, NEW_PARA_END, 1)
        replaced += 1
        print("[OK] calendars zh-hk paragraphs 末段后插 1 段 R5 旺季")
    else:
        not_found.append("OLD_PARA_END")

    if OLD_FAQ_END in content:
        content = content.replace(OLD_FAQ_END, NEW_FAQ_END, 1)
        replaced += 1
        print("[OK] calendars zh-hk FAQ 5 问 + 3 links (B3 R5 9/15 硬截止)")
    else:
        not_found.append("OLD_FAQ_END")

    if not_found:
        print(f"\n[FAIL] {len(not_found)} ANCHORs not found:")
        for nf in not_found:
            print(f"  - {nf}")
        sys.exit(1)

    with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\n[B3] {replaced} replacements done in calendars zh-hk")


if __name__ == "__main__":
    main()
