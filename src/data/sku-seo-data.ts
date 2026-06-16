/**
 * 从 zprintpro-sku-seo-data.csv 自动生成（运行 `node scripts/csv-to-sku-seo.mjs` 更新）
 * 79 个 SKU 的 SEO 增强数据
 */
import { Locale } from '@/types/locale';

export interface SkuSeoEntry {
  name: Record<Locale, string>;
  seo: Record<Locale, { title: string; description: string; h1: string; keywords: string[]; body: string }>;
  faqs: Array<{ q: string; a: string }>;
  imageAlt: Record<Locale, string>;
}

export const skuSeoData: Record<string, SkuSeoEntry> = {
  "premium-business-cards": {
    "name": {
      "zh-hk": "高級商務咭片",
      "en": "Premium Business Cards",
      "ja": "高級名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "高級商務咭片印刷 | 300g 銅版紙 100張起印 觀塘門市 | 智印雲 ZprintPro",
        "description": "高級商務咭片印刷 100 張起。採用 300g 銅版紙或 250g 啞粉紙, 海德堡四色柯式印刷, 支援圓角模切 R3mm, 表面可選啞膠/光膠/局部 UV/燙金。適合企業高管、金融業、法律及創意產業。1-3 個工作天交貨, 港九新界免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "印刷即日速遞送貨",
        "keywords": ["高級商務咭片", "咭片印刷", "印咭片", "香港印咭片", "300g 銅版咭片", "名片工藝"],
        "body": " custom name cards"
      },
      "en": {
        "title": "Premium Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom premium business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": "business card printing Hong Kong",
        "keywords": ["premium business cards", "custom premium business cards", "premium business cards printing hong kong"],
        "body": " rush business cards"
      },
      "ja": {
        "title": "高級名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された高級名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "高級名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "高級名刺",
          "高級名刺 印刷",
          "高級名刺 小ロット",
          "高級名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "300g premium glossy paper with professional 4-color printing. Optional matte or glossy lamination for a refined touch. ZprintPro offers professional Premium Business Cards services in Hong Kong. High quality",
      "en": "Premium business cards with foil stamping and spot UV on 300g-400g matte or cotton paper — ZprintPro",
      "ja": " fast delivery."
    }
  },
  "thick-business-cards-400g": {
    "name": {
      "zh-hk": "厚身咭片(400g)",
      "en": "Thick Business Cards (400g)",
      "ja": "厚紙名刺(400g)"
    },
    "seo": 
      "zh-hk": {
        "title": "400g 厚身咭片印刷 | 1.3倍厚度 高端商務首選 | 智印雲 ZprintPro 香港本地",
        "description": "400g 厚身咭片印刷 100 張起, 厚度達標準名片 1.3 倍, 配合四色柯式印刷, 表面可選啞膠/光膠/燙金/壓紋。特別適合高端服務業、設計師、律師等專業人士。48 小時快遞, 觀塘門市自取, 免費打樣與色彩確認。**智印雲 香港本地印刷**。",
        "h1": "400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印雲提供專業厚身咭片(400g)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["400g 厚身咭片", "厚身名片", "咭片印刷", "超厚咭片", "高級商務名片", "律師名片"],
        "body": " lawyers. ZprintPro offers professional Thick Business Cards (400g) services in Hong Kong. High quality"
      },
      "en": {
        "title": "400g Thick Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom 400g thick business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full",
        "h1": "400g ultra-thick paper with substantial feel. Perfect for high-end service industry",
        "keywords": ["400g thick business cards", "custom thick business cards 400g", "thick business cards 400g printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "厚紙名刺(400g)印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された厚紙名刺(400g)。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "厚紙名刺(400g) 100枚〜 | 経営者 向け",
        "keywords": [
          "厚紙名刺(400g)",
          "厚紙名刺(400g) 印刷",
          "厚紙名刺(400g) 小ロット",
          "厚紙名刺(400g) 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙名刺(400g)は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        "seo": 
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
       {
        "title": "局部UV名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された局部UV名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "局部UV名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "局部UV名刺",
          "局部UV名刺 印刷",
          "局部UV名刺 小ロット",
          "局部UV名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）局部UV名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }},
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款名片的起訂量是多少？",
      "en": "我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。",
      "ja": "名片印刷需要多長時間？"
    }
  },
  "foil-business-cards": {
    "name": {
      "zh-hk": "燙金/燙銀咭片",
      "en": "Foil Stamped Business Cards",
      "ja": "箔押し名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀咭片印刷 | 玫瑰金箔 工藝名片 100張起 | 智印雲 ZprintPro 香港印刷",
        "description": "燙金燙銀咭片印刷 100 張起, 採用 300g 銅版紙或棉質紙, 配合四色柯式印刷與局部燙金工藝, 可選金/銀/玫瑰金。表面可選啞膠/光膠保護燙印層, 適合高端品牌、奢侈品代理、珠寶及金融服務業。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "燙金咭片 | 金屬光澤 香港本地印刷",
        "keywords": ["燙金咭片", "燙銀名片", "咭片印刷", "金屬光澤咭片", "玫瑰金名片", "奢侈品名片"],
        "body": " gold foil printing Hong Kong"
      },
      "en": {
        "title": "Foil Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom foil business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full desig",
        "h1": " metallic business cards",
        "keywords": ["foil business cards", "custom foil business cards", "foil business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "箔押し名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された箔押し名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "箔押し名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "箔押し名刺",
          "箔押し名刺 印刷",
          "箔押し名刺 小ロット",
          "箔押し名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押し名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        "seo": "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
       {
        "title": "丸角名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された丸角名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "丸角名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "丸角名刺",
          "丸角名刺 印刷",
          "丸角名刺 小ロット",
          "丸角名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）丸角名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
      ],
    "imageAlt": {
      "zh-hk": " shining under light to elevate brand image. Available in gold",
      "en": "Foil stamped business cards in gold, silver, and rose gold with hot stamp foil on premium matte card — ZprintPro",
      "ja": " rose gold. ZprintPro offers professional Foil Stamped Business Cards services in Hong Kong. High quality"
    }
  },
  "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": "Spot UV business cards with matte base and glossy UV coating on logo for dimensional contrast — ZprintPro",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {
        "title": "Premium Business Cards | Foil UV | Free US Ship | ZprintPro",
        "description": "Premium business card printing. 300g-400g matte paper, foil stamping, spot UV. 100-MOQ. Free US shipping over "premium-business-cards": {
    "name": {
      "zh-hk": "高級商務咭片",
      "en": "Premium Business Cards",
      "ja": "高級名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "高級商務咭片印刷 | 300g 銅版紙 100張起印 觀塘門市 | 智印雲 ZprintPro",
        "description": "高級商務咭片印刷 100 張起。採用 300g 銅版紙或 250g 啞粉紙, 海德堡四色柯式印刷, 支援圓角模切 R3mm, 表面可選啞膠/光膠/局部 UV/燙金。適合企業高管、金融業、法律及創意產業。1-3 個工作天交貨, 港九新界免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "印刷即日速遞送貨",
        "keywords": ["高級商務咭片", "咭片印刷", "印咭片", "香港印咭片", "300g 銅版咭片", "名片工藝"],
        "body": " custom name cards"
      },
      "en": {
        "title": "Premium Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom premium business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": "business card printing Hong Kong",
        "keywords": ["premium business cards", "custom premium business cards", "premium business cards printing hong kong"],
        "body": " rush business cards"
      },
      "ja": {
        "title": "高級名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された高級名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "高級名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "高級名刺",
          "高級名刺 印刷",
          "高級名刺 小ロット",
          "高級名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "300g premium glossy paper with professional 4-color printing. Optional matte or glossy lamination for a refined touch. ZprintPro offers professional Premium Business Cards services in Hong Kong. High quality",
      "en": " transparent pricing",
      "ja": " fast delivery."
    }
  },
  "thick-business-cards-400g": {
    "name": {
      "zh-hk": "厚身咭片(400g)",
      "en": "Thick Business Cards (400g)",
      "ja": "厚紙名刺(400g)"
    },
    "seo": 
      "zh-hk": {
        "title": "400g 厚身咭片印刷 | 1.3倍厚度 高端商務首選 | 智印雲 ZprintPro 香港本地",
        "description": "400g 厚身咭片印刷 100 張起, 厚度達標準名片 1.3 倍, 配合四色柯式印刷, 表面可選啞膠/光膠/燙金/壓紋。特別適合高端服務業、設計師、律師等專業人士。48 小時快遞, 觀塘門市自取, 免費打樣與色彩確認。**智印雲 香港本地印刷**。",
        "h1": "400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印雲提供專業厚身咭片(400g)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["400g 厚身咭片", "厚身名片", "咭片印刷", "超厚咭片", "高級商務名片", "律師名片"],
        "body": " lawyers. ZprintPro offers professional Thick Business Cards (400g) services in Hong Kong. High quality"
      },
      "en": {
        "title": "400g Thick Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom 400g thick business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full",
        "h1": "400g ultra-thick paper with substantial feel. Perfect for high-end service industry",
        "keywords": ["400g thick business cards", "custom thick business cards 400g", "thick business cards 400g printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "厚紙名刺(400g)印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された厚紙名刺(400g)。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "厚紙名刺(400g) 100枚〜 | 経営者 向け",
        "keywords": [
          "厚紙名刺(400g)",
          "厚紙名刺(400g) 印刷",
          "厚紙名刺(400g) 小ロット",
          "厚紙名刺(400g) 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙名刺(400g)は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        "seo": 
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
       {
        "title": "局部UV名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された局部UV名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "局部UV名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "局部UV名刺",
          "局部UV名刺 印刷",
          "局部UV名刺 小ロット",
          "局部UV名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）局部UV名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }},
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款名片的起訂量是多少？",
      "en": "我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。",
      "ja": "名片印刷需要多長時間？"
    }
  },
  "foil-business-cards": {
    "name": {
      "zh-hk": "燙金/燙銀咭片",
      "en": "Foil Stamped Business Cards",
      "ja": "箔押し名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀咭片印刷 | 玫瑰金箔 工藝名片 100張起 | 智印雲 ZprintPro 香港印刷",
        "description": "燙金燙銀咭片印刷 100 張起, 採用 300g 銅版紙或棉質紙, 配合四色柯式印刷與局部燙金工藝, 可選金/銀/玫瑰金。表面可選啞膠/光膠保護燙印層, 適合高端品牌、奢侈品代理、珠寶及金融服務業。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "燙金咭片 | 金屬光澤 香港本地印刷",
        "keywords": ["燙金咭片", "燙銀名片", "咭片印刷", "金屬光澤咭片", "玫瑰金名片", "奢侈品名片"],
        "body": " gold foil printing Hong Kong"
      },
      "en": {
        "title": "Foil Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom foil business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full desig",
        "h1": " metallic business cards",
        "keywords": ["foil business cards", "custom foil business cards", "foil business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "箔押し名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された箔押し名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "箔押し名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "箔押し名刺",
          "箔押し名刺 印刷",
          "箔押し名刺 小ロット",
          "箔押し名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押し名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        "seo": "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
       {
        "title": "丸角名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された丸角名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "丸角名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "丸角名刺",
          "丸角名刺 印刷",
          "丸角名刺 小ロット",
          "丸角名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）丸角名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
      ],
    "imageAlt": {
      "zh-hk": " shining under light to elevate brand image. Available in gold",
      "en": "Foil stamped business cards in gold, silver, and rose gold with hot stamp foil on premium matte card — ZprintPro",
      "ja": " rose gold. ZprintPro offers professional Foil Stamped Business Cards services in Hong Kong. High quality"
    }
  },
  "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": "Spot UV business cards with matte base and glossy UV coating on logo for dimensional contrast — ZprintPro",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, DHL Express. FSC, ISO 9001. Get a quote.",
        "h1": "Premium Business Cards | Luxury Foil | ZprintPro",
        "keywords": ["premium business cards","custom premium business cards","premium business cards printing","foil stamped business cards","thick 400gsm business cards","matte finish business cards","premium business cards free shipping","luxury business cards online","business cards USD","bespoke business cards UK"],
        "body": "ZprintPro Premium Business Card Printing for executives, finance, legal, and creative professionals across the US and global markets. 300g-400g matte, cotton, or coated paper with foil stamping, spot UV, embossing, and rounded corner options. 100-card MOQ, Free US shipping over "premium-business-cards": {
    "name": {
      "zh-hk": "高級商務咭片",
      "en": "Premium Business Cards",
      "ja": "高級名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "高級商務咭片印刷 | 300g 銅版紙 100張起印 觀塘門市 | 智印雲 ZprintPro",
        "description": "高級商務咭片印刷 100 張起。採用 300g 銅版紙或 250g 啞粉紙, 海德堡四色柯式印刷, 支援圓角模切 R3mm, 表面可選啞膠/光膠/局部 UV/燙金。適合企業高管、金融業、法律及創意產業。1-3 個工作天交貨, 港九新界免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "印刷即日速遞送貨",
        "keywords": ["高級商務咭片", "咭片印刷", "印咭片", "香港印咭片", "300g 銅版咭片", "名片工藝"],
        "body": " custom name cards"
      },
      "en": {
        "title": "Premium Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom premium business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": "business card printing Hong Kong",
        "keywords": ["premium business cards", "custom premium business cards", "premium business cards printing hong kong"],
        "body": " rush business cards"
      },
      "ja": {
        "title": "高級名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された高級名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "高級名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "高級名刺",
          "高級名刺 印刷",
          "高級名刺 小ロット",
          "高級名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "300g premium glossy paper with professional 4-color printing. Optional matte or glossy lamination for a refined touch. ZprintPro offers professional Premium Business Cards services in Hong Kong. High quality",
      "en": " transparent pricing",
      "ja": " fast delivery."
    }
  },
  "thick-business-cards-400g": {
    "name": {
      "zh-hk": "厚身咭片(400g)",
      "en": "Thick Business Cards (400g)",
      "ja": "厚紙名刺(400g)"
    },
    "seo": 
      "zh-hk": {
        "title": "400g 厚身咭片印刷 | 1.3倍厚度 高端商務首選 | 智印雲 ZprintPro 香港本地",
        "description": "400g 厚身咭片印刷 100 張起, 厚度達標準名片 1.3 倍, 配合四色柯式印刷, 表面可選啞膠/光膠/燙金/壓紋。特別適合高端服務業、設計師、律師等專業人士。48 小時快遞, 觀塘門市自取, 免費打樣與色彩確認。**智印雲 香港本地印刷**。",
        "h1": "400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印雲提供專業厚身咭片(400g)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["400g 厚身咭片", "厚身名片", "咭片印刷", "超厚咭片", "高級商務名片", "律師名片"],
        "body": " lawyers. ZprintPro offers professional Thick Business Cards (400g) services in Hong Kong. High quality"
      },
      "en": {
        "title": "400g Thick Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom 400g thick business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full",
        "h1": "400g ultra-thick paper with substantial feel. Perfect for high-end service industry",
        "keywords": ["400g thick business cards", "custom thick business cards 400g", "thick business cards 400g printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "厚紙名刺(400g)印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された厚紙名刺(400g)。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "厚紙名刺(400g) 100枚〜 | 経営者 向け",
        "keywords": [
          "厚紙名刺(400g)",
          "厚紙名刺(400g) 印刷",
          "厚紙名刺(400g) 小ロット",
          "厚紙名刺(400g) 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙名刺(400g)は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        "seo": 
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
       {
        "title": "局部UV名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された局部UV名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "局部UV名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "局部UV名刺",
          "局部UV名刺 印刷",
          "局部UV名刺 小ロット",
          "局部UV名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）局部UV名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }},
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款名片的起訂量是多少？",
      "en": "我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。",
      "ja": "名片印刷需要多長時間？"
    }
  },
  "foil-business-cards": {
    "name": {
      "zh-hk": "燙金/燙銀咭片",
      "en": "Foil Stamped Business Cards",
      "ja": "箔押し名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀咭片印刷 | 玫瑰金箔 工藝名片 100張起 | 智印雲 ZprintPro 香港印刷",
        "description": "燙金燙銀咭片印刷 100 張起, 採用 300g 銅版紙或棉質紙, 配合四色柯式印刷與局部燙金工藝, 可選金/銀/玫瑰金。表面可選啞膠/光膠保護燙印層, 適合高端品牌、奢侈品代理、珠寶及金融服務業。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "燙金咭片 | 金屬光澤 香港本地印刷",
        "keywords": ["燙金咭片", "燙銀名片", "咭片印刷", "金屬光澤咭片", "玫瑰金名片", "奢侈品名片"],
        "body": " gold foil printing Hong Kong"
      },
      "en": {
        "title": "Foil Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom foil business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full desig",
        "h1": " metallic business cards",
        "keywords": ["foil business cards", "custom foil business cards", "foil business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "箔押し名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された箔押し名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "箔押し名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "箔押し名刺",
          "箔押し名刺 印刷",
          "箔押し名刺 小ロット",
          "箔押し名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押し名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        "seo": "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
       {
        "title": "丸角名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された丸角名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "丸角名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "丸角名刺",
          "丸角名刺 印刷",
          "丸角名刺 小ロット",
          "丸角名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）丸角名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
      ],
    "imageAlt": {
      "zh-hk": " shining under light to elevate brand image. Available in gold",
      "en": "Foil stamped business cards in gold, silver, and rose gold with hot stamp foil on premium matte card — ZprintPro",
      "ja": " rose gold. ZprintPro offers professional Foil Stamped Business Cards services in Hong Kong. High quality"
    }
  },
  "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": "Spot UV business cards with matte base and glossy UV coating on logo for dimensional contrast — ZprintPro",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, FSC paper, ISO 9001 certified."
      
      
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": "Matte laminated business cards with soft-touch finish and fingerprint resistance, 300-400g art card — ZprintPro",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, DHL Express. ±0.2mm precision. Order today.",
        "h1": "Spot UV Business Cards | Matte + Gloss | ZprintPro",
        "keywords": ["spot UV business cards","spot UV cards","matte gloss business cards","glossy logo cards","modern business cards","creative business cards","UV coating cards","cards free shipping","bulk spot UV cards","bespoke UV stationery"],
        "body": "ZprintPro Spot UV Business Card Printing for creative agencies, designers, tech startups, and modern brands across US and global markets. Matte lamination base with glossy UV coating on selected areas (logo, name, pattern) for striking dimensional contrast. 100-card MOQ, Free US shipping over "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": " fast delivery.",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, ±0.2mm registration precision."
      
      },
      "ja": {
        "title": "箔押し名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された箔押し名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "箔押し名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "箔押し名刺",
          "箔押し名刺 印刷",
          "箔押し名刺 小ロット",
          "箔押し名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押し名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        "seo": "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
       {
        "title": "丸角名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された丸角名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "丸角名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "丸角名刺",
          "丸角名刺 印刷",
          "丸角名刺 小ロット",
          "丸角名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）丸角名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
      ],
    "imageAlt": {
      "zh-hk": " shining under light to elevate brand image. Available in gold",
      "en": " silver",
      "ja": " rose gold. ZprintPro offers professional Foil Stamped Business Cards services in Hong Kong. High quality"
    }
  },
  "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": " fast delivery.",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, DHL Express. FSC, ISO 9001 certified. Quote.",
        "h1": "Foil Business Cards | Hot Stamp | ZprintPro",
        "keywords": ["foil business cards","gold foil business cards","silver foil cards","rose gold business cards","hot foil stamping","luxury business cards","foil cards custom","cards free shipping","bulk foil cards","bespoke foil stationery"],
        "body": "ZprintPro Foil Stamped Business Card Printing for executives, finance, law, luxury real estate, and corporate gifting across US and global markets. Hot stamp foil in gold, silver, rose gold, copper, holographic, and black on 350-600g matte, cotton, or uncoated card. 100-card MOQ, Free US shipping over "foil-business-cards": {
    "name": {
      "zh-hk": "燙金/燙銀咭片",
      "en": "Foil Stamped Business Cards",
      "ja": "箔押し名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀咭片印刷 | 玫瑰金箔 工藝名片 100張起 | 智印雲 ZprintPro 香港印刷",
        "description": "燙金燙銀咭片印刷 100 張起, 採用 300g 銅版紙或棉質紙, 配合四色柯式印刷與局部燙金工藝, 可選金/銀/玫瑰金。表面可選啞膠/光膠保護燙印層, 適合高端品牌、奢侈品代理、珠寶及金融服務業。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "燙金咭片 | 金屬光澤 香港本地印刷",
        "keywords": ["燙金咭片", "燙銀名片", "咭片印刷", "金屬光澤咭片", "玫瑰金名片", "奢侈品名片"],
        "body": " gold foil printing Hong Kong"
      },
      "en": {
        "title": "Foil Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom foil business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full desig",
        "h1": " metallic business cards",
        "keywords": ["foil business cards", "custom foil business cards", "foil business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "箔押し名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された箔押し名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "箔押し名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "箔押し名刺",
          "箔押し名刺 印刷",
          "箔押し名刺 小ロット",
          "箔押し名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押し名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "最小注文数は何枚からですか？",
          "a": "智印雲（ZprintPro）の名刺印刷は最小 100 枚からご注文いただけます。50 枚の極小ロットも対応可能（特急料金あり）。500 枚以上で 15% オフ、1,000 枚以上で 25% オフの段階割引。"
        },
        {
          "q": "対応している素材は何ですか？",
          "a": "300g/350g/400g コート紙、250g/300g マット紙、250g/300g コットン紙、250g ケント紙など高品質用紙を 4 種類以上ご用意。ブランドイメージに合わせて選べます。"
        },
        {
          "q": "箔押し（ゴールド/シルバー）に対応していますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・ホログラムなど 6 色以上の箔押しに対応。スポット UV・エンボス・PP ラミネート（光沢/マット）と組み合わせ可能。"
        },
        {
          "q": "名刺の納期はどのくらいですか？",
          "a": "標準納期は入稿データ確定後 3〜5 営業日。100 枚の小ロットは特急対応で 1〜2 営業日に短縮可能。日本向け発送は 2〜4 日。"
        },
        {
          "q": "両面印刷は可能ですか？",
          "a": "はい、両面印刷は標準対応です。表面におもて面（ロゴ・氏名）、裏面に日本語/英語併記の連絡先など、情報量 2 倍。"
        },
        {
          "q": "角丸加工はできますか？",
          "a": "はい、R3mm / R5mm / R10mm の 3 種類の角丸加工に対応。クリエイティブ・デザイナー向けに人気で、追加料金 10% で対応可能。"
        },
        {
          "q": "可変データ印刷（1 枚ごとに違う名前）はできますか？",
          "a": "はい、100 名以上の営業チーム名刺に最適。Excel/CSV リストをご支給いただければ、1 枚ごとに違う氏名・連絡先を印刷。"
        },
        {
          "q": "データ入稿の形式は何が推奨ですか？",
          "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
        "seo": "a": "Illustrator / InDesign / PDF 形式を推奨。CMYK モード・トンボ付き・フォント埋め込みで入稿ください。スタッフが無料でデータチェックを行います。"
       {
        "title": "丸角名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化された丸角名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "丸角名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "丸角名刺",
          "丸角名刺 印刷",
          "丸角名刺 小ロット",
          "丸角名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）丸角名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
      ],
    "imageAlt": {
      "zh-hk": " shining under light to elevate brand image. Available in gold",
      "en": " silver",
      "ja": " rose gold. ZprintPro offers professional Foil Stamped Business Cards services in Hong Kong. High quality"
    }
  },
  "spot-uv-business-cards": {
    "name": {
      "zh-hk": "UV局部光油咭片",
      "en": "Spot UV Business Cards",
      "ja": "局部UV名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "局部UV咭片印刷 | 立體光油 設計師首選 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "局部 UV 咭片印刷 100 張起, 採用 300g 銅版紙或合成紙, 配合四色柯式印刷與局部 UV 光油工藝, UV 層 20-30 微米耐磨耐刮防水。適合創意行業、設計公司、廣告代理及科技初創。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "局部UV咭片 | 立體光澤視覺衝擊",
        "keywords": ["局部UV咭片", "UV光油咭片", "咭片印刷", "立體光澤咭片", "設計師名片", "創意名片"],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom spot uv business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full de",
        "h1": " embossed business cards",
        "keywords": ["spot uv business cards", "custom spot uv business cards", "spot uv business cards printing hong kong"],
        "body": " same day delivery"
      },
      "ja": {
        "title": "マット名刺印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の経営者・金融・法律・クリエイティブ向けに最適化されたマット名刺。100 枚から対応、300g-400g 中心の高品質用紙、4 色 CMYK 印刷。箔押し・スポット UV・両面対応。香港自社工場から日本全国へ最短 1-3 営業日配送。FSC 認証紙・ISO 12647 色彩管理。",
        "h1": "マット名刺 100枚〜 | 経営者 向け",
        "keywords": [
          "マット名刺",
          "マット名刺 印刷",
          "マット名刺 小ロット",
          "マット名刺 即日",
          "名刺 100枚",
          "名刺 サンプル",
          "300g 名刺",
          "箔押し名刺",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マット名刺は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "エンボス名刺",
        "a": "テクスチャ名刺"
      },
      {
        "q": "特殊加工名刺",
        "a": "即日配送"
      },
      {
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印雲提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
        "a": "Spot UV coating creates glossy"
      }
    ],
    "imageAlt": {
      "zh-hk": " transparent pricing",
      "en": " fast delivery.",
      "ja": "部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。 ZprintProは香港で局部UV名刺サービスを提供。高品質、透明な価格、迅速な納品。"
    }
  },
  "matte-business-cards": {
    "name": {
      "zh-hk": "啞膠咭片",
      "en": "Matte Laminated Cards",
      "ja": "マット名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "啞面啞膠咭片印刷 | 防指紋覆膜 顧問律師首選 | 智印雲 ZprintPro 香港印刷",
        "description": "啞面啞膠咭片印刷 100 張起, 採用 300g 啞粉紙或環保紙, 配合四色柯式印刷與啞膠覆膜, 表面絲滑細膩不反光, 有效保護印刷面。適合顧問業、會計師、法律界及醫療專業人士。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["啞面咭片", "啞膠名片", "咭片印刷", "防指紋名片", "低調質感名片", "顧問名片"],
        "body": " fast delivery."
      },
      "en": {00, FSC certified."
      
      },
      "ja": {
        "title": "マット名刺 | 箔押し UV 加工 | ZprintPro",
        "description": "マット名刺のマット名刺は ZprintPro にお任せ。300g-400g マット/コットン/コート 高品質用紙、90×54mm 標準 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " transparent pricing",
        "keywords": ["マット名刺", "マット名刺 印刷", "matte business cards"],
        "body": "專業啞膠咭片服務 | 智印雲"
      }
    },
    "faqs": [
      {
        "q": "",
        "a": ""
      },
      {
        "q": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印雲提供專業的啞膠咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      },
      {
        "q": "",
        "a": "這款名片的起訂量是多少？"
      }
    ],
    "imageAlt": {
      "zh-hk": "名片印刷需要多長時間？",
      "en": "標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。",
      "ja": "可以免費設計名片嗎？"
    }
  },
  "rounded-corner-cards": {
    "name": {
      "zh-hk": "圓角咭片",
      "en": "Rounded Corner Cards",
      "ja": "丸角名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "圓角咭片印刷 | R3mm 圓角模切 創意行業 | 智印雲 ZprintPro 香港本地印刷",
        "description": "圓角咭片印刷 100 張起, 採用 300g 銅版紙或藝術紙, 配合四色柯式印刷與 R3mm 圓角模切, 邊緣光滑無毛刺。表面可選啞膠/光膠, 追加燙金或局部 UV。適合創意產業、設計師、品牌顧問及藝術工作者。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "圓角咭片 | 柔和邊緣 創意行業首選",
        "keywords": ["圓角咭片", "圓角名片", "咭片印刷", "R3mm 圓角", "創意行業名片", "設計師名片"],
        "body": " same day delivery"
      },
      "en": {
        "title": "Rounded Corner Cards | R3 R5 R10 | Free US Ship | ZprintPro",
        "description": "Rounded corner business cards. R3, R5, or R10mm radius. Matte or gloss finish. 100-MOQ. Free US shipping over "rounded-corner-cards": {
    "name": {
      "zh-hk": "圓角咭片",
      "en": "Rounded Corner Cards",
      "ja": "丸角名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "圓角咭片印刷 | R3mm 圓角模切 創意行業 | 智印雲 ZprintPro 香港本地印刷",
        "description": "圓角咭片印刷 100 張起, 採用 300g 銅版紙或藝術紙, 配合四色柯式印刷與 R3mm 圓角模切, 邊緣光滑無毛刺。表面可選啞膠/光膠, 追加燙金或局部 UV。適合創意產業、設計師、品牌顧問及藝術工作者。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "圓角咭片 | 柔和邊緣 創意行業首選",
        "keywords": ["圓角咭片", "圓角名片", "咭片印刷", "R3mm 圓角", "創意行業名片", "設計師名片"],
        "body": " same day delivery"
      },
      "en": {00, DHL Express. Modern + durable. Quote.",
        "h1": "Rounded Corner Cards | R3 R5 R10 | ZprintPro",
        "keywords": ["rounded corner business cards","rounded corner cards","R3mm cards","R5mm business cards","modern business cards","creative cards","soft corner cards","cards free shipping","bulk rounded cards","bespoke rounded stationery"],
        "body": "ZprintPro Rounded Corner Business Card Printing for creative agencies, tech startups, modern lifestyle brands, and contemporary professionals across US and global markets. R3mm, R5mm, or R10mm radius on 300-400g matte, gloss, or uncoated card. 100-card MOQ, Free US shipping over "rounded-corner-cards": {
    "name": {
      "zh-hk": "圓角咭片",
      "en": "Rounded Corner Cards",
      "ja": "丸角名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "圓角咭片印刷 | R3mm 圓角模切 創意行業 | 智印雲 ZprintPro 香港本地印刷",
        "description": "圓角咭片印刷 100 張起, 採用 300g 銅版紙或藝術紙, 配合四色柯式印刷與 R3mm 圓角模切, 邊緣光滑無毛刺。表面可選啞膠/光膠, 追加燙金或局部 UV。適合創意產業、設計師、品牌顧問及藝術工作者。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "圓角咭片 | 柔和邊緣 創意行業首選",
        "keywords": ["圓角咭片", "圓角名片", "咭片印刷", "R3mm 圓角", "創意行業名片", "設計師名片"],
        "body": " same day delivery"
      },
      "en": {00, free design optimization."
      
      },
      "ja": {
        "title": "角丸カード | 箔押し UV 加工 | ZprintPro",
        "description": "角丸カードの角丸カードは ZprintPro にお任せ。300g-400g マット/コットン/コート 高品質用紙、90×54mm 標準 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " die cut cards",
        "keywords": ["角丸カード", "角丸カード 印刷", "rounded corner cards"],
        "body": "安全エッジ名刺"
      }
    },
    "faqs": [
      {
        "q": "クリエイティブ名刺",
        "a": "ダイカット名刺"
      },
      {
        "q": "即日配送",
        "a": "圓角設計，柔和美觀且不易折損。展現與眾不同的品味，適合創意產業。智印雲提供專業圓角咭片服務，香港本地印刷，品質保證，價格透明。"
      },
      {
        "q": "Rounded corners for soft aesthetics and durability. Shows unique taste",
        "a": " perfect for creative industries. ZprintPro offers professional Rounded Corner Cards services in Hong Kong. High quality"
      }
    ],
    "imageAlt": {
      "zh-hk": " fast delivery.",
      "en": "Rounded corner business cards in matte or gloss finish with R3/R5/R10mm radius options — ZprintPro",
      "ja": "時尚圓角名片定制 | 智印雲"
    }
  },
  "double-sided-cards": {
    "name": {
      "zh-hk": "雙面咭片",
      "en": "Double-sided Cards",
      "ja": "両面名刺"
    },
    "seo": {
      "zh-hk": {
        "title": "雙面咭片印刷 | 對位套印 全面展示 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "雙面咭片印刷 100 張起, 採用 300g 銅版紙, 配合四色柯式印刷雙面, 對位套印精準。可選啞膠/光膠覆膜, 適合需要正面個人資料、背面服務介紹或品牌展示的商務人士。免費打樣, 1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "雙面全彩印刷，充分利用空間展示更多信息。背面可印公司理念、產品介紹或聯絡方式。智印雲提供專業雙面咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["雙面咭片", "雙面名片", "咭片印刷", "對位套印", "產品目錄咭片", "全面咭片"],
        "body": " or contact details. ZprintPro offers professional Double-sided Cards services in Hong Kong. High quality"
      },
      "en": {
        "title": "Double-Sided Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom double-sided cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full design",
        "h1": "Double-sided full color printing maximizes space for information. Back can show company values",
        "keywords": ["double-sided cards", "custom double sided cards", "double sided cards printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "両面カード | 箔押し UV 加工 | ZprintPro",
        "description": "両面カードの両面カードは ZprintPro にお任せ。300g-400g マット/コットン/コート 高品質用紙、90×54mm 標準 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " products",
        "keywords": ["両面カード", "両面カード 印刷", "double sided cards"],
        "body": " fast delivery."
      }
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款名片的起訂量是多少？",
      "en": "我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。",
      "ja": "名片印刷需要多長時間？"
    }
  },
  "same-day-business-cards": {
    "name": {
      "zh-hk": "即日咭片印刷",
      "en": "Same-day Business Cards",
      "ja": "即日名刺"
    },
    "seo": 
        "title": "即日急件咭片 | 4小時取件 觀塘門市自取 | 智印雲 ZprintPro 香港印刷公司",
        "description": "即日急件咭片印刷 4 小時取件, 採用 300g 銅版紙, 配合四色數碼印刷, 100 張起印。適合突發商務會議、展會即時派發、急件補印等場景。觀塘門市現場打樣即取, 港九新界 4 小時速遞到府, 急件首選。**智印雲 香港本地印刷**。",
        "h1": "即日名片 | 4小時取件 急件首選",
        "keywords": ["即日名片", "急件咭片", "4小時取件", "即日速遞", "緊急商務咭片", "觀塘自取"],
        "body": " ready in 4 hours. Quality not compromised"
     {
        "title": "透明ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された透明ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "透明ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "透明ステッカー",
          "透明ステッカー 印刷",
          "透明ステッカー 小ロット",
          "透明ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）透明ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }t compromised"
      },
      "en": {
        "title": "Same Day Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom same day business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full d",
        "h1": "緊急需求首選，最快4小時取貨。品質不打折，急件也能展現專業形象。智印雲提供專業即日咭片印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["same day business cards", "custom same day business cards", "same day business cards printing hong kong"],
        "body": " rush orders still look professional. ZprintPro offers professional Same-day Business Cards services in Hong Kong. High quality"
      },
      "ja": {
        "title": "防水ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された防水ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "防水ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "防水ステッカー",
          "防水ステッカー 印刷",
          "防水ステッカー 小ロット",
          "防水ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）防水ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款名片的起訂量是多少？",
      "ja": "我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。"
    }
  },
  "eco-business-cards": {
    "name": {
      "zh-hk": "環保再生紙咭片",
      "en": "Eco-friendly Recycled Cards",
      "ja": "再生紙名刺"
    },
    "seo": 
      "zh-hk": {
        "title": "環保FSC認證咭片 | 再生紙 大豆油墨 ESG名片 | 智印雲 ZprintPro 香港本地",
        "description": "環保 FSC 認證咭片印刷 100 張起, 採用 FSC 認證再生紙或大豆油墨印刷, 紙張 100% 可回收。適合注重 ESG 形象的企業、社會企業、NGO 及環保品牌。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "採用FSC認證環保再生紙，展現企業社會責任。質樸自然的風格，適合環保品牌。智印雲提供專業環保再生紙咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保名片", "FSC 認證咭片", "再生紙名片", "ESG 咭片", "大豆油墨名片", "社企名片"],
        "body": " fast delivery."
      "seo": 
        "title": "環保FSC認證咭片 | 再生紙 大豆油墨 ESG名片 | 智印雲 ZprintPro 香港本地",
        "description": "環保 FSC 認證咭片印刷 100 張起, 採用 FSC 認證再生紙或大豆油墨印刷, 紙張 100% 可回收。適合注重 ESG 形象的企業、社會企業、NGO 及環保品牌。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "採用FSC認證環保再生紙，展現企業社會責任。質樸自然的風格，適合環保品牌。智印雲提供專業環保再生紙咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保名片", "FSC 認證咭片", "再生紙名片", "ESG 咭片", "大豆油墨名片", "社企名片"],
        "body": " fast delivery."
     {
        "title": "小ロットステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された小ロットステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "小ロットステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "小ロットステッカー",
          "小ロットステッカー 印刷",
          "小ロットステッカー 小ロット",
          "小ロットステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）小ロットステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }y."
      },
      "en": {
        "title": "Eco Business Cards | Foil UV Multi-Finish | ZprintPro",
        "description": "Custom eco business cards from ZprintPro Hong Kong. Premium 300g-400g matte/cotton/coated, multiple 90x54mm standard options. 4-color CMYK printing, full design",
        "h1": "FSC-certified recycled paper showing corporate social responsibility. Natural style for eco-friendly brands. ZprintPro offers professional Eco-friendly Recycled Cards services in Hong Kong. High quality",
        "keywords": ["eco business cards", "custom eco business cards", "eco business cards printing hong kong"],
        "body": "FSC認証再生紙、企業の社会的責任を示す。エコブランド向け。 ZprintProは香港で再生紙名刺サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      "ja": {
        "title": "はがせるステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化されたはがせるステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "はがせるステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "はがせるステッカー",
          "はがせるステッカー 印刷",
          "はがせるステッカー 小ロット",
          "はがせるステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）はがせるステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "名片印刷需要多長時間？",
      "en": "標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。",
      "ja": "可以免費設計名片嗎？"
    }
  },
  "waterproof-stickers": {
    "name": {
      "zh-hk": "防水貼紙",
      "en": "Waterproof Stickers",
      "ja": "防水ステッカー"
    },
    "seo": 
        "title": "防水貼紙印刷 | PVC/PP 異形模切 食品級 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防水貼紙印刷 500 張起, 採用 PVC 或 PP 合成紙, 配合耐水油墨與可選光膜/啞膜覆膜, 通過 SGS 食品接觸安全認證。支援異形模切與可變序號/二維碼, 適合食品外包裝、外賣杯貼、工具箱標示及戶外短期使用。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "防水貼紙 | PVC/PP合成紙 異形切割",
        "keywords": ["防水貼紙", "防水 PVC 貼紙", "PP 合成紙標籤", "戶外貼紙", "耐候標籤", "食品標籤"],
        "body": " food labels"
     {
        "title": "箔押しステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された箔押しステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "箔押しステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "箔押しステッカー",
          "箔押しステッカー 印刷",
          "箔押しステッカー 小ロット",
          "箔押しステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押しステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }" food labels"
      },
      "en": {
        "title": "Waterproof Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom waterproof stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, fu",
        "h1": " durable labels",
        "keywords": ["waterproof stickers", "custom waterproof stickers", "waterproof stickers printing hong kong"],
        "body": " Hong Kong sticker printing"
      },
      "ja": {
        "title": "型抜きステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された型抜きステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "型抜きステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "型抜きステッカー",
          "型抜きステッカー 印刷",
          "型抜きステッカー 小ロット",
          "型抜きステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）型抜きステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "PVC waterproof stickers with excellent water",
      "en": "Waterproof stickers on durable PVC facestock with matte or gloss lamination, die-cut shapes — ZprintPro",
      "ja": " and abrasion resistance. Perfect for outdoor use"
    }
  },
  "transparent-stickers": {
    "name": {
      "zh-hk": "透明貼紙",
      "en": "Transparent Stickers",
      "ja": "透明ステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "透明PET貼紙印刷 | 無底紙感 禮盒封口 100張 | 智印雲 ZprintPro 香港本地",
        "description": "透明 PET 貼紙印刷 500 張起, 在玻璃瓶、透明包裝上呈現無底紙感, 僅保留圖案與文字, 特別適合美妝精華、香水、飲品與禮盒封口貼。白墨托底可選, 適用深色瓶身。支援異形模切, 可搭配啞膜或光膜。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "透明貼紙",
        "keywords": ["透明貼紙", "透明 PET 標籤", "無底紙感貼紙", "禮盒封口貼", "化妝品標籤", "飲品瓶貼"],
        "body": " food packaging"
      },
      "en": {
        "title": "Transparent Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom transparent stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。智印雲提供專業透明貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["transparent stickers", "custom transparent stickers", "transparent stickers printing hong kong"],
        "body": " glass decoration. ZprintPro offers professional Transparent Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "セキュリティステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化されたセキュリティステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "セキュリティステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "セキュリティステッカー",
          "セキュリティステッカー 印刷",
          "セキュリティステッカー 小ロット",
          "セキュリティステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）セキュリティステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "removable-stickers": {
    "name": {
      "zh-hk": "可移貼紙(無殘膠)",
      "en": "Removable Stickers",
      "ja": "はがせるステッカー"
    },
    "seo": 
        "title": "可移不殘膠貼紙 | 車窗櫥窗短期展覽 100張 | 智印雲 ZprintPro 香港本地",
        "description": "可移不殘膠貼紙印刷 500 張起, 採用可移除性壓敏膠, 面材 PP 合成紙或 PET 透明膜, 移除時不殘膠、不傷漆面, 適合車窗、商場玻璃櫥窗、短期展覽及租房裝飾。3-5 次重貼, 24 小時初黏測試。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印雲提供專業可移貼紙(無殘膠)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["可移貼紙", "不殘膠貼紙", "車窗貼紙", "展覽貼紙", "短期活動貼", "可移除標籤"],
        "body": " short-term exhibitions. ZprintPro offers professional Removable Stickers services in Hong Kong. High quality"
     {
        "title": "クラフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたクラフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "クラフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "クラフト紙袋",
          "クラフト紙袋 印刷",
          "クラフト紙袋 小ロット",
          "クラフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）クラフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      "seo": 3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "白カード紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された白カード紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "白カード紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "白カード紙袋",
          "白カード紙袋 印刷",
          "白カード紙袋 小ロット",
          "白カード紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）白カード紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }High quality"
      },
      "en": {
        "title": "Removable Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom removable stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, ful",
        "h1": "Special adhesive design leaves no residue when removed. Perfect for car windows",
        "keywords": ["removable stickers", "custom removable stickers", "removable stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "蛍光ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された蛍光ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "蛍光ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "蛍光ステッカー",
          "蛍光ステッカー 印刷",
          "蛍光ステッカー 小ロット",
          "蛍光ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）蛍光ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Removable stickers on vinyl with repositionable adhesive, peels off cleanly within 90 days — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Small batch custom stickers in vinyl, holographic, kraft, and metallic foil, 50+ minimum — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Custom die-cut stickers in vinyl and holographic with precision digital cutting, any shape — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Foil stickers in gold, silver, rose gold, copper, and holographic, hot stamp foil — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Security stickers with void-release pattern, destructible vinyl, and serialized QR codes for track-and-trace — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {
        "title": "Waterproof Stickers | Durable PVC | Free US Ship | ZprintPro",
        "description": "Waterproof stickers for outdoor labels. PVC, gloss lamination, die-cut. 100-MOQ, 3-5 year. Free US shipping over "waterproof-stickers": {
    "name": {
      "zh-hk": "防水貼紙",
      "en": "Waterproof Stickers",
      "ja": "防水ステッカー"
    },
    "seo": 
        "title": "防水貼紙印刷 | PVC/PP 異形模切 食品級 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防水貼紙印刷 500 張起, 採用 PVC 或 PP 合成紙, 配合耐水油墨與可選光膜/啞膜覆膜, 通過 SGS 食品接觸安全認證。支援異形模切與可變序號/二維碼, 適合食品外包裝、外賣杯貼、工具箱標示及戶外短期使用。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "防水貼紙 | PVC/PP合成紙 異形切割",
        "keywords": ["防水貼紙", "防水 PVC 貼紙", "PP 合成紙標籤", "戶外貼紙", "耐候標籤", "食品標籤"],
        "body": " food labels"
     {
        "title": "箔押しステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された箔押しステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "箔押しステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "箔押しステッカー",
          "箔押しステッカー 印刷",
          "箔押しステッカー 小ロット",
          "箔押しステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押しステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }" food labels"
      },
      "en": {
        "title": "Waterproof Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom waterproof stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, fu",
        "h1": " durable labels",
        "keywords": ["waterproof stickers", "custom waterproof stickers", "waterproof stickers printing hong kong"],
        "body": " Hong Kong sticker printing"
      },
      "ja": {
        "title": "型抜きステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された型抜きステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "型抜きステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "型抜きステッカー",
          "型抜きステッカー 印刷",
          "型抜きステッカー 小ロット",
          "型抜きステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）型抜きステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "PVC waterproof stickers with excellent water",
      "en": " UV",
      "ja": " and abrasion resistance. Perfect for outdoor use"
    }
  },
  "transparent-stickers": {
    "name": {
      "zh-hk": "透明貼紙",
      "en": "Transparent Stickers",
      "ja": "透明ステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "透明PET貼紙印刷 | 無底紙感 禮盒封口 100張 | 智印雲 ZprintPro 香港本地",
        "description": "透明 PET 貼紙印刷 500 張起, 在玻璃瓶、透明包裝上呈現無底紙感, 僅保留圖案與文字, 特別適合美妝精華、香水、飲品與禮盒封口貼。白墨托底可選, 適用深色瓶身。支援異形模切, 可搭配啞膜或光膜。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "透明貼紙",
        "keywords": ["透明貼紙", "透明 PET 標籤", "無底紙感貼紙", "禮盒封口貼", "化妝品標籤", "飲品瓶貼"],
        "body": " food packaging"
      },
      "en": {
        "title": "Transparent Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom transparent stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。智印雲提供專業透明貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["transparent stickers", "custom transparent stickers", "transparent stickers printing hong kong"],
        "body": " glass decoration. ZprintPro offers professional Transparent Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "セキュリティステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化されたセキュリティステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "セキュリティステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "セキュリティステッカー",
          "セキュリティステッカー 印刷",
          "セキュリティステッカー 小ロット",
          "セキュリティステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）セキュリティステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "removable-stickers": {
    "name": {
      "zh-hk": "可移貼紙(無殘膠)",
      "en": "Removable Stickers",
      "ja": "はがせるステッカー"
    },
    "seo": 
        "title": "可移不殘膠貼紙 | 車窗櫥窗短期展覽 100張 | 智印雲 ZprintPro 香港本地",
        "description": "可移不殘膠貼紙印刷 500 張起, 採用可移除性壓敏膠, 面材 PP 合成紙或 PET 透明膜, 移除時不殘膠、不傷漆面, 適合車窗、商場玻璃櫥窗、短期展覽及租房裝飾。3-5 次重貼, 24 小時初黏測試。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印雲提供專業可移貼紙(無殘膠)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["可移貼紙", "不殘膠貼紙", "車窗貼紙", "展覽貼紙", "短期活動貼", "可移除標籤"],
        "body": " short-term exhibitions. ZprintPro offers professional Removable Stickers services in Hong Kong. High quality"
     {
        "title": "クラフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたクラフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "クラフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "クラフト紙袋",
          "クラフト紙袋 印刷",
          "クラフト紙袋 小ロット",
          "クラフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）クラフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      "seo": 3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "白カード紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された白カード紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "白カード紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "白カード紙袋",
          "白カード紙袋 印刷",
          "白カード紙袋 小ロット",
          "白カード紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）白カード紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }High quality"
      },
      "en": {
        "title": "Removable Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom removable stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, ful",
        "h1": "Special adhesive design leaves no residue when removed. Perfect for car windows",
        "keywords": ["removable stickers", "custom removable stickers", "removable stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "蛍光ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された蛍光ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "蛍光ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "蛍光ステッカー",
          "蛍光ステッカー 印刷",
          "蛍光ステッカー 小ロット",
          "蛍光ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）蛍光ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Removable stickers on vinyl with repositionable adhesive, peels off cleanly within 90 days — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Small batch custom stickers in vinyl, holographic, kraft, and metallic foil, 50+ minimum — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Custom die-cut stickers in vinyl and holographic with precision digital cutting, any shape — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Foil stickers in gold, silver, rose gold, copper, and holographic, hot stamp foil — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Security stickers with void-release pattern, destructible vinyl, and serialized QR codes for track-and-trace — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL Express. SGS tested. Get a quote.",
        "h1": "Waterproof Stickers | Outdoor PVC | ZprintPro",
        "keywords": ["waterproof stickers","custom waterproof stickers","waterproof sticker printing","vinyl stickers waterproof","die cut stickers outdoor","PVC stickers durable","waterproof stickers free shipping","bulk waterproof stickers","stickers USD","bespoke stickers UK"],
        "body": "ZprintPro Custom Waterproof Sticker Printing for outdoor labels, product packaging, car decals, and equipment tags across the US and global markets. PVC or PP synthetic facestock with matte or gloss lamination, die-cut shapes, and variable QR codes. 100-sticker MOQ, Free US shipping over "waterproof-stickers": {
    "name": {
      "zh-hk": "防水貼紙",
      "en": "Waterproof Stickers",
      "ja": "防水ステッカー"
    },
    "seo": 
        "title": "防水貼紙印刷 | PVC/PP 異形模切 食品級 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防水貼紙印刷 500 張起, 採用 PVC 或 PP 合成紙, 配合耐水油墨與可選光膜/啞膜覆膜, 通過 SGS 食品接觸安全認證。支援異形模切與可變序號/二維碼, 適合食品外包裝、外賣杯貼、工具箱標示及戶外短期使用。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "防水貼紙 | PVC/PP合成紙 異形切割",
        "keywords": ["防水貼紙", "防水 PVC 貼紙", "PP 合成紙標籤", "戶外貼紙", "耐候標籤", "食品標籤"],
        "body": " food labels"
     {
        "title": "箔押しステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された箔押しステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "箔押しステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "箔押しステッカー",
          "箔押しステッカー 印刷",
          "箔押しステッカー 小ロット",
          "箔押しステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押しステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }" food labels"
      },
      "en": {
        "title": "Waterproof Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom waterproof stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, fu",
        "h1": " durable labels",
        "keywords": ["waterproof stickers", "custom waterproof stickers", "waterproof stickers printing hong kong"],
        "body": " Hong Kong sticker printing"
      },
      "ja": {
        "title": "型抜きステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された型抜きステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "型抜きステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "型抜きステッカー",
          "型抜きステッカー 印刷",
          "型抜きステッカー 小ロット",
          "型抜きステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）型抜きステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "PVC waterproof stickers with excellent water",
      "en": " UV",
      "ja": " and abrasion resistance. Perfect for outdoor use"
    }
  },
  "transparent-stickers": {
    "name": {
      "zh-hk": "透明貼紙",
      "en": "Transparent Stickers",
      "ja": "透明ステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "透明PET貼紙印刷 | 無底紙感 禮盒封口 100張 | 智印雲 ZprintPro 香港本地",
        "description": "透明 PET 貼紙印刷 500 張起, 在玻璃瓶、透明包裝上呈現無底紙感, 僅保留圖案與文字, 特別適合美妝精華、香水、飲品與禮盒封口貼。白墨托底可選, 適用深色瓶身。支援異形模切, 可搭配啞膜或光膜。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "透明貼紙",
        "keywords": ["透明貼紙", "透明 PET 標籤", "無底紙感貼紙", "禮盒封口貼", "化妝品標籤", "飲品瓶貼"],
        "body": " food packaging"
      },
      "en": {
        "title": "Transparent Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom transparent stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。智印雲提供專業透明貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["transparent stickers", "custom transparent stickers", "transparent stickers printing hong kong"],
        "body": " glass decoration. ZprintPro offers professional Transparent Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "セキュリティステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化されたセキュリティステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "セキュリティステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "セキュリティステッカー",
          "セキュリティステッカー 印刷",
          "セキュリティステッカー 小ロット",
          "セキュリティステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）セキュリティステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "removable-stickers": {
    "name": {
      "zh-hk": "可移貼紙(無殘膠)",
      "en": "Removable Stickers",
      "ja": "はがせるステッカー"
    },
    "seo": 
        "title": "可移不殘膠貼紙 | 車窗櫥窗短期展覽 100張 | 智印雲 ZprintPro 香港本地",
        "description": "可移不殘膠貼紙印刷 500 張起, 採用可移除性壓敏膠, 面材 PP 合成紙或 PET 透明膜, 移除時不殘膠、不傷漆面, 適合車窗、商場玻璃櫥窗、短期展覽及租房裝飾。3-5 次重貼, 24 小時初黏測試。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印雲提供專業可移貼紙(無殘膠)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["可移貼紙", "不殘膠貼紙", "車窗貼紙", "展覽貼紙", "短期活動貼", "可移除標籤"],
        "body": " short-term exhibitions. ZprintPro offers professional Removable Stickers services in Hong Kong. High quality"
     {
        "title": "クラフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたクラフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "クラフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "クラフト紙袋",
          "クラフト紙袋 印刷",
          "クラフト紙袋 小ロット",
          "クラフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）クラフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      "seo": 3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "白カード紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された白カード紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "白カード紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "白カード紙袋",
          "白カード紙袋 印刷",
          "白カード紙袋 小ロット",
          "白カード紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）白カード紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }High quality"
      },
      "en": {
        "title": "Removable Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom removable stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, ful",
        "h1": "Special adhesive design leaves no residue when removed. Perfect for car windows",
        "keywords": ["removable stickers", "custom removable stickers", "removable stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "蛍光ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された蛍光ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "蛍光ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "蛍光ステッカー",
          "蛍光ステッカー 印刷",
          "蛍光ステッカー 小ロット",
          "蛍光ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）蛍光ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Removable stickers on vinyl with repositionable adhesive, peels off cleanly within 90 days — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Small batch custom stickers in vinyl, holographic, kraft, and metallic foil, 50+ minimum — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Custom die-cut stickers in vinyl and holographic with precision digital cutting, any shape — ZprintPro",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Foil stickers in gold, silver, rose gold, copper, and holographic, hot stamp foil — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Security stickers with void-release pattern, destructible vinyl, and serialized QR codes for track-and-trace — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, SGS migration tested."
      
      
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "Fluorescent stickers in neon pink, orange, yellow, green, blue, and red with UV-reactive glow — ZprintPro",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL. FDA, ISO compliant.",
        "h1": "Security Stickers | Anti-Counterfeit | ZprintPro",
        "keywords": ["security stickers","tamper evident stickers","void release labels","anti counterfeit stickers","security seals","QR code security","pharma security labels","electronics warranty seals","stickers free shipping","bulk security stickers"],
        "body": "ZprintPro Security Sticker Printing for pharmaceutical, electronics, luxury goods, food and beverage, and government applications across US and global markets. Void-release, destructible vinyl, holographic seals, and serialized QR codes for track-and-trace. 100-sticker MOQ, Free US shipping over "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, FDA 21 CFR Part 11 compliant."
      
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL Express. Quote.",
        "h1": "Foil Stickers 100+ | Hot Stamp | ZprintPro",
        "keywords": ["foil stickers","gold foil stickers","silver foil stickers","rose gold foil","holographic foil stickers","metallic stickers","luxury stickers","foil labels custom","stickers free shipping","bulk foil stickers"],
        "body": "ZprintPro Foil Sticker Printing for cosmetics, weddings, luxury packaging, and limited edition branding across US and global markets. Hot stamp foil in gold, silver, rose gold, copper, holographic, and brushed metal on vinyl or paper. 100-sticker MOQ, Free US shipping over "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, dishwasher-safe lamination available."
      
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL Express. Outdoor 3-5yr. Quote.",
        "h1": "Die-Cut Stickers 100+ | Custom Shape | ZprintPro",
        "keywords": ["die cut stickers","custom shape stickers","die cut vinyl stickers","kiss cut stickers","logo stickers custom","holographic die cut","foil die cut stickers","stickers free shipping","bulk die cut stickers","bespoke sticker shapes"],
        "body": "ZprintPro Die-Cut Sticker Printing for brand logos, packaging seals, laptop decals, and promotional merchandise across US and global markets. Digital cutting with ±0.2mm precision for vinyl, holographic, clear, and metallic foil. 100-sticker MOQ, Free US shipping over "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, outdoor durability 3-5 years."
      
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL Express. No setup fees.",
        "h1": "Small Batch Stickers 50+ | No Setup | ZprintPro",
        "keywords": ["small batch stickers","custom stickers small quantity","50 stickers minimum","startup stickers","indie brand stickers","creator stickers","holographic stickers","foil stickers small","stickers free shipping","bulk custom stickers"],
        "body": "ZprintPro Small Batch Sticker Printing for startups, indie brands, creators, weddings, and event favors across US and global markets. 50-sticker minimum for vinyl/clear, 100 for paper/kraft/foil, with no setup fees. Available in vinyl, clear, holographic, kraft, and metallic foil. 3-5 day production, Free US shipping over "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00."
      
      },
      "ja": {
        "title": "蛍光ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された蛍光ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "蛍光ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "蛍光ステッカー",
          "蛍光ステッカー 印刷",
          "蛍光ステッカー 小ロット",
          "蛍光ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）蛍光ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, DHL Express. Quote.",
        "h1": "Removable Stickers 100+ | No Residue | ZprintPro",
        "keywords": ["removable stickers","no residue stickers","repositionable stickers","window decals removable","wall stickers removable","temporary stickers","rental equipment tags","removable adhesive labels","stickers free shipping","bulk removable stickers"],
        "body": "ZprintPro Removable Sticker Printing for retail windows, events, rental equipment, and short-term campaigns across US and global markets. Vinyl or PP facestock with low-tack repositionable adhesive that removes cleanly within 90 days. 100-sticker MOQ, Free US shipping over "removable-stickers": {
    "name": {
      "zh-hk": "可移貼紙(無殘膠)",
      "en": "Removable Stickers",
      "ja": "はがせるステッカー"
    },
    "seo": 
        "title": "可移不殘膠貼紙 | 車窗櫥窗短期展覽 100張 | 智印雲 ZprintPro 香港本地",
        "description": "可移不殘膠貼紙印刷 500 張起, 採用可移除性壓敏膠, 面材 PP 合成紙或 PET 透明膜, 移除時不殘膠、不傷漆面, 適合車窗、商場玻璃櫥窗、短期展覽及租房裝飾。3-5 次重貼, 24 小時初黏測試。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印雲提供專業可移貼紙(無殘膠)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["可移貼紙", "不殘膠貼紙", "車窗貼紙", "展覽貼紙", "短期活動貼", "可移除標籤"],
        "body": " short-term exhibitions. ZprintPro offers professional Removable Stickers services in Hong Kong. High quality"
     {
        "title": "クラフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたクラフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "クラフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "クラフト紙袋",
          "クラフト紙袋 印刷",
          "クラフト紙袋 小ロット",
          "クラフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）クラフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      "seo": 3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "白カード紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された白カード紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "白カード紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "白カード紙袋",
          "白カード紙袋 印刷",
          "白カード紙袋 小ロット",
          "白カード紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）白カード紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }High quality"
      },
      "en": {
        "title": "Removable Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom removable stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, ful",
        "h1": "Special adhesive design leaves no residue when removed. Perfect for car windows",
        "keywords": ["removable stickers", "custom removable stickers", "removable stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "蛍光ステッカー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化された蛍光ステッカー。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "蛍光ステッカー 100枚〜 | 屋外 防水",
        "keywords": [
          "蛍光ステッカー",
          "蛍光ステッカー 印刷",
          "蛍光ステッカー 小ロット",
          "蛍光ステッカー 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）蛍光ステッカーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "small-batch-stickers": {
    "name": {
      "zh-hk": "小批量貼紙",
      "en": "Small Batch Stickers",
      "ja": "小ロットステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "小批量貼紙印刷 | A4起印 數碼快印 初創 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小批量貼紙印刷 A4 起印, 採用數碼印刷技術, 無起印限制, 適合初創品牌試產、活動急件及小批量客製訂單。可選 PVC、PP、銅版紙等材質, 支援異形模切。免費打樣, 當日可取, 港九新界速遞直送。**智印雲 香港本地印刷**。",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印雲提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小批量貼紙", "A4 貼紙", "數碼印刷貼紙", "初創品牌貼紙", "試產貼紙", "100張起印"],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom small batch stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, f",
        "h1": "Minimum A4 size order",
        "keywords": ["small batch stickers", "custom small batch stickers", "small batch stickers printing hong kong"],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたギフト紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "ギフト紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "ギフト紙袋",
          "ギフト紙袋 印刷",
          "ギフト紙袋 小ロット",
          "ギフト紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフト紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "die-cut-stickers": {
    "name": {
      "zh-hk": "異形模切貼紙",
      "en": "Die-cut Stickers",
      "ja": "型抜きステッカー"
    },
    "seo": 
        "title": "異形模切貼紙印刷 | 任意形狀 刀模剪影 100張 | 智印雲 ZprintPro 香港本地",
        "description": "異形模切貼紙印刷 500 張起, 支援任意形狀裁切如圓形、星形、品牌剪影輪廓, 採用 PVC 或銅版紙材質, 適合品牌活動、產品封口、限量版紀念品及個性化禮品。可選啞膜/光膜覆膜。免費刀模設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印雲提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["異形模切貼紙", "刀模貼紙", "吻切貼紙", "任意形狀貼紙", "品牌剪影", "活動貼紙"],
        "body": " cartoon characters"
     {
        "title": "手提げ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された手提げ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。",
        "h1": "手提げ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "手提げ紙袋",
          "手提げ紙袋 印刷",
          "手提げ紙袋 小ロット",
          "手提げ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）手提げ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }on characters"
      },
      "en": {
        "title": "Die Cut Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom die cut stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full ",
        "h1": "Any shape die-cutting",
        "keywords": ["die cut stickers", "custom die cut stickers", "die cut stickers printing hong kong"],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "エコ紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化されたエコ紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "エコ紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "エコ紙袋",
          "エコ紙袋 印刷",
          "エコ紙袋 小ロット",
          "エコ紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコ紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "foil-stickers": {
    "name": {
      "zh-hk": "燙金貼紙",
      "en": "Foil Stickers",
      "ja": "箔押しステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金燙銀貼紙印刷 | 玫瑰金箔 禮盒封口 100張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "燙金燙銀貼紙印刷 500 張起, 採用銅版紙或 PVC 材質, 配合燙金/燙銀/玫瑰金箔工藝, 呈現金屬光澤效果。可選啞膜/光膜保護燙印層, 適合禮盒封口貼、高端品牌標籤及限量版紀念品。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印雲提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["燙金貼紙", "燙銀貼紙", "玫瑰金箔貼紙", "禮盒封口貼", "高端品牌貼", "金屬標籤"],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom foil stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full des",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": ["foil stickers", "custom foil stickers", "foil stickers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・アパレル・飲食店向けに最適化された大判紙袋。100 個から対応、FSC 認証クラフト紙・白カード紙・黒厚紙対応。PP 縄・サテンリボン・箔押し両面対応。香港自社工場から日本全国へ最短 3-5 営業日配送。30 秒無料見積もり。 30秒無料見積もり受付中。",
        "h1": "大判紙袋 100個〜 | 小売 ブランド",
        "keywords": [
          "大判紙袋",
          "大判紙袋 印刷",
          "大判紙袋 小ロット",
          "大判紙袋 即日",
          "紙袋 オリジナル",
          "紙袋 ロゴ印刷",
          "クラフト 紙袋",
          "テイクアウト 紙袋",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判紙袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紙袋の最小注文数は何個からですか？",
          "a": "最小 100 個から対応可能。大量発注（1,000 個以上）は段階割引で 25-35% オフ。短納期小ロットも特急料金で対応。"
        },
        {
          "q": "紙材は何が選べますか？",
          "a": "クラフト紙（100g-150g）、白カード紙（200g-300g）、黒厚紙（250g-350g）、特殊紙など 4 種類以上。FSC 認証取得済みで ESG 配慮。"
        },
        {
          "q": "取っ手の種類は何がありますか？",
          "a": "PP 縄（標準）・紙縄（エコ）・サテンリボン（ギフト）・平紐/丸紐・幅広サテンリボンなど 8 種類以上。ブランドイメージに応じて選択可能。"
        },
        {
          "q": "印刷は両面できますか？",
          "a": "はい、両面印刷は標準対応。表面と裏面で異なる情報掲載可能（店舗ロゴ＋連絡先・キャンペーン情報など）。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・ローズゴールド・レッド・ブルーなど 6 色以上の箔押しに対応。婚礼・ギフト・VIP 向け特別感演出。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証クラフト紙・再生紙・大豆インク印刷対応。再生紙 100% 使用可能で、VOC 排出を 80% 削減。ESG 報告書対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 100×80×50mm から最大 600×500×300mm まで対応。底マチ・形状（角底・丸底・平底）も自由指定。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。日本向け配送 2〜4 日。100 個からの小ロット特急（有償）で最短当日仕上げも対応可能。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "security-stickers": {
    "name": {
      "zh-hk": "防偽貼紙",
      "en": "Security Stickers",
      "ja": "セキュリティステッカー"
    },
    "seo": 
      "zh-hk": {
        "title": "防偽VOID貼紙印刷 | 易碎雷射全息 防調包 | 智印雲 ZprintPro 香港本地印刷",
        "description": "防偽 VOID 貼紙印刷 500 張起, 採用易碎紙、VOID 開封留字或高精密雷射全息技術, 一經張貼撕起即留破壞痕跡, 有效杜絕換件假冒。支援可變 QR Code 與流水號, 適合 3C 電子維修、高價名牌二手店防調包。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印雲提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["防偽貼紙", "易碎貼紙", "VOID 開封留字", "雷射全息標籤", "防調包貼紙", "保固貼紙"],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
      "seo": 
        "title": "Security Stickers | Waterproof PVC Die-Cut | ZprintPro",
        "description": "Custom security stickers from ZprintPro Hong Kong. Premium Waterproof PVC/coated/transparent, multiple Round/Square/Die-cut options. 4-color CMYK printing, full",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": ["security stickers", "custom security stickers", "security stickers printing hong kong"],
        "body": " transparent pricing"
     {
        "title": "A5チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA5チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A5チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A5チラシ",
          "A5チラシ 印刷",
          "A5チラシ 小ロット",
          "A5チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A5チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "A4チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたA4チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":  "h1": "A4チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "A4チラシ",
          "A4チラシ 印刷",
          "A4チラシ 小ロット",
          "A4チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A4チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "両面チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された両面チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "両面チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "両面チラシ",
          "両面チラシ 印刷",
          "両面チラシ 小ロット",
          "両面チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）両面チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        "seo": "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
       {
        "title": "折りたたみパンフレット印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された折りたたみパンフレット。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。",
        "h1": "折りたたみパンフレット 100枚〜 | 即日 仕上げ",
        "keywords": [
          "折りたたみパンフレット",
          "折りたたみパンフレット 印刷",
          "折りたたみパンフレット 小ロット",
          "折りたたみパンフレット 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみパンフレットは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "這款貼紙的最小訂購量是多少？",
      "en": "一般為100張起訂，部分特殊工藝需500張起。",
      "ja": "貼紙可以模切成任意形狀嗎？"
    }
  },
  "fluorescent-stickers": {
    "name": {
      "zh-hk": "螢光貼紙",
      "en": "Fluorescent Stickers",
      "ja": "蛍光ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "螢光夜光貼紙印刷 | 高飽和UV油墨 安全標識 | 智印雲 ZprintPro 香港本地",
        "description": "螢光夜光貼紙印刷 500 張起, 採用高飽和度 UV 油墨印刷, 色彩鮮豔持久, 適合安全標識、警告標籤、夜間活動宣傳、派對裝飾及兒童產品標籤。支援 PVC、紙質等多種材質, 異形模切可選。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印雲提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["螢光貼紙", "夜光標籤", "高飽和度貼紙", "安全標識貼", "警告標籤", "UV油墨貼紙"],
        "body": " safety signs"
      },
      "en": {00, 11 colors in stock."
      
      },
      "ja": {
        "title": "蛍光ステッカー | 防水 PVC ダイカット | ZprintPro",
        "description": "蛍光ステッカーの蛍光ステッカーは ZprintPro にお任せ。防水 PVC/コート/透明 高品質用紙、丸/角/型抜き 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " highly visible under light. Perfect for promotional labels",
        "keywords": ["蛍光ステッカー", "蛍光ステッカー 印刷", "fluorescent stickers"],
        "body": " transparent pricing"
      }
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "這款貼紙的最小訂購量是多少？",
      "ja": "一般為100張起訂，部分特殊工藝需500張起。"
    }
  },
  "kraft-paper-bags": {
    "name": {
      "zh-hk": "牛皮紙袋",
      "en": "Kraft Paper Bags",
      "ja": "クラフト紙袋"
    },
    "seo": 
        "title": "牛皮紙袋印刷 | FSC環保 加固手挽 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "牛皮紙袋印刷 100 個起, 採用 250g-300g 進口牛皮紙或白卡紙, 底部加固, 棉繩/扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾店、外賣打包及品牌活動資料袋。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "牛皮紙袋",
        "keywords": ["牛皮紙袋", "牛皮紙袋印刷", "紙袋訂製", "環保手挽袋", "超市購物袋", "FSC 紙袋"],
        "body": " natural and rustic"
     {
        "title": "即日チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された即日チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "即日チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "即日チラシ",
          "即日チラシ 印刷",
          "即日チラシ 小ロット",
          "即日チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）即日チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }al and rustic"
      },
      "en": {
        "title": "Kraft Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom kraft paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業牛皮紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["kraft paper bags", "custom kraft paper bags", "kraft paper bags printing hong kong"],
        "body": " loved by consumers. Perfect for clothing stores"
      },
      "ja": {
        "title": "厚紙チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された厚紙チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "厚紙チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "厚紙チラシ",
          "厚紙チラシ 印刷",
          "厚紙チラシ 小ロット",
          "厚紙チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "環保牛皮紙材質，質樸自然，深受消費者喜愛，支持印刷即日速遞送貨。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業的牛皮紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
      "en": "Custom kraft paper bags with cotton rope handles, 120-300g FSC certified — ZprintPro",
      "ja": ""
    }
  },
  "white-card-bags": {
    "name": {
      "zh-hk": "白卡紙袋",
      "en": "White Card Bags",
      "ja": "白カード紙袋"
    "seo":   {
        "title": "A2ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたA2ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "A2ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "A2ポスター",
          "A2ポスター 印刷",
          "A2ポスター 小ロット",
          "A2ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A2ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
    "seo": 
      "zh-hk": {
        "title": "白卡紙袋印刷 | 服飾品牌紙袋 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "白卡紙袋印刷 100 個起, 採用 250g-300g 白卡紙, 表面可四色柯式印刷, 適合服飾品牌、化妝品、珠寶首飾及精品店。棉繩或扁紙手挽可選, 支援燙金、UV、壓凹等工藝。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        
        "h1": "白卡紙袋",
        "keywords": ["白卡紙袋", "白卡紙袋印刷", "紙袋訂製", "服飾紙袋", "品牌紙袋", "禮品紙袋"],
        "body": " smooth surface"
      },
      "en": {
        "title": "Kraft Paper Bags | Eco-Friendly | Free US Ship | ZprintPro",
        "description": "Custom kraft paper bags for retail and gift shops. 120-300g kraft with cotton rope handles. 100-MOQ. Free US shipping over "kraft-paper-bags": {
    "name": {
      "zh-hk": "牛皮紙袋",
      "en": "Kraft Paper Bags",
      "ja": "クラフト紙袋"
    },
    "seo": 
        "title": "牛皮紙袋印刷 | FSC環保 加固手挽 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "牛皮紙袋印刷 100 個起, 採用 250g-300g 進口牛皮紙或白卡紙, 底部加固, 棉繩/扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾店、外賣打包及品牌活動資料袋。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "牛皮紙袋",
        "keywords": ["牛皮紙袋", "牛皮紙袋印刷", "紙袋訂製", "環保手挽袋", "超市購物袋", "FSC 紙袋"],
        "body": " natural and rustic"
     {
        "title": "即日チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された即日チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "即日チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "即日チラシ",
          "即日チラシ 印刷",
          "即日チラシ 小ロット",
          "即日チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）即日チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }al and rustic"
      },
      "en": {
        "title": "Kraft Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom kraft paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業牛皮紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["kraft paper bags", "custom kraft paper bags", "kraft paper bags printing hong kong"],
        "body": " loved by consumers. Perfect for clothing stores"
      },
      "ja": {
        "title": "厚紙チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された厚紙チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "厚紙チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "厚紙チラシ",
          "厚紙チラシ 印刷",
          "厚紙チラシ 小ロット",
          "厚紙チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "環保牛皮紙材質，質樸自然，深受消費者喜愛，支持印刷即日速遞送貨。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業的牛皮紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
      "en": "",
      "ja": ""
    }
  },
  "white-card-bags": {
    "name": {
      "zh-hk": "白卡紙袋",
      "en": "White Card Bags",
      "ja": "白カード紙袋"
    "seo":   {
        "title": "A2ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたA2ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "A2ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "A2ポスター",
          "A2ポスター 印刷",
          "A2ポスター 小ロット",
          "A2ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A2ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
    "seo": 
      "zh-hk": {
        "title": "白卡紙袋印刷 | 服飾品牌紙袋 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "白卡紙袋印刷 100 個起, 採用 250g-300g 白卡紙, 表面可四色柯式印刷, 適合服飾品牌、化妝品、珠寶首飾及精品店。棉繩或扁紙手挽可選, 支援燙金、UV、壓凹等工藝。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        
        "h1": "白卡紙袋",
        "keywords": ["白卡紙袋", "白卡紙袋印刷", "紙袋訂製", "服飾紙袋", "品牌紙袋", "禮品紙袋"],
        "body": " smooth surface"
      },
      "en": {00, DHL Express. FSC. Get a quote.",
        "h1": "Kraft Paper Bags 100+ | Eco-Friendly | ZprintPro",
        "keywords": ["kraft paper bags","custom kraft paper bags","kraft paper bags printing","eco friendly kraft bags","kraft bags with handles","brown paper bags wholesale","kraft paper bags free shipping","bulk kraft bags","kraft bags USD","bespoke paper bags"],
        "body": "ZprintPro Custom Kraft Paper Bag Printing for retail, gift, coffee, and fashion brands across US and global markets. 120-300g natural brown or white kraft with cotton rope handles, foil stamping, and spot UV. 100-bag MOQ, Free US shipping over "kraft-paper-bags": {
    "name": {
      "zh-hk": "牛皮紙袋",
      "en": "Kraft Paper Bags",
      "ja": "クラフト紙袋"
    },
    "seo": 
        "title": "牛皮紙袋印刷 | FSC環保 加固手挽 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "牛皮紙袋印刷 100 個起, 採用 250g-300g 進口牛皮紙或白卡紙, 底部加固, 棉繩/扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾店、外賣打包及品牌活動資料袋。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "牛皮紙袋",
        "keywords": ["牛皮紙袋", "牛皮紙袋印刷", "紙袋訂製", "環保手挽袋", "超市購物袋", "FSC 紙袋"],
        "body": " natural and rustic"
     {
        "title": "即日チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された即日チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "即日チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "即日チラシ",
          "即日チラシ 印刷",
          "即日チラシ 小ロット",
          "即日チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）即日チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }al and rustic"
      },
      "en": {
        "title": "Kraft Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom kraft paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業牛皮紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["kraft paper bags", "custom kraft paper bags", "kraft paper bags printing hong kong"],
        "body": " loved by consumers. Perfect for clothing stores"
      },
      "ja": {
        "title": "厚紙チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化された厚紙チラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "厚紙チラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "厚紙チラシ",
          "厚紙チラシ 印刷",
          "厚紙チラシ 小ロット",
          "厚紙チラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）厚紙チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "チラシの最小注文数は何枚からですか？",
          "a": "A4 チラシ最小 100 枚から対応。大量発注（1,000 枚以上）で 15-25% オフの段階割引。短納期少量も特急料金で対応。"
        },
        {
          "q": "紙質は何が選べますか？",
          "a": "光沢コート紙（128g-157g）、マットコート紙（128g-157g）、上質紙（90g-110g）など 3 種類以上。用途・予算に応じて選択可能。"
        },
        {
          "q": "両面印刷はできますか？",
          "a": "はい、両面 4 色 CMYK オフセット印刷標準対応。表面と裏面で異なる情報掲載可能（メニュー・店舗案内など）。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ・当日配送（香港本店受取）。特急料金で対応可能。"
        },
        {
          "q": "折り加工はできますか？",
          "a": "二つ折り・三つ折り Z 折り・観音折りなど対応。リーフレット・メニュー・旅行パンフレットに最適。"
        },
        {
          "q": "PP ラミネートはできますか？",
          "a": "はい、光沢/マットの PP ラミネート対応。防水・耐久性 UP、色再現強化。店舗 POP・屋外短期間ポスターに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 形式推奨。CMYK モード・トンボ付き・フォント埋め込み必須。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。DHL/FedEx 直送で沖縄・離島も別途見積もりで対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "環保牛皮紙材質，質樸自然，深受消費者喜愛，支持印刷即日速遞送貨。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印雲提供專業的牛皮紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
      "en": "",
      "ja": ""
    }
  },
  "white-card-bags": {
    "name": {
      "zh-hk": "白卡紙袋",
      "en": "White Card Bags",
      "ja": "白カード紙袋"
    "seo":   {
        "title": "A2ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたA2ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "A2ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "A2ポスター",
          "A2ポスター 印刷",
          "A2ポスター 小ロット",
          "A2ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A2ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
    "seo": 
      "zh-hk": {
        "title": "白卡紙袋印刷 | 服飾品牌紙袋 100個起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "白卡紙袋印刷 100 個起, 採用 250g-300g 白卡紙, 表面可四色柯式印刷, 適合服飾品牌、化妝品、珠寶首飾及精品店。棉繩或扁紙手挽可選, 支援燙金、UV、壓凹等工藝。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        
        "h1": "白卡紙袋",
        "keywords": ["白卡紙袋", "白卡紙袋印刷", "紙袋訂製", "服飾紙袋", "品牌紙袋", "禮品紙袋"],
        "body": " smooth surface"
      },
      "en": {00, FSC certified, soy ink."
      
      },
      "ja": {
        "title": "エコチラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の小売・飲食・不動産向けに最適化されたエコチラシ。100 枚から対応、光沢/マット/上質紙 3 種類。4 色 CMYK 両面印刷対応、即日仕上げ・特急料金対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証紙。 30秒無料見積もり受付中。",
        "h1": "エコチラシ 100枚〜 | 即日 仕上げ",
        "keywords": [
          "エコチラシ",
          "エコチラシ 印刷",
          "エコチラシ 小ロット",
          "エコチラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコチラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":     "エコチラシ 小ロット",
          "エコチラシ 即日",
          "チラシ 印刷 即日",
          "A4 チラシ",
          "両面 チラシ",
          "折り チラシ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコチラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "A1大型ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたA1大型ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "A1大型ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "A1大型ポスター",
          "A1大型ポスター 印刷",
          "A1大型ポスター 小ロット",
          "A1大型ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）A1大型ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "白カード紙、表面が滑らかで印刷効果が抜群。高級ブランド、化粧品店に最適。 ZprintProは香港で白カード紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業白卡紙袋服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "",
      "ja": "紙袋的最小訂購量是多少？"
    }
  },
  "gift-bags": {
    "name": {
      "zh-hk": "禮品紙袋",
      "en": "Gift Bags",
      "ja": "ギフト紙袋"
    },
    "seo": {
      "zh-hk": {
        "title": "禮品紙袋印刷 | 婚宴回禮 公司福袋 100個 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品紙袋印刷 100 個起, 採用 250g-300g 銅版紙或白卡紙, 支援燙金、UV、壓凹及絲帶手挽。適合婚宴回禮、公司福袋、散伙餅袋、節慶手挽袋及禮品店包裝。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品紙袋",
        "keywords": ["禮品紙袋", "禮物袋", "節慶手挽袋", "絲帶手挽袋", "婚宴回禮袋", "公司福袋"],
        "body": " UV and other processes. Essential for gifting"
      },
      "en": {
        "title": "Gift Paper Bags | Foil Stamping | Free US Ship | ZprintPro",
        "description": "Premium gift paper bags for boutiques and brands. 210-300g art card, ribbon or cotton handles, foil stamping. 100-MOQ. Free US shipping over "gift-bags": {
    "name": {
      "zh-hk": "禮品紙袋",
      "en": "Gift Bags",
      "ja": "ギフト紙袋"
    },
    "seo": {
      "zh-hk": {
        "title": "禮品紙袋印刷 | 婚宴回禮 公司福袋 100個 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品紙袋印刷 100 個起, 採用 250g-300g 銅版紙或白卡紙, 支援燙金、UV、壓凹及絲帶手挽。適合婚宴回禮、公司福袋、散伙餅袋、節慶手挽袋及禮品店包裝。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品紙袋",
        "keywords": ["禮品紙袋", "禮物袋", "節慶手挽袋", "絲帶手挽袋", "婚宴回禮袋", "公司福袋"],
        "body": " UV and other processes. Essential for gifting"
      },
      "en": {00, DHL. FSC.",
        "h1": "Gift Paper Bags 100+ | Premium Ribbon | ZprintPro",
        "keywords": ["gift paper bags","custom gift bags","premium gift bags","branded gift bags","ribbon handle gift bags","foil stamped gift bags","gift bags free shipping","bulk gift bags","gift bags USD","bespoke gift packaging"],
        "body": "ZprintPro Custom Gift Paper Bag Printing for boutiques, jewelers, chocolatiers, and corporate gifting across US and global markets. 210-300g art card with soft-touch lamination, ribbon or cotton rope handles, foil stamping, magnetic closures. 100-bag MOQ, Free US shipping over "gift-bags": {
    "name": {
      "zh-hk": "禮品紙袋",
      "en": "Gift Bags",
      "ja": "ギフト紙袋"
    },
    "seo": {
      "zh-hk": {
        "title": "禮品紙袋印刷 | 婚宴回禮 公司福袋 100個 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品紙袋印刷 100 個起, 採用 250g-300g 銅版紙或白卡紙, 支援燙金、UV、壓凹及絲帶手挽。適合婚宴回禮、公司福袋、散伙餅袋、節慶手挽袋及禮品店包裝。免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品紙袋",
        "keywords": ["禮品紙袋", "禮物袋", "節慶手挽袋", "絲帶手挽袋", "婚宴回禮袋", "公司福袋"],
        "body": " UV and other processes. Essential for gifting"
      },
      "en": {00, FSC certified."
      
      },
      "ja": {
        "title": "ギフトバッグ | エコ素材 多サイズ | ZprintPro",
        "description": "ギフトバッグのギフトバッグは ZprintPro にお任せ。白カード/クラフト/コート 高品質用紙、マルチサイズ 各種対応。4色 CMYK 印刷、デザイン自由。100個〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Exquisite design with foil stamping",
        "keywords": ["ギフトバッグ", "ギフトバッグ 印刷", "gift bags"],
        "body": " transparent pricing"
      }
    },
    "faqs": [
        {
          "q": "ポスターの最小注文数は何枚からですか？",
          "a": "最小 1 枚から対応（HP Indigo デジタル印刷）。大量発注（100 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "対応しているサイズは？",
          "a": "A1 / A2 / A3 / B2 / B3 など全サイズ対応。長尺ポスターは最大 1,500mm まで継ぎ目なしで対応可能。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "合成紙（屋外耐候）+ UV 耐性ラミネートで 3〜6 ヶ月屋外耐久。短期屋外イベント・選挙ポスター・工事現場に最適。"
        },
        {
          "q": "大判 UV 印刷に対応していますか？",
          "a": "はい、最大 1,500mm 幅までの大判 UV 印刷機対応。継ぎ目なし長尺印刷、グラデーション・写真も精確再現。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ（香港本店受取）。イベント直前発注も特急対応可能。"
        },
        {
          "q": "選挙ポスターに対応していますか？",
          "a": "はい、日本の公職選挙法に基づくサイズ・記載事項に準拠。公示後 1 週間以内の納品実績あり。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。CMYK モード・350dpi 以上の高解像度。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。短納期特急プラン（有償）で最短当日仕上げ。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Custom gift paper bags with ribbon or cotton rope handles, 210-300g art card, foil stamping — ZprintPro",
      "ja": "一般為100個起訂，大批量訂單價格更優惠。"
    }
  },
  "eco-paper-bags": {
    "name": {
      "zh-hk": "環保紙袋",
      "en": "Eco Paper Bags",
      "ja": "エコ紙袋"
    },
    "seo": 
        "title": "環保再生紙袋印刷 | FSC認證 ESG包裝 100個 | 智印雲 ZprintPro 香港本地",
        "description": "環保再生紙袋印刷 100 個起, 採用 FSC 認證再生紙或進口天然牛皮紙, 配合大豆油墨印刷, 可完全降解。協助企業應對 ESG 碳審計及特區政府減塑徵費政策, 適合文創市集、有機服飾店及獨立咖啡店。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "FSC認證環保紙張，可持續發展。適合注重環保的品牌。智印雲提供專業環保紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保紙袋", "FSC 認證紙袋", "可降解紙袋", "ESG 包裝袋", "大豆油墨紙袋", "再生紙袋"],
        "body": " transparent pricing"
     {
        "title": "展示用ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された展示用ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "展示用ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "展示用ポスター",
          "展示用ポスター 印刷",
          "展示用ポスター 小ロット",
          "展示用ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）展示用ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Eco Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom eco paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MO",
        "h1": "FSC-certified eco-friendly paper",
        "keywords": ["eco paper bags", "custom eco paper bags", "eco paper bags printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "屋外ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された屋外ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "屋外ポスター",
          "屋外ポスター 印刷",
          "屋外ポスター 小ロット",
          "屋外ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ポスターの最小注文数は何枚からですか？",
          "a": "最小 1 枚から対応（HP Indigo デジタル印刷）。大量発注（100 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "対応しているサイズは？",
          "a": "A1 / A2 / A3 / B2 / B3 など全サイズ対応。長尺ポスターは最大 1,500mm まで継ぎ目なしで対応可能。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "合成紙（屋外耐候）+ UV 耐性ラミネートで 3〜6 ヶ月屋外耐久。短期屋外イベント・選挙ポスター・工事現場に最適。"
        },
        {
          "q": "大判 UV 印刷に対応していますか？",
          "a": "はい、最大 1,500mm 幅までの大判 UV 印刷機対応。継ぎ目なし長尺印刷、グラデーション・写真も精確再現。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ（香港本店受取）。イベント直前発注も特急対応可能。"
        },
        {
          "q": "選挙ポスターに対応していますか？",
          "a": "はい、日本の公職選挙法に基づくサイズ・記載事項に準拠。公示後 1 週間以内の納品実績あり。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。CMYK モード・350dpi 以上の高解像度。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。短納期特急プラン（有償）で最短当日仕上げ。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，大批量訂單價格更優惠。",
      "en": "Eco paper bags made from FSC-recycled kraft with GOTS organic cotton handles, soy-based inks — ZprintPro",
      "ja": "當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。"
    }
  },
  "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "Custom handle paper bags with cotton rope or flat paper handles, 120-200g kraft, 4-color CMYK — ZprintPro",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Paper Bags | 11 Colors | Free US Ship | ZprintPro",
        "description": "Custom handle paper bags for retail. 120-200g kraft, cotton rope or flat handles, 4-color CMYK. 100-MOQ. Free US shipping over "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "Large reinforced paper bags with twin cotton rope handles and double-glued base, 200-300g kraft, 12-20kg load — ZprintPro",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Large Paper Bags | 12-20kg Load | Free US Ship | ZprintPro",
        "description": "Large reinforced paper bags for apparel and gifts. 200-300g kraft, 12-20kg load. 100-MOQ. Free US shipping over "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Paper Bags | 11 Colors | Free US Ship | ZprintPro",
        "description": "Custom handle paper bags for retail. 120-200g kraft, cotton rope or flat handles, 4-color CMYK. 100-MOQ. Free US shipping over "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, DHL Express. FSC certified. Order today.",
        "h1": "Large Paper Bags 100+ | Heavy-Duty | ZprintPro",
        "keywords": ["large paper bags","oversized paper bags","heavy duty paper bags","apparel shopping bags","gift hamper bags","twin pack bags","large kraft bags","paper bags free shipping","bulk large bags","bespoke large packaging"],
        "body": "ZprintPro Large Paper Bag Printing for apparel brands, footwear retailers, gift hampers, home goods, and corporate gifting across US and global markets. 200-300g reinforced kraft with twin cotton rope handles, double-glued base, and gusseted sides supporting 12-20kg. 100-bag MOQ, Free US shipping over "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Paper Bags | 11 Colors | Free US Ship | ZprintPro",
        "description": "Custom handle paper bags for retail. 120-200g kraft, cotton rope or flat handles, 4-color CMYK. 100-MOQ. Free US shipping over "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, FSC certified."
      
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, FSC certified, 3-5 day rush available."
      
      },
      "ja": {
        "title": "屋外ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された屋外ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "屋外ポスター",
          "屋外ポスター 印刷",
          "屋外ポスター 小ロット",
          "屋外ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ポスターの最小注文数は何枚からですか？",
          "a": "最小 1 枚から対応（HP Indigo デジタル印刷）。大量発注（100 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "対応しているサイズは？",
          "a": "A1 / A2 / A3 / B2 / B3 など全サイズ対応。長尺ポスターは最大 1,500mm まで継ぎ目なしで対応可能。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "合成紙（屋外耐候）+ UV 耐性ラミネートで 3〜6 ヶ月屋外耐久。短期屋外イベント・選挙ポスター・工事現場に最適。"
        },
        {
          "q": "大判 UV 印刷に対応していますか？",
          "a": "はい、最大 1,500mm 幅までの大判 UV 印刷機対応。継ぎ目なし長尺印刷、グラデーション・写真も精確再現。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ（香港本店受取）。イベント直前発注も特急対応可能。"
        },
        {
          "q": "選挙ポスターに対応していますか？",
          "a": "はい、日本の公職選挙法に基づくサイズ・記載事項に準拠。公示後 1 週間以内の納品実績あり。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。CMYK モード・350dpi 以上の高解像度。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。短納期特急プラン（有償）で最短当日仕上げ。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，大批量訂單價格更優惠。",
      "en": "可以定制紙袋的尺寸和顏色嗎？",
      "ja": "當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。"
    }
  },
  "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, DHL. Carbon-neutral.",
        "h1": "Eco Paper Bags 100+ | FSC Recycled | ZprintPro",
        "keywords": ["eco paper bags","eco friendly paper bags","recycled paper bags","FSC paper bags","sustainable gift bags","kraft paper bags eco","compostable bags","eco bags free shipping","bulk eco bags","bespoke eco packaging"],
        "body": "ZprintPro Eco Paper Bag Printing for organic food retailers, sustainable fashion, clean beauty, and zero-waste brands across US and global markets. 100% recycled or FSC-certified kraft with GOTS organic cotton handles, soy inks, water-based coatings. 100-bag MOQ, Free US shipping over "eco-paper-bags": {
    "name": {
      "zh-hk": "環保紙袋",
      "en": "Eco Paper Bags",
      "ja": "エコ紙袋"
    },
    "seo": 
        "title": "環保再生紙袋印刷 | FSC認證 ESG包裝 100個 | 智印雲 ZprintPro 香港本地",
        "description": "環保再生紙袋印刷 100 個起, 採用 FSC 認證再生紙或進口天然牛皮紙, 配合大豆油墨印刷, 可完全降解。協助企業應對 ESG 碳審計及特區政府減塑徵費政策, 適合文創市集、有機服飾店及獨立咖啡店。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "FSC認證環保紙張，可持續發展。適合注重環保的品牌。智印雲提供專業環保紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保紙袋", "FSC 認證紙袋", "可降解紙袋", "ESG 包裝袋", "大豆油墨紙袋", "再生紙袋"],
        "body": " transparent pricing"
     {
        "title": "展示用ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された展示用ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "展示用ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "展示用ポスター",
          "展示用ポスター 印刷",
          "展示用ポスター 小ロット",
          "展示用ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）展示用ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Eco Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom eco paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MO",
        "h1": "FSC-certified eco-friendly paper",
        "keywords": ["eco paper bags", "custom eco paper bags", "eco paper bags printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "屋外ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された屋外ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "屋外ポスター",
          "屋外ポスター 印刷",
          "屋外ポスター 小ロット",
          "屋外ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ポスターの最小注文数は何枚からですか？",
          "a": "最小 1 枚から対応（HP Indigo デジタル印刷）。大量発注（100 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "対応しているサイズは？",
          "a": "A1 / A2 / A3 / B2 / B3 など全サイズ対応。長尺ポスターは最大 1,500mm まで継ぎ目なしで対応可能。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "合成紙（屋外耐候）+ UV 耐性ラミネートで 3〜6 ヶ月屋外耐久。短期屋外イベント・選挙ポスター・工事現場に最適。"
        },
        {
          "q": "大判 UV 印刷に対応していますか？",
          "a": "はい、最大 1,500mm 幅までの大判 UV 印刷機対応。継ぎ目なし長尺印刷、グラデーション・写真も精確再現。"
        },
        {
          "q": "即日仕上げは可能ですか？",
          "a": "500 枚未満、午前 11 時までのデータ確定で当日仕上げ（香港本店受取）。イベント直前発注も特急対応可能。"
        },
        {
          "q": "選挙ポスターに対応していますか？",
          "a": "はい、日本の公職選挙法に基づくサイズ・記載事項に準拠。公示後 1 週間以内の納品実績あり。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。CMYK モード・350dpi 以上の高解像度。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 3〜5 営業日、特急 1〜2 営業日。日本向け配送 2〜4 日。短納期特急プラン（有償）で最短当日仕上げ。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，大批量訂單價格更優惠。",
      "en": "可以定制紙袋的尺寸和顏色嗎？",
      "ja": "當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。"
    }
  },
  "handle-bags": {
    "name": {
      "zh-hk": "手挽紙袋",
      "en": "Handle Bags",
      "ja": "手提げ紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "手挽紙袋印刷 | 棉繩手挽 承重8-12kg | 智印雲 ZprintPro 香港本地印刷",
        "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      "seo":       "description": "手挽紙袋印刷 100 個起, 採用 250g-300g 牛皮紙或白卡紙, 加底卡加固, 棉繩或扁紙手挽承重 8-12 公斤。印刷 Logo、燙金、UV 圖案可選, 適合超市量販、服飾兩件裝、品牌活動資料袋及外賣打包。免費打樣, 48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印雲提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["手挽紙袋", "棉繩紙袋", "加固手挽袋", "超市購物袋", "服飾紙袋", "外賣打包袋"],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
     {
        "title": "粘着ポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化された粘着ポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着ポスター 1枚〜 | 大判 UV",
        "keywords": [
          "粘着ポスター",
          "粘着ポスター 印刷",
          "粘着ポスター 小ロット",
          "粘着ポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着ポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Handle Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom handle bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Sturdy handle design",
        "keywords": ["handle bags", "custom handle bags", "handle bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のイベント・小売・選挙向けに最適化されたアートポスター。1 枚から対応、A1/A2/A3/B2/B3 全サイズ。屋外耐候・UV 耐性ラミネート対応、大判 UV 印刷継ぎ目なし。香港自社工場から日本全国へ最短 2-4 営業日配送。 30秒無料見積もり受付中。",
        "h1": "アートポスター 1枚〜 | 大判 UV",
        "keywords": [
          "アートポスター",
          "アートポスター 印刷",
          "アートポスター 小ロット",
          "アートポスター 即日",
          "ポスター 印刷",
          "A2 ポスター",
          "屋外 ポスター",
          "選挙 ポスター",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）アートポスターは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "small-bags": {
    "name": {
      "zh-hk": "小號紙袋",
      "en": "Small Bags",
      "ja": "小判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "小號禮品紙袋印刷 | 首飾化妝品精品袋 | 智印雲 ZprintPro 香港本地印刷",
        "description": "小號禮品紙袋印刷 100 個起, 採用 200g-250g 銅版紙或白卡紙, 適合首飾、化妝品、精品店小件禮品包裝。可選絲帶手挽、燙金標誌、UV 局部。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印雲提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["小號紙袋", "小型禮品袋", "首飾紙袋", "化妝品紙袋", "小批量紙袋", "精品紙袋"],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Paper Bags | Eco-Friendly Multi-Size | ZprintPro",
        "description": "Custom small paper bags from ZprintPro Hong Kong. Premium White card/kraft/coated, multiple Multiple sizes options. 4-color CMYK printing, full design support. ",
        "h1": "Compact size",
        "keywords": ["small paper bags", "custom small bags", "small bags printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "ギフトボックス",
          "ギフトボックス 印刷",
          "ギフトボックス 小ロット",
          "ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        "seo":        {
        "title": "食品包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された食品包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "食品包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "食品包装箱",
          "食品包装箱 印刷",
          "食品包装箱 小ロット",
          "食品包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）食品包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "large-bags": {
    "name": {
      "zh-hk": "大號紙袋",
      "en": "Large Bags",
      "ja": "大判紙袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大號紙袋印刷 | 服裝鞋盒袋 特大尺寸 | 智印雲 ZprintPro 香港本地印刷",
        "description": "大號紙袋印刷 100 個起, 採用 300g 牛皮紙或白卡紙, 特大尺寸適合服裝、鞋盒、活動禮品及多件裝產品。棉繩/扁紙手挽可選, 承重 8-12 公斤, 支援四色印刷、燙金、UV。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號紙袋", "特大紙袋", "服裝紙袋", "鞋盒紙袋", "紙袋批發", "活動禮品袋"],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      "seo": 
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
     {
        "title": "発送箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された発送箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "発送箱 30個〜 | 化粧 食品",
        "keywords": [
          "発送箱",
          "発送箱 印刷",
          "発送箱 小ロット",
          "発送箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）発送箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, carbon-neutral offset."
      
      },
      "ja": {
        "title": "化粧品箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された化粧品箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "化粧品箱 30個〜 | 化粧 食品",
        "keywords": [
          "化粧品箱",
          "化粧品箱 印刷",
          "化粧品箱 小ロット",
          "化粧品箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）化粧品箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "大きなサイズ、衣類、靴などの大物に最適。 ZprintProは香港で大判紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業大號紙袋服務 | 智印雲"
      "seo":     "q": "大きなサイズ、衣類、靴などの大物に最適。 ZprintProは香港で大判紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業大號紙袋服務 | 智印雲"
     {
        "title": "折りたたみ箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された折りたたみ箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "折りたたみ箱 30個〜 | 化粧 食品",
        "keywords": [
          "折りたたみ箱",
          "折りたたみ箱 印刷",
          "折りたたみ箱 小ロット",
          "折りたたみ箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）折りたたみ箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "加大尺寸，適合服裝、鞋類等大件商品。智印雲提供專業的大號紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "紙袋的最小訂購量是多少？",
      "en": "一般為100個起訂，大批量訂單價格更優惠。",
      "ja": "可以定制紙袋的尺寸和顏色嗎？"
    }
  },
  "a4-flyers": {
    "name": {
      "zh-hk": "A4宣傳單張",
      "en": "A4 Flyers",
      "ja": "A4チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "A4宣傳單張印刷 | 雙面四色 100張起印 即日 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A4 宣傳單張印刷 100 張起, 採用 128g-157g 銅版紙, 配合四色數碼或柯式印刷。可印二維碼連結報名系統, 適合學校、補習社、活動宣傳、店舖推廣及招生。免費出血檢查, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A4宣傳單張",
        "keywords": ["A4 宣傳單張", "A4 傳單", "宣傳單張印刷", "活動宣傳單", "100張起印", "即日派傳單"],
        "body": " most common flyer format. 157g glossy paper"
      },
      "en": {
        "title": "A4 Flyers 100+ | Same-Day CMYK | Free US Ship | ZprintPro",
        "description": "A4 flyer printing for events. 128g-300g gloss paper, double-sided CMYK. 100-MOQ, same-day 500+. Free US shipping over "a4-flyers": {
    "name": {
      "zh-hk": "A4宣傳單張",
      "en": "A4 Flyers",
      "ja": "A4チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "A4宣傳單張印刷 | 雙面四色 100張起印 即日 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A4 宣傳單張印刷 100 張起, 採用 128g-157g 銅版紙, 配合四色數碼或柯式印刷。可印二維碼連結報名系統, 適合學校、補習社、活動宣傳、店舖推廣及招生。免費出血檢查, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A4宣傳單張",
        "keywords": ["A4 宣傳單張", "A4 傳單", "宣傳單張印刷", "活動宣傳單", "100張起印", "即日派傳單"],
        "body": " most common flyer format. 157g glossy paper"
      },
      "en": {00, DHL Express. FSC. Get a quote.",
        "h1": "A4 Flyers 100+ | Same-Day CMYK | ZprintPro",
        "keywords": ["a4 flyers","custom a4 flyers","a4 flyer printing","double sided flyers","a4 flyers same day","cheap a4 flyers bulk","a4 flyers free shipping","flyers USD","real estate flyers","bespoke flyers UK"],
        "body": "ZprintPro Custom A4 Flyer Printing for product launches, real estate, events, and restaurants across the US and global markets. 128g-300g gloss or matte art paper with double-sided full-color CMYK. 100-flyer MOQ, same-day available for 500+, Free US shipping over "a4-flyers": {
    "name": {
      "zh-hk": "A4宣傳單張",
      "en": "A4 Flyers",
      "ja": "A4チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "A4宣傳單張印刷 | 雙面四色 100張起印 即日 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A4 宣傳單張印刷 100 張起, 採用 128g-157g 銅版紙, 配合四色數碼或柯式印刷。可印二維碼連結報名系統, 適合學校、補習社、活動宣傳、店舖推廣及招生。免費出血檢查, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A4宣傳單張",
        "keywords": ["A4 宣傳單張", "A4 傳單", "宣傳單張印刷", "活動宣傳單", "100張起印", "即日派傳單"],
        "body": " most common flyer format. 157g glossy paper"
      },
      "en": {00."
      
      },
      "ja": {
        "title": "A4 チラシ | 両面フルカラー 100枚〜 | ZprintPro",
        "description": "A4 チラシのA4 チラシは ZprintPro にお任せ。157g-300g コート紙 高品質用紙、A4/A5/A6/DL 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、翌日-2営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Standard A4 size",
        "keywords": ["A4 チラシ", "A4 チラシ 印刷", "a4 flyers"],
        "body": " vibrant colors. ZprintPro offers professional A4 Flyers services in Hong Kong. High quality"
      }
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "Custom A4 flyers with gloss or matte art paper, double-sided CMYK, 100-flyer MOQ — ZprintPro",
      "ja": "傳單的最小訂購量是多少？"
    }
  "seo": 
 {
        "title": "箔押しポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化された箔押しポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。",
        "h1": "箔押しポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "箔押しポチ袋",
          "箔押しポチ袋 印刷",
          "箔押しポチ袋 小ロット",
          "箔押しポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）箔押しポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
  "a5-flyers": {
    "name": {
      "zh-hk": "A5宣傳單張",
      "en": "A5 Flyers",
      "ja": "A5チラシ"
    },
    "seo": 
      "zh-hk": {
        "title": "A5宣傳單張印刷 | 餐廳外賣低成本 100張起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A5 宣傳單張印刷 100 張起, 採用 128g 銅版紙, 成本低 40%, 適合餐廳外賣單張、活動傳單、店舖推廣。免費設計排版, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A5宣傳單張",
        "keywords": ["A5 宣傳單張", "A5 傳單", "宣傳單張印刷", "外賣單張", "餐廳傳單", "成本低 40%"],
        "body": " economical"
      },
      "en": {
        "title": "A5 Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom a5 flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support. MOQ 100",
        "h1": "A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活動首選。智印雲提供專業A5宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a5 flyers", "custom a5 flyers", "a5 flyers printing hong kong"],
        "body": " perfect for mass distribution. First choice for food delivery"
      },
      "ja": {
        "title": "上製本箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された上製本箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "上製本箱 30個〜 | 化粧 食品",
        "keywords": [
          "上製本箱",
          "上製本箱 印刷",
          "上製本箱 小ロット",
          "上製本箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）上製本箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":   "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）上製本箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "エンボスポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化されたエンボスポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。",
        "h1": "エンボスポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "エンボスポチ袋",
          "エンボスポチ袋 印刷",
          "エンボスポチ袋 小ロット",
          "エンボスポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エンボスポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "A5サイズ、経済的、大量配布に最適。フードデリバリー、フラッシュイベントの第一選択。 ZprintProは香港でA5チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業A5宣傳單張服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "",
      "ja": "傳單的最小訂購量是多少？"
    }
  },
  "double-sided-flyers": {
    "name": {
      "zh-hk": "雙面宣傳單張",
      "en": "Double-sided Flyers",
      "ja": "両面チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "雙面宣傳單張印刷 | 對位套印 摺頁 100張起 | 智印雲 ZprintPro 香港本地",
        "description": "雙面宣傳單張印刷 100 張起, 採用 128g-157g 銅版紙, 配合四色柯式印刷雙面, 對位套印精準。適合產品目錄、活動詳細介紹、摺頁單張。免費出血檢查, 1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        
        "h1": "雙面宣傳單張",
        "keywords": ["雙面宣傳單張", "雙面傳單", "對位套印", "摺頁單張", "產品目錄", "全面印刷"],
        "body": " doubled information capacity. ZprintPro offers professional Double-sided Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Double-Sided Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom double-sided flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design suppor",
        "h1": "雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。智印雲提供專業雙面宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["double-sided flyers", "custom double sided flyers", "double sided flyers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "両面チラシ | 両面フルカラー 100枚〜 | ZprintPro",
        "description": "両面チラシの両面チラシは ZprintPro にお任せ。157g-300g コート紙 高品質用紙、A4/A5/A6/DL 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、翌日-2営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Double-sided full color printing",
        "keywords": ["両面チラシ", "両面チラシ 印刷", "double sided flyers"],
        "body": " fast delivery."
      }
    },
    "faqs": [
        {
          "q": "紅包の最小注文数は何個からですか？",
          "a": "最小 100 個から対応。年始繁忙期は 10,000 個以上の大量発注対応。個別名入れも 100 個から。"
        },
        {
          "q": "対応している箔の色は？",
          "a": "ゴールド・シルバー・ローズゴールド・レッド・ブルー・パープル・グリーン・オレンジの 8 色。伝統的格式から現代的デザインまで対応。"
        },
        {
          "q": "多言語対応はできますか？",
          "a": "はい、中文・日文・英文併記対応。伝統的柄（福・寿・喜）と現代的デザインの組み合わせ可能。"
        },
        {
          "q": "個別名入れはできますか？",
          "a": "はい、社名・ロゴ・個人名入れ印刷対応。周年記念・企業ギフト・結婚引出物に最適。100 個から対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 80×50mm から最大 250×150mm まで対応。中国式 L/M/S、日本式、オリジナルサイズから選択可能。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・大豆インク対応。ESG 配慮の金融機関・ホテル・ブランド向けに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。伝統的柄の場合は高解像度 PNG/JPG（350dpi 以上）も対応。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。年始繁忙期（12-1 月）は 1 ヶ月前発注推奨。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "傳單的最小訂購量是多少？",
      "en": "一般為100張起訂，數碼印刷可接受50張小量。",
      "ja": "傳單支持雙面印刷嗎？"
    }
  },
  "folded-leaflets": {
    "name": {
      "zh-hk": "摺疊宣傳單張",
      "en": "Folded Leaflets",
      "ja": "折りたたみパンフレット"
    },
    "seo": 
        "title": "摺頁單張印刷 | 三摺對摺 DM 餐牌摺頁 | 智印雲 ZprintPro 香港本地印刷",
        "description": "摺頁單張印刷 100 張起, 支援三摺、對摺、Z 摺等, 採用 128g-200g 銅版紙。適合餐牌摺頁、產品說明書、DM 宣傳單張、活動流程表。免費刀模設計, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。智印雲提供專業摺疊宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["摺頁單張", "三摺單張", "對摺傳單", "餐牌摺頁", "產品說明書", "DM 印刷"],
        "body": " transparent pricing"
     {
        "title": "キャラクターポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化されたキャラクターポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。",
        "h1": "キャラクターポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "キャラクターポチ袋",
          "キャラクターポチ袋 印刷",
          "キャラクターポチ袋 小ロット",
          "キャラクターポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）キャラクターポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Folded Leaflets | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom folded leaflets from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support. M",
        "h1": "Bi-fold or tri-fold design",
        "keywords": ["folded leaflets", "custom folded leaflets", "folded leaflets printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "オリジナルポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化されたオリジナルポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。",
        "h1": "オリジナルポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "オリジナルポチ袋",
          "オリジナルポチ袋 印刷",
          "オリジナルポチ袋 小ロット",
          "オリジナルポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）オリジナルポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "紅包の最小注文数は何個からですか？",
          "a": "最小 100 個から対応。年始繁忙期は 10,000 個以上の大量発注対応。個別名入れも 100 個から。"
        },
        {
          "q": "対応している箔の色は？",
          "a": "ゴールド・シルバー・ローズゴールド・レッド・ブルー・パープル・グリーン・オレンジの 8 色。伝統的格式から現代的デザインまで対応。"
        },
        {
          "q": "多言語対応はできますか？",
          "a": "はい、中文・日文・英文併記対応。伝統的柄（福・寿・喜）と現代的デザインの組み合わせ可能。"
        },
        {
          "q": "個別名入れはできますか？",
          "a": "はい、社名・ロゴ・個人名入れ印刷対応。周年記念・企業ギフト・結婚引出物に最適。100 個から対応。"
        },
        {
          "q": "オリジナルサイズで作れますか？",
          "a": "はい、最小 80×50mm から最大 250×150mm まで対応。中国式 L/M/S、日本式、オリジナルサイズから選択可能。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・大豆インク対応。ESG 配慮の金融機関・ホテル・ブランド向けに最適。"
        },
        {
          "q": "データ入稿形式は何が良いですか？",
          "a": "Illustrator / InDesign / PDF 推奨。伝統的柄の場合は高解像度 PNG/JPG（350dpi 以上）も対応。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。年始繁忙期（12-1 月）は 1 ヶ月前発注推奨。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100張起訂，數碼印刷可接受50張小量。",
      "en": "傳單支持雙面印刷嗎？",
      "ja": "支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。"
    }
  },
  "thick-paper-flyers": {
    "name": {
      "zh-hk": "厚紙宣傳單張",
      "en": "Thick Paper Flyers",
      "ja": "厚紙チラシ"
    },
    "seo": 
      "zh-hk": {
        "title": "厚身宣傳單張印刷 | 200g銅版紙 高端品牌 | 智印雲 ZprintPro 香港本地",
        "description": "厚身宣傳單張印刷 100 張起, 採用 200g 銅版紙, 紙張挺度佳, 適合高端品牌宣傳、新品發布會、VIP 活動邀請。可選啞膠/光膠覆膜, 免費打樣, 1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。智印雲提供專業厚紙宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["厚身宣傳單張", "厚紙傳單", "200g 銅版紙", "高端宣傳單", "品牌傳單", "活動單張"],
        "body": " not easily damaged. ZprintPro offers professional Thick Paper Flyers services in Hong Kong. High quality"
      "seo":      "keywords": ["厚身宣傳單張", "厚紙傳單", "200g 銅版紙", "高端宣傳單", "品牌傳單", "活動單張"],
        "body": " not easily damaged. ZprintPro offers professional Thick Paper Flyers services in Hong Kong. High quality"
     {
        "title": "大判ポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化された大判ポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。 30秒無料見積もり受付中。",
        "h1": "大判ポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "大判ポチ袋",
          "大判ポチ袋 印刷",
          "大判ポチ袋 小ロット",
          "大判ポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判ポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Thick Paper Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom thick paper flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support",
        "h1": "200g+ thick paper",
        "keywords": ["thick paper flyers", "custom thick paper flyers", "thick paper flyers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "エコポチ袋印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の中華系イベント・結婚・開業向けに最適化されたエコポチ袋。100 個から対応、8 色箔押し（金・銀・ローズ・レッド・ブルー・パープル・グリーン・オレンジ）。中文・日文・英文併記対応。香港自社工場から日本全国へ最短 3-5 営業日配送。 30秒無料見積もり受付中。",
        "h1": "エコポチ袋 100個〜 | 8色 箔押し",
        "keywords": [
          "エコポチ袋",
          "エコポチ袋 印刷",
          "エコポチ袋 小ロット",
          "エコポチ袋 即日",
          "紅包 印刷",
          "ポチ袋 オリジナル",
          "箔押し 紅包",
          "中式 紅包",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）エコポチ袋は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "傳單的最小訂購量是多少？",
      "en": "一般為100張起訂，數碼印刷可接受50張小量。",
      "ja": "傳單支持雙面印刷嗎？"
    }
  },
  "same-day-flyers": {
    "name": {
      "zh-hk": "即日宣傳單張",
      "en": "Same-day Flyers",
      "ja": "即日チラシ"
    },
    "seo": 
      "zh-hk": {
        "title": "即日急件傳單印刷 | 4小時取件 觀塘自取 | 智印雲 ZprintPro 香港本地",
        "description": "即日急件傳單印刷 4 小時取件, 採用 128g 銅版紙, 100 張起印。適合快閃活動、突發宣傳、店舖開業急件。觀塘門市現場打樣即取, 港九新界 4 小時速遞, 急件首選印刷服務。**智印雲 香港本地印刷**。",
        
        "h1": "即日宣傳單張",
        "keywords": ["即日傳單", "4小時取件", "急件印刷", "即日速遞", "快閃活動傳單", "緊急活動單張"],
        "body": " same-day delivery available. ZprintPro offers professional Same-day Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Same Day Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom same day flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support. M",
        "h1": "緊急活動首選，最快當天交貨。品質保證，急件不擔心。智印雲提供專業即日宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["same day flyers", "custom same day flyers", "same day flyers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "壁掛けカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化された壁掛けカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "壁掛けカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "壁掛けカレンダー",
          "壁掛けカレンダー 印刷",
          "壁掛けカレンダー 小ロット",
          "壁掛けカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）壁掛けカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "傳單的最小訂購量是多少？",
      "en": "一般為100張起訂，數碼印刷可接受50張小量。",
      "ja": "傳單支持雙面印刷嗎？"
    }
  },
  "eco-flyers": {
    "name": {
      "zh-hk": "環保宣傳單張",
      "en": "Eco Flyers",
      "ja": "エコチラシ"
    },
    "seo": 
        "title": "環保宣傳單張印刷 | 再生紙 大豆油墨 NGO | 智印雲 ZprintPro 香港本地印刷",
        "description": "環保宣傳單張印刷 100 張起, 採用 FSC 認證再生紙或大豆油墨, 100% 可回收。適合社企、NGO、環保品牌及 ESG 企業宣傳。免費打樣, 1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "環保紙張印刷，展現企業責任。適合環保主題活動。智印雲提供專業環保宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保宣傳單張", "再生紙傳單", "大豆油墨印刷", "NGO 宣傳", "社企傳單", "FSC 認證傳單"],
        "body": " transparent pricing"
     {
        "title": "オリジナルカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたオリジナルカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "オリジナルカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "オリジナルカレンダー",
          "オリジナルカレンダー 印刷",
          "オリジナルカレンダー 小ロット",
          "オリジナルカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）オリジナルカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Eco Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom eco flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support. MOQ 10",
        "h1": "Eco-friendly paper printing",
        "keywords": ["eco flyers", "custom eco flyers", "eco flyers printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "卓上カレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化された卓上カレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "卓上カレンダー 10部〜 | JA 祝日",
        "keywords": [
          "卓上カレンダー",
          "卓上カレンダー 印刷",
          "卓上カレンダー 小ロット",
          "卓上カレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）卓上カレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100張起訂，數碼印刷可接受50張小量。",
      "en": "傳單支持雙面印刷嗎？",
      "ja": "支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。"
    }
  },
  "a2-posters": {
    "name": {
      "zh-hk": "A2海報印刷",
      "en": "A2 Posters",
      "ja": "A2ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "A2海報印刷 | 雙面四色 店內POP 100張起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A2 海報印刷 100 張起, 採用 157g 銅版紙或相紙, 配合四色柯式印刷, 色彩鮮豔圖文清晰。適合活動海報、店內 POP、展會佈置及品牌宣傳。可選啞膠/光膠覆膜。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A2海報印刷",
        "keywords": ["A2 海報印刷", "A2 海報", "海報印刷", "活動海報", "店內 POP", "展會海報"],
        "body": " first choice for event promotion. 157g glossy paper"
      },
      "en": {
        "title": "A2 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a2 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。智印雲提供專業A2海報印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a2 posters", "custom a2 posters", "a2 posters printing hong kong"],
        "body": " vibrant colors"
      },
      "ja": {
        "title": "ミニカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたミニカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "ミニカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "ミニカレンダー",
          "ミニカレンダー 印刷",
          "ミニカレンダー 小ロット",
          "ミニカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ミニカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "A2 posters in gloss or matte art paper, 420x594mm, 4-color CMYK printing for retail and events — ZprintPro",
      "ja": "海報的最大尺寸可以做到多大？"
    }
  },
  "a1-posters": {
    "name": {
      "zh-hk": "A1大幅海報",
      "en": "A1 Large Posters",
      "ja": "A1大型ポスター"
    },
    "seo": 
        "title": "A1大幅海報印刷 | 展覽背板 演唱會海報 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A1 大幅海報印刷 100 張起, 採用 200g 以上銅版紙或相紙, 配合四色柯式印刷, 適合展覽背板、演唱會海報、商場展覽、藝廊開幕。預留 3 毫米出血, 急件可拆數碼快印與裱貼分段排程。48 小時快遞。**智印雲 香港本地印刷**。",
        
        "h1": "A1大幅海報",
        "keywords": ["A1 大幅海報", "A1 海報", "海報印刷", "展覽背板", "演唱會海報", "商場海報"],
        "body": " strong visual impact. Perfect for exhibitions"
     {
        "title": "マグネットカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたマグネットカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "マグネットカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "マグネットカレンダー",
          "マグネットカレンダー 印刷",
          "マグネットカレンダー 小ロット",
          "マグネットカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マグネットカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }r exhibitions"
      },
      "en": {
        "title": "A1 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a1 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。智印雲提供專業A1大幅海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a1 posters", "custom a1 posters", "a1 posters printing hong kong"],
        "body": " venue decoration. ZprintPro offers professional A1 Large Posters services in Hong Kong. High quality"
      },
      "ja": {
        "title": "フォトフレームカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたフォトフレームカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "フォトフレームカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "フォトフレームカレンダー",
          "フォトフレームカレンダー 印刷",
          "フォトフレームカレンダー 小ロット",
          "フォトフレームカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フォトフレームカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "A1 posters on premium matte or photo paper with foam board mounting for retail and trade shows — ZprintPro",
      "ja": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。"
    }
  },
  "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "Outdoor posters on PVC banner or vinyl with UV lamination and grommets for storefront and event use — ZprintPro",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "Display posters on foam board or gator board with lamination, ready for trade show booths and retail displays — ZprintPro",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Art Posters | Archival 200yr | Free US Ship | ZprintPro",
        "description": "Museum-quality art posters. Matte cotton, satin photo, Hahnemuhle. 25-MOQ. Free US shipping over "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, DHL Express. 200-year archival ink. COA included.",
        "h1": "Art Posters 25+ | Archival Pigment | ZprintPro",
        "keywords": ["art posters","museum quality prints","archival posters","fine art prints","photography prints","gallery posters","limited edition prints","art posters free shipping","bulk art prints","bespoke art reproductions"],
        "body": "ZprintPro Art Poster Printing for independent artists, photographers, illustrators, galleries, curators, and interior designers across US and global markets. Matte cotton, satin photo, or Hahnemuhle Photo Rag with 200+ year archival pigment inks. 25-poster MOQ, Free US shipping over "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, free hand inspection and Certificate of Authenticity."
      
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "Museum-quality art posters on matte cotton or Hahnemuhle Photo Rag with archival pigment inks — ZprintPro",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, DHL Express. Mounting and lamination included. Get a quote.",
        "h1": "Display Posters 50+ | Foam & Gator | ZprintPro",
        "keywords": ["display posters","foam board posters","gator board prints","trade show posters","retail display posters","event booth signs","mounted posters","display posters free shipping","bulk display posters","bespoke display signs"],
        "body": "ZprintPro Display Poster Printing for trade show exhibitors, retail pop-ups, event companies, corporate conferences, and product launches across US and global markets. Foam board, gator board, or PVC sintra mounting with lamination standard. 50-poster MOQ, Free US shipping over "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, free booth layout service."
      
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, DHL Express. 6-12 month fade resistance.",
        "h1": "Outdoor Posters 50+ | UV Resistant | ZprintPro",
        "keywords": ["outdoor posters","weatherproof posters","PVC banner posters","vinyl outdoor signs","construction posters","event outdoor signage","UV resistant posters","outdoor posters free shipping","bulk outdoor posters","bespoke outdoor signage"],
        "body": "ZprintPro Outdoor Poster Printing for storefronts, construction sites, events, sports venues, political campaigns, and tourism across US and global markets. PVC banner, vinyl sticker, weatherproof paper, or mesh banner with UV lamination for 6-12 month fade resistance. 50-poster MOQ, Free US shipping over "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, free grommet installation."
      
      },
      "ja": {
        "title": "フォトフレームカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたフォトフレームカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "フォトフレームカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "フォトフレームカレンダー",
          "フォトフレームカレンダー 印刷",
          "フォトフレームカレンダー 小ロット",
          "フォトフレームカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フォトフレームカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "海報的最大尺寸可以做到多大？",
      "ja": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。"
    }
  },
  "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, DHL Express. Mounting included. Quote.",
        "h1": "A1 Posters 50+ | Trade Show | ZprintPro",
        "keywords": ["A1 posters","A1 poster printing","594x841 posters","large posters","trade show posters","movie posters A1","window posters","A1 posters free shipping","bulk A1 posters","bespoke A1 signage"],
        "body": "ZprintPro A1 Poster Printing (594x841mm) for retail windows, movie and entertainment, art galleries, trade shows, real estate, and corporate offices across US and global markets. 200-300g matte, photo paper, or premium matte with mounting on foam board, gator board, or sintra. 50-poster MOQ, Free US shipping over "a1-posters": {
    "name": {
      "zh-hk": "A1大幅海報",
      "en": "A1 Large Posters",
      "ja": "A1大型ポスター"
    },
    "seo": 
        "title": "A1大幅海報印刷 | 展覽背板 演唱會海報 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A1 大幅海報印刷 100 張起, 採用 200g 以上銅版紙或相紙, 配合四色柯式印刷, 適合展覽背板、演唱會海報、商場展覽、藝廊開幕。預留 3 毫米出血, 急件可拆數碼快印與裱貼分段排程。48 小時快遞。**智印雲 香港本地印刷**。",
        
        "h1": "A1大幅海報",
        "keywords": ["A1 大幅海報", "A1 海報", "海報印刷", "展覽背板", "演唱會海報", "商場海報"],
        "body": " strong visual impact. Perfect for exhibitions"
     {
        "title": "マグネットカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたマグネットカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "マグネットカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "マグネットカレンダー",
          "マグネットカレンダー 印刷",
          "マグネットカレンダー 小ロット",
          "マグネットカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マグネットカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }r exhibitions"
      },
      "en": {
        "title": "A1 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a1 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。智印雲提供專業A1大幅海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a1 posters", "custom a1 posters", "a1 posters printing hong kong"],
        "body": " venue decoration. ZprintPro offers professional A1 Large Posters services in Hong Kong. High quality"
      },
      "ja": {
        "title": "フォトフレームカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたフォトフレームカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "フォトフレームカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "フォトフレームカレンダー",
          "フォトフレームカレンダー 印刷",
          "フォトフレームカレンダー 小ロット",
          "フォトフレームカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フォトフレームカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "海報的最大尺寸可以做到多大？",
      "ja": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。"
    }
  },
  "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00."
      
      },
      "ja": {
        "title": "ミニカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたミニカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "ミニカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "ミニカレンダー",
          "ミニカレンダー 印刷",
          "ミニカレンダー 小ロット",
          "ミニカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ミニカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "",
      "ja": "海報的最大尺寸可以做到多大？"
    }
  },
  "a1-posters": {
    "name": {
      "zh-hk": "A1大幅海報",
      "en": "A1 Large Posters",
      "ja": "A1大型ポスター"
    },
    "seo": 
        "title": "A1大幅海報印刷 | 展覽背板 演唱會海報 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A1 大幅海報印刷 100 張起, 採用 200g 以上銅版紙或相紙, 配合四色柯式印刷, 適合展覽背板、演唱會海報、商場展覽、藝廊開幕。預留 3 毫米出血, 急件可拆數碼快印與裱貼分段排程。48 小時快遞。**智印雲 香港本地印刷**。",
        
        "h1": "A1大幅海報",
        "keywords": ["A1 大幅海報", "A1 海報", "海報印刷", "展覽背板", "演唱會海報", "商場海報"],
        "body": " strong visual impact. Perfect for exhibitions"
     {
        "title": "マグネットカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたマグネットカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "マグネットカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "マグネットカレンダー",
          "マグネットカレンダー 印刷",
          "マグネットカレンダー 小ロット",
          "マグネットカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マグネットカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }r exhibitions"
      },
      "en": {
        "title": "A1 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a1 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。智印雲提供專業A1大幅海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a1 posters", "custom a1 posters", "a1 posters printing hong kong"],
        "body": " venue decoration. ZprintPro offers professional A1 Large Posters services in Hong Kong. High quality"
      },
      "ja": {
        "title": "フォトフレームカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたフォトフレームカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "フォトフレームカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "フォトフレームカレンダー",
          "フォトフレームカレンダー 印刷",
          "フォトフレームカレンダー 小ロット",
          "フォトフレームカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フォトフレームカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "海報的最大尺寸可以做到多大？",
      "ja": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。"
    }
  },
  "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, DHL Express. 2-3 day. FSC certified.",
        "h1": "A2 Posters 100+ | Retail & Events | ZprintPro",
        "keywords": ["A2 posters","A2 poster printing","420x594 posters","event posters A2","retail posters","sale posters","A2 posters free shipping","bulk A2 posters","A2 posters USD","bespoke A2 signage"],
        "body": "ZprintPro A2 Poster Printing (420x594mm) for retail stores, events, real estate, restaurants, gyms, and small businesses across US and global markets. 150-300g gloss or matte art paper with 4-color CMYK printing and optional lamination. 100-poster MOQ, Free US shipping over "a2-posters": {
    "name": {
      "zh-hk": "A2海報印刷",
      "en": "A2 Posters",
      "ja": "A2ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "A2海報印刷 | 雙面四色 店內POP 100張起 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A2 海報印刷 100 張起, 採用 157g 銅版紙或相紙, 配合四色柯式印刷, 色彩鮮豔圖文清晰。適合活動海報、店內 POP、展會佈置及品牌宣傳。可選啞膠/光膠覆膜。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "A2海報印刷",
        "keywords": ["A2 海報印刷", "A2 海報", "海報印刷", "活動海報", "店內 POP", "展會海報"],
        "body": " first choice for event promotion. 157g glossy paper"
      },
      "en": {
        "title": "A2 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a2 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。智印雲提供專業A2海報印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a2 posters", "custom a2 posters", "a2 posters printing hong kong"],
        "body": " vibrant colors"
      },
      "ja": {
        "title": "ミニカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたミニカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "ミニカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "ミニカレンダー",
          "ミニカレンダー 印刷",
          "ミニカレンダー 小ロット",
          "ミニカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ミニカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "カレンダーの最小注文数は何部からですか？",
          "a": "壁掛け・卓上カレンダー 10 部から対応。フォトフレームカレンダーは 10 部から。大量発注（100 部以上）で 15-25% オフ。"
        },
        {
          "q": "六曜表示オプションはありますか？",
          "a": "はい、JA 旧暦併記・大安・仏滅等の六曜表示オプション対応。ギフト向け（母の日・敬老の日など）に特に人気。"
        },
        {
          "q": "JA 祝日に完全準拠していますか？",
          "a": "はい、JA 祝日完全準拠で印刷。六曜オプションと組み合わせ可能。"
        },
        {
          "q": "オリジナルデザインで作成できますか？",
          "a": "はい、企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーなど完全カスタマイズ対応。年末企業ギフトに最適。"
        },
        {
          "q": "サイズは選べますか？",
          "a": "A5 / A4 / 卓上 / カスタムから選択可能。フォトフレームカレンダーは L 判〜A4 サイズ対応。"
        },
        {
          "q": "マグネットカレンダーは作れますか？",
          "a": "はい、裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード対応。月ごとまたは全年フォーマット。"
        },
        {
          "q": "写真は支給が必要ですか？",
          "a": "はい、12 枚支給いただければデザイナーがカレンダーにレイアウト（無料・3 案まで）。写真スタジオ提携プランもあり。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 7 営業日、特急 3〜5 営業日。繁忙期（10-11 月）は 14-21 営業日かかる場合がございます。早めのご注文推奨。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "",
      "ja": "海報的最大尺寸可以做到多大？"
    }
  },
  "a1-posters": {
    "name": {
      "zh-hk": "A1大幅海報",
      "en": "A1 Large Posters",
      "ja": "A1大型ポスター"
    },
    "seo": 
        "title": "A1大幅海報印刷 | 展覽背板 演唱會海報 | 智印雲 ZprintPro 香港本地印刷",
        "description": "A1 大幅海報印刷 100 張起, 採用 200g 以上銅版紙或相紙, 配合四色柯式印刷, 適合展覽背板、演唱會海報、商場展覽、藝廊開幕。預留 3 毫米出血, 急件可拆數碼快印與裱貼分段排程。48 小時快遞。**智印雲 香港本地印刷**。",
        
        "h1": "A1大幅海報",
        "keywords": ["A1 大幅海報", "A1 海報", "海報印刷", "展覽背板", "演唱會海報", "商場海報"],
        "body": " strong visual impact. Perfect for exhibitions"
     {
        "title": "マグネットカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたマグネットカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "マグネットカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "マグネットカレンダー",
          "マグネットカレンダー 印刷",
          "マグネットカレンダー 小ロット",
          "マグネットカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）マグネットカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }r exhibitions"
      },
      "en": {
        "title": "A1 Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom a1 posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design support. M",
        "h1": "A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。智印雲提供專業A1大幅海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["a1 posters", "custom a1 posters", "a1 posters printing hong kong"],
        "body": " venue decoration. ZprintPro offers professional A1 Large Posters services in Hong Kong. High quality"
      },
      "ja": {
        "title": "フォトフレームカレンダー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の企業ギフト・家庭向けに最適化されたフォトフレームカレンダー。10 部から対応、A5/A4/卓上/カスタムサイズ。JA 祝日完全準拠・六曜表示オプション対応。箔押し・スポット UV・マグネット仕様。香港自社工場から日本全国へ最短 5-7 営業日配送。",
        "h1": "フォトフレームカレンダー 10部〜 | JA 祝日",
        "keywords": [
          "フォトフレームカレンダー",
          "フォトフレームカレンダー 印刷",
          "フォトフレームカレンダー 小ロット",
          "フォトフレームカレンダー 即日",
          "カレンダー 印刷",
          "卓上 カレンダー",
          "壁掛け カレンダー",
          "フォトフレーム カレンダー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フォトフレームカレンダーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "",
      "en": "海報的最大尺寸可以做到多大？",
      "ja": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。"
    }
  },
  "outdoor-posters": {
    "name": {
      "zh-hk": "戶外海報",
      "en": "Outdoor Posters",
      "ja": "屋外ポスター"
    },
    "seo": 
        "title": "戶外防水海報印刷 | UV耐候 工地告示3-6月 | 智印雲 ZprintPro 香港本地",
        "description": "戶外防水海報印刷 100 張起, 採用 PVC/PET/戶外合成紙, 配合耐候墨水如 UV 固化或環保溶劑, 戶外耐候 3-6 個月。適合工地告示、社區宣傳欄、巴士站、廣告燈箱。可選霧面降低反光, 邊緣可覆護膜。**智印雲 香港本地印刷**。",
        
        "h1": "戶外海報",
        "keywords": ["戶外海報", "防水海報", "UV 耐候海報", "工地告示", "社區宣傳欄", "巴士站海報"],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
     {
        "title": "ラミネートメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたラミネートメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ラミネートメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ラミネートメニュー",
          "ラミネートメニュー 印刷",
          "ラミネートメニュー 小ロット",
          "ラミネートメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ラミネートメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Outdoor Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom outdoor posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印雲提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor posters", "custom outdoor posters", "outdoor posters printing hong kong"],
        "body": " transparent pricing"
      "seo": " transparent pricing"
     {
        "title": "高級メニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された高級メニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "高級メニュー 1部〜 | 防水 ハード",
        "keywords": [
          "高級メニュー",
          "高級メニュー 印刷",
          "高級メニュー 小ロット",
          "高級メニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）高級メニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "ja": {
        "title": "PVCメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたPVCメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "PVCメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "PVCメニュー",
          "PVCメニュー 印刷",
          "PVCメニュー 小ロット",
          "PVCメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）PVCメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "display-posters": {
    "name": {
      "zh-hk": "展架海報",
      "en": "Display Posters",
      "ja": "展示用ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "展架海報印刷 | X展架 易拉寶畫面 100張 | 智印雲 ZprintPro 香港本地",
        "description": "展架海報印刷 100 張起, 採用 200g 銅版紙或相紙, 配合四色柯式印刷, 適合 X 展架、易拉寶畫面、商場展架及展會海報。可選 PP 冷裱護膜, 尺寸標準 60×160cm 或 80×180cm。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印雲提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["展架海報", "X 展架", "易拉寶畫面", "展會海報", "商場展架", "活動背板"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom display posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design suppo",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": ["display posters", "custom display posters", "display posters printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化されたドリンクメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "ドリンクメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo": [
          "ドリンクメニュー",
          "ドリンクメニュー 印刷",
          "ドリンクメニュー 小ロット",
          "ドリンクメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ドリンクメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "使い捨てメニュー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のレストラン・ホテル向けに最適化された使い捨てメニュー。1 部から対応、PVC/ラミネート/ハードカバー 3 種類。防水・耐油・アルコール消毒対応、中身差替オプション。香港自社工場から日本全国へ最短 7-10 営業日配送。 30秒無料見積もり受付中。",
        "h1": "使い捨てメニュー 1部〜 | 防水 ハード",
        "keywords": [
          "使い捨てメニュー",
          "使い捨てメニュー 印刷",
          "使い捨てメニュー 小ロット",
          "使い捨てメニュー 即日",
          "メニュー 印刷",
          "メニュー 表紙",
          "防水 メニュー",
          "ハードカバー メニュー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）使い捨てメニューは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "メニューの最小注文数は何部からですか？",
          "a": "PVC メニュー 1 部から、ハードカバー精裝メニュー 5 部から対応。チェーン店一括 100 部まで対応可能。"
        },
        {
          "q": "防水・耐油のメニューは作れますか？",
          "a": "はい、PVC フィルム + UV 印刷で防水・耐油・耐摩耗。湿布で拭き取り可能。ラーメン・中華・ファストフード店に最適。"
        },
        {
          "q": "中身差替できるメニューは作れますか？",
          "a": "はい、リング式・ポケット式の中綴じオプション対応。季節ごとのメニュー差し替えでコスト削減。"
        },
        {
          "q": "ハードカバー精裝メニューに対応していますか？",
          "a": "はい、無線綴じ/糸綴じから選択、16-64 頁まで対応。箔押し・エンボス・スポット UV で最高峰仕上げ。"
        },
        {
          "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
        "seo":     "q": "QR コード印刷はできますか？",
          "a": "はい、オンライン注文 QR コード印刷対応。ドリンクメニュー・単ページ・折りたたみデザインに組み込み可能。"
       {
        "title": "屋外バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された屋外バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "屋外バナー 1枚〜 | 5m 大判",
        "keywords": [
          "屋外バナー",
          "屋外バナー 印刷",
          "屋外バナー 小ロット",
          "屋外バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）屋外バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "使い捨てメニュー（低コスト大量配布）は作れますか？",
          "a": "はい、100g-120g 書籍紙 + 4 色デジタル印刷で低コスト。ファストフード・フードフェスティバル・仮設屋台向け。"
        },
        {
          "q": "データ形式は何が良いですか？",
          "a": "InDesign / Illustrator / PDF 推奨。写真は 350dpi 以上の高解像度 TIFF/PSD/PDF。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。100 部以上の大量印刷は 14-21 営業日。ハードカバー精裝は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "en": "海報適合戶外使用嗎？",
      "ja": "我們提供戶外防水防曬材質，適合長期戶外展示。"
    }
  },
  "art-posters": {
    "name": {
      "zh-hk": "藝術海報",
      "en": "Art Posters",
      "ja": "アートポスター"
    },
    "seo": {
      "zh-hk": {
        "title": "藝術海報微噴印刷 | 無酸紙 收藏級 畫廊 | 智印雲 ZprintPro 香港本地印刷",
        "description": "藝術海報微噴印刷 100 張起, 採用無酸紙或藝術紙, 配合高解析度 12 色微噴技術, 收藏級品質。適合畫廊展覽、攝影師作品、藝術家複製畫及限量版海報。色彩還原精準, 100 年不褪色。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["藝術海報", "藝術微噴", "無酸紙海報", "收藏級海報", "畫廊海報", "攝影展海報"],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {00, 2-3 day production."
      },
      "ja": {
        "title": "アートポスター | 防水 翌日配送 | ZprintPro",
        "description": "アートポスターのアートポスターは ZprintPro にお任せ。157g-300g コート紙/PP/写真用紙 高品質用紙、A1/A2/A3/A4 各種対応。4色 CMYK 印刷、デザイン自由。10枚〜〜、翌日-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " high color accuracy. Perfect for art exhibitions",
        "keywords": ["アートポスター", "アートポスター 印刷", "art posters"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "高級アート紙、高い色再現性。美術展、写真作品に最適。 ZprintProは香港でアートポスターサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業藝術海報服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印雲提供專業的藝術海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "adhesive-posters": {
    "name": {
      "zh-hk": "背膠海報",
      "en": "Adhesive Posters",
      "ja": "粘着ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "背膠海報印刷 | 可移背膠 櫥窗玻璃貼 | 智印雲 ZprintPro 香港本地印刷",
        "description": "背膠海報印刷 100 張起, 採用車貼、灰膠可移、透明膜或帶導氣槽底紙等材質, 適合櫥窗全貼、牆面主視覺、短期活動佈置。可選霧面降低反光, 雙面貼玻璃可形成內外雙視覺效果。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。智印雲提供專業背膠海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["背膠海報", "自粘海報", "可移背膠", "櫥窗貼海報", "玻璃貼海報", "短期活動貼"],
        "body": " wall decoration. ZprintPro offers professional Adhesive Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Adhesive Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom adhesive posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design supp",
        "h1": "Self-adhesive",
        "keywords": ["adhesive posters", "custom adhesive posters", "adhesive posters printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "粘着バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された粘着バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着バナー 1枚〜 | 5m 大判",
        "keywords": [
          "粘着バナー",
          "粘着バナー 印刷",
          "粘着バナー 小ロット",
          "粘着バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "Adhesive posters on vinyl with peel-and-stick backing for windows, walls, and vehicles — ZprintPro",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "gift-boxes": {
    "name": {
      "zh-hk": "禮品盒定制",
      "en": "Gift Boxes",
      "ja": "ギフトボックス"
    },
    "seo": 
      "zh-hk": {
        "title": "禮品盒訂製印刷 | 燙金壓凹 內托可選 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品盒訂製印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 適合高端產品包裝、珠寶、奢侈品、月餅禮盒。可加燙金、壓凹、局部光油、磁吸開合。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品盒定制",
        "keywords": ["禮品盒", "禮盒訂製", "禮物盒訂製", "定制禮盒", "燙金禮盒", "內托包裝"],
        "body": " UV and other processes. ZprintPro offers professional Gift Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Gift Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom gift boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。智印雲提供專業禮品盒定制服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["gift boxes", "custom gift boxes", "gift boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カーラッピング印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたカーラッピング。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "カーラッピング 1枚〜 | 5m 大判",
        "keywords": [
          "カーラッピング",
          "カーラッピング 印刷",
          "カーラッピング 小ロット",
          "カーラッピング 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カーラッピングは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        "seo": 
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
       {
        "title": "カタログ印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたカタログ印刷。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "カタログ印刷 1冊〜 | 4方式 製本",
        "keywords": [
          "カタログ印刷",
          "カタログ印刷 印刷",
          "カタログ印刷 小ロット",
          "カタログ印刷 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カタログ印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "Custom gift boxes in rigid setup with magnetic closure and foil-stamped logos — ZprintPro",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "cosmetic-boxes": {
    "name": {
      "zh-hk": "化妝品盒",
      "en": "Cosmetic Boxes",
      "ja": "化粧品箱"
    },
    "seo": 
      "zh-hk": {
        "title": "化妝品盒印刷 | EVA內托 美妝護膚品牌 | 智印雲 ZprintPro 香港本地印刷",
        "description": "化妝品盒印刷 100 個起, 採用 350g 白卡紙外裱特種紙, EVA 海棉內托, 適合護膚品、彩妝、香水及美妝品牌。可加燙金、UV、局部光油, 通過 SGS 食品接觸安全認證。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "化妝品盒",
        "keywords": ["化妝品盒", "護膚品盒", "美妝包裝盒", "彩妝包裝", "EVA 內托", "高端化妝品盒"],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom cosmetic boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. M",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印雲提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["cosmetic boxes", "custom cosmetic boxes", "cosmetic boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "メッシュバナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたメッシュバナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "メッシュバナー 1枚〜 | 5m 大判",
        "keywords": [
          "メッシュバナー",
          "メッシュバナー 印刷",
          "メッシュバナー 小ロット",
          "メッシュバナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）メッシュバナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "Food-grade packaging boxes on 350g-400g white card with PE or PLA biodegradable lining — ZprintPro",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {
        "title": "Food Boxes 100+ | Food-Grade | Free US Ship | ZprintPro",
        "description": "Food boxes for pastries. 350g-400g food-grade card, PE/PLA lining. 100-MOQ, grease resistant. Free US shipping over "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, DHL. FDA, LFGB, SGS. Get a quote.",
        "h1": "Food Boxes 100+ | Food-Grade | ZprintPro",
        "keywords": ["food boxes","custom food boxes","food packaging boxes","food grade boxes","takeout boxes custom","bakery boxes wholesale","food boxes free shipping","bulk food packaging","food boxes USD","bespoke food packaging"],
        "body": "ZprintPro Custom Food Packaging Box Printing for pastries, tea, health supplements, and gift packaging across the US and global markets. 350g-400g food-grade white card with PE or PLA biodegradable lining, window design, and foil-stamped logos. 100-box MOQ, Free US shipping over "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, FDA, LFGB, SGS certified."
      
      },
      "ja": {
        "title": "粘着バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された粘着バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着バナー 1枚〜 | 5m 大判",
        "keywords": [
          "粘着バナー",
          "粘着バナー 印刷",
          "粘着バナー 小ロット",
          "粘着バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "gift-boxes": {
    "name": {
      "zh-hk": "禮品盒定制",
      "en": "Gift Boxes",
      "ja": "ギフトボックス"
    },
    "seo": 
      "zh-hk": {
        "title": "禮品盒訂製印刷 | 燙金壓凹 內托可選 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品盒訂製印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 適合高端產品包裝、珠寶、奢侈品、月餅禮盒。可加燙金、壓凹、局部光油、磁吸開合。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品盒定制",
        "keywords": ["禮品盒", "禮盒訂製", "禮物盒訂製", "定制禮盒", "燙金禮盒", "內托包裝"],
        "body": " UV and other processes. ZprintPro offers professional Gift Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Gift Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom gift boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。智印雲提供專業禮品盒定制服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["gift boxes", "custom gift boxes", "gift boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カーラッピング印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたカーラッピング。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "カーラッピング 1枚〜 | 5m 大判",
        "keywords": [
          "カーラッピング",
          "カーラッピング 印刷",
          "カーラッピング 小ロット",
          "カーラッピング 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カーラッピングは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        "seo": 
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
       {
        "title": "カタログ印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたカタログ印刷。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "カタログ印刷 1冊〜 | 4方式 製本",
        "keywords": [
          "カタログ印刷",
          "カタログ印刷 印刷",
          "カタログ印刷 小ロット",
          "カタログ印刷 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カタログ印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "Custom gift boxes in rigid setup with magnetic closure and foil-stamped logos — ZprintPro",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "cosmetic-boxes": {
    "name": {
      "zh-hk": "化妝品盒",
      "en": "Cosmetic Boxes",
      "ja": "化粧品箱"
    },
    "seo": 
      "zh-hk": {
        "title": "化妝品盒印刷 | EVA內托 美妝護膚品牌 | 智印雲 ZprintPro 香港本地印刷",
        "description": "化妝品盒印刷 100 個起, 採用 350g 白卡紙外裱特種紙, EVA 海棉內托, 適合護膚品、彩妝、香水及美妝品牌。可加燙金、UV、局部光油, 通過 SGS 食品接觸安全認證。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "化妝品盒",
        "keywords": ["化妝品盒", "護膚品盒", "美妝包裝盒", "彩妝包裝", "EVA 內托", "高端化妝品盒"],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom cosmetic boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. M",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印雲提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["cosmetic boxes", "custom cosmetic boxes", "cosmetic boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "メッシュバナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたメッシュバナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "メッシュバナー 1枚〜 | 5m 大判",
        "keywords": [
          "メッシュバナー",
          "メッシュバナー 印刷",
          "メッシュバナー 小ロット",
          "メッシュバナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）メッシュバナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, DHL Express. CMYK + white ink option.",
        "h1": "Adhesive Posters 50+ | Vinyl Decals | ZprintPro",
        "keywords": ["adhesive posters","peel and stick posters","window decals","wall stickers custom","vinyl posters","vehicle decals","removable wall art","adhesive posters free shipping","bulk adhesive prints","bespoke wall murals"],
        "body": "ZprintPro Adhesive Poster Printing for retail windows, vehicle advertising, event signage, corporate offices, restaurants, real estate, and home decor across US and global markets. White vinyl, clear vinyl, translucent vinyl, or fabric wallpaper with CMYK + white ink option. 50-poster MOQ, Free US shipping over "adhesive-posters": {
    "name": {
      "zh-hk": "背膠海報",
      "en": "Adhesive Posters",
      "ja": "粘着ポスター"
    },
    "seo": 
      "zh-hk": {
        "title": "背膠海報印刷 | 可移背膠 櫥窗玻璃貼 | 智印雲 ZprintPro 香港本地印刷",
        "description": "背膠海報印刷 100 張起, 採用車貼、灰膠可移、透明膜或帶導氣槽底紙等材質, 適合櫥窗全貼、牆面主視覺、短期活動佈置。可選霧面降低反光, 雙面貼玻璃可形成內外雙視覺效果。48 小時快遞。**智印雲 香港本地印刷**。",
        "h1": "自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。智印雲提供專業背膠海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["背膠海報", "自粘海報", "可移背膠", "櫥窗貼海報", "玻璃貼海報", "短期活動貼"],
        "body": " wall decoration. ZprintPro offers professional Adhesive Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Adhesive Posters | Waterproof Same-Day Delivery | ZprintPro",
        "description": "Custom adhesive posters from ZprintPro Hong Kong. Premium 157g-300g coated/PP/photo paper, multiple A1/A2/A3/A4 options. 4-color CMYK printing, full design supp",
        "h1": "Self-adhesive",
        "keywords": ["adhesive posters", "custom adhesive posters", "adhesive posters printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "粘着バナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化された粘着バナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "粘着バナー 1枚〜 | 5m 大判",
        "keywords": [
          "粘着バナー",
          "粘着バナー 印刷",
          "粘着バナー 小ロット",
          "粘着バナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）粘着バナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "海報的最大尺寸可以做到多大？",
      "en": "我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。",
      "ja": "海報適合戶外使用嗎？"
    }
  },
  "gift-boxes": {
    "name": {
      "zh-hk": "禮品盒定制",
      "en": "Gift Boxes",
      "ja": "ギフトボックス"
    },
    "seo": 
      "zh-hk": {
        "title": "禮品盒訂製印刷 | 燙金壓凹 內托可選 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品盒訂製印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 適合高端產品包裝、珠寶、奢侈品、月餅禮盒。可加燙金、壓凹、局部光油、磁吸開合。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品盒定制",
        "keywords": ["禮品盒", "禮盒訂製", "禮物盒訂製", "定制禮盒", "燙金禮盒", "內托包裝"],
        "body": " UV and other processes. ZprintPro offers professional Gift Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Gift Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom gift boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。智印雲提供專業禮品盒定制服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["gift boxes", "custom gift boxes", "gift boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カーラッピング印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたカーラッピング。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "カーラッピング 1枚〜 | 5m 大判",
        "keywords": [
          "カーラッピング",
          "カーラッピング 印刷",
          "カーラッピング 小ロット",
          "カーラッピング 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カーラッピングは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        "seo": 
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
       {
        "title": "カタログ印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたカタログ印刷。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "カタログ印刷 1冊〜 | 4方式 製本",
        "keywords": [
          "カタログ印刷",
          "カタログ印刷 印刷",
          "カタログ印刷 小ロット",
          "カタログ印刷 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カタログ印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "Custom gift boxes in rigid setup with magnetic closure and foil-stamped logos — ZprintPro",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "cosmetic-boxes": {
    "name": {
      "zh-hk": "化妝品盒",
      "en": "Cosmetic Boxes",
      "ja": "化粧品箱"
    },
    "seo": 
      "zh-hk": {
        "title": "化妝品盒印刷 | EVA內托 美妝護膚品牌 | 智印雲 ZprintPro 香港本地印刷",
        "description": "化妝品盒印刷 100 個起, 採用 350g 白卡紙外裱特種紙, EVA 海棉內托, 適合護膚品、彩妝、香水及美妝品牌。可加燙金、UV、局部光油, 通過 SGS 食品接觸安全認證。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "化妝品盒",
        "keywords": ["化妝品盒", "護膚品盒", "美妝包裝盒", "彩妝包裝", "EVA 內托", "高端化妝品盒"],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom cosmetic boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. M",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印雲提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["cosmetic boxes", "custom cosmetic boxes", "cosmetic boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "メッシュバナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたメッシュバナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "メッシュバナー 1枚〜 | 5m 大判",
        "keywords": [
          "メッシュバナー",
          "メッシュバナー 印刷",
          "メッシュバナー 小ロット",
          "メッシュバナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）メッシュバナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, free installation guide."
      
      
      },
      "ja": {
        "title": "カーラッピング印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたカーラッピング。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "カーラッピング 1枚〜 | 5m 大判",
        "keywords": [
          "カーラッピング",
          "カーラッピング 印刷",
          "カーラッピング 小ロット",
          "カーラッピング 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カーラッピングは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        "seo": 
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
       {
        "title": "カタログ印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたカタログ印刷。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "カタログ印刷 1冊〜 | 4方式 製本",
        "keywords": [
          "カタログ印刷",
          "カタログ印刷 印刷",
          "カタログ印刷 小ロット",
          "カタログ印刷 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カタログ印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "Custom mailer boxes with self-locking tuck-front design, kraft or full-color print — ZprintPro",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "cosmetic-boxes": {
    "name": {
      "zh-hk": "化妝品盒",
      "en": "Cosmetic Boxes",
      "ja": "化粧品箱"
    },
    "seo": 
      "zh-hk": {
        "title": "化妝品盒印刷 | EVA內托 美妝護膚品牌 | 智印雲 ZprintPro 香港本地印刷",
        "description": "化妝品盒印刷 100 個起, 採用 350g 白卡紙外裱特種紙, EVA 海棉內托, 適合護膚品、彩妝、香水及美妝品牌。可加燙金、UV、局部光油, 通過 SGS 食品接觸安全認證。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "化妝品盒",
        "keywords": ["化妝品盒", "護膚品盒", "美妝包裝盒", "彩妝包裝", "EVA 內托", "高端化妝品盒"],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom cosmetic boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. M",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印雲提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["cosmetic boxes", "custom cosmetic boxes", "cosmetic boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "メッシュバナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたメッシュバナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "メッシュバナー 1枚〜 | 5m 大判",
        "keywords": [
          "メッシュバナー",
          "メッシュバナー 印刷",
          "メッシュバナー 小ロット",
          "メッシュバナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）メッシュバナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, DHL. FSC. Get a quote.",
        "h1": "Gift Boxes 100+ | Rigid Magnetic | ZprintPro",
        "keywords": ["custom gift boxes","rigid gift boxes","folding carton boxes","magnetic closure boxes","luxury gift boxes","foil stamped gift boxes","premium packaging","gift boxes free shipping","bulk gift boxes","bespoke gift packaging"],
        "body": "ZprintPro Custom Gift Box Printing for jewelry, cosmetics, gourmet food, spirits, and corporate gifting across US and global markets. Rigid setup, folding carton, magnetic closure with foil stamping, embossing, and inside printing. 100-box MOQ, Free US shipping over "gift-boxes": {
    "name": {
      "zh-hk": "禮品盒定制",
      "en": "Gift Boxes",
      "ja": "ギフトボックス"
    },
    "seo": 
      "zh-hk": {
        "title": "禮品盒訂製印刷 | 燙金壓凹 內托可選 | 智印雲 ZprintPro 香港本地印刷",
        "description": "禮品盒訂製印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 適合高端產品包裝、珠寶、奢侈品、月餅禮盒。可加燙金、壓凹、局部光油、磁吸開合。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "禮品盒定制",
        "keywords": ["禮品盒", "禮盒訂製", "禮物盒訂製", "定制禮盒", "燙金禮盒", "內托包裝"],
        "body": " UV and other processes. ZprintPro offers professional Gift Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Gift Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom gift boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。智印雲提供專業禮品盒定制服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["gift boxes", "custom gift boxes", "gift boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カーラッピング印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたカーラッピング。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "カーラッピング 1枚〜 | 5m 大判",
        "keywords": [
          "カーラッピング",
          "カーラッピング 印刷",
          "カーラッピング 小ロット",
          "カーラッピング 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カーラッピングは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "バナーの最小注文数は何枚からですか？",
          "a": "屋外大型バナー 1 枚から対応。ロールアップバナーは 1 台から。大量発注（10 枚以上）で割引対応。"
        },
        {
          "q": "最大サイズはどのくらいですか？",
          "a": "継ぎ目なしで最大 5m×10m まで対応。それ以上のサイズはオーバーラップ接合で納品。"
        },
        {
          "q": "屋外耐久性はどのくらいですか？",
          "a": "厚手塩ビターポリン（440g/510g）で 3 年以上の色持ち。UV カットインクジェット + 顔料インクで直射日光下でも耐久。"
        },
        {
          "q": "メッシュターポリンに対応していますか？",
          "a": "はい、開孔率 30-40% のメッシュターポリン対応。風透過で強風時の負荷軽減、建築現場の仮囲いに最適。"
        },
        {
          "q": "ロールアップバナーは付属していますか？",
          "a": "はい、アルミ製軽量スタンド + キャリーバッグ標準付属。組み立て 1 人 3-5 分。展示会・セミナー会場に最適。"
        },
        {
          "q": "ハトメ加工は標準ですか？",
          "a": "はい、4 隅 + 中央 2 点の合計 6 点ハトメ加工が標準料金に含まれます。位置変更も無料で対応可能。"
        },
        {
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
        "seo": 
          "q": "車ラッピングに対応していますか？",
          "a": "はい、キャストグレード高分子 PVC ビニール + エアリリース溝で車体曲面に密着。フルラッピング・部分デカール対応。"
       {
        "title": "カタログ印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたカタログ印刷。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "カタログ印刷 1冊〜 | 4方式 製本",
        "keywords": [
          "カタログ印刷",
          "カタログ印刷 印刷",
          "カタログ印刷 小ロット",
          "カタログ印刷 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カタログ印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }        },
        {
          "q": "納期はどのくらいですか？",
          "a": "データ確定後、最短 5 営業日で出荷。10 平方フィート以上の大型印刷は 7-10 営業日。北海道・沖縄はさらに 1-2 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "cosmetic-boxes": {
    "name": {
      "zh-hk": "化妝品盒",
      "en": "Cosmetic Boxes",
      "ja": "化粧品箱"
    },
    "seo": 
      "zh-hk": {
        "title": "化妝品盒印刷 | EVA內托 美妝護膚品牌 | 智印雲 ZprintPro 香港本地印刷",
        "description": "化妝品盒印刷 100 個起, 採用 350g 白卡紙外裱特種紙, EVA 海棉內托, 適合護膚品、彩妝、香水及美妝品牌。可加燙金、UV、局部光油, 通過 SGS 食品接觸安全認證。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "化妝品盒",
        "keywords": ["化妝品盒", "護膚品盒", "美妝包裝盒", "彩妝包裝", "EVA 內托", "高端化妝品盒"],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom cosmetic boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. M",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印雲提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["cosmetic boxes", "custom cosmetic boxes", "cosmetic boxes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "メッシュバナー印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の建設・イベント・展示会向けに最適化されたメッシュバナー。1 枚から対応、最大 5m×10m 継ぎ目なし。塩ビ・メッシュターポリン対応、UV カット印刷で 3 年屋外耐久。香港自社工場から日本全国へ最短 5-7 営業日配送。 30秒無料見積もり受付中。",
        "h1": "メッシュバナー 1枚〜 | 5m 大判",
        "keywords": [
          "メッシュバナー",
          "メッシュバナー 印刷",
          "メッシュバナー 小ロット",
          "メッシュバナー 即日",
          "バナー 印刷",
          "屋外 バナー",
          "ロールアップ バナー",
          "メッシュ バナー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）メッシュバナーは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "food-boxes": {
    "name": {
      "zh-hk": "食品包裝盒",
      "en": "Food Boxes",
      "ja": "食品包装箱"
    },
    "seo": 
        "title": "食品包裝盒印刷 | SGS食品級 PE淋膜 | 智印雲 ZprintPro 香港本地印刷",
        "description": "食品包裝盒印刷 100 個起, 採用 300g 白卡紙 + PE 淋膜, 通過 SGS 食品接觸安全認證, 適合蛋糕、茶葉、月餅、烘焙產品。防水防油, 支援燙金、UV、壓凹工藝。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印雲提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["食品包裝盒", "蛋糕盒", "茶葉盒", "月餅盒", "PE 淋膜", "食品級包裝"],
        "body": " transparent pricing"
     {
        "title": "無線綴じ本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された無線綴じ本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "無線綴じ本 1冊〜 | 4方式 製本",
        "keywords": [
          "無線綴じ本",
          "無線綴じ本 印刷",
          "無線綴じ本 小ロット",
          "無線綴じ本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）無線綴じ本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Food Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom food boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "Food-grade material",
        "keywords": ["food boxes", "custom food boxes", "food boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "中綴じ冊子印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された中綴じ冊子。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "中綴じ冊子 1冊〜 | 4方式 製本",
        "keywords": [
          "中綴じ冊子",
          "中綴じ冊子 印刷",
          "中綴じ冊子 小ロット",
          "中綴じ冊子 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）中綴じ冊子は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "書籍の最小注文数は何冊からですか？",
          "a": "同人誌・卒業アルバム 1 部から対応。企業記念誌は 50 冊から。大量発注（100 冊以上）で 15-25% オフ。"
        },
        {
          "q": "製本方式は何が選べますか？",
          "a": "中綴じ（8-64 頁）・無線綴じ（64-400 頁）・糸綴じ（16-200 頁）・PUR 製本・ハードカバーから選択可能。"
        },
        {
          "q": "本文用紙は何が選べますか？",
          "a": "上質紙 90g、書籍用紙、高級アート紙、写真用紙（半光沢）など。用紙選択で価格と質感を調整可能。"
        },
        {
          "q": "表紙の特殊加工はできますか？",
          "a": "はい、箔押し（金・銀・銅 + 特殊箔）・エンボス/デボス・スポット UV・マット/光沢 PP ラミネート対応。"
        },
        {
          "q": "リングノートは作れますか？",
          "a": "はい、YO リングまたは金属スパイラル綴じで 180 度開いて書ける。表紙 200g コート紙のラミネートまたは透明 PP。"
        },
        {
          "q": "色校正はできますか？",
          "a": "はい、本機色校正（有償）とデジタル色校正（無償）から選択可能。色再現にご不安がある場合も安心です。"
        },
        {
          "q": "同人誌印刷に対応していますか？",
          "a": "はい、コミケ・即売会向けに最適化された中綴じ冊子対応。8-64 ページの薄本冊子に最適。128g〜157g 上質紙またはコート紙。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "同人誌・卒業アルバム 7 営業日。企業記念誌・年鑑 14-21 営業日。ハードカバー精装書籍は最短 10 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "mailer-boxes": {
    "name": {
      "zh-hk": "快遞盒/飛機盒",
      "en": "Mailer Boxes",
      "ja": "発送箱"
    },
    "seo": 
      "zh-hk": {
        "title": "郵寄盒印刷 | 飛機盒 E坑雙層 電商首選 | 智印雲 ZprintPro 香港本地",
        "description": "郵寄盒印刷 100 個起, 採用雙層或單層瓦楞紙板, 配合四色柯式印刷, 紙質堅固耐壓, 內襯緩衝抗震。適合電商物流、跨境電商倉儲棧板堆疊。可加 EVA 海棉、感謝卡。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "快遞盒/飛機盒",
        "keywords": ["郵寄盒", "飛機盒", "電商快遞盒", "瓦楞彩盒", "E 坑雙層", "緩衝抗震"],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      "seo":      {
        "title": "リングノート印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化されたリングノート。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "リングノート 1冊〜 | 4方式 製本",
        "keywords": [
          "リングノート",
          "リングノート 印刷",
          "リングノート 小ロット",
          "リングノート 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）リングノートは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
      "en": {00, FSC certified, free dieline design."
      
      },
      "ja": {
        "title": "上製本印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の同人誌・企業向けに最適化された上製本。1 冊から対応、中綴じ/無線綴じ/糸綴じ/ハードカバー 4 種類。箔押し・エンボス・スポット UV 対応。香港自社工場から日本全国へ最短 7-10 営業日配送。FSC 認証紙採用。 30秒無料見積もり受付中。",
        "h1": "上製本 1冊〜 | 4方式 製本",
        "keywords": [
          "上製本",
          "上製本 印刷",
          "上製本 小ロット",
          "上製本 即日",
          "カタログ 印刷",
          "同人誌 印刷",
          "無線綴じ",
          "ハードカバー 書籍",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）上製本は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "頑丈で耐久性があり、EC発送の第一選択。 ZprintProは香港で発送箱サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業快遞盒/飛機盒服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "堅固耐用，電商發貨首選，支持印刷即日速遞送貨。可印品牌Logo，提升開箱體驗。智印雲提供專業的快遞盒/飛機盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "包裝盒的最小訂購量是多少？",
      "en": "一般為100個起訂，定制盒型需500個起。",
      "ja": "可以定制包裝盒的尺寸和結構嗎？"
    }
  },
  "folding-boxes": {
    "name": {
      "zh-hk": "折疊盒",
      "en": "Folding Boxes",
      "ja": "折りたたみ箱"
    },
    "seo": 
      "zh-hk": {
        "title": "折疊禮盒印刷 | 自動鎖底 平板倉儲省空間 | 智印雲 ZprintPro 香港本地",
        "description": "折疊禮盒印刷 100 個起, 採用 300g 白卡紙, 自動鎖底結構, 平板出貨節省 70% 倉位, 組裝簡易。適合禮品、化妝品、食品包裝。免費結構設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印雲提供專業折疊盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["折疊禮盒", "折疊盒", "平板盒", "自動鎖底盒", "倉儲省空間", "組裝簡易"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Folding Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom folding boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MO",
        "h1": "Foldable design",
        "keywords": ["folding boxes", "custom folding boxes", "folding boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ビジネス封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたビジネス封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "ビジネス封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "ビジネス封筒",
          "ビジネス封筒 印刷",
          "ビジネス封筒 小ロット",
          "ビジネス封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ビジネス封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "封筒の最小注文数は何枚からですか？",
          "a": "ビジネス封筒 100 枚から対応。箔押し招待状 50 枚から。大量発注（1,000 枚以上）で 15-25% オフ。"
        "seo": {
        "title": "カラー封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたカラー封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "カラー封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "カラー封筒",
          "カラー封筒 印刷",
          "カラー封筒 小ロット",
          "カラー封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カラー封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "窓付き封筒は作れますか？",
          "a": "はい、窓付き封筒対応。請求・見積・法務文書用に最適。書簡照合可能で業務効率向上。"
        },
        {
          "q": "箔押し封筒に対応していますか？",
          "a": "はい、金箔・銀箔・銅箔・黒箔対応。結婚式披露宴・表彰状・株主総会招集通知・VIP 案内状に最適。"
        },
        {
          "q": "カラー封筒は作れますか？",
          "a": "はい、オフセット 4 色/特色印刷対応。特殊紙（和紙風/クラフト/ペルーラ/ケント紙）にフルカラー印刷。"
        },
        {
          "q": "宛名印刷はできますか？",
          "a": "はい、Excel リストをご支給いただければ、印刷・封入まで一括対応可能（有償）。大量宛名印刷も効率的に処理。"
        },
        {
          "q": "大判封筒（A4 折らず）は作れますか？",
          "a": "はい、C4 等の 100-120g でコシを確保。A4 を折らずに入れられる。永久糊または剥離式で開封性向上。"
        },
        {
          "q": "パール封筒は対応していますか？",
          "a": "はい、微細な輝きで高級感演出。結婚招待・発表会返信・VIP 券封用に最適。細い箔枠やエンボスと相性良好。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5 営業日、特急 2〜3 営業日。500 枚以上の大量発注や宛名印刷込みは 7〜10 営業日。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "Folding carton boxes with tuck-end or auto-lock bottom, 350-400g art card or kraft — ZprintPro",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "rigid-boxes": {
    "name": {
      "zh-hk": "精裝盒",
      "en": "Rigid Boxes",
      "ja": "上製本箱"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝禮盒印刷 | 1200g灰板 磁吸開合 高檔 | 智印雲 ZprintPro 香港本地",
        "description": "精裝禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 開盒有儀式感。可加燙金、局部光油、壓凹、磁吸開合。灰板通過 FSC 認證, 聖誕新年高端禮品首選。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印雲提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝禮盒", "硬紙板盒", "1200g 灰板盒", "磁吸開合", "高檔禮盒", "奢侈品包裝"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Rigid Boxes | Luxury Setup | Free US Ship | ZprintPro",
        "description": "Luxury rigid setup boxes. 800-1500gsm greyboard, magnetic closure, leatherette. 250-MOQ. Free US shipping over "rigid-boxes": {
    "name": {
      "zh-hk": "精裝盒",
      "en": "Rigid Boxes",
      "ja": "上製本箱"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝禮盒印刷 | 1200g灰板 磁吸開合 高檔 | 智印雲 ZprintPro 香港本地",
        "description": "精裝禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 開盒有儀式感。可加燙金、局部光油、壓凹、磁吸開合。灰板通過 FSC 認證, 聖誕新年高端禮品首選。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印雲提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝禮盒", "硬紙板盒", "1200g 灰板盒", "磁吸開合", "高檔禮盒", "奢侈品包裝"],
        "body": " transparent pricing"
      },
      "en": {00, DHL Express. 10-15 day production. Quote.",
        "h1": "Rigid Boxes 250+ | Magnetic Closure | ZprintPro",
        "keywords": ["rigid boxes","rigid setup boxes","luxury packaging boxes","magnetic closure boxes","leatherette boxes","jewelry boxes","premium gift boxes","rigid boxes free shipping","bulk rigid boxes","bespoke rigid packaging"],
        "body": "ZprintPro Rigid Setup Box Printing for jewelry, watches, premium spirits, luxury cosmetics, gourmet food, and corporate awards across US and global markets. 800-1500gsm greyboard wrapped in art paper, specialty paper, or leatherette with foil, embossing, and magnetic closures. 250-box MOQ, Free US shipping over "rigid-boxes": {
    "name": {
      "zh-hk": "精裝盒",
      "en": "Rigid Boxes",
      "ja": "上製本箱"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝禮盒印刷 | 1200g灰板 磁吸開合 高檔 | 智印雲 ZprintPro 香港本地",
        "description": "精裝禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 開盒有儀式感。可加燙金、局部光油、壓凹、磁吸開合。灰板通過 FSC 認證, 聖誕新年高端禮品首選。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印雲提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝禮盒", "硬紙板盒", "1200g 灰板盒", "磁吸開合", "高檔禮盒", "奢侈品包裝"],
        "body": " transparent pricing"
      },
      "en": {00, 10-15 day production."
      
      },
      "ja": {
        "title": "ビジネス封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたビジネス封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "ビジネス封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "ビジネス封筒",
          "ビジネス封筒 印刷",
          "ビジネス封筒 小ロット",
          "ビジネス封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ビジネス封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "封筒の最小注文数は何枚からですか？",
          "a": "ビジネス封筒 100 枚から対応。箔押し招待状 50 枚から。大量発注（1,000 枚以上）で 15-25% オフ。"
        "seo": {
        "title": "カラー封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたカラー封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "カラー封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "カラー封筒",
          "カラー封筒 印刷",
          "カラー封筒 小ロット",
          "カラー封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カラー封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "窓付き封筒は作れますか？",
          "a": "はい、窓付き封筒対応。請求・見積・法務文書用に最適。書簡照合可能で業務効率向上。"
        },
        {
          "q": "箔押し封筒に対応していますか？",
          "a": "はい、金箔・銀箔・銅箔・黒箔対応。結婚式披露宴・表彰状・株主総会招集通知・VIP 案内状に最適。"
        },
        {
          "q": "カラー封筒は作れますか？",
          "a": "はい、オフセット 4 色/特色印刷対応。特殊紙（和紙風/クラフト/ペルーラ/ケント紙）にフルカラー印刷。"
        },
        {
          "q": "宛名印刷はできますか？",
          "a": "はい、Excel リストをご支給いただければ、印刷・封入まで一括対応可能（有償）。大量宛名印刷も効率的に処理。"
        },
        {
          "q": "大判封筒（A4 折らず）は作れますか？",
          "a": "はい、C4 等の 100-120g でコシを確保。A4 を折らずに入れられる。永久糊または剥離式で開封性向上。"
        },
        {
          "q": "パール封筒は対応していますか？",
          "a": "はい、微細な輝きで高級感演出。結婚招待・発表会返信・VIP 券封用に最適。細い箔枠やエンボスと相性良好。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5 営業日、特急 2〜3 営業日。500 枚以上の大量発注や宛名印刷込みは 7〜10 営業日。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "Rigid setup boxes with leatherette wrap, foil stamping, and magnetic closure for luxury packaging — ZprintPro",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "rigid-boxes": {
    "name": {
      "zh-hk": "精裝盒",
      "en": "Rigid Boxes",
      "ja": "上製本箱"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝禮盒印刷 | 1200g灰板 磁吸開合 高檔 | 智印雲 ZprintPro 香港本地",
        "description": "精裝禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 開盒有儀式感。可加燙金、局部光油、壓凹、磁吸開合。灰板通過 FSC 認證, 聖誕新年高端禮品首選。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印雲提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝禮盒", "硬紙板盒", "1200g 灰板盒", "磁吸開合", "高檔禮盒", "奢侈品包裝"],
        "body": " transparent pricing"
      },
      "en": {00, DHL Express. FSC, FDA food-safe. Order today.",
        "h1": "Folding Boxes 100+ | Auto-Lock | ZprintPro",
        "keywords": ["folding boxes","folding cartons","tuck end boxes","auto lock bottom boxes","retail packaging boxes","cosmetic boxes","food boxes folding","folding boxes free shipping","bulk folding boxes","bespoke folding cartons"],
        "body": "ZprintPro Folding Box Printing for cosmetics, pharmaceuticals, food and beverage, electronics, retail apparel, candles, and small goods across US and global markets. Tuck-end, reverse tuck-end, auto-lock bottom, pillow box, and sleeve box styles. 100-box MOQ, Free US shipping over "folding-boxes": {
    "name": {
      "zh-hk": "折疊盒",
      "en": "Folding Boxes",
      "ja": "折りたたみ箱"
    },
    "seo": 
      "zh-hk": {
        "title": "折疊禮盒印刷 | 自動鎖底 平板倉儲省空間 | 智印雲 ZprintPro 香港本地",
        "description": "折疊禮盒印刷 100 個起, 採用 300g 白卡紙, 自動鎖底結構, 平板出貨節省 70% 倉位, 組裝簡易。適合禮品、化妝品、食品包裝。免費結構設計, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印雲提供專業折疊盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["折疊禮盒", "折疊盒", "平板盒", "自動鎖底盒", "倉儲省空間", "組裝簡易"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Folding Boxes | Custom Luxury Packaging | ZprintPro",
        "description": "Custom folding boxes from ZprintPro Hong Kong. Premium White card/kraft/greyboard, multiple Custom sizes options. 4-color CMYK printing, full design support. MO",
        "h1": "Foldable design",
        "keywords": ["folding boxes", "custom folding boxes", "folding boxes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ビジネス封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたビジネス封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "ビジネス封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "ビジネス封筒",
          "ビジネス封筒 印刷",
          "ビジネス封筒 小ロット",
          "ビジネス封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ビジネス封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "封筒の最小注文数は何枚からですか？",
          "a": "ビジネス封筒 100 枚から対応。箔押し招待状 50 枚から。大量発注（1,000 枚以上）で 15-25% オフ。"
        "seo": {
        "title": "カラー封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたカラー封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "カラー封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "カラー封筒",
          "カラー封筒 印刷",
          "カラー封筒 小ロット",
          "カラー封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）カラー封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "窓付き封筒は作れますか？",
          "a": "はい、窓付き封筒対応。請求・見積・法務文書用に最適。書簡照合可能で業務効率向上。"
        },
        {
          "q": "箔押し封筒に対応していますか？",
          "a": "はい、金箔・銀箔・銅箔・黒箔対応。結婚式披露宴・表彰状・株主総会招集通知・VIP 案内状に最適。"
        },
        {
          "q": "カラー封筒は作れますか？",
          "a": "はい、オフセット 4 色/特色印刷対応。特殊紙（和紙風/クラフト/ペルーラ/ケント紙）にフルカラー印刷。"
        },
        {
          "q": "宛名印刷はできますか？",
          "a": "はい、Excel リストをご支給いただければ、印刷・封入まで一括対応可能（有償）。大量宛名印刷も効率的に処理。"
        },
        {
          "q": "大判封筒（A4 折らず）は作れますか？",
          "a": "はい、C4 等の 100-120g でコシを確保。A4 を折らずに入れられる。永久糊または剥離式で開封性向上。"
        },
        {
          "q": "パール封筒は対応していますか？",
          "a": "はい、微細な輝きで高級感演出。結婚招待・発表会返信・VIP 券封用に最適。細い箔枠やエンボスと相性良好。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5 営業日、特急 2〜3 営業日。500 枚以上の大量発注や宛名印刷込みは 7〜10 営業日。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "rigid-boxes": {
    "name": {
      "zh-hk": "精裝盒",
      "en": "Rigid Boxes",
      "ja": "上製本箱"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝禮盒印刷 | 1200g灰板 磁吸開合 高檔 | 智印雲 ZprintPro 香港本地",
        "description": "精裝禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 內襯 EVA 海棉或絨布, 開盒有儀式感。可加燙金、局部光油、壓凹、磁吸開合。灰板通過 FSC 認證, 聖誕新年高端禮品首選。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印雲提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝禮盒", "硬紙板盒", "1200g 灰板盒", "磁吸開合", "高檔禮盒", "奢侈品包裝"],
        "body": " transparent pricing"
      },
      "en": {00, FSC certified, FDA-compliant for food contact."
      
      },
      "ja": {
        "title": "リジッドボックス | 特注 高級パッケージ | ZprintPro",
        "description": "リジッドボックスのリジッドボックスは ZprintPro にお任せ。白カード/クラフト/グレー台紙 高品質用紙、カスタムサイズ 各種対応。4色 CMYK 印刷、デザイン自由。100個〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " luxurious and premium. ZprintPro offers professional Rigid Boxes services in Hong Kong. High quality",
        "keywords": ["リジッドボックス", "リジッドボックス 印刷", "rigid boxes"],
        "body": "硬い上製本構造、豪華でプレミアム。 ZprintProは香港で上製本箱サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
        {
          "q": "封筒の最小注文数は何枚からですか？",
          "a": "ビジネス封筒 100 枚から対応。箔押し招待状 50 枚から。大量発注（1,000 枚以上）で 15-25% オフ。"
        },
        {
          "q": "窓付き封筒は作れますか？",
          "a": "はい、窓付き封筒対応。請求・見積・法務文書用に最適。書簡照合可能で業務効率向上。"
        },
        {
          "q": "箔押し封筒に対応していますか？",
          "a": "はい、金箔・銀箔・銅箔・黒箔対応。結婚式披露宴・表彰状・株主総会招集通知・VIP 案内状に最適。"
        },
        {
          "q": "カラー封筒は作れますか？",
          "a": "はい、オフセット 4 色/特色印刷対応。特殊紙（和紙風/クラフト/ペルーラ/ケント紙）にフルカラー印刷。"
        },
        {
          "q": "宛名印刷はできますか？",
          "a": "はい、Excel リストをご支給いただければ、印刷・封入まで一括対応可能（有償）。大量宛名印刷も効率的に処理。"
        },
        {
          "q": "大判封筒（A4 折らず）は作れますか？",
          "a": "はい、C4 等の 100-120g でコシを確保。A4 を折らずに入れられる。永久糊または剥離式で開封性向上。"
        },
        {
          "q": "パール封筒は対応していますか？",
          "a": "はい、微細な輝きで高級感演出。結婚招待・発表会返信・VIP 券封用に最適。細い箔枠やエンボスと相性良好。"
        "seo": 
       {
        "title": "パール封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化されたパール封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "パール封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "パール封筒",
          "パール封筒 印刷",
          "パール封筒 小ロット",
          "パール封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）パール封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5 営業日、特急 2〜3 営業日。500 枚以上の大量発注や宛名印刷込みは 7〜10 営業日。日本向け配送 2-4 日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為100個起訂，定制盒型需500個起。",
      "en": "可以定制包裝盒的尺寸和結構嗎？",
      "ja": "可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。"
    }
  },
  "foil-red-packets": {
    "name": {
      "zh-hk": "燙金利是封",
      "en": "Foil Red Packets",
      "ja": "箔押しポチ袋"
    },
    "seo": 
      "zh-hk": {
        "title": "燙金利是封印刷 | 農曆新年企業福袋 100個 | 智印雲 ZprintPro 香港本地",
        "description": "燙金利是封印刷 100 個起, 採用 150g 高級紅色紙張, 配合燙金工藝, 農曆新年企業福袋首選。燙金區域精準 0.5mm 以上線寬, 可印企業 Logo。1-3 個工作天交貨, 港九免費速遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "燙金利是封",
        "keywords": ["燙金利是封", "燙金紅包", "利是封印刷", "新年利是封", "企業利是封", "農曆新年"],
        "body": " festive and elegant. Multiple auspicious patterns or custom designs. ZprintPro offers professional Foil Red Packets services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom foil red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design suppo",
        "h1": "傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。智印雲提供專業燙金利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["foil red packets", "custom foil red packets", "foil red packets printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判封筒印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の法人・結婚式向けに最適化された大判封筒。50 枚から対応、長3・角2・洋長3・洋2 サイズ。箔押し（金・銀・銅・黒箔）対応、カラー印刷可能。香港自社工場から日本全国へ最短 3-5 営業日配送。宛名印刷も対応。 30秒無料見積もり受付中。",
        "h1": "大判封筒 50枚〜 | 箔押し カラー",
        "keywords": [
          "大判封筒",
          "大判封筒 印刷",
          "大判封筒 小ロット",
          "大判封筒 即日",
          "封筒 印刷",
          "窓付き 封筒",
          "箔押し 封筒",
          "カラー 封筒",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）大判封筒は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "教材・帳類の最小注文数は何部からですか？",
          "a": "練習帳 50 部から、教材チラシ 100 枚から、証書 10 部から。大量発注（1,000 部以上）で 15-25% オフ。"
        },
        {
          "q": "学校・教育機関向けの印刷はありますか？",
          "a": "はい、教材・案内チラシ・練習帳・証書・卒業アルバムすべて対応。学習指導要領に合わせた製本・用紙選定可能。"
        },
        {
          "q": "学校チラシの紙質は何が選べますか？",
          "a": "128g-157g コート紙または書籍紙 + 4 色デジタル印刷で経済的かつ鮮やか。学校募集・コース紹介に最適。"
        },
        {
          "q": "練習帳の製本はできますか？",
          "a": "はい、80g-100g 書籍紙または上質紙 + 4 色印刷表紙 + 中綴じ。横線・方眼・白紙から選択、書き心地が良くにじまない。"
        },
        {
          "q": "証書の偽造防止はできますか？",
          "a": "はい、200g-250g クリームまたは白色透かし紙またはコットン紙 + 4 色印刷 + 箔押しで高級感と偽造防止性。卒業証書・資格認定に最適。"
        },
        {
          "q": "テキスト本の印刷に対応していますか？",
          "a": "はい、無線綴じ・上質紙 90g 本文・ハードケース表紙で長期保存・高級感両立。1 部からご注文可能。"
        },
        {
          "q": "教材デザインは依頼できますか？",
          "a": "はい、プロデザイナーが 3 案まで無料作成。Illustrator / InDesign / PDF 入稿対応、写真 350dpi 以上推奨。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。テキスト本・卒業アルバムは 10〜14 営業日。繁忙期は 14-21 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "利是封的最小訂購量是多少？",
      "en": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "ja": "可以燙金定制公司Logo嗎？"
    }
  },
  "embossed-red-packets": {
    "name": {
      "zh-hk": "浮雕利是封",
      "en": "Embossed Red Packets",
      "ja": "エンボスポチ袋"
    },
    "seo": 
        "title": "浮雕壓紋利是封印刷 | 立體觸感 VIP新年禮品 | 智印雲 ZprintPro 香港本地",
        "description": "浮雕壓紋利是封印刷 100 個起, 採用 150g 高級紙張, 配合浮雕壓紋工藝, 0.3mm 立體觸感, VIP 新年禮品首選。可加燙金、局部光油, 支援企業 Logo 印刷。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。智印雲提供專業浮雕利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["浮雕利是封", "壓紋利是封", "立體利是封", "VIP 利是封", "高端紅包", "新年禮品"],
        "body": " luxurious feel. ZprintPro offers professional Embossed Red Packets services in Hong Kong. High quality"
     {
        "title": "賞状印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の学校・塾・学生向けに最適化された賞状印刷。10 部から対応、教材・案内チラシ・練習帳・証書・卒業アルバム対応。FSC 認証紙、大豆インク印刷対応。香港自社工場から日本全国へ最短 5-7 営業日配送。デザインサポート無料。 30秒無料見積もり受付中。",
        "h1": "賞状印刷 10部〜 | 学校 教材",
        "keywords": [
          "賞状印刷",
          "賞状印刷 印刷",
          "賞状印刷 小ロット",
          "賞状印刷 即日",
          "学校 印刷",
          "練習帳",
          "教材 印刷",
          "卒業 アルバム",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）賞状印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } High quality"
      },
      "en": {
        "title": "Embossed Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom embossed red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design s",
        "h1": "Embossed craftsmanship",
        "keywords": ["embossed red packets", "custom embossed red packets", "embossed red packets printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ワークブック印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の学校・塾・学生向けに最適化されたワークブック印刷。10 部から対応、教材・案内チラシ・練習帳・証書・卒業アルバム対応。FSC 認証紙、大豆インク印刷対応。香港自社工場から日本全国へ最短 5-7 営業日配送。デザインサポート無料。 30秒無料見積もり受付中。",
        "h1": "ワークブック印刷 10部〜 | 学校 教材",
        "keywords": [
          "ワークブック印刷",
          "ワークブック印刷 印刷",
          "ワークブック印刷 小ロット",
          "ワークブック印刷 即日",
          "学校 印刷",
          "練習帳",
          "教材 印刷",
          "卒業 アルバム",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）ワークブック印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "教材・帳類の最小注文数は何部からですか？",
          "a": "練習帳 50 部から、教材チラシ 100 枚から、証書 10 部から。大量発注（1,000 部以上）で 15-25% オフ。"
        },
        {
          "q": "学校・教育機関向けの印刷はありますか？",
          "a": "はい、教材・案内チラシ・練習帳・証書・卒業アルバムすべて対応。学習指導要領に合わせた製本・用紙選定可能。"
        },
        {
          "q": "学校チラシの紙質は何が選べますか？",
          "a": "128g-157g コート紙または書籍紙 + 4 色デジタル印刷で経済的かつ鮮やか。学校募集・コース紹介に最適。"
        },
        {
          "q": "練習帳の製本はできますか？",
          "a": "はい、80g-100g 書籍紙または上質紙 + 4 色印刷表紙 + 中綴じ。横線・方眼・白紙から選択、書き心地が良くにじまない。"
        },
        {
          "q": "証書の偽造防止はできますか？",
          "a": "はい、200g-250g クリームまたは白色透かし紙またはコットン紙 + 4 色印刷 + 箔押しで高級感と偽造防止性。卒業証書・資格認定に最適。"
        },
        {
          "q": "テキスト本の印刷に対応していますか？",
          "a": "はい、無線綴じ・上質紙 90g 本文・ハードケース表紙で長期保存・高級感両立。1 部からご注文可能。"
        },
        {
          "q": "教材デザインは依頼できますか？",
          "a": "はい、プロデザイナーが 3 案まで無料作成。Illustrator / InDesign / PDF 入稿対応、写真 350dpi 以上推奨。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。テキスト本・卒業アルバムは 10〜14 営業日。繁忙期は 14-21 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "利是封的最小訂購量是多少？",
      "en": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "ja": "可以燙金定制公司Logo嗎？"
    }
  },
  "custom-red-packets": {
    "name": {
      "zh-hk": "定制利是封",
      "en": "Custom Red Packets",
      "ja": "オリジナルポチ袋"
    },
    "seo": 
      "zh-hk": {
        "title": "訂製利是封印刷 | Logo企業 客製新年禮品 | 智印雲 ZprintPro 香港本地",
        "description": "訂製利是封印刷 100 個起, 支援企業 Logo 印刷, 客製新年禮品首選。採用 150g 高級紅色紙張, 可加燙金、壓凹、UV 局部。適合企業週年慶、客戶新年禮品、品牌新年活動。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "定制利是封",
        "keywords": ["訂製利是封", "Logo 利是封", "企業新年禮品", "客製紅包", "品牌紅包", "週年利是封"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Custom Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom custom red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design sup",
        "h1": "專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。智印雲提供專業定制利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["custom red packets", "custom custom red packets", "custom red packets printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "学校チラシ印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の学校・塾・学生向けに最適化された学校チラシ。10 部から対応、教材・案内チラシ・練習帳・証書・卒業アルバム対応。FSC 認証紙、大豆インク印刷対応。香港自社工場から日本全国へ最短 5-7 営業日配送。デザインサポート無料。 30秒無料見積もり受付中。",
        "h1": "学校チラシ 10部〜 | 学校 教材",
        "keywords": [
          "学校チラシ",
          "学校チラシ 印刷",
          "学校チラシ 小ロット",
          "学校チラシ 即日",
          "学校 印刷",
          "練習帳",
          "教材 印刷",
          "卒業 アルバム",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）学校チラシは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "教材・帳類の最小注文数は何部からですか？",
          "a": "練習帳 50 部から、教材チラシ 100 枚から、証書 10 部から。大量発注（1,000 部以上）で 15-25% オフ。"
        },
        {
          "q": "学校・教育機関向けの印刷はありますか？",
          "a": "はい、教材・案内チラシ・練習帳・証書・卒業アルバムすべて対応。学習指導要領に合わせた製本・用紙選定可能。"
        },
        {
          "q": "学校チラシの紙質は何が選べますか？",
          "a": "128g-157g コート紙または書籍紙 + 4 色デジタル印刷で経済的かつ鮮やか。学校募集・コース紹介に最適。"
        },
        {
          "q": "練習帳の製本はできますか？",
          "a": "はい、80g-100g 書籍紙または上質紙 + 4 色印刷表紙 + 中綴じ。横線・方眼・白紙から選択、書き心地が良くにじまない。"
        },
        {
          "q": "証書の偽造防止はできますか？",
          "a": "はい、200g-250g クリームまたは白色透かし紙またはコットン紙 + 4 色印刷 + 箔押しで高級感と偽造防止性。卒業証書・資格認定に最適。"
        "seo": 
          "q": "証書の偽造防止はできますか？",
          "a": "はい、200g-250g クリームまたは白色透かし紙またはコットン紙 + 4 色印刷 + 箔押しで高級感と偽造防止性。卒業証書・資格認定に最適。"
       {
        "title": "磁気フラップギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された磁気フラップギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "磁気フラップギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "磁気フラップギフトボックス",
          "磁気フラップギフトボックス 印刷",
          "磁気フラップギフトボックス 小ロット",
          "磁気フラップギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）磁気フラップギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      } },
        {
          "q": "テキスト本の印刷に対応していますか？",
          "a": "はい、無線綴じ・上質紙 90g 本文・ハードケース表紙で長期保存・高級感両立。1 部からご注文可能。"
        },
        {
          "q": "教材デザインは依頼できますか？",
          "a": "はい、プロデザイナーが 3 案まで無料作成。Illustrator / InDesign / PDF 入稿対応、写真 350dpi 以上推奨。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 5〜7 営業日、特急 2〜3 営業日。テキスト本・卒業アルバムは 10〜14 営業日。繁忙期は 14-21 営業日。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "en": "可以燙金定制公司Logo嗎？",
      "ja": "可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。"
    }
  },
  "cartoon-red-packets": {
    "name": {
      "zh-hk": "卡通利是封",
      "en": "Cartoon Red Packets",
      "ja": "キャラクターポチ袋"
    },
    "seo": 
        "title": "卡通利是封印刷 | 兒童生肖 親子活動 100個 | 智印雲 ZprintPro 香港本地",
        "description": "卡通利是封印刷 100 個起, 採用 120g 高級銅版紙或 FSC 環保紙, 配合四色數碼印刷, 色彩鮮豔圖案活潑。可印生肖動物、卡通角色、品牌吉祥物, 並支援燙金或局部 UV 點綴。**智印雲 香港本地印刷**。",
        "h1": "可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。智印雲提供專業卡通利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["卡通利是封", "兒童利是封", "生肖利是封", "親子活動利是封", "幼稚園利是封", "新年派對"],
        "body": " transparent pricing"
     {
        "title": "電子機器包装箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された電子機器包装箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "電子機器包装箱 30個〜 | 化粧 食品",
        "keywords": [
          "電子機器包装箱",
          "電子機器包装箱 印刷",
          "電子機器包装箱 小ロット",
          "電子機器包装箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）電子機器包装箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }arent pricing"
      },
      "en": {
        "title": "Cartoon Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom cartoon red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design su",
        "h1": "Cute cartoon design",
        "keywords": ["cartoon red packets", "custom cartoon red packets", "cartoon red packets printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "教科書印刷印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の学校・塾・学生向けに最適化された教科書印刷。10 部から対応、教材・案内チラシ・練習帳・証書・卒業アルバム対応。FSC 認証紙、大豆インク印刷対応。香港自社工場から日本全国へ最短 5-7 営業日配送。デザインサポート無料。 30秒無料見積もり受付中。",
        "h1": "教科書印刷 10部〜 | 学校 教材",
        "keywords": [
          "教科書印刷",
          "教科書印刷 印刷",
          "教科書印刷 小ロット",
          "教科書印刷 即日",
          "学校 印刷",
          "練習帳",
          "教材 印刷",
          "卒業 アルバム",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）教科書印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      "seo":      "description": "日本の学校・塾・学生向けに最適化された教科書印刷。10 部から対応、教材・案内チラシ・練習帳・証書・卒業アルバム対応。FSC 認証紙、大豆インク印刷対応。香港自社工場から日本全国へ最短 5-7 営業日配送。デザインサポート無料。 30秒無料見積もり受付中。",
        "h1": "教科書印刷 10部〜 | 学校 教材",
        "keywords": [
          "教科書印刷",
          "教科書印刷 印刷",
          "教科書印刷 小ロット",
          "教科書印刷 即日",
          "学校 印刷",
          "練習帳",
          "教材 印刷",
          "卒業 アルバム",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）教科書印刷は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
     {
        "title": "クラフト紙箱印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化されたクラフト紙箱。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "クラフト紙箱 30個〜 | 化粧 食品",
        "keywords": [
          "クラフト紙箱",
          "クラフト紙箱 印刷",
          "クラフト紙箱 小ロット",
          "クラフト紙箱 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）クラフト紙箱は、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "パッケージの最小注文数は何個からですか？",
          "a": "ギフト箱 30 個、化粧箱 30 個、食品パッケージ 100 個から対応。試作品特急は 5〜7 営業日で納品。"
        },
        {
          "q": "食品安全に対応していますか？",
          "a": "はい、FDA（米国）・LFGB（ドイツ）・食品衛生法（日本）の 3 大食品安全基準に準拠。大豆インク・水性インク使用で匂い移りなし。"
        },
        {
          "q": "内装オプションは何がありますか？",
          "a": "EVA フォーム成形・サテン生地（黒/白/ベージュ）・ブリスタートレイなど。ボトル形状に合わせたカスタムカット内装も可能。"
        },
        {
          "q": "箔押し（ホットスタンプ）はできますか？",
          "a": "はい、ゴールド・シルバー・銅・特殊箔対応。ロゴ・記念日・紋章を強調。スポット UV・エンボスとの組み合わせ可能。"
        },
        {
          "q": "オリジナル形状で作れますか？",
          "a": "はい、ハート形・星型・ブランドロゴ型など自由形状対応。最少 50×50×30mm から最大 500×400×200mm まで対応。"
        },
        {
          "q": "磁石式フラップボックスは作れますか？",
          "a": "はい、ラグジュアリー向けに磁気フラップ構造のハードケースボックス対応。片手で静かに開閉できる高級感。"
        },
        {
          "q": "環境に配慮した素材はありますか？",
          "a": "はい、FSC 認証紙・再生紙・竹パルプ対応。PLA（植物由来）透明フィルム・生分解性コートもオプション。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "標準 10 営業日、特急 5〜7 営業日。内装カスタマイズや特殊加工を含む場合は 14-21 営業日。お急ぎの場合は特急プラン（有償）もございます。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "en": "可以燙金定制公司Logo嗎？",
      "ja": "可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。"
    }
  },
  "eco-red-packets": {
    "name": {
      "zh-hk": "環保利是封",
      "en": "Eco Red Packets",
      "ja": "エコポチ袋"
    },
    "seo": 
      "zh-hk": {
        "title": "環保利是封印刷 | FSC種子紙 ESG新年 100個 | 智印雲 ZprintPro 香港本地",
        "description": "環保利是封印刷 100 個起, 採用 FSC 認證再生紙或種子紙, 100% 可回收。碳足跡降低 35%, 通過 ISO 14067 認證。適合社企、環保品牌、ESG 上市公司新年 ESG 形象送禮。**智印雲 香港本地印刷**。",
        "h1": "採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。智印雲提供專業環保利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["環保利是封", "FSC 認證利是封", "種子紙利是封", "可降解利是封", "ESG 利是封", "社企利是封"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Eco Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom eco red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design suppor",
        "h1": "Eco-friendly paper and ink",
        "keywords": ["eco red packets", "custom eco red packets", "eco red packets printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "引き出し式ギフトボックス印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本の化粧品・ギフト・食品ブランド向けに最適化された引き出し式ギフトボックス。30 個から対応、FDA/LFGB/食品衛生法準拠。箔押し・スポット UV・エンボス対応、磁気フラップ・引き出し式・特殊形状。香港自社工場から日本全国へ最短 7-10 営業日配送。",
        "h1": "引き出し式ギフトボックス 30個〜 | 化粧 食品",
        "keywords": [
          "引き出し式ギフトボックス",
          "引き出し式ギフトボックス 印刷",
          "引き出し式ギフトボックス 小ロット",
          "引き出し式ギフトボックス 即日",
          "パッケージ 印刷",
          "化粧箱",
          "ギフト ボックス",
          "食品 パッケージ",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）引き出し式ギフトボックスは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
        {
          "q": "ステッカーの最小注文数は何枚からですか？",
          "a": "最小 100 枚から対応。HP Indigo デジタル印刷で 1 枚から特急対応可能（特急料金）。大量発注（500 枚以上）はオフセット印刷でコスト削減。"
        },
        {
          "q": "屋外でも耐久性がありますか？",
          "a": "PVC（塩ビ）フィルム + UV 耐性ラミネートで 3〜5 年屋外耐久。PP 合成紙は短期屋外・屋内向け。PET は透明素材で化粧品・ガラス瓶に最適。"
        },
        {
          "q": "型抜き（自由形状）はできますか？",
          "a": "はい、ブランドロゴ輪郭・キャラクターシルエットなど完全自由形状に対応。最小 10×10mm から最大 300×300mm まで。追加料金 1,000 円でカスタム形状可能。"
        },
        {
          "q": "防水性はどのくらいですか？",
          "a": "PVC フィルム + UV ラミネートで完全防水。雨・食器洗浄機・冷凍庫・短時間の水没にも対応。屋外使用 3〜5 年色褪せなし。"
        },
        {
          "q": "印刷品質はどのくらいですか？",
          "a": "1440dpi インクジェット + 4 色オフセット機で高精細。CMYK フルカラー + 特色（白インク・メタリック）対応。透明素材にも白インク下地で色再現性確保。"
        },
        {
          "q": "裏面は粘着性强粘着と再剥離どちらが選べますか？",
          "a": "はい、両方対応。一般強粘着（標準）、再剥離（賃貸・短期キャンペーン向け）、耐水強粘着（屋外長期）の 3 種類から選択可能。"
        },
        {
          "q": "データ入稿はIllustrator形式が良いですか？",
          "a": "Illustrator / Photoshop / Canva / PowerPoint / PDF すべて対応。型抜きパスを含めた AI/PDF が理想的。スタッフが無料でデータチェック。"
        },
        {
          "q": "納期はどのくらいですか？",
          "a": "100〜500 枚は 1〜2 営業日、500 枚以上は 3〜5 営業日。日本向け配送 2〜4 日。Express 特急プラン（有償）で最短当日仕上げも対応。"
        }
      ],
    "imageAlt": {
      "zh-hk": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "en": "可以燙金定制公司Logo嗎？",
      "ja": "可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。"
    }
  },
  "large-red-packets": {
    "name": {
      "zh-hk": "大號利是封",
      "en": "Large Red Packets",
      "ja": "大判ポチ袋"
    },
    "seo": 
      "zh-hk": {
        "title": "大利是封印刷 | 婚禮壽宴 加厚30%容量 | 智印雲 ZprintPro 香港本地",
        "description": "大利是封印刷 100 個起, 採用 150g 高級紅色紙張, 尺寸較標準利是封大 30-50%, 容量更大, 適合婚禮大禮、壽宴派發、企業高層員工紅包。可加燙金、浮雕、局部光油。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印雲提供專業大號利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大利是封", "加大利是封", "婚禮利是封", "厚禮金利是封", "派對大利是封", "壽宴紅包"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Large Red Packets | Foil UV Embossed | ZprintPro",
        "description": "Custom large red packets from ZprintPro Hong Kong. Premium 157g red gold paper/coated, multiple Standard/custom options. 4-color CMYK printing, full design supp",
        "h1": "Larger size",
        "keywords": ["large red packets", "custom large red packets", "large red packets printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "フルーツ・食品ラベルシール印刷 100枚〜 | 高品質 | 智印雲 ZprintPro",
        "description": "日本のブランド・小売向けに最適化されたフルーツ・食品ラベルシール。100 枚から対応、PVC・PET・紙素材対応。屋外 3-5 年耐久、防水・防晒・耐磨耗。可変 QR コード・型抜き対応。香港自社工場から日本全国へ最短 2-4 営業日配送。FSC 認証素材。",
        "h1": "フルーツ・食品ラベルシール 100枚〜 | 屋外 防水",
        "keywords": [
          "フルーツ・食品ラベルシール",
          "フルーツ・食品ラベルシール 印刷",
          "フルーツ・食品ラベルシール 小ロット",
          "フルーツ・食品ラベルシール 即日",
          "ステッカー 防水",
          "ステッカー オリジナル",
          "型抜きステッカー",
          "屋外 ステッカー",
          "即日 印刷 香港",
          "日本向け 印刷"
        ],
        "body": "智印雲（ZprintPro）フルーツ・食品ラベルシールは、日本市場向けに最適化された香港製印刷サービス。高品質・短納期・明朗会計で、法人・個人事業主・学校・官公庁の大量発注から小ロットまで対応。全国配送・1-3 営業日で納品、30秒無料見積もり受付中。"
      }
    
    },
    "faqs": [
      {
        "q": "專業大號利是封服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印雲提供專業的大號利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為500個起訂，春節旺季建議提前1個月下單。",
      "en": "可以燙金定制公司Logo嗎？",
      "ja": "可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。"
    }
  },
  "wall-calendars": {
    "name": {
      "zh-hk": "掛牆年曆",
      "en": "Wall Calendars",
      "ja": "壁掛けカレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "掛牆年曆印刷 | 13頁全彩 金屬圈 企業禮品 | 智印雲 ZprintPro 香港本地",
        "description": "掛牆年曆印刷 50 本起, 採用 200g 銅版紙, 13 頁全彩, 金屬圈裝訂, 每月一頁, 背面印備忘欄。適合企業禮品、品牌年曆、客戶送禮。可加燙金標誌、局部光油。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "掛牆年曆",
        "keywords": ["掛牆年曆", "掛曆", "13頁全彩年曆", "金屬圈裝訂", "企業年曆", "2026 年曆"],
        "body": " 13-page design. Perfect for home and office use. ZprintPro offers professional Wall Calendars services in Hong Kong. High quality"
      },
      "en": {
        "title": "Wall Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom wall calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design support. ",
        "h1": "標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。智印雲提供專業掛牆年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["wall calendars", "custom wall calendars", "wall calendars printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "壁掛けカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "壁掛けカレンダーの壁掛けカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Standard A3 or A2 wall calendars",
        "keywords": ["壁掛けカレンダー", "壁掛けカレンダー 印刷", "wall calendars"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "標準A3またはA2壁掛けカレンダー、13ページデザイン。家庭やオフィスに最適。 ZprintProは香港で壁掛けカレンダーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業掛牆年曆服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "標準A3或A2掛牆年曆，13頁設計（封面+12個月），支持印刷即日速遞送貨。適合家庭、辦公室使用，全年品牌曝光。智印雲提供專業的掛牆年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "年曆的最小訂購量是多少？",
      "en": "一般為50本起訂，大批量訂單價格更優惠。",
      "ja": "可以定制年曆的內頁設計嗎？"
    }
  },
  "desk-calendars": {
    "name": {
      "zh-hk": "座檯年曆",
      "en": "Desk Calendars",
      "ja": "卓上カレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "座檯月曆印刷 | 三角座架 商務禮品首選 | 智印雲 ZprintPro 香港本地印刷",
        "description": "座檯月曆印刷 50 本起, 採用 200-250g 銅版紙, 三角座架設計, 穩固擺放辦公室桌面, 每月一頁或每季一頁。適合商務禮品、辦公室擺設、品牌年曆。可加燙金標誌。**智印雲 香港本地印刷**。",
        
        "h1": "座檯年曆",
        "keywords": ["座檯年曆", "座檯曆", "三角座架年曆", "商務禮品年曆", "企業禮品", "辦公室月曆"],
        "body": " stable and beautiful. Perfect for office desk display. ZprintPro offers professional Desk Calendars services in Hong Kong. High quality"
      },
      "en": {
        "title": "Desk Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom desk calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design support. ",
        "h1": "三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。智印雲提供專業座檯年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["desk calendars", "custom desk calendars", "desk calendars printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "デスクカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "デスクカレンダーのデスクカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Triangular desk design",
        "keywords": ["デスクカレンダー", "デスクカレンダー 印刷", "desk calendars"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "三角形の卓上デザイン、安定して美しい。オフィスデスクに最適。 ZprintProは香港で卓上カレンダーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業座檯年曆服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "三角形座檯設計，穩固美觀，支持印刷即日速遞送貨。適合辦公桌擺放，每日品牌接觸。智印雲提供專業的座檯年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "年曆的最小訂購量是多少？",
      "en": "一般為50本起訂，大批量訂單價格更優惠。",
      "ja": "可以定制年曆的內頁設計嗎？"
    }
  },
  "custom-calendars": {
    "name": {
      "zh-hk": "定制年曆",
      "en": "Custom Calendars",
      "ja": "オリジナルカレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "定制年曆印刷 | Logo客製 品牌年曆禮品 | 智印雲 ZprintPro 香港本地",
        "description": "定制年曆印刷 50 本起, 採用 200-250g 銅版紙, 完全客製化企業故事、品牌資訊、產品特色。適合企業禮品、VIP 禮品、品牌年曆禮品。可加燙金標誌、局部光油。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。智印雲提供專業定制年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["定制年曆", "客製化年曆", "品牌年曆", "VIP 禮品年曆", "企業故事年曆", "Logo 年曆"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Custom Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom custom calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design support",
        "h1": "Exclusive design",
        "keywords": ["custom calendars", "custom custom calendars", "custom calendars printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "カスタムカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "カスタムカレンダーのカスタムカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " each page can feature company products or services. ZprintPro offers professional Custom Calendars services in Hong Kong. High quality",
        "keywords": ["カスタムカレンダー", "カスタムカレンダー 印刷", "custom calendars"],
        "body": "独占的なデザイン、各ページに会社の製品やサービスを掲載可能。 ZprintProは香港でオリジナルカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業定制年曆服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。智印雲提供專業的定制年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50本起訂，大批量訂單價格更優惠。",
      "en": "可以定制年曆的內頁設計嗎？",
      "ja": "可以。我們支持封面和內頁的完全定制設計。"
    }
  },
  "mini-calendars": {
    "name": {
      "zh-hk": "迷你年曆",
      "en": "Mini Calendars",
      "ja": "ミニカレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "迷你口袋年曆印刷 | 8.5x5.5cm 餐廳禮品 | 智印雲 ZprintPro 香港本地",
        "description": "迷你年曆印刷 100 本起, 採用 250-300g 銅版紙, 袖珍尺寸 8.5×5.5cm 適合放在錢包口袋, 每月一頁, 背面印品牌資訊。適合餐廳、美容品牌、零售店聖誕新年禮品。**智印雲 香港本地印刷**。",
        "h1": "小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。智印雲提供專業迷你年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["迷你年曆", "口袋年曆", "餐廳月曆", "隨身日曆", "8.5×5.5cm 年曆", "客戶禮品"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Mini Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom mini calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design support. ",
        "h1": "Compact and portable",
        "keywords": ["mini calendars", "custom mini calendars", "mini calendars printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ミニカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "ミニカレンダーのミニカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " fits in wallet or pocket. ZprintPro offers professional Mini Calendars services in Hong Kong. High quality",
        "keywords": ["ミニカレンダー", "ミニカレンダー 印刷", "mini calendars"],
        "body": "コンパクトで持ち運び可能、財布やポケットに入ります。 ZprintProは香港でミニカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業迷你年曆服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。智印雲提供專業的迷你年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50本起訂，大批量訂單價格更優惠。",
      "en": "可以定制年曆的內頁設計嗎？",
      "ja": "可以。我們支持封面和內頁的完全定制設計。"
    }
  },
  "photo-frame-calendars": {
    "name": {
      "zh-hk": "相框年曆",
      "en": "Photo Frame Calendars",
      "ja": "フォトフレームカレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "相框年曆印刷 | 可換照片 家庭企業禮物 | 智印雲 ZprintPro 香港本地",
        "description": "相框年曆印刷 50 本起, 採用 250-300g 銅版紙或相紙, 配合硬紙板相框座設計, 整本可直立擺放。每月一頁可印家庭照片、藝術插畫。聖誕新年家庭禮品首選。**智印雲 香港本地印刷**。",
        "h1": "結合相框功能，可替換照片。實用美觀，家庭必備。智印雲提供專業相框年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["相框年曆", "相架年曆", "家庭禮品年曆", "可換相年曆", "聖誕新年禮物", "攝影禮品"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Photo Frame Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom photo frame calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design su",
        "h1": "Combined photo frame function",
        "keywords": ["photo frame calendars", "custom photo frame calendars", "photo frame calendars printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "フォトフレームカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "フォトフレームカレンダーのフォトフレームカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " photos can be replaced. ZprintPro offers professional Photo Frame Calendars services in Hong Kong. High quality",
        "keywords": ["フォトフレームカレンダー", "フォトフレームカレンダー 印刷", "photo frame calendars"],
        "body": "フォトフレーム機能付き、写真を交換可能。 ZprintProは香港でフォトフレームカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業相框年曆服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "結合相框功能，可替換照片。實用美觀，家庭必備。智印雲提供專業的相框年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50本起訂，大批量訂單價格更優惠。",
      "en": "可以定制年曆的內頁設計嗎？",
      "ja": "可以。我們支持封面和內頁的完全定制設計。"
    }
  },
  "magnetic-calendars": {
    "name": {
      "zh-hk": "磁石年曆",
      "en": "Magnetic Calendars",
      "ja": "マグネットカレンダー"
    },
    "seo": {
      "zh-hk": {
        "title": "磁吸年曆印刷 | 冰箱貼設計 每日曝光 | 智印雲 ZprintPro 香港本地",
        "description": "磁吸年曆印刷 100 本起, 採用 250g 銅版紙 + 軟磁片, 可吸附冰箱, 每日曝光品牌資訊。適合品牌禮品、餐廳禮品、聖誕新年廣告禮品。可加燙金標誌、局部光油。**智印雲 香港本地印刷**。",
        "h1": "磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。智印雲提供專業磁石年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["磁吸年曆", "冰箱貼年曆", "磁石月曆", "廚房日曆", "每日曝光", "廣告禮品"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Magnetic Calendars | Corporate Gift Multiple Sizes | ZprintPro",
        "description": "Custom magnetic calendars from ZprintPro Hong Kong. Premium 250g coated/matte art paper, multiple A5/A4/custom options. 4-color CMYK printing, full design suppo",
        "h1": "Magnetic backing",
        "keywords": ["magnetic calendars", "custom magnetic calendars", "magnetic calendars printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "マグネットカレンダー | ノベルティ 各種サイズ | ZprintPro",
        "description": "マグネットカレンダーのマグネットカレンダーは ZprintPro にお任せ。250g コート/マット 高品質用紙、A5/A4/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、7-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can stick to refrigerator and other metal surfaces. ZprintPro offers professional Magnetic Calendars services in Hong Kong. High quality",
        "keywords": ["マグネットカレンダー", "マグネットカレンダー 印刷", "magnetic calendars"],
        "body": "マグネット背面、冷蔵庫などの金属面に貼付可能。 ZprintProは香港でマグネットカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業磁石年曆服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。智印雲提供專業的磁石年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50本起訂，大批量訂單價格更優惠。",
      "en": "可以定制年曆的內頁設計嗎？",
      "ja": "可以。我們支持封面和內頁的完全定制設計。"
    }
  },
  "pvc-menus": {
    "name": {
      "zh-hk": "PVC餐牌",
      "en": "PVC Menus",
      "ja": "PVCメニュー"
    },
    "seo": {
      "zh-hk": {
        "title": "PVC餐牌印刷 | 防水UV 0.5-1mm膠片 50張 | 智印雲 ZprintPro 香港本地印刷",
        "description": "PVC 餐牌印刷 50 張起, 採用 0.5-1.0 毫米透明或白色聚氯乙烯膠片, 配合四色 UV 印刷, 防水防油、防磨耐刮。通過 SGS 食品接觸安全認證, 適合咖啡廳、茶餐廳、居酒屋。**智印雲 香港本地印刷**。",
        
        "h1": "PVC餐牌",
        "keywords": ["PVC 餐牌", "膠卡餐牌", "防水餐牌", "UV 印刷餐牌", "膠卡菜單", "咖啡廳餐牌"],
        "body": " easy to clean and durable. ZprintPro offers professional PVC Menus services in Hong Kong. High quality"
      },
      "en": {
        "title": "PVC Menus | Waterproof Laminated | ZprintPro",
        "description": "Custom pvc menus from ZprintPro Hong Kong. Premium 250g coated/laminated waterproof, multiple A4/A5/custom options. 4-color CMYK printing, full design support. ",
        "h1": "防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。智印雲提供專業PVC餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["pvc menus", "custom pvc menus", "pvc menus printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "PVC menu | 防水 ラミネート | ZprintPro",
        "description": "PVC menuのPVC menuは ZprintPro にお任せ。250g コート/防水ラミネート 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Waterproof and oil-resistant PVC material",
        "keywords": ["PVC menu", "PVC menu 印刷", "pvc menus"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "防水・耐油性PVC素材、お手入れ簡単で耐久性あり。 ZprintProは香港でPVCメニューサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業PVC餐牌服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "防水防油PVC材質，易清潔耐用，支持印刷即日速遞送貨。餐廳、咖啡店首選。智印雲提供專業的PVC餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "餐牌的最小訂購量是多少？",
      "en": "一般為50個起訂，一次性餐牌可接受10個起。",
      "ja": "餐牌防水嗎？"
    }
  },
  "laminated-menus": {
    "name": {
      "zh-hk": "過膠餐牌",
      "en": "Laminated Menus",
      "ja": "ラミネートメニュー"
    },
    "seo": {
      "zh-hk": {
        "title": "過膠餐牌印刷 | 啞膠光膠 中西餐廳 50本 | 智印雲 ZprintPro 香港本地",
        "description": "過膠餐牌印刷 50 本起, 採用 200-250g 銅版紙, 配合四色印刷及啞膠或光膠覆膜, 表面防水防油、耐磨耐撕, 可用濕布擦拭。過膠層厚度 25-50 微米保護印刷面。**智印雲 香港本地印刷**。",
        
        "h1": "過膠餐牌",
        "keywords": ["過膠餐牌", "過膠菜單", "啞膠餐牌", "光膠餐牌", "中餐廳餐牌", "西餐廳餐牌"],
        "body": " waterproof and durable at lower cost. ZprintPro offers professional Laminated Menus services in Hong Kong. High quality"
      },
      "en": {
        "title": "Laminated Menus | Waterproof Laminated | ZprintPro",
        "description": "Custom laminated menus from ZprintPro Hong Kong. Premium 250g coated/laminated waterproof, multiple A4/A5/custom options. 4-color CMYK printing, full design sup",
        "h1": "紙質過膠處理，防水耐用且成本較低。經濟實惠之選。智印雲提供專業過膠餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["laminated menus", "custom laminated menus", "laminated menus printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ラミネート menu | 防水 ラミネート | ZprintPro",
        "description": "ラミネート menuのラミネート menuは ZprintPro にお任せ。250g コート/防水ラミネート 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Paper with lamination",
        "keywords": ["ラミネート menu", "ラミネート menu 印刷", "laminated menus"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "ラミネート加工紙、防水で耐久性がありコストも低い。 ZprintProは香港でラミネートメニューサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業過膠餐牌服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "紙質過膠處理，防水耐用且成本較低，支持印刷即日速遞送貨。經濟實惠之選。智印雲提供專業的過膠餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "餐牌的最小訂購量是多少？",
      "en": "一般為50個起訂，一次性餐牌可接受10個起。",
      "ja": "餐牌防水嗎？"
    }
  },
  "hardcover-menus": {
    "name": {
      "zh-hk": "精裝餐牌",
      "en": "Hardcover Menus",
      "ja": "高級メニュー"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝餐牌印刷 | 硬皮燙金 高級餐廳酒店 | 智印雲 ZprintPro 香港本地",
        "description": "精裝餐牌印刷 50 本起, 採用 3 毫米灰紙板封面裱糊 200g 銅版紙, 內頁 200g 銅版紙, 配合騎馬釘或膠裝。封面可燙金、壓凹或加局部光油, 適合米芝蓮餐廳、五星級酒店。**智印雲 香港本地印刷**。",
        
        "h1": "精裝餐牌",
        "keywords": ["精裝餐牌", "硬皮餐牌", "燙金菜單", "高級餐廳餐牌", "米芝蓮餐牌", "酒店餐牌"],
        "body": " elegant and grand. Perfect for fine dining restaurants"
      },
      "en": {
        "title": "Hardcover Menus | Waterproof Laminated | ZprintPro",
        "description": "Custom hardcover menus from ZprintPro Hong Kong. Premium 250g coated/laminated waterproof, multiple A4/A5/custom options. 4-color CMYK printing, full design sup",
        "h1": "硬殼精裝，高檔大氣。適合高級餐廳、酒店。智印雲提供專業精裝餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["hardcover menus", "custom hardcover menus", "hardcover menus printing hong kong"],
        "body": " hotels. ZprintPro offers professional Hardcover Menus services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ハードカバー menu | 防水 ラミネート | ZprintPro",
        "description": "ハードカバー menuのハードカバー menuは ZprintPro にお任せ。250g コート/防水ラミネート 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Hardcover binding",
        "keywords": ["ハードカバー menu", "ハードカバー menu 印刷", "hardcover menus"],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "上製本装丁、エレガントで格式高い。高級レストラン、ホテルに最適。 ZprintProは香港で高級メニューサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業精裝餐牌服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "硬殼精裝，高檔大氣，支持印刷即日速遞送貨。適合高級餐廳、酒店。智印雲提供專業的精裝餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "餐牌的最小訂購量是多少？",
      "ja": "一般為50個起訂，一次性餐牌可接受10個起。"
    }
  },
  "drink-menus": {
    "name": {
      "zh-hk": "酒水牌",
      "en": "Drink Menus",
      "ja": "ドリンクメニュー"
    },
    "seo": {
      "zh-hk": {
        "title": "酒水牌印刷 | 飲品餐牌 QR code點餐 | 智印雲 ZprintPro 香港本地印刷",
        "description": "酒水牌印刷 50 張起, 採用 200-250g 銅版紙或防水合成紙, 配合四色印刷及啞膠覆膜, 紙張防水防油可用濕布擦拭。通過 SGS 防水及食品安全測試, 可加二維碼連結線上點餐。**智印雲 香港本地印刷**。",
        "h1": "專為酒水設計，可立式或手持。酒吧、餐廳必備。智印雲提供專業酒水牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["酒水牌", "飲品餐牌", "酒吧酒單", "QR code 點餐", "咖啡廳酒單", "茶飲店餐牌"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Drink Menus | Waterproof Laminated | ZprintPro",
        "description": "Custom drink menus from ZprintPro Hong Kong. Premium 250g coated/laminated waterproof, multiple A4/A5/custom options. 4-color CMYK printing, full design support",
        "h1": "Specially designed for drinks",
        "keywords": ["drink menus", "custom drink menus", "drink menus printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー | 防水 ラミネート | ZprintPro",
        "description": "ドリンクメニューのドリンクメニューは ZprintPro にお任せ。250g コート/防水ラミネート 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can be standing or handheld. ZprintPro offers professional Drink Menus services in Hong Kong. High quality",
        "keywords": ["ドリンクメニュー", "ドリンクメニュー 印刷", "drink menus"],
        "body": "ドリンク専用設計、立てかけまたは手持ち可能。 ZprintProは香港でドリンクメニューサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業酒水牌服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "專為酒水設計，可立式或手持。酒吧、餐廳必備。智印雲提供專業的酒水牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50個起訂，一次性餐牌可接受10個起。",
      "en": "餐牌防水嗎？",
      "ja": "我們提供PVC和過膠防水餐牌，適合餐飲環境使用。"
    }
  },
  "disposable-menus": {
    "name": {
      "zh-hk": "一次性餐牌",
      "en": "Disposable Menus",
      "ja": "使い捨てメニュー"
    },
    "seo": {
      "zh-hk": {
        "title": "一次性餐牌印刷 | 即棄菜單 節日限定100張 | 智印雲 ZprintPro 香港本地",
        "description": "一次性餐牌印刷 100 張起, 採用 100-120g 書紙或再生紙, 配合四色數碼印刷, 成本低廉速度快, 適合大量派發的臨時菜單、節日套餐、活動特別版。100% 可回收。**智印雲 香港本地印刷**。",
        "h1": "經濟紙質，適合快餐店、外賣店。可頻繁更換內容。智印雲提供專業一次性餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["一次性餐牌", "即棄菜單", "試業餐牌", "限時優惠餐牌", "100張起印", "節日限定餐牌"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Disposable Menus | Waterproof Laminated | ZprintPro",
        "description": "Custom disposable menus from ZprintPro Hong Kong. Premium 250g coated/laminated waterproof, multiple A4/A5/custom options. 4-color CMYK printing, full design su",
        "h1": "Economical paper",
        "keywords": ["disposable menus", "custom disposable menus", "disposable menus printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "使い捨てメニュー | 防水 ラミネート | ZprintPro",
        "description": "使い捨てメニューの使い捨てメニューは ZprintPro にお任せ。250g コート/防水ラミネート 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-7営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " perfect for fast food and takeaway shops. ZprintPro offers professional Disposable Menus services in Hong Kong. High quality",
        "keywords": ["使い捨てメニュー", "使い捨てメニュー 印刷", "disposable menus"],
        "body": "経済的な紙、ファストフードやテイクアウト店に最適。 ZprintProは香港で使い捨てメニューサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業一次性餐牌服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "經濟紙質，適合快餐店、外賣店。可頻繁更換內容。智印雲提供專業的一次性餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為50個起訂，一次性餐牌可接受10個起。",
      "en": "餐牌防水嗎？",
      "ja": "我們提供PVC和過膠防水餐牌，適合餐飲環境使用。"
    }
  },
  "outdoor-vinyl-banners": {
    "name": {
      "zh-hk": "戶外燈布噴繪",
      "en": "Outdoor Vinyl Banners",
      "ja": "屋外バナー"
    },
    "seo": {
      "zh-hk": {
        "title": "戶外橫幅燈布印刷 | UV抗曬3-6月 建築圍板 | 智印雲 ZprintPro 香港本地",
        "description": "戶外橫幅燈布印刷, 採用 PVC/PET/戶外合成紙, 配合 UV 固化或環保溶劑墨水, 戶外耐候 3-6 個月。適合建築圍板、工地告示、活動橫幅。可選霧面降低反光, 邊緣可封邊延長壽命。**智印雲 香港本地印刷**。",
        
        "h1": "戶外燈布噴繪",
        "keywords": ["戶外橫幅", "燈布噴繪", "建築圍板", "UV 抗曬橫幅", "戶外廣告布", "抗颱風橫幅"],
        "body": " waterproof and UV-resistant"
      },
      "en": {
        "title": "Outdoor Vinyl Banners | Aluminum Stand HD Print | ZprintPro",
        "description": "Custom outdoor vinyl banners from ZprintPro Hong Kong. Premium PP synthetic/PVC, multiple 80x200cm options. 4-color CMYK printing, full design support. MOQ 1+, ",
        "h1": "大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。智印雲提供專業戶外燈布噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["outdoor vinyl banners", "custom outdoor vinyl banners", "outdoor vinyl banners printing hong kong"],
        "body": " strong weather resistance. ZprintPro offers professional Outdoor Vinyl Banners services in Hong Kong. High quality"
      },
      "ja": {
        "title": "屋外ビニールバナー | アルミスタンド 高画質 | ZprintPro",
        "description": "屋外ビニールバナーの屋外ビニールバナーは ZprintPro にお任せ。PP 合成紙/PVC 高品質用紙、80×200cm 各種対応。4色 CMYK 印刷、デザイン自由。1個〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Large outdoor vinyl banners",
        "keywords": ["屋外ビニールバナー", "屋外ビニールバナー 印刷", "outdoor vinyl banners"],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "大型屋外ビニールバナー、防水・UV耐性、強い耐候性。 ZprintProは香港で屋外バナーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業戶外燈布噴繪服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "大型戶外燈布，防水防曬，耐候性強，支持印刷即日速遞送貨。適合戶外廣告牌、建築圍板。智印雲提供專業的戶外燈布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "橫幅的最大尺寸可以做到多大？",
      "ja": "我們支持最寬5米的無縫拼接，長度不限。"
    }
  },
  "roll-up-banners": {
    "name": {
      "zh-hk": "易拉寶",
      "en": "Roll-up Banners",
      "ja": "ロールアップバナー"
    },
    "seo": {
      "zh-hk": {
        "title": "易拉寶印刷 | 加重底座 展會支架 1個起 | 智印雲 ZprintPro 香港本地",
        "description": "易拉寶印刷, 鋁合金支架 + 可反捲 PP 合成紙畫面組成, 單人數分鐘完成展開收納。畫面採用 180g 防水防曬 PP 紙, 配合 UV 固化油墨。底部加重桿降低晃動, 適合展會攤位、酒店簽到。**智印雲 香港本地印刷**。",
        
        "h1": "易拉寶",
        "keywords": ["易拉寶", "易拉架", "展會支架", "快裝橫幅", "加重底座", "展會易拉寶"],
        "body": " easy to install. Essential for exhibitions and roadshows. ZprintPro offers professional Roll-up Banners services in Hong Kong. High quality"
      },
      "en": {
        "title": "Roll-Up Banners | Aluminum Stand HD Print | ZprintPro",
        "description": "Custom roll-up banners from ZprintPro Hong Kong. Premium PP synthetic/PVC, multiple 80x200cm options. 4-color CMYK printing, full design support. MOQ 1+, turnar",
        "h1": "便攜易拉寶展架，安裝簡便。展會、路演必備。智印雲提供專業易拉寶服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["roll-up banners", "custom roll up banners", "roll up banners printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ロールアップバナー | アルミスタンド 高画質 | ZprintPro",
        "description": "ロールアップバナーのロールアップバナーは ZprintPro にお任せ。PP 合成紙/PVC 高品質用紙、80×200cm 各種対応。4色 CMYK 印刷、デザイン自由。1個〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Portable roll-up banner stands",
        "keywords": ["ロールアップバナー", "ロールアップバナー 印刷", "roll up banners"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "ポータブルロールアップバナースタンド、設置簡単。展示会やロードショーに必須。 ZprintProは香港でロールアップバナーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業易拉寶服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "便攜易拉寶展架，安裝簡便，支持印刷即日速遞送貨。展會、路演必備。智印雲提供專業的易拉寶服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "橫幅的最大尺寸可以做到多大？",
      "en": "我們支持最寬5米的無縫拼接，長度不限。",
      "ja": "戶外橫幅防曬防水嗎？"
    }
  },
  "adhesive-banners": {
    "name": {
      "zh-hk": "背膠噴繪",
      "en": "Adhesive Banners",
      "ja": "粘着バナー"
    },
    "seo": {
      "zh-hk": {
        "title": "背膠噴繪印刷 | 車貼可移膠 櫥窗導氣槽 | 智印雲 ZprintPro 香港本地",
        "description": "背膠噴繪印刷, 採用車貼、灰膠可移、透明膜或帶導氣槽底紙等材質, 適合櫥窗全貼、牆面主視覺、短期活動佈置。紙面可選霧面降低反光, 雙面貼玻璃可形成內外雙視覺效果。**智印雲 香港本地印刷**。",
        "h1": "自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。智印雲提供專業背膠噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["背膠噴繪", "車貼", "可移背膠", "櫥窗噴繪", "導氣槽背膠", "玻璃貼噴繪"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Adhesive Banners | Aluminum Stand HD Print | ZprintPro",
        "description": "Custom adhesive banners from ZprintPro Hong Kong. Premium PP synthetic/PVC, multiple 80x200cm options. 4-color CMYK printing, full design support. MOQ 1+, turna",
        "h1": "Self-adhesive",
        "keywords": ["adhesive banners", "custom adhesive banners", "adhesive banners printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "粘着バナー | アルミスタンド 高画質 | ZprintPro",
        "description": "粘着バナーの粘着バナーは ZprintPro にお任せ。PP 合成紙/PVC 高品質用紙、80×200cm 各種対応。4色 CMYK 印刷、デザイン自由。1個〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can be directly applied to walls or glass. ZprintPro offers professional Adhesive Banners services in Hong Kong. High quality",
        "keywords": ["粘着バナー", "粘着バナー 印刷", "adhesive banners"],
        "body": "自己粘着、壁やガラスに直接貼付可能。 ZprintProは香港で粘着バナーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業背膠噴繪服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。智印雲提供專業的背膠噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "我們支持最寬5米的無縫拼接，長度不限。",
      "en": "戶外橫幅防曬防水嗎？",
      "ja": "是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。"
    }
  },
  "vehicle-wraps": {
    "name": {
      "zh-hk": "車身廣告",
      "en": "Vehicle Wraps",
      "ja": "カーラッピング"
    },
    "seo": {
      "zh-hk": {
        "title": "車身貼印刷 | 全車包膜 鑄造級PVC | 智印雲 ZprintPro 香港本地印刷",
        "description": "車身貼印刷, 採用鑄造級 PVC 材質, 配合導氣槽底紙, 全車包膜不易起泡。適合商用車身廣告、品牌車隊、物流車隊包裝。可異形模切任意車型輪廓。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。智印雲提供專業車身廣告服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["車身貼", "車身廣告", "全車包膜", "鑄造級 PVC", "導氣槽車貼", "商用車身廣告"],
        "body": " no residue when removed. ZprintPro offers professional Vehicle Wraps services in Hong Kong. High quality"
      },
      "en": {
        "title": "Vehicle Wraps | Full Vehicle Wrap Custom | ZprintPro",
        "description": "Custom vehicle wraps from ZprintPro Hong Kong. Premium Vehicle wrap PVC, multiple Custom options. 4-color CMYK printing, full design support. MOQ 1+, turnaround",
        "h1": "Specialized vehicle wrap vinyl",
        "keywords": ["vehicle wraps", "custom vehicle wraps", "vehicle wraps printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "車両ラッピング | 車両フルラップ カスタム | ZprintPro",
        "description": "車両ラッピングの車両ラッピングは ZprintPro にお任せ。車体 wrap PVC 高品質用紙、カスタム 各種対応。4色 CMYK 印刷、デザイン自由。1セット〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " strong weather resistance",
        "keywords": ["車両ラッピング", "車両ラッピング 印刷", "vehicle wraps"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "専用車体ラップビニール、強い耐候性、剥がしても残りません。 ZprintProは香港でカーラッピングサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業車身廣告服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。智印雲提供專業的車身廣告服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "橫幅的最大尺寸可以做到多大？",
      "en": "我們支持最寬5米的無縫拼接，長度不限。",
      "ja": "戶外橫幅防曬防水嗎？"
    }
  },
  "mesh-banners": {
    "name": {
      "zh-hk": "網格布噴繪",
      "en": "Mesh Banners",
      "ja": "メッシュバナー"
    },
    "seo": {
      "zh-hk": {
        "title": "網孔布易拉寶印刷 | 透風抗風 高層外牆 | 智印雲 ZprintPro 香港本地",
        "description": "網孔布易拉寶印刷, 採用網孔布/網格布材質, 透風抗風, 適合高層外牆橫幅、建築棚網、抗風噴繪場景。戶外耐候 6-12 個月, 免費打樣, 48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "網格設計，透光透風。適合大型戶外廣告、建築圍板。智印雲提供專業網格布噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["網孔布易拉寶", "網格布", "透風橫幅", "高層外牆橫幅", "建築棚網", "抗風噴繪"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Mesh Banners | Aluminum Stand HD Print | ZprintPro",
        "description": "Custom mesh banners from ZprintPro Hong Kong. Premium PP synthetic/PVC, multiple 80x200cm options. 4-color CMYK printing, full design support. MOQ 1+, turnaroun",
        "h1": "Mesh design",
        "keywords": ["mesh banners", "custom mesh banners", "mesh banners printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "メッシュバナー | アルミスタンド 高画質 | ZprintPro",
        "description": "メッシュバナーのメッシュバナーは ZprintPro にお任せ。PP 合成紙/PVC 高品質用紙、80×200cm 各種対応。4色 CMYK 印刷、デザイン自由。1個〜〜、1-3営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " light and air permeable. Perfect for large outdoor advertising. ZprintPro offers professional Mesh Banners services in Hong Kong. High quality",
        "keywords": ["メッシュバナー", "メッシュバナー 印刷", "mesh banners"],
        "body": "メッシュデザイン、光と空気を通す。大型屋外広告に最適。 ZprintProは香港でメッシュバナーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業網格布噴繪服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "網格設計，透光透風。適合大型戶外廣告、建築圍板。智印雲提供專業的網格布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "我們支持最寬5米的無縫拼接，長度不限。",
      "en": "戶外橫幅防曬防水嗎？",
      "ja": "是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。"
    }
  },
  "catalog-printing": {
    "name": {
      "zh-hk": "畫冊印刷",
      "en": "Catalog Printing",
      "ja": "カタログ印刷"
    },
    "seo": {
      "zh-hk": {
        "title": "產品目錄畫冊印刷 | 騎馬釘膠裝 48-160頁 | 智印雲 ZprintPro 香港本地",
        "description": "產品目錄畫冊印刷 50 本起, 採用 157-200g 銅版紙或啞粉紙, 配合四色柯式印刷。封面可選 200-250g 銅版紙覆啞膠或光膠, 可加燙金、局部光油、壓凹。48 頁以上 A4 或 16 開騎馬釘或膠裝。**智印雲 香港本地印刷**。",
        
        "h1": "畫冊印刷",
        "keywords": ["畫冊印刷", "產品目錄", "品牌畫冊", "騎馬釘畫冊", "時尚品牌目錄", "美妝畫冊"],
        "body": " annual reports. ZprintPro offers professional Catalog Printing services in Hong Kong. High quality"
      },
      "en": {
        "title": "Catalog Printing | Professional Printing | ZprintPro",
        "description": "Custom catalog printing from ZprintPro Hong Kong. Premium 157g coated art paper, multiple Standard/custom options. 4-color CMYK printing, full design support. M",
        "h1": "高級畫冊，色彩還原度高。適合產品目錄、企業年報、藝術作品集。智印雲提供專業畫冊印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["catalog printing", "custom catalog printing", "catalog printing printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カタログ印刷 | プロ印刷 高品質 | ZprintPro",
        "description": "カタログ印刷のカタログ印刷は ZprintPro にお任せ。157g コート紙 高品質用紙、標準/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。100〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Premium catalogs with high color accuracy. Perfect for product catalogs",
        "keywords": ["カタログ印刷", "カタログ印刷 印刷", "catalog printing"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "高級カタログ、高い色再現性。製品カタログ、年次報告書に最適。 ZprintProは香港でカタログ印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業畫冊印刷服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "高級畫冊，色彩還原度高，支持印刷即日速遞送貨。適合產品目錄、企業年報、藝術作品集。智印雲提供專業的畫冊印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "書籍的最小訂購量是多少？",
      "en": "一般為100本起訂，畫冊和精裝書建議200本起。",
      "ja": "支持哪些裝訂方式？"
    }
  },
  "saddle-stitch-booklets": {
    "name": {
      "zh-hk": "騎馬釘小冊子",
      "en": "Saddle Stitch Booklets",
      "ja": "中綴じ冊子"
    },
    "seo": {
      "zh-hk": {
        "title": "騎馬釘小冊子印刷 | 8-64頁 學校活動手冊 | 智印雲 ZprintPro 香港本地",
        "description": "騎馬釘小冊子印刷 50 本起, 採用 128-157g 書紙或銅版紙, 配合四色柯式印刷及騎馬釘裝訂。8-64 頁 A4、A5、B5、16 開尺寸, 適合香港出版社、學校學會、活動主辦方。免費排版, 48 小時快遞。**智印雲 香港本地印刷**。",
        
        "h1": "騎馬釘小冊子",
        "keywords": ["騎馬釘小冊子", "騎馬釘", "小冊子印刷", "同人誌印刷", "活動手冊", "學校紀念冊"],
        "body": " perfect for booklets with fewer pages. ZprintPro offers professional Saddle Stitch Booklets services in Hong Kong. High quality"
      },
      "en": {
        "title": "Saddle Stitch Booklets | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom saddle stitch booklets from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design ",
        "h1": "經濟裝訂方式，適合頁數較少的冊子。產品說明書、活動手冊首選。智印雲提供專業騎馬釘小冊子服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["saddle stitch booklets", "custom saddle stitch booklets", "saddle stitch booklets printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "中綴じ冊子 | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "中綴じ冊子の中綴じ冊子は ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Economical binding method",
        "keywords": ["中綴じ冊子", "中綴じ冊子 印刷", "saddle stitch booklets"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "経済的な製本方法、ページ数の少ない冊子に最適。 ZprintProは香港で中綴じ冊子サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業騎馬釘小冊子服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "經濟裝訂方式，適合頁數較少的冊子，支持印刷即日速遞送貨。產品說明書、活動手冊首選。智印雲提供專業的騎馬釘小冊子服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "書籍的最小訂購量是多少？",
      "en": "一般為100本起訂，畫冊和精裝書建議200本起。",
      "ja": "支持哪些裝訂方式？"
    }
  },
  "perfect-bound-books": {
    "name": {
      "zh-hk": "無線膠裝書籍",
      "en": "Perfect Bound Books",
      "ja": "無線綴じ本"
    },
    "seo": {
      "zh-hk": {
        "title": "膠裝書印刷 | 雜誌年報 平攤閱讀 | 智印雲 ZprintPro 香港本地印刷",
        "description": "膠裝書印刷 50 本起, 採用 157-200g 啞粉紙或銅版紙, 配合 200-250g 封面銅版紙覆啞膠或光膠, 整本書可 180 度平攤閱讀。48 頁以上 A4、A5、B5 尺寸, 適合文化機構、品牌年報。**智印雲 香港本地印刷**。",
        "h1": "平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。智印雲提供專業無線膠裝書籍服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["膠裝書", "膠裝書印刷", "雜誌印刷", "年度報告", "品牌年報", "學校教材"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Perfect Bound Books | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom perfect bound books from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design sup",
        "h1": "Flat spine",
        "keywords": ["perfect bound books", "custom perfect bound books", "perfect bound books printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "無線綴じ冊子 | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "無線綴じ冊子の無線綴じ冊子は ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can print book title. Perfect for books and magazines with more pages. ZprintPro offers professional Perfect Bound Books services in Hong Kong. High quality",
        "keywords": ["無線綴じ冊子", "無線綴じ冊子 印刷", "perfect bound books"],
        "body": "平らな背表紙、書名を印刷可能。ページ数の多い本や雑誌に最適。 ZprintProは香港で無線綴じ本サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業無線膠裝書籍服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。智印雲提供專業的無線膠裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為100本起訂，畫冊和精裝書建議200本起。",
      "en": "支持哪些裝訂方式？",
      "ja": "我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。"
    }
  },
  "hardcover-books": {
    "name": {
      "zh-hk": "精裝書籍",
      "en": "Hardcover Books",
      "ja": "上製本"
    },
    "seo": {
      "zh-hk": {
        "title": "精裝書印刷 | 灰板硬皮 100年無酸紙 | 智印雲 ZprintPro 香港本地印刷",
        "description": "精裝書印刷 50 本起, 採用 2.5 毫米灰紙板封面裱糊 157-200g 銅版紙, 內頁 157-200g 銅版紙, 配合膠裝硬皮精裝。封面可燙金、壓凹或加局部光油, 適合畫廊、出版社、攝影師畫冊。**智印雲 香港本地印刷**。",
        "h1": "硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。智印雲提供專業精裝書籍服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["精裝書", "精裝畫冊", "紀念冊", "無酸紙書", "畫廊畫冊", "攝影師作品集"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Hardcover Books | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom hardcover books from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design support",
        "h1": "Hardcover binding",
        "keywords": ["hardcover books", "custom hardcover books", "hardcover books printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ハードカバー書籍 | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "ハードカバー書籍のハードカバー書籍は ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " luxurious and durable. Perfect for collector\\ ZprintPro offers professional Hardcover Books services in Hong Kong. High quality",
        "keywords": ["ハードカバー書籍", "ハードカバー書籍 印刷", "hardcover books"],
        "body": "上製本装丁、豪華で耐久性あり。愛蔵版、企業年鑑に最適。 ZprintProは香港で上製本サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業精裝書籍服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。智印雲提供專業的精裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為100本起訂，畫冊和精裝書建議200本起。",
      "en": "支持哪些裝訂方式？",
      "ja": "我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。"
    }
  },
  "spiral-notebooks": {
    "name": {
      "zh-hk": "線圈筆記本",
      "en": "Spiral Notebooks",
      "ja": "リングノート"
    },
    "seo": {
      "zh-hk": {
        "title": "線圈筆記本印刷 | YO圈裝訂 企業禮品 | 智印雲 ZprintPro 香港本地",
        "description": "線圈筆記本印刷 50 本起, 採用 80-100g 道林紙或書紙, 配合 YO 圈或金屬螺旋裝訂, 書脊可 180 度平攤書寫。封面可選 200g 銅版紙覆啞膠、光膠或透明聚丙烯片, 適合企業禮品。**智印雲 香港本地印刷**。",
        "h1": "線圈裝訂，可180度平攤。適合筆記本、工作手冊。智印雲提供專業線圈筆記本服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["線圈筆記本", "筆記本印刷", "YO 圈筆記本", "企業筆記本", "學生練習簿", "商務筆記本"],
        "body": " workbooks. ZprintPro offers professional Spiral Notebooks services in Hong Kong. High quality"
      },
      "en": {
        "title": "Spiral Notebooks | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom spiral notebooks from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design suppor",
        "h1": "Spiral binding",
        "keywords": ["spiral notebooks", "custom spiral notebooks", "spiral notebooks printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "スパイラルノート | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "スパイラルノートのスパイラルノートは ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can lay flat at 180 degrees. Perfect for notebooks",
        "keywords": ["スパイラルノート", "スパイラルノート 印刷", "spiral notebooks"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "スパイラル製本、180度に開く。ノート、ワークブックに最適。 ZprintProは香港でリングノートサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業線圈筆記本服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "線圈裝訂，可180度平攤。適合筆記本、工作手冊。智印雲提供專業的線圈筆記本服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "書籍的最小訂購量是多少？",
      "en": "一般為100本起訂，畫冊和精裝書建議200本起。",
      "ja": "支持哪些裝訂方式？"
    }
  },
  "business-envelopes": {
    "name": {
      "zh-hk": "公司信封",
      "en": "Business Envelopes",
      "ja": "ビジネス封筒"
    },
    "seo": {
      "zh-hk": {
        "title": "公司信封印刷 | DL/C5/C4 燙金開窗 100個 | 智印雲 ZprintPro 香港本地",
        "description": "公司信封印刷 100 個起, 採用 100-120g 高級書紙或白牛皮紙, 配合單色或四色柯式印刷, 可加燙金、燙銀、燙玫瑰金標誌。港式規格 110×220 毫米、C5、C4 三款國際標準尺寸, 可選透明窗口。**智印雲 香港本地印刷**。",
        
        "h1": "公司信封",
        "keywords": ["公司信封", "信封印刷", "信封訂製", "DL 信封", "C5 信封", "窗口信封"],
        "body": " essential for business. ZprintPro offers professional Business Envelopes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Business Envelopes | Double-Sided Multi-Size | ZprintPro",
        "description": "Custom business envelopes from ZprintPro Hong Kong. Premium 100g offset/white kraft, multiple DL/C5/C4 options. 4-color CMYK printing, full design support. MOQ ",
        "h1": "定制公司信封，印上Logo和地址。專業形象，商務必備。智印雲提供專業公司信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["business envelopes", "custom business envelopes", "business envelopes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "会社封筒 | 両面印刷 マルチサイズ | ZprintPro",
        "description": "会社封筒の会社封筒は ZprintPro にお任せ。100g 筆記用紙/白クラフト 高品質用紙、DL/C5/C4 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Custom business envelopes with logo and address. Professional image",
        "keywords": ["会社封筒", "会社封筒 印刷", "business envelopes"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "カスタムビジネス封筒、ロゴと住所を印刷。プロフェッショナルなイメージ。 ZprintProは香港でビジネス封筒サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業公司信封服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "定制公司信封，印上Logo和地址，支持印刷即日速遞送貨。專業形象，商務必備。智印雲提供專業的公司信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "信封的最小訂購量是多少？",
      "en": "一般為500個起訂，彩色和特殊材質需1000個起。",
      "ja": "可以定制信封的尺寸嗎？"
    }
  },
  "colored-envelopes": {
    "name": {
      "zh-hk": "彩色信封",
      "en": "Colored Envelopes",
      "ja": "カラー封筒"
    },
    "seo": {
      "zh-hk": {
        "title": "彩色信封印刷 | 婚禮邀請 品牌視覺統一 | 智印雲 ZprintPro 香港本地",
        "description": "彩色信封印刷 100 個起, 採用 100-120g 高級白卡或染色紙, 配合四色印刷或專色金銀, 可加燙金、燙銀、局部光油、壓凹。港式規格 110×220 毫米、C5、C4 三款國際標準尺寸。**智印雲 香港本地印刷**。",
        
        "h1": "彩色信封",
        "keywords": ["彩色信封", "信封印刷", "信封訂製", "婚禮信封", "專色信封", "品牌視覺信封"],
        "body": " strong visual appeal. Perfect for invitations"
      },
      "en": {
        "title": "Colored Envelopes | Double-Sided Multi-Size | ZprintPro",
        "description": "Custom colored envelopes from ZprintPro Hong Kong. Premium 100g offset/white kraft, multiple DL/C5/C4 options. 4-color CMYK printing, full design support. MOQ 1",
        "h1": "彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。智印雲提供專業彩色信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["colored envelopes", "custom colored envelopes", "colored envelopes printing hong kong"],
        "body": " greeting cards. ZprintPro offers professional Colored Envelopes services in Hong Kong. High quality"
      },
      "ja": {
        "title": "カラー封筒 | 両面印刷 マルチサイズ | ZprintPro",
        "description": "カラー封筒のカラー封筒は ZprintPro にお任せ。100g 筆記用紙/白クラフト 高品質用紙、DL/C5/C4 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Colorful printing",
        "keywords": ["カラー封筒", "カラー封筒 印刷", "colored envelopes"],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "カラフルな印刷、強い視覚的アピール。招待状、グリーティングカードに最適。 ZprintProは香港でカラー封筒サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業彩色信封服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "彩色印刷，視覺吸引力強，支持印刷即日速遞送貨。適合邀請函、賀卡、營銷郵件。智印雲提供專業的彩色信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "信封的最小訂購量是多少？",
      "ja": "一般為500個起訂，彩色和特殊材質需1000個起。"
    }
  },
  "large-envelopes": {
    "name": {
      "zh-hk": "大號信封",
      "en": "Large Envelopes",
      "ja": "大判封筒"
    },
    "seo": {
      "zh-hk": {
        "title": "大號C4信封印刷 | A4免摺疊 律師樓合同 | 智印雲 ZprintPro 香港本地",
        "description": "大號信封印刷 100 個起, C4 規格 229×324 毫米可平整放入 A4 文件不摺疊, 適合合約、標書、成績單、正式文件存檔。紙材可選 100-120g 高級書紙, 可加燙金標誌、燙銀印章。**智印雲 香港本地印刷**。",
        "h1": "A4尺寸大信封，可裝入文件、合同。辦公室必備。智印雲提供專業大號信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["大號信封", "信封印刷", "C4 信封", "合同信封", "文件信封", "律師樓信封"],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Large Envelopes | Double-Sided Multi-Size | ZprintPro",
        "description": "Custom large envelopes from ZprintPro Hong Kong. Premium 100g offset/white kraft, multiple DL/C5/C4 options. 4-color CMYK printing, full design support. MOQ 100",
        "h1": "A4 size large envelopes",
        "keywords": ["large envelopes", "custom large envelopes", "large envelopes printing hong kong"],
        "body": " fast delivery."
      },
      "ja": {
        "title": "大型封筒 | 両面印刷 マルチサイズ | ZprintPro",
        "description": "大型封筒の大型封筒は ZprintPro にお任せ。100g 筆記用紙/白クラフト 高品質用紙、DL/C5/C4 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " can hold documents and contracts. Office essential. ZprintPro offers professional Large Envelopes services in Hong Kong. High quality",
        "keywords": ["大型封筒", "大型封筒 印刷", "large envelopes"],
        "body": "A4サイズの大きな封筒、書類や契約書を入れられます。オフィスに必須。 ZprintProは香港で大判封筒サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業大號信封服務 | 智印雲",
        "a": ""
      },
      {
        "q": "",
        "a": "A4尺寸大信封，可裝入文件、合同。辦公室必備。智印雲提供專業的大號信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "一般為500個起訂，彩色和特殊材質需1000個起。",
      "en": "可以定制信封的尺寸嗎？",
      "ja": "可以。我們支持各種國際標準尺寸和完全定制尺寸。"
    }
  },
  "pearl-envelopes": {
    "name": {
      "zh-hk": "珠光信封",
      "en": "Pearl Envelopes",
      "ja": "パール封筒"
    },
    "seo": {
      "zh-hk": {
        "title": "珠光信封印刷 | VIP邀請函 婚禮珍珠紙 | 智印雲 ZprintPro 香港本地",
        "description": "珠光信封印刷 100 個起, 採用 120g 珠光紙, 表面呈現珍珠光澤, 適合 VIP 邀請函、婚禮邀請、高端品牌活動。支援燙金、燙銀、壓凹、UV 局部工藝。1-3 個工作天交貨, 港九免費速遞。**智印雲 香港本地印刷**。",
        "h1": "珠光紙張，閃耀質感。適合婚禮邀請、高端活動。智印雲提供專業珠光信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["珠光信封", "珍珠光信封", "VIP 邀請信封", "珍珠紙信封", "婚禮邀請", "高端信封"],
        "body": " high-end events. ZprintPro offers professional Pearl Envelopes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Pearl Envelopes | Double-Sided Multi-Size | ZprintPro",
        "description": "Custom pearl envelopes from ZprintPro Hong Kong. Premium 100g offset/white kraft, multiple DL/C5/C4 options. 4-color CMYK printing, full design support. MOQ 100",
        "h1": "Pearl paper",
        "keywords": ["pearl envelopes", "custom pearl envelopes", "pearl envelopes printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "パール封筒 | 両面印刷 マルチサイズ | ZprintPro",
        "description": "パール封筒のパール封筒は ZprintPro にお任せ。100g 筆記用紙/白クラフト 高品質用紙、DL/C5/C4 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " shimmering quality. Perfect for wedding invitations",
        "keywords": ["パール封筒", "パール封筒 印刷", "pearl envelopes"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "パール紙、輝く質感。結婚式の招待状、高級イベントに最適。 ZprintProは香港でパール封筒サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業珠光信封服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "珠光紙張，閃耀質感。適合婚禮邀請、高端活動。智印雲提供專業的珠光信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "信封的最小訂購量是多少？",
      "en": "一般為500個起訂，彩色和特殊材質需1000個起。",
      "ja": "可以定制信封的尺寸嗎？"
    }
  },
  "exercise-books": {
    "name": {
      "zh-hk": "作業簿印刷",
      "en": "Exercise Books",
      "ja": "ワークブック印刷"
    },
    "seo": {
      "zh-hk": {
        "title": "練習簿印刷 | 學校作業簿 田字格 100本 | 智印雲 ZprintPro 香港本地",
        "description": "練習簿印刷 100 本起, 採用 80-100g 道林紙或書紙, 配合封面四色印刷及騎馬釘裝訂。內頁可印橫線、方格、田字格或空白, 符合香港教育局紙張標準。48 小時快遞直送校舍, 觀塘門市自取。**智印雲 香港本地印刷**。",
        
        "h1": "作業簿印刷",
        "keywords": ["練習簿", "作業簿", "校簿印刷", "學校作業簿", "田字格簿", "橫線簿"],
        "body": " customizable cover and inner page formats. Perfect for schools. ZprintPro offers professional Exercise Books services in Hong Kong. High quality"
      },
      "en": {
        "title": "Exercise Books | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom exercise books from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design support.",
        "h1": "學校作業簿，可定制封面和內頁格式。適合中小學、補習社。智印雲提供專業作業簿印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["exercise books", "custom exercise books", "exercise books printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "練習帳 | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "練習帳の練習帳は ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "School exercise books",
        "keywords": ["練習帳", "練習帳 印刷", "exercise books"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "学校のワークブック、カスタマイズ可能な表紙と内側ページ形式。小中校、塾に最適。 ZprintProは香港でワークブック印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業作業簿印刷服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "學校作業簿，可定制封面和內頁格式，支持印刷即日速遞送貨。適合中小學、補習社。智印雲提供專業的作業簿印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "校園印刷的最小訂購量是多少？",
      "en": "一般為100本/張起訂，學校批量訂單可享受優惠價格。",
      "ja": "支持學校採購流程嗎？"
    }
  },
  "certificates": {
    "name": {
      "zh-hk": "證書印刷",
      "en": "Certificates",
      "ja": "賞状印刷"
    },
    "seo": {
      "zh-hk": {
        "title": "證書印刷 | 水印紙 燙金 獨立序號 | 智印雲 ZprintPro 香港本地印刷",
        "description": "證書印刷 100 張起, 採用 200-250g 米色水印紙、棉質紙或無酸紙, 配合四色印刷及燙金工藝。可加燙金徽章、燙銀字體、燙玫瑰金邊框, 配合防偽底紋、浮水印及獨立序號。**智印雲 香港本地印刷**。",
        
        "h1": "證書印刷",
        "keywords": ["證書印刷", "獎狀印刷", "燙金證書", "水印紙證書", "獨立序號", "專業學會證書"],
        "body": " embossing and other processes. ZprintPro offers professional Certificates services in Hong Kong. High quality"
      },
      "en": {
        "title": "Certificate Printing | Professional Printing | ZprintPro",
        "description": "Custom certificate printing from ZprintPro Hong Kong. Premium 157g coated art paper, multiple Standard/custom options. 4-color CMYK printing, full design suppor",
        "h1": "精美證書，配合燙金、壓紋等工藝。畢業證書、獎狀、資格證明。智印雲提供專業證書印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["certificate printing", "custom certificates", "certificates printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "賞状印刷 | プロ印刷 高品質 | ZprintPro",
        "description": "賞状印刷の賞状印刷は ZprintPro にお任せ。157g コート紙 高品質用紙、標準/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。100〜〜、3-5営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": "Exquisite certificates with foil stamping",
        "keywords": ["賞状印刷", "賞状印刷 印刷", "certificates"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "精巧な賞状、箔押し・エンボスなどの加工付き。卒業証書、賞状、資格証明。 ZprintProは香港で賞状印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業證書印刷服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "精美證書，配合燙金、壓紋等工藝，支持印刷即日速遞送貨。畢業證書、獎狀、資格證明。智印雲提供專業的證書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "校園印刷的最小訂購量是多少？",
      "en": "一般為100本/張起訂，學校批量訂單可享受優惠價格。",
      "ja": "支持學校採購流程嗎？"
    }
  },
  "school-flyers": {
    "name": {
      "zh-hk": "學校單張",
      "en": "School Flyers",
      "ja": "学校チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "學校宣傳單張印刷 | 招生傳單 QR報名 200張 | 智印雲 ZprintPro 香港本地",
        "description": "學校宣傳單張印刷 200 張起, 採用 128-157g 銅版紙或書紙, 配合四色數碼或柯式印刷。紙張通過 FSC 環保認證, 符合香港教育局校園印刷標準, 適合中小學、補習社、大學招生。**智印雲 香港本地印刷**。",
        "h1": "學校通告、活動宣傳單張。經濟實惠，大量印刷。智印雲提供專業學校單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["學校單張", "學校印刷", "招生單張", "校園傳單", "QR 報名", "補習社單張"],
        "body": " bulk printing. ZprintPro offers professional School Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "School Flyers | Double-Sided CMYK 100+ MOQ | ZprintPro",
        "description": "Custom school flyers from ZprintPro Hong Kong. Premium 157g-300g coated art paper, multiple A4/A5/A6/DL options. 4-color CMYK printing, full design support. MOQ",
        "h1": "School notices",
        "keywords": ["school flyers", "custom school flyers", "school flyers printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "学校チラシ | 両面フルカラー 100枚〜 | ZprintPro",
        "description": "学校チラシの学校チラシは ZprintPro にお任せ。157g-300g コート紙 高品質用紙、A4/A5/A6/DL 各種対応。4色 CMYK 印刷、デザイン自由。100枚〜〜、翌日-2営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " event promotional flyers. Economical",
        "keywords": ["学校チラシ", "学校チラシ 印刷", "school flyers"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "学校の通知、イベント宣伝チラシ。経済的、大量印刷。 ZprintProは香港で学校チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業學校單張服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "學校通告、活動宣傳單張。經濟實惠，大量印刷。智印雲提供專業的學校單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "校園印刷的最小訂購量是多少？",
      "en": "一般為100本/張起訂，學校批量訂單可享受優惠價格。",
      "ja": "支持學校採購流程嗎？"
    }
  },
  "textbooks": {
    "name": {
      "zh-hk": "教科書印刷",
      "en": "Textbooks",
      "ja": "教科書印刷"
    },
    "seo": {
      "zh-hk": {
        "title": "教科書印刷 | 道林紙米黃書紙 教育局標準 | 智印雲 ZprintPro 香港本地印刷",
        "description": "教科書印刷 50 本起, 採用 80-100g 道林紙或米黃書紙, 配合封面四色柯式印刷及騎馬釘或膠裝。紙張符合香港教育局教科書規格, 可加印國際標準書號、版權頁、學校標誌。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "教材、教科書印刷。專業排版，品質保證。智印雲提供專業教科書印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": ["教科書", "教科書印刷", "教材印刷", "道林紙教科書", "補習社課本", "學校教材"],
        "body": " quality guaranteed. ZprintPro offers professional Textbooks services in Hong Kong. High quality"
      },
      "en": {
        "title": "Textbooks | Saddle/PB Binding 50+ | ZprintPro",
        "description": "Custom textbooks from ZprintPro Hong Kong. Premium Inner 157g coated/cover 250g, multiple A4/A5/custom options. 4-color CMYK printing, full design support. MOQ ",
        "h1": "Teaching materials",
        "keywords": ["textbooks", "custom textbooks", "textbooks printing hong kong"],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "教科書 | 中綴じ/無線綴じ 50冊〜 | ZprintPro",
        "description": "教科書の教科書は ZprintPro にお任せ。本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタム 各種対応。4色 CMYK 印刷、デザイン自由。50冊〜〜、5-10営業日で全国配送。30秒無料見積もり、深夜対応OK。香港直結の安心感。",
        "h1": " textbook printing. Professional typesetting",
        "keywords": ["教科書", "教科書 印刷", "textbooks"],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "教材、教科書の印刷。プロの組版、品質保証。 ZprintProは香港で教科書印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業教科書印刷服務 | 智印雲"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "教材、教科書印刷。專業排版，品質保證。智印雲提供專業的教科書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "校園印刷的最小訂購量是多少？",
      "en": "一般為100本/張起訂，學校批量訂單可享受優惠價格。",
      "ja": "支持學校採購流程嗎？"
    }
  },

  "magnetic-closure-gift-box": {
    "name": {
      "zh-hk": "磁吸翻蓋禮盒",
      "en": "Magnetic Closure Gift Box",
      "ja": "マグネット式ギフトボックス"
    },
    "seo": {
      "zh-hk": {
        "title": "磁吸翻蓋禮盒印刷 | 高端定制 48小時交貨 | 智印雲 ZprintPro 香港本地",
        "description": "磁吸翻蓋禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 磁吸開合儀式感強, 適合高端產品包裝、珠寶、奢侈品、月餅。灰板通過 FSC 認證, 免費打樣, 支援燙金、壓凹、局部光油。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "磁吸翻蓋禮盒",
        "keywords": ["磁吸翻蓋禮盒", "磁吸禮盒", "翻蓋禮盒", "高端禮盒", "奢侈品包裝", "珠寶首飾盒"],
        "body": " magnetic closure gift box"
      },
      "en": {
        "title": "Magnetic Closure Gift Box | Custom Printing | ZprintPro",
        "description": "Custom Magnetic Closure Gift Box from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "magnetic closure gift box",
        "keywords": ["magnetic closure gift box", "custom magnetic closure gift box"],
        "body": " magnetic closure gift box"
      },
      "ja": {
        "title": "マグネット式ギフトボックス | カスタム印刷 | ZprintPro",
        "description": "マグネット式ギフトボックスのカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " magnetic closure gift box",
        "keywords": ["マグネット式ギフトボックス", "magnetic closure gift box"],
        "body": " magnetic closure gift box"
      }
    },
    "faqs": [
      { "q": "磁吸翻蓋禮盒 印刷", "a": "香港 磁吸翻蓋禮盒" },
      { "q": "磁吸翻蓋禮盒 價錢", "a": "智印雲提供 磁吸翻蓋禮盒 透明價格" },
      { "q": "急件 磁吸翻蓋禮盒", "a": "48 小時快遞、觀塘門市自取" }
    ],
    "imageAlt": {
      "zh-hk": "磁吸翻蓋禮盒 - 香港本地印刷 智印雲",
      "en": "Magnetic Closure Gift Box - Hong Kong printing ZprintPro",
      "ja": "マグネット式ギフトボックス - 香港印刷 ZprintPro"
    }
  },

  "electronics-packaging-box": {
    "name": {
      "zh-hk": "電子產品包裝盒",
      "en": "Electronics Packaging Box",
      "ja": "電子製品包装箱"
    },
    "seo": {
      "zh-hk": {
        "title": "電子產品包裝盒印刷 | 3C數碼 EVA內襯 | 智印雲 ZprintPro 香港本地",
        "description": "電子產品包裝盒印刷 100 個起, 採用瓦楞紙板或白卡紙, EVA 海棉內襯, 緩衝抗震設計, 適合 3C 數碼、手機配件、智能設備包裝。支援多款規格尺寸, 免費結構設計打樣。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "電子產品包裝盒",
        "keywords": ["電子產品包裝盒", "3C 包裝盒", "EVA 內托", "防靜電包裝", "智能設備盒", "手機配件盒"],
        "body": " electronics packaging box"
      },
      "en": {
        "title": "Electronics Packaging Box | Custom Printing | ZprintPro",
        "description": "Custom Electronics Packaging Box from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "electronics packaging box",
        "keywords": ["electronics packaging box", "custom electronics packaging box"],
        "body": " electronics packaging box"
      },
      "ja": {
        "title": "電子製品包装箱 | カスタム印刷 | ZprintPro",
        "description": "電子製品包装箱のカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " electronics packaging box",
        "keywords": ["電子製品包装箱", "electronics packaging box"],
        "body": " electronics packaging box"
      }
    },
    "faqs": [
      { "q": "電子產品包裝盒 印刷", "a": "香港 電子產品包裝盒" },
      { "q": "電子產品包裝盒 價錢", "a": "智印雲提供 電子產品包裝盒 透明價格" },
      { "q": "急件 電子產品包裝盒", "a": "48 小時快遞、觀塘門市自取" }
    ],
    "imageAlt": {
      "zh-hk": "電子產品包裝盒 - 香港本地印刷 智印雲",
      "en": "Electronics Packaging Box - Hong Kong printing ZprintPro",
      "ja": "電子製品包装箱 - 香港印刷 ZprintPro"
    }
  },

  "kraft-paper-packaging-box": {
    "name": {
      "zh-hk": "牛皮紙包裝印刷盒",
      "en": "Kraft Paper Packaging Box",
      "ja": "クラフト紙包装箱"
    },
    "seo": {
      "zh-hk": {
        "title": "牛皮紙包裝印刷盒 | 環保材質 多尺寸 100個 | 智印雲 ZprintPro 香港本地",
        "description": "牛皮紙包裝印刷盒 100 個起, 採用 250g-350g 進口牛皮紙, 印刷 Logo 清晰自然, 適合茶葉、月餅、禮品、烘焙產品包裝。紙材通過 FSC 環保認證, 100% 可回收, 支援燙金、壓凹、局部光油。**智印雲 香港本地印刷**。",
        "h1": "牛皮紙包裝印刷盒",
        "keywords": ["牛皮紙包裝盒", "牛皮紙盒", "可降解包裝", "手工皂盒", "茶葉包裝盒", "環保禮品盒"],
        "body": " kraft paper packaging box"
      },
      "en": {
        "title": "Kraft Paper Packaging Box | Custom Printing | ZprintPro",
        "description": "Custom Kraft Paper Packaging Box from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "kraft paper packaging box",
        "keywords": ["kraft paper packaging box", "custom kraft paper packaging box"],
        "body": " kraft paper packaging box"
      },
      "ja": {
        "title": "クラフト紙包装箱 | カスタム印刷 | ZprintPro",
        "description": "クラフト紙包装箱のカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " kraft paper packaging box",
        "keywords": ["クラフト紙包装箱", "kraft paper packaging box"],
        "body": " kraft paper packaging box"
      }
    },
    "faqs": [
      { "q": "牛皮紙包裝印刷盒 印刷", "a": "香港 牛皮紙包裝印刷盒" },
      { "q": "牛皮紙包裝印刷盒 價錢", "a": "智印雲提供 牛皮紙包裝印刷盒 透明價格" },
      { "q": "急件 牛皮紙包裝印刷盒", "a": "48 小時快遞、觀塘門市自取" }
    ],
    "imageAlt": {
      "zh-hk": "牛皮紙包裝印刷盒 - 香港本地印刷 智印雲",
      "en": "Kraft Paper Packaging Box - Hong Kong printing ZprintPro",
      "ja": "クラフト紙包装箱 - 香港印刷 ZprintPro"
    }
  },

  "drawer-slide-gift-box": {
    "name": {
      "zh-hk": "抽屜式禮盒印刷",
      "en": "Drawer Slide Gift Box",
      "ja": "引き出し式ギフトボックス"
    },
    "seo": {
      "zh-hk": {
        "title": "抽屜式禮盒印刷 | 高端滑動開合 定制結構 | 智印雲 ZprintPro 香港本地",
        "description": "抽屜式禮盒印刷 100 個起, 採用 1200g 灰板外裱特種紙, 滑動開合設計, 結構新穎有儀式感, 適合高端首飾、手錶、化妝品禮盒。免費結構設計打樣, 支援燙金、壓凹、局部光油、絲帶提手。**智印雲 香港本地印刷**。",
        "h1": "抽屜式禮盒印刷",
        "keywords": ["抽屜式禮盒", "抽拉盒", "滑軌禮盒", "首飾盒", "高端禮盒", "滑動開合"],
        "body": " drawer slide gift box"
      },
      "en": {
        "title": "Drawer Slide Gift Box | Custom Printing | ZprintPro",
        "description": "Custom Drawer Slide Gift Box from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "drawer slide gift box",
        "keywords": ["drawer slide gift box", "custom drawer slide gift box"],
        "body": " drawer slide gift box"
      },
      "ja": {
        "title": "引き出し式ギフトボックス | カスタム印刷 | ZprintPro",
        "description": "引き出し式ギフトボックスのカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " drawer slide gift box",
        "keywords": ["引き出し式ギフトボックス", "drawer slide gift box"],
        "body": " drawer slide gift box"
      }
    },
    "faqs": [
      { "q": "抽屜式禮盒印刷 印刷", "a": "香港 抽屜式禮盒印刷" },
      { "q": "抽屜式禮盒印刷 價錢", "a": "智印雲提供 抽屜式禮盒印刷 透明價格" },
      { "q": "急件 抽屜式禮盒印刷", "a": "48 小時快遞、觀塘門市自取" }
    ],
    "imageAlt": {
      "zh-hk": "抽屜式禮盒印刷 - 香港本地印刷 智印雲",
      "en": "Drawer Slide Gift Box - Hong Kong printing ZprintPro",
      "ja": "引き出し式ギフトボックス - 香港印刷 ZprintPro"
    }
  },

  "fruit-food-label-stickers": {
    "name": {
      "zh-hk": "水果及食品標籤印刷",
      "en": "Fruit & Food Label Stickers",
      "ja": "フルーツ・食品ラベル印刷"
    },
    "seo": {
      "zh-hk": {
        "title": "水果食品標籤印刷 | 防水防油SGS認證 1000張 | 智印雲 ZprintPro 香港本地",
        "description": "水果及食品標籤印刷 500 張起, 採用防水 PVC 或 PP 合成紙, 通過 SGS 食品接觸安全認證, 適合水果店、有機食品、烘焙店、外賣包裝。耐低溫防霧氣設計, 表面防水防油, 支援可變序號及二維碼。48 小時快遞, 觀塘門市自取。**智印雲 香港本地印刷**。",
        "h1": "水果及食品標籤印刷",
        "keywords": ["水果標籤", "食品標籤", "生鮮標籤", "防水食品貼", "PLA 降解標籤", "有機食品貼"],
        "body": " fruit food label stickers"
      },
      "en": {
        "title": "Fruit & Food Label Stickers | Custom Printing | ZprintPro",
        "description": "Custom Fruit & Food Label Stickers from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "fruit & food label stickers",
        "keywords": ["fruit & food label stickers", "custom fruit & food label stickers"],
        "body": " fruit & food label stickers"
      },
      "ja": {
        "title": "フルーツ・食品ラベル印刷 | カスタム印刷 | ZprintPro",
        "description": "フルーツ・食品ラベル印刷のカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " fruit & food label stickers",
        "keywords": ["フルーツ・食品ラベル印刷", "fruit & food label stickers"],
        "body": " fruit & food label stickers"
      }
    },
    "faqs": [
      { "q": "水果及食品標籤印刷 印刷", "a": "香港 水果及食品標籤印刷" },
      { "q": "水果及食品標籤印刷 價錢", "a": "智印雲提供 水果及食品標籤印刷 透明價格" },
      { "q": "急件 水果及食品標籤印刷", "a": "48 小時快遞、觀塘門市自取" }
    ],
    "imageAlt": {
      "zh-hk": "水果及食品標籤印刷 - 香港本地印刷 智印雲",
      "en": "Fruit & Food Label Stickers - Hong Kong printing ZprintPro",
      "ja": "フルーツ・食品ラベル印刷 - 香港印刷 ZprintPro"
    }
  },

};

export function getSkuSeo(slug: string): SkuSeoEntry | undefined {
  return skuSeoData[slug];
}
