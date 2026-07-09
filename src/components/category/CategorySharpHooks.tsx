/**
 * Category Sharp Hooks — 类目页首屏 sharp hook 视觉锚点 (2026-07-09 PM+UX+SEO 复盘)
 *
 * 设计动机:
 * - GSC 真实数据：类目页 (e.g. paper-bags 749 imps / 0.13% CTR) vs 产品页
 *   (e.g. die-cut-stickers 11.11% CTR) 差距是 1-2 数量级
 * - 根因：类目页在 banner 后直接进产品列表, 缺 "为什么这个类目适合你" 的 sharp hook 锚点
 * - 教科书模板 (textbooks.html) 的学习场景配置证明: 用户需要"具体场景+MOQ+材质"
 *   才愿意点击; 类目页需要把这种 sharp hook 提前到首屏
 *
 * 位置: banner 之后、product list 之前 (page.tsx)
 * 数据: 复用 CategoryIndustries 的 categoryIndustryScenarios 前 3 个 Tier A
 * 视觉: 紧凑 3-column 卡片, Tier A 蓝色 accent
 *
 * @see CategoryIndustries.tsx 同源数据
 */

import { CATEGORY_INDUSTRIES, Locale } from '@/lib/seo';

// 与 CategoryIndustries.tsx 保持一致 — 复用同一份 scenario 数据
// (简化版: 只取每类目前 3 个 Tier A 行业, 不重复维护数据)
const categoryIndustryScenarios: Record<string, {
  key: string;
  scenarios: Record<'zh-hk' | 'en' | 'ja', string[]>;
}[]> = {
  stickers: [
    { key: 'pet_food', scenarios: {
      'zh-hk': ['防水防油 FDA 食品級標籤', '異形模切吸引貨架目光', '100 張起印 · 即日打樣'],
      en: ['Waterproof FDA-grade food labels', 'Die-cut shapes for shelf appeal', 'From 100 sheets · same-day proof'],
      ja: ['防水・耐油 FDA 食品グレードラベル', 'ダイカットで棚の注目度アップ', '100枚から・即日サンプル'],
    }},
    { key: 'beauty', scenarios: {
      'zh-hk': ['燙金 LOGO · 啞光質感', '透明貼紙展示玻璃瓶身', '小批量試產 50 張起'],
      en: ['Foil stamped logo · matte finish', 'Transparent stickers for glass bottles', 'Small batch from 50 sheets'],
      ja: ['箔押しロゴ・マット仕上げ', '透明ステッカーでガラス瓶を見せる', '50枚からの小ロット試作'],
    }},
    { key: 'ecommerce', scenarios: {
      'zh-hk': ['SKU 條碼標籤 + GS1 合規', '跨境物流防水耐磨', '可移除背膠 · 不留殘膠'],
      en: ['SKU barcode labels + GS1 compliance', 'Cross-border waterproof & durable', 'Removable adhesive · no residue'],
      ja: ['SKUバーコード + GS1準拠', '越境物流・防水耐久', '再剥離タイプ・跡残りなし'],
    }},
  ],
  flyers: [
    { key: 'restaurant', scenarios: {
      'zh-hk': ['A5 外賣菜單 + 開業傳單', '防水塗層 · 油漬一抹即淨', '500 張起 · 翌日交貨'],
      en: ['A5 takeaway menu + opening flyer', 'Waterproof coating · wipe-clean', 'From 500 · next-day delivery'],
      ja: ['A5テイクアウトメニュー + 開業チラシ', '防水コート・油汚れも拭き取り', '500枚から・翌日納品'],
    }},
    { key: 'tutoring', scenarios: {
      'zh-hk': ['補習社皇牌課程單張', 'A4 雙面 4 色 · 派發效率高', '即日打樣 · 彈性加印'],
      en: ['Tutoring center flagship flyers', 'A4 duplex 4C · high distribution', 'Same-day proof · flexible reprint'],
      ja: ['塾・予備校の主力コースチラシ', 'A4両面4色・配布効率高', '即日校正・柔軟増刷'],
    }},
    { key: 'event', scenarios: {
      'zh-hk': ['展會/活動單張 · 摺頁可選', 'A3 大尺寸 · 雙面滿版', '3 天急件可接'],
      en: ['Exhibition/event flyers · folded', 'A3 large format · full-bleed duplex', '3-day rush available'],
      ja: ['展示会/イベントチラシ・折込可', 'A3大判・両面フルブリード', '3日特急対応可'],
    }},
  ],
  packaging: [
    { key: 'beauty', scenarios: {
      'zh-hk': ['化妝品盒 4 種盒型 · 天地蓋/磁吸', '燙金 LOGO · 啞面 PP 覆膜', '100 個起 · FDA 級安全'],
      en: ['4 cosmetic box styles · lift-off/magnetic', 'Foil logo · matte PP lamination', 'From 100 · FDA food-safe'],
      ja: ['化粧品箱4種・天地蓋/マグネット', '箔押しロゴ・マットPPラミ', '100個から・FDA対応'],
    }},
    { key: 'ecommerce', scenarios: {
      'zh-hk': ['跨境電商快遞盒 · 雙層瓦楞', 'SKU 條碼 + GS1 合規印刷', '500 個起 · 全球 DHL 配送'],
      en: ['Cross-border mailer boxes · 2-ply corrugated', 'SKU barcode + GS1 compliant', 'From 500 · global DHL'],
      ja: ['越境ECメール便箱・複層段ボール', 'SKUバーコード+GS1準拠', '500個から・国際DHL配送'],
    }},
    { key: 'tea_beverage', scenarios: {
      'zh-hk': ['茶飲品牌禮盒 · 天地蓋', '燙金 + 局部 UV · 高檔質感', '200 個起 · 月餅盒適用'],
      en: ['Tea brand gift boxes · lift-off lid', 'Foil + spot UV · premium finish', 'From 200 · mooncake-ready'],
      ja: ['茶ブランドギフト箱・天地蓋', '箔押し+スポットUV・高級感', '200個から・月餅箱対応'],
    }},
  ],
  'paper-bags': [
    { key: 'fashion', scenarios: {
      'zh-hk': ['服飾品牌紙袋 · 牛皮/白卡', '棉繩/絲帶手挽 · 燙金可選', '100 個起 · HK$1.8 起/個'],
      en: ['Fashion brand bags · kraft/white card', 'Cotton/satin handles · foil option', 'From 100 · HK$1.8+ each'],
      ja: ['アパレルブランド紙袋・クラフト/白カード', '綿/サテンリボン・箔押し選択可', '100個から・HK$1.8〜'],
    }},
    { key: 'wedding', scenarios: {
      'zh-hk': ['婚慶禮品紙袋 · 燙金婚禮 logo', '白卡紙/黑卡紙高檔質感', '50 個起 · 婚禮主題配色'],
      en: ['Wedding favor bags · foil-stamped logo', 'White card / black card premium', 'From 50 · wedding color match'],
      ja: ['ウェディングギフト紙袋・箔押しロゴ', '白カード/黒カード高級感', '50個から・結婚式配色'],
    }},
    { key: 'bakery', scenarios: {
      'zh-hk': ['烘焙店外賣紙袋 · 防油塗層', '牛皮紙 · 透氣孔設計', '100 個起 · 麵包/蛋糕店適用'],
      en: ['Bakery takeaway bags · oil-resistant', 'Kraft paper · vented design', 'From 100 · bread/cake shops'],
      ja: ['ベーカリー持ち帰り紙袋・耐油加工', 'クラフト紙・通気孔設計', '100個から・パン/ケーキ店対応'],
    }},
  ],
  posters: [
    { key: 'retail', scenarios: {
      'zh-hk': ['零售店面海報 · A1/A2', '高清 1440dpi · 防水 PP 裱貼', '1 張起打 · 翌日交貨'],
      en: ['Retail store posters · A1/A2', 'HD 1440dpi · waterproof PP laminate', 'From 1 · next-day delivery'],
      ja: ['小売店ポスター・A1/A2', '高精細1440dpi・防水PPラミ', '1枚から・翌日納品'],
    }},
    { key: 'exhibition', scenarios: {
      'zh-hk': ['展會背板海報 · 易拉寶可選', '寬幅 1.5m+ · 高清輸出', '3 天急件可接'],
      en: ['Exhibition backdrops · roll-up option', 'Wide-format 1.5m+ · HD output', '3-day rush available'],
      ja: ['展示会バックドロップ・ロールアップ可', '大判1.5m+・高精細出力', '3日特急対応可'],
    }},
    { key: 'restaurant', scenarios: {
      'zh-hk': ['餐廳推廣海報 · 防水材質', 'PP 裱貼 · 撕不破', '1 張起 · 7 天交付'],
      en: ['Restaurant promo posters · waterproof', 'PP laminated · tear-resistant', 'From 1 · 7-day delivery'],
      ja: ['飲食店プロモポスター・防水素材', 'PPラミ・引裂防止', '1枚から・7日納期'],
    }},
  ],
  calendars: [
    { key: 'corporate', scenarios: {
      'zh-hk': ['企業 LOGO 年曆 · 燙金精裝', '座檯/掛牆 · 12 頁雙面', '100 本起 · Q4 旺季建議 60 天前下單'],
      en: ['Corporate logo calendars · foil hardcover', 'Desk/wall · 12-page duplex', 'From 100 · order 60d before Q4 peak'],
      ja: ['企業ロゴカレンダー・箔押し上製本', 'デスク/壁掛け・12ページ両面', '100部から・繁忙期60日前発注推奨'],
    }},
    { key: 'school', scenarios: {
      'zh-hk': ['學校定制年曆 · 批量折扣', '校徽 LOGO + 校園照片', '500 本起 · 教師節禮品'],
      en: ['School custom calendars · bulk discount', 'Crest logo + campus photos', 'From 500 · Teacher\'s Day gifts'],
      ja: ['学校カスタムカレンダー・大量割引', '校章ロゴ+キャンパス写真', '500部から・教師の日ギフト'],
    }},
    { key: 'real_estate', scenarios: {
      'zh-hk': ['房地產客戶禮品年曆', '高端燙金 + 項目 LOGO', '200 本起 · 客戶維繫'],
      en: ['Real estate client gift calendars', 'Premium foil + project logo', 'From 200 · client retention'],
      ja: ['不動産クライアントギフトカレンダー', '高級箔押し+プロジェクトロゴ', '200部から・顧客維持'],
    }},
  ],
  menus: [
    { key: 'restaurant', scenarios: {
      'zh-hk': ['餐廳餐牌 · 防水 PVC', 'A4/A5 · 雙面 4 色', '100 本起 · 油漬一抹即淨'],
      en: ['Restaurant menus · waterproof PVC', 'A4/A5 · duplex 4C', 'From 100 · wipe-clean surface'],
      ja: ['レストランメニュー・防水PVC', 'A4/A5・両面4色', '100部から・油汚れ拭き取り'],
    }},
    { key: 'cafe', scenarios: {
      'zh-hk': ['咖啡店餐牌 · 紙質精裝', 'B5 尺寸 · 封面燙金', '50 本起 · 菜單季度更新'],
      en: ['Cafe menus · paper hardcover', 'B5 size · foil cover', 'From 50 · seasonal menu updates'],
      ja: ['カフェメニュー・紙ハードカバー', 'B5サイズ・表紙箔押し', '50部から・季節メニュー更新'],
    }},
    { key: 'bar', scenarios: {
      'zh-hk': ['酒吧酒水牌 · 黑色卡紙', '燙金/銀 LOGO · 防水覆膜', '50 本起 · 夜場適用'],
      en: ['Bar drink menus · black card stock', 'Foil silver/gold logo · waterproof', 'From 50 · nightlife-ready'],
      ja: ['バードリンクメニュー・黒カード紙', '箔押し銀/金ロゴ・防水', '50部から・夜営業対応'],
    }},
  ],
  'red-packets': [
    { key: 'wedding', scenarios: {
      'zh-hk': ['婚慶紅包 · 燙金婚禮 logo', '中式傳統紅 · 雙面 4 色', '100 個起 · 婚禮主題定制'],
      en: ['Wedding red packets · foil logo', 'Traditional red · duplex 4C', 'From 100 · wedding-themed'],
      ja: ['結婚式ポチ袋・箔押しロゴ', '中式伝統赤・両面4色', '100個から・結婚式テーマ'],
    }},
    { key: 'corporate', scenarios: {
      'zh-hk': ['企業年會紅包 · LOGO 定制', '燙金 + 局部 UV · 高檔', '500 個起 · 批量折扣'],
      en: ['Corporate CNY red packets · logo custom', 'Foil + spot UV · premium', 'From 500 · bulk discount'],
      ja: ['企業旧正月ポチ袋・ロゴカスタム', '箔押し+スポットUV・高級', '500個から・大量割引'],
    }},
    { key: 'cartoon_ip', scenarios: {
      'zh-hk': ['卡通 IP 授權紅包', '正版授權 · 全彩印刷', '300 個起 · IP 主題定制'],
      en: ['Cartoon IP licensed red packets', 'Licensed · full-color print', 'From 300 · IP-themed'],
      ja: ['キャラクターIPライセンス', '正規ライセンス・フルカラー印刷', '300個から・IPテーマ'],
    }},
  ],
  banners: [
    { key: 'exhibition', scenarios: {
      'zh-hk': ['展會易拉寶 · X 架', '80×200cm · 高清輸出', '1 個起 · 標準尺寸齊全'],
      en: ['Exhibition roll-ups · X-stand', '80×200cm · HD output', 'From 1 · standard sizes'],
      ja: ['展示会ロールアップ・Xスタンド', '80×200cm・高精細出力', '1個から・標準サイズ完備'],
    }},
    { key: 'outdoor', scenarios: {
      'zh-hk': ['戶外橫幅 · 防水防 UV', '寬幅 5m+ · 韓國進口墨水', '1 個起 · 抗候 1 年+'],
      en: ['Outdoor banners · waterproof UV-resistant', 'Wide 5m+ · Korea-imported ink', 'From 1 · 1yr+ durability'],
      ja: ['屋外バナー・防水UV耐性', '大判5m+・韓国輸入インク', '1個から・1年+耐久'],
    }},
    { key: 'mall', scenarios: {
      'zh-hk': ['商場促銷橫幅 · 燈箱片', '高亮 PP · 雙面可選', '1 個起 · 商場檔期對接'],
      en: ['Mall promo banners · lightbox film', 'High-brightness PP · duplex option', 'From 1 · mall schedule sync'],
      ja: ['モール販促バナー・灯箱フィルム', '高輝度PP・両面選択可', '1個から・モール時期同期'],
    }},
  ],
  books: [
    { key: 'tutoring', scenarios: {
      'zh-hk': ['補習社皇牌教材 · 膠裝', 'B5 尺寸 · 封面 4 色 + 燙金', '200 本起 · 學校批量折扣'],
      en: ['Tutoring flagship textbooks · perfect bound', 'B5 size · 4C cover + foil', 'From 200 · school bulk pricing'],
      ja: ['塾主力教材・無線綴じ', 'B5サイズ・表紙4色+箔押し', '200部から・学校一括割引'],
    }},
    { key: 'children_book', scenarios: {
      'zh-hk': ['兒童繪本 · 騎馬釘/精裝', '正方形/橫版 · 圓角安全', '100 本起 · 環保大豆油墨'],
      en: ['Children picture books · saddle/hardcover', 'Square/landscape · rounded corners', 'From 100 · eco soy ink'],
      ja: ['絵本・中綴じ/上製本', '正方形/横版・角丸安全', '100部から・エコ大豆インク'],
    }},
    { key: 'corporate', scenarios: {
      'zh-hk': ['企業畫冊 · 精裝書', '公司簡介/產品型錄', '50 本起 · 高檔紙張'],
      en: ['Corporate brochures · hardcover', 'Company profiles / catalogs', 'From 50 · premium stock'],
      ja: ['企業パンフレット・上製本', '会社案内/製品カタログ', '50部から・高級紙'],
    }},
  ],
  envelopes: [
    { key: 'corporate', scenarios: {
      'zh-hk': ['企業信封 · LOGO 印刷', '中式 DL/C5 · 牛皮/白色可選', '100 個起 · 商務郵件適用'],
      en: ['Corporate envelopes · LOGO print', 'DL/C5 · kraft/white available', 'From 100 · business mail'],
      ja: ['企業封筒・ロゴ印刷', '長3/C5・クラフト/白選択可', '100個から・ビジネスメール対応'],
    }},
    { key: 'finance', scenarios: {
      'zh-hk': ['金融信封 · 防偽印刷', '中式傳統紅/牛皮 · 機密標識', '500 個起 · 銀行對賬單適用'],
      en: ['Finance envelopes · anti-counterfeit', 'Traditional red/kraft · confidential', 'From 500 · bank statements'],
      ja: ['金融封筒・偽造防止印刷', '中式伝統赤/クラフト・機密表示', '500個から・銀行明細書対応'],
    }},
    { key: 'school', scenarios: {
      'zh-hk': ['補習社通告信封 · 開窗可選', 'B5/C5 · 批量折扣', '300 個起 · 學期通告適用'],
      en: ['School notice envelopes · window option', 'B5/C5 · bulk discount', 'From 300 · term notices'],
      ja: ['塾通知封筒・窓付き選択可', 'B5/C5・大量割引', '300個から・学期通知対応'],
    }},
  ],
  educational: [
    { key: 'graduation', scenarios: {
      'zh-hk': ['中學/大學畢業紀念冊', '精裝書 · 封面燙金 · 200 頁', '100 本起 · 校徽 LOGO 定制'],
      en: ['Secondary/university graduation yearbooks', 'Hardcover · foil cover · 200 pages', 'From 100 · school crest custom'],
      ja: ['中学/大学卒業記念アルバム', '上製本・表紙箔押し・200頁', '100部から・校章ロゴカスタム'],
    }},
    { key: 'textbook', scenarios: {
      'zh-hk': ['補習社皇牌教材 · 無線膠裝', 'B5 80g 道林紙 · ISBN 對位', '200 本起 · 教育機構專屬折扣'],
      en: ['Tutoring flagship textbooks · perfect bound', 'B5 80g woodfree · ISBN alignment', 'From 200 · educator discount'],
      ja: ['塾主力教材・無線綴じ', 'B5 80g上質紙・ISBN対応', '200部から・教育機関割引'],
    }},
    { key: 'certificate', scenarios: {
      'zh-hk': ['獎狀證書印刷 · A4/A5', '銅版紙/啞粉紙 · 局部 UV 可選', '50 本起 · 學校/機構適用'],
      en: ['Award certificates · A4/A5', 'Glossy/matte art paper · spot UV', 'From 50 · schools/institutions'],
      ja: ['賞状/証明書印刷・A4/A5', 'コート紙/マット紙・スポットUV', '50部から・学校/機関対応'],
    }},
  ],
  'business-cards': [
    { key: 'business_pro', scenarios: {
      'zh-hk': ['商務人士名片 · 300g 高檔紙', '燙金/UV/圓角可選', '100 張起 · 24 小時交貨'],
      en: ['Business pro cards · 300g premium', 'Foil/UV/rounded corner option', 'From 100 · 24-hour delivery'],
      ja: ['ビジネスパーソン名刺・300g高級紙', '箔押し/UV/丸角選択可', '100枚から・24時間納品'],
    }},
    { key: 'real_estate', scenarios: {
      'zh-hk': ['房地產代理名片 · 雙面 4 色', '高克重啞粉紙 · 局部 UV', '200 張起 · 專業形象'],
      en: ['Real estate agent cards · duplex 4C', 'Heavy matte art paper · spot UV', 'From 200 · professional image'],
      ja: ['不動産エージェント名刺・両面4色', '高厚マット紙・スポットUV', '200枚から・プロフェッショナル'],
    }},
    { key: 'professional', scenarios: {
      'zh-hk': ['專業服務名片 · 剛古紙', '含棉纖維 · 紋理奢華', '100 張起 · 高端行業適用'],
      en: ['Professional services cards · conqueror paper', 'Cotton fiber · luxury texture', 'From 100 · premium industries'],
      ja: ['プロフェッショナル名刺・コンカラー紙', '綿繊維・豪華な質感', '100枚から・ハイエンド業界'],
    }},
  ],
  'japan-doujin': [
    { key: 'doujinshi', scenarios: {
      'zh-hk': ['同人誌 · 騎馬釘/無線膠裝', 'B5/A5 · 封面 4C', '10 本起 · 日本直送可'],
      en: ['Doujinshi · saddle/perfect bound', 'B5/A5 · 4C cover', 'From 10 · Japan direct ship'],
      ja: ['同人誌・中綴じ/無線綴じ', 'B5/A5・表紙4C', '10冊から・日本直送可'],
    }},
    { key: 'anime_goods', scenarios: {
      'zh-hk': ['動漫周邊 · 貼紙/吊飾/立牌', '模切異形 · 燙金可選', '100 張起 · 快速打樣'],
      en: ['Anime merch · stickers/charms/standees', 'Die-cut shapes · foil option', 'From 100 · fast proofs'],
      ja: ['アニメグッズ・ステッカー/チャーム/スタンド', 'ダイカット・箔押し選択可', '100枚から・迅速校正'],
    }},
    { key: 'vtuber', scenarios: {
      'zh-hk': ['VTuber 應援周邊印刷', '螢光色/透明貼紙 · 應援扇', '50 張起 · 活動急單可接'],
      en: ['VTuber fan goods printing', 'Fluorescent/transparent stickers · fans', 'From 50 · event rush OK'],
      ja: ['VTuber応援グッズ印刷', '蛍光/透明ステッカー・応援うちわ', '50枚から・イベント特急対応'],
    }},
  ],
};

const labels: Record<string, Record<string, string>> = {
  'zh-hk': {
    title: '快速選擇您的場景',
    subtitle: '從 3 個最常見的行業開始，了解這個品類適合印什麼。',
    moreLink: '查看完整行業方案 →',
    fallbackHook: '專業印刷服務, 100 個起印, ISO 9001 認證, 30 秒 AI 即時報價',
  },
  en: {
    title: 'Quickly Find Your Use Case',
    subtitle: 'Start with 3 of the most common industries to see what you can print in this category.',
    moreLink: 'View All Industry Solutions →',
    fallbackHook: 'Professional printing service, 100 MOQ, ISO 9001 certified, 30-second AI instant quote',
  },
  ja: {
    title: 'あなたの用途を素早く見つける',
    subtitle: '3つの主要業界から、このカテゴリーで印刷可能なものを確認できます。',
    moreLink: 'すべての業界ソリューションを見る →',
    fallbackHook: 'プロ印刷サービス、100個から対応、ISO 9001認証、30秒AI即時見積',
  },
};

export function CategorySharpHooks({
  locale,
  categorySlug,
}: {
  locale: Locale;
  categorySlug: string;
}) {
  const industries = CATEGORY_INDUSTRIES[categorySlug]?.[locale] || [];
  const scenarios = categoryIndustryScenarios[categorySlug] || [];
  const t = labels[locale] || labels['zh-hk'];

  // Fallback when no scenario data
  if (scenarios.length === 0) {
    return (
      <section className="bg-gradient-to-b from-white to-blue-50/30 border-y border-blue-100/60">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-sm md:text-base text-gray-600">
            {t.fallbackHook}
          </p>
        </div>
      </section>
    );
  }

  // Take first 3 scenarios — the "top 3 use cases" pattern proven in textbooks.html
  const top3 = scenarios.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/20 to-gray-50 border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Section header — compact, no H2 to keep this as visual anchor not article section */}
        <div className="mb-4 sm:mb-5">
          <p className="text-xs sm:text-sm font-semibold text-[#2873F5] uppercase tracking-wider mb-1">
            {locale === 'zh-hk' ? '快速開始' : locale === 'en' ? 'Quick Start' : 'クイックスタート'}
          </p>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
            {t.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">{t.subtitle}</p>
        </div>

        {/* 3-column sharp hook cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {top3.map((scenario, idx) => {
            const industryName = industries[idx] || '';
            const scenarioLines = scenario.scenarios[locale] || scenario.scenarios['zh-hk'];
            return (
              <div
                key={scenario.key}
                className="bg-white rounded-xl border border-gray-200 hover:border-[#2873F5] hover:shadow-md transition-all p-4 sm:p-5 group"
              >
                {/* Industry name with index badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#2873F5] to-[#1E5FD1] text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {industryName}
                  </span>
                </div>

                {/* 3 sharp hook bullets */}
                <ul className="space-y-1.5">
                  {scenarioLines.map((line, lineIdx) => (
                    <li
                      key={lineIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 leading-relaxed"
                    >
                      <span className="text-[#F87314] mt-0.5 flex-shrink-0">●</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* "View more" link — cross-link to CategoryIndustries detail section below */}
        <div className="mt-4 text-center">
          <a
            href="#industries"
            className="inline-flex items-center text-sm font-medium text-[#2873F5] hover:text-[#1E5FD1] transition-colors"
          >
            {t.moreLink}
          </a>
        </div>
      </div>
    </section>
  );
}