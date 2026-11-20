#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.8 集群 A 纸袋一击四词 实施脚本
1. paper-bags 类目 Pillar 加厚 (zh-hk/en/ja 3 locale) — h2/title/coreAdvantages/materialTable/serviceNodes/buyingGuide 4 词命中
2. 4 词 FAQ (zh-hk/en/ja 3 locale × 5 FAQ = 15 FAQ)
3. 内链改动 (paper-bags 类目页 → 6 paper-bags PDP + 6 paper-bags PDP → paper-bags 类目页 + 4 词 blog)
K3 8/21 11:35 v3.8 拍板, 8/22 4-in-1 push 合批
K3 8/20 15:11 暴怒"立即停止" → 本地备好 working tree, 不 commit/push
"""
import re
from pathlib import Path

# 1. 6 paper-bags PDP slug
PDP_SLUGS = [
    "kraft-paper-bags",
    "white-card-paper-bags",
    "gift-paper-bags",
    "eco-paper-bags",
    "handle-paper-bags",
    "large-paper-bags",
]

CATEGORY_PATH = Path(r"F:\zprintpro-nextjs\src\data\category-seo-content.ts")
content = CATEGORY_PATH.read_text(encoding='utf-8')

# === 1. paper-bags 类目 Pillar 加厚 4 词命中 ===
# 4 词: 印刷紙袋 + 紙袋印刷 + 紙袋訂製 + 訂做紙袋
# 现状: zh-hk L3815-3823 buyingGuide.paragraphs 已含 4 词, 但 h2 + coreAdvantages + serviceNodes 等字段要加

# zh-hk h2 加厚
old_zh_h2 = "    h2: '香港紙袋印刷 — 白卡／牛皮／特種紙，100 個起訂，品牌包裝首選',"
new_zh_h2 = """    h2: '香港紙袋印刷、紙袋訂製、訂做紙袋 — 白卡／牛皮／特種紙，100 個起訂，印刷紙袋品牌包裝首選',"""
assert old_zh_h2 in content
content = content.replace(old_zh_h2, new_zh_h2)

# zh-hk coreAdvantages 第 1 点加厚 (印刷紙袋 + 紙袋印刷)
old_zh_adv1 = """        {
          heading: '1. 全材質覆蓋：白卡紙到特種紙，滿足所有品牌定位',
          points: [
            '提供白卡紙、牛皮紙、黑卡紙、珠光紙、紋理紙、環保再生紙等 20+ 材質選擇',
            '滿足「紙袋印刷 香港」、「牛皮紙袋」、「禮品紙袋」、「品牌紙袋」等高搜索量關鍵詞',
            '適用於零售購物袋、禮品包裝、活動贈品、餐飲外帶、化妝品包裝等多元場景',
          ],
        },"""
new_zh_adv1 = """        {
          heading: '1. 全材質覆蓋：印刷紙袋／紙袋印刷／紙袋訂製／訂做紙袋一站搞定',
          points: [
            '提供白卡紙、牛皮紙、黑卡紙、珠光紙、紋理紙、環保再生紙等 20+ 材質選擇',
            '覆蓋「印刷紙袋」、「紙袋印刷 香港」、「紙袋訂製」、「訂做紙袋」4 大高搜索量關鍵詞，一次類目加強 = 4 詞同進首頁',
            '適用於零售購物袋、禮品包裝、活動贈品、餐飲外帶、化妝品包裝、婚禮回禮等多元場景',
          ],
        },"""
assert old_zh_adv1 in content
content = content.replace(old_zh_adv1, new_zh_adv1)

# zh-hk serviceNodes 加 "紙袋訂製流程" 节点
old_zh_service = """    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費刀模設計', description: '專業設計師提供紙袋展開圖設計，確保模切精準和糊袋牢固' },
        { title: '提手選配諮詢', description: '根據品牌風格和預算推薦最適提手材質和顏色，提升整體質感' },
        { title: '承重測試報告', description: '提供紙袋承重測試，確保符合使用需求，避免提手斷裂尷尬' },
      ],
    },"""
new_zh_service = """    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費刀模設計', description: '專業設計師提供紙袋展開圖設計，確保模切精準和糊袋牢固，訂做紙袋流程最關鍵一步' },
        { title: '提手選配諮詢', description: '根據品牌風格和預算推薦最適提手材質和顏色，提升整體質感' },
        { title: '承重測試報告', description: '提供紙袋承重測試，確保符合使用需求，避免提手斷裂尷尬' },
        { title: '紙袋訂製 4 步流程', description: 'WhatsApp 提交尺寸數量 → 30 秒 AI 即時報價 → 免費打樣確認 → 3-5 天順豐直送港九新界' },
      ],
    },"""
assert old_zh_service in content
content = content.replace(old_zh_service, new_zh_service)

# zh-hk faq 加 4 词 FAQ (印刷紙袋 + 紙袋印刷 + 紙袋訂製 + 訂做紙袋)
old_zh_faq_end = """      { q: '可以先報價再上傳刀模嗎？', a: '可以。請提供袋型（平底／方底）、尺寸、紙材克重、印刷色數、提手類型與數量；可先取得數碼／柯式報價，刀模確認後再批量生產以降低重工風險。' },
    ],
  },"""
new_zh_faq_end = """      { q: '可以先報價再上傳刀模嗎？', a: '可以。請提供袋型（平底／方底）、尺寸、紙材克重、印刷色數、提手類型與數量；可先取得數碼／柯式報價，刀模確認後再批量生產以降低重工風險。' },
      // V3.8 集群 A 纸袋一击四词 (8/21 K3 拍板) — 4 词 FAQ 加厚
      { q: '印刷紙袋 100 個起印大概多少錢？', a: '數碼印刷 100 個起印，HK$1.8-3.5/個；柯式印刷 1,000 個以上 HK$1.5/個 起，5,000 個以上階梯折扣 15-25%。具體報價看尺寸、材質、提手。' },
      { q: '紙袋印刷 最快幾耐可以取貨？', a: '數碼印刷 3-5 天；柯式印刷 5-7 天；急件 2-3 天可議。打樣 2-3 天，順豐即日派件覆蓋港九新界。' },
      { q: '紙袋訂製 流程係點？', a: '4 步：① WhatsApp 提交尺寸數量 → ② 30 秒 AI 即時報價 → ③ 免費打樣確認 → ④ 3-5 天順豐直送。旺季建議提早 2-3 星期落單預留打樣時間。' },
      { q: '訂做紙袋 邊種材質最抵用？', a: '牛皮紙 (200g) 自帶環保文創感，HK$1.5/個 起最經濟，適合咖啡店、手作品牌；白卡紙 (250g) 印刷精細 HK$1.8/個 起，服裝美妝首選；珠光紙 + 燙金升級款 HK$3.5/個 起，婚禮回禮適用。' },
    ],
  },"""
assert old_zh_faq_end in content
content = content.replace(old_zh_faq_end, new_zh_faq_end)

# en h2 加厚
old_en_h2 = "    h2: 'Paper Bag Printing — White Card / Kraft / Specialty Paper, From 100 pcs, Brand Packaging Essential',"
new_en_h2 = """    h2: 'Custom Paper Bags & Paper Bag Printing — White Card / Kraft / Specialty Paper, From 100 pcs, US Brand Packaging Essential',"""
assert old_en_h2 in content
content = content.replace(old_en_h2, new_en_h2)

# en coreAdvantages 第 1 点加厚
old_en_adv1 = """        {
          heading: '1. Full Material Range: White Card to Specialty Papers',
          points: [
            '20+ material options: white card, kraft paper, black card, pearl paper, textured paper, and eco recycled paper.',
            'Covers high-search keywords: "paper bag printing", "kraft paper bags", "gift bags", "branded paper bags".',
            'Ideal for retail shopping bags, gift packaging, event giveaways, food takeaway, and cosmetics packaging.',
          ],
        },"""
new_en_adv1 = """        {
          heading: '1. Full Material Range: Paper Bag Printing + Kraft Bags + Gift Bags One-Stop',
          points: [
            '20+ material options: white card, kraft paper, black card, pearl paper, textured paper, and eco recycled paper.',
            'Covers 4 high-search keywords: "custom paper bags", "paper bag printing", "kraft paper bags", "gift bags" — single category boost can move all 4 to page 1.',
            'Ideal for retail shopping bags, gift packaging, event giveaways, food takeaway, cosmetics packaging, and wedding favors.',
          ],
        },"""
assert old_en_adv1 in content
content = content.replace(old_en_adv1, new_en_adv1)

# en serviceNodes 加 "Paper Bag 4-Step Process" 节点
old_en_service = """    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Dieline Design', description: 'Professional designers provide paper bag dieline design ensuring precise die-cutting and secure gluing.' },
        { title: 'Handle Selection Consultation', description: 'Recommend optimal handle material and color based on brand style and budget for enhanced overall quality.' },
        { title: 'Load Capacity Testing', description: 'Paper bag load testing provided to ensure requirements are met and prevent handle breakage embarrassment.' },
      ],
    },"""
new_en_service = """    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Dieline Design', description: 'Professional designers provide paper bag dieline design ensuring precise die-cutting and secure gluing — the most critical step for custom paper bags.' },
        { title: 'Handle Selection Consultation', description: 'Recommend optimal handle material and color based on brand style and budget for enhanced overall quality.' },
        { title: 'Load Capacity Testing', description: 'Paper bag load testing provided to ensure requirements are met and prevent handle breakage embarrassment.' },
        { title: 'Custom Paper Bags 4-Step Process', description: 'WhatsApp dimensions + quantity → 30-second AI instant quote → Free sample confirmation → 3-5 day production + DHL Express 2-4 days worldwide.' },
      ],
    },"""
assert old_en_service in content
content = content.replace(old_en_service, new_en_service)

# en faq 加 4 词 FAQ
old_en_faq_end = """      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit bag size, paper type, handle style, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file with dieline design. Our prepress team will check die line accuracy and bleed.' },
    ],
  },"""
new_en_faq_end = """      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit bag size, paper type, handle style, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file with dieline design. Our prepress team will check die line accuracy and bleed.' },
      // V3.8 Cluster A: 4-word FAQ (8/21 K3)
      { q: 'How much do custom paper bags cost per piece for 100 pcs?', a: 'Digital printing from 100 pcs starts at US$0.23/pc. Offset runs of 1,000+ drop to US$0.19/pc. 5,000+ volumes unlock 15-25% tier discounts. Final price depends on size, paper, and handle.' },
      { q: 'What is the fastest turnaround for paper bag printing?', a: 'Digital 3-5 business days. Offset 5-7 business days. Rush 2-3 days available. DHL Express delivers in 2-4 days to US/UK/AU.' },
      { q: 'What is the custom paper bags process?', a: '4 steps: ① WhatsApp dimensions + quantity → ② 30-second AI instant quote → ③ Free sample confirmation → ④ 3-5 day production + DHL Express 2-4 days worldwide.' },
      { q: 'Which paper material is most cost-effective for kraft paper bags?', a: '200gsm kraft paper is the most economical at US$0.19/pc for 1,000+ — perfect for coffee shops, eco brands, and handmade goods. White card (250gsm) at US$0.23/pc suits fashion/beauty retail. Pearl paper + foil stamping (US$0.45/pc) is the wedding favor upgrade.' },
    ],
  },"""
assert old_en_faq_end in content
content = content.replace(old_en_faq_end, new_en_faq_end)

# ja h2 加厚
old_ja_h2 = "    h2: '紙袋印刷 — 白カード／クラフト／特殊紙、100個から、ブランドパッケージの定番',"
new_ja_h2 = """    h2: '紙袋印刷・紙袋 オーダーメイド・クラフト紙袋 — 白カード／クラフト／特殊紙、100個から、ブランドパッケージの定番',"""
assert old_ja_h2 in content
content = content.replace(old_ja_h2, new_ja_h2)

# ja coreAdvantages 第 1 点加厚
old_ja_adv1 = """        {
          heading: '1. 全材質対応：白カードから特殊紙まで',
          points: [
            '白カード紙、クラフト紙、黒カード紙、パール紙、テクスチャ紙、エコ再生紙など20種類以上の材質を選択可能。',
            '「紙袋印刷」、「クラフト紙袋」、「ギフト紙袋」、「ブランド紙袋」などの高検索ボリュームキーワードをカバー。',
            '小売ショッピングバッグ、ギフト包装、イベント配布、食品テイクアウト、化粧品包装など多様なシーンに対応。',
          ],
        },"""
new_ja_adv1 = """        {
          heading: '1. 全材質対応：紙袋印刷・紙袋 オーダーメイド・クラフト紙袋をワンストップ',
          points: [
            '白カード紙、クラフト紙、黒カード紙、パール紙、テクスチャ紙、エコ再生紙など20種類以上の材質を選択可能。',
            '4大検索キーワード「紙袋印刷」「紙袋 オーダーメイド」「クラフト紙袋」「ギフト紙袋」をカバー。1回のカテゴリ強化で4語同時に1ページ目入り可能。',
            '小売ショッピングバッグ、ギフト包装、イベント配布、食品テイクアウト、化粧品包装、ブライダルギフトなど多様なシーンに対応。',
          ],
        },"""
assert old_ja_adv1 in content
content = content.replace(old_ja_adv1, new_ja_adv1)

# ja serviceNodes 加 "紙袋 オーダメイド 4 ステップ流程"
old_ja_service = """    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料展開図デザイン', description: 'プロデザイナーが紙袋の展開図をデザイン。精密な抜き型と堅牢な糊付けを確保。' },
        { title: '取っ手選び相談', description: 'ブランドのスタイルと予算に応じて最適な取っ手の材質と色を推奨。全体の質感を向上。' },
        { title: '耐荷重テスト報告', description: '紙袋の耐荷重テストを提供。使用ニーズに適合し、取っ手の断裂を防ぎます。' },
      ],
    },"""
new_ja_service = """    serviceNodes: {
      title: '現地サービスポイント',
      items: [
        { title: '無料展開図デザイン', description: 'プロのデザイナーが紙袋の展開図を設計し、精密な抜き型と強固な糊付けを保証 — 紙袋 オーダメイドの最重要ステップ。' },
        { title: '取っ手選定相談', description: 'ブランドスタイルと予算に基づいて最適な取っ手の材質と色を推奨し、全体の質感を向上させます。' },
        { title: '耐荷重テストレポート', description: '紙袋の耐荷重テストを提供し、使用要件を満たし、取っ手の破損を防ぎます。' },
        { title: '紙袋 オーダメイド 4ステップ', description: 'WhatsAppでサイズと数量を送信 → 30秒AI即時見積もり → 無料サンプル確認 → 3-5日DHL Expressで全世界2-4日配送。' },
      ],
    },"""
assert old_ja_service in content
content = content.replace(old_ja_service, new_ja_service)

# ja faq 加 4 词 FAQ
old_ja_faq_end = """      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず紙袋サイズ、紙タイプ、取っ手スタイル、数量、加工オプションをご提出ください。確認後、展開図付きのAI／PDFファイルをアップロードします。印前チームが抜き型の精度、bleedをチェックします。' },
    ],
  },"""
new_ja_faq_end = """      { q: 'デザインファイルをアップロードする前に見積もりできますか？', a: 'はい。袋のサイズ、紙質、取っ手の種類、数量、印刷オプションをお知らせいただければ、見積もり可能です。確認後、AI / PDFファイルと展開図デザインをお送りください。プリプレスチームが展開図の精度と塗り足しを確認します。' },
      // V3.8 クラスタA：4語FAQ (8/21 K3)
      { q: 'クラフト紙袋 100個から印刷した場合の単価は？', a: 'デジタル印刷100個から HK$1.8/個〜。オフセット印刷1,000個以上はHK$1.5/個〜、5,000個以上は15-25%の段階割引あり。最終単価はサイズ・材質・取っ手により異なります。' },
      { q: '紙袋印刷の最短納期は？', a: 'デジタル印刷 3-5営業日。オフセット印刷 5-7営業日。特急 2-3営業日対応可能。DHL Expressで全世界2-4日配送。' },
      { q: '紙袋 オーダメイドの注文流程は？', a: '4ステップ：① WhatsAppでサイズと数量を送信 → ② 30秒AI即時見積もり → ③ 無料サンプル確認 → ④ 3-5日生産 + DHL Express全世界2-4日配送。繁忙期は2-3週間前のご注文推奨。' },
      { q: 'クラフト紙袋で一番コストパフォーマンスが高い材質は？', a: '200gクラフト紙が一番お得で HK$1.5/個〜（1,000個以上）、カフェ・エコブランド・手作り商品に最適。白カード紙（250g）は HK$1.8/個〜でアパレル・美容小売向け。パール紙 + 箔押しアップグレード版は HK$3.5/個〜でブライダルギフト適用。' },
    ],
  },"""
assert old_ja_faq_end in content
content = content.replace(old_ja_faq_end, new_ja_faq_end)

# 落盘
CATEGORY_PATH.write_text(content, encoding='utf-8')
print(f"OK: category-seo-content.ts 加厚 4 词")
print(f"  zh-hk: h2 + coreAdvantages 1 + serviceNodes + 4 FAQ")
print(f"  en:    h2 + coreAdvantages 1 + serviceNodes + 4 FAQ")
print(f"  ja:    h2 + coreAdvantages 1 + serviceNodes + 4 FAQ")
print(f"  size: {len(content)} chars")
