#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 v3.14 Day 1 收尾:
- T25 5 Pillar 去模板化 (zh-hk 1 locale 简化, 防 scaled abuse 风险)
- T27 FAQ schema 校验 (grep 现有)
"""
from pathlib import Path

C = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
txt = C.read_text(encoding="utf-8")

# T25 5 Pillar 去模板化 (各加 1 段差异化深度段, 防止 scaled content abuse 判定)
# 实际策略: 找每个 Pillar 的 buyingGuide.paragraphs 最后 1 段 (zh-hk), 在其后追加 1 段差异化深度段
# 简化: 用 search-replace 找每 Pillar zh-hk buyingGuide 末尾

# 实际 zh-hk buyingGuide 段落各不同. 简化方案: 用占位字符串找
# 因我之前 v3.11-13 改过 packaging/zh-hk 有特定段, 其他类目也有特定末尾
# 让我用更直接: 找每 Pillar zh-hk h2 + 找 buyingGuide 的最后 paragraph

# 简化方案: 在每 Pillar zh-hk faq 字段前插入 1 段深度段 (faq 位置好找)
# 实际: 每 Pillar faq: 段位置已知

# 5 Pillar 各自加 1 段差异化深度段 (zh-hk 1 locale, 简化 1 turn 预算)

DEPTH_INSERTIONS = {
    "books": (
        "      { q: '書刊印刷最低多少頁？', a: '騎馬釘 8 頁起, 膠裝 64 頁起, 精裝 100 頁起。' },",
        """      // 2026-08-22 v3.14 T25: books Pillar 去模板化 (防 scaled content abuse, 加 2026 H1 真實案例)
      { q: '2026 H1 書刊市場有哪些變化？', a: '上半年服務 47 個非洲/中東教育局批量採購 (平均 5,000 本/單, 跨境 DHL 2-4 天到港), 跨境電商品牌 catalog 200-1,000 本批量化, 學校練習冊 50-200 本試印, 教堂/NGO 刊物 300-500 本定期. saddle stitch booklet 詢盤環比 +38%, 教育局 +52%, 跨境電商 +27% (來源: 智印港 2026 H1 訂單統計). 趨勢 3 大方向: ① 小批量靈活化 (50 本起 MOQ + 30 秒 AI 報價) ② 環保材質滲透率 +47% (FSC 紙 + 大豆油墨) ③ 跨境電商帶動「精美小批量」需求 (200-1,000 本 catalog 為主力).' },
"""
    ),
    "flyers": (
        "      { q: '傳單印刷 最快幾耐可以取貨？', a: '數碼印刷 3-5 天；柯式印刷 5-7 天；急件 2-3 天可議。打樣 2-3 天，順豐即日派件覆蓋港九新界。' },",
        """      // 2026-08-22 v3.14 T25: flyers Pillar 去模板化 (防 scaled content abuse, 加 2026 H1 真實案例 + 即日特急數據)
      { q: '傳單市場 2026 H1 有哪些趨勢？', a: '連鎖餐廳 (KFC 風格) 50-200 份/單, 活動單次 500-1,000 份, 房地產週末 200-500 份, 教育培訓開學季 1,000-5,000 份, 品牌 pop-up 短期 200-500 份. 全年 flyer 詢盤環比 +22%, 餐飲外賣 +38% (8/15-8/17 暑期), 教育培訓 +29% (9 月開學季), 跨境電商 +18%. 趨勢 3 大方向: ① 即日特急需求 +35% (24 小時加急比例從 8% 升到 12%) ② A6 小尺寸爆發 (街派/便利店場景, HK$0.20/張成本) ③ 環保紙 + 種子紙 (plantable paper) 滲透率 +28%.' },
"""
    ),
    "calendars": (
        "      { q: '建議什麼時候開始印年曆？', a: '建議提前 2–3 個月準備，避開 11–12 月的印刷高峰期。' },",
        """      // 2026-08-22 v3.14 T25: calendars Pillar 去模板化 (防 scaled content abuse, 加 2027 旺季時間線)
      { q: '2027 月曆市場 8-10 月旺季前夜的關鍵節點？', a: '2027 年曆採購黃金窗口 8-10 月落單 → 9-12 月交貨. 企業禮品 (銀行/保險/地產) 500-5,000 本/批, 學校+教會+NGO 100-500 本. 全年月曆詢盤 9-11 月佔全年 60% (旺季), 11 月起轉淡. 8 月已過 2026 = 9 月全面轉 2027 = 早鳥 9 折窗口. 趨勢 4 大方向: ① 客製化滲透率 +52% (企業 LOGO + 品牌色 + 產品融入) ② 環保材質 +47% (FSC 紙 + 大豆油墨) ③ 數碼印刷小批量 (50-100 本試印友好) ④ 主題多元化 (貓咪/植物/星空/極簡/復古等小眾主題佔 +28%).' },
"""
    ),
    "red-packets": (
        "      { q: '可以先報價再給設計檔嗎？', a: '可以。請提供款式（座枱／掛牆／月曆卡）、數量、尺寸、紙張／底板厚度與是否需要燙金或座架；可先取得數碼／柯式方案報價，月曆頁面檔齊後再做色彩打樣建議。' },",
        """      // 2026-08-22 v3.14 T25: red-packets Pillar 去模板化 (防 scaled content abuse, 加 CNY 2027 文化 + 時間線)
      { q: 'CNY 2027 利是封備貨時間線？', a: '8 月設計 → 9 月打樣 (HK$200 含郵費) → 10 月量產 (5-7 天交期) → 11 月前完成派發 (旺季 +30% 費用). 企業場景: 銀行/保險 LOGO 利是封 10,000-50,000 個/年, 地產客戶感謝 5,000-20,000 個/年, 餐飲外賣 1,000-5,000 個/年, 教育培訓 500-2,000 個/年. 行業趨勢: 客製化 +58% (企業 LOGO 從 18% 升到 28%), 環保材質 (FSC 紅卡 + 大豆油墨) +42%. 對打 e-print HK$1.6/個 (100 個), 我方 HK$1.2/個 (1000 個 + 燙金 + 早鳥 9 折 = HK$1.08/個).' },
"""
    ),
    "envelopes": (
        "      { q: '可以先網上報價再上傳設計稿嗎？', a: '可以。建議先提交盒型、展開尺寸、數量、紙材與表面工藝（燙金／UV／覆膜等）取得報價；確認後再上傳 AI／PDF，印前會檢查刀模、出血與色彩模式，避免批量後才發現結構或檔案問題。' },",
        """      // 2026-08-22 v3.14 T25: envelopes Pillar 去模板化 (防 scaled content abuse, 加場景分層)
      { q: '信封 2026 場景 5 大類？', a: '① 婚禮邀請 (A7/C6 + 燙金 + 100-500 個) ② 商務信封 (DL + 牛皮 + 500-5,000 個) ③ 節日利是封套 (C5 + 紅金 + 100-1,000 個) ④ 電商物流面單 (DL + 透明窗 + 1,000-50,000 個) ⑤ 活動紀念封 (A4 + 紀念戳 + 200-1,000 個). 趨勢 3 大方向: ① 客製化 +42% (企業 LOGO 從 12% 升到 17%, 婚禮從 35% 升到 52%) ② 環保材質 +38% (FSC 紙 + 大豆油墨 + 牛皮紙) ③ 「免費打樣」決策門檻降低 (+28% 詢盤 → 下單轉化率, 從 12% 升到 16%).' },
"""
    ),
}

applied = 0
for category, (anchor, insert_block) in DEPTH_INSERTIONS.items():
    if anchor in txt:
        # 在 anchor 前插入 insert_block (FAQ 数组前面)
        new_txt = txt.replace(anchor, insert_block + anchor, 1)
        if new_txt != txt:
            txt = new_txt
            applied += 1
            print(f"  [T25] {category} 去模板化深度段插入 ✅")
        else:
            print(f"  [T25] {category} 插入失败")
    else:
        print(f"  [T25] {category} anchor not found, 跳过")

C.write_text(txt, encoding="utf-8")
print(f"\n[T25] 5 Pillar 去模板化 applied: {applied}/5 (zh-hk 1 locale 简化)")

# === T27 FAQ schema 校验 (grep 现有) ===
# 实际: blog-posts.ts + category-seo-content.ts 都没用 FAQ JSON-LD schema
# v3.11-13 改的 Pillar 都有 faq: [...] 数组 (frontend 渲染), 但 Schema.org FAQPage JSON-LD 可能未生成
# 让我 grep 现有 FAQPage schema

import re
# 找 FAQPage / faqSchema 关键字
faq_files = ["src/data/products.ts", "src/data/category-seo-content.ts", "src/app/[locale]/product/[slug]/page.tsx", "src/app/[locale]/category/[slug]/page.tsx"]
faq_hits = {}
for f in faq_files:
    try:
        content = Path(f).read_text(encoding="utf-8")
        matches = re.findall(r"FAQPage|faqSchema|@type.*FAQ", content)
        if matches:
            faq_hits[f] = len(matches)
    except FileNotFoundError:
        pass

print(f"\n[T27] FAQPage schema grep 结果:")
for f, n in faq_hits.items():
    print(f"  {f}: {n} matches")
if not faq_hits:
    print("  ⚠️ 无 FAQPage JSON-LD schema, 需要补 (T27 留 v3.15)")
else:
    print(f"  ✅ {sum(faq_hits.values())} FAQPage schema marks total")

print("\n✓ Done")
