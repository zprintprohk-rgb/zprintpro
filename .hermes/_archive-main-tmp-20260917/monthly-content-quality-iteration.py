"""monthly-content-quality-iteration.py
8/1 monthly cron: 10 篇 orphan 博客 × 3 locale = 30 URL 内容质量自迭代
"""
import json
import re
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")

# === Internal links pool (200 OK verified) ===
INTERNAL_LINKS = {
    "posters": {
        "zh-hk": [("A2 海報印刷", "/zh-hk/category/posters/"), ("雙面傳單", "/zh-hk/product/double-sided-flyers/"), ("厚紙傳單", "/zh-hk/product/thick-paper-flyers/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("Custom poster printing", "/en/category/posters/"), ("Double-sided flyers", "/en/product/double-sided-flyers/"), ("Thick paper flyers", "/en/product/thick-paper-flyers/"), ("Get instant quote", "/en/quote/")],
        "ja": [("ポスター印刷", "/ja/category/posters/"), ("両面チラシ", "/ja/product/double-sided-flyers/"), ("厚紙チラシ", "/ja/product/thick-paper-flyers/"), ("見積もり依頼", "/ja/quote/")],
    },
    "stickers": {
        "zh-hk": [("防水貼紙", "/zh-hk/category/stickers/"), ("模切貼紙", "/zh-hk/product/die-cut-stickers/"), ("透明貼紙", "/zh-hk/product/transparent-stickers/"), ("燙金貼紙", "/zh-hk/product/foil-stickers/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("Waterproof stickers", "/en/category/stickers/"), ("Die-cut stickers", "/en/product/die-cut-stickers/"), ("Transparent stickers", "/en/product/transparent-stickers/"), ("Foil stickers", "/en/product/foil-stickers/"), ("Get instant quote", "/en/quote/")],
        "ja": [("防水ステッカー", "/ja/category/stickers/"), ("ダイカットステッカー", "/ja/product/die-cut-stickers/"), ("透明ステッカー", "/ja/product/transparent-stickers/"), ("箔押しステッカー", "/ja/product/foil-stickers/"), ("見積もり依頼", "/ja/quote/")],
    },
    "flyers": {
        "zh-hk": [("A4 傳單", "/zh-hk/category/flyers/"), ("厚紙傳單", "/zh-hk/product/thick-paper-flyers/"), ("雙面傳單", "/zh-hk/product/double-sided-flyers/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("Custom flyers", "/en/category/flyers/"), ("Thick paper flyers", "/en/product/thick-paper-flyers/"), ("Double-sided flyers", "/en/product/double-sided-flyers/"), ("Get instant quote", "/en/quote/")],
        "ja": [("チラシ印刷", "/ja/category/flyers/"), ("厚紙チラシ", "/ja/product/thick-paper-flyers/"), ("両面チラシ", "/ja/product/double-sided-flyers/"), ("見積もり依頼", "/ja/quote/")],
    },
    "paper-bags": {
        "zh-hk": [("紙袋印刷", "/zh-hk/category/paper-bags/"), ("牛皮紙袋", "/zh-hk/product/kraft-paper-bags/"), ("禮品袋", "/zh-hk/product/gift-bags/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("Paper bag printing", "/en/category/paper-bags/"), ("Kraft paper bags", "/en/product/kraft-paper-bags/"), ("Gift bags", "/en/product/gift-bags/"), ("Get instant quote", "/en/quote/")],
        "ja": [("紙袋印刷", "/ja/category/paper-bags/"), ("クラフト紙袋", "/ja/product/kraft-paper-bags/"), ("ギフトバッグ", "/ja/product/gift-bags/"), ("見積もり依頼", "/ja/quote/")],
    },
    "packaging": {
        "zh-hk": [("包裝盒印刷", "/zh-hk/category/packaging/"), ("摺盒", "/zh-hk/product/folding-boxes/"), ("書型盒", "/zh-hk/product/rigid-boxes/"), ("化妝品盒", "/zh-hk/product/cosmetic-boxes/"), ("速遞盒", "/zh-hk/product/mailer-boxes/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("Custom packaging", "/en/category/packaging/"), ("Folding boxes", "/en/product/folding-boxes/"), ("Rigid boxes", "/en/product/rigid-boxes/"), ("Cosmetic boxes", "/en/product/cosmetic-boxes/"), ("Mailer boxes", "/en/product/mailer-boxes/"), ("Get instant quote", "/en/quote/")],
        "ja": [("パッケージ印刷", "/ja/category/packaging/"), ("組立箱", "/ja/product/folding-boxes/"), ("貼り箱", "/ja/product/rigid-boxes/"), ("化粧箱", "/ja/product/cosmetic-boxes/"), ("メール便箱", "/ja/product/mailer-boxes/"), ("見積もり依頼", "/ja/quote/")],
    },
    "educational": {
        "zh-hk": [("校園印刷", "/zh-hk/category/educational/"), ("畢業紀念冊", "/zh-hk/product/graduation-yearbook/"), ("練習簿", "/zh-hk/product/exercise-books/"), ("證書", "/zh-hk/product/certificates/"), ("立即報價", "/zh-hk/quote/")],
        "en": [("School printing", "/en/category/educational/"), ("Yearbooks", "/en/product/graduation-yearbook/"), ("Workbooks", "/en/product/exercise-books/"), ("Certificates", "/en/product/certificates/"), ("Get instant quote", "/en/quote/")],
        "ja": [("学校印刷", "/ja/category/educational/"), ("卒業アルバム", "/ja/product/graduation-yearbook/"), ("ワークブック", "/ja/product/exercise-books/"), ("証明書", "/ja/product/certificates/"), ("見積もり依頼", "/ja/quote/")],
    },
}

# === 10 orphan × 3 locale FAQ ===
ORPHANS = [
    {
        "slug": "poster-printing-guide",
        "category": "posters",
        "faq": {
            "zh-hk": [
                ("海報印刷用咩紙最好？", "室內短期展示建議用 157g 銅版紙 + 光膠；戶外長期建議用 PP 合成紙 + UV 上光；藝術複製或高端品牌選美術紙 / 棉紙；展覽牆面用海報裱框或背膠 PP 膜更換。智印雲 50+ 紙樣可寄,免費打樣確認效果。"),
                ("A1 / A2 海報有咩分別？", "A1 = 594×841mm（約 23.4×33.1 吋）,適合店內主牆、展覽入口；A2 = 420×594mm（約 16.5×23.4 吋）,適合活動宣傳、櫥窗展示。智印雲 A1 / A2 支援 25 張起印,3-5 個工作天交貨,大灣區順豐本地直送。"),
                ("海報急件最快幾耐？", "上午 11 點前確認稿件,A4 銅版紙海報可 24 小時內交收；A2 / A1 大尺寸需 1-2 個工作天；特殊工藝（燙金 / UV / 摺口）需 3 個工作天。急件加 30-50% 附加費,詳見智印雲 WhatsApp 報價。"),
            ],
            "en": [
                ("What paper is best for posters?", "For indoor short-term display, 157gsm art paper + gloss lamination; outdoor long-term, PP synthetic paper + UV coating; art reproduction or premium brands, textured/canvas stock; exhibition wall mounting, frame-mount or adhesive PP film. ZprintPro provides 50+ paper swatches and free proofing."),
                ("What's the difference between A1 and A2 posters?", "A1 = 594x841mm (~23.4x33.1 inch), ideal for in-store feature wall or exhibition entrance; A2 = 420x594mm (~16.5x23.4 inch), ideal for event promotion and window display. ZprintPro prints A1/A2 from 25-piece minimum, 3-5 business day delivery, Asia factory direct."),
                ("How fast can posters be rush-printed?", "Artwork confirmed by 11am, A4 art paper posters ship within 24 hours; A2/A1 large format needs 1-2 business days; special finishes (foil/UV/folding edge) need 3 business days. Rush fee is 30-50% extra, contact ZprintPro WhatsApp for instant quote."),
            ],
            "ja": [
                ("ポスター印刷に最適な用紙は？", "室内短期展示は 157g コート紙 + 光沢ラミネート；屋外長期は PP 合成紙 + UV コーティング；アート複製や高級ブランドは画用紙 / キャンバス；展示会壁面は額装または粘着 PP フィルム。ZprintPro は 50 種類以上の紙サンプルと無料校正を提供。"),
                ("A1 と A2 ポスターの違いは？", "A1 = 594×841mm、店内のメインウオールや展示会場入口向け；A2 = 420×594mm、イベント宣伝やウィンドウディスプレイ向け。ZprintPro は A1/A2 を 25 枚から印刷、3-5 営業日で納品、アジア工場直接配送。"),
                ("ポスターの急ぎ印刷は最短何日？", "午前 11 時までにデータ確定で A4 コート紙ポスターは 24 時間以内発送；A2/A1 大判サイズは 1-2 営業日；特殊加工（箔押し / UV / 折り返し）は 3 営業日。急ぎ料金 30-50% 増,ZprintPro WhatsApp で即見積もり。"),
            ],
        },
    },
    {
        "slug": "paper-bag-printing-guide",
        "category": "paper-bags",
        "faq": {
            "zh-hk": [
                ("紙袋用咩紙最襟用？", "環保牛皮紙（120-200g）最常用,堅韌耐重,適合服裝 / 零售品牌；白卡紙（250-300g）光滑高檔,適合化妝品 / 禮品；銅版紙 + 過膠適合精品、食品。智印雲 100+ 紙樣可選,所有袋型都通過 3kg 負重測試。"),
                ("紙袋 MOQ 最低幾多？", "智印雲標準款 100 個起印,支持小批量客製 logo；大批量（5,000+ 個）享階梯價,單價可低至 HK$3-5 / 個。所有袋型含手挽、可加燙金 / UV / 擊凸 / 絲帶。"),
                ("急件印紙袋要幾耐？", "標準款 3-5 個工作天交貨；加 logo 燙金 5-7 天；特殊尺寸 / 結構需 7-10 天。急件加 30% 附加費,可走 24 小時設計 + 48 小時生產 + 順豐直送流程。"),
            ],
            "en": [
                ("What paper is most durable for bags?", "Kraft paper (120-200gsm) is most common, sturdy and load-bearing, ideal for apparel/retail; white card (250-300gsm) is smooth and premium, ideal for cosmetics/gifts; coated paper + lamination for boutique and food. ZprintPro provides 100+ swatches, all styles pass 3kg load test."),
                ("What is the minimum order quantity?", "ZprintPro standard styles start at 100 pieces for small-batch logo customization; bulk (5,000+) tiered pricing brings per-unit cost to $3-5. All styles include handles, optional foil/UV/emboss/ribbon finishes."),
                ("How fast can bags be rush-printed?", "Standard styles 3-5 business days; with foil logo 5-7 days; custom size/structure 7-10 days. Rush fee 30% extra, supports 24-hour design + 48-hour production + DHL Express 2-4 day shipping."),
            ],
            "ja": [
                ("紙袋に最適な用紙は？", "クラフト紙（120-200g）が最も一般的で堅牢、アパレル / 小売り向け；白カード（250-300g）は滑らかで高級感、化粧品 / ギフト向け；コート紙 + ラミネートはブティック、食品向け。ZprintPro は 100 種類以上の見本を提供、全型式で 3kg 耐荷重テスト済み。"),
                ("紙袋の最小注文数は？", "ZprintPro 標準型式は 100 個から小ロット対応、ロゴカスタマイズ可能；大量（5,000 個以上）は段階価格により単価 50-100 円まで。全型式に手提げ付き、オプションで箔押し / UV / エンボス / リボン加工可能。"),
                ("急ぎの紙袋印刷は最短何日？", "標準型式 3-5 営業日；箔押しロゴ追加 5-7 日；特殊サイズ / 構造 7-10 日。急ぎ料金 30% 増、24 時間デザイン + 48 時間生産 + DHL Express 2-4 日配送で対応可能。"),
            ],
        },
    },
    {
        "slug": "sticker-guide",
        "category": "stickers",
        "faq": {
            "zh-hk": [
                ("防水貼紙揀咩材質？", "防水場景選合成紙（Yupo / 合成 PP / PET）最穩定,智印雲 8 種防水材質,通過 72 小時浸水測試；戶外日曬選 UV 抗光配方 5 年不褪色；化學品 / 油漬環境選 100% 防水 PP 合成紙。"),
                ("模切貼紙最細可以做到幾細？", "智印雲雷射模切精度 ±0.2mm,最小可切 8×8mm（指甲大小）,適合二維碼 / 條碼標籤；複雜異型輪廓需提供 AI / CDR 矢量檔；小批量 50 張起印,3-5 天交貨。"),
                ("燙金貼紙維持邊耐？", "真金箔 + 啞膠貼紙戶外使用 3-5 年不脫色,室內可達 8-10 年；仿金箔（電化鋁）價格低 30%,室內 3-5 年品質穩定。智印雲 7 種金色（亮金 / 啞金 / 玫瑰金 / 香檳金 / 紅金 / 藍金 / 綠金）任選。"),
            ],
            "en": [
                ("What material for waterproof stickers?", "Synthetic paper (Yupo / PP / PET) is the most reliable for waterproof scenarios, ZprintPro offers 8 waterproof materials, 72-hour immersion tested; outdoor sun exposure, UV-resistant formula 5-year fade-proof; chemical/oil environments, 100% waterproof PP synthetic paper."),
                ("What is the smallest die-cut sticker size?", "ZprintPro laser die-cut precision ±0.2mm, smallest 8x8mm (fingernail size), ideal for QR/barcode labels; complex custom outlines need AI/CDR vector files; small batch 50 pieces minimum, 3-5 day delivery."),
                ("How long do foil stickers last?", "Real gold foil + matte laminate outdoors 3-5 years no fading, indoors 8-10 years; imitation gold (electroplated aluminum) 30% cheaper, indoor 3-5 year stable quality. ZprintPro offers 7 gold colors (bright/matte/rose/champagne/red/blue/green gold)."),
            ],
            "ja": [
                ("防水ステッカーに最適な素材は？", "合成紙（Yupo / PP / PET）が防水シーンに最も安定、ZprintPro は 8 種類の防水素材を提供、72 時間浸水テスト済み；屋外日光曝露は UV 耐光処方 5 年不退色；化学薬品 / 油環境には 100% 防水 PP 合成紙。"),
                ("ダイカットステッカーの最小サイズは？", "ZprintPro レーザーダイカット精度 ±0.2mm、最小 8×8mm（爪サイズ）、QR / バーコードラベルに最適；複雑なカスタム形状は AI / CDR ベクターファイルが必要；小ロット 50 枚から、3-5 日納品。"),
                ("箔押しステッカーの耐久性は？", "本金箔 + マットラミネート屋外 3-5 年不退色、屋内 8-10 年；模造金箔（電気アルミニウム）は 30% 安価、屋内 3-5 年品質安定。ZprintPro は 7 種類の金色（ブライト / マット / ローズ / シャンパン / レッド / ブルー / グリーンゴールド）対応。"),
            ],
        },
    },
    {
        "slug": "cmyk-guide",
        "category": "packaging",
        "faq": {
            "zh-hk": [
                ("CMYK 同 RGB 點解唔同？", "RGB 為屏幕三原色（紅綠藍光）,色域較廣,適用於顯示屏；CMYK 為印刷四色（青品黃黑油墨）,色域較窄,適用於紙品印刷。設計稿全程用 CMYK 模式,RGB 圖片需於導出 PDF 前轉換,避免顏色變暗 / 鮮豔度下降。"),
                ("Pantone 專色同 CMYK 點揀？", "Pantone 專色（PMS）色彩穩定、適合品牌標準色、燙金等特殊工藝,1-2 色印刷成本低；CMYK 適合多色彩色照片 / 漸層效果,色彩變化豐富。智印雲 PMS 145+ 庫存色,CMYK 4 色 + 5-6 色印刷均可。"),
                ("印刷 1,000 張以下點解貴咗咁多？", "短版印刷（100-500 張）採用數碼機（HP Indigo / 柯美 C6000）,無需製版費,單張成本較高；500+ 張起跳走傳統柯式印刷,單張成本可降 30-50%。智印雲 50 張起即接急件,1,000+ 張享階梯優惠。"),
            ],
            "en": [
                ("Why are CMYK and RGB different?", "RGB is the screen three-primary (red/green/blue light), wider gamut, for display; CMYK is print four-color (cyan/magenta/yellow/black ink), narrower gamut, for paper printing. Use CMYK throughout design, convert RGB images before exporting PDF, avoid darkening/desaturation."),
                ("How to choose Pantone vs CMYK?", "Pantone (PMS) is color-stable, ideal for brand standard colors and foil/special finishes, lower cost for 1-2 colors; CMYK is ideal for multi-color photo/gradient effects, rich color variation. ZprintPro stocks 145+ PMS, supports 4-color CMYK + 5-6 color printing."),
                ("Why is short-run (under 1,000) more expensive?", "Short-run (100-500) uses digital press (HP Indigo/Konica C6000), no plate-making fee, higher per-unit cost; 500+ shifts to traditional offset, per-unit cost drops 30-50%. ZprintPro accepts 50-piece rush jobs, 1,000+ tiered discount."),
            ],
            "ja": [
                ("CMYK と RGB の違いは？", "RGB は画面の三原色（赤 / 緑 / 青光）、色域が広くディスプレイ向け；CMYK は印刷の四色（シアン / マゼンタ / イエロー / ブラックインク）、色域が狭く紙印刷向け。デザインは終始 CMYK モード、RGB 画像は PDF エクスポート前に変換、暗化 / 彩度低下を防止。"),
                ("Pantone と CMYK の選び方は？", "Pantone（PMS）は色が安定、ブランド標準色や箔押しなどの特殊加工に最適、1-2 色印刷は低コスト；CMYK は多色写真 / グラデーション効果に最適、色彩変化が豊富。ZprintPro は 145 色以上の PMS 在庫、4 色 CMYK + 5-6 色印刷対応。"),
                ("1,000 枚未満の印刷はなぜ高い？", "小ロット（100-500 枚）はデジタル機（HP Indigo / 柯美 C6000）使用、版作成不要、単価高め；500 枚以上で従来オフセット印刷、単価 30-50% 削減可能。ZprintPro は 50 枚から急ぎ対応、1,000 枚以上で段階割引。"),
            ],
        },
    },
    {
        "slug": "restaurant-opening-flyer-printing-guide",
        "category": "flyers",
        "faq": {
            "zh-hk": [
                ("新開餐廳傳單要印幾多張？", "社區小店建議 1,000-3,000 張起步,街頭派發 1 張成本 HK$0.3-0.8；商場 / 旺區旗艦店建議 5,000-10,000 張,搭配 2-3 輪節日促銷。智印雲 200 張起即接,小批量測試不同設計 + 文案效果。"),
                ("餐廳傳單揀咩紙最好？", "銅版紙 157g + 光膠最常用,色彩鮮豔成本低；美食 / 高端餐廳建議 250g 厚紙 + 啞膠,質感厚實；外賣 / 折價券用 105g 銅版紙 + 局部 UV 上光（突出 QR Code）。智印雲 8 種紙樣 + 5 種工藝任選。"),
                ("傳單派發效率最高嘅方式？", "社區小店：街頭定點派發 + 商戶聯合（樓下餐廳 / 便利店互換）；商場店：禮賓台擺放 + 電梯廣告欄；連鎖店：會員 EDM 印刷版 + 線上訂單附贈；節日活動：派對小食 / 試食裝入袋。智印雲可代客設計 1-2 套 A/B 文案。"),
            ],
            "en": [
                ("How many flyers for a new restaurant opening?", "Neighborhood spot 1,000-3,000 pieces, street distribution per piece $0.3-0.8 HKD; mall/flagship 5,000-10,000 pieces, paired with 2-3 rounds of holiday promotions. ZprintPro accepts 200-piece small batch for testing different designs/copy."),
                ("What paper for restaurant flyers?", "157gsm coated + gloss lamination most common, vibrant color, low cost; fine dining/premium restaurant, 250gsm thick paper + matte lamination, premium feel; takeaway/discount coupons, 105gsm coated + spot UV (highlight QR code). ZprintPro offers 8 paper swatches + 5 finishes."),
                ("Most efficient flyer distribution channels?", "Neighborhood: street spot distribution + merchant swap (nearby restaurants/convenience stores); mall store: concierge desk + elevator ad board; chain store: member EDM print version + online order gift; holiday event: party snacks/sample pack insertion. ZprintPro can design 1-2 sets of A/B copy on request."),
            ],
            "ja": [
                ("新規開店レストランのチラシ必要枚数は？", "地域密着型小店は 1,000-3,000 枚、街頭配布で 1 枚あたり 30-80 円；モール / 旗艦店は 5,000-10,000 枚、2-3 回の季節促销と組み合わせ。ZprintPro は 200 枚から小ロット対応、デザイン / コピー効果テスト可能。"),
                ("レストランチラシに最適な用紙は？", "コート紙 157g + 光沢ラミネートが最も一般的、色彩鮮やか、低コスト；グルメ / 高級レストランは 250g 厚紙 + マットラミネート、高級感；テイクアウト / クーポン券は 105g コート紙 + 部分的 UV（QR コード強調）。ZprintPro は 8 種類の紙見本 + 5 加工対応。"),
                ("チラシ配布の最も効率的な方法は？", "地域小店：街頭定点配布 + 商家連携（近隣レストラン / コンビニ相互）；モール店：コンシェルジュデスク + エレベーター広告欄；チェーン店：会員 EDM 印刷版 + オンライン注文同梱；季節イベント：パーティースナック / サンプル封入。ZprintPro は 1-2 セットの A/B コピーデザイン対応可能。"),
            ],
        },
    },
    {
        "slug": "food-packaging-printing-guide",
        "category": "packaging",
        "faq": {
            "zh-hk": [
                ("食品包裝用咩材質先安全？", "食品接觸面首選 FDA / EU 認證材質：白卡 300g + 食品級淋膜、牛皮紙 + PE 淋膜（耐油）、PLA 生物可降解內襯；不可用回收紙 / 含重金屬油墨。智印雲 6 款食品級盒型通過 FDA 21 CFR + EU 10/2011 雙認證。"),
                ("食品包裝要過邊啲認證？", "美國 FDA 21 CFR（食品接觸材料）、歐盟 EU 10/2011（塑料食品接觸材料）、德國 LFGB、日本 食品衛生法（370 號）、中國 GB 4806.1。出口美國 + 歐盟標配 FDA + EU 雙認證,智印雲提供完整測試報告。"),
                ("食品盒 MOQ 最低幾多？", "標準尺寸 100 個起印,特殊尺寸 500 個起；小批量支援 7 天交期,大批量享階梯價 30-50% off。智印雲 200+ 食品盒開模實例,5 個工作天可寄實物樣板確認。"),
            ],
            "en": [
                ("What food-safe material for food packaging?", "Food contact surface, prefer FDA/EU certified: 300gsm white card + food-grade lamination, kraft + PE lamination (oil-resistant), PLA biodegradable inner liner; never use recycled paper or heavy-metal ink. ZprintPro 6 food-grade box types pass FDA 21 CFR + EU 10/2011 dual certification."),
                ("What certifications do food packages need?", "USA FDA 21 CFR (food contact), EU 10/2011 (plastic food contact), German LFGB, Japan Food Sanitation Law (No. 370), China GB 4806.1. Export to US + EU standard FDA + EU dual certification, ZprintPro provides complete test reports."),
                ("What is the MOQ for food boxes?", "Standard sizes 100 pieces minimum, custom sizes 500 minimum; small batch supports 7-day delivery, bulk tiered discount 30-50% off. ZprintPro has 200+ food box die-cut samples, 5 business days to ship physical sample for confirmation."),
            ],
            "ja": [
                ("食品包装に最適な安全な素材は？", "食品接触面には FDA / EU 認証素材：白カード 300g + 食品グレードラミネート、クラフト + PE ラミネート（耐油）、PLA 生分解性インナーライナー；再生紙 / 重金属インクは使用不可。ZprintPro は 6 種類の食品グレード箱型で FDA 21 CFR + EU 10/2011 双重認証取得。"),
                ("食品包装に必要な認証は？", "米国 FDA 21 CFR（食品接触材料）、EU 10/2011（プラスチック食品接触材料）、ドイツ LFGB、日本 食品衛生法（370 号）、中国 GB 4806.1。米国 + EU 輸出は FDA + EU 双重認証が標準、ZprintPro は完全なテストレポートを提供。"),
                ("食品箱の最小注文数は？", "標準サイズ 100 個から、特殊サイズ 500 個から；小ロットは 7 日納品対応、大口は段階割引 30-50% OFF。ZprintPro は 200 種類以上の食品箱型抜きサンプル保有、実物サンプル確認まで 5 営業日。"),
            ],
        },
    },
    {
        "slug": "paper-materials",
        "category": "packaging",
        "faq": {
            "zh-hk": [
                ("銅版紙同書紙點揀？", "銅版紙（Art Paper）表面光滑、色彩還原度高,適合彩色印刷品、雜誌、產品型錄；書紙（Book Paper / 模造紙）表面粗糙、手感柔和、吸墨性強,適合書籍內頁、信紙、黑白印刷。智印雲兩者齊備,200+ 紙樣可寄。"),
                ("特種紙包括邊啲？", "特種紙包括美術紙（紋理紙 / 棉紙 / 仿古紙）、合成紙（PP / PET / Yupo）、金銀箔紙、雷射紙、牛皮紙（環保 / 再生）、透明 / 半透明紙、珠光紙等 50+ 種,適合高端品牌包裝、禮盒、邀請函。"),
                ("印刷紙張用幾克（gsm）最啱？", "傳單 105-157gsm、名片 250-350gsm、海報 128-200gsm、書刊封面 200-300gsm、書刊內頁 80-120gsm、包裝盒 250-400gsm。智印雲 200+ gsm 庫存,客製 80-400gsm 全範圍。"),
            ],
            "en": [
                ("Art paper vs book paper?", "Art paper (coated) has smooth surface, high color reproduction, ideal for color printing, magazines, product catalogs; book paper (offset/woodfree) has rough surface, soft hand feel, strong ink absorption, ideal for book interior, letterhead, B&W printing. ZprintPro stocks both, 200+ swatches available."),
                ("What are specialty papers?", "Specialty papers include art paper (textured/cotton/vintage), synthetic (PP/PET/Yupo), gold/silver foil, holographic, kraft (eco/recycled), transparent/translucent, pearl, etc. 50+ types, ideal for premium brand packaging, gift boxes, invitations."),
                ("What gsm is best for which printing?", "Flyers 105-157gsm, business cards 250-350gsm, posters 128-200gsm, book cover 200-300gsm, book interior 80-120gsm, packaging 250-400gsm. ZprintPro stocks 200+ gsm, custom 80-400gsm full range."),
            ],
            "ja": [
                ("コート紙と上質紙の違いは？", "コート紙（アート紙）は表面平滑、色彩再現度が高く、カラー印刷、雑誌、製品カタログ向け；上質紙（ブックペーパー）は表面粗く、手触り柔らかく、吸インク性強く、書籍本文、レターヘッド、白黒印刷向け。ZprintPro は両方在庫、200 種類以上の見本提供可能。"),
                ("特殊紙には何がありますか？", "特殊紙にはアート紙（テクスチャー / コットン / アンティーク調）、合成紙（PP / PET / Yupo）、金銀箔紙、ホログラム紙、クラフト紙（エコ / 再生）、透明 / 半透明紙、パール紙など 50 種類以上、高級ブランドパッケージ、ギフトボックス、招待状向け。"),
                ("印刷用紙の最適な gsm は？", "チラシ 105-157gsm、名刺 250-350gsm、ポスター 128-200gsm、書籍表紙 200-300gsm、書籍本文 80-120gsm、包装箱 250-400gsm。ZprintPro は 200+ gsm 在庫、カスタム 80-400gsm 全範囲対応。"),
            ],
        },
    },
    {
        "slug": "brand-materials-checklist",
        "category": "packaging",
        "faq": {
            "zh-hk": [
                ("初創公司要印邊啲基本物料？", "起步必備 6 件套：名片（個人 + 公司 2 套）、信封 / 信紙、產品型錄 / 服務單張、貼紙 / 封口貼、感謝卡、紙袋 / 快遞盒。預算 HK$2,000-5,000 即可全套,智印雲 100 件起印,設計 + 印刷 + 物流一站完成。"),
                ("品牌物料點樣保持一致？", "建立 Brand Guideline（品牌指南）：Logo 使用規範（最小尺寸 / 顏色 / 安全距離）、字體 1-2 款（標題 + 正文）、品牌色 2-3 色（主色 + 輔色 + 中性色）、印刷材質（紙樣 5-8 款）、拍照風格（場景 + 燈光）。所有物料按 guideline 設計,智印雲免費提供 guideline 模板。"),
                ("升級品牌要重新印邊樣？", "品牌升級建議 5 步走：① Logo 優化 / 重新設計 ② 印刷材質升級（銅版紙 → 美術紙 / 特種紙）③ 燙金 / UV / 擊凸等特殊工藝 ④ 包裝結構升級（普通盒 → 書型盒 / 磁吸盒）⑤ 物料系統化（統一設計風格 + 統一包裝視覺）。智印雲 1 對 1 品牌顧問 30 分鐘免費諮詢。"),
            ],
            "en": [
                ("What basic materials do startups need?", "Starter 6-piece set: business cards (personal + company 2 sets), envelope/letterhead, product catalog/service flyer, stickers/seal stickers, thank you card, paper bag/shipping box. Budget $2,000-5,000 HKD for full set, ZprintPro starts 100 pieces, design + print + logistics one-stop."),
                ("How to keep brand materials consistent?", "Build a Brand Guideline: logo usage (min size/color/safe distance), 1-2 fonts (heading + body), 2-3 brand colors (primary + secondary + neutral), 5-8 printing materials, photography style (scene + lighting). All materials designed per guideline, ZprintPro provides free guideline template."),
                ("What to reprint when upgrading a brand?", "Brand upgrade 5-step path: ① Logo refinement/redesign ② Material upgrade (coated to art/specialty paper) ③ Special finishes (foil/UV/emboss) ④ Structure upgrade (regular to book-style/magnetic box) ⑤ Systematize (unified design + packaging vision). ZprintPro 1-on-1 brand consultant, 30-min free consultation."),
            ],
            "ja": [
                ("スタートアップに必要な基本印刷物は？", "スターター 6 点セット：名刺（個人 + 会社 2 セット）、封筒 / レターヘッド、製品カタログ / サービスチラシ、ステッカー / 封シール、サンクスカード、紙袋 / 配送箱。予算 2-5 万円で全套対応、ZprintPro は 100 個から小ロット対応、デザイン + 印刷 + 物流ワンストップ。"),
                ("ブランド印刷物の一貫性を保つには？", "ブランドガイドラインを構築：ロゴ使用規範（最小サイズ / 色 / セーフティエリア）、フォント 1-2 種類（見出し + 本文）、ブランドカラー 2-3 色（メイン + サブ + ニュートラル）、印刷素材 5-8 種類、写真スタイル（シーン + 照明）。全印刷物をガイドラインに従ってデザイン、ZprintPro は無料テンプレート提供。"),
                ("ブランドアップグレード時に再印刷すべきものは？", "ブランドアップグレード 5 ステップ：① ロゴ最適化 / 再デザイン ② 印刷素材アップグレード（コート紙 → アート紙 / 特殊紙）③ 特殊加工（箔押し / UV / エンボス）④ 構造アップグレード（一般箱 → 貼り箱 / マグネット箱）⑤ システム化（統一デザイン + パッケージ視覚）。ZprintPro 1 対 1 ブランドコンサルタント、30 分無料相談。"),
            ],
        },
    },
    {
        "slug": "hong-kong-printing-guide",
        "category": "posters",
        "faq": {
            "zh-hk": [
                ("香港印刷公司點揀最穩陣？", "選印刷公司 5 個關鍵指標：① 印刷設備（海德堡 / 小森 = 國際品牌,色彩穩定）② 服務速度（急件 24 小時、標準 3-5 天）③ 客戶案例（服務過品牌、實體樣板可看）④ 售後服務（電話 / WhatsApp 真人客服）⑤ 透明定價（無隱藏費）。智印雲 5 項全部達標,15+ 年服務香港及大灣區。"),
                ("港島 / 九龍 / 新界印刷點揀？", "港島：精品印刷、急件、即取件,價格高 20-30%；九龍：印刷廠集中、設計 + 印刷結合,大批量性價比高；新界：租金低、倉儲足,中大批量常規單首選；跨境 / 線上：香港下單、大灣區廠房生產、順豐本地 1 日送達,比港島門市再低 30-50%。"),
                ("邊間印刷公司可以印急件？", "智印雲支援 24 小時急件印刷,A4 銅版紙傳單 / 名片 / 貼紙最快 24 小時交收,A2 海報 1-2 天,大尺寸包裝盒 3-5 天。上午 11 點前確認稿件,當日安排生產,大灣區順豐本地 1 日派送。"),
            ],
            "en": [
                ("How to choose a reliable HK printing company?", "5 key indicators: ① Print equipment (Heidelberg/Komori = international brand, color-stable) ② Service speed (rush 24h, standard 3-5 days) ③ Customer cases (served brands, physical samples) ④ After-sales (phone/WhatsApp live support) ⑤ Transparent pricing (no hidden fees). ZprintPro meets all 5, 15+ years serving HK and Greater Bay Area."),
                ("HK Island / Kowloon / NT where to print?", "HK Island: premium printing, rush, immediate pickup, 20-30% higher price; Kowloon: print factories concentrated, design + print combined, best bulk value; New Territories: low rent, ample storage, best for medium-large routine orders; cross-border/online: HK order, Greater Bay Area factory, SF Local 1-day delivery, 30-50% lower than HK Island retail."),
                ("Which printer offers rush service?", "ZprintPro supports 24-hour rush printing, A4 art paper flyers/cards/stickers fastest 24-hour delivery, A2 posters 1-2 days, large packaging 3-5 days. Confirm artwork before 11am, same-day production, Greater Bay Area SF Local 1-day delivery."),
            ],
            "ja": [
                ("香港の印刷会社の選び方は？", "5 つの重要指標：① 印刷設備（ハイデルベルク / コモリ = 国際ブランド、色安定）② サービス速度（急ぎ 24 時間、標準 3-5 日）③ 顧客事例（ブランドサービス実績、実物サンプル）④ アフターサービス（電話 / WhatsApp ライブサポート）⑤ 透明価格（隠れた費用なし）。ZprintPro は 5 項目すべて達成、15 年以上香港と大湾区サービス。"),
                ("香港島 / 九龍 / 新界どこで印刷する？", "香港島：精品印刷、急ぎ、即時受取、価格 20-30% 高め；九龍：印刷工場集中、デザイン + 印刷結合、大量注文コスパ最高；新界：家賃低、倉庫余裕、中大量常規注文に最適；越境 / オンライン：香港注文、大湾区工場生産、SF ローカル 1 日配送、香港島店舗より 30-50% 安。"),
                ("急ぎ印刷ができる印刷会社は？", "ZprintPro は 24 時間急ぎ印刷対応、A4 コート紙チラシ / 名刺 / ステッカー最速 24 時間受取、A2 ポスター 1-2 日、大型包装箱 3-5 日。午前 11 時までにデータ確定、当日生産手配、大湾区 SF ローカル 1 日配送。"),
            ],
        },
    },
    {
        "slug": "packaging-trends",
        "category": "packaging",
        "faq": {
            "zh-hk": [
                ("2026 包裝設計最 hit 嘅趨勢？", "2026 三大主流：① 環保材質（FSC 認證 + 大豆油墨 + 可降解淋膜）② 極簡設計（單色 / 雙色 + 大面積留白 + 燙金點睛）③ 個性化（消費者名字 / QR Code 互動 / NFT 認證）。智印雲 100+ 環保盒型 + 5 種極簡工藝組合,小批量 100 個起印。"),
                ("環保包裝真係有用？", "環保包裝不僅是 ESG 形象,實際商業價值：① 消費者 67% 願意為環保包裝付 5-10% 溢價（尼爾森 2025）② 歐盟 PPWR 2026 強制要求 65% 包裝可回收 ③ 跨境電商海關綠色通道優先放行。智印雲 FSC + 大豆油墨 + 環保盒型已成熟量產。"),
                ("小批量客製包裝要點起步？", "小批量客製包裝 4 步：① 確定盒型 + 尺寸（書型 / 摺盒 / 磁吸 / 天地蓋）② 選材質（白卡 / 牛皮 / 特種）③ 設計圖稿（提供 AI / CDR 矢量檔）④ 印前打樣（數碼樣 / 柯式樣）。智印雲 100 個起印,7 天交貨,免費打樣。"),
            ],
            "en": [
                ("2026 packaging design trends?", "2026 three major trends: ① Eco materials (FSC certified + soy ink + biodegradable lamination) ② Minimalist design (single/duo tone + large white space + foil accent) ③ Personalization (consumer names / QR code interaction / NFT certification). ZprintPro 100+ eco box types + 5 minimalist finish combos, small batch 100 pieces minimum."),
                ("Is eco packaging really useful?", "Eco packaging is not just ESG image, real business value: ① 67% consumers willing to pay 5-10% premium for eco packaging (Nielsen 2025) ② EU PPWR 2026 mandates 65% packaging recyclable ③ Cross-border e-commerce customs green channel priority. ZprintPro FSC + soy ink + eco box types are mature in mass production."),
                ("Small-batch custom packaging startup?", "Small-batch custom packaging 4 steps: ① Determine box type + size (book-style/folding/magnetic/lid-base) ② Choose material (white card/kraft/specialty) ③ Design artwork (provide AI/CDR vector) ④ Pre-press proofing (digital/offset sample). ZprintPro 100 pieces minimum, 7-day delivery, free proofing."),
            ],
            "ja": [
                ("2026 年のパッケージデザイントレンドは？", "2026 年三大トレンド：① エコ素材（FSC 認証 + 大豆インク + 生分解性ラミネート）② ミニマリストデザイン（単色 / 2 色 + 大きな余白 + 箔押しアクセント）③ パーソナライズ（消費者名 / QR コードインタラクション / NFT 認証）。ZprintPro は 100 種類以上のエコ箱型 + 5 種類のミニマリスト加工コンボ、小ロット 100 個から。"),
                ("エコ包装は本当に効果がありますか？", "エコ包装は単なる ESG イメージではなく、実際のビジネス価値：① 消費者の 67% がエコ包装に 5-10% プレミアムを払う意思あり（Nielsen 2025）② EU PPWR 2026 で 65% 包装リサイクルの義務化 ③ 越境 EC の通関グリーンチャネル優先。ZprintPro の FSC + 大豆インク + エコ箱型は量産化済み。"),
                ("小ロットカスタム包装の立ち上げ方は？", "小ロットカスタム包装 4 ステップ：① 箱型 + サイズ決定（貼り箱 / 組立箱 / マグネット / 天地蓋）② 素材選択（白カード / クラフト / 特殊）③ デザイン（AI / CDR ベクターファイル提供）④ 印刷前校正（デジタル / オフセットサンプル）。ZprintPro は 100 個から、7 日納品、無料校正。"),
            ],
        },
    },
]

# === 跑 content 补充 ===
total_modified = 0
total_url = 0
for loc in ["zh-hk", "en", "ja"]:
    p = ROOT / f"src/data/blog-data/{loc}.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    for orphan in ORPHANS:
        slug = orphan["slug"]
        category = orphan["category"]
        if slug not in data:
            print(f"  SKIP: {slug} not in {loc}")
            continue
        item = data[slug]
        faq_list = orphan["faq"].get(loc, [])
        if not faq_list:
            print(f"  SKIP FAQ: {slug} {loc} no faq")
            continue
        links = INTERNAL_LINKS.get(category, {}).get(loc, [])
        if not links:
            print(f"  SKIP LINKS: {slug} {loc} cat={category} no links")
            continue
        # construct extra content
        if loc == "zh-hk":
            faq_html = "\n".join(f'<p><strong>Q: {q}</strong><br/>A: {a}</p>' for q, a in faq_list)
            links_html = "\n".join(f'<li><a href="{href}" class="text-blue-600 hover:underline">{text}</a></li>' for text, href in links)
            extra = (
                f'\n<h3>常見問題 FAQ</h3>\n{faq_html}\n'
                f'<h3>相關服務 Related Services</h3>\n'
                f'<ul class="list-disc pl-5 my-3 space-y-1">{links_html}</ul>\n'
            )
        elif loc == "en":
            faq_html = "\n".join(f'<p><strong>Q: {q}</strong><br/>A: {a}</p>' for q, a in faq_list)
            links_html = "\n".join(f'<li><a href="{href}" class="text-blue-600 hover:underline">{text}</a></li>' for text, href in links)
            extra = (
                f'\n<h3>Frequently Asked Questions</h3>\n{faq_html}\n'
                f'<h3>Related Services</h3>\n'
                f'<ul class="list-disc pl-5 my-3 space-y-1">{links_html}</ul>\n'
            )
        else:
            faq_html = "\n".join(f'<p><strong>Q: {q}</strong><br/>A: {a}</p>' for q, a in faq_list)
            links_html = "\n".join(f'<li><a href="{href}" class="text-blue-600 hover:underline">{text}</a></li>' for text, href in links)
            extra = (
                f'\n<h3>よくある質問 FAQ</h3>\n{faq_html}\n'
                f'<h3>関連サービス Related Services</h3>\n'
                f'<ul class="list-disc pl-5 my-3 space-y-1">{links_html}</ul>\n'
            )
        content = item.get("content", "") or ""
        # 跳过已有 FAQ 区块
        if any(marker in content for marker in ["常見問題 FAQ", "Frequently Asked Questions", "よくある質問 FAQ"]):
            print(f"  SKIP: {slug} {loc} already has FAQ")
            continue
        new_content = content + extra
        item["content"] = new_content
        # description 微调
        if "description" in item:
            d = item["description"]
            if loc == "zh-hk" and "海報" in slug and "海報" not in d:
                item["description"] = d + " 涵蓋 A1 / A2 / A3 尺寸、銅版紙 / 美術紙材質、UV 燙金工藝及香港急件方案。"
            elif loc == "en" and "poster" in slug.lower() and "A1" not in d:
                item["description"] = d + " Covers A1/A2/A3 sizes, art paper/specialty stock, UV foil finishes, and US rush printing solutions."
            elif loc == "ja" and "ポスター" in slug and "A1" not in d:
                item["description"] = d + " A1/A2/A3 サイズ、コート紙 / 特殊紙、UV 箔押し加工、日本短期納品対応を含む。"
        wc_before = len(re.sub(r"<[^>]+>", " ", content).split())
        wc_after = len(re.sub(r"<[^>]+>", " ", new_content).split())
        total_modified += 1
        total_url += 1
        print(f"  [OK] {slug:50s} {loc:6s} {wc_before:4d}w -> {wc_after:4d}w  (+{wc_after-wc_before}w, +{len(faq_list)} FAQ, +{len(links)} links)")
    # write back
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"  >>> wrote {p.name}: {p.stat().st_size:,} bytes\n")

print(f"=== DONE: {total_modified} blogs modified, {total_url} URL writes ===")
