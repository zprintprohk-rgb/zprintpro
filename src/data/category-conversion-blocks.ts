/**
 * Category Conversion Blocks — M1 大词攻坚转化区块数据 (B1 策略 2026-09-04)
 *
 * 独立于 category-seo-content.ts，只做 M1 增量：
 *   - quickAnswers     3 问快速答案（AEO featured snippet）
 *   - socialProof      第一方信任状数字
 *   - comparisonTable  渠道/选项比较表（GEO 比较列表）
 *   - orderFlow        6 步落单流程（降 B2B 决策门槛）
 *   - whatsappTemplates 3 个预填 WhatsApp CTA
 *   - newFaqs          新 FAQ（合入 FAQPage schema）
 *   - title / metaDescription  SEO Title/Meta 覆盖建议
 *
 * 可独立回滚：本文件 + CategoryConversionBlocks.tsx + page.tsx 挂载点。
 */

export interface QuickAnswer {
  q: string;
  a: string;
}

export interface SocialProof {
  stat: string;
  label: string;
  desc?: string;
}

export interface ComparisonTable {
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface FlowStep {
  title: string;
  desc: string;
}

export interface OrderFlow {
  title: string;
  steps: FlowStep[];
}

export interface WhatsAppTemplate {
  label: string;
  message: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CategoryConversionContent {
  category: string;
  locale: 'zh-hk' | 'en' | 'ja';
  title?: string;
  metaDescription?: string;
  quickAnswers: QuickAnswer[];
  socialProof: SocialProof[];
  comparisonTable: ComparisonTable;
  orderFlow: OrderFlow;
  whatsappTemplates: WhatsAppTemplate[];
  newFaqs: FaqItem[];
}

export const categoryConversionBlocks: Record<string, CategoryConversionContent> = {};

// === M1 内容包注入 (2026-09-04) ===

categoryConversionBlocks['stickers:zh-hk'] = {
  "category": "stickers",
  "locale": "zh-hk",
  "title": "貼紙印刷｜香港最快 2 日起貨｜小批量 100 張起印｜ZprintPro",
  "metaDescription": "香港貼紙印刷專家，PVC/透明/啞銀/光粉多款材質，100 張起印，2-3 日出貨。立即 WhatsApp 報價：+86 198 8085 1334。",
  "quickAnswers": [
    {
      "q": "香港貼紙印刷 1000 張幾錢？",
      "a": "50×50mm 光粉貼紙 1000 張約 HK$200-350，MOQ 低至 100 張，2-3 日出貨，WhatsApp 即時報價。"
    },
    {
      "q": "貼紙印刷最快幾日有貨？",
      "a": "常規 2-3 天交貨，平均出貨 2.3 天，加急可聯絡 WhatsApp 安排，累計 4820+ 訂單實證。"
    },
    {
      "q": "香港最受歡迎貼紙尺寸係邊啲？",
      "a": "Top5 熱門尺寸：50×50mm、40×60mm、30×30mm、圓形 38mm、70×25mm，全部 100 張起可印。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "累計訂單 真實客戶信賴"
    },
    {
      "stat": "2.3 天",
      "label": "貼紙平均出貨速度"
    },
    {
      "stat": "100 張起",
      "label": "MOQ 低 小批量無壓力"
    },
    {
      "stat": "9 種材質",
      "label": "PVC/透明/啞銀/燙金等任揀"
    }
  ],
  "comparisonTable": {
    "title": "香港貼紙印刷渠道比較",
    "columns": [
      "比較項目",
      "網上自助平台",
      "實體印刷店",
      "智印港 香港"
    ],
    "rows": [
      [
        "最少起印量",
        "500-1000 張起",
        "1000 張以上",
        "100 張起（部分 50 張）"
      ],
      [
        "交貨時間",
        "5-7 個工作天",
        "3-5 個工作天",
        "常規 2-3 天出貨"
      ],
      [
        "報價方式",
        "系統自助，難調整",
        "到店或電話查詢",
        "WhatsApp 一對一即時報價"
      ],
      [
        "材質選擇",
        "基本 2-3 款",
        "款式有限",
        "9 款以上（PVC/透明/啞銀/燙金/UV 等）"
      ],
      [
        "適合場景",
        "大量標準單",
        "本地熟客",
        "小批量、趕單、定制化"
      ]
    ],
    "note": "以上為市場常見情況參考，實際視乎個別商戶而定；智印港 專注小批量快閃定制。"
  },
  "orderFlow": {
    "title": "6 步落單流程",
    "steps": [
      {
        "title": "WhatsApp 查詢",
        "desc": "講清楚尺寸、數量、材質同用途"
      },
      {
        "title": "報價確認",
        "desc": "24 小時內回覆價錢同交期"
      },
      {
        "title": "提供設計檔",
        "desc": "AI/PNG/PDF 都得，可代簡單調整"
      },
      {
        "title": "打樣確認",
        "desc": "印前提供數碼樣，滿意先開印"
      },
      {
        "title": "生產製作",
        "desc": "廠房直接印刷，平均 2.3 日出貨"
      },
      {
        "title": "收貨驗收",
        "desc": "香港本地派送或自取，跟進到滿意"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "報價貼紙",
      "message": "你好，我想報價貼紙印刷：\n【尺寸】例如 50×50mm\n【數量】例如 1000 張\n【材質】例如光粉 / 透明 / 啞銀\n【用途】例如包裝 / 產品標籤 / 宣傳\n【交貨日期】例如 X 月 X 日前\n麻煩報價，多謝！"
    },
    {
      "label": "加急貼紙",
      "message": "你好，我有加急貼紙印刷需求：\n【尺寸】\n【數量】\n【材質】\n【最遲要貨日期】\n【是否有現成設計檔】有 / 無\n麻煩幫忙睇下趕唔趕到，多謝！"
    },
    {
      "label": "返單補印",
      "message": "你好，我之前喺貴司印過貼紙，想返單補印：\n【之前訂單編號 / 聯絡人】\n【補印數量】\n【尺寸與材質】同上次 / 需調整\n【交貨地址】\n麻煩報價，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "貼紙印刷 MOQ 係幾多？小批量都接嗎？",
      "a": "MOQ 低至 100 張，部分款式 50 張起都可印，適合新品牌測試市場或細活動使用。"
    },
    {
      "q": "你哋有邊啲貼紙材質同工藝？",
      "a": "提供 PVC、透明貼、啞銀、光粉、啞粉、防水、可移、燙金、局部 UV 等 9 款以上選擇，可混搭。"
    },
    {
      "q": "香港本地交貨要幾耐？可以加急嗎？",
      "a": "常規 2-3 天出貨，平均 2.3 天完成。趕單可 WhatsApp 溝通，視乎工廠排單安排加急。"
    },
    {
      "q": "付款方式有邊啲？接受轉數快嗎？",
      "a": "接受銀行轉賬、轉數快 FPS、支付寶香港等方式，確認報價後安排收款，WhatsApp 全程跟進。"
    }
  ]
};

categoryConversionBlocks['stickers:en'] = {
  "category": "stickers",
  "locale": "en",
  "title": "Small Batch Label Printing & Custom Stickers HK | ZprintPro",
  "metaDescription": "Small batch label printing & custom stickers in Hong Kong. MOQ from 100 pcs, 2-3 day turnaround. WhatsApp us for a free quote today.",
  "quickAnswers": [
    {
      "q": "What's the minimum order for custom stickers in Hong Kong?",
      "a": "Our MOQ starts at just 100 pcs (some materials from 50 pcs) — perfect for small batch label printing."
    },
    {
      "q": "How fast is small batch label printing turnaround?",
      "a": "Standard turnaround is 2-3 working days for custom stickers, with average sticker shipping in 2.3 days."
    },
    {
      "q": "How much do 1000 custom stickers cost in Hong Kong?",
      "a": "1000 pcs of 50×50mm gloss stickers cost roughly HK$200–350 — get an exact quote via WhatsApp in minutes."
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "Orders completed"
    },
    {
      "stat": "2.3 days",
      "label": "Avg. sticker shipping"
    },
    {
      "stat": "100 pcs",
      "label": "MOQ from (some 50)"
    },
    {
      "stat": "2–3 days",
      "label": "Standard turnaround"
    }
  ],
  "comparisonTable": {
    "title": "Small-Batch Label Printing & Custom Stickers Options in Hong Kong Compared",
    "columns": [
      "Option",
      "Minimum Order",
      "Turnaround",
      "Best For"
    ],
    "rows": [
      [
        "ZprintPro (WhatsApp direct)",
        "100 pcs (some 50)",
        "2–3 working days",
        "Startups, e-commerce sellers & small brands needing fast small batch label printing with human support"
      ],
      [
        "Self-service online platforms",
        "500–1000 pcs",
        "3–7 working days",
        "Simple designs with no custom tweaks; budget-only buyers"
      ],
      [
        "Local print shops",
        "500–2000 pcs",
        "5–10 working days",
        "Walk-in customers with flexible timelines and larger budgets"
      ],
      [
        "Marketplace sellers",
        "100–500 pcs",
        "7–14 days (incl. shipping)",
        "Price hunters who can wait and accept quality variance"
      ]
    ],
    "note": "ZprintPro combines the lowest MOQ, fastest turnaround, and direct WhatsApp support for small batch custom stickers and labels."
  },
  "orderFlow": {
    "title": "How to Order Custom Stickers in 6 Steps",
    "steps": [
      {
        "title": "Share Your Specs",
        "desc": "Send your specs & design via WhatsApp"
      },
      {
        "title": "Get a Quote",
        "desc": "Clear HK$ price — often within minutes"
      },
      {
        "title": "Approve Artwork",
        "desc": "Confirm digital proof before production"
      },
      {
        "title": "Make Payment",
        "desc": "Bank transfer or FPS QR — fast & secure"
      },
      {
        "title": "We Print & Pack",
        "desc": "Custom stickers printed in 2–3 days"
      },
      {
        "title": "Ship to You",
        "desc": "Local delivery or DHL worldwide 2–4 days"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get Sticker Quote",
      "message": "Hi ZprintPro! I'd like a quote for custom stickers:\n- Size: [e.g. 50×50mm]\n- Quantity: [e.g. 1000 pcs]\n- Material: [e.g. gloss / matte / transparent / PVC]\n- Shape: [e.g. square / round / custom die-cut]\n- Turnaround: [e.g. standard / rush]\n\nPlease send me the price and delivery timeline. Thanks!"
    },
    {
      "label": "Rush Order",
      "message": "Hi! I need a rush order for small batch label printing:\n- Size: [e.g. 40×60mm]\n- Quantity: [e.g. 200 pcs]\n- Material: [e.g. waterproof / matte silver]\n- Needed by: [date]\n\nIs 2-day turnaround possible? Please confirm cost ASAP. Thanks!"
    },
    {
      "label": "Reorder Stickers",
      "message": "Hi ZprintPro team! I'd like to reorder:\n- Previous order ref / name: [your name or order #]\n- Quantity: [e.g. 500 pcs]\n- Same design? [yes / minor changes]\n\nPlease confirm price and ETA. Thank you!"
    }
  ],
  "newFaqs": [
    {
      "q": "Can I order just 100 custom stickers for my startup?",
      "a": "Absolutely. Our MOQ starts at 100 pcs for most custom stickers and small batch label printing jobs — ideal for startups and e-commerce sellers testing designs."
    },
    {
      "q": "What sticker materials are available for small batch orders?",
      "a": "We offer PVC, transparent, matte silver, gloss, matte, waterproof, removable, foil-stamped, and spot-UV finishes — all available from 100 pcs with 2–3 day turnaround."
    },
    {
      "q": "How long does small batch label printing take in Hong Kong?",
      "a": "Standard production takes 2–3 working days after artwork confirmation. Average sticker shipping is 2.3 days, and DHL worldwide delivery takes 2–4 days."
    },
    {
      "q": "What are the most popular sticker sizes in Hong Kong?",
      "a": "Our top-selling sizes are 50×50mm, 40×60mm, 30×30mm, round 38mm, and 70×25mm. Custom sizes and die-cut shapes are also available for small batch orders."
    }
  ]
};

categoryConversionBlocks['stickers:ja'] = {
  "category": "stickers",
  "locale": "ja",
  "title": "オリジナルステッカー印刷｜香港発・小ロット100枚から・2〜3日出荷｜ZprintPro",
  "metaDescription": "香港発のオリジナルステッカー印刷。PVC・透明・マット銀・光沢など9種以上、100枚から対応、2〜3日出荷。WhatsAppで今すぐお見積もり—ZprintPro",
  "quickAnswers": [
    {
      "q": "ステッカー印刷 1000枚の値段は？",
      "a": "50×50mm 光沢パウダーステッカー 1000枚 約HK$200-350。MOQ100枚〜、2〜3日で出荷、WhatsAppで即見積もり。"
    },
    {
      "q": "ステッカー印刷 納期はどれくらい？",
      "a": "通常2〜3営業日で出荷、平均出荷は2.3日。お急ぎはWhatsAppでご相談ください。累計4820+注文実績。"
    },
    {
      "q": "人気のステッカーサイズは？",
      "a": "香港で人気Top5：50×50mm、40×60mm、30×30mm、円形38mm、70×25mm。いずれも100枚から印刷可能。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "累計注文件数 実績多数"
    },
    {
      "stat": "2.3日",
      "label": "ステッカー平均出荷スピード"
    },
    {
      "stat": "100枚〜",
      "label": "低MOQ 小ロット対応"
    },
    {
      "stat": "9種以上",
      "label": "素材/加工（PVC/透明/箔押し/UVなど）"
    }
  ],
  "comparisonTable": {
    "title": "ステッカー印刷 選び方比較",
    "columns": [
      "比較項目",
      "ネット印刷通販",
      "地元印刷店",
      "智印港 香港"
    ],
    "rows": [
      [
        "最低ロット",
        "500〜1000枚〜",
        "1000枚以上が多い",
        "100枚〜（一部50枚〜）"
      ],
      [
        "納期",
        "5〜7営業日",
        "3〜5営業日",
        "通常2〜3日で出荷"
      ],
      [
        "見積もり方法",
        "システム自動見積もり",
        "ご訪問または電話",
        "WhatsApp マンツー即対応"
      ],
      [
        "素材の種類",
        "基本2〜3種",
        "選択肢少なめ",
        "9種以上（PVC/透明/マット銀/箔押し/UVなど）"
      ],
      [
        "向いているシーン",
        "大量の定型発注",
        "地域の常連客",
        "小ロット・急ぎ・カスタム"
      ]
    ],
    "note": "上記は一般的な市場状況の参考であり、実際は事業者により異なります。小ロット短納期のカスタマイズを専門としています—ZprintPro"
  },
  "orderFlow": {
    "title": "ご注文の流れ 6ステップ",
    "steps": [
      {
        "title": "WhatsApp お問い合わせ",
        "desc": "サイズ・枚数・素材・用途をお知らせください"
      },
      {
        "title": "お見積もり・確認",
        "desc": "24時間以内に金額と納期をご返答"
      },
      {
        "title": "デザインデータ入稿",
        "desc": "AI/PNG/PDF対応、簡単な調整も承ります"
      },
      {
        "title": "校正・確認",
        "desc": "印刷前にデジタル確認稿をご提示"
      },
      {
        "title": "印刷・製造",
        "desc": "自社工場で印刷、平均2.3日で出荷"
      },
      {
        "title": "お届け・検収",
        "desc": "香港配達またはお引渡し、アフターフォロー"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "お見積もり",
      "message": "初めまして、ステッカー印刷のお見積もりをお願いします。\n【サイズ】例：50×50mm\n【枚数】例：1000枚\n【素材】例：光沢 / 透明 / マット銀\n【用途】例：パッケージ / 商品ラベル / 販促\n【希望納期】〇月〇日まで\nよろしくお願いいたします。"
    },
    {
      "label": "特急・急ぎ",
      "message": "お急ぎでステッカー印刷をお願いしたいです。\n【サイズ】\n【枚数】\n【素材】\n【最遅必要日】\n【データの有無】あり / なし\n間に合うか確認お願いします。"
    },
    {
      "label": "リピート注文",
      "message": "以前ステッカーを注文した者です。リピートでお願いします。\n【前回の注文番号 / 担当者名】\n【追加枚数】\n【サイズ・素材】前回と同じ / 変更あり\n【配送先】\nお見積もりよろしくお願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "ステッカー印刷のMOQは何枚からですか？",
      "a": "MOQは100枚から、一部の素材では50枚からでも承ります。新ブランドのテストや小規模イベントに最適です。"
    },
    {
      "q": "どんな素材や加工に対応していますか？",
      "a": "PVC、透明ステッカー、マット銀、光沢パウダー、マットパウダー、防水、再剥離、箔押し、部分UVなど9種以上から選べます。"
    },
    {
      "q": "香港への配送は何日くらいかかりますか？",
      "a": "通常2〜3営業日で出荷、平均2.3日で完成します。お急ぎの場合はWhatsAppでご相談ください、状況に応じ特急対応も可能です。"
    },
    {
      "q": "支払い方法は何がありますか？",
      "a": "銀行振込、FPS（転数快）、アリペイ香港などに対応。お見積もり確定後にお支払い手続きをお願いし、WhatsAppで全程サポートします。"
    }
  ]
};

categoryConversionBlocks['packaging:zh-hk'] = {
  "category": "packaging",
  "locale": "zh-hk",
  "title": "包裝盒訂製｜100個起印 免刀模費｜香港B2B定制包裝方案",
  "metaDescription": "香港包裝盒訂製專家，100個起印低至HK$0.03/個，拼版免刀模費，FDA食品級+FSC認證可選。30秒AI即時報價，立即WhatsApp查詢：8619880851334",
  "quickAnswers": [
    {
      "q": "包裝盒訂製最少要做幾多個？",
      "a": "100個起印，彈性MOQ 100-10K個，適合初創品牌試產同電商小批量補貨，降低庫存風險。"
    },
    {
      "q": "訂製包裝盒仲使唔使畀刀模費？",
      "a": "拼版彩盒免刀模費，對比傳統印刷廠HK$300-800刀模費，100個起都可以開新盒，慳返開模成本。"
    },
    {
      "q": "由報價到交貨大概要幾耐？",
      "a": "30秒AI即時報價，8-15天生產，香港本地1-2個工作天順豐直送，DHL全球2-4日送到。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "香港及跨境B2B訂單累計"
    },
    {
      "stat": "100個",
      "label": "全行業最低起印量"
    },
    {
      "stat": "HK$0.03/個起",
      "label": "白卡彩盒拼版價"
    },
    {
      "stat": "5大場景",
      "label": "電商/美妝/餐飲/零售/婚慶"
    }
  ],
  "comparisonTable": {
    "title": "香港包裝盒訂製渠道比較",
    "columns": [
      "比較項目",
      "傳統印刷廠",
      "網上自助平台",
      "智印港 訂製包裝"
    ],
    "rows": [
      [
        "最低起印量",
        "500-1000個起",
        "200-500個起",
        "100個起，彈性MOQ 100-10K"
      ],
      [
        "刀模費用",
        "HK$300-800/款",
        "個別款式豁免",
        "拼版彩盒全免刀模費"
      ],
      [
        "交貨時間",
        "15-30工作日",
        "7-20工作日",
        "8-15天，香港順豐1-2日送到"
      ],
      [
        "專人跟單",
        "電話/email來回",
        "無人看管自助落單",
        "WhatsApp一對一直屬對接"
      ],
      [
        "適合客戶",
        "大單量訂單",
        "標準款快速補貨",
        "初創/電商品牌試產及長期補貨"
      ]
    ],
    "note": "比較基準：同類白卡彩盒、標準尺寸、四色印刷。實際價格按數量、物料同工藝調整。"
  },
  "orderFlow": {
    "title": "B2B 定制包裝 6 步流程（含打樣）",
    "steps": [
      {
        "title": "AI 即時報價",
        "desc": "30秒輸入盒型/數量/尺寸，系統即時出價"
      },
      {
        "title": "打樣確認",
        "desc": "按設計稿輸出實物樣板，核對顏色同結構"
      },
      {
        "title": "定稿確認",
        "desc": "確認印刷文件、物料同生產工藝細節"
      },
      {
        "title": "批量生產",
        "desc": "8-15天廠房生產，全程QC把關"
      },
      {
        "title": "出貨驗貨",
        "desc": "出廠前隨機抽驗，確保數量同品質"
      },
      {
        "title": "送貨交付",
        "desc": "香港順豐1-2日，DHL全球2-4日送達"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "立即報價",
      "message": "你好，我想報價【盒型：____】【數量：____個】【尺寸：____mm】【用途：____】，麻煩報價同講下交期，多謝！"
    },
    {
      "label": "申請打樣",
      "message": "你好，我想申請打樣【盒型：____】【尺寸：____mm】【數量：____個】，麻煩講下打樣費用同時間，多謝！"
    },
    {
      "label": "批量復購",
      "message": "你好，我想復購之前訂開嘅【盒型：____】【數量：____個】，麻煩報價同確認最快交期，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "我哋係初創品牌，第一次做包裝盒應該點揀？",
      "a": "建議由100個小批量試產開始，白卡彩盒低至HK$0.03/個仲要免刀模費，可以測試市場反應先再決定補貨，風險低好多。"
    },
    {
      "q": "做食品包裝有冇相關認證？",
      "a": "我哋提供FDA食品級認證同FSC森林認證物料可選，適合餐飲外賣、零食、保健品等食品接觸類包裝，合規安全。"
    },
    {
      "q": "包裝盒有邊幾款盒型同尺寸可以揀？",
      "a": "涵蓋坑盒、卡盒、天地蓋等全盒型，提供8檔標準尺寸揀，由細件美妝品到服裝盒都有對應size，靈活性高。"
    },
    {
      "q": "跨境電商賣家點樣慳包裝成本？",
      "a": "用100-10K彈性MOQ方案，細批量測試爆品、大批量補貨備用，配合拼版免刀模費政策，整體成本比傳統印刷廠低30%以上。"
    }
  ]
};

categoryConversionBlocks['packaging:en'] = {
  "category": "packaging",
  "locale": "en",
  "title": "Custom Packaging Boxes | 100 MOQ, No Die Cut Fee | B2B Packaging Solutions",
  "metaDescription": "Premium custom packaging boxes from 100 pcs starting at HK$0.03 each. No die-cut fee on gang-run orders, FDA & FSC certified options. Get instant quote & WhatsApp us: +8619880851334",
  "quickAnswers": [
    {
      "q": "What's the minimum order for custom packaging boxes?",
      "a": "100 pieces minimum with flexible MOQ from 100 to 10K pcs — perfect for startups, e-commerce test runs, and small batch restocks with lower inventory risk."
    },
    {
      "q": "Do I have to pay die-cut fees for custom box shapes?",
      "a": "Gang-run printed boxes include FREE die-cut fees, saving you HK$300-800 compared to traditional printers. Even 100-piece orders qualify for custom box shapes."
    },
    {
      "q": "How long does it take from quote to delivery?",
      "a": "30-second AI instant quote, 8-15 day production, 1-2 working days local SF Express in Hong Kong, and 2-4 days worldwide via DHL."
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "B2B orders delivered globally"
    },
    {
      "stat": "100 pcs",
      "label": "Industry-low minimum order"
    },
    {
      "stat": "From HK$0.03",
      "label": "White card colour box price"
    },
    {
      "stat": "5 sectors",
      "label": "E-commerce, beauty, F&B, retail, wedding"
    }
  ],
  "comparisonTable": {
    "title": "Custom Packaging Options Compared",
    "columns": [
      "Criteria",
      "Traditional Printer",
      "Online Self-Service",
      "ZprintPro Custom Packaging"
    ],
    "rows": [
      [
        "Minimum Order",
        "500 - 1K pcs",
        "200 - 500 pcs",
        "100 pcs, flexible MOQ 100 - 10K"
      ],
      [
        "Die-Cut Fee",
        "HK$300 - 800 per design",
        "Waived on selected SKUs only",
        "Free on all gang-run colour boxes"
      ],
      [
        "Lead Time",
        "15 - 30 working days",
        "7 - 20 working days",
        "8 - 15 days + 1-2 day SF Express in HK"
      ],
      [
        "Account Support",
        "Phone / email back-and-forth",
        "Fully self-service, no rep",
        "Dedicated WhatsApp 1-to-1 support"
      ],
      [
        "Best For",
        "High-volume bulk orders",
        "Standard box restocks",
        "Startups & e-commerce brands testing and scaling"
      ]
    ],
    "note": "Comparison based on standard white card colour boxes in common sizes. Final pricing varies by quantity, material, and finishing options."
  },
  "orderFlow": {
    "title": "B2B Custom Packaging 6-Step Workflow (With Sampling)",
    "steps": [
      {
        "title": "Instant AI Quote",
        "desc": "Enter box type, qty & size — get priced in 30 seconds"
      },
      {
        "title": "Pre-Production Sample",
        "desc": "Physical sample to verify colour, structure and fit"
      },
      {
        "title": "Artwork Sign-Off",
        "desc": "Confirm print files, materials and production specs"
      },
      {
        "title": "Bulk Production",
        "desc": "8-15 day factory run with full QC checkpoints"
      },
      {
        "title": "Pre-Shipment Inspection",
        "desc": "Random sampling before dispatch for quality assurance"
      },
      {
        "title": "Delivery & Handover",
        "desc": "1-2 day SF in HK, 2-4 day DHL to worldwide"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get a Quote",
      "message": "Hi, I'd like a quote for [box type: ____] [quantity: ____ pcs] [size: ____ mm] [use case: ____]. Please share pricing and lead time, thanks!"
    },
    {
      "label": "Request a Sample",
      "message": "Hi, I'd like to request a sample for [box type: ____] [size: ____ mm] [quantity: ____ pcs]. Please advise sampling cost and timeline, thanks!"
    },
    {
      "label": "Repeat / Bulk Order",
      "message": "Hi, I'd like to reorder our previous [box type: ____] [quantity: ____ pcs]. Please confirm pricing and the earliest delivery date, thanks!"
    }
  ],
  "newFaqs": [
    {
      "q": "We're a startup — what's the best way to launch custom packaging?",
      "a": "Start with a 100-piece small batch test run. White card colour boxes start at HK$0.03 each with free die-cut fees, so you can validate market fit before committing to larger volumes with far less risk."
    },
    {
      "q": "Do you offer food-safe and sustainable packaging certifications?",
      "a": "Yes — FDA food-grade and FSC forest-certified materials are both available, ideal for F&B, snacks, supplements and any packaging with direct food contact. Fully compliant and traceable."
    },
    {
      "q": "What box styles and standard sizes are available?",
      "a": "Full range including corrugated mailer boxes, folding cartons and rigid lid-and-base boxes, with 8 standard sizes to choose from — everything from small beauty boxes to apparel packaging."
    },
    {
      "q": "How can e-commerce brands reduce packaging costs?",
      "a": "Use our flexible 100-10K MOQ model: small batches to test winners, larger runs for bestsellers. Combined with free gang-run die-cut fees, overall cost is typically 30% lower than traditional printers."
    }
  ]
};

categoryConversionBlocks['flyers:zh-hk'] = {
  "category": "flyers",
  "locale": "zh-hk",
  "title": "宣傳單張印刷 | 香港傳單印製 | A4/A5/A6/DL 小批量快交｜ZprintPro",
  "metaDescription": "香港宣傳單張印刷，A4/A5/A6/DL 單張、對折三折都有，銅版紙啞膠光膠任揀。MOQ 低至 100 張，2-3 日交貨。WhatsApp 即時報價：8619880851334",
  "quickAnswers": [
    {
      "q": "香港印傳單幾多錢一張？",
      "a": "視乎尺寸、紙張同數量，A5 157g 銅版紙 1000 張大約幾毫起一張，數量愈多單價愈平，最終以報價為準。"
    },
    {
      "q": "傳單印刷有咩常用尺寸？",
      "a": "香港最常見係 A4（210×297mm）、A5（148×210mm）、A6（105×148mm）同 DL（99×210mm），適合唔同派發場景。"
    },
    {
      "q": "最快幾日可以拎到傳單？",
      "a": "常規單張 2-3 個工作天交貨，趕時間可問加急安排。MOQ 低至 100 張起印，適合小批量推廣。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "香港累計訂單，餐飲零售樓上舖都用"
    },
    {
      "stat": "100張起",
      "label": "小批量都印，新店試水無壓力"
    },
    {
      "stat": "2-3日",
      "label": "常規交貨快，趕活動趕得切"
    },
    {
      "stat": "WhatsApp直連",
      "label": "報價落單一條龍，唔使填表等回覆"
    }
  ],
  "comparisonTable": {
    "title": "香港宣傳單張尺寸 × 紙張 × 適用場景對照表",
    "columns": [
      "尺寸",
      "常用紙張",
      "適用場景",
      "大概起印量"
    ],
    "rows": [
      [
        "A4 單張 (210×297mm)",
        "157g / 200g 銅版紙，啞膠/光膠",
        "餐廳菜單、產品目錄、活動主傳單",
        "100 張起"
      ],
      [
        "A5 單張 (148×210mm)",
        "157g 銅版紙最常見",
        "樓上舖推廣、地鐵派發、開業傳單",
        "100 張起"
      ],
      [
        "A6 單張 (105×148mm)",
        "157g / 200g 銅版紙",
        "優惠券、小禮品卡、口岸街頭派發",
        "100 張起"
      ],
      [
        "DL 單張 (99×210mm)",
        "157g 銅版紙，可做對折/三折",
        "餐牌夾頁、宣傳信、直銷郵件",
        "100 張起"
      ],
      [
        "對折/三折頁",
        "200g / 250g 銅版紙，啞膠",
        "產品介紹、價目表、活動手冊",
        "100 張起"
      ]
    ],
    "note": "紙張同工藝可自由配搭，最終價錢同交期以 WhatsApp 報價為準。"
  },
  "orderFlow": {
    "title": "6 步落單流程",
    "steps": [
      {
        "title": "WhatsApp 聯絡",
        "desc": "講明尺寸、數量、紙張同交期要求"
      },
      {
        "title": "報價確認",
        "desc": "我哋盡快回覆價錢同交貨時間"
      },
      {
        "title": "提供檔案",
        "desc": "AI/PDF/CDR 都得，亦可代為設計"
      },
      {
        "title": "簽樣確認",
        "desc": "印前睇稿核對內容顏色冇錯"
      },
      {
        "title": "安排付款",
        "desc": "銀行轉賬或轉數快，確認後開印"
      },
      {
        "title": "交貨收貨",
        "desc": "順豐到府或自取，2-3 日搞掂"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "立即報價",
      "message": "你好，我想印【A5】宣傳單張，數量大約【1000】張，紙張想用【157g 銅版紙啞膠】，麻煩報價同講埋交期，多謝！"
    },
    {
      "label": "加急詢問",
      "message": "你好，我有【活動/開業】趕住用傳單，尺寸【A4】，數量【500】張，想問下最快幾日有貨同加急費用，謝謝！"
    },
    {
      "label": "回頭客落單",
      "message": "你好，之前喺你哋度印過傳單，今次想再加印【A5 單張】，數量【2000】張，內容同上次一樣，麻煩報價，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "印傳單最少要印幾多張？",
      "a": "MOQ 低至 100 張起印，適合小店同新開舖頭試水。數量愈多單價愈抵，500 張、1000 張都係常見選擇。"
    },
    {
      "q": "傳單可以做啞膠或光膠嗎？",
      "a": "可以。銅版紙可選光膠（顏色鮮艷有光澤）或啞膠（高階唔反光），250g 厚紙再加膠手感更紮實。"
    },
    {
      "q": "我冇設計檔案，可以代設計嗎？",
      "a": "可以代為設計，你只要提供文字同圖片就得。設計費視乎複雜度，WhatsApp 講下你嘅需求我哋會報價。"
    },
    {
      "q": "香港地區包送貨嗎？",
      "a": "印好後經順豐寄出，一般 1-2 日送到香港各區。滿一定金額可傾包郵，細聲講：WhatsApp 問下有冇優惠。"
    }
  ]
};

categoryConversionBlocks['paper-bags:zh-hk'] = {
  "category": "paper-bags",
  "locale": "zh-hk",
  "title": "紙袋訂製 | 香港紙袋印刷 | 牛皮紙/白卡/燙金小批量定制｜ZprintPro",
  "metaDescription": "香港紙袋訂製，白卡紙、牛皮紙、銅版紙任揀，棉繩絲帶扭繩款齊全，燙金UV工藝都做。MOQ 約 100-250 個起，WhatsApp 報價：8619880851334",
  "quickAnswers": [
    {
      "q": "香港訂製紙袋幾多錢一個？",
      "a": "視乎尺寸、物料同數量，一般牛皮紙袋幾毫至幾蚊一個，燙金UV等工藝另計。MOQ 約 100-250 個起，以報價為準。"
    },
    {
      "q": "紙袋訂製有咩常用尺寸？",
      "a": "常見有細碼（約 20×25×8cm）、中碼（約 26×32×10cm）、大碼（約 32×40×12cm）同禮品袋，可按產品尺寸定制。"
    },
    {
      "q": "訂造紙袋最快幾日有貨？",
      "a": "常規定制袋 7-12 個工作天交貨，視乎數量同工藝複雜度。趕單可 WhatsApp 問下加急安排。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "香港累計訂單，零售餐飲精品店都幫襯"
    },
    {
      "stat": "100個起",
      "label": "小批量都訂，新品牌無負擔"
    },
    {
      "stat": "7-12日",
      "label": "定制交貨快，趕開業趕活動都得"
    },
    {
      "stat": "WhatsApp直連",
      "label": "報價落單一條龍，唔使網上填表",
      "desc": "報價落單一條龍，唔使網上填表"
    }
  ],
  "comparisonTable": {
    "title": "香港紙袋訂製物料 × 工藝 × 適用場景比較",
    "columns": [
      "袋型/物料",
      "常用工藝",
      "適用場景",
      "大概起訂量"
    ],
    "rows": [
      [
        "白卡紙袋（250g/300g）",
        "彩色印刷、燙金、UV、啞膜",
        "零售服裝、精品店、品牌包裝",
        "250 個起"
      ],
      [
        "牛皮紙袋（120g/150g）",
        "絲印、燙金、加貼紙",
        "餐飲外賣、手作、環保小店",
        "100 個起"
      ],
      [
        "銅版紙袋",
        "全彩印刷、光膜/啞膜",
        "化妝品、禮品、促銷活動",
        "250 個起"
      ],
      [
        "禮品袋（緞面/特種紙）",
        "燙金、凹凸壓紋、絲帶",
        "婚禮回禮、節日禮盒、VIP 贈品",
        "100 個起"
      ]
    ],
    "note": "尺寸同繩頭（棉繩/絲帶/扭繩）可自由搭配，最終價錢交期以 WhatsApp 報價為準。"
  },
  "orderFlow": {
    "title": "6 步紙袋訂製流程",
    "steps": [
      {
        "title": "WhatsApp 諮詢",
        "desc": "話我哋知尺寸、數量、物料同預算"
      },
      {
        "title": "報價確認",
        "desc": "按需求出價，列明工期同額外費用"
      },
      {
        "title": "設計定稿",
        "desc": "提供檔案或由我哋代為設計logo"
      },
      {
        "title": "打樣確認",
        "desc": "印前睇樣核對顏色尺寸冇問題"
      },
      {
        "title": "落單付款",
        "desc": "銀行轉賬或轉數快，確認後開工"
      },
      {
        "title": "交貨收貨",
        "desc": "順豐到府或自取，7-12 日搞掂"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "報價查詢",
      "message": "你好，我想訂製【牛皮紙袋】，尺寸大約【中碼 26×32×10cm】，數量【500】個，需要【印logo + 棉繩】，麻煩報價同交期，多謝！"
    },
    {
      "label": "加急詢問",
      "message": "你好，我哋【開業/活動】趕住用紙袋，物料【白卡紙】，數量【300】個，想問下最快幾日有貨同加急費用，謝謝！"
    },
    {
      "label": "回頭客加訂",
      "message": "你好，之前喺你哋度訂過紙袋，今次想再加印【同款牛皮紙袋】，數量【1000】個，設計同上次一樣，麻煩報價，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "紙袋最小可以訂幾多個？",
      "a": "視乎物料，牛皮紙袋 MOQ 約 100 個起，白卡紙袋同銅版紙袋約 250 個起。小品牌細單都接，詳情 WhatsApp 傾。"
    },
    {
      "q": "可以做燙金或 UV 工藝嗎？",
      "a": "可以。白卡紙袋同銅版紙袋可加燙金、燙銀、局部 UV、凹凸壓紋等高階工藝，提升品牌質感，費用另計。"
    },
    {
      "q": "紙袋有咩繩頭可以揀？",
      "a": "常用有棉繩（最常見，手感好）、扭繩（牛皮紙袋常用）、絲帶（禮品袋首選），仲有紙繩等環保選擇，可按需搭配。"
    },
    {
      "q": "我冇設計圖，可以印logo嗎？",
      "a": "可以。你只要提供 logo 檔案（AI/PNG 高清都得），我哋可以免費幫你排版。完全冇設計都可以代為設計，費用另報。"
    }
  ]
};



// === W2 内容包注入 (2026-09-05) ===

// W2 跨语言铺开 (2026-09-05): paper-bags ja / packaging ja / calendars zh-hk

categoryConversionBlocks['paper-bags:ja'] = {
  "category": "paper-bags",
  "locale": "ja",
  "title": "紙袋印刷 | 紙袋オーダーメイド | クラフト紙袋・箔押し 小ロット100個から｜ZprintPro",
  "metaDescription": "紙袋印刷・オーダーメイドならお任せ。クラフト紙袋1個￥22〜、白カード紙袋1個￥28〜、パール箔押し1個￥55〜。小ロット100個から対応し、箔押し・エンボス・局部UVも選べます。AI即時見積もり30秒対応。標準3-5営業日製造、DHL Expressで日本全国へ2-4日配送。B2B納品実績4,820件超。",
  "quickAnswers": [
    {
      "q": "オリジナル紙袋の印刷は1個いくらですか？",
      "a": "クラフト紙袋は1個￥22〜、白カード紙袋は1個￥28〜、パール紙＋箔押しは1個￥55〜。100個からの小ロットに対応し、1,000個以上はオフセット印刷で単価が下がります。最終単価はサイズ・材質・持ち手により変わるため、まずはお見積もりを。"
    },
    {
      "q": "紙袋を注文してから届くまで何日かかりますか？",
      "a": "デジタル印刷は標準3-5営業日、オフセット印刷は5-7営業日、特急は2-3営業日で製造します。サンプル確認に2-3日。完成後はDHL Expressで全世界2-4日、東京・大阪・名古屋など日本全国へお届けします。"
    },
    {
      "q": "紙袋のサイズと材質はどう選べばいいですか？",
      "a": "標準サイズは小（150×80×200mm）・中（220×100×280mm）・大（320×120×380mm）、完全カスタマイズにも対応。材質は発色重視なら白カード紙（250g）、ナチュラル・エコ系ならクラフト紙（200g）、高級感なら黒カード紙＋箔押しが定番です。耐荷重は標準3-5kg、強化タイプは8-10kg。"
    }
  ],
  "socialProof": [
    {
      "stat": "4,820+",
      "label": "小売・飲食・ギフト業界のB2B納品実績"
    },
    {
      "stat": "100個〜",
      "label": "小ロットOK。新ブランドの試作・限定イベントにも"
    },
    {
      "stat": "3-5営業日",
      "label": "デジタル印刷の標準製造リードタイム"
    },
    {
      "stat": "￥22〜",
      "label": "クラフト紙袋の1個あたり目安価格"
    }
  ],
  "comparisonTable": {
    "title": "紙袋の材質 × 工法 × シーン別 比較表",
    "columns": [
      "袋型・材質",
      "主な工法",
      "おすすめシーン",
      "目安ロット"
    ],
    "rows": [
      [
        "白カード紙袋（250g）",
        "カラー印刷・箔押し・局部UV",
        "アパレル・化粧品・小売のブランド紙袋",
        "100個〜（デジタル）"
      ],
      [
        "クラフト紙袋（200g）",
        "スクリーン印刷・箔押し・紙紐",
        "カフェ・ベーカリー・エコブランド・手作り品",
        "100個〜（デジタル）"
      ],
      [
        "黒カード紙袋（300g）",
        "箔押し・エンボス",
        "ジュエリー・高級コスメ・VIPギフト",
        "100個〜（デジタル）"
      ],
      [
        "パール紙・ギフト紙袋",
        "箔押し・リボン持ち手",
        "ブライダル・季節ギフト・高級イベント",
        "100個〜（デジタル）"
      ]
    ],
    "note": "持ち手（綿紐・紙紐・リボン・革紐）とサイズは自由に組み合わせ可能。1,000個以上はオフセット印刷がお得。最終価格・納期はお見積もり制です。"
  },
  "orderFlow": {
    "title": "紙袋オーダーメイド 6ステップ",
    "steps": [
      {
        "title": "お問い合わせ",
        "desc": "WhatsAppでサイズ・数量・材質・持ち手のご要望をお知らせください"
      },
      {
        "title": "AI即時見積もり",
        "desc": "30秒で概算価格と納期をご提示します"
      },
      {
        "title": "デザイン入稿",
        "desc": "展開図データ（AI／PDF）の入稿、または無料デザインサービスをご利用いただけます"
      },
      {
        "title": "サンプル確認",
        "desc": "無料サンプルで色・サイズ・持ち手の仕上がりをチェック（2-3日）"
      },
      {
        "title": "製造・品質検査",
        "desc": "デジタル3-5営業日／オフセット5-7営業日で製造し、出荷前に検品します"
      },
      {
        "title": "配送・納品",
        "desc": "DHL Express／FedExで日本全国へ。全世界2-4日で到着します"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "見積もり依頼",
      "message": "オリジナル紙袋の見積もりをお願いします。【クラフト紙袋】／サイズ【M 220×100×280mm】／数量【500個】／仕様【ロゴ印刷＋綿紐】。単価と納期を教えてください。"
    },
    {
      "label": "納期・特急相談",
      "message": "【開店イベント】で紙袋が急ぎです。材質【白カード紙】／数量【300個】。最短でいつ納品できるか、特急料金とあわせて教えてください。"
    },
    {
      "label": "リピート追加発注",
      "message": "前に発注した【同デザインのクラフト紙袋】を追加したいです。数量【1,000個】、デザインは前回と同じです。見積もりをお願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "紙袋の最小発注数（MOQ）はいくつからですか？",
      "a": "100個から（デジタル印刷）で承ります。1,000個以上はオフセット印刷で単価を大幅に抑えられ、5,000個以上は15-25%の段階割引があります。新ブランドの試作や小ロットのイベント配布にも最適です。"
    },
    {
      "q": "箔押しやエンボスなどの加工はできますか？",
      "a": "はい。箔押し、エンボス、デボス、局部UV、スクリーン印刷など多様な加工に対応しています。パール紙＋箔押しのギフト紙袋（1個￥55〜）はブライダルや高級ギフトで特に人気です。"
    },
    {
      "q": "持ち手（紐）の種類は選べますか？",
      "a": "綿紐・紙紐・リボン・革紐から選択できます。標準タイプは耐荷重3-5kg、強化タイプは8-10kgまで対応し、ボトルやガラス製品も安心です。持ち手の色をブランドカラーに合わせると統一感が出ます。"
    },
    {
      "q": "デザインデータがなくても発注できますか？",
      "a": "はい。ロゴデータ（AI／PNGなど）をいただければ、展開図デザインを無料で作成します。サイズ・形状・窓デザインの完全カスタマイズにも対応。まずはサイズ・紙質・持ち手・数量をお知らせいただければ、お見積もり可能です。"
    }
  ]
};


categoryConversionBlocks['packaging:ja'] = {
  "category": "packaging",
  "locale": "ja",
  "title": "オリジナルパッケージ印刷｜小ロット30個〜・クラフト紙・食品グレード対応｜ZprintPro",
  "metaDescription": "オリジナルパッケージ印刷は小ロット30個〜に対応。クラフト紙やFSC認証エコ紙、食品グレード紙＋大豆インク（SGS検査済み）から選べ、箔押し・UV加工にも対応。価格はお見積り制で、通常3日出荷・急行2日。30秒AI見積もり、無料型設計対応。20種類以上の箱型をDHL／FedExで日本全国へお届けします。",
  "quickAnswers": [
    {
      "q": "オリジナルパッケージの最小ロットは何個からですか？",
      "a": "ウエディングボックスは30個〜、カラーボックスは50個〜、標準・工業用は100–200個〜。一般的な工場基準500–1,000個を大きく下回るので、スタートアップの試作や小ロット発注に向いています。"
    },
    {
      "q": "クラフト紙でパッケージ印刷はできますか？",
      "a": "可能です。クラフト紙はエコ・オーガニックな印象が魅力で、全箱型でFSC認証エコ紙を選択可能。有機食品やサステナブルブランドのパッケージに最適で、欧米輸出向けの国際環境基準にも対応します。"
    },
    {
      "q": "食品用パッケージは安全ですか？",
      "a": "はい。食品グレード紙と無毒の大豆インクを使用し、SGS検査済み、日本の食品衛生基準に準拠しています。ベーカリーや健康食品、茶葉用の箱には防湿加工やQRコードの追加も可能です。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "B2B注文実績（累計）"
    },
    {
      "stat": "30個〜",
      "label": "小ロット対応（ウエディングボックス）"
    },
    {
      "stat": "HK$0.8〜",
      "label": "カラーボックス単価"
    },
    {
      "stat": "20種類以上",
      "label": "標準箱型ラインナップ"
    }
  ],
  "comparisonTable": {
    "title": "パッケージの材質・加工・シーン・最小ロット早見表",
    "columns": [
      "材質",
      "特徴・加工",
      "おすすめシーン",
      "最小ロット"
    ],
    "rows": [
      [
        "高級カラーボックス（白カード300–350g）",
        "発色鮮やか、箔押し・UV局部コーティング対応",
        "美容・ギフト・ウエディング",
        "50個〜"
      ],
      [
        "クラフト紙／FSC認証エコ紙",
        "エコ・オーガニックな印象、生分解性・無可塑剤",
        "有機食品・サステナブルブランド・環境企業",
        "お見積り制"
      ],
      [
        "段ボール箱（E／Fフルート）",
        "工業級強度、カスタムサイズ、輸出対応",
        "EC物流・越境倉庫・卸売包装",
        "100–200個〜"
      ],
      [
        "食品グレード／防湿紙材",
        "無毒大豆インク、防湿加工、QRコード対応",
        "ベーカリー・健康食品・漢方包装",
        "お見積り制"
      ]
    ],
    "note": "記載の最小ロットと加工は標準仕様の一例です。最終価格は数量・紙材・加工内容によりお見積りいたします。"
  },
  "orderFlow": {
    "title": "オリジナルパッケージ制作の6ステップ（サンプル込み）",
    "steps": [
      {
        "title": "AI即時見積もり",
        "desc": "箱型・数量・サイズを入力して30秒で見積もり"
      },
      {
        "title": "サンプル確認",
        "desc": "実物サンプルで発色と構造をチェック（当日完成）"
      },
      {
        "title": "データ確定",
        "desc": "印刷ファイル・紙材・加工仕様を最終確認"
      },
      {
        "title": "量産",
        "desc": "工場で量産し、工程ごとに品質をチェック"
      },
      {
        "title": "出荷前検品",
        "desc": "出荷前に抜き取り検査で数量と品質を確認"
      },
      {
        "title": "配送・納品",
        "desc": "DHL／FedExで日本全国へお届け。大口は倉庫やオフィスへの直送も相談可能"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "見積もり依頼",
      "message": "こんにちは、オリジナルパッケージの見積もりをお願いします。【箱型：____】【数量：____個】【サイズ：____mm】【用途：____】。納期についても合わせて教えてください。"
    },
    {
      "label": "サンプル依頼",
      "message": "こんにちは、サンプルを依頼したいです。【箱型：____】【サイズ：____mm】【数量：____個】。サンプルの費用と所要日数を教えてください。"
    },
    {
      "label": "リピート注文",
      "message": "こんにちは、前に発注した【箱型：____】を【数量：____個】で再発注したいです。最短納期と見積もりを確認お願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "食品パッケージ印刷で防湿加工やQRコードには対応していますか？",
      "a": "はい。食品グレード紙と無毒の大豆インクを使用し、SGS検査済み。ベーカリーや茶葉、サプリメント用の箱には防湿加工を推奨しており、QRコードによるロット追跡も追加できます。"
    },
    {
      "q": "納期はどのくらいかかりますか？",
      "a": "通常注文は3日出荷、急行サービスは2日、サンプルは当日完成です。5,000個以上の大口注文は約5–7日。DHL／FedExで日本全国へ配送します。"
    },
    {
      "q": "選べる箱型はどのくらいありますか？",
      "a": "化粧箱、ブック型箱、引き出し箱、組み立て箱、段ボール箱、磁石式箱など20種類以上の標準箱型をご用意。完全カスタムデザインにも対応します。"
    },
    {
      "q": "型抜き線のデータは自分で用意する必要がありますか？",
      "a": "AI／PDF形式（CMYK、300dpi、型抜き線含む）でご入稿いただけます。型抜き設計に不慣れな場合は、無料の型設計サービスをご利用ください。"
    }
  ]
};


categoryConversionBlocks['calendars:zh-hk'] = {
  "category": "calendars",
  "locale": "zh-hk",
  "title": "月曆印刷 | 香港月曆訂製 | 座枱曆/掛曆/月曆卡 2027 企業禮品｜智印港",
  "metaDescription": "香港月曆印刷同月曆訂製一條龍，座枱曆、掛曆、年曆卡、記事簿月曆任揀，燙金年份、局部UV、圓環裝訂都做。50本起訂，月曆價錢掛曆HK$18起、檯曆HK$9起、年曆卡HK$3起，數碼3-5日交貨，順豐到港。2027企業禮品月曆早鳥9折連免費設計，WhatsApp 8619880851334 報價落單搞掂。",
  "quickAnswers": [
    {
      "q": "香港月曆印刷幾多錢？月曆價錢點計？",
      "a": "視乎款式同數量：掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張；500 本柯式企業月曆 HK$10-15/本，燙金另加 HK$0.5-1.5/本（100 本起）。2027 早鳥 9 折連免費設計，實價以 WhatsApp 報價為準。"
    },
    {
      "q": "月曆訂製最快幾日有貨？",
      "a": "數碼印刷標準 3-5 日，柯式 5-7 日，急件 2-3 日（數碼）。11-12 月旺季工廠排期會拉長到 7-10 日，想趕 Q4 交貨建議 9 月中前落單鎖定檔期。"
    },
    {
      "q": "月曆最少訂幾多本？有咩尺寸揀？",
      "a": "50 本起訂（數碼印刷），500 本以上柯式更經濟，燙金工藝 100 本起。座枱曆 150×180 / 200×230mm，掛曆 A3/A2，月曆卡 100×150mm，支援完全訂製。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "香港累計訂單，企業禮品、學校紀念、NGO 派發都幫襯"
    },
    {
      "stat": "50本起",
      "label": "數碼小批量都接，初創同中小企試印無負擔"
    },
    {
      "stat": "3-5日",
      "label": "數碼印刷標準交貨，趕旺季都來得切"
    },
    {
      "stat": "365日",
      "label": "品牌擺喺客戶桌面全年的曝光，仲唔使續費"
    }
  ],
  "comparisonTable": {
    "title": "香港月曆訂製類型 × 工藝 × 適用場景比較",
    "columns": [
      "月曆類型",
      "常用工藝",
      "適用場景",
      "大概起訂量"
    ],
    "rows": [
      [
        "座枱曆（三角架）150×180 / 200×230mm",
        "燙金年份、局部UV、圓環裝訂、底板加厚",
        "辦公桌面、收銀台、前台、企業贈禮",
        "50 本起（燙金 100 本起）"
      ],
      [
        "掛牆曆（A3 / A2）",
        "打孔掛繩、防水覆膜、燙金",
        "家居、辦公室、學校、餐廳",
        "50 本起"
      ],
      [
        "月曆卡（100×150mm）",
        "雙面彩色印刷、覆膜",
        "郵寄贈品、活動派發、展會、促銷",
        "100 張起（HK$3/張 價）"
      ],
      [
        "記事簿月曆",
        "圓環裝訂、可變數據印刷（每本印唔同姓名/分店）",
        "員工福利、客戶贈禮、學校紀念品、VIP 禮品",
        "50 本起"
      ]
    ],
    "note": "仲有磁石冰箱貼月曆等款式，紙張 200g-300g 銅版紙/啞粉紙、底板 1-2mm 灰板可自由搭配，最終價錢交期以 WhatsApp 報價為準。"
  },
  "orderFlow": {
    "title": "6 步月曆訂製流程",
    "steps": [
      {
        "title": "WhatsApp 諮詢",
        "desc": "話我哋知款式（座枱/掛牆/月曆卡）、數量、尺寸同預算"
      },
      {
        "title": "報價確認",
        "desc": "數碼定柯式方案任揀，列明交期同燙金等額外費用"
      },
      {
        "title": "設計定稿",
        "desc": "有 12 個月免費模板（連節日假期標記），冇設計檔都做得"
      },
      {
        "title": "打樣確認",
        "desc": "核對顏色、紙張同月份排版冇問題先開機"
      },
      {
        "title": "落單付款",
        "desc": "銀行轉賬或轉數快，2027 早鳥 9 折窗口內落單鎖價"
      },
      {
        "title": "交貨收貨",
        "desc": "數碼 3-5 日搞掂，順豐到港，企業大單可傾貨車分區派"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "報價查詢",
      "message": "你好，我想訂製【座枱曆/掛曆】，尺寸【A3 / 150×180mm】，數量【300】本，需要【印公司logo + 燙金年份】，麻煩報個月曆價錢同交期，多謝！"
    },
    {
      "label": "2027 早鳥查詢",
      "message": "你好，想幫公司做【2027 年企業禮品月曆】，款式【座枱曆/記事簿月曆】，數量【500】本，想問下早鳥 9 折同免費設計點樣申請，謝謝！"
    },
    {
      "label": "趕旺季交貨",
      "message": "你好，我哋【聖誕/新年】要派月曆畀客戶，趕住【12 月】前收貨，數量【100】本，想問下最快幾日交到同可唔可以加急，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "2027 月曆幾時開始訂最穩陣？",
      "a": "最好提前 2-3 個月準備：8-9 月落單 → 9-11 月柯式印刷 → 10-12 月旺季交貨。拖到 11-12 月高峰期，紙張加價 15-20%、工廠排期拉長到 7-10 日，交貨風險大增。想穩陣趕 Q4 旺季，9 月中前落單，早鳥 9 折仲連免費設計。"
    },
    {
      "q": "月曆印刷有咩辦法慳多啲？",
      "a": "三個位可以慳：(1) 數量上 500 本轉柯式印刷，企業月曆可做到 HK$10-15/本；(2) 揀檯曆或者月曆卡，單價低過掛曆；(3) 2027 早鳥期落單享 9 折兼免費設計。詳細報價 WhatsApp 傾。"
    },
    {
      "q": "我冇設計檔，可以做月曆嗎？",
      "a": "可以。我哋有 12 個月份免費模板框架（連節日假期標記），你淨係畀 logo 同產品圖，我哋幫你排版；企業訂製仲有設計師幫手融入品牌色同產品元素。"
    },
    {
      "q": "月曆可以送到港島九龍新界嗎？",
      "a": "可以。座枱曆／掛曆按箱規安排順豐或貨車，企業大單可以先集中送到總部再分區派發；海外客戶有 DHL。旺季建議提早鎖定檔期同數量。"
    }
  ]
};


// === W2 wave2 内容包注入 (2026-09-05) ===

categoryConversionBlocks['posters:zh-hk'] = {
  "category": "posters",
  "locale": "zh-hk",
  "title": "海報印刷｜印海報 A0-A3 大圖輸出・戶外防水 PVC 100 張起｜智印港",
  "metaDescription": "香港海報印刷｜印海報 1 張起印，A2 128g銅版紙 HK$6-9/張、A1 HK$10-16/張，500 張減 30%，1,000 張以上轉柯式再降 40%。室內銅版紙/PP，戶外防水 PVC 抗 UV，MTR 燈箱 12-sheet 大圖輸出都做，最快即日交貨，DHL 全球 2-4 天，WhatsApp 報價。",
  "quickAnswers": [
    {
      "q": "海報印刷幾多錢一張？",
      "a": "128g 銅版紙 A2 約 HK$6-9/張、A1 約 HK$10-16/張（100 張批量價）；500 張再減 30%，1,000 張以上轉柯式再降約 40%。大圖輸出 1 張都印，實際價錢按尺寸、材質、數量報價。"
    },
    {
      "q": "海報有咩 size 同材質揀？",
      "a": "標準 A2（420×594mm）、A1（594×841mm）、A0（841×1189mm），訂製最大闊 1.5 米、長度不限。室內揀銅版紙或 PP 合成紙，戶外必須 PVC／帆布／網布，防水抗 UV。"
    },
    {
      "q": "印海報最快幾日有貨？",
      "a": "大圖輸出 1-5 張最快即日交貨，批量標準 1-2 日；柯式批量 3-5 個工作天，DHL 全球 2-4 天到。加裱板額外 1 日，趕單可以 WhatsApp 問下加急安排。"
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "香港累計訂單，展覽活動、零售餐飲都幫襯"
    },
    {
      "stat": "1 張起印",
      "label": "大圖輸出散張都接，10 張起有批量優惠"
    },
    {
      "stat": "2-3 年",
      "label": "防 UV PVC 戶外海報日曬雨淋唔褪色"
    },
    {
      "stat": "95%+",
      "label": "Pantone 專色匹配，品牌色一致有保證"
    }
  ],
  "comparisonTable": {
    "title": "香港海報印刷材質 × 工藝 × 適用場景比較",
    "columns": [
      "海報類型",
      "材質/工藝",
      "適用場景",
      "起訂量"
    ],
    "rows": [
      [
        "銅版紙海報（128g）",
        "全彩 CMYK 印刷，A2 約 HK$6-9/張（100 張價）",
        "展覽會、活動宣傳、店內裝飾，室內短期 3-6 個月",
        "1 張起印，100 張起批量價"
      ],
      [
        "PP 合成紙海報（200g）",
        "防水不反光、色彩還原佳，A2 約 HK$12-18/張",
        "燈箱、海報架、室內長期展示 1-2 年",
        "1 張起印，10 張起批量優惠"
      ],
      [
        "PVC 海報（440g）",
        "完全防水、抗 UV 耐磨，A2 約 HK$20-35/張",
        "戶外廣告、建築圍板、工地標示，2-3 年不褪色",
        "1 張起印（大圖輸出）"
      ],
      [
        "帆布／網布海報",
        "帆布藝術質感可捲收；網布透風抗風輕量",
        "藝術展、攝影展；大型戶外、體育場、演唱會",
        "1 張起印（大圖輸出）"
      ]
    ],
    "note": "仲有背膠（可移除／永久）、KT 板／Foam 板／亞加力裱板、打孔穿繩、燙金、局部 UV、夜光等加工。A2 價以 100 張批量計，最終價錢交期以 WhatsApp 報價為準，其他海報與印刷疑問歡迎逐單傾。"
  },
  "orderFlow": {
    "title": "6 步海報印刷流程",
    "steps": [
      {
        "title": "WhatsApp 諮詢",
        "desc": "話我哋知尺寸（A2/A1/A0 或訂製）、數量、室內定戶外"
      },
      {
        "title": "報價確認",
        "desc": "按材質同數量出價，列明交期同裱板等額外費用"
      },
      {
        "title": "上傳設計檔",
        "desc": "PDF/X-1a 或 AI 檔，CMYK 150dpi（A0 大圖 72-100dpi 已夠）"
      },
      {
        "title": "印前檢查",
        "desc": "逐檔案核對解析度、3-5mm 出血同色彩模式，Pantone 匹配 95%+"
      },
      {
        "title": "落單付款",
        "desc": "確認報價後付款開工，急件可加 30% 費用趕 24-48 小時"
      },
      {
        "title": "交貨收貨",
        "desc": "大圖最快即日、批量 1-2 日；捲筒順豐寄送或貨車直送場地"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "報價查詢",
      "message": "你好，我想印海報，尺寸【A2】，材質【128g 銅版紙】，數量【200】張，室內用，麻煩報價同交期，多謝！"
    },
    {
      "label": "戶外海報加急",
      "message": "你好，我哋【開張/活動】趕住用戶外海報，尺寸【A1】，PVC 防水材質，數量【50】張，想問下最快幾日有貨同加急費用，謝謝！"
    },
    {
      "label": "燈箱/裱板查詢",
      "message": "你好，想查詢【MTR 燈箱 12-sheet 海報】，尺寸【3048×1524mm】，需要【KT 板裱板】，檔案係 PDF，麻煩報價同交期，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "印海報一張幾多錢？",
      "a": "大圖輸出 1 張都印，散張按尺寸同材質計價；批量價參考：128g 銅版紙 A2 100 張約 HK$6-9/張、A1 約 HK$10-16/張，1,000 張以上轉柯式再降約 40%。實際以 WhatsApp 報價為準。"
    },
    {
      "q": "戶外海報用邊種材質先唔怕日曬雨淋？",
      "a": "440g PVC 硬片完全防水抗 UV，戶外 2-3 年不褪色；帆布約 3-5 年；大型戶外或建築外牆可用網布，透風抗風更穩陣。"
    },
    {
      "q": "海報 size 有咩標準？可唔可以訂製？",
      "a": "標準 A2（420×594mm）、A1（594×841mm）、A0（841×1189mm），支援完全訂製，最大闊 1.5 米、長度不限。近看（A2）建議 150dpi，遠看（A0）72-100dpi 已夠清晰。"
    },
    {
      "q": "港鐵燈箱海報 12-sheet 印要幾耐？",
      "a": "12-sheet（3048×1524mm）大圖輸出 3-5 個工作天，急件可加 30% 費用趕 24-48 小時；印前請確認 PDF/X-1a、150dpi CMYK 同 30mm 出血。"
    }
  ]
};

categoryConversionBlocks['paper-bags:en'] = {
  "category": "paper-bags",
  "locale": "en",
  "title": "Custom Paper Bags | 100 MOQ, Free Dieline Design | Kraft & Foil Gift Bag Printing | ZprintPro",
  "metaDescription": "Custom paper bags from 100 pcs: kraft from US$0.19, white card from US$0.23, foil gift bags US$0.45. Free dieline design, 3-5 day production, DHL worldwide.",
  "quickAnswers": [
    {
      "q": "How much do custom paper bags cost per piece?",
      "a": "Kraft paper bags start at US$0.19 each (200gsm, offset runs of 1,000+), white card bags from US$0.23 each (digital printing from 100 pcs), and pearl foil gift bags from US$0.45 each. Orders of 5,000+ pcs unlock 15-25% tier discounts."
    },
    {
      "q": "What is the minimum order and turnaround for printed paper bags?",
      "a": "MOQ is 100 pcs for digital printing; 1,000+ pcs is recommended for offset pricing. Digital production takes 3-5 days, offset 5-7 days, rush 2-3 days, with DHL Express delivery worldwide in 2-4 days."
    },
    {
      "q": "What sizes and materials are available for paper bags?",
      "a": "20+ materials including 200gsm kraft, 250gsm white card, 300gsm black card, pearl and eco recycled paper. Standard sizes run from small 200×250×80 mm to extra large 450×550×150 mm, and fully custom dimensions are welcome."
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "Orders delivered worldwide"
    },
    {
      "stat": "100 pcs",
      "label": "Low minimum for digital printing"
    },
    {
      "stat": "From US$0.19",
      "label": "200gsm kraft bag, offset 1,000+ pcs"
    },
    {
      "stat": "5 handle styles",
      "label": "Twisted rope, ribbon, die-cut, satin, cotton"
    }
  ],
  "comparisonTable": {
    "title": "Printed Paper Bag Options Compared",
    "columns": [
      "Criteria",
      "Traditional Printer",
      "Online Self-Service",
      "ZprintPro Custom Paper Bags"
    ],
    "rows": [
      [
        "Minimum Order",
        "500 - 1,000 pcs",
        "200 - 500 pcs",
        "100 pcs digital, 1,000+ offset"
      ],
      [
        "Entry Price",
        "Quote-based, plate fees common",
        "Fixed sizes only",
        "Kraft from US$0.19, white card from US$0.23"
      ],
      [
        "Lead Time",
        "15 - 30 working days",
        "7 - 20 working days",
        "3-5 days digital, rush 2-3 days"
      ],
      [
        "Design Support",
        "Paid dieline and design fees",
        "Templates only",
        "Free dieline design + free sample confirmation"
      ]
    ],
    "note": "Comparison based on standard kraft and white card shopping bags in common sizes. Final pricing varies by quantity, paper weight, handle, and finishing options."
  },
  "orderFlow": {
    "title": "Custom Paper Bag Ordering in 6 Steps",
    "steps": [
      {
        "title": "Instant AI Quote",
        "desc": "Send bag size, quantity and material — priced in 30 seconds"
      },
      {
        "title": "Free Dieline Design",
        "desc": "Our designers prep the dieline; AI/PDF files checked at 300dpi, CMYK, 3mm bleed"
      },
      {
        "title": "Free Sample Confirmation",
        "desc": "Approve a sample to verify color, paper and handle before mass production"
      },
      {
        "title": "Bulk Production",
        "desc": "3-5 days digital or 5-7 days offset with full QC checkpoints"
      },
      {
        "title": "Pre-Shipment Inspection",
        "desc": "Random print and load-capacity checks before dispatch"
      },
      {
        "title": "DHL Express Delivery",
        "desc": "2-4 days to the US, UK, AU and worldwide; orders over $99 ship free"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get a Quote",
      "message": "Hi, I'd like a quote for [bag type: kraft / white card / pearl] [size: W x H x D mm] [quantity: pcs] with [handle: twisted rope / ribbon / die-cut]. Please share pricing and lead time, thanks!"
    },
    {
      "label": "Rush Order",
      "message": "Hi, I need printed paper bags for [event date: ____]. Quantity [pcs], size [mm], handle [type]. What is the fastest turnaround and any rush fee, thanks!"
    },
    {
      "label": "Repeat Order",
      "message": "Hi, I'd like to reorder our previous [bag type] in [size: mm] x [quantity: pcs], same artwork and handle as last time. Please confirm pricing and the earliest ship date, thanks!"
    }
  ],
  "newFaqs": [
    {
      "q": "What are the paper bag print file requirements?",
      "a": "Send AI or PDF artwork with dieline design at 300dpi in CMYK, reserving 3mm bleed and glue area. No dieline yet? Our designers provide free dieline design and prepress checks before printing."
    },
    {
      "q": "Which paper material is most cost-effective for kraft paper bags?",
      "a": "200gsm kraft is the most economical at US$0.19/pc for offset runs of 1,000+ — ideal for coffee shops, eco brands and handmade goods. White card (250gsm) at US$0.23/pc suits fashion and beauty retail, while pearl paper with foil stamping (US$0.45/pc) is the wedding favor upgrade."
    },
    {
      "q": "How much weight can custom paper bags hold?",
      "a": "Standard bags carry 3-5kg; reinforced builds with bottom board hold 8-10kg, suitable for bottles and glassware. Load testing is recommended for heavy retail products before large runs."
    },
    {
      "q": "Can you ship printed paper bags internationally?",
      "a": "Yes. DHL Express and FedEx deliver in 2-4 business days to the US, UK, Australia and worldwide. Orders over $99 ship free, and split shipments to multiple store locations are available on request."
    }
  ]
};

categoryConversionBlocks['flyers:en'] = {
  "category": "flyers",
  "locale": "en",
  "title": "Flyer Printing | Custom Leaflets A4/A5/A6/DL From 100 Pcs, Same-Day Rush | ZprintPro",
  "metaDescription": "Flyer & leaflet printing from 100 pcs. A5 single-sided from US$0.045 each, double-sided US$0.06, offset from US$0.03. Same-day rush and DHL worldwide delivery.",
  "quickAnswers": [
    {
      "q": "How much does flyer printing cost?",
      "a": "It depends on size, paper and quantity. A5 single-sided on 128gsm coated paper starts at US$0.045 each, double-sided from US$0.06, and offset runs of 1,000+ pcs drop to as low as US$0.03 per piece. Final pricing is quote-based."
    },
    {
      "q": "What flyer sizes are available?",
      "a": "Six standard formats: A6 (105x148mm), A5 (148x210mm), A4 (210x297mm), A3 (297x420mm), DL (99x210mm) and folded leaflets. Fully custom sizes are also available on request."
    },
    {
      "q": "How fast can I get my flyers?",
      "a": "Digital orders of 100-500 pcs can be printed same day, while standard offset turnaround is 2-3 business days. Same-day rush is available for a +50% fee, and DHL delivers worldwide in 2-4 days."
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "Orders delivered worldwide - restaurants, retail and brands"
    },
    {
      "stat": "100 pcs",
      "label": "Low minimum order, ideal for test campaigns"
    },
    {
      "stat": "2-3 days",
      "label": "Standard turnaround with same-day rush available"
    },
    {
      "stat": "6 formats",
      "label": "A6 to A3, DL and folded leaflets in one place"
    }
  ],
  "comparisonTable": {
    "title": "Flyer Types x Paper & Finish x Use Case x MOQ",
    "columns": [
      "Flyer Type",
      "Paper & Finish",
      "Best Use Case",
      "Minimum Order"
    ],
    "rows": [
      [
        "A5 flyer (148x210mm)",
        "128gsm-157gsm art paper, gloss or matte lamination",
        "Street handouts, grand openings, mailbox drops",
        "From 100 pcs"
      ],
      [
        "A4 flyer (210x297mm)",
        "157gsm-200gsm art paper, optional spot UV",
        "Takeaway menus, product catalogs, main event flyer",
        "From 100 pcs"
      ],
      [
        "A6 flyer (105x148mm)",
        "128gsm-157gsm coated paper",
        "Coupons, gift cards, counter drop cards",
        "From 100 pcs"
      ],
      [
        "Folded leaflet (half-fold / tri-fold)",
        "200gsm-250gsm card, matte lamination",
        "Price lists, product intros, event programs",
        "From 100 pcs"
      ]
    ],
    "note": "Paper and finishing can be combined freely. Final pricing and lead time are confirmed by quote."
  },
  "orderFlow": {
    "title": "6-Step Flyer Ordering Flow",
    "steps": [
      {
        "title": "Send Your Specs",
        "desc": "Share size, quantity, paper and deadline on WhatsApp"
      },
      {
        "title": "Quote Confirmation",
        "desc": "We reply promptly with pricing and lead time"
      },
      {
        "title": "Upload Artwork",
        "desc": "AI / PDF / InDesign files accepted, or ask for design help"
      },
      {
        "title": "Proof Sign-Off",
        "desc": "Review content and colors before anything goes to press"
      },
      {
        "title": "Arrange Payment",
        "desc": "Production starts as soon as payment is confirmed"
      },
      {
        "title": "Delivery",
        "desc": "DHL / FedEx worldwide in 2-4 business days"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get a Quote",
      "message": "Hi, I'd like a quote for [size: A5] flyers, around [quantity: 1000] pcs, on [paper: 157gsm art paper with matte lamination]. Please share pricing and lead time, thanks!"
    },
    {
      "label": "Rush Order Inquiry",
      "message": "Hi, I need [size: A4] flyers for an [occasion: grand opening] - [quantity: 500] pcs. What's the fastest turnaround and the rush fee? Thanks!"
    },
    {
      "label": "Repeat Order",
      "message": "Hi, I printed flyers with you before and would like to reorder [size: A5], [quantity: 2000] pcs, same design as last time. Please confirm the quote, thanks!"
    }
  ],
  "newFaqs": [
    {
      "q": "What's the minimum order for flyer printing?",
      "a": "100 pcs with digital printing - great for small campaigns and targeted distribution. For 1,000 pcs and up, offset printing brings the unit price down to as low as US$0.03 per piece."
    },
    {
      "q": "Can flyers be printed double-sided or folded?",
      "a": "Yes. Double-sided flyers double your information capacity, and folding options include half-fold, tri-fold, Z-fold and gate-fold. Finishes like gloss or matte lamination, spot UV and foil stamping are also available."
    },
    {
      "q": "I don't have a design file - can you design the flyer for me?",
      "a": "Yes. Start from 50+ free industry flyer templates, or share your text and images for custom design help. Design fees depend on complexity, so tell us your needs and we'll quote first."
    },
    {
      "q": "Do you ship flyers internationally?",
      "a": "Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days, and bulk quantities can be arranged for warehouse or office delivery."
    }
  ]
};

categoryConversionBlocks['calendars:en'] = {
  "category": "calendars",
  "locale": "en",
  "title": "Custom Calendar Printing | 2027 Wall & Desk Calendars from 50 pcs｜ZprintPro",
  "metaDescription": "Custom calendar printing from 50 pcs: desk, wall, card & planner formats, foil stamping, 3-5 day digital turnaround, DHL worldwide. 2027 pre-orders open.",
  "quickAnswers": [
    {
      "q": "How much does custom calendar printing cost?",
      "a": "Desk, wall, and card calendars start at US$3.60 per piece for 100-copy orders, and 500+ offset runs bring the unit price down further. Final pricing is quote-based - it varies with size, paper, and finishing such as foil stamping - and a free quote is one WhatsApp message away."
    },
    {
      "q": "How long does calendar printing take, and when should I order 2027 calendars?",
      "a": "Standard turnaround is 3-5 days for digital printing and 5-7 days for offset, plus 2-4 business days worldwide via DHL Express / FedEx. For 2027 corporate calendars, order 2-3 months ahead: the August-October ordering window feeds September-December delivery, ahead of the November-December factory rush."
    },
    {
      "q": "What types of custom calendars can I print?",
      "a": "Desk calendars (easel), wall calendars in A3/A2, postcard-size calendar cards, planner calendars, and magnetic fridge calendars. Standard sizes run from 150×180mm desk formats up to 420×594mm A2 wall versions - all fully customizable in paper, binding, and finish."
    }
  ],
  "socialProof": [
    {
      "stat": "4820+",
      "label": "Orders delivered to global B2B and corporate buyers"
    },
    {
      "stat": "50 pcs",
      "label": "Digital printing minimum for low-risk 2027 test runs"
    },
    {
      "stat": "3-5 days",
      "label": "Standard digital turnaround before the peak-season crunch"
    },
    {
      "stat": "365 days",
      "label": "Of desk-and-wall brand exposure, no renewal fees"
    }
  ],
  "comparisonTable": {
    "title": "Custom Calendar Types Compared: Format × Finish × Use Case × MOQ",
    "columns": [
      "Calendar Type",
      "Binding & Finish",
      "Typical Use Case",
      "MOQ"
    ],
    "rows": [
      [
        "Desk Calendar (Easel) - 150×180 / 200×230mm",
        "Foil-stamped year, spot UV, metal ring binding, 2mm thickened base",
        "Office desks, reception counters, corporate gifts",
        "From 50 pcs (digital)"
      ],
      [
        "Wall Calendar - A3 (297×420mm) / A2 (420×594mm)",
        "Hole punch & hanging string, waterproof lamination, foil accents",
        "Homes, offices, schools, restaurants",
        "From 50 pcs (digital)"
      ],
      [
        "Calendar Card - 100×150mm postcard size",
        "Double-sided color printing, lamination",
        "Mail giveaways, event handouts, trade shows, promos",
        "From 50 pcs (digital)"
      ],
      [
        "Planner Calendar",
        "Ring binding, variable data printing (unique names or branch info per copy)",
        "Employee benefits, client gifts, school souvenirs, VIP gifts",
        "From 50 pcs (digital)"
      ]
    ],
    "note": "Magnetic fridge calendars are also available. Paper: 200g-300gsm art or matte stock with 1-2mm greyboard bases. Offset runs at 500+ pcs are more economical for corporate bulk; foil and specialty finishes are quote-based via WhatsApp."
  },
  "orderFlow": {
    "title": "Custom Calendar Printing: 6-Step Ordering Flow",
    "steps": [
      {
        "title": "WhatsApp Inquiry",
        "desc": "Share calendar type (desk / wall / card / planner), quantity, size, and budget"
      },
      {
        "title": "Quote & Print Method",
        "desc": "Digital or offset options side by side, with lead times and finishing costs spelled out"
      },
      {
        "title": "Design & Templates",
        "desc": "Free 12-month templates with holiday markings - your logo and product photos are enough to start"
      },
      {
        "title": "Proof Approval",
        "desc": "Verify colors, paper, and monthly page layouts before production begins"
      },
      {
        "title": "Order Confirmation",
        "desc": "Lock quantities and specs; 2027 early-bird pre-orders secure discount pricing before the rush"
      },
      {
        "title": "Production & Delivery",
        "desc": "Digital in 3-5 days or offset in 5-7, then 2-4 business days worldwide via DHL / FedEx"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get a Quote",
      "message": "Hi, I'd like a quote for [calendar type: desk / wall / card] calendars, size [____ mm], quantity [____ pcs], with [finishing: foil / spot UV / none]. Please share pricing and lead time, thanks!"
    },
    {
      "label": "2027 Corporate Pre-Order",
      "message": "Hi, we're planning [2027 corporate gift calendars], type [desk / wall / planner], quantity [____ pcs], delivery by [month: ____]. How do we apply the early-bird discount and free design, thanks!"
    },
    {
      "label": "Rush / Peak-Season Order",
      "message": "Hi, I need [____ pcs] [calendar type] calendars delivered before [____]. What's the shortest turnaround, and is rush production available, thanks!"
    }
  ],
  "newFaqs": [
    {
      "q": "When should I order 2027 calendars?",
      "a": "Work backward from your distribution date and order 2-3 months before calendars need to be in hand. The seasonal rhythm runs August-October ordering into September-December delivery, with September-November concentrating roughly 60% of annual calendar demand. Ordering before the November-December peak helps lock factory schedules and paper pricing, and 2027 pre-orders placed in the early-bird window also earn 10% off with free design support."
    },
    {
      "q": "How do I keep custom calendar costs down?",
      "a": "Three practical levers: move to offset printing at 500+ copies where unit prices drop, favor compact formats such as calendar cards or desk easels over full A2 wall spreads, and order inside the 2027 early-bird window for 10% off plus free design. Foil stamping, spot UV, and variable-data personalization are quoted as add-ons."
    },
    {
      "q": "I don't have print-ready artwork - can you still produce my calendar?",
      "a": "Yes. Start from our free 12-month templates with holiday markings - your logo and product photos are enough for our team to lay out every monthly page. Corporate orders can integrate brand colors and product imagery with designer support. Camera-ready files follow AI / PDF / InDesign, 300dpi, CMYK, with 3mm bleed."
    },
    {
      "q": "Do you ship custom calendars internationally?",
      "a": "Yes - DHL Express and FedEx deliver worldwide in 2-4 business days, and bulk corporate orders can be arranged for warehouse or office delivery. Peak-season production slots fill quickly between September and November, so confirm quantities and delivery dates early."
    }
  ]
};


// === W2 wave2 内容包注入 (2026-09-05) ===

categoryConversionBlocks['flyers:ja'] = {
  "category": "flyers",
  "locale": "ja",
  "title": "チラシ印刷 | フライヤー印刷・チラシ作成 | A6〜A3 100枚から 即日特急対応｜ZprintPro",
  "metaDescription": "チラシ印刷は100枚から小ロット対応。A5片面128gコート紙が1枚¥6〜、両面は¥8〜。A6〜A3・DL・三つ折りに対応し、両面印刷・スポットUV・箔押しも選べます。デジタル100〜500枚は即日納品可、オフセットは2-3営業日。AI即時見積もり30秒、DHL／FedExで東京・大阪など日本全国へ2-4日配送。",
  "quickAnswers": [
    {
      "q": "チラシ印刷は1枚いくらからですか？",
      "a": "A5片面128gコート紙で1枚¥6〜、両面は1枚¥8〜（両面は+¥1.5／枚）です。枚数が増えるほど単価が下がり、1,000枚以上はオフセット印刷がお得。最終価格はサイズ・紙・数量により変わるため、まずはお見積もりをどうぞ。"
    },
    {
      "q": "チラシの最小発注数（MOQ）は何枚からですか？",
      "a": "デジタル印刷は100枚から承ります。新店開業やイベントの試し配布にも十分な枚数です。1,000枚以上はオフセット印刷に切り替えると単価を抑えられ、大口配布に向いています。"
    },
    {
      "q": "チラシはどのくらい早く受け取れますか？",
      "a": "デジタル印刷は100〜500枚で即日納品が可能です。オフセット印刷は標準2-3営業日で仕上がります。お急ぎの場合は特急対応（+50%料金）もございますので、まずはご相談ください。"
    }
  ],
  "socialProof": [
    {
      "stat": "¥6〜",
      "label": "A5片面128gコート紙の1枚あたり目安価格"
    },
    {
      "stat": "100枚〜",
      "label": "デジタル印刷の最小ロット。新店開業・イベント配布にも"
    },
    {
      "stat": "即日対応",
      "label": "デジタル印刷100〜500枚。特急は+50%料金"
    },
    {
      "stat": "+22%",
      "label": "2026年上半期のチラシ問い合わせ伸び率"
    }
  ],
  "comparisonTable": {
    "title": "チラシの種類 × 紙・加工 × シーン別 比較表",
    "columns": [
      "チラシ種類",
      "紙・加工",
      "おすすめシーン",
      "最小ロット"
    ],
    "rows": [
      [
        "A4チラシ（210×297mm）",
        "128g／157gコート紙、マット／グロスラミネート可",
        "製品紹介・企業案内・イベントのメインチラシ",
        "100枚〜"
      ],
      [
        "A5チラシ（148×210mm）",
        "128gコート紙が定番（片面1枚¥6〜）",
        "店舗配布・ポスト投函・開業PR",
        "100枚〜"
      ],
      [
        "A6・DLチラシ（105×148／99×210mm）",
        "128g／157gコート紙、ナンバリング可",
        "クーポン・街頭配布など小サイズの大量配布",
        "100枚〜"
      ],
      [
        "折りチラシ（三つ折り・対折・Z折り）",
        "200gマット紙／250gカード、スポットUV・箔押し",
        "メニュー・製品カタログ・案内冊子",
        "100枚〜"
      ]
    ],
    "note": "サイズ・紙・加工は自由に組み合わせ可能。1,000枚以上はオフセット印刷がお得です。最終価格・納期はお見積もり制です。"
  },
  "orderFlow": {
    "title": "チラシ印刷 6ステップ",
    "steps": [
      {
        "title": "お問い合わせ",
        "desc": "WhatsAppでサイズ・数量・片面／両面・紙のご要望をお知らせください"
      },
      {
        "title": "AI即時見積もり",
        "desc": "30秒で概算価格と納期をご提示します"
      },
      {
        "title": "デザイン入稿",
        "desc": "AI／PDFデータの入稿、または50種類以上の無料業界テンプレートをご利用いただけます"
      },
      {
        "title": "サンプル確認",
        "desc": "無料サンプルで色・紙質・折りの仕上がりをチェック（サンプル当日対応）"
      },
      {
        "title": "製造・品質検査",
        "desc": "デジタル即日／オフセット2-3営業日で製造し、出荷前に検品します"
      },
      {
        "title": "配送・納品",
        "desc": "DHL／FedExで東京・大阪・名古屋など日本全国へ2-4日で到着します"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "見積もり依頼",
      "message": "チラシ印刷の見積もりをお願いします。サイズ【A5 148×210mm】／片面・両面【両面】／数量【1,000枚】／紙【128gコート紙】。1枚あたりの単価と納期を教えてください。"
    },
    {
      "label": "納期・特急相談",
      "message": "【開業イベント】でチラシが急ぎです。サイズ【A6 105×148mm】／数量【300枚】。即日対応が可能か、特急料金とあわせて教えてください。"
    },
    {
      "label": "折りチラシ相談",
      "message": "【三つ折り】のメニューチラシを検討しています。紙【200gマット】／数量【500枚】。折り加工込みの見積もりと納期をお願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "チラシの入稿ファイルはどの形式に対応していますか？",
      "a": "AI／PDF／InDesign、300dpi、CMYKカラー、3mmの塗り足し（bleed）をご用意ください。入稿前に印刷チームが解像度と裁ち落とし線をチェックします。"
    },
    {
      "q": "三つ折りや対折などの折り加工は可能ですか？",
      "a": "はい。対折・三つ折り・Z折りなど多様な折り加工に対応しています。折りチラシは情報量が3〜5倍に増え、メニューや製品カタログで人気の形式です。"
    },
    {
      "q": "シリアル番号やQRコードの印刷はできますか？",
      "a": "はい。可変データ印刷で1枚ずつ異なるシリアル番号・バーコード・QRコードの印字が可能です。抽選券やクーポン、イベント入場券にご活用いただけます。"
    },
    {
      "q": "東京や大阪など日本全国への配送はできますか？",
      "a": "はい。DHL／FedExで日本全国へ2-4日でお届けします。大口注文は倉庫やオフィスへの直接納品も調整可能です。まずはお見積もりをご依頼ください。"
    }
  ]
};

categoryConversionBlocks['menus:zh-hk'] = {
  "category": "menus",
  "locale": "zh-hk",
  "title": "餐牌印刷 | 香港菜單印刷 | PVC膠片/過膠/精裝餐牌·酒水牌 防水防油 100張起｜智印港",
  "metaDescription": "香港餐牌印刷訂製：PVC膠片餐牌、過膠餐牌、精裝菜單、酒水牌、一次性餐牌五類齊全，防水防油易清潔。一次性HK$0.22起/張、過膠HK$5起/張、精裝HK$28起/本，100張起訂，標準2-3個工作天交貨，急單可傾。WhatsApp免費報價，茶餐廳、酒樓、咖啡店、外賣店都啱用，菜單印刷支持中英雙語對照排版。",
  "quickAnswers": [
    {
      "q": "餐牌印刷幾多錢？",
      "a": "視乎材質同數量：一次性餐牌 HK$0.22 起/張、過膠餐牌 HK$5 起/張、PVC 膠片餐牌 HK$8 起/張、酒水牌 HK$12 起/張、精裝餐牌 HK$28 起/本，全部 100 張起訂，實際價錢以報價為準。"
    },
    {
      "q": "咩餐牌先至防水耐用？",
      "a": "PVC 膠片餐牌（0.5–1.0mm）同過膠餐牌都防水防油，湯汁油漬用濕布一抹就淨，啱茶餐廳、火鍋店呢類多油煙場景；想檔次高啲可以揀精裝餐牌配硬殼封面。"
    },
    {
      "q": "茶餐廳趕住開業換餐牌，最快幾耐有貨？",
      "a": "標準柯式印刷 2–3 個工作天交貨，打樣當日完成對色；開業或急單記得 WhatsApp 講明死線，我哋有急件專線幫你排期，盡量配合開張日子。"
    }
  ],
  "socialProof": [
    {
      "stat": "HK$0.22起",
      "label": "一次性餐牌低至幾毫一張，外賣店日日換都唔肉赤"
    },
    {
      "stat": "100張起",
      "label": "小批量都接，新開餐廳試菜單冇壓力"
    },
    {
      "stat": "2-3日",
      "label": "標準柯式交貨，打樣當日對色，開業唔使齋等"
    },
    {
      "stat": "五類任揀",
      "label": "PVC膠片、過膠、精裝、酒水牌、一次性餐牌一條龍搞掂"
    }
  ],
  "comparisonTable": {
    "title": "香港餐牌印刷類型 × 材質工藝 × 適用場景比較",
    "columns": [
      "餐牌類型",
      "材質/工藝",
      "適用場景",
      "起訂量"
    ],
    "rows": [
      [
        "PVC膠片餐牌（防水款）",
        "0.5–1.0mm 透明或白色 PVC，四色UV印刷，圓角或直角裁切",
        "茶餐廳、火鍋店、酒吧、居酒屋",
        "100 張起"
      ],
      [
        "過膠餐牌（經濟款）",
        "200–250g 銅版紙或啞粉紙，啞膠/光膠覆膜",
        "咖啡店、甜品店、西餐廳",
        "100 張起"
      ],
      [
        "精裝餐牌（高級款）",
        "硬紙板封面裱糊銅版紙，內頁 200g 銅版紙",
        "酒樓、高級餐廳、酒店宴會",
        "100 本起"
      ],
      [
        "一次性餐牌（外賣款）",
        "100–120g 書紙或再生紙",
        "外賣店、優惠宣傳、季節限定菜單",
        "100 張起"
      ]
    ],
    "note": "仲有酒水牌（HK$12 起/張，銅版紙或合成紙過啞膠）可以加配；燙金、打洞穿繩、QR Code 電子菜單等加工都做得，價錢同交期以 WhatsApp 報價為準。"
  },
  "orderFlow": {
    "title": "6 步餐牌訂製流程",
    "steps": [
      {
        "title": "WhatsApp 諮詢",
        "desc": "傳店名、菜式數量、尺寸（A4/A5）同想要的材質"
      },
      {
        "title": "免費報價",
        "desc": "列明單價、起訂量同交期，急單先講明死線"
      },
      {
        "title": "設計排版",
        "desc": "提供菜價相片或現成設計檔，免費幫你執靚個版"
      },
      {
        "title": "打樣對色",
        "desc": "打樣當日完成，顏色尺寸核對冇問題先開印"
      },
      {
        "title": "落單付款",
        "desc": "轉數快或銀行轉賬，確認後即刻開工"
      },
      {
        "title": "交貨收貨",
        "desc": "標準 2–3 個工作天，順豐送到全港各區"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "報價查詢",
      "message": "你好，我想印【A4過膠餐牌】，菜式大約【60】款，數量【200】張，需要【中英對照】，麻煩報價同交期，多謝！"
    },
    {
      "label": "急單詢問",
      "message": "你好，我哋【茶餐廳】【下星期開業】趕住用餐牌，想要【PVC防水款】，數量【100】張，想問最快幾日交到同急單安排，謝謝！"
    },
    {
      "label": "換季菜單",
      "message": "你好，之前喺你哋度印過【過膠餐牌】，今次想更新【季節菜式同價錢】，數量【100】張，設計跟返上一次版面，麻煩報價，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "餐牌真係防水嗎？油漬湯汁抹得走嗎？",
      "a": "PVC 膠片餐牌（0.5–1.0mm）同過膠餐牌都達到防水防油效果，湯汁、油漬用濕布一抹就淨；PVC 款成塊係膠，可以直接擦拭清潔，茶餐廳、火鍋店呢類多油煙場景用最穩陣。"
    },
    {
      "q": "過膠餐牌同 PVC 餐牌，邊款耐用啲？",
      "a": "兩款都防水，但耐用度唔同：PVC 膠片餐牌成塊係膠，係最襟用嘅一款，長期翻枱都冇咁易殘；過膠餐牌係紙過啞膠或光膠，成本低啲、手感貼近紙本，啱諗住成季換一次菜單嘅店。實際揀邊款，WhatsApp 講低你嘅翻枱情況我哋幫你配。"
    },
    {
      "q": "茶餐廳趕住開業，餐牌最快幾耐交到？",
      "a": "標準柯式印刷 2–3 個工作天，打樣當日完成對色；趕開業記得 WhatsApp 講明死線，我哋有急件專線幫你排期。建議開張旺季提早兩星期落單，預留執相同改稿時間。"
    },
    {
      "q": "餐牌可以加 QR Code 電子菜單或者中英對照嗎？",
      "a": "可以。可以幫你生成 QR Code 連電子菜單，晚市繁忙時間客人自己掃碼睇餸；排版支持中英文、中日文對照，連鎖分店仲可以每間印唔同價錢。"
    }
  ]
};
categoryConversionBlocks['educational:zh-hk'] = {
  "category": "educational",
  "locale": "zh-hk",
  "title": "香港證書印刷・校簿印刷・畢業紀念冊訂製 — 教育印刷服務｜智印港",
  "metaDescription": "香港證書印刷 HK$8-40/張，200g-250g 水印紙或棉質紙，燙金壓凹防偽底紋都做到；校簿印刷 HK$4-16/本，A4/A5 內頁橫線方格空白任揀；畢業紀念冊 HK$45-180/本，騎馬釘膠裝精裝三種裝訂，50 本起訂。證書 100 張起，WhatsApp 想訂幾多張都傾得掂，即刻報價。",
  "quickAnswers": [
    {
      "q": "證書印刷幾多錢一張？",
      "a": "證書 HK$8-40 一張，視乎紙材、尺寸（A4 或 A3）同工藝：燙金、壓凹、防偽底紋、浮水印都可以加。常用 200g-250g 水印紙或棉質紙，100 張起訂，確實價錢 WhatsApp 報價。"
    },
    {
      "q": "證書紙有咩材質？點揀先啱？",
      "a": "常見係 200g-250g 水印紙同棉質紙。水印紙本身帶浮水印，加埋防偽底紋就穩陣，機構認證、畢業證書都用得；棉質紙手感厚實，寫獎狀、榮譽證書企理啲。唔知點揀就話我哋知用途，幫你配。"
    },
    {
      "q": "校簿印刷起訂量要幾多本？",
      "a": "練習簿 100 本起訂，小批量數碼、大量柯式，補習社同學校細單都接得。A4/A5 內頁可揀橫線、方格或空白，封面 200g 銅版紙四色，HK$4-16/本，開學前兩個星期係高峰期，記得早啲落單。"
    }
  ],
  "socialProof": [
    {
      "stat": "100張起",
      "label": "證書小批量都接，畢業禮同培訓班都印得起"
    },
    {
      "stat": "50本起",
      "label": "畢業紀念冊 50 本開班，班級同校友會都訂得逢"
    },
    {
      "stat": "48小時",
      "label": "畢業紀念冊香港本地交付，個別規格以報價為準"
    },
    {
      "stat": "免費排版",
      "label": "校簿頁碼、章節同習題欄位幫你排好，唔使自己搞"
    }
  ],
  "comparisonTable": {
    "title": "香港教育印刷：證書 × 校簿 × 紀念冊 × 教科書 比較",
    "columns": [
      "產品",
      "常用工藝",
      "適用場景",
      "起訂量"
    ],
    "rows": [
      [
        "證書（A4/A3）",
        "四色印刷＋燙金、壓凹、防偽底紋、浮水印",
        "畢業證書、獎狀、校友會證書、培訓證書",
        "100 張起"
      ],
      [
        "校簿／練習簿（A4/A5）",
        "封面四色＋內頁單色或雙色，騎馬釘，封面覆膜可選",
        "K12 練習簿、補習社教材、學年作業本",
        "100 本起"
      ],
      [
        "畢業紀念冊",
        "騎馬釘／膠裝／精裝三種裝訂，班級照片師長題詞全頁",
        "中學大學畢業紀念冊、校史特刊、校友會刊",
        "50 本起"
      ],
      [
        "教科書／年級教材",
        "免費排版（頁碼、章節、習題欄），騎馬釘或膠裝",
        "學校自編教科書、年級作業本、導師講義",
        "100 本起"
      ]
    ],
    "note": "紙材、釘裝同工藝可以自由搭配，最終價錢交期以 WhatsApp 報價為準。"
  },
  "orderFlow": {
    "title": "6 步教育印刷流程",
    "steps": [
      {
        "title": "WhatsApp 諮詢",
        "desc": "話我哋知係證書、校簿定紀念冊，講低數量同大日子"
      },
      {
        "title": "報價確認",
        "desc": "按紙材、工藝同數量出價，列明工期同費用"
      },
      {
        "title": "設計定稿",
        "desc": "提供檔案，或者免費幫你排版頁碼章節習題欄"
      },
      {
        "title": "打樣確認",
        "desc": "核對紙材、顏色同釘裝，冇問題先開機"
      },
      {
        "title": "落單付款",
        "desc": "銀行轉賬或轉數快，確認後即刻開工"
      },
      {
        "title": "交貨收貨",
        "desc": "香港本地交付，開學季畢業季記得預鬆少少時間"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "證書報價查詢",
      "message": "你好，我想印【畢業證書】，紙材想用【水印紙】，尺寸【A4】，數量【100】張，封面要【燙金＋防偽底紋】，麻煩報價同交期，多謝！"
    },
    {
      "label": "校簿開學季查詢",
      "message": "你好，我哋係【補習社】，想訂【A4 練習簿】，內頁【方格】，數量【200】本，開學前要到貨，想問下最快幾日有貨同報價，謝謝！"
    },
    {
      "label": "畢業紀念冊查詢",
      "message": "你好，我想訂造【中學畢業紀念冊】，裝訂想揀【膠裝】，數量【50】本，會有班級照片同師長題詞，想了解設計流程同報價，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "證書紙係咩材質？邊種防偽效果好啲？",
      "a": "證書常用 200g-250g 水印紙或棉質紙。水印紙造紙時已帶浮水印，再加防偽底紋，臨摹難度高啲，機構認證同畢業證書都適用；棉質紙厚實企理，適合獎狀同榮譽證書。A4/A3 都得，想睇實物可以 WhatsApp 話我哋知。"
    },
    {
      "q": "畢業紀念冊應該幾時落單？",
      "a": "建議畢業禮之前早啲開始傾，因為要預位收集相片、排版、打樣先至開印。校簿方面，開學前兩個星期係高峰期，想檔期鬆動啲就避開呢段時間提早落單。你話我哋知幾時要用，我哋幫你倒後排期。"
    },
    {
      "q": "校簿同教科書可以幫手排版嗎？",
      "a": "可以，免費排版：頁碼、章節同習題欄位都幫你排好。內頁有橫線、方格、空白三種可揀，封面 200g 銅版紙四色印刷，騎馬釘或膠裝，封面覆膜都加到。"
    },
    {
      "q": "證書印刷起訂量係幾多？工藝有咩揀？",
      "a": "證書 100 張起訂，小批量數碼、大量柯式。工藝方面燙金、壓凹、防偽底紋、浮水印都做到，畢業證書、獎狀、校友會證書、培訓證書都啱用，確實價錢按規格報價。"
    }
  ]
};

categoryConversionBlocks['educational:en'] = {
  "category": "educational",
  "locale": "en",
  "title": "Exercise Book Printing & Custom School Workbooks｜ZprintPro",
  "metaDescription": "Custom printed exercise books & educational workbook printing from US$1.84. 100-book MOQ, free typesetting, DHL 2-4 day delivery. 30-second quote for schools.",
  "quickAnswers": [
    {
      "q": "How much does school exercise book printing cost?",
      "a": "Exercise books start at US$1.84 each, certificates at US$2.76, textbooks at US$9.20 and graduation yearbooks at US$10.35. Final cost depends on page count, paper, size and quantity, so request a quote for exact pricing."
    },
    {
      "q": "What is the MOQ for custom printed exercise books?",
      "a": "100 books for exercise books and perfect-bound textbooks, 50 for hardcover textbooks and yearbooks, and 250 for saddle-stitch booklets. Small runs print digitally, while offset presses handle larger volume orders."
    },
    {
      "q": "How long does a school printing order take from quote to delivery?",
      "a": "Production time is quoted per order based on page count and binding. After dispatch, DHL Express delivers worldwide in 2-4 days, and Hong Kong schools receive local delivery within 48 hours. Order early — the two weeks before term starts are the busiest."
    }
  ],
  "socialProof": [
    {
      "stat": "100 books",
      "label": "Exercise book MOQ, vs 500+ minimums common on trade platforms"
    },
    {
      "stat": "From US$1.84",
      "label": "Per-book entry price for K12 exercise books"
    },
    {
      "stat": "2-4 days",
      "label": "DHL Express delivery to Africa, the Middle East & Southeast Asia"
    },
    {
      "stat": "G7 Master",
      "label": "Certified press color control with FSC-certified paper options"
    }
  ],
  "comparisonTable": {
    "title": "Educational Printing Product Comparison",
    "columns": [
      "Product",
      "Finishing & Binding",
      "Typical Use Case",
      "MOQ"
    ],
    "rows": [
      [
        "Exercise Books",
        "Saddle stitch or perfect bound; 80-100g woodfree interior; lined, grid or blank pages",
        "K12 workbooks, term exercise books, tutoring-center materials",
        "100 books"
      ],
      [
        "Certificates",
        "200-250g watermark or cotton paper; foil stamping, embossing, anti-counterfeit background pattern",
        "Diplomas, awards, alumni and training certificates",
        "100 pcs"
      ],
      [
        "Textbooks",
        "Perfect bound or saddle stitch; A4 or B5; ISBN and barcode support",
        "Grade-level curricula, training manuals, question banks",
        "100 perfect bound / 50 hardcover"
      ],
      [
        "Yearbooks",
        "Saddle stitch, perfect bound or hardcover; foil-stamped crest, ribbon bookmark, dust jacket",
        "Graduation yearbooks, school anniversary and alumni publications",
        "50 copies"
      ]
    ],
    "note": "Paper and finishing options vary by product. Pricing is quote-based on page count, paper, size and quantity."
  },
  "orderFlow": {
    "title": "School Printing Order Flow — From Spec Sheet to Delivery",
    "steps": [
      {
        "title": "Submit Specs",
        "desc": "Send page count, size, binding and quantity — single titles or multi-title school sets welcome"
      },
      {
        "title": "30-Second AI Quote",
        "desc": "Get instant pricing online, then confirm paper and finishing options"
      },
      {
        "title": "Free Typesetting",
        "desc": "We lay out page numbers, chapter headers and exercise fields; yearbooks include a free design mockup"
      },
      {
        "title": "Proof Sign-Off",
        "desc": "Approve a digital proof or sample before the bulk run begins"
      },
      {
        "title": "Bulk Production",
        "desc": "Digital printing for small batches, offset for volume, with quality checks throughout"
      },
      {
        "title": "DHL Delivery",
        "desc": "2-4 days worldwide via DHL Express; 48-hour delivery for Hong Kong schools"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "Get a Quote",
      "message": "Hi, we're a [school / tutoring center: ____] in [country: ____] and need a quote for [exercise books / textbooks / certificates: ____]. Quantity: [____ pcs], size: [A4 / A5 / B5: ____], page count: [____], binding: [saddle stitch / perfect bound / hardcover: ____]. Please share pricing and lead time, thanks!"
    },
    {
      "label": "Request a Sample",
      "message": "Hi, we'd like to check paper and print quality before placing our school order. Could you send a sample of [product: ____] with [interior paper weight: ____]? Target quantity is [____ pcs], delivery to [country: ____]. Thanks!"
    },
    {
      "label": "Back-to-School Bulk Order",
      "message": "Hi, we're preparing for the [term / school year: ____] and need [product: ____] for [number of students: ____] students. Please advise bulk pricing, payment terms and the latest order date to receive delivery by [date: ____]. Thanks!"
    }
  ],
  "newFaqs": [
    {
      "q": "Do you offer bulk discounts for school-wide or district orders?",
      "a": "Yes. Classroom sets and school-wide orders are priced in quantity tiers, so the per-unit rate drops as volume grows. Share your student count and page specs and we'll quote exercise books, workbooks and certificates together as one combined order."
    },
    {
      "q": "What artwork do you need for custom workbook printing?",
      "a": "Print-ready PDFs work smoothly — CMYK color with fonts embedded and high-resolution images. If you're starting from Word, PowerPoint or Canva files, send them as-is: free typesetting covers page numbers, chapter headers and exercise-field layouts before printing."
    },
    {
      "q": "Which paper should we choose for children's workbooks?",
      "a": "80gsm uncoated woodfree paper is the standard workbook interior — smooth to write on and gentle on the eyes. Covers use 250gsm coated stock for vibrant graphics, and 100% recycled FSC-certified paper is available for eco-friendly programs."
    },
    {
      "q": "Can you deliver school orders internationally?",
      "a": "Yes — orders ship worldwide from our Asia factory via DHL Express in 2-4 days, a route commonly used by education ministries and school groups in Africa, the Middle East and Southeast Asia. Hong Kong schools receive local delivery within 48 hours."
    }
  ]
};

categoryConversionBlocks['educational:ja'] = {
  "category": "educational",
  "locale": "ja",
  "title": "教材 印刷製本｜教科書印刷・教材テキスト印刷・問題集を小ロット100部から製本対応｜ZprintPro",
  "metaDescription": "教材 印刷製本なら小ロット100部から対応。教科書印刷は1冊￥1,288〜、問題集・練習帳は1冊￥258〜。中綴じ・無線綴じ・上製本から選択でき、ISBN・バーコードにも対応します。AI即時見積もり30秒、DHL Expressで日本全国へ2-4日配送。卒業アルバムの上製本や学年内教材もお見積もり制。",
  "quickAnswers": [
    {
      "q": "教材 印刷の最小ロットは何部からですか？",
      "a": "教科書・テキスト・問題集はすべて100部から承ります。問題集・練習帳は1冊￥258〜、教科書は1冊￥1,288〜が目安です。学校や塾の学年内教材など、部数がまとまると単価も下がるため、まずは仕様と部数をお知らせください。最終価格はお見積もり制です。"
    },
    {
      "q": "教科書 印刷のサイズと仕様はどう選べばいいですか？",
      "a": "教科書はA4（210×297mm）またはB5（176×250mm）、問題集・練習帳はA4またはA5（148×210mm）が定番です。表紙はカラー4C＋200gコート紙、内文はモノクロまたは2色。目に優しい80g–100gの上質紙を使い、ISBN・バーコードの掲載にも対応します。"
    },
    {
      "q": "教材 製本の種類は選べますか？",
      "a": "中綴じ・無線綴じから選択でき、表紙のラミネート加工もオプションで可能です。卒業アルバムは上製本に対応し、校章の箔押し・栞紐・ダストジャケットで仕上げます。ページ数・予算・配布シーンに合わせて、教材 印刷 製本の組み合わせをご提案します。"
    }
  ],
  "socialProof": [
    {
      "stat": "100部〜",
      "label": "教科書・テキスト・問題集の小ロット製本対応"
    },
    {
      "stat": "￥258〜",
      "label": "問題集・練習帳の1冊あたり目安価格"
    },
    {
      "stat": "30秒",
      "label": "AI即時見積もりで部数別の概算価格を提示"
    },
    {
      "stat": "2-4日",
      "label": "DHL Expressで日本全国へ配送（製造後）"
    }
  ],
  "comparisonTable": {
    "title": "教材 印刷 製本 早見表（種類 × 製本 × シーン × 最小ロット）",
    "columns": [
      "教材の種類",
      "製本",
      "おすすめシーン",
      "最小ロット"
    ],
    "rows": [
      [
        "教科書（A4／B5）",
        "無線綴じ・中綴じ＋表紙ラミネート（オプション）",
        "K12教科書・補習校教材・学年内教材（ISBN・バーコード対応）",
        "100部〜"
      ],
      [
        "研修テキスト・マニュアル",
        "無線綴じ（内文モノクロ／2色）",
        "企業研修・教室テキスト・教材 テキスト印刷",
        "100部〜"
      ],
      [
        "問題集・練習帳（A4／A5）",
        "中綴じ＋罫線（マス・横罫・無地）から選択",
        "塾・予備校のドリル・家庭学習用問題集",
        "100部〜"
      ],
      [
        "卒業アルバム",
        "上製本＋箔押し・栞紐・ダストジャケット",
        "学校・学級の記念アルバム・周年誌",
        "お見積もり制"
      ]
    ],
    "note": "価格・納期は数量・紙質・ページ数・製本によりお見積もり制です。問題集1冊￥258〜、教科書1冊￥1,288〜が目安価格で、部数が多いほど単価は下がります。"
  },
  "orderFlow": {
    "title": "教材 印刷製本のオーダーフロー 6ステップ",
    "steps": [
      {
        "title": "お問い合わせ",
        "desc": "WhatsAppで教材の種類・サイズ・ページ数・部数・製本方法のご要望をお知らせください"
      },
      {
        "title": "AI即時見積もり",
        "desc": "30秒で概算価格と納期をご提示します"
      },
      {
        "title": "デザイン入稿",
        "desc": "レイアウトデータ（AI／PDF）の入稿、または無料デザインサービスをご利用いただけます（頁番号・章立て・習題欄の組版も対応）"
      },
      {
        "title": "サンプル確認",
        "desc": "色・紙質・製本の仕上がりをチェックしてから量産へ進めます"
      },
      {
        "title": "製造・品質検査",
        "desc": "印刷から綴じ加工まで一貫製造し、出荷前に全数検品のうえ梱包します"
      },
      {
        "title": "配送・納品",
        "desc": "DHL Express／FedExで日本全国へ。全世界2-4日でお届けします"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "見積もり依頼",
      "message": "教材の見積もりをお願いします。【教科書（B5）】／部数【300部】／製本【無線綴じ＋表紙ラミネート】／内文【モノクロ】。1冊の単価と納期を教えてください。"
    },
    {
      "label": "学期納期相談",
      "message": "【開学前】に教材を納品したいです。【問題集（A4・中綴じ）】／部数【500部】。最短納期と特急対応の可否をあわせて教えてください。"
    },
    {
      "label": "卒業アルバム相談",
      "message": "【卒業アルバム】の製作を検討しています。部数【　部】／製本【上製本＋校章の箔押し】。デザインテンプレートの有無とお見積もりをお願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "教材印刷の部数と価格はいくらからですか？",
      "a": "教科書・テキスト・問題集は100部から承ります。問題集・練習帳は1冊￥258〜、教科書は1冊￥1,288〜が目安で、部数が多いほど単価は下がります。最終価格はサイズ・紙質・ページ数・製本方法によりお見積もり制です。"
    },
    {
      "q": "納期はどのくらいかかりますか？",
      "a": "完成後はDHL Expressで全世界2-4日、日本全国へお届けします。製造期間はページ数・製本・部数により変わるため、学期の納品スケジュールに合わせてご相談ください。開学前の2週間は混み合う時期なので、早めのご相談がおすすめです。"
    },
    {
      "q": "教科書印刷でISBNやバーコードは対応できますか？",
      "a": "はい。教科書・テキストではISBN・バーコードの掲載に対応しています。内文は目に優しい80g–100gの上質紙でモノクロまたは2色から選べ、表紙はカラー印刷＋ラミネート加工（オプション）で長く使える仕上がりにします。"
    },
    {
      "q": "卒業アルバムの製本はどんな仕様にできますか？",
      "a": "上製本に対応し、校章の箔押し・栞紐・ダストジャケットで仕上げます。無料のデザインテンプレートをご用意しているほか、学年末の繁忙期には制作サポートも行っています。価格と最小部数は仕様によりお見積もり制です。"
    }
  ]
};

categoryConversionBlocks['japan-doujin:zh-hk'] = {
  "category": "japan-doujin",
  "locale": "zh-hk",
  "title": "同人本印刷｜同人印刷 10 本起印＋Comiket 特急對應｜智印港",
  "metaDescription": "香港同人本印刷／同人印刷推薦：A5/B5 同人誌 10 本起印，封面彩色＋內頁單色，騎馬釘（8-64 頁）／膠裝可選，Comiket 前 24 小時特急對應；仲有亞克力匙扣、罐型襟章、明信片套裝一站式訂製，深圳自營工廠 ISO 12647 色彩管理，DHL 國際速遞出貨，WhatsApp 即時報價。",
  "quickAnswers": [
    {
      "q": "同人本印刷幾多錢？",
      "a": "同人本 10 本起印，價錢視乎開本（A5/B5）、頁數、紙材同裝訂方式，50／100／500 本仲有 5%-15% 量購折扣，WhatsApp 即時報價。"
    },
    {
      "q": "同人印刷起訂量係幾多？",
      "a": "同人本 10 本起印；亞克力匙扣同罐型襟章 10 件起；明信片套裝 4 套起，社團同個人團隊細批量都印得到。"
    },
    {
      "q": "同人本交期要幾耐？",
      "a": "常規 5-7 個工作天生產，Comiket 前有 24 小時特急對應；匙扣、襟章特急 3 個營業日，明信片套裝 3-5 個營業日，之後 DHL Express 速遞出貨。"
    }
  ],
  "socialProof": [
    {
      "stat": "10 本起",
      "label": "同人本起訂量 匙扣襟章 10 件起"
    },
    {
      "stat": "24 小時",
      "label": "Comiket 前特急對應"
    },
    {
      "stat": "3 個營業日",
      "label": "匙扣／襟章特急交期可協調"
    },
    {
      "stat": "ISO 12647",
      "label": "色彩管理＋FSC 認證紙材"
    }
  ],
  "comparisonTable": {
    "title": "同人周邊四大產品線比較",
    "columns": [
      "產品",
      "工藝",
      "適用場景",
      "起訂量"
    ],
    "rows": [
      [
        "同人本",
        "封面柯式四色＋內頁單色，騎馬釘（8-64 頁）／膠裝，A5／B5 標準開本",
        "同人展場販售、社團場刊、粉絲誌",
        "10 本起"
      ],
      [
        "亞克力匙扣",
        "UV 四色＋白墨，透明／白底／滿版，30-80mm 任意形狀，2mm／3mm 厚",
        "角色應援、VTuber 周邊、物販",
        "10 件起"
      ],
      [
        "罐型襟章",
        "柯式／數碼四色，57mm／76mm／44mm，安全扣標配＋OPP 袋",
        "展會物販、應援活動、贈品",
        "10 件起"
      ],
      [
        "明信片套裝",
        "和紙風藝術紙 180g，雙面印刷＋霧面 PP 貼膜，OPP 獨立袋",
        "活動限定贈品、收藏、感謝卡",
        "4 套起"
      ]
    ],
    "note": "以上規格以智印港 japan-doujin 產品線為準，實際報價視乎設計細節同數量。"
  },
  "orderFlow": {
    "title": "同人周邊 6 步落單流程",
    "steps": [
      {
        "title": "WhatsApp 查詢",
        "desc": "講明產品：同人本／匙扣／襟章／明信片，連開本尺寸同數量"
      },
      {
        "title": "報價確認",
        "desc": "24 小時內回覆價錢同交期"
      },
      {
        "title": "提供設計檔",
        "desc": "AI／PDF／PNG 都收，CMYK 300dpi+，異形匙扣要 Illustrator 路徑檔"
      },
      {
        "title": "打樣確認",
        "desc": "印前檢查設計檔，確認冇問題先開機"
      },
      {
        "title": "生產製作",
        "desc": "深圳自營工廠印刷，Comiket 前特急可協調排單"
      },
      {
        "title": "收貨驗收",
        "desc": "DHL Express 國際速遞出貨，跟進到滿意為止"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "同人本報價",
      "message": "你好，我想報價同人本印刷：\n【開本】A5 / B5 / A4\n【頁數】\n【裝訂】騎馬釘 / 膠裝\n【數量】例如 50 本\n【封面】彩色\n【交貨日期】例如 X 月 X 日\n麻煩報價，多謝！"
    },
    {
      "label": "周邊報價",
      "message": "你好，我想訂製同人周邊：\n【產品】亞克力匙扣 / 罐型襟章 / 明信片套裝\n【尺寸】例如匙扣 50mm / 襟章 57mm\n【數量】\n【工藝】例如匙扣 3mm 白底\n【交貨日期】\n麻煩報價，多謝！"
    },
    {
      "label": "展前特急",
      "message": "你好，我趕住展會出貨：\n【活動名稱／日期】例如 X 月 X 日\n【產品】\n【數量】\n【設計檔現況】已有 / 未完成\n【最遲收貨日期】\n麻煩幫手睇下趕唔趕到，多謝！"
    }
  ],
  "newFaqs": [
    {
      "q": "同人本同普通畫冊印刷有咩分別？",
      "a": "同人本主打小批量：10 本起印，A5/B5 標準開本，騎馬釘（8-64 頁）或膠裝都得，封面彩色＋內頁單色，適合同人展同社團場刊；普通畫冊一般針對較大訂量同企業用途，裝訂同用紙設定唔同。想清楚配置可以先 WhatsApp 講需求。"
    },
    {
      "q": "Comic Market 或者書展前落單，交貨節奏應該點安排？",
      "a": "同人本常規 5-7 個工作天生產，Comiket 前有 24 小時特急對應，匙扣同襟章特急 3 個營業日；展前高峰期（暑假同年底場次前）廠房排單較密，建議預留 10-15 個工作日會更穩陣，落單前先喺 WhatsApp 確認交期。"
    },
    {
      "q": "可唔可以同人本同周邊一齊落單？",
      "a": "得。同人本、亞克力匙扣、罐型襟章、明信片套裝全部屬同一條 japan-doujin 產品線，深圳自營工廠統一以 ISO 12647 色彩管理，色調一致，一齊出貨方便管理物販。"
    },
    {
      "q": "設計檔有咩要求？",
      "a": "AI／PDF／PNG 都收，建議 CMYK 色彩模式、300dpi 以上；異形匙扣需要 Illustrator 路徑檔入稿。印前有免費設計檔檢查，有問題會先同你確認先開印。"
    }
  ]
};

categoryConversionBlocks['japan-doujin:ja'] = {
  "category": "japan-doujin",
  "locale": "ja",
  "title": "同人グッズ印刷｜同人誌・アクリルキーホルダー・缶バッジ 小ロット10個から｜ZprintPro",
  "metaDescription": "同人グッズ印刷はお任せ。同人誌1部￥7,500〜、アクリルキーホルダー1個￥2,275〜、缶バッジ1個￥1,200〜、ポストカード1枚￥750〜。10部・10個からの小ロットに対応し、コミケ前24時間特急製造も可能。AI即時見積もり30秒、DHL Expressで日本全国へ2-4営業日でお届けします。",
  "quickAnswers": [
    {
      "q": "同人グッズの印刷はいくらから依頼できますか？",
      "a": "同人誌は1部￥7,500〜（10部から）、アクリルキーホルダーは1個￥2,275〜、缶バッジは1個￥1,200〜（各10個から）、ポストカードセットは1枚￥750〜（4セットから）です。数量や仕様によって単価が変わるため、最終価格はお見積もり制となります。"
    },
    {
      "q": "コミケや即売会に間に合う納期はどのくらいですか？",
      "a": "標準は3-7営業日で製造します。同人誌と缶バッジはコミケ前の24時間特急製造にも対応しています（特急料金はお見積もり制）。完成後はDHL Expressで日本へ2-4営業日でお届けするため、イベント日程はあらかじめお知らせください。"
    },
    {
      "q": "アクリルキーホルダーと缶バッジはどんな仕様を選べますか？",
      "a": "アクリルキーホルダーは30-80mmの任意形状、2mm／3mmの厚み、透明・白・満版印刷から選べ、安全ピンやチェーンのオプションも可能です。缶バッジは57mm／76mmの2サイズで、フルカラー印刷・安全ピン付きが標準です。"
    }
  ],
  "socialProof": [
    {
      "stat": "10個〜",
      "label": "アクリルキーホルダー・缶バッジの小ロットに対応（同人誌は10部から）"
    },
    {
      "stat": "24時間",
      "label": "コミケ前の特急製造に対応（同人誌・缶バッジ）"
    },
    {
      "stat": "2-4営業日",
      "label": "DHL Expressによる日本への配送日数目安"
    },
    {
      "stat": "￥750〜",
      "label": "ポストカードセットの1枚あたり目安価格"
    }
  ],
  "comparisonTable": {
    "title": "同人グッズの商品タイプ × 加工 × シーン別 比較表",
    "columns": [
      "商品タイプ",
      "主な加工・仕様",
      "おすすめシーン",
      "最小ロット"
    ],
    "rows": [
      [
        "同人誌（A5／B5）",
        "表紙フルカラー＋本文モノクロ",
        "コミケ・即売会での本編物販",
        "10部〜"
      ],
      [
        "アクリルキーホルダー（30-80mm）",
        "2mm／3mm厚・透明／白／満版印刷",
        "推し活グッズ・ファンクラブ限定品",
        "10個〜"
      ],
      [
        "缶バッジ（57mm／76mm）",
        "フルカラー印刷・安全ピン付き",
        "現場配布・セット売りの特典",
        "10個〜"
      ],
      [
        "ポストカードセット（105×148mm）",
        "和紙風アート紙・両面印刷・OPPスリーブ封入",
        "イラストコレクション・来場者特典",
        "4セット〜（4-8枚組）"
      ]
    ],
    "note": "目安価格は同人誌1部￥7,500〜／アクリルキーホルダー1個￥2,275〜／缶バッジ1個￥1,200〜／ポストカード1枚￥750〜。最終価格・納期は仕様と数量により変わるため、お見積もり制です。"
  },
  "orderFlow": {
    "title": "同人グッズ印刷 6ステップ",
    "steps": [
      {
        "title": "お問い合わせ",
        "desc": "WhatsAppで商品・数量・仕様・イベント日程をご相談ください"
      },
      {
        "title": "AI即時見積もり",
        "desc": "30秒で概算価格と納期をご提示します"
      },
      {
        "title": "データ入稿",
        "desc": "印刷データをご入稿いただき、スタッフが仕様を確認します"
      },
      {
        "title": "内容の最終確認",
        "desc": "サイズ・加工・部数のご確認のあと、製造を開始します"
      },
      {
        "title": "製造・品質検査",
        "desc": "標準3-7営業日で製造。FSC認証紙とISO 12647の色管理のもと、出荷前に検品します"
      },
      {
        "title": "配送・納品",
        "desc": "DHL Expressで日本へ2-4営業日でお届けします"
      }
    ]
  },
  "whatsappTemplates": [
    {
      "label": "見積もり依頼",
      "message": "同人グッズの見積もりをお願いします。商品【アクリルキーホルダー】／サイズ【50mm】／数量【30個】／仕様【2mm・満版印刷】。1個あたりの単価と納期を教えてください。"
    },
    {
      "label": "コミケ特急相談",
      "message": "【コミケ】の物販が急ぎです。商品【同人誌（B5・表紙カラー／本文モノクロ）】／数量【50部】。24時間特急製造が使えるか、費用とあわせて教えてください。"
    },
    {
      "label": "リピート追加発注",
      "message": "前に発注した【同じデザインの缶バッジ（57mm）】を追加したいです。数量【100個】、デザインは前回と同じです。見積もりをお願いします。"
    }
  ],
  "newFaqs": [
    {
      "q": "小部数でも注文できますか？部数と価格の関係は？",
      "a": "はい。同人誌は10部から、アクリルキーホルダー・缶バッジは10個から、ポストカードセットは4セットから承ります。目安価格は同人誌1部￥7,500〜、アクリルキーホルダー1個￥2,275〜、缶バッジ1個￥1,200〜、ポストカード1枚￥750〜です。部数が増えるほど1点あたりの単価は下がり、最終価格はお見積もり制となります。"
    },
    {
      "q": "入稿データの形式や仕様はどこで確認できますか？",
      "a": "主要フォーマットでのデータ入稿に対応しています。カラーモード・塗り足し・解像度などの詳細仕様は、担当スタッフまでお気軽にお問い合わせください。同人誌は表紙フルカラー＋本文モノクロという標準構成にも対応し、入稿後にスタッフが仕様を確認してから製造に入ります。"
    },
    {
      "q": "アクリルキーホルダーの厚みや印刷方法は選べますか？",
      "a": "選べます。30-80mmの任意形状、2mm／3mmの厚み、透明・白・満版印刷に対応し、安全ピンやチェーンのオプションも追加できます。缶バッジは57mm／76mmの2サイズでフルカラー印刷・安全ピン付き。推し活グッズには缶バッジとアクリルキーホルダーの組み合わせが人気です。"
    },
    {
      "q": "コミケ前に間に合わせる特急製造は可能ですか？",
      "a": "可能です。同人誌と缶バッジはコミケ前の24時間特急製造に対応しており、標準の3-7営業日より短い納期で製造できます（特急料金はお見積もり制）。完成後はDHL Expressで日本へ2-4営業日でお届けします。イベントの開始日をあらかじめお知らせください。"
    }
  ]
};


export function getConversionBlocks(
  categorySlug: string,
  locale: string
): CategoryConversionContent | null {
  return categoryConversionBlocks[`${categorySlug}:${locale}`] || null;
}

/** 合并到 FAQPage schema 的新 FAQ */
export function getConversionFaqs(
  categorySlug: string,
  locale: string
): FaqItem[] {
  const b = getConversionBlocks(categorySlug, locale);
  return b?.newFaqs || [];
}

export const WHATSAPP_PHONE = '8619880851334';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
