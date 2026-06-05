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
    "seo": {
      "zh-hk": {
        "title": "高級商務咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "快印名片",
        "h1": "印刷即日速遞送貨",
        "keywords": [
          "名片印刷"
        ],
        "body": " custom name cards"
      },
      "en": {
        "title": "Premium Business Cards | Professional Printing | ZprintPro",
        "description": "咭片印刷",
        "h1": "business card printing Hong Kong",
        "keywords": [
          "名片印刷"
        ],
        "body": " rush business cards"
      },
      "ja": {
        "title": "高級名刺 | プロ印刷 | ZprintPro",
        "description": "高級名片",
        "h1": " premium business cards",
        "keywords": [
          "名片印刷"
        ],
        "body": " same day delivery"
      }
    },
    "faqs": [
      {
        "q": "名刺印刷",
        "a": "香港名刺"
      },
      {
        "q": "高級名刺",
        "a": "オーダーメイド名刺"
      },
      {
        "q": "急ぎ名刺",
        "a": "即日配送"
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
    "seo": {
      "zh-hk": {
        "title": "厚身咭片(400g) | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印港提供專業厚身咭片(400g)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "厚身咭片(400g)"
        ],
        "body": " lawyers. ZprintPro offers professional Thick Business Cards (400g) services in Hong Kong. High quality"
      },
      "en": {
        "title": "Thick Business Cards (400g) | Professional Printing | ZprintPro",
        "description": "",
        "h1": "400g ultra-thick paper with substantial feel. Perfect for high-end service industry",
        "keywords": [
          "厚身咭片(400g)"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "厚紙名刺(400g) | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " designers",
        "keywords": [
          "厚身咭片(400g)"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "400g超厚紙、重厚な質感。高級サービス業、デザイナー、弁護士向け。 ZprintProは香港で厚紙名刺(400g)サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業厚身咭片(400g)服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印港提供專業的厚身咭片(400g)服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "燙金/燙銀咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "燙印工藝",
        "h1": "foil stamped business cards",
        "keywords": [
          "燙金名片"
        ],
        "body": " gold foil printing Hong Kong"
      },
      "en": {
        "title": "Foil Stamped Business Cards | Professional Printing | ZprintPro",
        "description": "香港燙金",
        "h1": " metallic business cards",
        "keywords": [
          "燙金名片"
        ],
        "body": " same day delivery"
      },
      "ja": {
        "title": "箔押し名刺 | プロ印刷 | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": " luxury name cards",
        "keywords": [
          "燙金名片"
        ],
        "body": "箔押し名刺"
      }
    },
    "faqs": [
      {
        "q": "メタリック名刺",
        "a": "高級名刺"
      },
      {
        "q": "ゴールド foil",
        "a": "香港 箔押し"
      },
      {
        "q": "即日配送",
        "a": "局部燙金或燙銀工藝，在光線下閃耀奪目，瞬間提升品牌檔次。可燙金色、銀色、玫瑰金等多種顏色。智印港提供專業燙金/燙銀咭片服務，香港本地印刷，品質保證，價格透明。"
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
    "seo": {
      "zh-hk": {
        "title": "UV局部光油咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "特殊工藝名片",
        "h1": "spot UV business cards",
        "keywords": [
          "局部UV名片"
        ],
        "body": " special finish cards"
      },
      "en": {
        "title": "Spot UV Business Cards | Professional Printing | ZprintPro",
        "description": "光油名片",
        "h1": " embossed business cards",
        "keywords": [
          "局部UV名片"
        ],
        "body": " same day delivery"
      },
      "ja": {
        "title": "局部UV名刺 | プロ印刷 | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": " textured name cards",
        "keywords": [
          "局部UV名片"
        ],
        "body": "局部UV名刺"
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
        "q": "局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。智印港提供專業UV局部光油咭片服務，香港本地印刷，品質保證，價格透明。",
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
        "title": "啞膠咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印港提供專業啞膠咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "啞膠咭片"
        ],
        "body": " fast delivery."
      },
      "en": {
        "title": "Matte Laminated Cards | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Matte lamination provides understated elegance and resists fingerprints. For detail-oriented professionals. ZprintPro offers professional Matte Laminated Cards services in Hong Kong. High quality",
        "keywords": [
          "啞膠咭片"
        ],
        "body": "マットラミネーション加工、落ち着いた質感で指紋が付きにくい。 ZprintProは香港でマット名刺サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      "ja": {
        "title": "マット名刺 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " transparent pricing",
        "keywords": [
          "啞膠咭片"
        ],
        "body": "專業啞膠咭片服務 | 智印港"
      }
    },
    "faqs": [
      {
        "q": "",
        "a": ""
      },
      {
        "q": "啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印港提供專業的啞膠咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "圓角咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "模切名片",
        "h1": " safe edge cards",
        "keywords": [
          "圓角名片"
        ],
        "body": " same day delivery"
      },
      "en": {
        "title": "Rounded Corner Cards | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": " creative name cards",
        "keywords": [
          "圓角名片"
        ],
        "body": "角丸名刺"
      },
      "ja": {
        "title": "丸角名刺 | プロ印刷 | ZprintPro",
        "description": "rounded corner business cards",
        "h1": " die cut cards",
        "keywords": [
          "圓角名片"
        ],
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
        "a": "圓角設計，柔和美觀且不易折損。展現與眾不同的品味，適合創意產業。智印港提供專業圓角咭片服務，香港本地印刷，品質保證，價格透明。"
      },
      {
        "q": "Rounded corners for soft aesthetics and durability. Shows unique taste",
        "a": " perfect for creative industries. ZprintPro offers professional Rounded Corner Cards services in Hong Kong. High quality"
      }
    ],
    "imageAlt": {
      "zh-hk": " fast delivery.",
      "en": "丸角デザイン、柔らかく美しく折れにくい。クリエイティブ業界向け。 ZprintProは香港で丸角名刺サービスを提供。高品質、透明な価格、迅速な納品。",
      "ja": "時尚圓角名片定制 | 智印港"
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
        "title": "雙面咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "雙面全彩印刷，充分利用空間展示更多信息。背面可印公司理念、產品介紹或聯絡方式。智印港提供專業雙面咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "雙面咭片"
        ],
        "body": " or contact details. ZprintPro offers professional Double-sided Cards services in Hong Kong. High quality"
      },
      "en": {
        "title": "Double-sided Cards | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Double-sided full color printing maximizes space for information. Back can show company values",
        "keywords": [
          "雙面咭片"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "両面名刺 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " products",
        "keywords": [
          "雙面咭片"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "両面フルカラー印刷で情報スペースを最大限に活用。 ZprintProは香港で両面名刺サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業雙面咭片服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "雙面全彩印刷，充分利用空間展示更多信息。背面可印公司理念、產品介紹或聯絡方式。智印港提供專業的雙面咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "即日咭片印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "即日咭片印刷"
        ],
        "body": " ready in 4 hours. Quality not compromised"
      },
      "en": {
        "title": "Same-day Business Cards | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "緊急需求首選，最快4小時取貨。品質不打折，急件也能展現專業形象。智印港提供專業即日咭片印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "即日咭片印刷"
        ],
        "body": " rush orders still look professional. ZprintPro offers professional Same-day Business Cards services in Hong Kong. High quality"
      },
      "ja": {
        "title": "即日名刺 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Emergency orders",
        "keywords": [
          "即日咭片印刷"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "緊急注文に最適、最短4時間で受取。品質を損なわず。 ZprintProは香港で即日名刺サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業即日咭片印刷服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "緊急需求首選，最快4小時取貨，支持印刷即日速遞送貨。品質不打折，急件也能展現專業形象。智印港提供專業的即日咭片印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "環保再生紙咭片 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "採用FSC認證環保再生紙，展現企業社會責任。質樸自然的風格，適合環保品牌。智印港提供專業環保再生紙咭片服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "環保再生紙咭片"
        ],
        "body": " fast delivery."
      },
      "en": {
        "title": "Eco-friendly Recycled Cards | Professional Printing | ZprintPro",
        "description": "",
        "h1": "FSC-certified recycled paper showing corporate social responsibility. Natural style for eco-friendly brands. ZprintPro offers professional Eco-friendly Recycled Cards services in Hong Kong. High quality",
        "keywords": [
          "環保再生紙咭片"
        ],
        "body": "FSC認証再生紙、企業の社会的責任を示す。エコブランド向け。 ZprintProは香港で再生紙名刺サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      "ja": {
        "title": "再生紙名刺 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " transparent pricing",
        "keywords": [
          "環保再生紙咭片"
        ],
        "body": "專業環保再生紙咭片服務 | 智印港"
      }
    },
    "faqs": [
      {
        "q": "",
        "a": ""
      },
      {
        "q": "採用FSC認證環保再生紙，展現企業社會責任。質樸自然的風格，適合環保品牌。智印港提供專業的環保再生紙咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
  "waterproof-stickers": {
    "name": {
      "zh-hk": "防水貼紙",
      "en": "Waterproof Stickers",
      "ja": "防水ステッカー"
    },
    "seo": {
      "zh-hk": {
        "title": "防水貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "食品標籤",
        "h1": "waterproof stickers",
        "keywords": [
          "防水貼紙"
        ],
        "body": " food labels"
      },
      "en": {
        "title": "Waterproof Stickers | Professional Printing | ZprintPro",
        "description": "香港貼紙印刷",
        "h1": " durable labels",
        "keywords": [
          "防水貼紙"
        ],
        "body": " Hong Kong sticker printing"
      },
      "ja": {
        "title": "防水ステッカー | プロ印刷 | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": " outdoor stickers",
        "keywords": [
          "防水貼紙"
        ],
        "body": " same day delivery"
      }
    },
    "faqs": [
      {
        "q": "防水ステッカー",
        "a": "耐久ラベル"
      },
      {
        "q": "屋外ステッカー",
        "a": "食品ラベル"
      },
      {
        "q": "香港 ステッカー印刷",
        "a": "即日配送"
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
    "seo": {
      "zh-hk": {
        "title": "透明貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "透明貼紙"
        ],
        "body": " food packaging"
      },
      "en": {
        "title": "Transparent Stickers | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。智印港提供專業透明貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "透明貼紙"
        ],
        "body": " glass decoration. ZprintPro offers professional Transparent Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "透明ステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Transparent PET material creates invisible effect when applied. Perfect for cosmetics",
        "keywords": [
          "透明貼紙"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "透明PET素材、貼り付け後無感効果。化粧品、食品包装、ガラス装飾に最適。 ZprintProは香港で透明ステッカーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業透明貼紙服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "透明PET材質，貼合後呈現無感效果，完美展現產品本身，支持印刷即日速遞送貨。適合化妝品、食品包裝、玻璃貼飾。智印港提供專業的透明貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "可移貼紙(無殘膠) | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印港提供專業可移貼紙(無殘膠)服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "可移貼紙(無殘膠)"
        ],
        "body": " short-term exhibitions. ZprintPro offers professional Removable Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Removable Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Special adhesive design leaves no residue when removed. Perfect for car windows",
        "keywords": [
          "可移貼紙(無殘膠)"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "はがせるステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " glass displays",
        "keywords": [
          "可移貼紙(無殘膠)"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "特殊粘着設計、剥がしても残りません。車窓、ガラス展示、短期展示会に最適。 ZprintProは香港ではがせるステッカーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業可移貼紙(無殘膠)服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印港提供專業的可移貼紙(無殘膠)服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "小批量貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印港提供專業小批量貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "小批量貼紙"
        ],
        "body": " event promotion"
      },
      "en": {
        "title": "Small Batch Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Minimum A4 size order",
        "keywords": [
          "小批量貼紙"
        ],
        "body": " personal creations. ZprintPro offers professional Small Batch Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "小ロットステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " no bulk inventory pressure. Perfect for startups",
        "keywords": [
          "小批量貼紙"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "最小A4サイズから、大量在庫の心配なし。スタートアップ、イベント宣伝、個人創作に最適。 ZprintProは香港で小ロットステッカーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業小批量貼紙服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印港提供專業的小批量貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "異形模切貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印港提供專業異形模切貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "異形模切貼紙"
        ],
        "body": " cartoon characters"
      },
      "en": {
        "title": "Die-cut Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Any shape die-cutting",
        "keywords": [
          "異形模切貼紙"
        ],
        "body": " unique contours. ZprintPro offers professional Die-cut Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "型抜きステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " creativity without limits. Can cut logo shapes",
        "keywords": [
          "異形模切貼紙"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "任意形状の型抜き、創作の自由を制限しません。 ZprintProは香港で型抜きステッカーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業異形模切貼紙服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印港提供專業的異形模切貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "燙金貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印港提供專業燙金貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "燙金貼紙"
        ],
        "body": " VIP badges. ZprintPro offers professional Foil Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Foil stamping gives stickers premium quality feel. Perfect for luxury product labels",
        "keywords": [
          "燙金貼紙"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "箔押しステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " gift packaging",
        "keywords": [
          "燙金貼紙"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "箔押し加工でステッカーに高級感。高級製品ラベル、ギフト包装、VIPバッジに最適。 ZprintProは香港で箔押しステッカーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業燙金貼紙服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印港提供專業的燙金貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "防偽貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印港提供專業防偽貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "防偽貼紙"
        ],
        "body": " protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Security Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Special anti-counterfeiting processes including holographic labels",
        "keywords": [
          "防偽貼紙"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "セキュリティステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " fragile paper",
        "keywords": [
          "防偽貼紙"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "特殊な偽造防止加工、ホログラムラベル、壊れやすい紙など。 ZprintProは香港でセキュリティステッカーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業防偽貼紙服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印港提供專業的防偽貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
        "title": "螢光貼紙 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印港提供專業螢光貼紙服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "螢光貼紙"
        ],
        "body": " safety signs"
      },
      "en": {
        "title": "Fluorescent Stickers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Fluorescent colors",
        "keywords": [
          "螢光貼紙"
        ],
        "body": " event decoration. ZprintPro offers professional Fluorescent Stickers services in Hong Kong. High quality"
      },
      "ja": {
        "title": "蛍光ステッカー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " highly visible under light. Perfect for promotional labels",
        "keywords": [
          "螢光貼紙"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "蛍光色、光の下で非常に目立ちます。プロモーションラベル、安全標識、イベント装飾に最適。 ZprintProは香港で蛍光ステッカーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業螢光貼紙服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印港提供專業的螢光貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "牛皮紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "牛皮紙袋"
        ],
        "body": " natural and rustic"
      },
      "en": {
        "title": "Kraft Paper Bags | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印港提供專業牛皮紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "牛皮紙袋"
        ],
        "body": " loved by consumers. Perfect for clothing stores"
      },
      "ja": {
        "title": "クラフト紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Eco-friendly kraft paper",
        "keywords": [
          "牛皮紙袋"
        ],
        "body": " gift shops"
      }
    },
    "faqs": [
      {
        "q": " coffee shops. ZprintPro offers professional Kraft Paper Bags services in Hong Kong. High quality",
        "a": " transparent pricing"
      },
      {
        "q": " fast delivery.",
        "a": "環境に優しいクラフト紙、質朴で自然、消費者に人気。衣料品店、ギフトショップ、コーヒーショップに最適。 ZprintProは香港でクラフト紙袋サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業牛皮紙袋服務 | 智印港",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "環保牛皮紙材質，質樸自然，深受消費者喜愛，支持印刷即日速遞送貨。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印港提供專業的牛皮紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
      "en": "",
      "ja": ""
    }
  },
  "white-card-bags": {
    "name": {
      "zh-hk": "白卡紙袋",
      "en": "White Card Bags",
      "ja": "白カード紙袋"
    },
    "seo": {
      "zh-hk": {
        "title": "白卡紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "白卡紙袋"
        ],
        "body": " smooth surface"
      },
      "en": {
        "title": "White Card Bags | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌、化妝品店。智印港提供專業白卡紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "白卡紙袋"
        ],
        "body": " excellent printing effect. Perfect for high-end brands"
      },
      "ja": {
        "title": "白カード紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "White card paper",
        "keywords": [
          "白卡紙袋"
        ],
        "body": " cosmetic stores. ZprintPro offers professional White Card Bags services in Hong Kong. High quality"
      }
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "白カード紙、表面が滑らかで印刷効果が抜群。高級ブランド、化粧品店に最適。 ZprintProは香港で白カード紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業白卡紙袋服務 | 智印港"
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
        "title": "禮品紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "禮品紙袋"
        ],
        "body": " UV and other processes. Essential for gifting"
      },
      "en": {
        "title": "Gift Bags | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "精美設計，配合燙金、UV等工藝。送禮必備，提升禮品檔次。智印港提供專業禮品紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "禮品紙袋"
        ],
        "body": " elevates gift quality. ZprintPro offers professional Gift Bags services in Hong Kong. High quality"
      },
      "ja": {
        "title": "ギフト紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Exquisite design with foil stamping",
        "keywords": [
          "禮品紙袋"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "精巧なデザイン、箔押し・UVなどの加工付き。ギフトに必須、ギフトの質を向上。 ZprintProは香港でギフト紙袋サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業禮品紙袋服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "精美設計，配合燙金、UV等工藝，支持印刷即日速遞送貨。送禮必備，提升禮品檔次。智印港提供專業的禮品紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      }
    ],
    "imageAlt": {
      "zh-hk": "",
      "en": "紙袋的最小訂購量是多少？",
      "ja": "一般為100個起訂，大批量訂單價格更優惠。"
    }
  },
  "eco-paper-bags": {
    "name": {
      "zh-hk": "環保紙袋",
      "en": "Eco Paper Bags",
      "ja": "エコ紙袋"
    },
    "seo": {
      "zh-hk": {
        "title": "環保紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "FSC認證環保紙張，可持續發展。適合注重環保的品牌。智印港提供專業環保紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "環保紙袋"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Eco Paper Bags | Professional Printing | ZprintPro",
        "description": "",
        "h1": "FSC-certified eco-friendly paper",
        "keywords": [
          "環保紙袋"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "エコ紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " sustainable development. Perfect for environmentally conscious brands. ZprintPro offers professional Eco Paper Bags services in Hong Kong. High quality",
        "keywords": [
          "環保紙袋"
        ],
        "body": "FSC認証の環境に優しい紙、持続可能な開発。環境に配慮するブランドに最適。 ZprintProは香港でエコ紙袋サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業環保紙袋服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "FSC認證環保紙張，可持續發展。適合注重環保的品牌。智印港提供專業的環保紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "手挽紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "堅固手挽設計，承重能力強。適合購物中心、超市。智印港提供專業手挽紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "手挽紙袋"
        ],
        "body": " supermarkets. ZprintPro offers professional Handle Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Handle Bags | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Sturdy handle design",
        "keywords": [
          "手挽紙袋"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "手提げ紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " strong load-bearing capacity. Perfect for shopping centers",
        "keywords": [
          "手挽紙袋"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "頑丈な持ち手デザイン、強い耐荷重能力。ショッピングセンター、スーパーに最適。 ZprintProは香港で手提げ紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業手挽紙袋服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "堅固手挽設計，承重能力強。適合購物中心、超市。智印港提供專業的手挽紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "小號紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "小巧尺寸，適合首飾、化妝品等小件商品。智印港提供專業小號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "小號紙袋"
        ],
        "body": " cosmetics and other small items. ZprintPro offers professional Small Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Small Bags | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Compact size",
        "keywords": [
          "小號紙袋"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "小判紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " perfect for jewelry",
        "keywords": [
          "小號紙袋"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "コンパクトなサイズ、アクセサリー、化粧品などの小物に最適。 ZprintProは香港で小判紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業小號紙袋服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "小巧尺寸，適合首飾、化妝品等小件商品。智印港提供專業的小號紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "大號紙袋 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "加大尺寸，適合服裝、鞋類等大件商品。智印港提供專業大號紙袋服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "大號紙袋"
        ],
        "body": " shoes and other large items. ZprintPro offers professional Large Bags services in Hong Kong. High quality"
      },
      "en": {
        "title": "Large Bags | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Large size",
        "keywords": [
          "大號紙袋"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "大判紙袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " perfect for clothing",
        "keywords": [
          "大號紙袋"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "大きなサイズ、衣類、靴などの大物に最適。 ZprintProは香港で大判紙袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業大號紙袋服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "加大尺寸，適合服裝、鞋類等大件商品。智印港提供專業的大號紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "A4宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "A4宣傳單張"
        ],
        "body": " most common flyer format. 157g glossy paper"
      },
      "en": {
        "title": "A4 Flyers | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "標準A4尺寸，最常用的宣傳單張規格。157g銅版紙，四色印刷，色彩鮮豔。適合產品推廣、活動宣傳。智印港提供專業A4宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "A4宣傳單張"
        ],
        "body": " 4-color printing"
      },
      "ja": {
        "title": "A4チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Standard A4 size",
        "keywords": [
          "A4宣傳單張"
        ],
        "body": " vibrant colors. ZprintPro offers professional A4 Flyers services in Hong Kong. High quality"
      }
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "標準A4サイズ、最も一般的なチラシ形式。157gコート紙、4色印刷、鮮やかな色彩。 ZprintProは香港でA4チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業A4宣傳單張服務 | 智印港"
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
  "a5-flyers": {
    "name": {
      "zh-hk": "A5宣傳單張",
      "en": "A5 Flyers",
      "ja": "A5チラシ"
    },
    "seo": {
      "zh-hk": {
        "title": "A5宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "A5宣傳單張"
        ],
        "body": " economical"
      },
      "en": {
        "title": "A5 Flyers | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活動首選。智印港提供專業A5宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "A5宣傳單張"
        ],
        "body": " perfect for mass distribution. First choice for food delivery"
      },
      "ja": {
        "title": "A5チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "A5 size",
        "keywords": [
          "A5宣傳單張"
        ],
        "body": " flash events. ZprintPro offers professional A5 Flyers services in Hong Kong. High quality"
      }
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "A5サイズ、経済的、大量配布に最適。フードデリバリー、フラッシュイベントの第一選択。 ZprintProは香港でA5チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業A5宣傳單張服務 | 智印港"
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
        "title": "雙面宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "雙面宣傳單張"
        ],
        "body": " doubled information capacity. ZprintPro offers professional Double-sided Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Double-sided Flyers | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。智印港提供專業雙面宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "雙面宣傳單張"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "両面チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Double-sided full color printing",
        "keywords": [
          "雙面宣傳單張"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "両面フルカラー印刷、情報容量が2倍。 ZprintProは香港で両面チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業雙面宣傳單張服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "雙面全彩印刷，信息容量翻倍，支持印刷即日速遞送貨。正面吸引眼球，背面詳細介紹。智印港提供專業的雙面宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "摺疊宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。智印港提供專業摺疊宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "摺疊宣傳單張"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Folded Leaflets | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Bi-fold or tri-fold design",
        "keywords": [
          "摺疊宣傳單張"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "折りたたみパンフレット | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can display more information. ZprintPro offers professional Folded Leaflets services in Hong Kong. High quality",
        "keywords": [
          "摺疊宣傳單張"
        ],
        "body": "二つ折りまたは三つ折りデザイン、より多くの情報を表示可能。 ZprintProは香港で折りたたみパンフレットサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業摺疊宣傳單張服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。智印港提供專業的摺疊宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "厚紙宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。智印港提供專業厚紙宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "厚紙宣傳單張"
        ],
        "body": " not easily damaged. ZprintPro offers professional Thick Paper Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Thick Paper Flyers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "200g+ thick paper",
        "keywords": [
          "厚紙宣傳單張"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "厚紙チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " better texture",
        "keywords": [
          "厚紙宣傳單張"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "200g以上の厚紙、質感が良く折れにくい。 ZprintProは香港で厚紙チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業厚紙宣傳單張服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。智印港提供專業的厚紙宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "即日宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "即日宣傳單張"
        ],
        "body": " same-day delivery available. ZprintPro offers professional Same-day Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "Same-day Flyers | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "緊急活動首選，最快當天交貨。品質保證，急件不擔心。智印港提供專業即日宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "即日宣傳單張"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "即日チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "First choice for emergency events",
        "keywords": [
          "即日宣傳單張"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "緊急イベントの第一選択、最短当日納品。 ZprintProは香港で即日チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業即日宣傳單張服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "緊急活動首選，最快當天交貨，支持印刷即日速遞送貨。品質保證，急件不擔心。智印港提供專業的即日宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "環保宣傳單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "環保紙張印刷，展現企業責任。適合環保主題活動。智印港提供專業環保宣傳單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "環保宣傳單張"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Eco Flyers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Eco-friendly paper printing",
        "keywords": [
          "環保宣傳單張"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "エコチラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " showing corporate responsibility. ZprintPro offers professional Eco Flyers services in Hong Kong. High quality",
        "keywords": [
          "環保宣傳單張"
        ],
        "body": "環境に優しい紙の印刷、企業の責任を示す。 ZprintProは香港でエコチラシサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業環保宣傳單張服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "環保紙張印刷，展現企業責任。適合環保主題活動。智印港提供專業的環保宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "A2海報印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "A2海報印刷"
        ],
        "body": " first choice for event promotion. 157g glossy paper"
      },
      "en": {
        "title": "A2 Posters | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。智印港提供專業A2海報印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "A2海報印刷"
        ],
        "body": " vibrant colors"
      },
      "ja": {
        "title": "A2ポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Standard A2 size",
        "keywords": [
          "A2海報印刷"
        ],
        "body": " same-day delivery. ZprintPro offers professional A2 Posters services in Hong Kong. High quality"
      }
    },
    "faqs": [
      {
        "q": " transparent pricing",
        "a": " fast delivery."
      },
      {
        "q": "標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、即日納品。 ZprintProは香港でA2ポスターサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業A2海報印刷服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "A1大幅海報 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "A1大幅海報"
        ],
        "body": " strong visual impact. Perfect for exhibitions"
      },
      "en": {
        "title": "A1 Large Posters | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。智印港提供專業A1大幅海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "A1大幅海報"
        ],
        "body": " venue decoration. ZprintPro offers professional A1 Large Posters services in Hong Kong. High quality"
      },
      "ja": {
        "title": "A1大型ポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "A1 large size",
        "keywords": [
          "A1大幅海報"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "A1大きなサイズ、強い視覚的インパクト。展示会、会場装飾に最適。 ZprintProは香港でA1大型ポスターサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業A1大幅海報服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "A1大尺寸，視覺衝擊力強，支持印刷即日速遞送貨。適合展覽、會場佈置。智印港提供專業的A1大幅海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
    "seo": {
      "zh-hk": {
        "title": "戶外海報 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "戶外海報"
        ],
        "body": " no fading for outdoor use. ZprintPro offers professional Outdoor Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Outdoor Posters | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。智印港提供專業戶外海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "戶外海報"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "屋外ポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Waterproof and UV-resistant material",
        "keywords": [
          "戶外海報"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "防水・UV耐性素材、屋外使用でも色褪せません。 ZprintProは香港で屋外ポスターサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業戶外海報服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "防水防曬材質，戶外使用不褪色，支持印刷即日速遞送貨。適合戶外廣告、建築圍板。智印港提供專業的戶外海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "展架海報 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印港提供專業展架海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "展架海報"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Display Posters | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Compatible with X-stands or roll-up banners",
        "keywords": [
          "展架海報"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "展示用ポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " portable and easy to install. ZprintPro offers professional Display Posters services in Hong Kong. High quality",
        "keywords": [
          "展架海報"
        ],
        "body": "Xスタンドまたはロールアップバナーと互換、持ち運び可能で設置簡単。 ZprintProは香港で展示用ポスターサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業展架海報服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印港提供專業的展架海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
        "title": "藝術海報 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印港提供專業藝術海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "藝術海報"
        ],
        "body": " photography works. ZprintPro offers professional Art Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Art Posters | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Premium art paper",
        "keywords": [
          "藝術海報"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "アートポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " high color accuracy. Perfect for art exhibitions",
        "keywords": [
          "藝術海報"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "高級アート紙、高い色再現性。美術展、写真作品に最適。 ZprintProは香港でアートポスターサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業藝術海報服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印港提供專業的藝術海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
    "seo": {
      "zh-hk": {
        "title": "背膠海報 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。智印港提供專業背膠海報服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "背膠海報"
        ],
        "body": " wall decoration. ZprintPro offers professional Adhesive Posters services in Hong Kong. High quality"
      },
      "en": {
        "title": "Adhesive Posters | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Self-adhesive",
        "keywords": [
          "背膠海報"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "粘着ポスター | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can be directly applied. Perfect for shop windows",
        "keywords": [
          "背膠海報"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "自己粘着、直接貼付可能。店舗の窓、壁の装飾に最適。 ZprintProは香港で粘着ポスターサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業背膠海報服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。智印港提供專業的背膠海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "禮品盒定制 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "禮品盒定制"
        ],
        "body": " UV and other processes. ZprintPro offers professional Gift Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Gift Boxes | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。智印港提供專業禮品盒定制服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "禮品盒定制"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ギフトボックス | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Exquisite gift boxes with foil stamping",
        "keywords": [
          "禮品盒定制"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "精巧なギフトボックス、箔押し・UVなどの加工付き。 ZprintProは香港でギフトボックスサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業禮品盒定制服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "精緻禮品盒，配合燙金、UV等工藝，支持印刷即日速遞送貨。送禮首選，提升產品價值。智印港提供專業的禮品盒定制服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "化妝品盒 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "化妝品盒"
        ],
        "body": " customizable inner tray. ZprintPro offers professional Cosmetic Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Cosmetic Boxes | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。智印港提供專業化妝品盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "化妝品盒"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "化粧品箱 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Specially designed for cosmetics",
        "keywords": [
          "化妝品盒"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "化粧品専用設計、カスタマイズ可能な内側トレイ。 ZprintProは香港で化粧品箱サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業化妝品盒服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "專為化妝品設計，內托可定制，支持印刷即日速遞送貨。適合護膚品、彩妝品牌。智印港提供專業的化妝品盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "食品包裝盒 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印港提供專業食品包裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "食品包裝盒"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Food Boxes | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Food-grade material",
        "keywords": [
          "食品包裝盒"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "食品包装箱 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " safe and eco-friendly. ZprintPro offers professional Food Boxes services in Hong Kong. High quality",
        "keywords": [
          "食品包裝盒"
        ],
        "body": "食品グレード素材、安全で環境に優しい。 ZprintProは香港で食品包装箱サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業食品包裝盒服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "食品級材質，安全環保。適合糕點、茶葉、保健品。智印港提供專業的食品包裝盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "快遞盒/飛機盒 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "快遞盒/飛機盒"
        ],
        "body": " first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Mailer Boxes | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "堅固耐用，電商發貨首選。可印品牌Logo，提升開箱體驗。智印港提供專業快遞盒/飛機盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "快遞盒/飛機盒"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "発送箱 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Sturdy and durable",
        "keywords": [
          "快遞盒/飛機盒"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "頑丈で耐久性があり、EC発送の第一選択。 ZprintProは香港で発送箱サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業快遞盒/飛機盒服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "堅固耐用，電商發貨首選，支持印刷即日速遞送貨。可印品牌Logo，提升開箱體驗。智印港提供專業的快遞盒/飛機盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
    "seo": {
      "zh-hk": {
        "title": "折疊盒 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印港提供專業折疊盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "折疊盒"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Folding Boxes | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Foldable design",
        "keywords": [
          "折疊盒"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "折りたたみ箱 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " saves warehouse space. ZprintPro offers professional Folding Boxes services in Hong Kong. High quality",
        "keywords": [
          "折疊盒"
        ],
        "body": "折りたたみ可能なデザイン、倉庫スペースを節約。 ZprintProは香港で折りたたみ箱サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業折疊盒服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印港提供專業的折疊盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
        "title": "精裝盒 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印港提供專業精裝盒服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "精裝盒"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Rigid Boxes | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Hardcover rigid construction",
        "keywords": [
          "精裝盒"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "上製本箱 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " luxurious and premium. ZprintPro offers professional Rigid Boxes services in Hong Kong. High quality",
        "keywords": [
          "精裝盒"
        ],
        "body": "硬い上製本構造、豪華でプレミアム。 ZprintProは香港で上製本箱サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業精裝盒服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印港提供專業的精裝盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
      },
      {
        "q": "",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "燙金利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "燙金利是封"
        ],
        "body": " festive and elegant. Multiple auspicious patterns or custom designs. ZprintPro offers professional Foil Red Packets services in Hong Kong. High quality"
      },
      "en": {
        "title": "Foil Red Packets | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。智印港提供專業燙金利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "燙金利是封"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "箔押しポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Traditional foil stamping",
        "keywords": [
          "燙金利是封"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "伝統的な箔押し加工、縁起が良く上品。複数の縁起の良い柄またはカスタムデザイン。 ZprintProは香港で箔押しポチ袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業燙金利是封服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "傳統燙金工藝，喜慶大方，支持印刷即日速遞送貨。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。智印港提供專業的燙金利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "浮雕利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。智印港提供專業浮雕利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "浮雕利是封"
        ],
        "body": " luxurious feel. ZprintPro offers professional Embossed Red Packets services in Hong Kong. High quality"
      },
      "en": {
        "title": "Embossed Red Packets | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Embossed craftsmanship",
        "keywords": [
          "浮雕利是封"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "エンボスポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " dimensional texture",
        "keywords": [
          "浮雕利是封"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "エンボス加工、立体的な触感、豪華な質感。 ZprintProは香港でエンボスポチ袋サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業浮雕利是封服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。智印港提供專業的浮雕利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
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
    "seo": {
      "zh-hk": {
        "title": "定制利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "定制利是封"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Custom Red Packets | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。智印港提供專業定制利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "定制利是封"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "オリジナルポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Exclusive design with company logo and greetings. Strengthens brand impression. ZprintPro offers professional Custom Red Packets services in Hong Kong. High quality",
        "keywords": [
          "定制利是封"
        ],
        "body": "独占的なデザイン、会社ロゴと祝福の言葉。ブランドイメージを強化。 ZprintProは香港でオリジナルポチ袋サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業定制利是封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "專屬設計，印上公司Logo和祝福語，支持印刷即日速遞送貨。強化品牌印象，節日營銷必備。智印港提供專業的定制利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
  "cartoon-red-packets": {
    "name": {
      "zh-hk": "卡通利是封",
      "en": "Cartoon Red Packets",
      "ja": "キャラクターポチ袋"
    },
    "seo": {
      "zh-hk": {
        "title": "卡通利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。智印港提供專業卡通利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "卡通利是封"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Cartoon Red Packets | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Cute cartoon design",
        "keywords": [
          "卡通利是封"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "キャラクターポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " loved by young people. ZprintPro offers professional Cartoon Red Packets services in Hong Kong. High quality",
        "keywords": [
          "卡通利是封"
        ],
        "body": "かわいいキャラクターデザイン、若者に人気。 ZprintProは香港でキャラクターポチ袋サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業卡通利是封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。智印港提供專業的卡通利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
  "eco-red-packets": {
    "name": {
      "zh-hk": "環保利是封",
      "en": "Eco Red Packets",
      "ja": "エコポチ袋"
    },
    "seo": {
      "zh-hk": {
        "title": "環保利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。智印港提供專業環保利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "環保利是封"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Eco Red Packets | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Eco-friendly paper and ink",
        "keywords": [
          "環保利是封"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "エコポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " sustainable development concept. ZprintPro offers professional Eco Red Packets services in Hong Kong. High quality",
        "keywords": [
          "環保利是封"
        ],
        "body": "環境に優しい紙とインク、持続可能な開発の理念。 ZprintProは香港でエコポチ袋サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業環保利是封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。智印港提供專業的環保利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
  "large-red-packets": {
    "name": {
      "zh-hk": "大號利是封",
      "en": "Large Red Packets",
      "ja": "大判ポチ袋"
    },
    "seo": {
      "zh-hk": {
        "title": "大號利是封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印港提供專業大號利是封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "大號利是封"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Large Red Packets | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Larger size",
        "keywords": [
          "大號利是封"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "大判ポチ袋 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can hold more cash or gift cards. ZprintPro offers professional Large Red Packets services in Hong Kong. High quality",
        "keywords": [
          "大號利是封"
        ],
        "body": "大きなサイズ、より多くの現金やギフトカードを入れられます。 ZprintProは香港で大判ポチ袋サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業大號利是封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印港提供專業的大號利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "掛牆年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "掛牆年曆"
        ],
        "body": " 13-page design. Perfect for home and office use. ZprintPro offers professional Wall Calendars services in Hong Kong. High quality"
      },
      "en": {
        "title": "Wall Calendars | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。智印港提供專業掛牆年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "掛牆年曆"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "壁掛けカレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Standard A3 or A2 wall calendars",
        "keywords": [
          "掛牆年曆"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "標準A3またはA2壁掛けカレンダー、13ページデザイン。家庭やオフィスに最適。 ZprintProは香港で壁掛けカレンダーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業掛牆年曆服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "標準A3或A2掛牆年曆，13頁設計（封面+12個月），支持印刷即日速遞送貨。適合家庭、辦公室使用，全年品牌曝光。智印港提供專業的掛牆年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "座檯年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "座檯年曆"
        ],
        "body": " stable and beautiful. Perfect for office desk display. ZprintPro offers professional Desk Calendars services in Hong Kong. High quality"
      },
      "en": {
        "title": "Desk Calendars | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。智印港提供專業座檯年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "座檯年曆"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "卓上カレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Triangular desk design",
        "keywords": [
          "座檯年曆"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "三角形の卓上デザイン、安定して美しい。オフィスデスクに最適。 ZprintProは香港で卓上カレンダーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業座檯年曆服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "三角形座檯設計，穩固美觀，支持印刷即日速遞送貨。適合辦公桌擺放，每日品牌接觸。智印港提供專業的座檯年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "定制年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。智印港提供專業定制年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "定制年曆"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Custom Calendars | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Exclusive design",
        "keywords": [
          "定制年曆"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "オリジナルカレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " each page can feature company products or services. ZprintPro offers professional Custom Calendars services in Hong Kong. High quality",
        "keywords": [
          "定制年曆"
        ],
        "body": "独占的なデザイン、各ページに会社の製品やサービスを掲載可能。 ZprintProは香港でオリジナルカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業定制年曆服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。智印港提供專業的定制年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "迷你年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。智印港提供專業迷你年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "迷你年曆"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Mini Calendars | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Compact and portable",
        "keywords": [
          "迷你年曆"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ミニカレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " fits in wallet or pocket. ZprintPro offers professional Mini Calendars services in Hong Kong. High quality",
        "keywords": [
          "迷你年曆"
        ],
        "body": "コンパクトで持ち運び可能、財布やポケットに入ります。 ZprintProは香港でミニカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業迷你年曆服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。智印港提供專業的迷你年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "相框年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "結合相框功能，可替換照片。實用美觀，家庭必備。智印港提供專業相框年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "相框年曆"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Photo Frame Calendars | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Combined photo frame function",
        "keywords": [
          "相框年曆"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "フォトフレームカレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " photos can be replaced. ZprintPro offers professional Photo Frame Calendars services in Hong Kong. High quality",
        "keywords": [
          "相框年曆"
        ],
        "body": "フォトフレーム機能付き、写真を交換可能。 ZprintProは香港でフォトフレームカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業相框年曆服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "結合相框功能，可替換照片。實用美觀，家庭必備。智印港提供專業的相框年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "磁石年曆 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。智印港提供專業磁石年曆服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "磁石年曆"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Magnetic Calendars | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Magnetic backing",
        "keywords": [
          "磁石年曆"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "マグネットカレンダー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can stick to refrigerator and other metal surfaces. ZprintPro offers professional Magnetic Calendars services in Hong Kong. High quality",
        "keywords": [
          "磁石年曆"
        ],
        "body": "マグネット背面、冷蔵庫などの金属面に貼付可能。 ZprintProは香港でマグネットカレンダーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業磁石年曆服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。智印港提供專業的磁石年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "PVC餐牌 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "PVC餐牌"
        ],
        "body": " easy to clean and durable. ZprintPro offers professional PVC Menus services in Hong Kong. High quality"
      },
      "en": {
        "title": "PVC Menus | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。智印港提供專業PVC餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "PVC餐牌"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "PVCメニュー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Waterproof and oil-resistant PVC material",
        "keywords": [
          "PVC餐牌"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "防水・耐油性PVC素材、お手入れ簡単で耐久性あり。 ZprintProは香港でPVCメニューサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業PVC餐牌服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "防水防油PVC材質，易清潔耐用，支持印刷即日速遞送貨。餐廳、咖啡店首選。智印港提供專業的PVC餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "過膠餐牌 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "過膠餐牌"
        ],
        "body": " waterproof and durable at lower cost. ZprintPro offers professional Laminated Menus services in Hong Kong. High quality"
      },
      "en": {
        "title": "Laminated Menus | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "紙質過膠處理，防水耐用且成本較低。經濟實惠之選。智印港提供專業過膠餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "過膠餐牌"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ラミネートメニュー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Paper with lamination",
        "keywords": [
          "過膠餐牌"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "ラミネート加工紙、防水で耐久性がありコストも低い。 ZprintProは香港でラミネートメニューサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業過膠餐牌服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "紙質過膠處理，防水耐用且成本較低，支持印刷即日速遞送貨。經濟實惠之選。智印港提供專業的過膠餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "精裝餐牌 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "精裝餐牌"
        ],
        "body": " elegant and grand. Perfect for fine dining restaurants"
      },
      "en": {
        "title": "Hardcover Menus | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "硬殼精裝，高檔大氣。適合高級餐廳、酒店。智印港提供專業精裝餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "精裝餐牌"
        ],
        "body": " hotels. ZprintPro offers professional Hardcover Menus services in Hong Kong. High quality"
      },
      "ja": {
        "title": "高級メニュー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Hardcover binding",
        "keywords": [
          "精裝餐牌"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "上製本装丁、エレガントで格式高い。高級レストラン、ホテルに最適。 ZprintProは香港で高級メニューサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業精裝餐牌服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "硬殼精裝，高檔大氣，支持印刷即日速遞送貨。適合高級餐廳、酒店。智印港提供專業的精裝餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "酒水牌 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "專為酒水設計，可立式或手持。酒吧、餐廳必備。智印港提供專業酒水牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "酒水牌"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Drink Menus | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Specially designed for drinks",
        "keywords": [
          "酒水牌"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "ドリンクメニュー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can be standing or handheld. ZprintPro offers professional Drink Menus services in Hong Kong. High quality",
        "keywords": [
          "酒水牌"
        ],
        "body": "ドリンク専用設計、立てかけまたは手持ち可能。 ZprintProは香港でドリンクメニューサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業酒水牌服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "專為酒水設計，可立式或手持。酒吧、餐廳必備。智印港提供專業的酒水牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "一次性餐牌 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "經濟紙質，適合快餐店、外賣店。可頻繁更換內容。智印港提供專業一次性餐牌服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "一次性餐牌"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Disposable Menus | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Economical paper",
        "keywords": [
          "一次性餐牌"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "使い捨てメニュー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " perfect for fast food and takeaway shops. ZprintPro offers professional Disposable Menus services in Hong Kong. High quality",
        "keywords": [
          "一次性餐牌"
        ],
        "body": "経済的な紙、ファストフードやテイクアウト店に最適。 ZprintProは香港で使い捨てメニューサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業一次性餐牌服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "經濟紙質，適合快餐店、外賣店。可頻繁更換內容。智印港提供專業的一次性餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "戶外燈布噴繪 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "戶外燈布噴繪"
        ],
        "body": " waterproof and UV-resistant"
      },
      "en": {
        "title": "Outdoor Vinyl Banners | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。智印港提供專業戶外燈布噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "戶外燈布噴繪"
        ],
        "body": " strong weather resistance. ZprintPro offers professional Outdoor Vinyl Banners services in Hong Kong. High quality"
      },
      "ja": {
        "title": "屋外バナー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Large outdoor vinyl banners",
        "keywords": [
          "戶外燈布噴繪"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "大型屋外ビニールバナー、防水・UV耐性、強い耐候性。 ZprintProは香港で屋外バナーサービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業戶外燈布噴繪服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "大型戶外燈布，防水防曬，耐候性強，支持印刷即日速遞送貨。適合戶外廣告牌、建築圍板。智印港提供專業的戶外燈布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "易拉寶 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "易拉寶"
        ],
        "body": " easy to install. Essential for exhibitions and roadshows. ZprintPro offers professional Roll-up Banners services in Hong Kong. High quality"
      },
      "en": {
        "title": "Roll-up Banners | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "便攜易拉寶展架，安裝簡便。展會、路演必備。智印港提供專業易拉寶服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "易拉寶"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ロールアップバナー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Portable roll-up banner stands",
        "keywords": [
          "易拉寶"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "ポータブルロールアップバナースタンド、設置簡単。展示会やロードショーに必須。 ZprintProは香港でロールアップバナーサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業易拉寶服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "便攜易拉寶展架，安裝簡便，支持印刷即日速遞送貨。展會、路演必備。智印港提供專業的易拉寶服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "背膠噴繪 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。智印港提供專業背膠噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "背膠噴繪"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Adhesive Banners | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Self-adhesive",
        "keywords": [
          "背膠噴繪"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "粘着バナー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can be directly applied to walls or glass. ZprintPro offers professional Adhesive Banners services in Hong Kong. High quality",
        "keywords": [
          "背膠噴繪"
        ],
        "body": "自己粘着、壁やガラスに直接貼付可能。 ZprintProは香港で粘着バナーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業背膠噴繪服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。智印港提供專業的背膠噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "車身廣告 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。智印港提供專業車身廣告服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "車身廣告"
        ],
        "body": " no residue when removed. ZprintPro offers professional Vehicle Wraps services in Hong Kong. High quality"
      },
      "en": {
        "title": "Vehicle Wraps | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Specialized vehicle wrap vinyl",
        "keywords": [
          "車身廣告"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カーラッピング | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " strong weather resistance",
        "keywords": [
          "車身廣告"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "専用車体ラップビニール、強い耐候性、剥がしても残りません。 ZprintProは香港でカーラッピングサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業車身廣告服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。智印港提供專業的車身廣告服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "網格布噴繪 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "網格設計，透光透風。適合大型戶外廣告、建築圍板。智印港提供專業網格布噴繪服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "網格布噴繪"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Mesh Banners | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Mesh design",
        "keywords": [
          "網格布噴繪"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "メッシュバナー | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " light and air permeable. Perfect for large outdoor advertising. ZprintPro offers professional Mesh Banners services in Hong Kong. High quality",
        "keywords": [
          "網格布噴繪"
        ],
        "body": "メッシュデザイン、光と空気を通す。大型屋外広告に最適。 ZprintProは香港でメッシュバナーサービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業網格布噴繪服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "網格設計，透光透風。適合大型戶外廣告、建築圍板。智印港提供專業的網格布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "畫冊印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "畫冊印刷"
        ],
        "body": " annual reports. ZprintPro offers professional Catalog Printing services in Hong Kong. High quality"
      },
      "en": {
        "title": "Catalog Printing | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "高級畫冊，色彩還原度高。適合產品目錄、企業年報、藝術作品集。智印港提供專業畫冊印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "畫冊印刷"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "カタログ印刷 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Premium catalogs with high color accuracy. Perfect for product catalogs",
        "keywords": [
          "畫冊印刷"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "高級カタログ、高い色再現性。製品カタログ、年次報告書に最適。 ZprintProは香港でカタログ印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業畫冊印刷服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "高級畫冊，色彩還原度高，支持印刷即日速遞送貨。適合產品目錄、企業年報、藝術作品集。智印港提供專業的畫冊印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "騎馬釘小冊子 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "騎馬釘小冊子"
        ],
        "body": " perfect for booklets with fewer pages. ZprintPro offers professional Saddle Stitch Booklets services in Hong Kong. High quality"
      },
      "en": {
        "title": "Saddle Stitch Booklets | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "經濟裝訂方式，適合頁數較少的冊子。產品說明書、活動手冊首選。智印港提供專業騎馬釘小冊子服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "騎馬釘小冊子"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "中綴じ冊子 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Economical binding method",
        "keywords": [
          "騎馬釘小冊子"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "経済的な製本方法、ページ数の少ない冊子に最適。 ZprintProは香港で中綴じ冊子サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業騎馬釘小冊子服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "經濟裝訂方式，適合頁數較少的冊子，支持印刷即日速遞送貨。產品說明書、活動手冊首選。智印港提供專業的騎馬釘小冊子服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "無線膠裝書籍 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。智印港提供專業無線膠裝書籍服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "無線膠裝書籍"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Perfect Bound Books | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Flat spine",
        "keywords": [
          "無線膠裝書籍"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "無線綴じ本 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can print book title. Perfect for books and magazines with more pages. ZprintPro offers professional Perfect Bound Books services in Hong Kong. High quality",
        "keywords": [
          "無線膠裝書籍"
        ],
        "body": "平らな背表紙、書名を印刷可能。ページ数の多い本や雑誌に最適。 ZprintProは香港で無線綴じ本サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業無線膠裝書籍服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。智印港提供專業的無線膠裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "精裝書籍 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。智印港提供專業精裝書籍服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "精裝書籍"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Hardcover Books | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Hardcover binding",
        "keywords": [
          "精裝書籍"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "上製本 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " luxurious and durable. Perfect for collector\\ ZprintPro offers professional Hardcover Books services in Hong Kong. High quality",
        "keywords": [
          "精裝書籍"
        ],
        "body": "上製本装丁、豪華で耐久性あり。愛蔵版、企業年鑑に最適。 ZprintProは香港で上製本サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業精裝書籍服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。智印港提供專業的精裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "線圈筆記本 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "線圈裝訂，可180度平攤。適合筆記本、工作手冊。智印港提供專業線圈筆記本服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "線圈筆記本"
        ],
        "body": " workbooks. ZprintPro offers professional Spiral Notebooks services in Hong Kong. High quality"
      },
      "en": {
        "title": "Spiral Notebooks | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Spiral binding",
        "keywords": [
          "線圈筆記本"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "リングノート | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can lay flat at 180 degrees. Perfect for notebooks",
        "keywords": [
          "線圈筆記本"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "スパイラル製本、180度に開く。ノート、ワークブックに最適。 ZprintProは香港でリングノートサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業線圈筆記本服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "線圈裝訂，可180度平攤。適合筆記本、工作手冊。智印港提供專業的線圈筆記本服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "公司信封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "公司信封"
        ],
        "body": " essential for business. ZprintPro offers professional Business Envelopes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Business Envelopes | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "定制公司信封，印上Logo和地址。專業形象，商務必備。智印港提供專業公司信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "公司信封"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ビジネス封筒 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Custom business envelopes with logo and address. Professional image",
        "keywords": [
          "公司信封"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "カスタムビジネス封筒、ロゴと住所を印刷。プロフェッショナルなイメージ。 ZprintProは香港でビジネス封筒サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業公司信封服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "定制公司信封，印上Logo和地址，支持印刷即日速遞送貨。專業形象，商務必備。智印港提供專業的公司信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "彩色信封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "彩色信封"
        ],
        "body": " strong visual appeal. Perfect for invitations"
      },
      "en": {
        "title": "Colored Envelopes | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。智印港提供專業彩色信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "彩色信封"
        ],
        "body": " greeting cards. ZprintPro offers professional Colored Envelopes services in Hong Kong. High quality"
      },
      "ja": {
        "title": "カラー封筒 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Colorful printing",
        "keywords": [
          "彩色信封"
        ],
        "body": " transparent pricing"
      }
    },
    "faqs": [
      {
        "q": " fast delivery.",
        "a": "カラフルな印刷、強い視覚的アピール。招待状、グリーティングカードに最適。 ZprintProは香港でカラー封筒サービスを提供。高品質、透明な価格、迅速な納品。"
      },
      {
        "q": "專業彩色信封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "彩色印刷，視覺吸引力強，支持印刷即日速遞送貨。適合邀請函、賀卡、營銷郵件。智印港提供專業的彩色信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "大號信封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "A4尺寸大信封，可裝入文件、合同。辦公室必備。智印港提供專業大號信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "大號信封"
        ],
        "body": " transparent pricing"
      },
      "en": {
        "title": "Large Envelopes | Professional Printing | ZprintPro",
        "description": "",
        "h1": "A4 size large envelopes",
        "keywords": [
          "大號信封"
        ],
        "body": " fast delivery."
      },
      "ja": {
        "title": "大判封筒 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " can hold documents and contracts. Office essential. ZprintPro offers professional Large Envelopes services in Hong Kong. High quality",
        "keywords": [
          "大號信封"
        ],
        "body": "A4サイズの大きな封筒、書類や契約書を入れられます。オフィスに必須。 ZprintProは香港で大判封筒サービスを提供。高品質、透明な価格、迅速な納品。"
      }
    },
    "faqs": [
      {
        "q": "專業大號信封服務 | 智印港",
        "a": ""
      },
      {
        "q": "",
        "a": "A4尺寸大信封，可裝入文件、合同。辦公室必備。智印港提供專業的大號信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。"
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
        "title": "珠光信封 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "珠光紙張，閃耀質感。適合婚禮邀請、高端活動。智印港提供專業珠光信封服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "珠光信封"
        ],
        "body": " high-end events. ZprintPro offers professional Pearl Envelopes services in Hong Kong. High quality"
      },
      "en": {
        "title": "Pearl Envelopes | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Pearl paper",
        "keywords": [
          "珠光信封"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "パール封筒 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " shimmering quality. Perfect for wedding invitations",
        "keywords": [
          "珠光信封"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "パール紙、輝く質感。結婚式の招待状、高級イベントに最適。 ZprintProは香港でパール封筒サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業珠光信封服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "珠光紙張，閃耀質感。適合婚禮邀請、高端活動。智印港提供專業的珠光信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "作業簿印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "作業簿印刷"
        ],
        "body": " customizable cover and inner page formats. Perfect for schools. ZprintPro offers professional Exercise Books services in Hong Kong. High quality"
      },
      "en": {
        "title": "Exercise Books | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "學校作業簿，可定制封面和內頁格式。適合中小學、補習社。智印港提供專業作業簿印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "作業簿印刷"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "ワークブック印刷 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "School exercise books",
        "keywords": [
          "作業簿印刷"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "学校のワークブック、カスタマイズ可能な表紙と内側ページ形式。小中校、塾に最適。 ZprintProは香港でワークブック印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業作業簿印刷服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "學校作業簿，可定制封面和內頁格式，支持印刷即日速遞送貨。適合中小學、補習社。智印港提供專業的作業簿印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "證書印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "",
        "keywords": [
          "證書印刷"
        ],
        "body": " embossing and other processes. ZprintPro offers professional Certificates services in Hong Kong. High quality"
      },
      "en": {
        "title": "Certificates | Professional Printing | ZprintPro",
        "description": "印刷即日速遞送貨",
        "h1": "精美證書，配合燙金、壓紋等工藝。畢業證書、獎狀、資格證明。智印港提供專業證書印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "證書印刷"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "賞状印刷 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": "Exquisite certificates with foil stamping",
        "keywords": [
          "證書印刷"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "精巧な賞状、箔押し・エンボスなどの加工付き。卒業証書、賞状、資格証明。 ZprintProは香港で賞状印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業證書印刷服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "精美證書，配合燙金、壓紋等工藝，支持印刷即日速遞送貨。畢業證書、獎狀、資格證明。智印港提供專業的證書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "學校單張 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "學校通告、活動宣傳單張。經濟實惠，大量印刷。智印港提供專業學校單張服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "學校單張"
        ],
        "body": " bulk printing. ZprintPro offers professional School Flyers services in Hong Kong. High quality"
      },
      "en": {
        "title": "School Flyers | Professional Printing | ZprintPro",
        "description": "",
        "h1": "School notices",
        "keywords": [
          "學校單張"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "学校チラシ | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " event promotional flyers. Economical",
        "keywords": [
          "學校單張"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "学校の通知、イベント宣伝チラシ。経済的、大量印刷。 ZprintProは香港で学校チラシサービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業學校單張服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "學校通告、活動宣傳單張。經濟實惠，大量印刷。智印港提供專業的學校單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
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
        "title": "教科書印刷 | 專業印刷 | 智印港 ZprintPro",
        "description": "香港印刷",
        "h1": "教材、教科書印刷。專業排版，品質保證。智印港提供專業教科書印刷服務，香港本地印刷，品質保證，價格透明。",
        "keywords": [
          "教科書印刷"
        ],
        "body": " quality guaranteed. ZprintPro offers professional Textbooks services in Hong Kong. High quality"
      },
      "en": {
        "title": "Textbooks | Professional Printing | ZprintPro",
        "description": "",
        "h1": "Teaching materials",
        "keywords": [
          "教科書印刷"
        ],
        "body": " transparent pricing"
      },
      "ja": {
        "title": "教科書印刷 | プロ印刷 | ZprintPro",
        "description": "",
        "h1": " textbook printing. Professional typesetting",
        "keywords": [
          "教科書印刷"
        ],
        "body": " fast delivery."
      }
    },
    "faqs": [
      {
        "q": "教材、教科書の印刷。プロの組版、品質保証。 ZprintProは香港で教科書印刷サービスを提供。高品質、透明な価格、迅速な納品。",
        "a": "專業教科書印刷服務 | 智印港"
      },
      {
        "q": "",
        "a": ""
      },
      {
        "q": "教材、教科書印刷。專業排版，品質保證。智印港提供專業的教科書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。",
        "a": ""
      }
    ],
    "imageAlt": {
      "zh-hk": "校園印刷的最小訂購量是多少？",
      "en": "一般為100本/張起訂，學校批量訂單可享受優惠價格。",
      "ja": "支持學校採購流程嗎？"
    }
  }
};

export function getSkuSeo(slug: string): SkuSeoEntry | undefined {
  return skuSeoData[slug];
}
