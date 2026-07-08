/**
 * Category Industry Scenario Cards — 服务行业与应用场景 v2
 * PM + UX/UI 双重优化（2026-07-09）
 *
 * 设计决策:
 * 1. 合并 pills + blog cards → 统一 industry-scenario card，每张含:
 *    - 行业名（本地化）
 *    - 2-3 典型应用场景（为什么这个品类适合该行业）
 *    - Tier 标记 + CTA（有博客=真链接，无=placeholder badge）
 * 2. 视觉分层:
 *    - Tier A: 蓝色渐变 accent + "主力行業" badge
 *    - Tier B: 琥珀色 accent + "次鋪行業" badge
 *    - 未覆盖: 灰色 + "即將推出" badge
 * 3. 响应式: 1col mobile → 2col tablet → 3col desktop (max-w-[1320px] 约束下)
 * 4. 3 locale 完整覆盖 (zh-hk / en / ja)
 *
 * 数据源: src/lib/seo.ts CATEGORY_INDUSTRIES + page.tsx categoryCoveredBlogSlugsMap
 */

import { CATEGORY_INDUSTRIES, Locale } from '@/lib/seo';

// ============================================================================
// Industry Scenario Descriptions — 每个行业的典型场景 (per locale)
// PM 研究: 基于 GSC 真实查询 + 行业需求文档
// ============================================================================

interface IndustryScenario {
  /** English key for internal mapping */
  key: string;
  /** Scenarios per locale — the "why this category fits this industry" hooks */
  scenarios: Record<'zh-hk' | 'en' | 'ja', string[]>;
  /** Priority within category (0=most important) */
  priority: number;
  /** Tier */
  tier: 'A' | 'B';
}

// Category → Industry Scenarios mapping
// Each industry gets 2-3 "use case bullets" that explain WHY this printing category
// is relevant to that industry — not generic marketing fluff but specific pain-point hooks.
const categoryIndustryScenarios: Record<string, IndustryScenario[]> = {
  stickers: [
    {
      key: 'pet_food',
      scenarios: {
        'zh-hk': ['防水防油 FDA 食品級標籤', '異形模切吸引貨架目光', '100 張起印 · 即日打樣'],
        en: ['Waterproof FDA-grade food labels', 'Die-cut shapes for shelf appeal', 'From 100 sheets · same-day proof'],
        ja: ['防水・耐油 FDA 食品グレードラベル', 'ダイカットで棚の注目度アップ', '100枚から・即日サンプル'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'pharma',
      scenarios: {
        'zh-hk': ['GMP 認證防偽追溯標籤', '耐高低溫 · 長期不褪色', '安全封條 + 二維碼溯源'],
        en: ['GMP-certified anti-counterfeit labels', 'Temperature-resistant · long-life color', 'Tamper-evident + QR traceability'],
        ja: ['GMP認証・偽造防止ラベル', '耐温度・長期退色なし', '改ざん防止 + QRトレーサビリティ'],
      },
      priority: 1, tier: 'B',
    },
    {
      key: 'beauty',
      scenarios: {
        'zh-hk': ['燙金 LOGO · 啞光質感', '透明貼紙展示玻璃瓶身', '小批量試產 50 張起'],
        en: ['Foil stamped logo · matte finish', 'Transparent stickers for glass bottles', 'Small batch from 50 sheets'],
        ja: ['箔押しロゴ・マット仕上げ', '透明ステッカーでガラス瓶を見せる', '50枚からの小ロット試作'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'ecommerce',
      scenarios: {
        'zh-hk': ['SKU 條碼標籤 + GS1 合規', '跨境物流防水耐磨', '可移除背膠 · 不留殘膠'],
        en: ['SKU barcode labels + GS1 compliance', 'Cross-border waterproof & durable', 'Removable adhesive · no residue'],
        ja: ['SKUバーコード + GS1準拠', '越境物流・防水耐久', '再剥離タイプ・跡残りなし'],
      },
      priority: 3, tier: 'A',
    },
    {
      key: 'beverage',
      scenarios: {
        'zh-hk': ['啤酒/飲料瓶防水標籤', '冰桶浸泡不脫落', '螢光色 + 反光可選'],
        en: ['Beer/beverage waterproof labels', 'Ice-bucket proof adhesion', 'Fluorescent & reflective options'],
        ja: ['ビール・飲料ボトル防水ラベル', 'アイスバケツでも剥がれない', '蛍光・反射オプション'],
      },
      priority: 4, tier: 'A',
    },
  ],
  flyers: [
    {
      key: 'restaurant',
      scenarios: {
        'zh-hk': ['A5 外賣菜單 + 開業傳單', '防水塗層 · 油漬一抹即淨', '500 張起 · 翌日交貨'],
        en: ['A5 takeaway menu + opening flyer', 'Waterproof coating · wipe-clean', 'From 500 · next-day delivery'],
        ja: ['A5テイクアウトメニュー + 開業チラシ', '防水コート・油汚れも拭き取り', '500枚から・翌日納品'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'real_estate',
      scenarios: {
        'zh-hk': ['A4 樓盤單張 · 高光銅版紙', '地圖/平面圖高清印刷', '區內派發 + 信箱投遞'],
        en: ['A4 property flyer · glossy art paper', 'HD floor plan printing', 'District distribution + mailbox drops'],
        ja: ['A4物件チラシ・高光沢コート紙', '間取り図の高精細印刷', 'エリア配布 + ポスト投函'],
      },
      priority: 1, tier: 'B',
    },
    {
      key: 'education',
      scenarios: {
        'zh-hk': ['補習社招生單張 · A4 雙面', '課程表 + 師資亮點一目了然', '校門派發 · 家長日推廣'],
        en: ['Tutoring enrollment flyer · A4 duplex', 'Course schedule + teacher highlights', 'School gate distribution'],
        ja: ['塾の募集チラシ・A4両面', 'カリキュラム + 講師紹介が一目で', '校門前配布・保護者会'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'events',
      scenarios: {
        'zh-hk': ['展會/市集推廣單張', '摺頁設計 · 資訊量大', '三日內急件趕工'],
        en: ['Exhibition/market promo flyer', 'Folded leaflet · high info density', '3-day rush production'],
        ja: ['展示会・マルシェ販促チラシ', '折込デザイン・情報量多め', '3日以内の急ぎ対応'],
      },
      priority: 3, tier: 'A',
    },
    {
      key: 'wedding',
      scenarios: {
        'zh-hk': ['婚禮喜帖 + 婚宴流程卡', '燙金/壓紋精緻工藝', '50 張起 · 專屬定制'],
        en: ['Wedding invitation + banquet card', 'Foil/embossed fine finishing', 'From 50 · bespoke design'],
        ja: ['結婚招待状 + 披露宴スケジュール', '箔押し・エンボス加工', '50枚から・専用デザイン'],
      },
      priority: 4, tier: 'B',
    },
  ],
  packaging: [
    {
      key: 'beauty',
      scenarios: {
        'zh-hk': ['磁吸翻蓋化妝品盒 · 4 種盒型', '燙金 LOGO + 內托定制', '30 個起印 · FDA 級安全'],
        en: ['Magnetic flip cosmetic box · 4 styles', 'Foil logo + custom insert tray', 'From 30 units · FDA-grade'],
        ja: ['磁石式化粧品箱・4種の箱型', '箔押しロゴ + 内トレイカスタム', '30個から・FDA基準'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'ecommerce',
      scenarios: {
        'zh-hk': ['跨境電商快遞盒 · 抗壓E坑', 'DHL 2-4 天全球送達', '100 個起 · 出口合規'],
        en: ['Cross-border mailer box · E-flute crushproof', 'DHL 2-4 day global delivery', 'From 100 · export compliant'],
        ja: ['越境EC配送箱・Eフルート耐圧', 'DHL 2-4日グローバル配送', '100個から・輸出対応'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'tea_beverage',
      scenarios: {
        'zh-hk': ['茶飲品牌禮盒 · 天地蓋+抽屜式', 'FSC 環保紙 + 食品級內襯', '節日限定款 50 個起'],
        en: ['Tea brand gift box · rigid + drawer style', 'FSC eco paper + food-grade liner', 'Seasonal edition from 50'],
        ja: ['茶ブランドギフト箱・天地蓋+引出式', 'FSCエコ紙 + 食品グレード内装', '季節限定50個から'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'real_estate',
      scenarios: {
        'zh-hk': ['豪宅樓書資料匣 · 硬皮精裝', '燙銀 LOGO + 絲帶揭蓋', '高級感開箱體驗'],
        en: ['Luxury property brochure box · hardcover', 'Silver foil logo + ribbon lid', 'Premium unboxing experience'],
        ja: ['高級物件パンフレットボックス・上製本', '銀箔ロゴ + リボン蓋', '高級感のある開封体験'],
      },
      priority: 3, tier: 'B',
    },
  ],
  'paper-bags': [
    {
      key: 'apparel',
      scenarios: {
        'zh-hk': ['服飾品牌購物袋 · 白卡/牛皮紙', '燙金 LOGO + 棉繩手挽', '500 個起 · FSC 認證'],
        en: ['Apparel brand shopping bag · white/kraft card', 'Foil logo + cotton rope handle', 'From 500 · FSC certified'],
        ja: ['アパレルブランドショッパー・白/クラフト', '箔押しロゴ + 綿ロープハンドル', '500枚から・FSC認証'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'jewellery',
      scenarios: {
        'zh-hk': ['珠寶店紙袋 · 黑卡燙金', '絲帶手挽 + 磁吸封口', '精品級開箱儀式感'],
        en: ['Jewellery bag · black card + gold foil', 'Satin ribbon + magnetic closure', 'Luxury unboxing ceremony'],
        ja: ['宝飾店バッグ・黒カード金箔', 'サテンリボン + マグネット封口', 'ラグジュアリーな開封体験'],
      },
      priority: 1, tier: 'B',
    },
    {
      key: 'wedding',
      scenarios: {
        'zh-hk': ['婚禮回禮袋 · 客製化設計', '新人名字/日期專屬印刷', '100 個起 · 多色可選'],
        en: ['Wedding favor bag · bespoke design', 'Couple name/date personalization', 'From 100 · multiple colors'],
        ja: ['ウェディングギフトバッグ・オーダー', '新郎新婦名・日付入り', '100枚から・マルチカラー'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'bakery',
      scenarios: {
        'zh-hk': ['麵包店/烘焙紙袋 · 食品級', '防油內層 + 透氣窗口', '1000 個起 · 量大優惠'],
        en: ['Bakery paper bag · food-grade', 'Greaseproof liner + breathable window', 'From 1000 · bulk discount'],
        ja: ['ベーカリー紙袋・食品グレード', '耐油内層 + 通気窓', '1000枚から・大口割引'],
      },
      priority: 3, tier: 'A',
    },
  ],
  posters: [
    {
      key: 'retail',
      scenarios: {
        'zh-hk': ['櫥窗/店內促銷海報 · A1/A2', 'PP合成紙 · 防水不反光', '1 張起打 · 即日交貨'],
        en: ['Window/in-store promo poster · A1/A2', 'PP synthetic · waterproof non-glare', 'From 1 sheet · same-day'],
        ja: ['ウィンドウ・店内販促ポスター・A1/A2', 'PP合成紙・防水非光沢', '1枚から・即日納品'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'exhibition',
      scenarios: {
        'zh-hk': ['展會背板 · 大圖輸出', '帆布/網布抗風材質', '展前 3 天急件可接'],
        en: ['Exhibition backdrop · large format', 'Canvas/mesh wind-resistant', '3-day pre-show rush accepted'],
        ja: ['展示会バックパネル・大判出力', 'キャンバス/メッシュ耐風素材', '展示3日前の急ぎ対応可'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'property',
      scenarios: {
        'zh-hk': ['樓盤銷售海報 · PVC 戶外級', '抗 UV 防褪色 3 年+', '工地圍板/售樓處展示'],
        en: ['Property sales poster · outdoor PVC', 'Anti-UV fade-resistant 3yr+', 'Site hoarding/sales office'],
        ja: ['物件販売ポスター・屋外用PVC', '抗UV 3年+退色防止', '工事囲い・販売所展示'],
      },
      priority: 2, tier: 'B',
    },
    {
      key: 'restaurant',
      scenarios: {
        'zh-hk': ['餐廳菜單海報 · A2/A1 大尺寸', '過膠防水 · 清潔方便', '新菜上市 · 快速換版'],
        en: ['Restaurant menu poster · A2/A1 large', 'Laminated waterproof · easy clean', 'New menu launch · fast reprint'],
        ja: ['飲食店メニューポスター・A2/A1大判', 'ラミネート防水・清掃簡単', '新メニュー・迅速再版'],
      },
      priority: 3, tier: 'A',
    },
    {
      key: 'education',
      scenarios: {
        'zh-hk': ['補習社/學校招生海報', '彩色數碼印刷 · 色彩亮麗', '開放日/招生季批量優惠'],
        en: ['Tutoring/school recruitment poster', 'Digital color · vibrant output', 'Open day/enrollment season bulk deal'],
        ja: ['塾・学校募集ポスター', 'デジタルカラー・鮮やか発色', '説明会・募集シーズン大量割引'],
      },
      priority: 4, tier: 'A',
    },
  ],
  menus: [
    {
      key: 'restaurant',
      scenarios: {
        'zh-hk': ['茶餐廳/西餐/日料菜單', '防水膠片 · 油污一抹乾淨', '100 本起 · 可換內頁設計'],
        en: ['Cha chaan teng/western/Japanese menu', 'Waterproof PVC · wipe-clean', 'From 100 · replaceable inserts'],
        ja: ['茶餐廳・洋食・和食メニュー', '防水PVC・油汚れも拭き取り', '100冊から・中身交換可能'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'cafe',
      scenarios: {
        'zh-hk': ['咖啡店/甜品店菜單', '復古紙質/黑板風格可選', 'QR Code 電子菜單聯動'],
        en: ['Café/dessert shop menu', 'Vintage paper/blackboard style', 'QR code digital menu sync'],
        ja: ['カフェ・スイーツ店メニュー', 'ヴィンテージ紙/黒板風選択可', 'QRコード電子メニュー連動'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'bar',
      scenarios: {
        'zh-hk': ['酒吧/居酒屋酒單', '皮革封面 + 燙金內頁', '昏暗燈光下可讀性優化'],
        en: ['Bar/izakaya drink menu', 'Leather cover + foil interior', 'Low-light readability optimized'],
        ja: ['バー・居酒屋ドリンクメニュー', 'レザー表紙 + 箔押し内頁', '薄暗い照明下での可読性最適化'],
      },
      priority: 2, tier: 'B',
    },
  ],
  'red-packets': [
    {
      key: 'wedding',
      scenarios: {
        'zh-hk': ['婚禮利是封 · 專屬定制', '新人名字燙金 + 浮雕擊凸', '100 個起 · 多款可選'],
        en: ['Wedding red packet · bespoke', 'Couple names in foil + embossing', 'From 100 · multiple designs'],
        ja: ['ウェディング紅包・専用デザイン', '新郎新婦名箔押し + エンボス', '100枚から・複数デザイン'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'corporate',
      scenarios: {
        'zh-hk': ['企業年會利是封 · 品牌定制', '公司 LOGO + 年份燙金', '春節/開工批量優惠'],
        en: ['Corporate annual dinner red packet', 'Company logo + year foil stamp', 'CNY/opening bulk discount'],
        ja: ['企業年次会紅包・ブランドカスタム', '社名ロゴ + 年号箔押し', '春節・仕事始め大口割引'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'ip',
      scenarios: {
        'zh-hk': ['卡通 IP 授權利是封', '角色授權印刷 + 立體工藝', '限量版收藏價值'],
        en: ['Cartoon IP licensed red packet', 'Character licensed print + 3D craft', 'Limited edition collectible'],
        ja: ['キャラクターIPライセンス紅包', 'キャラ印刷 + 立体加工', '限定版コレクション価値'],
      },
      priority: 2, tier: 'B',
    },
  ],
  // ========================================================================
  // 6 個 P1/P2 類目 — 行業場景數據補全 (2026-07-09)
  // calendars / banners / books / envelopes / educational / japan-doujin
  // 數據來源: CATEGORY_INDUSTRIES + GSC 查詢詞 + industry-keyword-matrix.json
  // ========================================================================
  calendars: [
    {
      key: 'corporate_gift',
      scenarios: {
        'zh-hk': ['企業年曆 · 品牌定制', '公司 LOGO + 燙金年份', '100 本起 · 座檯/掛牆可選'],
        en: ['Corporate calendar · branded', 'Company logo + foil-stamped year', 'From 100 · desk or wall mount'],
        ja: ['企業カレンダー・ブランド入り', '社名ロゴ + 年号箔押し', '100部から・卓上/壁掛け選択可'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'school',
      scenarios: {
        'zh-hk': ['學校定制年曆 · 校徽校訓', '學生/家長人手一本', 'A4/A5 尺寸 · 500 本起優惠'],
        en: ['School custom calendar · crest & motto', 'One per student/family', 'A4/A5 · bulk from 500'],
        ja: ['学校カレンダー・校章入り', '生徒/保護者に配布', 'A4/A5サイズ・500部から割引'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'realestate',
      scenarios: {
        'zh-hk': ['地產送禮年曆 · 豪宅款', '燙金封套 + 精裝硬皮', '客戶關係回饋首選'],
        en: ['Real estate gift calendar · luxury', 'Foil jacket + hardcover binding', 'Client appreciation top choice'],
        ja: ['不動産ギフトカレンダー・高級仕様', '箔押しカバー + 上製本', '顧客関係強化に最適'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'auto',
      scenarios: {
        'zh-hk': ['汽車品牌年曆 · 高清印刷', '車型寫真 + 品牌色精準', '4S 店客戶贈品 · 300 本起'],
        en: ['Auto brand calendar · HD print', 'Car model photos + brand color accuracy', 'Dealership gifts · from 300'],
        ja: ['自動車ブランドカレンダー・高精細', '車種写真 + ブランドカラー忠実再現', 'ディーラー配布・300部から'],
      },
      priority: 3, tier: 'B',
    },
    {
      key: 'finance',
      scenarios: {
        'zh-hk': ['銀行/金融客戶年曆', 'QR Code 連結手機銀行', '合規審查通過 · 批量配送'],
        en: ['Banking/finance client calendar', 'QR code linking to mobile banking', 'Compliance-approved · bulk delivery'],
        ja: ['銀行・金融顧客カレンダー', 'QRコードでモバイルバンキング連携', 'コンプライアンス対応・一括配送'],
      },
      priority: 4, tier: 'B',
    },
  ],
  banners: [
    {
      key: 'trade_show',
      scenarios: {
        'zh-hk': ['展會易拉寶/X展架', '輕便便攜 · 3分鐘搭建', '展前急單 48 小時交貨'],
        en: ['Trade show roll-up / X-frame', 'Lightweight portable · 3-min setup', 'Pre-show rush: 48hr delivery'],
        ja: ['展示会ロールアップ/Xスタンド', '軽量ポータブル・3分設営', '展示前特急48時間納品'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'outdoor_ad',
      scenarios: {
        'zh-hk': ['戶外橫幅/圍板廣告', '防水帆布 · 抗 UV 3 年+', '大型尺寸 3m+ 無接縫'],
        en: ['Outdoor banner/hoarding ad', 'Waterproof canvas · anti-UV 3yr+', 'Large format 3m+ seamless'],
        ja: ['屋外バナー/工事囲い広告', '防水キャンバス・抗UV 3年+', '大型3m+ シームレス出力'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'auto_showroom',
      scenarios: {
        'zh-hk': ['汽車展廳展示噴繪', '高精度彩色輸出', '磁性貼合 · 可反覆更換'],
        en: ['Auto showroom display print', 'High-precision color output', 'Magnetic adhesion · reusable'],
        ja: ['自動車ショールーム展示', '高精細カラー出力', 'マグネット貼付・再利用可能'],
      },
      priority: 2, tier: 'B',
    },
    {
      key: 'mall_promo',
      scenarios: {
        'zh-hk': ['商場/門店促銷橫幅', 'PP 合成紙 · 防水不反光', '節日限定快速換版'],
        en: ['Mall/store promo banner', 'PP synthetic · waterproof non-glare', 'Seasonal fast reprint'],
        ja: ['モール/店舗販促バナー', 'PP合成紙・防水非光沢', '季節限定クイック再版'],
      },
      priority: 3, tier: 'A',
    },
    {
      key: 'school_event',
      scenarios: {
        'zh-hk': ['學校開放日/校運會橫幅', '彩色數碼印刷 · 色彩亮麗', '批量優惠 · 5 條起'],
        en: ['School open day/sports day banner', 'Digital color · vibrant output', 'Bulk discount · from 5'],
        ja: ['学校説明会/運動会バナー', 'デジタルカラー・鮮やか発色', '大量割引・5枚から'],
      },
      priority: 4, tier: 'A',
    },
  ],
  books: [
    {
      key: 'tutoring_textbook',
      scenarios: {
        'zh-hk': ['補習社皇牌教材印刷', '道林紙 80g · 閱讀舒適', '無線膠裝 · 50 本起 · 7 天交貨'],
        en: ['Tutoring textbook printing', 'Woodfree 80gsm · eye-comfort', 'Perfect bound · from 50 · 7-day'],
        ja: ['塾教材印刷', '上質紙80g・読みやすい', '無線綴じ・50冊から・7日納品'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'doujin',
      scenarios: {
        'zh-hk': ['同人誌/原創漫畫印刷', '騎馬釘/PUR 無線裝可選', '10 本起 · 小量也可印'],
        en: ['Doujinshi/original comic printing', 'Saddle stitch/PUR perfect bound', 'From 10 · small batch OK'],
        ja: ['同人誌/オリジナル漫画印刷', '中綴じ/PUR無線綴じ選択可', '10冊から・小ロット歓迎'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'corp_brochure',
      scenarios: {
        'zh-hk': ['企業畫冊/產品型錄', '精裝硬皮 + 燙金燙銀', '封面 4C 印刷 · 內頁高質'],
        en: ['Corporate brochure/product catalog', 'Hardcover + foil stamping', '4C cover · premium interior'],
        ja: ['企業パンフ/製品カタログ', '上製本 + 箔押し', '4C表紙・高品質内頁'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'children_book',
      scenarios: {
        'zh-hk': ['兒童繪本/親子共讀書', '圓角裁切 · 安全不刮手', '厚紙板書可選 · 100 本起'],
        en: ['Children picture book/family read', 'Rounded corners · child-safe', 'Board book option · from 100'],
        ja: ['絵本/親子読み聞かせ', '丸角裁切・安全設計', 'ボードブック選択可・100冊から'],
      },
      priority: 3, tier: 'B',
    },
    {
      key: 'yearbook',
      scenarios: {
        'zh-hk': ['紀念冊/畢業年刊', '精裝布面或皮面封面', '全彩內頁 · ISBN 出版支援'],
        en: ['Memory book/graduation yearbook', 'Cloth or leather hardcover', 'Full-color interior · ISBN support'],
        ja: ['記念アルバム/卒業年鑑', '布張り/革張り上製本', 'フルカラー内頁・ISBN出版支援'],
      },
      priority: 4, tier: 'B',
    },
  ],
  envelopes: [
    {
      key: 'corp_business',
      scenarios: {
        'zh-hk': ['企業商務信封 · 開窗/不開窗', '燙金 LOGO + 公司地址', '500 個起 · 5 天交貨'],
        en: ['Corporate business envelope · window/plain', 'Foil logo + company address', 'From 500 · 5-day delivery'],
        ja: ['企業封筒・窓付き/窓なし', '箔押しロゴ + 社名住所', '500枚から・5日納品'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'finance_mail',
      scenarios: {
        'zh-hk': ['銀行/金融對賬信封', '安全自黏封口 · 防透視', '合規印刷 · 大批量優惠'],
        en: ['Bank/finance statement envelope', 'Security self-seal · opaque', 'Compliant printing · bulk discount'],
        ja: ['銀行/金融取引明細封筒', 'セキュリティ封口・不透視', 'コンプライアンス印刷・大口割引'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'school_notice',
      scenarios: {
        'zh-hk': ['補習社/學校通告信封', '彩色印刷 · 校徽客製', '1000 個起 · 開學檔期優惠'],
        en: ['Tutoring/school notice envelope', 'Color print · custom school crest', 'From 1000 · term opening deal'],
        ja: ['塾/学校通知用封筒', 'カラー印刷・校章カスタム', '1000枚から・新学期割引'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'logistics',
      scenarios: {
        'zh-hk': ['物流快遞信封/運單套', '防水牛皮紙 · 耐撕耐磨', '條碼窗口 · 1000 個起'],
        en: ['Logistics courier envelope/waybill', 'Waterproof kraft · tear-resistant', 'Barcode window · from 1000'],
        ja: ['物流配送封筒/送り状ケース', '防水クラフト・耐引裂', 'バーコード窓・1000枚から'],
      },
      priority: 3, tier: 'B',
    },
    {
      key: 'member_event',
      scenarios: {
        'zh-hk': ['會員活動/邀請函信封', '高級紙質 · 蠟封可選', '燙金內襯 · 尊貴感滿分'],
        en: ['Member event/invitation envelope', 'Premium paper · wax seal option', 'Foil liner · luxury feel'],
        ja: ['会員イベント/招待状封筒', '高級紙・封蝋選択可', '箔押し内装・高級感演出'],
      },
      priority: 4, tier: 'B',
    },
  ],
  educational: [
    {
      key: 'graduation',
      scenarios: {
        'zh-hk': ['畢業紀念冊印刷 · 精裝', '布面硬皮 + 燙金校名', '全彩內頁 · 100 本起'],
        en: ['Graduation yearbook · hardcover', 'Cloth cover + foil school name', 'Full-color · from 100'],
        ja: ['卒業記念アルバム・上製本', '布張り表紙 + 校名箔押し', 'フルカラー・100冊から'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'workbook',
      scenarios: {
        'zh-hk': ['補習社皇牌教材印刷', '道林紙 80g · 長時間閱讀舒適', '無線膠裝 · 封面燙金'],
        en: ['Tutoring textbook series', 'Woodfree 80gsm · eye-comfort', 'Perfect bound · foil cover'],
        ja: ['塾教材シリーズ印刷', '上質紙80g・長時間読書向け', '無線綴じ・表紙箔押し'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'school_bulk',
      scenarios: {
        'zh-hk': ['學校批量印刷 · 全校教材', 'FSC 認證紙張 · 大豆油墨', 'NET 30 賬期 · 門市打樣'],
        en: ['School bulk printing · all-grade', 'FSC certified paper · soy ink', 'NET 30 terms · in-store proofs'],
        ja: ['学校一括印刷・全校教材', 'FSC認証紙・大豆インク', 'NET 30支払・店頭校正'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'pta_event',
      scenarios: {
        'zh-hk': ['家長會/校慶活動印刷', '邀請卡 + 場刊 + 海報', '一站式配套 · 節省溝通成本'],
        en: ['PTA/school event printing', 'Invites + program + posters', 'One-stop package · save coordination'],
        ja: ['保護者会/学校行事印刷', '招待状 + プログラム + ポスター', 'ワンストップ・調整工数削減'],
      },
      priority: 3, tier: 'B',
    },
    {
      key: 'certificates',
      scenarios: {
        'zh-hk': ['獎狀/證書印刷', '燙金校名 + 防偽水印', 'A4 尺寸 · 50 張起'],
        en: ['Award certificate printing', 'Foil school name + anti-fraud watermark', 'A4 size · from 50'],
        ja: ['賞状/証明書印刷', '校名箔押し + 偽造防止透かし', 'A4サイズ・50枚から'],
      },
      priority: 4, tier: 'B',
    },
  ],
  'japan-doujin': [
    {
      key: 'doujinshi',
      scenarios: {
        'zh-hk': ['同人誌 · 騎馬釘/無線膠裝', 'B5/A5 尺寸 · 封面 4C', '10 本起 · 日本直送可'],
        en: ['Doujinshi · saddle stitch/perfect', 'B5/A5 · 4C cover', 'From 10 · Japan direct ship'],
        ja: ['同人誌・中綴じ/無線綴じ', 'B5/A5・表紙4C', '10冊から・日本直送可'],
      },
      priority: 0, tier: 'A',
    },
    {
      key: 'anime_goods',
      scenarios: {
        'zh-hk': ['動漫周邊 · 貼紙/吊飾/立牌', '模切異形 · 燙金可選', '100 張起 · 快速打樣'],
        en: ['Anime merch · stickers/charms/standees', 'Die-cut shapes · foil option', 'From 100 · fast proofs'],
        ja: ['アニメグッズ・ステッカー/チャーム/スタンド', 'ダイカット・箔押し選択可', '100枚から・迅速校正'],
      },
      priority: 1, tier: 'A',
    },
    {
      key: 'vtuber',
      scenarios: {
        'zh-hk': ['VTuber 應援周邊印刷', '螢光色/透明貼紙 · 應援扇', '50 張起 · 活動急單可接'],
        en: ['VTuber fan goods printing', 'Fluorescent/transparent stickers · fans', 'From 50 · event rush OK'],
        ja: ['VTuber応援グッズ印刷', '蛍光/透明ステッカー・応援うちわ', '50枚から・イベント特急対応'],
      },
      priority: 2, tier: 'A',
    },
    {
      key: 'comiket',
      scenarios: {
        'zh-hk': ['Comiket 委託印刷 · 香港發', '日本 Comiket 檔期對接', 'PUR 無線裝 · 200 本起'],
        en: ['Comiket commission · from HK', 'Japan Comiket deadline sync', 'PUR perfect bound · from 200'],
        ja: ['コミケ委託印刷・香港発', '日本のコミケ締切に合わせ', 'PUR無線綴じ・200冊から'],
      },
      priority: 3, tier: 'B',
    },
    {
      key: 'original_ip',
      scenarios: {
        'zh-hk': ['原創 IP 周邊全套印刷', '同人本 + 周邊 + 包裝', '一站式生產 · 降低物流成本'],
        en: ['Original IP full merch print', 'Doujinshi + goods + packaging', 'One-stop production · lower logistics'],
        ja: ['オリジナルIPグッズ一式印刷', '同人誌 + グッズ + パッケージ', '一括生産・物流コスト削減'],
      },
      priority: 4, tier: 'B',
    },
  ],
};

// Blog slugs that are covered (used to decide "link to blog" or "coming soon")
// Same as page.tsx categoryCoveredBlogSlugsMap
const coveredBlogMap: Record<string, string[]> = {
  flyers: ['restaurant-opening-flyer-printing-guide'],
  packaging: ['cosmetics-packaging-box-printing-guide', 'cross-border-ecommerce-shipping-box-guide', 'real-estate-brochure-box-printing-guide', 'tea-beverage-gift-box-printing-guide'],
  stickers: ['pet-food-sticker-printing-guide', 'pharmaceutical-label-printing-guide'],
  'paper-bags': ['apparel-shopping-bag-printing-guide', 'jewellery-shopping-bag-printing-guide', 'wedding-favor-bag-printing-guide'],
  posters: ['retail-shop-poster-printing-guide'],
  menus: ['restaurant-menu-printing-guide'],
  'red-packets': ['wedding-red-packet-printing-guide'],
};

// 3-locale labels
const labels: Record<string, Record<string, string>> = {
  'zh-hk': {
    sectionTitle: '服務行業與應用場景',
    sectionSubtitle: '針對每個品類，我們整理了最常見的行業場景與對應方案。點擊了解詳情。',
    tierA: '主力行業',
    tierB: '次鋪行業',
    readGuide: '查看完整方案 →',
    comingSoon: '即將推出',
    scenarioPrefix: '適用場景',
  },
  en: {
    sectionTitle: 'Industries & Application Scenarios',
    sectionSubtitle: 'For each category, we\'ve mapped the most common industries and solutions. Click to explore.',
    tierA: 'Primary',
    tierB: 'Secondary',
    readGuide: 'View Full Guide →',
    comingSoon: 'Coming Soon',
    scenarioPrefix: 'Use Cases',
  },
  ja: {
    sectionTitle: '取り扱い業界と活用シーン',
    sectionSubtitle: '各カテゴリで最も需要の高い業界と最適なソリューションをまとめました。',
    tierA: '主力業界',
    tierB: 'サブ業界',
    readGuide: '詳細を見る →',
    comingSoon: '近日公開',
    scenarioPrefix: '活用例',
  },
};

// ============================================================================
// Component
// ============================================================================

export function CategoryIndustries({ locale, categorySlug }: { locale: Locale; categorySlug: string }) {
  const industries = CATEGORY_INDUSTRIES[categorySlug]?.[locale] || [];
  const scenarios = categoryIndustryScenarios[categorySlug] || [];
  const coveredSlugs = coveredBlogMap[categorySlug] || [];

  if (industries.length === 0 && scenarios.length === 0) {
    return null;
  }

  const t = labels[locale] || labels['zh-hk'];
  const localePrefix = `/${locale}`;

  // Pair by position: both CATEGORY_INDUSTRIES and scenario data are ordered by priority.
  // First 5 = Tier A, next 3 = Tier B.
  const maxCards = Math.min(industries.length, 8);
  const cards: {
    industryName: string;
    tier: 'A' | 'B';
    scenarios: string[];
    blogSlug?: string;
    covered: boolean;
  }[] = [];

  for (let i = 0; i < maxCards; i++) {
    const industryName = industries[i];
    const tier: 'A' | 'B' = i < 5 ? 'A' : 'B';

    // Match scenario by position (same priority order as CATEGORY_INDUSTRIES)
    const tierScenarios = scenarios.filter(s => s.tier === tier);
    const posInTier = tier === 'A' ? i : i - 5;
    const scenario = tierScenarios[posInTier];

    // Determine blog slug match by position into coveredSlugs
    const covered = coveredSlugs.length > 0 && tier === 'A';
    const blogSlug = covered ? coveredSlugs[Math.min(posInTier, coveredSlugs.length - 1)] : undefined;

    cards.push({
      industryName,
      tier,
      scenarios: scenario?.scenarios[locale] || [],
      blogSlug,
      covered: covered && !!blogSlug,
    });
  }

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        {/* Section Header */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-[#333333] mb-2">
            {t.sectionTitle}
          </h3>
          <p className="text-gray-500 text-sm md:text-base max-w-3xl">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Industry Cards Grid: 1→2→3 responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card, idx) => (
            <IndustryCard
              key={`${card.industryName}-${idx}`}
              industryName={card.industryName}
              tier={card.tier}
              scenarios={card.scenarios}
              blogSlug={card.blogSlug}
              covered={card.covered}
              locale={locale}
              localePrefix={localePrefix}
              labels={t}
            />
          ))}
        </div>

        {/* Placeholder row for upcoming industries */}
        {industries.length > 8 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              {locale === 'zh-hk'
                ? `另有 ${industries.length - 8} 個行業場景內容整理中，將陸續上線。`
                : locale === 'en'
                ? `${industries.length - 8} more industry guides are being researched and will be added soon.`
                : `さらに ${industries.length - 8} 業界のガイドを準備中です。順次公開予定。`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// ============================================================================
// Individual Industry Card
// ============================================================================

function IndustryCard({
  industryName,
  tier,
  scenarios,
  blogSlug,
  covered,
  locale,
  localePrefix,
  labels,
}: {
  industryName: string;
  tier: 'A' | 'B';
  scenarios: string[];
  blogSlug?: string;
  covered: boolean;
  locale: Locale;
  localePrefix: string;
  labels: Record<string, string>;
}) {
  // Visual tokens per tier
  const tierStyles = tier === 'A'
    ? {
        card: 'border-blue-200 bg-gradient-to-br from-blue-50/60 to-white hover:border-blue-300 hover:shadow-blue-100/50',
        badge: 'bg-blue-100 text-blue-800',
        dot: 'bg-blue-500',
        accent: 'text-[#2873F5]',
        divider: 'border-blue-100',
      }
    : {
        card: 'border-amber-200 bg-gradient-to-br from-amber-50/40 to-white hover:border-amber-300 hover:shadow-amber-100/50',
        badge: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-500',
        accent: 'text-amber-700',
        divider: 'border-amber-100',
      };

  const comingSoonStyle = {
    card: 'border-gray-200 bg-white hover:border-gray-300',
    badge: 'bg-gray-100 text-gray-500',
    dot: 'bg-gray-400',
    accent: 'text-gray-500',
    divider: 'border-gray-100',
  };

  const style = covered ? tierStyles : comingSoonStyle;
  const href = covered && blogSlug
    ? `${localePrefix}/blog/${blogSlug}/`
    : undefined;

  const CardWrapper = href ? 'a' : 'div';

  return (
    <CardWrapper
      href={href as string | undefined}
      className={`group block rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${style.card}`}
    >
      {/* Header Row: Badge + Industry Name */}
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${style.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`} />
          {covered ? (tier === 'A' ? labels.tierA : labels.tierB) : labels.comingSoon}
        </span>
      </div>

      {/* Industry Name */}
      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base leading-snug">
        {industryName}
      </h4>

      {/* Scenario Hooks — the "why this category fits this industry" */}
      {scenarios.length > 0 ? (
        <ul className="space-y-1.5 mb-4">
          {scenarios.map((s, si) => (
            <li key={si} className="flex items-start gap-2 text-xs md:text-sm text-gray-600 leading-relaxed">
              <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${style.dot}`} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-400 italic mb-4">
          {locale === 'zh-hk' ? '場景數據整理中…' : locale === 'en' ? 'Scenario data loading…' : 'データ準備中…'}
        </p>
      )}

      {/* Divider */}
      <div className={`border-t ${style.divider} pt-3`}>
        {covered ? (
          <span className={`inline-flex items-center gap-1 text-xs font-medium ${style.accent} group-hover:gap-1.5 transition-all`}>
            {labels.readGuide}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 3.5V6M6 8.5H6.005" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
            {labels.comingSoon}
          </span>
        )}
      </div>
    </CardWrapper>
  );
}
