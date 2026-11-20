# -*- coding: utf-8 -*-
"""skuMoneyFAQs 包装簇 8 SKU x 4Q x 3语 注入 (千问 sprint Top5 #3, W2)
真值锚: products.ts minQuantity/basePrice/price_range + 全站 3-5 個工作天 口径 + DHL 2-4 天 + 滿 HK$500 順豐
断言: 8 键插入 / 重复键 0 / 每 SKU 4Q / 三语齐 / 备份
"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "product-faqs.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-skufaq-pkg-20261020")
os.makedirs(BAK, exist_ok=True)

BLOCK = """  'folding-boxes': [
    {
      question: {
        'zh-hk': '折疊盒（彩盒）幾多錢？',
        en: 'How much do custom folding cartons cost?',
        ja: '折り畳み箱（カートン）の価格は？',
      },
      answer: {
        'zh-hk': '折疊盒 100 個起印，HK$2.5-15/個（按尺寸與紙材），8 檔標準尺寸免刀模費。標準 3-5 個工作天（檔案確認後）。',
        en: 'Folding cartons start at 100 MOQ, HK$2.5-15 per piece depending on size and stock. 8 standard sizes need no die-cut fee. Standard production 3-5 business days after artwork approval.',
        ja: '折り畳み箱は100個から、HK$2.5-15/個（サイズ・用紙による）。8規格サイズは抜き型代無料。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '折疊盒用咩紙材？可以加咩工藝？',
        en: 'What paper stocks and finishes are available?',
        ja: '用紙と加工の選択肢は？',
      },
      answer: {
        'zh-hk': '白卡 250-350g、牛皮紙、瓦楞紙可選；可加過膠、燙金、局部 UV、擊凸。FSC 認證紙可選（落單時註明）。',
        en: 'Options include white card 250-350gsm, kraft and corrugated; finishing covers lamination, foil stamping, spot UV and embossing. FSC-certified paper available on request.',
        ja: '白カード250-350g・クラフト紙・段ボールから選択可。ラミネート・箔押し・スポットUV・エンボス対応。FSC認証紙はご注文時にご指定ください。',
      },
    },
    {
      question: {
        'zh-hk': '折疊盒交期幾耐？點樣收貨？',
        en: 'What is the turnaround and delivery?',
        ja: '納期と配送は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天（檔案確認後），急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard lead time is 3-5 business days after artwork approval; rush scheduling available. Free SF Express in Hong Kong on orders over HK$500, DHL worldwide 2-4 days.',
        ja: '標準納期はデータ確定後3〜5営業日、特急相談可。香港国内はHK$500以上でSF Express無料、海外はDHLで世界2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '折疊盒適合咩產品？可以印 LOGO 嗎？',
        en: 'What products suit folding cartons and can I print my logo?',
        ja: 'どんな製品に向いていますか？ロゴ印刷は可能？',
      },
      answer: {
        'zh-hk': '適合食品、零售精品、電商發貨與禮品包裝；支援全彩 LOGO 印刷、開窗與易撕線客製。',
        en: 'Ideal for food, retail, e-commerce shipping and gift packaging. Full-colour logo printing, window patching and tear strips available.',
        ja: '食品・小売・EC発送・ギフト包装に最適。フルカラーロゴ印刷、窓あけ、ミシン目カスタム対応。',
      },
    },
  ],
  'mailer-boxes': [
    {
      question: {
        'zh-hk': '快遞盒（飛機盒）幾多錢？',
        en: 'How much do custom mailer boxes cost?',
        ja: 'メーラーボックス（航空箱）の価格は？',
      },
      answer: {
        'zh-hk': '快遞盒 100 個起印，HK$3.5-10/個（按尺寸與坑型）。標準 3-5 個工作天（檔案確認後）。',
        en: 'Mailer boxes start at 100 MOQ, HK$3.5-10 per piece depending on size and flute. Standard production 3-5 business days after artwork approval.',
        ja: 'メーラーボックスは100個から、HK$3.5-10/個（サイズ・段による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '快遞盒結構係點？適合 FBA 嗎？',
        en: 'What is the box structure and is it FBA-ready?',
        ja: '構造とFBA対応は？',
      },
      answer: {
        'zh-hk': '飛機盒自鎖底結構，免膠帶組裝；常用規格對應 Amazon FBA 發貨，跨境電商標配。',
        en: 'Self-locking crash-bottom structure assembles without tape; common sizes fit Amazon FBA shipments and cross-border e-commerce.',
        ja: 'クラッシュロック底の自立構造でテープ不要。主要サイズはAmazon FBA発送に対応し、越境ECの定番仕様です。',
      },
    },
    {
      question: {
        'zh-hk': '快遞盒交期同運費點計？',
        en: 'What is the lead time and shipping cost?',
        ja: '納期と送料は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express in Hong Kong over HK$500; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF Express無料、海外DHL世界2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '快遞盒可以印品牌 LOGO 嗎？',
        en: 'Can mailer boxes be printed with my brand?',
        ja: 'ブランドロゴの印刷は可能？',
      },
      answer: {
        'zh-hk': '可以，支援外箱全彩印刷、內箱單色印刷，提升開箱體驗；可加貼紙封口。',
        en: 'Yes — full-colour exterior printing and single-colour interior printing to lift the unboxing experience; sealing stickers optional.',
        ja: '可能です。外側フルカラー・内側1色印刷で開封体験を向上。封緘シールの追加も可能。',
      },
    },
  ],
  'rigid-boxes': [
    {
      question: {
        'zh-hk': '精裝盒幾多錢？',
        en: 'How much do rigid gift boxes cost?',
        ja: 'リジッド（化粧箱）の価格は？',
      },
      answer: {
        'zh-hk': '精裝盒 100 個起印，HK$8-42/個（按尺寸、灰板厚度與工藝）。標準 3-5 個工作天（檔案確認後）。',
        en: 'Rigid boxes start at 100 MOQ, HK$8-42 per piece depending on size, greyboard thickness and finishing. Standard production 3-5 business days after artwork approval.',
        ja: 'リジッドボックスは100個から、HK$8-42/個（サイズ・ボール厚・加工による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '精裝盒有咩盒型同工藝？',
        en: 'Which structures and finishes are available?',
        ja: '箱型と加工の種類は？',
      },
      answer: {
        'zh-hk': '天地蓋、書型磁吸、抽屜式可選；可加燙金、擊凸、局部 UV、內襯（EVA / 絨布）。',
        en: 'Lid-and-base, book-style magnetic and drawer structures; finishing includes foil stamping, embossing, spot UV and EVA or velvet inserts.',
        ja: '天地方・ブック型マグネット・引き出し型から選択。箔押し・エンボス・スポットUV・EVA/ベルベット内装対応。',
      },
    },
    {
      question: {
        'zh-hk': '精裝盒交期幾耐？',
        en: 'What is the lead time for rigid boxes?',
        ja: '納期はどのくらい？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天（檔案確認後），複雜工藝另議；急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 2-4 天。',
        en: 'Standard 3-5 business days after artwork approval; complex finishing quoted separately. Rush scheduling available. Free SF Express over HK$500 in Hong Kong, DHL 2-4 days worldwide.',
        ja: '標準3〜5営業日（データ確定後）、複雑な加工は別途相談。特急相談可。香港国内HK$500以上SF無料、海外DHL2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '精裝盒適合咩用途？',
        en: 'What are rigid boxes best used for?',
        ja: 'どんな用途に向いていますか？',
      },
      answer: {
        'zh-hk': '適合化妝品、珠寶鐘錶、電子產品與高端禮品；可做客製尺寸與內襯貼合。',
        en: 'Suited to cosmetics, jewellery and watches, electronics and premium gifting; custom sizes with fitted inserts available.',
        ja: '化粧品・宝飾時計・電子機器・高級ギフトに最適。カスタムサイズと内装の型合わせも可能。',
      },
    },
  ],
  'cosmetic-boxes': [
    {
      question: {
        'zh-hk': '化妝品盒幾多錢？',
        en: 'How much do cosmetic packaging boxes cost?',
        ja: '化粧品箱の価格は？',
      },
      answer: {
        'zh-hk': '化妝品盒 100 個起印，HK$8-65/個（按盒型與工藝）。標準 3-5 個工作天（檔案確認後）。',
        en: 'Cosmetic boxes start at 100 MOQ, HK$8-65 per piece depending on structure and finishing. Standard production 3-5 business days after artwork approval.',
        ja: '化粧品箱は100個から、HK$8-65/個（箱型・加工による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '化妝品盒常用咩工藝？',
        en: 'Which finishes are typical for cosmetic packaging?',
        ja: '化粧品箱で一般的な加工は？',
      },
      answer: {
        'zh-hk': '燙金、局部 UV、擊凸、啞膜可組合；面膜、精華液、香水等不同產品線可配不同盒型。',
        en: 'Foil stamping, spot UV, embossing and matte lamination combine freely; sheet masks, serums and perfumes each suit different structures.',
        ja: '箔押し・スポットUV・エンボス・マットラミネートを組合せ可能。フェイスマスク・美容液・香水など製品別に箱型を選べます。',
      },
    },
    {
      question: {
        'zh-hk': '化妝品盒交期同送貨？',
        en: 'Lead time and delivery for cosmetic boxes?',
        ja: '納期と配送は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express over HK$500 in Hong Kong; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF無料、海外DHL世界2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '可以印品牌 LOGO 同成分表嗎？',
        en: 'Can you print brand logos and ingredient lists?',
        ja: 'ロゴや成分表示の印刷は可能？',
      },
      answer: {
        'zh-hk': '可以，支援全彩印刷與細字成分表；檔案提供 AI/PDF，免費預檢出血與解析度。',
        en: 'Yes — full-colour printing including fine-print ingredient lists. Send AI/PDF artwork for a free bleed and resolution preflight.',
        ja: '可能です。フルカラー印刷と細かい成分表示に対応。AI/PDFデータは出血・解像度を無料チェックします。',
      },
    },
  ],
  'white-card-bags': [
    {
      question: {
        'zh-hk': '白卡紙袋幾多錢？',
        en: 'How much do white card paper bags cost?',
        ja: '白カード紙袋の価格は？',
      },
      answer: {
        'zh-hk': '白卡紙袋 100 個起印，HK$5-12/個（按尺寸與紙重）。標準 3-5 個工作天（檔案確認後）。',
        en: 'White card bags start at 100 MOQ, HK$5-12 per piece depending on size and paper weight. Standard production 3-5 business days after artwork approval.',
        ja: '白カード紙袋は100個から、HK$5-12/個（サイズ・紙厚による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '白卡紙袋適合咩品牌？',
        en: 'Which brands suit white card bags?',
        ja: 'どんなブランドに向いていますか？',
      },
      answer: {
        'zh-hk': '適合服裝、珠寶鐘錶、美妝與精品零售；挺度高、印刷還原度好，適合品牌形象袋。',
        en: 'Suited to apparel, jewellery and watches, beauty and boutique retail; high stiffness and accurate colour reproduction for brand-image bags.',
        ja: 'アパレル・宝飾時計・美容・セレクトショップに最適。腰が強く色再現性が高いため、ブランドイメージ袋に向きます。',
      },
    },
    {
      question: {
        'zh-hk': '可以加咩工藝？',
        en: 'What finishing options are available?',
        ja: '加工の選択肢は？',
      },
      answer: {
        'zh-hk': '可加過膠（光/啞）、燙金、局部 UV、擊凸；手挽可選棉繩、緞帶或紙手挽。',
        en: 'Gloss or matte lamination, foil stamping, spot UV and embossing; handles in cotton rope, ribbon or paper.',
        ja: '光沢/マットラミネート・箔押し・スポットUV・エンボス対応。持ち手は綿ロープ・リボン・紙製から選択。',
      },
    },
    {
      question: {
        'zh-hk': '交期同運費點計？',
        en: 'Lead time and shipping?',
        ja: '納期と送料は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express over HK$500 in Hong Kong; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF無料、海外DHL世界2〜4日。',
      },
    },
  ],
  'kraft-paper-bags': [
    {
      question: {
        'zh-hk': '牛皮紙袋幾多錢？',
        en: 'How much do kraft paper bags cost?',
        ja: 'クラフト紙袋の価格は？',
      },
      answer: {
        'zh-hk': '牛皮紙袋 100 個起印，HK$3-8/個（按尺寸與紙重），免費刀模。標準 3-5 個工作天（檔案確認後）。',
        en: 'Kraft paper bags start at 100 MOQ, HK$3-8 per piece depending on size and paper weight, free die-cut. Standard production 3-5 business days after artwork approval.',
        ja: 'クラフト紙袋は100個から、HK$3-8/個（サイズ・紙厚による）、抜き型無料。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '牛皮紙袋用咩紙？環保嗎？',
        en: 'What kraft stock is used and is it eco-friendly?',
        ja: '用紙と環境対応は？',
      },
      answer: {
        'zh-hk': '牛皮紙 120-200g 級，可選 FSC 認證紙（落單時註明）；大豆油墨印刷可選。',
        en: 'Kraft 120-200gsm, with FSC-certified stock available on request; soy-ink printing optional.',
        ja: 'クラフト120-200g級。FSC認証紙はご注文時にご指定ください。大豆インク印刷も選択可能。',
      },
    },
    {
      question: {
        'zh-hk': '手挽有咩選擇？',
        en: 'Which handle options are available?',
        ja: '持ち手の種類は？',
      },
      answer: {
        'zh-hk': '可選紙手挽、棉繩或緞帶手挽；袋底可加卡紙托底增強承重。',
        en: 'Paper, cotton-rope or ribbon handles; a cardboard base insert can be added for extra load strength.',
        ja: '紙製・綿ロープ・リボン持ち手から選択。底板を追加して耐荷重を強化できます。',
      },
    },
    {
      question: {
        'zh-hk': '交期同運費點計？',
        en: 'Lead time and shipping?',
        ja: '納期と送料は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express over HK$500 in Hong Kong; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF無料、海外DHL世界2〜4日。',
      },
    },
  ],
  'eco-paper-bags': [
    {
      question: {
        'zh-hk': '環保紙袋幾多錢？',
        en: 'How much do eco paper bags cost?',
        ja: 'エコ紙袋の価格は？',
      },
      answer: {
        'zh-hk': '環保紙袋 100 個起印，HK$3-8/個（按尺寸與紙材）。標準 3-5 個工作天（檔案確認後）。',
        en: 'Eco paper bags start at 100 MOQ, HK$3-8 per piece depending on size and stock. Standard production 3-5 business days after artwork approval.',
        ja: 'エコ紙袋は100個から、HK$3-8/個（サイズ・用紙による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '環保紙袋用咩材料？',
        en: 'What materials make the bags eco-friendly?',
        ja: '環境配慮の素材は？',
      },
      answer: {
        'zh-hk': 'FSC 認證牛皮紙或再生紙可選（落單時註明），大豆油墨印刷，適合 ESG 採購與減塑需求。',
        en: 'FSC-certified kraft or recycled paper on request, printed with soy inks — suited to ESG procurement and plastic-reduction goals.',
        ja: 'FSC認証クラフト紙または再生紙を選択可（ご注文時に指定）、大豆インク印刷。ESG調達や脱プラ要望に対応します。',
      },
    },
    {
      question: {
        'zh-hk': '交期同運費點計？',
        en: 'Lead time and shipping?',
        ja: '納期と送料は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express over HK$500 in Hong Kong; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF無料、海外DHL世界2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '環保紙袋可以印 LOGO 嗎？',
        en: 'Can eco bags carry a printed logo?',
        ja: 'ロゴ印刷は可能？',
      },
      answer: {
        'zh-hk': '可以，支援單色至全彩 LOGO 印刷；ESG 品牌可加印認證標示（落單時確認）。',
        en: 'Yes — single-colour to full-colour logo printing; ESG brands can add certification marks on request.',
        ja: '可能です。1色〜フルカラーのロゴ印刷に対応。ESGブランドは認証マークの追加もご相談ください。',
      },
    },
  ],
  'gift-bags': [
    {
      question: {
        'zh-hk': '禮品紙袋幾多錢？',
        en: 'How much do premium gift bags cost?',
        ja: 'ギフト紙袋の価格は？',
      },
      answer: {
        'zh-hk': '禮品紙袋 100 個起印，HK$10-20/個（按尺寸與工藝）。標準 3-5 個工作天（檔案確認後）。',
        en: 'Gift bags start at 100 MOQ, HK$10-20 per piece depending on size and finishing. Standard production 3-5 business days after artwork approval.',
        ja: 'ギフト紙袋は100個から、HK$10-20/個（サイズ・加工による）。標準生産3〜5営業日（データ確定後）。',
      },
    },
    {
      question: {
        'zh-hk': '禮品袋可以加咩工藝？',
        en: 'Which premium finishes are available?',
        ja: '高級加工の選択肢は？',
      },
      answer: {
        'zh-hk': '燙金、局部 UV、擊凸、壓紋可選；棉繩或緞帶手挽，適合品牌週年慶與婚慶贈品。',
        en: 'Foil stamping, spot UV, embossing and texture pressing; cotton-rope or ribbon handles for anniversaries and wedding favours.',
        ja: '箔押し・スポットUV・エンボス・型押し対応。綿ロープ/リボン持ち手で周年イベントやウェディングギフトに。',
      },
    },
    {
      question: {
        'zh-hk': '交期同運費點計？',
        en: 'Lead time and shipping?',
        ja: '納期と送料は？',
      },
      answer: {
        'zh-hk': '標準 3-5 個工作天，急單可加急排期。港九新界滿 HK$500 免費順豐，海外 DHL 全球 2-4 天。',
        en: 'Standard 3-5 business days, rush scheduling available. Free SF Express over HK$500 in Hong Kong; DHL worldwide 2-4 days.',
        ja: '標準3〜5営業日、特急相談可。香港国内HK$500以上SF無料、海外DHL世界2〜4日。',
      },
    },
    {
      question: {
        'zh-hk': '可以印 LOGO 同客製尺寸嗎？',
        en: 'Can I print a logo and choose custom sizes?',
        ja: 'ロゴ印刷とカスタムサイズは？',
      },
      answer: {
        'zh-hk': '可以，支援全彩 LOGO 印刷與客製尺寸；小批量 100 個起，適合活動與節慶檔期。',
        en: 'Yes — full-colour logo printing and custom sizes from 100 pieces, suited to events and seasonal campaigns.',
        ja: '可能です。フルカラーロゴ印刷とカスタムサイズに対応。100個からの小ロットでイベント・季節キャンペーンに。',
      },
    },
  ],
"""

with io.open(P, "r", encoding="utf-8", newline="") as fh:
    t = fh.read()

pre_keys = re.findall(r"^  '([a-z0-9-]+)': \[", t, re.M)
new_keys = ['folding-boxes', 'mailer-boxes', 'rigid-boxes', 'cosmetic-boxes', 'white-card-bags', 'kraft-paper-bags', 'eco-paper-bags', 'gift-bags']
dups = [k for k in new_keys if k in pre_keys]
print("pre keys:", len(pre_keys), "dups:", dups)
if dups:
    print("[FAIL] 重复键"); sys.exit(2)

# 收口: 文件末尾 '  ],\n};\n' → 插入 BLOCK 后接 '};\n'
tail = "  ],\n};\n"
if not t.endswith(tail):
    print("[FAIL] 尾部形状不符:", repr(t[-30:])); sys.exit(2)

shutil.copy2(P, os.path.join(BAK, "product-faqs.ts.before"))
t2 = t[:-len(tail)] + "  ],\n" + BLOCK + "};\n"

with io.open(P, "w", encoding="utf-8", newline="") as fh:
    fh.write(t2)

# 后置断言
with io.open(P, "r", encoding="utf-8", newline="") as fh:
    after = fh.read()
post_keys = re.findall(r"^  '([a-z0-9-]+)': \[", after, re.M)
added = [k for k in new_keys if k in post_keys]
print(f"post keys: {len(post_keys)} (期望 {len(pre_keys)+8}), added: {len(added)}")
# 每 SKU 4 问 × 3 语
seg = after[after.index("'folding-boxes'"):]
for k in new_keys:
    i = after.index(f"'{k}': [")
    j = after.find("  ],", i + 20)
    block = after[i:j]
    q = block.count("question: {")
    has3 = all(l in block for l in ["'zh-hk'", "en:", "ja:"])
    print(f"  {k}: Q={q} tri-lang={has3}")
if len(post_keys) != len(pre_keys) + 8:
    print("[FAIL] 键数断言"); sys.exit(3)
print("[PASS] skuMoneyFAQs 包装簇 8 SKU × 4Q × 3语 注入完成")
