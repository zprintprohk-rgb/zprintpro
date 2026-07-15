/**
 * P4 BODY 重写 Phase 2 (2026-07-15)
 *
 * 5 类目级模板 × 3 locale (15 模板) × 38 SKU = 114 篇
 * 类目: ST(9) / FL(7) / PO(6) / PK(10) / PB(6)
 *
 * 设计:
 * - 类目级 shared variables (material1-3, industry1-3, faq1-4) — 1 套/类目/3 locale
 * - 每个 SKU 套类目模板, 提供自己的 short (从 products.ts 读 name_zh/en/ja)
 * - 模板用 TL (template literal), 避免 escape 问题
 * - apply 脚本用 indexOf substring (避免 §11 那个 BUG 链: valEnd+1 错位)
 */

import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const PRODUCTS_PATH = 'src/data/products.ts';
const isApply = process.argv.includes('--apply');

// ===== 5 类目级共享变量 (3 locale) =====

interface CategoryTemplate {
  en: { material1: string; material2: string; material3: string; industry1: string; industry2: string; industry3: string; faq1: string; faq1a: string; faq2: string; faq2a: string; faq3: string; faq3a: string; faq4: string; faq4a: string; usp1: string; usp2: string };
  zh: { material1: string; material2: string; material3: string; industry1: string; industry2: string; industry3: string; faq1: string; faq1a: string; faq2: string; faq2a: string; faq3: string; faq3a: string; faq4: string; faq4a: string; usp1: string; usp2: string };
  ja: { material1: string; material2: string; material3: string; industry1: string; industry2: string; industry3: string; faq1: string; faq1a: string; faq2: string; faq2a: string; faq3: string; faq3a: string; faq4: string; faq4a: string; usp1: string; usp2: string };
}

const CATEGORY_TEMPLATES: Record<string, CategoryTemplate> = {
  // ========== STICKERS ==========
  "stickers": {
    en: {
      material1: 'PVC vinyl (3.4 mil, UV-resistant ink)',
      material2: 'BOPP clear film (2.6 mil, waterproof)',
      material3: 'Coated paper (70lb, budget short-run)',
      industry1: 'pet food labels and FDA-compliant packaging',
      industry2: 'outdoor signage and equipment decals',
      industry3: 'retail product labels and DTC brand stickers',
      usp1: 'FDA-compliant adhesive (safe for indirect food contact)',
      usp2: 'SGS migration tested',
      faq1: 'How long do stickers last outdoors?',
      faq1a: 'PVC vinyl stickers last 3-5 years outdoors with matte lamination, and 1-2 years for indoor applications. BOPP film offers similar durability for transparent labels. All our sticker materials include UV-resistant ink to prevent fading under sunlight.',
      faq2: 'What is the minimum order quantity?',
      faq2a: '100 stickers minimum, with no setup fees and no plate fees. We support 50-sticker MOQ for the small-batch line. Standard quantities ship in 4 business days production plus 4-day USA delivery.',
      faq3: 'Can I get a digital proof before placing a bulk order?',
      faq3a: 'Yes — we send a free digital proof within 2 hours of file submission. You can request up to 2 free revisions. For physical samples, we offer a paid sample kit ($29) with material and finish samples shipped via DHL Express.',
      faq4: 'How fast is shipping to the US?',
      faq4a: 'Free US shipping over $99 via DHL Express (4-day delivery to the lower 48 states). For orders under $99, shipping is $9.95 flat. Rush 2-day shipping available for an additional $15. We also ship to Canada, UK, AU, and 200+ countries worldwide.',
    },
    zh: {
      material1: 'PVC 防水貼紙（3.4 mil，防 UV 油墨）',
      material2: 'BOPP 透明防水貼紙（2.6 mil，高透明）',
      material3: '銅版紙貼紙（70 磅，短期推廣用）',
      industry1: '食品標籤及 FDA 包裝',
      industry2: '戶外防水貼紙及設備貼紙',
      industry3: '零售品牌精品包裝貼紙',
      usp1: 'FDA 認可膠水（適用於間接食品接觸）',
      usp2: 'SGS 遷移測試',
      faq1: '防水貼紙戶外可維持多久？',
      faq1a: 'PVC 防水貼紙配合啞光表面處理，戶外可使用 3-5 年；室內則可達 5-7 年。BOPP 透明防水貼紙同樣耐用，特別適合玻璃及瓶身標籤。所有防水材質均使用防 UV 油墨，避免日曬褪色。',
      faq2: '最低起印量是多少？',
      faq2a: '100 張起印，無開版費、無製版費。小批量系列可低至 50 張。標準生產 3-5 個工作天，港九新界順豐速遞 1-2 個工作天送達。',
      faq3: '落單前可以先看打稿嗎？',
      faq3a: '可以 — 提交檔案後 2 小時內提供免費數碼打稿，最多可免費修改 2 次。如需實物樣本，我們提供付費樣本套裝（HK\$199）包含不同材質及表面處理的樣本，DHL 速遞送達。',
      faq4: '香港本地交收需時幾耐？',
      faq4a: '港九新界 HK\$500 以上免費順豐速遞，1-2 個工作天送達。HK\$500 以下順豐到付。辨公室及港鐵站交收同價。加急即日交收（辨公室 / 港鐵站自取）額外 HK\$50 起。澳門 / 台灣 / 海外送遞另議。',
    },
    ja: {
      material1: 'PVC ビニール（3.4 mil、UV 耐性インク）',
      material2: 'BOPP 透明フィルム（2.6 mil、防水）',
      material3: 'コート紙（70lb、短期プロモーション用）',
      industry1: '食品ラベル・FDA 準拠パッケージ',
      industry2: '屋外サイン・設備デカール',
      industry3: '小売商品ラベル・DTC ブランドステッカー',
      usp1: 'FDA 認可接着剤（間接食品接触対応）',
      usp2: 'SGS 移行テスト済み',
      faq1: 'ステッカーの屋外耐久年数は？',
      faq1a: 'PVC ビニールステッカーは屋外で 3-5 年、屋内では 1-2 年の耐久性があります。マットラミネート加工で紫外線耐性も確保。BOPP フィルムも同等の耐久性を実現し、透明ラベルに最適です。すべての素材は UV 耐性インク使用で日焼けによる色褪せを防止します。',
      faq2: '最小注文数量は？',
      faq2a: '100 枚から対応、版代・型代ゼロ。スモールバッチシリーズは 50 枚まで対応可能。標準納期は 3-5 営業日、沖縄・北海道含む日本全国送料無料、DHL 国際配送で 2-4 日納品。',
      faq3: '本注文前にデジタル校正は確認できますか？',
      faq3a: 'はい — データ提出から 2 時間以内に無料デジタル校正 PDF を提供。無料修正は 2 回まで対応可能です。実物サンプルは有償（¥2,980）で素材・加工見本セットを DHL Express でお届けします。',
      faq4: '日本への配送はどのくらいですか？',
      faq4a: '日本全国送料無料、沖縄県・北海道も同料金、DHL 国際配送で 2-4 日納品。お急ぎ便（48 時間制作 + 1 日配送）は 30% 増で対応。沖縄・北海道も追加料金一切なし。',
    },
  },
  // ========== FLYERS ==========
  "flyers": {
    en: {
      material1: '128g gloss art paper (standard flyer stock)',
      material2: '157g silk/matte coated paper (premium feel)',
      material3: '300g card stock (luxury / takeaway menus)',
      industry1: 'restaurant menus and takeout promotions',
      industry2: 'event flyers and club/concert handouts',
      industry3: 'retail product launches and grand-opening promotions',
      usp1: 'Full-color CMYK + 5th color (white ink) available',
      usp2: 'FSC-certified paper from sustainable sources',
      faq1: 'What paper weight should I choose for flyers?',
      faq1a: '128g is the standard flyer weight for most promotions. 157g silk/matte is our most popular choice — it feels premium without breaking the budget. 300g card stock is for menu cards or luxury brand handouts. We can also laminate 200g+ stock for waterproof menus.',
      faq2: 'What is the minimum order quantity?',
      faq2a: '100 flyers minimum, with no setup fees. Bulk discounts kick in at 500 / 1,000 / 5,000 / 10,000 quantities. Standard production is 4 business days plus 4-day USA delivery.',
      faq3: 'Can I get a digital proof before bulk order?',
      faq3a: 'Yes — we send a free digital proof within 2 hours of file submission. Up to 2 free revisions included. For complex layouts, we offer a $29 paid physical proof shipped via DHL Express.',
      faq4: 'How fast is shipping to the US?',
      faq4a: 'Free US shipping over $99 via DHL Express (4-day delivery). Same-day printing available for orders placed before 11am EST, with same-day courier pickup in major US cities for an additional $25.',
    },
    zh: {
      material1: '128 克光面銅版紙（標準單張紙）',
      material2: '157 克啞粉紙（中檔質感，主流選擇）',
      material3: '300 克卡紙（高級餐牌 / 厚身單張）',
      industry1: '餐廳餐牌及外賣推廣',
      industry2: '活動單張及演唱會派發',
      industry3: '零售新品發佈及開業宣傳',
      usp1: '全彩 CMYK + 第五色（白墨）可選',
      usp2: 'FSC 認證紙張，可持續來源',
      faq1: '宣傳單張應該選什麼紙重？',
      faq1a: '128 克是標準單張紙重量，適合大多數推廣用途。157 克啞粉紙是最受歡迎的中檔選擇，質感高級但成本合理。300 克卡紙適合餐牌或精品品牌宣傳。我們亦可為 200 克以上紙張加防水光膠。',
      faq2: '最低起印量是多少？',
      faq2a: '100 張起印，無開版費。500 / 1,000 / 5,000 / 10,000 數量設有階梯式折扣。標準生產 3-5 個工作天，港九新界順豐速遞 1-2 個工作天送達。',
      faq3: '落單前可以先看打稿嗎？',
      faq3a: '可以 — 提交檔案後 2 小時內提供免費數碼打稿，最多可免費修改 2 次。如需實物打稿，我們提供 HK\$199 付費實物打稿 DHL 速遞送達。',
      faq4: '香港本地交收需時幾耐？',
      faq4a: '港九新界 HK\$500 以上免費順豐速遞，1-2 個工作天送達。下午 3 時前落單可加急即日同區交收（辨公室 / 港鐵站自取），額外 HK\$80 起。',
    },
    ja: {
      material1: '128g グロスアート紙（標準フライヤーストック）',
      material2: '157g シルク / マットコート紙（プレミアム感）',
      material3: '300g カードストック（高級メニュー / カード）',
      industry1: 'レストランメニュー・テイクアウトプロモ',
      industry2: 'イベントフライヤー・クラブ/コンサート配布物',
      industry3: '小売新作発表・グランドオープン',
      usp1: 'CMYK フルカラー + 特色（ホワイトインク）対応',
      usp2: 'FSC 認証紙、持続可能な資源',
      faq1: 'フライヤーの用紙厚さはどう選べば？',
      faq1a: '128g はプロモ用の標準。157g シルク / マットは当店一番人気 — 予算内に収まりつつ質感も高い。300g カードは高級メニューやブランド配布物に最適。200g 以上のラミネート加工で防水メニューも対応可能。',
      faq2: '最小注文数量は？',
      faq2a: '100 枚から対応、版代ゼロ。500 / 1,000 / 5,000 / 10,000 数量で段階割引あり。標準納期は 3-5 営業日、DHL 国際配送で 2-4 日納品。',
      faq3: '本注文前にデジタル校正は確認できますか？',
      faq3a: 'はい — データ提出から 2 時間以内に無料デジタル校正 PDF を提供。無料修正は 2 回まで対応。複雑なレイアウトには有償（¥2,980）実物校正を DHL Express で対応。',
      faq4: '日本への配送はどのくらいですか？',
      faq4a: '日本全国送料無料、沖縄県・北海道も同料金、DHL 国際配送で 2-4 日納品。お急ぎ便（同日制作 + 即日配送）は 50% 増で対応可能。',
    },
  },
  // ========== POSTERS ==========
  "posters": {
    en: {
      material1: '200g gloss art paper (standard indoor poster)',
      material2: '250g matte art paper (premium indoor / gallery)',
      material3: 'PVC poster (waterproof outdoor, UV-resistant ink)',
      industry1: 'event promotion and concert/exhibition posters',
      industry2: 'retail in-store displays and product launches',
      industry3: 'photography prints and fine art reproduction',
      usp1: 'Giclée-quality 1200 DPI print available for fine art',
      usp2: 'FSC-certified paper from sustainable sources',
      faq1: 'What size posters are available?',
      faq1a: 'Standard sizes: A4 (210x297mm), A3 (297x420mm), A2 (420x594mm), A1 (594x841mm), A0 (841x1189mm), and US Letter / Tabloid / 24"x36". Custom sizes up to 44" wide available on PVC stock. We also offer die-cut custom shapes for any size.',
      faq2: 'What is the minimum order quantity?',
      faq2a: '50 posters minimum (no setup fees). Bulk discounts at 100 / 500 / 1,000 quantities. Standard production is 4 business days plus 4-day USA delivery.',
      faq3: 'Can I get a digital proof before bulk order?',
      faq3a: 'Yes — free digital proof within 2 hours. Up to 2 free revisions. For exact color matching (e.g. brand Pantone), we offer a paid $29 physical proof shipped via DHL Express.',
      faq4: 'Are posters suitable for outdoor use?',
      faq4a: 'Our standard 200g / 250g coated paper posters are for indoor use (last 1-2 years with proper framing). For outdoor / window / wet-area use, choose PVC poster stock with UV-resistant ink — outdoor durability 2-3 years.',
    },
    zh: {
      material1: '200 克光面銅版紙（標準室內海報）',
      material2: '250 克啞粉紙（高級室內 / 畫廊用）',
      material3: 'PVC 防水海報（戶外用，防 UV 油墨）',
      industry1: '活動宣傳及演唱會/展覽海報',
      industry2: '零售店內陳列及產品發佈',
      industry3: '攝影作品及藝術品複印',
      usp1: 'Giclée 級 1200 DPI 印刷（藝術品級）',
      usp2: 'FSC 認證紙張，可持續來源',
      faq1: '海報有哪些尺寸可選？',
      faq1a: '標準尺寸：A4（210x297mm）、A3（297x420mm）、A2（420x594mm）、A1（594x841mm）、A0（841x1189mm）、及 US Letter / Tabloid / 24"x36"。PVC 紙材最大支援 44 吋闊度。另可按需製作不規則異形切割。',
      faq2: '最低起印量是多少？',
      faq2a: '50 張起印（無開版費）。100 / 500 / 1,000 數量設有階梯式折扣。標準生產 3-5 個工作天，港九新界順豐速遞 1-2 個工作天送達。',
      faq3: '落單前可以先看打稿嗎？',
      faq4: '海報適合戶外使用嗎？',
      faq4a: '200 克 / 250 克銅版紙海報適用於室內（配合裱框可使用 1-2 年）。戶外、窗戶、潮濕環境使用，請選 PVC 海報紙材配防 UV 油墨，戶外耐久 2-3 年。',
    },
    ja: {
      material1: '200g グロスアート紙（標準屋内ポスター）',
      material2: '250g マットアート紙（プレミアム屋内・ギャラリー）',
      material3: 'PVC ポスター（防水屋外、UV 耐性インク）',
      industry1: 'イベントプロモ・コンサート/展示ポスター',
      industry2: '小売店内ディスプレイ・商品発表',
      industry3: '写真プリント・アート複製',
      usp1: 'Giclée 品質 1200 DPI 印刷対応',
      usp2: 'FSC 認証紙、持続可能な資源',
      faq1: 'ポスターのサイズは？',
      faq1a: '標準サイズ：A4（210x297mm）、A3（297x420mm）、A2（420x594mm）、A1（594x841mm）、A0（841x1189mm）、US Letter / Tabloid / 24"x36"。PVC 紙で最大 44 インチ幅対応。オリジナルダイカット形状も対応可能。',
      faq2: '最小注文数量は？',
      faq2a: '50 枚から対応（版代ゼロ）。100 / 500 / 1,000 数量で段階割引。標準納期は 3-5 営業日、DHL 国際配送で 2-4 日納品。',
      faq3: '本注文前にデジタル校正は確認できますか？',
      faq3a: 'はい — 無料デジタル校正 2 時間以内。無料修正 2 回まで。ブランド Pantone 合わせなど精密色校正は有償（¥2,980）実物校正を DHL Express で対応。',
      faq4: '屋外使用は可能ですか？',
      faq4a: '200g / 250g コート紙ポスターは屋内向け（額装で 1-2 年）。屋外・窓際・湿潤環境では PVC 紙材 + UV 耐性インクをお選びください。屋外耐久 2-3 年。',
    },
  },
  // ========== PACKAGING (BOXES) ==========
  "packaging": {
    en: {
      material1: '350g coated card with matte lamination (standard box)',
      material2: 'Corrugated B-flute (heavy-duty shipping box)',
      material3: 'Rigid setup box with magnetic closure (premium gift)',
      industry1: 'gift packaging and luxury retail boxes',
      industry2: 'cosmetic and skincare product packaging',
      industry3: 'DTC e-commerce shipping and subscription boxes',
      usp1: 'FSC-certified paper, soy-based ink',
      usp2: 'FDA-safe for indirect food contact (food-grade options)',
      faq1: 'What box styles are available?',
      faq1a: 'Tuck-end boxes (auto-lock, straight tuck, reverse tuck), setup boxes (rigid lid-and-base), magnetic closure boxes, drawer/slider boxes, mailer boxes (corrugated), and custom die-cut shapes. We provide free dieline templates for all standard styles.',
      faq2: 'What is the minimum order quantity?',
      faq2a: '100 boxes minimum (no setup fees, no die fees for standard sizes). Custom sizes / die-cut MOQ is 500. Standard production 5-7 business days plus 4-day USA delivery.',
      faq3: 'Can I get a 3D mockup before bulk order?',
      faq3a: 'Yes — we send a free 3D render within 4 hours of file submission. For physical samples, we offer a paid sample pack ($49) shipped via DHL Express with your custom design on the actual box stock.',
      faq4: 'Are the boxes safe for food products?',
      faq4a: 'Our food-grade box options use FDA-safe adhesive and food-contact-safe inks, certified for indirect food contact (oatmeal, tea, chocolate, snacks). For direct food contact (candy bars, fresh fruit), we offer specialized food-grade linings. Share your food product type and we will recommend the right stock.',
    },
    zh: {
      material1: '350 克光面卡紙配啞光膠（標準盒）',
      material2: 'B 楞瓦楞紙（重型運輸箱）',
      material3: '硬身禮盒配磁石蓋（高級禮品）',
      industry1: '禮品包裝及精品零售盒',
      industry2: '化妝品及護膚品包裝',
      industry3: 'DTC 電商運輸及訂閱制禮盒',
      usp1: 'FSC 認證紙張，大豆油墨',
      usp2: 'FDA 認可（適用於間接食品接觸）',
      faq1: '包裝盒有哪些款式可選？',
      faq1a: '插口盒（自動扣、直插、反插）、硬身盒（上下蓋）、磁石蓋禮盒、抽屜式盒、瓦楞運輸箱、及不規則異形切割盒。所有標準款式均提供免費刀模線模板下載。',
      faq2: '最低起印量是多少？',
      faq2a: '100 個起印（標準尺寸無開版費、無刀模費）。自訂尺寸 / 異形切割起印量為 500 個。標準生產 5-7 個工作天，港九新界順豐速遞 1-2 個工作天送達。',
      faq3: '落單前可以先看 3D 模擬圖嗎？',
      faq3a: '可以 — 提交檔案後 4 小時內提供免費 3D 渲染圖。如需實物樣本，我們提供 HK\$299 付費樣本套裝，DHL 速遞送達，含您的設計印在實際盒材上。',
      faq4: '包裝盒適合食品接觸嗎？',
      faq4a: '我們的食品級包裝盒使用 FDA 認可膠水及食品接觸安全油墨，認證適用於間接食品接觸（燕麥、茶、巧克力、零食）。直接食品接觸（糖果、新鮮水果），我們提供專業食品級內襯。請告知食品類型，我們會推薦合適紙材。',
    },
    ja: {
      material1: '350g コート紙 + マットラミネート（標準箱）',
      material2: 'B フルート段ボール（強化配送箱）',
      material3: '硬質セットアップ箱 + マグネット蓋（プレミアムギフト）',
      industry1: 'ギフトパッケージ・高級小売箱',
      industry2: '化粧品・スキンケア製品パッケージ',
      industry3: 'DTC EC 配送・サブスクリプションボックス',
      usp1: 'FSC 認証紙、大豆油性インク',
      usp2: 'FDA セーフ（間接食品接触対応）',
      faq1: 'どんな箱スタイルが対応可能ですか？',
      faq1a: 'Tuck-end 箱（オートロック、ストレートタック、リバースタック）、セットアップ箱（硬質蓋底）、マグネット蓋箱、引き出し式箱、宅配段ボール箱、オリジナルダイカット形状。すべての標準スタイルに無料型紙テンプレートをご用意。',
      faq2: '最小注文数量は？',
      faq2a: '100 個から（標準サイズ版代・型代ゼロ）。カスタムサイズ / ダイカットは 500 個から。標準納期 5-7 営業日、DHL 国際配送で 2-4 日納品。',
      faq3: '本注文前に 3D モックアップは見られますか？',
      faq3a: 'はい — データ提出から 4 時間以内に無料 3D レンダリングをお届け。実物サンプルは有償（¥4,980）で DHL Express にて、お客様デザイン実物印刷入りでお届け。',
      faq4: '食品接触対応ですか？',
      faq4a: '食品グレード箱は FDA セーフ接着剤と食品接触対応インク使用、間接食品接触（オートミール、茶、チョコ、スナック）認証済み。直接食品接触（キャンディ、フルーツ）は専用食品グレードライニング対応。食品種別をお知らせいただければ最適素材をご提案します。',
    },
  },
  // ========== PAPER BAGS ==========
  "paper-bags": {
    en: {
      material1: 'Brown kraft paper 150g (eco-friendly standard)',
      material2: 'White card stock 210g (premium retail)',
      material3: 'Art paper 170g with matte lamination (luxury gift)',
      industry1: 'retail shopping bags and boutique packaging',
      industry2: 'gift bags and event giveaways',
      industry3: 'restaurant takeaway and food delivery bags',
      usp1: 'FSC-certified paper, 100% recyclable',
      usp2: 'Reinforced twisted-paper or cotton cord handles',
      faq1: 'What sizes and handle types are available?',
      faq1a: 'Standard sizes: Small (8"x10"), Medium (12"x14"), Large (16"x18"), and Custom (any size up to 24"x24"). Handle options: Twisted paper cord (eco), Cotton cord (premium feel), Ribbon (luxury), and Flat tape (extra-durable for heavy items).',
      faq2: 'What is the minimum order quantity?',
      faq2a: '100 bags minimum. Standard production 5-7 business days plus 4-day USA delivery. Bulk discounts at 500 / 1,000 / 5,000 quantities.',
      faq3: 'Can I get a 3D mockup before bulk order?',
      faq3a: 'Yes — free 3D render within 4 hours. For physical samples, we offer a paid sample pack ($29) with material and handle samples shipped via DHL Express.',
      faq4: 'Are paper bags food-safe?',
      faq4a: 'Our kraft paper bags use food-grade ink and are safe for indirect food contact (bakery, takeaway, dry snacks). For hot food / grease / liquid, we offer inner PE or PLA bio-lining at an additional 15-20%.',
    },
    zh: {
      material1: '150 克牛皮紙（環保標準）',
      material2: '210 克白卡紙（高級零售）',
      material3: '170 克銅版紙配啞光膠（精品禮品）',
      industry1: '零售購物袋及精品店包裝',
      industry2: '禮品袋及活動贈品',
      industry3: '餐廳外賣及食品外送袋',
      usp1: 'FSC 認證紙張，100% 可回收',
      usp2: '加強扭紙繩或棉繩手挽',
      faq1: '紙袋有哪些尺寸及手挽款式可選？',
      faq1a: '標準尺寸：細碼（8"x10"）、中碼（12"x14"）、大碼（16"x18"）、自訂（最大 24"x24"）。手挽款式：扭紙繩（環保）、棉繩（高級感）、絲帶（精品）、平面織帶（重型載重耐用）。',
      faq2: '最低起印量是多少？',
      faq2a: '100 個起印。標準生產 5-7 個工作天，港九新界順豐速遞 1-2 個工作天送達。500 / 1,000 / 5,000 數量設有階梯式折扣。',
      faq3: '落單前可以先看 3D 模擬圖嗎？',
      faq3a: '可以 — 提交檔案後 4 小時內提供免費 3D 渲染圖。如需實物樣本，我們提供 HK\$199 付費樣本套裝，含不同材質及手挽的樣本，DHL 速遞送達。',
      faq4: '紙袋適合食品接觸嗎？',
      faq4a: '我們的牛皮紙袋使用食品級油墨，適用於間接食品接觸（麵包、外賣、乾零食）。如需盛載熱食、油脂、液體，我們提供 PE 或 PLA 生物內襯，加收 15-20%。',
    },
    ja: {
      material1: '茶色クラフト紙 150g（エコ標準）',
      material2: '白カード 210g（プレミアム小売）',
      material3: 'アート紙 170g + マットラミネート（高級ギフト）',
      industry1: '小売ショッピングバッグ・ブティックパッケージ',
      industry2: 'ギフトバッグ・イベント景品',
      industry3: 'レストラン テイクアウト・食品配達バッグ',
      usp1: 'FSC 認証紙、100% リサイクル可能',
      usp2: '強化つなぎ紙・綿コードハンドル',
      faq1: 'サイズとハンドル種類は？',
      faq1a: '標準サイズ：S（8"x10"）、M（12"x14"）、L（16"x18"）、カスタム（最大 24"x24"）。ハンドル：つなぎ紙（エコ）、綿コード（プレミアム感）、リボン（高級）、平テープ（重量物対応）。',
      faq2: '最小注文数量は？',
      faq2a: '100 個から対応。標準納期 5-7 営業日、DHL 国際配送で 2-4 日納品。500 / 1,000 / 5,000 数量で段階割引。',
      faq3: '本注文前に 3D モックアップは見られますか？',
      faq3a: 'はい — 無料 3D レンダリング 4 時間以内。実物サンプルは有償（¥2,980）で素材・ハンドル見本セットを DHL Express でお届け。',
      faq4: '食品接触対応ですか？',
      faq4a: 'クラフト紙袋は食品グレードインク使用、間接食品接触（ベーカリー、テイクアウト、乾物スナック）対応。熱食品 / 油脂 / 液体向けには PE または PLA バイオライニングを 15-20% 増で承ります。',
    },
  },
};

// ===== Body templates (3 locale) =====

function buildEnBody(short: string, catSlug: string, t: CategoryTemplate['en']): string {
  return `Custom ${short.toLowerCase()} designed for US small business, DTC brands, and cross-border e-commerce. Free design mockup, no setup fees, and Free Shipping on US orders over \$99. Every order ships from our Asia factory with 4-day delivery to the lower 48 states. ISO 9001 certified production with full FDA compliance where applicable.

${short} are widely used across ${t.industry1}, ${t.industry2}, and ${t.industry3} — whether you are launching a new product line, refreshing your retail shelf presence, or shipping promotional materials to a nationwide customer base. The ${catSlug.replace(/-/g, ' ')} market rewards brands that ship fast, iterate often, and stay under tight unit-cost targets — that is exactly what our ${short.toLowerCase()} service is built for.

Material options include ${t.material1} for everyday high-volume use, ${t.material2} for premium applications, and ${t.material3} for specialty projects. All three are ${t.usp1} and ${t.usp2}, so you can ship into the US market without compliance friction. Print finishes include matte lamination, gloss lamination, spot UV, foil stamping, and full-color CMYK plus white ink where supported.

Submit print-ready files (300 DPI, CMYK, 3mm bleed, outlined fonts) and we ship a free digital proof within 2 hours. If you do not have design files yet, our in-house design team will mock up your concept at no charge — just share your brand colors, logo, and any reference photos via WhatsApp. We also offer free dieline templates for every standard size.

Pricing is transparent: 100-piece minimum, no setup fees, no plate fees, and Free Shipping on US orders over \$99. Standard turnaround is 4 business days for production plus 4-day USA delivery. Rush orders (24-hour proof plus 2-day production) available for an additional 20%. Get an instant quote via the 30-second AI estimator on the product page, or message us on WhatsApp for a custom run.

**FAQ**

**Q1: ${t.faq1}**
${t.faq1a}

**Q2: ${t.faq2}**
${t.faq2a}

**Q3: ${t.faq3}**
${t.faq3a}

**Q4: ${t.faq4}**
${t.faq4a}

Ready to print? Get a free digital proof in 2 hours — WhatsApp us at +1 982 808 5133 or use the 30-second AI quote button on this page. Same-day USA pickup available for orders placed before 11 AM EST in major US cities.`;
}

function buildZhBody(short: string, catSlug: string, t: CategoryTemplate['zh']): string {
  return `${short} 專為香港中小企、本地餐廳及跨境電商品牌設計。100 張起印，無開版費，港九新界 \$500 以上免費順豐本地速遞，辨公室 / 港鐵站交收。ISO 9001 認證工廠，${t.usp1}，${t.usp2}，15+ 年印刷經驗。

${short} 廣泛應用於 ${t.industry1}、${t.industry2}、${t.industry3} 等本地場景。無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，${short} 都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。

材質選擇包括 ${t.material1}（標準用途，性價比高）、${t.material2}（中檔質感，主流選擇）、${t.material3}（特殊需求或精品用途）。三種材質均通過 ${t.usp1} 及 ${t.usp2} 認證。表面處理可選啞光膠、亮面膠、局部 UV、燙金，全部支援 CMYK 全彩印刷及專色白墨（如適用）。

交稿規範：300 DPI、CMYK 色彩模式、3mm 出血、字體外框化。提交檔案後 2 小時內提供免費數碼打稿。如未有設計檔案，我們專業設計團隊免費為您打稿，只需透過 WhatsApp 提供品牌顏色、Logo 及參考圖片。每個標準尺寸均提供免費刀模線模板下載。

收費透明：100 張起印，無開版費、無製版費，港九新界 \$500 以上免費順豐速遞。標準生產 3-5 個工作天，加急訂單（24 小時打稿 + 2 天生產）加收 20%。即時網上報價 30 秒完成，或 WhatsApp 聯絡客服索取度身訂造方案。

**常見問題**

**Q1: ${t.faq1}**
${t.faq1a}

**Q2: ${t.faq2}**
${t.faq2a}

**Q3: ${t.faq3}**
${t.faq3a}

**Q4: ${t.faq4}**
${t.faq4a}

準備落單？2 小時免費打稿 — WhatsApp 客服 +852 9810 1133 或點擊頁面「30 秒 AI 報價」按鈕。`;
}

function buildJaBody(short: string, catSlug: string, t: CategoryTemplate['ja']): string {
  return `カスタム ${short.toLowerCase()} — 日本市場向け高品質短納期印刷サービス。100 枚から対応、${t.usp1}、${t.usp2}。沖縄県・北海道も追加料金なし。ISO 9001 認証工場、DHL 国際配送で 2-4 日納品、15+ 年の印刷実績。

${short} は ${t.industry1}、${t.industry2}、${t.industry3} の日本市場で広く活用されています。新商品ラインの立ち上げ、小売棚での存在感をリフレッシュ、全国顧客への販促物配送など、同人・D2C・中小企業いずれの用途にも対応。${catSlug.replace(/-/g, ' ')} 市場は「迅速な納品」「頻繁な改善」「厳格な単価管理」を評価します — これはまさに ${short.toLowerCase()} サービスの設計思想です。

素材は ${t.material1}（日常大量使用）、${t.material2}（プレミアム用途、主力選択）、${t.material3}（特殊プロジェクト）の 3 種類。すべて ${t.usp1} および ${t.usp2} 認証取得。表面仕上げはマットラミネート、グロスラミネート、スポット UV、ホイル押し対応。CMYK フルカラー印刷および透明地用ホワイトインクに対応。

入稿仕様：300 DPI、CMYK モード、3mm 塗り足し、フォントはアウトライン化。データ提出から 2 時間以内に無料デジタル校正 PDF を提供。デザインファイルがない場合は、LINE でブランドカラー・ロゴ・参考画像をお送りいただければ、無料で制作サポート。各標準サイズに無料型紙テンプレートを用意。

料金透明：100 枚から、版代・型代ゼロ。沖縄県・北海道含む日本全国送料無料、${catSlug.replace(/-/g, ' ')} 業界最安水準。標準納期は 3-5 営業日、お急ぎ便（24 時間校正 + 2 日制作）は 20% 増。商品ページの 30 秒 AI 見積もりボタンで即時お見積もり、LINE お問い合わせでカスタム対応。

**よくある質問**

**Q1: ${t.faq1}**
${t.faq1a}

**Q2: ${t.faq2}**
${t.faq2a}

**Q3: ${t.faq3}**
${t.faq3a}

**Q4: ${t.faq4}**
${t.faq4a}

ご注文はこちら — 2 時間で無料デジタル校正、LINE お問い合わせ または商品ページの「30 秒 AI 見積もり」ボタンから。`;
}

// ===== Read products.ts to extract short names (multi-line parser for SKUs spanning multiple lines) =====

function getShortNames(): Record<string, { en: string; ja: string; cat: string; zh: string }> {
  const products = readFileSync(PRODUCTS_PATH, 'utf-8');
  const lines = products.split('\n');
  const result: Record<string, { en: string; ja: string; cat: string; zh: string }> = {};
  let cur: { slug: string; en?: string; ja?: string; zh?: string; cat?: string } | null = null;
  function saveCur() {
    if (cur?.slug && cur.cat) {
      // Use name (zh-hk short) and split('|') for en/ja, fall back to title_zh for zh
      const nameMatch = (cur as any).name || '';
      const nameParts = nameMatch.split('|')[0].trim();
      const zhShort = nameParts && /[一-鿿]/.test(nameParts) ? nameParts : (cur.zh || '').split('|')[0].trim();
      result[cur.slug] = {
        en: (cur.en || '').split('|')[0].trim(),
        ja: (cur.ja || '').split('|')[0].trim(),
        zh: zhShort,
        cat: cur.cat,
      };
    }
  }
  for (const line of lines) {
    const slugMatch = line.match(/^\s*slug:\s*'([^']+)'/);
    if (slugMatch) {
      saveCur();
      cur = { slug: slugMatch[1] };
      continue;
    }
    if (!cur) continue;
    // Check all 5 fields in a single pass (lines like L1852 have name+nameEn+nameJa+title_zh on one line)
    const catMatch = line.match(/^\s*category:\s*'([^']+)'/);
    if (catMatch) cur.cat = catMatch[1];
    const nameMatch = line.match(/\bname:\s*'([^']+)'/);
    if (nameMatch) (cur as any).name = nameMatch[1];
    const enMatch = line.match(/\bnameEn:\s*'([^']+)'/);
    if (enMatch) cur.en = enMatch[1];
    const jaMatch = line.match(/\bnameJa:\s*'([^']+)'/);
    if (jaMatch) cur.ja = jaMatch[1];
    const zhMatch = line.match(/\btitle_zh:\s*'([^']+)'/);
    if (zhMatch) cur.zh = zhMatch[1];
  }
  saveCur();
  return result;
}

// ===== Apply: write body field into sku-seo-data.ts =====

function applyToFile(slug: string, catSlug: string, enBody: string, zhBody: string, jaBody: string, startContent: string): string {
  let content = startContent;
  const slugIdx = content.indexOf(`"${slug}":`);
  if (slugIdx < 0) throw new Error(`SKU not found: ${slug}`);

  // Find the seo block
  const seoIdx = content.indexOf('"seo":', slugIdx);
  if (seoIdx < 0) throw new Error(`No seo block in ${slug}`);

  // For each locale, find "body": "..." and replace
  for (const [locale, body] of [['en', enBody], ['zh-hk', zhBody], ['ja', jaBody]] as const) {
    const localeKey = locale === 'zh-hk' ? 'zh-hk' : locale;
    const localeIdx = content.indexOf(`"${localeKey}":`, seoIdx);
    if (localeIdx < 0) {
      console.log(`  ! ${slug} ${locale}: locale not found`);
      continue;
    }
    const bodyIdx = content.indexOf('"body":', localeIdx);
    if (bodyIdx < 0) {
      console.log(`  ! ${slug} ${locale}: no body field`);
      continue;
    }
    // Find the start of the value (opening ")
    const valStart = content.indexOf('"', bodyIdx + 8) + 1;
    // Find the end of the value (next unescaped ")
    let valEnd = valStart;
    while (valEnd < content.length) {
      const ch = content[valEnd];
      if (ch === '\\') { valEnd += 2; continue; }
      if (ch === '"') break;
      valEnd++;
    }
    if (valEnd >= content.length) {
      console.log(`  ! ${slug} ${locale}: unterminated body`);
      continue;
    }
    // Build escaped value
    const escapedBody = body.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    content = content.substring(0, valStart) + escapedBody + content.substring(valEnd);
  }

  return content;
}

// ===== Main =====
function main() {
  const shortNames = getShortNames();
  const p0Cats = ['stickers', 'flyers', 'posters', 'packaging', 'paper-bags'];
  const p0Slugs = Object.entries(shortNames).filter(([_, v]) => p0Cats.includes(v.cat));

  console.log(`P0 SKU 数量: ${p0Slugs.length}\n`);

  let successCount = 0;
  let failedCount = 0;
  let totalChars = 0;
  const samples: string[] = [];

  let content = readFileSync(SKU_DATA_PATH, 'utf-8');

  for (const [slug, info] of p0Slugs) {
    const tmpl = CATEGORY_TEMPLATES[info.cat];
    if (!tmpl) {
      console.log(`  ! ${slug}: no template for ${info.cat}`);
      failedCount++;
      continue;
    }
    const enBody = buildEnBody(info.en, info.cat, tmpl.en);
    const zhBody = buildZhBody(info.zh, info.cat, tmpl.zh);
    const jaBody = buildJaBody(info.ja, info.cat, tmpl.ja);

    if (samples.length < 3) {
      samples.push(`\n=== ${slug} (${info.cat}) ===\nEN: ${enBody.length} chars / ${enBody.split(/\s+/).length} words\nZH-HK: ${zhBody.length} chars\nJA: ${jaBody.length} chars / ${jaBody.split(/\s+/).length} words`);
    }

    if (isApply) {
      try {
        content = applyToFile(slug, info.cat, enBody, zhBody, jaBody, content);
        totalChars += enBody.length + zhBody.length + jaBody.length;
        successCount++;
      } catch (e) {
        console.log(`  ! ${slug}: ${(e as Error).message}`);
        failedCount++;
      }
    } else {
      totalChars += enBody.length + zhBody.length + jaBody.length;
      successCount++;
    }
  }

  if (samples.length > 0) {
    console.log('=== Samples (3 SKU) ===');
    for (const s of samples) console.log(s);
  }

  console.log(`\n=== 统计 ===`);
  console.log(`SKU: ${successCount} 成功 / ${failedCount} 失败`);
  console.log(`总 body 字符: ${totalChars}`);
  console.log(`平均每篇: ${Math.round(totalChars / (successCount * 3))} chars`);

  if (isApply) {
    writeFileSync(SKU_DATA_PATH, content, 'utf-8');
    console.log(`\n✅ 已写入 ${SKU_DATA_PATH}`);
  } else {
    console.log(`\n✅ DRY-RUN 模式: 等 user 拍板后跑 --apply`);
  }
}

main();
