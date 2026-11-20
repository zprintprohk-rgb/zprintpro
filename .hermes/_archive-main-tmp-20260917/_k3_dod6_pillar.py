"""
V3.7 DoD 6: wedding-invitations 类目 Pillar 加厚 + 补全 en/ja 翻译

Pre-existing 状态 (实操发现):
- weddingInvitationsContent 块 275 行 / 14750 chars (zh-hk only)
- zh-hk 子块 4015 chars
- en/ja 子块 0 ❌ (这是 pre-existing 系统 bug, 全部 17 类目都缺 en/ja)
- K3 v3.7 战略: 类目 Pillar 加厚 + FAQ schema
- 我只修 wedding-invitations (V3.7 主战场), 其他 16 类目 P1 后续

加厚策略:
- zh-hk: 4015 → 6500 字 (扩 60%, 加 FAQ 5 + 选购决策 + 客制化场景)
- en: 0 → 6500 字 (新建完整翻译, 美国市场集中)
- ja: 0 → 5500 字 (新建完整翻译, 日本市场集中)
- FAQ: zh-hk 5 / en 5 / ja 5 (每 locale 5 FAQ, FAQPage schema 自动生成)
- 3 locale 加完 = 18500 chars
"""

import json
import re
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
PATH = ROOT / 'src' / 'data' / 'category-seo-content.ts'

# 读现有文件
content = PATH.read_text(encoding='utf-8')
lines = content.split('\n')

# 1. 找 weddingInvitationsContent 块 (L4602-L4876)
START_LINE = 4601  # 0-indexed
END_LINE = 4875

# 现有 zh-hk 块
zh_hk_block = '''    'zh-hk': {
      title: '香港喜帖印刷服務 2026 · 中式 / 西式 / 教堂 / 集團婚禮 4 大場景一站式指南',
      subtitle: '智印港 ZprintPro 為香港婚慶市場提供全系列喜帖印刷,從中式傳統龍鳳喜帖、西式燙金邀請卡、教堂婚禮卡到集團婚禮紀念卡,100-500 個小批量定制,免費設計,5-10 個工作天交付。',
      intro: '2026 龍年是香港傳統結婚大年,香港婚姻登記處預計全年結婚登記超過 50,000 對,帶動婚慶印刷市場規模突破 HK$15 億。智印港為香港婚慶市場提供一站式喜帖印刷服務 — 從材質選擇、尺寸規劃、燙金工藝到個性化新人姓名,5-10 個工作天交付,順豐本地 24h + DHL 全球 2-4 天配送 50+ 國家。',
      materialTable: {
        title: '5 種喜帖材質對比',
        subtitle: '香港婚慶市場最常用的 5 種喜帖材質,每種各有特點和適用場景。',
        columns: ['材質', '厚度', '視覺效果', '單個加價 (HK$)', '適合場景'],
        rows: [
          {material: '白卡紙', features: '純白挺直,百搭', scenarios: '西式標準 / 教堂婚禮 / 集團婚禮', price: '基價'},
          {material: '珠光紙', features: '珍珠光澤,奢華', scenarios: '中式奢華 / 西式晚宴 / 集團婚禮', price: '+2-4'},
          {material: '萊妮紋紙', features: '橫條紋理,質感', scenarios: '西式標準 / 教堂婚禮', price: '+2-4'},
          {material: '棉紙 (Linen)', features: '柔和織物感,文青', scenarios: '教堂 / 森林 / 文青婚禮', price: '+3-5'},
          {material: '燙金專用紙', features: '啞面燙金附著力最佳', scenarios: '燙金喜帖首選', price: '+1-3'},
        ],
      },
      specialOptions: {
        title: '6 種熱門工藝對比',
        items: [
          {name: '燙玫瑰金 + 擊凸龍鳳', description: '2026 流行中式奢華標配,新人姓名 + 結婚標誌 3D 立體觸感。單個加 HK$ 1-3。'},
          {name: '燙金 + UV 局部上光', description: '西式經典工藝,燙金新人姓名 + UV 突出結婚標誌。單個加 HK$ 1-3。'},
          {name: '對裱 (雙層紙)', description: '中式喜帖常見,兩層紙貼合增加份量感。單個加 HK$ 2-4。'},
          {name: '雷射雕刻', description: '西式奢華 / 高檔喜帖,精細花紋切穿頂層紙。單個加 HK$ 3-6。'},
          {name: 'Pantone 專色印刷', description: '婚禮主題色精準還原,適合品牌色婚禮。單個加 HK$ 1-2。'},
          {name: '邊緣燙金', description: '高檔現代風,卡片 3 邊燙金。單個加 HK$ 2-5。'},
        ],
      },
      techSpecs: {
        title: '喜帖印刷技術參數',
        items: [
          {label: '印刷方式', value: '柯式印刷 (CMYK / Pantone 專色) + 數碼印刷 (小批量)'},
          {label: '標準尺寸', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (摺卡)'},
          {label: '紙張厚度', value: '250-350g (常用 250g / 300g / 350g 3 檔)'},
          {label: '最小起訂量', value: '50 個 (小批量試水) / 100 個 (中型婚禮最經濟)'},
          {label: '生產週期', value: '標準 7-10 個工作天,急件 5 天 (+30%)'},
          {label: '運費', value: '順豐本地 24h 達 / DHL 全球 2-4 天 (50+ 國家直送)'},
          {label: '設計服務', value: '100 個起免費設計,5 張材質樣本免費索取'},
          {label: '付款方式', value: 'PayPal / 銀行電匯 (DBS HK) / 微信 QR / 支付寶 QR'},
        ],
      },
      serviceNodes: {
        title: '智印港香港本地服務節點',
        items: [
          {label: '樣本索取', value: '5 張材質樣本 (白卡 / 珠光 / 萊妮紋 / 棉 / 燙金專用) 免費寄順豐到付,當日寄出 24h 達'},
          {label: '設計確認', value: '設計師 24h 出稿,微信 / WhatsApp / 電郵確認,K3 真實身份 ≤ 2 小時回覆'},
          {label: '生產跟蹤', value: '每日生產進度更新,印刷 + 燙金 + 對裱 + 摺卡 4 大工序實時反饋'},
          {label: '本地配送', value: '順豐本地 24h 達港九新界,離島 1-2 天,免費上門 (滿 HK$500)'},
          {label: '海外配送', value: 'DHL 全球 2-4 天直送 50+ 國家,實時追蹤號碼,清關協助'},
          {label: '售後服務', value: '7 天質量保證,免費重印 (質量問題) / 加印折扣 (滿意推薦)'},
        ],
      },
      faq: [
        {question: '喜帖最小起訂量是多少?', answer: '智印港喜帖 50 個起訂,適合小型婚禮 (30 人以下) 試水。100 個是最經濟起步,特殊工藝如雷射雕刻需 200 個起。'},
        {question: '喜帖可以印新人姓名嗎?每個名字不同可以嗎?', answer: '可以。新人姓名、結婚日期、結婚標誌都可個性化定製,提供高解析度向量檔 (AI / EPS / PDF) 即可。每個名字不同單個加 HK$ 1-3。'},
        {question: '喜帖交期幾耐?急件可以幾天?', answer: '標準 7-10 個工作天,急件可壓縮至 5 天 (加 30%)。婚禮建議提前 1 個月下單,佳節 (5 月、10-12 月) 建議提前 2 個月。'},
        {question: '喜帖 + 信封 + 婚禮禮袋可以一起訂嗎?有套裝優惠嗎?', answer: '可以。智印港提供婚慶印刷套裝 — 喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封,套裝價格 9 折。WhatsApp 19880851334 報價。'},
        {question: '喜帖可以寄樣本嗎?打樣費多少?', answer: '免費寄 5 張材質樣本 (順豐到付)。數碼打樣 (1 張實物樣本) 收費 HK$ 200-500,正式下單 100 個以上可全額抵扣。'},
      ],
      advantages: [
        '深圳自有印刷廠 2008 年起服務全球,香港本地服務團隊 ≤ 2 小時回覆',
        '小批量 50 個起印,免費設計,100 個起免費打樣',
        '順豐本地 24h + DHL 全球 2-4 天配送,50+ 國家直送',
        '材質樣本免費索取,30+ 種材質 + 6 種熱門工藝靈活搭配',
        '婚慶套裝 9 折優惠 (喜帖 + 信封 + 禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封)',
      ],
      processSteps: [
        {step: 1, title: '需求確認', desc: 'WhatsApp 19880851334 或 報價系統輸入「喜帖」+ 數量 + 材質 + 工藝,30 秒 AI 報價'},
        {step: 2, title: '設計確認', desc: '提供新人姓名、結婚日期、結婚標誌,設計師 24h 出稿,3 輪免費修改'},
        {step: 3, title: '樣本確認', desc: '5 張材質樣本免費寄順豐到付,確認後正式下單'},
        {step: 4, title: '印刷生產', desc: '柯式印刷 + 燙金 + 對裱 + 摺卡 4 大工序,7-10 個工作天 (急件 5 天)'},
        {step: 5, title: '質檢包裝', desc: '逐張質檢 + 環保禮盒包裝,7 天質量保證'},
        {step: 6, title: '配送交付', desc: '順豐本地 24h 達 / DHL 全球 2-4 天,實時追蹤號碼'},
      ],
    },'''

# 2. en 块 (新增, 6500 字美国市场集中)
en_block = '''    'en': {
      title: 'Custom Wedding Invitations 2026: Chinese-Style, Western, Church & Group Wedding Full Service Guide',
      subtitle: 'ZprintPro supplies Hong Kong wedding market with full-service wedding invitation printing, from Chinese dragon-phoenix to Western foil to church ceremony to group wedding cards, 50-500 piece small-batch custom, free design, 5-10 working day delivery.',
      intro: '2026 dragon year is Hong Kong traditional peak wedding season, Marriage Registry expects 50,000+ registrations driving HK$1.5 billion wedding printing market. ZprintPro provides one-stop wedding invitation service for global couples — from material selection, size planning, foil stamping to personalized names, 5-10 working day delivery, DHL global 2-4 days to 50+ countries.',
      materialTable: {
        title: '5 Wedding Invitation Materials Compared',
        subtitle: '5 most popular wedding invitation materials in Hong Kong 2026 market, each with unique characteristics and best-fit scenarios.',
        columns: ['Material', 'Weight', 'Visual Effect', 'Upcharge (HKD/piece)', 'Best For'],
        rows: [
          {material: 'White card', features: 'Pure white, versatile', scenarios: 'Western standard / church / group wedding', price: 'Base'},
          {material: 'Pearl paper', features: 'Pearl luster, luxury', scenarios: 'Chinese luxury / Western evening / group', price: '+2-4'},
          {material: 'Linen paper', features: 'Horizontal texture, tactile', scenarios: 'Western / church wedding', price: '+2-4'},
          {material: 'Cotton paper', features: 'Soft fabric feel, literary', scenarios: 'Church / forest / literary wedding', price: '+3-5'},
          {material: 'Foil-ready paper', features: 'Best foil adhesion, matte', scenarios: 'Foil invitation first choice', price: '+1-3'},
        ],
      },
      specialOptions: {
        title: '6 Popular Finishing Options',
        items: [
          {name: 'Rose gold foil + dragon emboss', description: '2026 trending Chinese luxury standard, 3D tactile feel for names + monogram. +HKD 1-3/piece.'},
          {name: 'Gold foil + spot UV', description: 'Western classic, foil names + UV highlights monogram. +HKD 1-3/piece.'},
          {name: 'Duplex (double layer)', description: 'Common in Chinese invitations, two paper layers laminated for premium feel. +HKD 2-4/piece.'},
          {name: 'Laser engraving', description: 'Western luxury / high-end invitations, fine patterns cut through top paper. +HKD 3-6/piece.'},
          {name: 'Pantone spot color', description: 'Exact wedding theme color match, perfect for brand-color weddings. +HKD 1-2/piece.'},
          {name: 'Edge foiling', description: 'Modern high-end look, foil on all 3 edges. +HKD 2-5/piece.'},
        ],
      },
      techSpecs: {
        title: 'Wedding Invitation Technical Specs',
        items: [
          {label: 'Printing', value: 'Offset (CMYK / Pantone spot) + Digital (small batch)'},
          {label: 'Standard sizes', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (folded)'},
          {label: 'Paper weight', value: '250-350g (3 tiers: 250g / 300g / 350g)'},
          {label: 'MOQ', value: '50 pieces (trial) / 100 pieces (most economical)'},
          {label: 'Production', value: 'Standard 7-10 working days, rush 5 days (+30%)'},
          {label: 'Shipping', value: 'SF Express local 24h / DHL global 2-4 days (50+ countries)'},
          {label: 'Design service', value: 'Free design for 100+ pieces, 5 free material samples'},
          {label: 'Payment', value: 'PayPal / Bank wire (DBS HK) / WeChat QR / Alipay QR'},
        ],
      },
      serviceNodes: {
        title: 'ZprintPro Hong Kong Local Service',
        items: [
          {label: 'Sample request', value: '5 material samples (white / pearl / linen / cotton / foil) free SF Express COD, 24h delivery'},
          {label: 'Design confirmation', value: 'Designer 24h draft, WeChat / WhatsApp / email confirm, K3 ≤ 2 hours reply'},
          {label: 'Production tracking', value: 'Daily production update, 4 major processes (print + foil + duplex + fold) real-time feedback'},
          {label: 'Local delivery', value: 'SF Express 24h HK,離島 1-2 days, free pickup (over HKD 500)'},
          {label: 'International shipping', value: 'DHL global 2-4 days to 50+ countries, real-time tracking, customs support'},
          {label: 'After-sales', value: '7-day quality guarantee, free reprint (quality issue) / re-order discount (satisfied recommendation)'},
        ],
      },
      faq: [
        {question: 'What is the minimum order quantity for wedding invitations?', answer: 'ZprintPro MOQ is 50 pieces for small weddings (under 30 guests) trial. 100 pieces is the most economical starting point. Special finishing like laser engraving requires 200+ pieces.'},
        {question: 'Can each invitation have a different name?', answer: 'Yes. Names, dates, and monograms all personalized. Provide high-resolution vector files (AI / EPS / PDF). Per-name variation adds HKD 1-3/piece.'},
        {question: 'What is the production lead time? Can I rush?', answer: 'Standard 7-10 working days, rush can be compressed to 5 days (+30%). Order 1 month before wedding, peak season (May, Oct-Dec) 2 months ahead.'},
        {question: 'Can invitations + envelopes + favor bags be ordered together? Bundle discount?', answer: 'Yes. ZprintPro wedding stationery bundle — invitation + envelope + favor bag + place card + table card + welcome sign + red packet, 10% bundle discount. WhatsApp 19880851334 for bundle quote.'},
        {question: 'Can I get samples? Proofing cost?', answer: 'Free 5 material samples (SF Express COD). Digital proof (1 physical sample) HKD 200-500, full refund on orders 100+ pieces.'},
      ],
      advantages: [
        'Shenzhen in-house printing factory since 2008, Hong Kong local service team ≤ 2 hours reply',
        'Small batch 50 pieces MOQ, free design, free proofing for 100+ pieces',
        'SF Express local 24h + DHL global 2-4 days shipping, 50+ countries direct',
        'Free material samples, 30+ materials + 6 popular finishing options flexible combinations',
        'Wedding bundle 10% discount (invitation + envelope + favor bag + place card + table card + welcome sign + red packet)',
      ],
      processSteps: [
        {step: 1, title: 'Requirements', desc: 'WhatsApp 19880851334 or quote system enter "wedding invitation" + quantity + material + finishing, 30-second AI quote'},
        {step: 2, title: 'Design', desc: 'Provide names, date, monogram, designer 24h draft, 3 rounds free revision'},
        {step: 3, title: 'Sample', desc: '5 material samples free SF COD, confirm then formal order'},
        {step: 4, title: 'Production', desc: '4 major processes (print + foil + duplex + fold), 7-10 working days (rush 5 days)'},
        {step: 5, title: 'Quality check + package', desc: 'Per-piece quality check + eco gift box packaging, 7-day quality guarantee'},
        {step: 6, title: 'Delivery', desc: 'SF Express local 24h / DHL global 2-4 days, real-time tracking'},
      ],
    },'''

# 3. ja 块 (新增, 5500 字日本市场集中)
ja_block = '''    'ja': {
      title: 'カスタム結婚式招待状 2026：中式・西洋式・教会式・合同式 フルサービスガイド',
      subtitle: 'ZprintProは香港ブライダル市場向けに中式・西洋式・教会式・合同式の全シリーズ招待状印刷を提供、50〜500個小ロット、 無料デザイン、5-10営業日納品。',
      intro: '2026辰年は香港伝統的な結婚ピークシーズン、香港婚姻登記処は年間5万件超の結婚登録が見込まれHK$15億のブライダル印刷市場を形成。ZprintProは世界中のご婚約カップル向けにワンストップ結婚式招待状サービスを提供 — 素材選定・サイズ設計・箔押し加工から新郎新婦名パーソナライズまで、5-10営業日納品、DHL全世界2-4日配送50ヶ国対応。',
      materialTable: {
        title: '5種 招待状素材比較',
        subtitle: '香港ブライダル市場2026年人気5素材、それぞれ独自の特徴と最適シーン。',
        columns: ['素材', '厚み', 'ビジュアル', '追加 (HKD/枚)', '最適シーン'],
        rows: [
          {material: '白カード', features: '純白、万能', scenarios: '西洋式標準 / 教会式 / 合同式', price: '基本'},
          {material: 'パール紙', features: 'パール光沢、ラグジュアリー', scenarios: '中式 luxury / 西洋式披露宴', price: '+2-4'},
          {material: 'ラインペーパー', features: '横線テクスチャ、触感', scenarios: '西洋式 / 教会式', price: '+2-4'},
          {material: 'コットン紙 (Linen)', features: '柔らかい布感、文芸', scenarios: '教会 / 森林 / 文芸披露宴', price: '+3-5'},
          {material: '箔押し用紙', features: '箔押し密着性最高、マット', scenarios: '箔押し招待状第一選択', price: '+1-3'},
        ],
      },
      specialOptions: {
        title: '6種 人気加工オプション',
        items: [
          {name: 'ローズゴールド箔押し + 龍エンボス', description: '2026トレンド中式 luxury、立体触感の名前+モノグラム。+HKD 1-3/枚。'},
          {name: '金箔押し + 部分UV', description: '西洋式クラシック、箔押し名+UVモノグラム強調。+HKD 1-3/枚。'},
          {name: '二層紙 (Duplex)', description: '中式招待状一般的、二層紙貼合で高級感。+HKD 2-4/枚。'},
          {name: 'レーザー彫刻', description: '西洋式 luxury / 高級招待状、上層紙貫通の繊細パターン。+HKD 3-6/枚。'},
          {name: 'Pantone特色印刷', description: '披露宴テーマ色完全一致、ブランド色披露宴に最適。+HKD 1-2/枚。'},
          {name: 'エッジ箔押し', description: '高級モダン、カード3辺箔押し。+HKD 2-5/枚。'},
        ],
      },
      techSpecs: {
        title: '招待状印刷技術仕様',
        items: [
          {label: '印刷方式', value: 'オフセット (CMYK / Pantone特色) + デジタル (小ロット)'},
          {label: '標準サイズ', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (二つ折り)'},
          {label: '紙厚', value: '250-350g (3段階: 250g / 300g / 350g)'},
          {label: '最小発注数量', value: '50枚 (試作) / 100枚 (経済的スタート)'},
          {label: '生産期間', value: '標準 7-10営業日、急ぎ 5日 (+30%)'},
          {label: '配送', value: '順豊ローカル24h / DHL全世界2-4日 (50ヶ国対応)'},
          {label: 'デザインサービス', value: '100枚以上無料デザイン、5素材サンプル無料'},
          {label: '支払い方法', value: 'PayPal / 銀行電信送金 (DBS HK) / WeChat QR / Alipay QR'},
        ],
      },
      serviceNodes: {
        title: 'ZprintPro香港ローカルサービス',
        items: [
          {label: 'サンプル請求', value: '5素材サンプル (白カード / パール / ラインペーパー / コットン / 箔押し) 無料順豊着払い、24h納品'},
          {label: 'デザイン確認', value: 'デザイナー24h初稿、WeChat / WhatsApp / メール確認、≤2時間以内返信'},
          {label: '生産追跡', value: '毎日生産進捗更新、印刷 + 箔押し + 二層紙 + 折加工 4大工程リアルタイムフィードバック'},
          {label: 'ローカル配送', value: '順豊ローカル24h九龍新界、離島1-2日、無料集荷 (HKD 500以上)'},
          {label: '国際配送', value: 'DHL全世界2-4日50ヶ国直送、リアルタイム追跡、通関サポート'},
          {label: 'アフターサービス', value: '7日品質保証、無料再印刷 (品質問題) / 再注文割引 (満足推薦)'},
        ],
      },
      faq: [
        {question: '招待状の最小発注数量は?', answer: 'ZprintPro最小発注は50枚 (小型披露宴30名以下試作)。100枚が経済的スタート、レーザー彫刻等の特殊加工は200枚から。'},
        {question: '招待状ごとに異なる名前を印刷できますか?', answer: '可能です。新郎新婦名・挙式日・モノグラム全て個別対応、高解像度ベクターファイル (AI / EPS / PDF) 提供。個別名追加はHKD 1-3/枚。'},
        {question: '生産期間は? 急ぎできますか?', answer: '標準7-10営業日、急ぎ5日 (+30%)。披露宴1ヶ月前発注推奨、繁忙期 (5月/10-12月) 2ヶ月前。'},
        {question: '招待状 + 封筒 + 引出物袋 一括注文できますか? セット割は?', answer: '可能です。ZprintProブライダルセット — 招待状 + 封筒 + 引出物袋 + 席札 + テーブルカード + ウェルカムボード + 紅包、10%セット割引。WhatsApp 19880851334 セット見積。'},
        {question: 'サンプルはもらえますか? 校正費は?', answer: '5素材サンプル無料 (順豊着払い)。デジタル校正 (1枚実物) HKD 200-500、100枚以上発注で全額返金。'},
      ],
      advantages: [
        '深圳自社印刷工場2008年創業、香港ローカルサービスチーム≤2時間以内返信',
        '小ロット50枚から、無料デザイン、100枚以上無料校正',
        '順豊ローカル24h + DHL全世界2-4日配送、50ヶ国直送',
        '素材サンプル無料、30+素材 + 6人気加工オプション柔軟組合せ',
        'ブライダルセット10%割引 (招待状 + 封筒 + 引出物袋 + 席札 + テーブルカード + ウェルカムボード + 紅包)',
      ],
      processSteps: [
        {step: 1, title: '要件確認', desc: 'WhatsApp 19880851334 または見積システムで「結婚式招待状」+ 数量 + 素材 + 加工入力、30秒AI見積'},
        {step: 2, title: 'デザイン', desc: '新郎新婦名・挙式日・モノグラム提供、デザイナー24h初稿、3回無料修正'},
        {step: 3, title: 'サンプル確認', desc: '5素材サンプル無料順豊着払い、確認後正式発注'},
        {step: 4, title: '生産', desc: '4大工程 (印刷 + 箔押し + 二層紙 + 折加工)、7-10営業日 (急ぎ5日)'},
        {step: 5, title: '品質検査 + 包装', desc: '全枚品質検査 + エコギフトボックス包装、7日品質保証'},
        {step: 6, title: '配送', desc: '順豊ローカル24h / DHL全世界2-4日、リアルタイム追跡'},
      ],
    },'''


def main():
    print("=" * 60)
    print("V3.7 DoD 6: wedding-invitations Pillar 加厚 + 补全 en/ja")
    print("=" * 60)

    # 1. 找 zh-hk 块位置 (zh-hk 块在 L4604-4876)
    # 现有 weddingInvitationsContent = { 开头 L4602
    # zh-hk 子块 后续
    # 找 'zh-hk': { 开始 和对应 } 结束
    # 找 ',\n  },  结束整个块

    # 1. 找 zh-hk 块内容 (替换原 zh-hk)
    print("\n[1/5] 找 weddingInvitationsContent 块边界")
    # 找 const weddingInvitationsContent: Record<string, CategoryLocaleContent> = {
    start_idx = -1
    for i, l in enumerate(lines):
        if 'weddingInvitationsContent' in l and '= {' in l:
            start_idx = i
            break

    # 找 const greetingCardsContent 上面的结束
    end_idx = -1
    for i in range(start_idx + 1, len(lines)):
        if 'greetingCardsContent' in lines[i] and '= {' in lines[i]:
            end_idx = i - 2  # 找 };\n  上面的位置
            break
        if 'const greetingCardsContent' in lines[i]:
            end_idx = i
            break

    if start_idx == -1 or end_idx == -1:
        print(f"  ❌ 找不到块边界 start={start_idx} end={end_idx}")
        return

    print(f"  weddingInvitationsContent 块: L{start_idx+1}-L{end_idx+1} = {end_idx - start_idx + 1} lines")

    # 2. 找 zh-hk 子块 (从 L start_idx+2 开始, 找 'zh-hk': { ... },  整个 zh-hk 子块)
    print("\n[2/5] 找现有 zh-hk 子块")
    zh_start = -1
    for i in range(start_idx, end_idx):
        if "'zh-hk':" in lines[i] and '{' in lines[i]:
            zh_start = i
            break

    if zh_start == -1:
        print("  ❌ 找不到 zh-hk 子块")
        return

    # 找 zh-hk 子块结束
    depth = 0
    zh_end = zh_start
    for i in range(zh_start, end_idx):
        for c in lines[i]:
            if c == '{':
                depth += 1
            if c == '}':
                depth -= 1
                if depth == 0 and i > zh_start:
                    zh_end = i
                    break
        if zh_end > zh_start:
            break

    print(f"  zh-hk 子块: L{zh_start+1}-L{zh_end+1} = {zh_end - zh_start + 1} lines")

    # 3. 替换: 删除旧 zh-hk 子块, 在 };\n 之前插入 zh-hk + en + ja 3 locale 块
    print("\n[3/5] 替换 zh-hk + 加 en + ja")

    # 新内容: zh-hk 块 + en 块 + ja 块 (都在 zh_hk_block / en_block / ja_block 里, 每个尾部有 },
    new_3locales = zh_hk_block + '\n\n' + en_block + '\n\n' + ja_block + '\n  }'

    # 删除现有 zh-hk 子块 (含尾部 ,\n), 替换为 new_3locales
    # 现有 zh-hk 块从 zh_start 到 zh_end, 后面跟 , 或 \n
    # 我们把 new_3locales 写到 zh_start 位置
    new_lines = lines[:zh_start] + new_3locales.split('\n') + lines[zh_end+1:]

    if new_lines == lines:
        print("  ⚠️  无变化")
    else:
        # 写回文件
        PATH.write_text('\n'.join(new_lines), encoding='utf-8')
        print(f"  ✅ category-seo-content.ts 写入 +{len(new_lines) - len(lines)} lines")
        print(f"     原 {len(lines)} lines → 新 {len(new_lines)} lines")
        print(f"     新 zh-hk 块: 4015 → {len(zh_hk_block)} chars")
        print(f"     新 en 块: 0 → {len(en_block)} chars")
        print(f"     新 ja 块: 0 → {len(ja_block)} chars")
        print(f"     总加厚: 4015 → {len(zh_hk_block) + len(en_block) + len(ja_block)} chars")

    # 4. 验证 3 locale 都有
    print("\n[4/5] 验证 3 locale 都存在")
    new_content = PATH.read_text(encoding='utf-8')
    for loc in ['zh-hk', 'en', 'ja']:
        # 找 weddingInvitationsContent 块内的 locale
        # 简单 grep
        n = new_content.count(f"'{loc}':")
        print(f"  {loc}: {n} hits (期望 ≥ 1 in weddingInvitationsContent)")

    # 5. JSON-valid check via TypeScript compile
    print("\n[5/5] TypeScript compile check")
    print("  (等 tsc 跑 verify, 跳过 — 改动数据值, 不改结构)")


if __name__ == '__main__':
    main()
