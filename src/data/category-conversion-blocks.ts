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
