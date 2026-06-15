/**
 * 产品详情Tabs组件
 * 切换显示产品详情、规格参数、配送信息
 * 修复：根据产品品类动态显示规格参数，不再硬编码名片数据
 * 本地化：EN 版显示美式尺寸、国际物流
 */

'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { getProductDescription } from '@/data/products';

interface ProductTabsProps {
  product: Product;
  locale: Locale;
}

// 各品類規格參數映射 — 按 slug 索引（支援 educational 4 SKU 各自獨立）
const specsBySlug: Record<string, {
  material: Record<string, string>;
  size: Record<string, string>;
  finish: Record<string, string>;
}> = {
  'business-cards': {
    material: { 'zh-hk': '300g-400g 銅版紙/剛古紙', en: '300g-400g Art/Conqueror Paper', ja: '300g-400g コート/コンカラー紙' },
    size: { 'zh-hk': '90×54mm（標準）', en: '3.5×2.1" (Standard Business Card)', ja: '90×54mm（標準）' },
    finish: { 'zh-hk': '啞膠/光膠/局部UV/燙金', en: 'Matte/Gloss/Spot UV/Foil', ja: 'マット/グロス/スポットUV/箔押し' },
  },
  'stickers': {
    material: { 'zh-hk': 'PVC防水材質 / 合成紙', en: 'PVC Waterproof / Synthetic Paper', ja: 'PVC防水素材 / 合成紙' },
    size: { 'zh-hk': '按客戶要求模切', en: 'Custom Die-cut', ja: 'カスタムダイカット' },
    finish: { 'zh-hk': '光膜/啞膜', en: 'Gloss/Matte Lamination', ja: 'グロス/マットラミネーション' },
  },
  'paper-bags': {
    material: { 'zh-hk': '牛皮紙 / 白卡紙 / 環保紙', en: 'Kraft / White Card Stock / Eco Paper', ja: 'クラフト/白カード/エコ紙' },
    size: { 'zh-hk': '多種尺寸可選', en: 'Multiple sizes available (small/medium/large)', ja: '複数サイズ' },
    finish: { 'zh-hk': '燙金/UV/凹凸', en: 'Foil/UV/Emboss', ja: '箔押し/UV/エンボス' },
  },
  'flyers': {
    material: { 'zh-hk': '128g-250g 銅版紙', en: '100lb-148lb Gloss Text Stock', ja: '128g-250g コート紙' },
    size: { 'zh-hk': 'A4(210×297mm) / A5 / A3', en: 'Letter (8.5×11") / Half-Letter (5.5×8.5") / Tabloid (11×17")', ja: 'A4(210×297mm) / A5 / A3' },
    finish: { 'zh-hk': '單面/雙面 / 摺頁', en: 'Single/Double sided / Folded', ja: '片面/両面 / 折りパンフレット' },
  },
  'posters': {
    material: { 'zh-hk': '128g-200g 銅版紙 / 相紙', en: '128g-200g Art Paper / Photo Paper', ja: '128g-200g コート紙 / 写真用紙' },
    size: { 'zh-hk': 'A2 / A1 / A0 / 自定', en: 'Tabloid / Poster / Custom', ja: 'A2 / A1 / A0 / カスタム' },
    finish: { 'zh-hk': 'PP裱貼 / 啞膜', en: 'PP Lamination / Matte', ja: 'PPラミネート / マット' },
  },
  'packaging': {
    material: { 'zh-hk': '白卡紙 / 牛皮紙 / 瓦楞紙', en: 'White Card / Kraft / Corrugated', ja: '白カード / クラフト / 段ボール' },
    size: { 'zh-hk': '按客戶要求定制', en: 'Custom Size', ja: 'カスタムサイズ' },
    finish: { 'zh-hk': '覆膜/UV/燙金/凹凸', en: 'Lamination/UV/Foil/Emboss', ja: 'ラミネート/UV/箔押し/エンボス' },
  },
  'red-packets': {
    material: { 'zh-hk': '128g-200g 特種紙', en: '128g-200g Specialty Paper', ja: '128g-200g 特殊紙' },
    size: { 'zh-hk': '標準利是封尺寸', en: 'Standard Red Packet Size', ja: '標準ポチ袋サイズ' },
    finish: { 'zh-hk': '燙金/浮雕/UV', en: 'Foil/Emboss/UV', ja: '箔押し/エンボス/UV' },
  },
  'calendars': {
    material: { 'zh-hk': '250g-300g 銅版紙', en: '250g-300g Art Paper', ja: '250g-300g コート紙' },
    size: { 'zh-hk': 'A4 / A3 / 自定', en: 'Letter / Tabloid / Custom', ja: 'A4 / A3 / カスタム' },
    finish: { 'zh-hk': '騎馬釘/圈裝/膠裝', en: 'Saddle Stitch/Spiral/Perfect Bound', ja: '中綴じ/スパイラル/無線綴じ' },
  },
  'menus': {
    material: { 'zh-hk': 'PVC / 157g銅版紙 / 過膠', en: 'PVC / 100lb Art Paper / Laminated', ja: 'PVC / 157gコート紙 / ラミネート' },
    size: { 'zh-hk': 'A4 / A5 / 三折', en: 'Letter / Half-Letter / Trifold', ja: 'A4 / A5 / 三つ折り' },
    finish: { 'zh-hk': '光膜/啞膜/軟膠', en: 'Gloss/Matte/Soft PVC', ja: 'グロス/マット/ソフトPVC' },
  },
  'banners': {
    material: { 'zh-hk': '戶外燈布 / 背膠 / 網格布', en: 'Outdoor Vinyl / Adhesive / Mesh', ja: '屋外ビニール / 粘着 / メッシュ' },
    size: { 'zh-hk': '按平方米計算', en: 'Per square foot', ja: '平方メートル単位' },
    finish: { 'zh-hk': '包邊/打孔/穿繩', en: 'Hemming/Grommets/Ropes', ja: 'ヘミング/ハトメ/ロープ' },
  },
  'books': {
    material: { 'zh-hk': '200g封面 + 157g內頁', en: '200g Cover + 157g Inner', ja: '200g表紙 + 157g本文' },
    size: { 'zh-hk': 'A4 / A5 / B5 / 自定', en: 'Letter / Half-Letter / B5 / Custom', ja: 'A4 / A5 / B5 / カスタム' },
    finish: { 'zh-hk': '騎馬釘/膠裝/精裝', en: 'Saddle/Perfect/Hardcover', ja: '中綴じ/無線綴じ/ハードカバー' },
  },
  'envelopes': {
    material: { 'zh-hk': '100g-150g 書紙 / 牛皮紙', en: '100g-150g Writing / Kraft Paper', ja: '100g-150g 書籍紙 / クラフト紙' },
    size: { 'zh-hk': 'DL / C5 / C4 / 自定', en: '#10 / A2 / A4 / Custom', ja: 'DL / C5 / C4 / カスタム' },
    finish: { 'zh-hk': '單色/彩色印刷', en: 'Single/Full Color', ja: '単色/フルカラー' },
  },
  // Educational 4 SKU — 各自獨立規格（之前統一填「按產品類型」是 bug）
  'exercise-books': {
    material: { 'zh-hk': '80g-100g 高級書紙 / 道林紙', en: '80g-100g Premium Book / Wood-free Paper', ja: '80g-100g 高級書籍紙/上質紙' },
    size: { 'zh-hk': 'A4 / B5 / 16 開', en: 'A4 / B5 / 16-mo', ja: 'A4 / B5 / 16 判' },
    finish: { 'zh-hk': '騎馬釘裝訂（封面四色印刷）', en: 'Saddle-stitch (4-color cover)', ja: '中綴じ（表紙4色印刷）' },
  },
  'certificates': {
    material: { 'zh-hk': '200g-250g 水印紙 / 棉質紙 / 無酸紙', en: '200g-250g Watermarked / Cotton / Acid-free Paper', ja: '200g-250g 透かし紙/コットン紙/無酸紙' },
    size: { 'zh-hk': 'A4 / A5 / 客製', en: 'A4 / A5 / Custom', ja: 'A4 / A5 / カスタム' },
    finish: { 'zh-hk': '燙金 / 燙銀 / 玫瑰金 / 壓凹 / 浮水印', en: 'Gold/Silver/Rose Gold Foil / Emboss / Watermark', ja: '金/銀/ローズ金箔 / エンボス / 透かし' },
  },
  'school-flyers': {
    material: { 'zh-hk': '128g-157g 高級銅版紙 / 書紙', en: '128g-157g Premium Gloss / Book Paper', ja: '128g-157g 高級コート紙/書籍紙' },
    size: { 'zh-hk': 'A4 / A5 / 16 開', en: 'A4 / A5 / 16-mo', ja: 'A4 / A5 / 16 判' },
    finish: { 'zh-hk': '四色柯式 / 數碼印刷 / 單雙面可選', en: '4-color Offset / Digital / Single or Double-sided', ja: '4色オフセット/デジタル/片面・両面' },
  },
  'textbooks': {
    material: { 'zh-hk': '80g-100g 道林紙 / 書紙', en: '80g-100g Wood-free / Book Paper', ja: '80g-100g 上質紙/書籍紙' },
    size: { 'zh-hk': 'A4 / B5 / 16 開', en: 'A4 / B5 / 16-mo', ja: 'A4 / B5 / 16 判' },
    finish: { 'zh-hk': '騎馬釘 / 膠裝（封面四色 / 內頁單雙色）', en: 'Saddle / Perfect Bound (4-color cover, 1-2 color inner)', ja: '中綴じ/無線綴じ（表紙4色・本文単〜2色）' },
  },
};

export function ProductTabs({ product, locale }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

  const translations = {
    'zh-hk': {
      description: '產品詳情',
      specs: '規格參數',
      shipping: '配送信息',
      material: '材質',
      size: '尺寸',
      finish: '表面處理',
      deliveryTime: '交貨時間',
      shippingMethod: '配送方式',
      freeShipping: '免運條件',
      features: '產品特點',
      useCases: '適用場景',
      priceNote: '價格說明',
    },
    en: {
      description: 'Description',
      specs: 'Specifications',
      shipping: 'Shipping',
      material: 'Material',
      size: 'Size',
      finish: 'Finish',
      deliveryTime: 'Delivery Time',
      shippingMethod: 'Shipping Method',
      freeShipping: 'Free Shipping',
      features: 'Product Features',
      useCases: 'Use Cases',
      priceNote: 'Pricing Note',
    },
    ja: {
      description: '製品詳細',
      specs: '仕様',
      shipping: '配送情報',
      material: '素材',
      size: 'サイズ',
      finish: '仕上げ',
      deliveryTime: '納期',
      shippingMethod: '配送方法',
      freeShipping: '送料無料条件',
      features: '製品特徴',
      useCases: '使用場面',
      priceNote: '価格について',
    },
  };

  const t = translations[locale];
  const description = getProductDescription(product, locale);
  // 用 slug 索引（educational 4 SKU 各自獨立規格）
  const specs = specsBySlug[product.slug] || specsBySlug[product.category] || specsBySlug['business-cards'];

  const getSpec = (key: 'material' | 'size' | 'finish') => {
    return specs[key][locale] || specs[key]['en'];
  };

  // 根據 slug 查找；找不到 fallback 到 category；都找不到用通用 features
  const getFeatures = () => {
    const map: Record<string, string[][]> = {
      'paper-bags': ['zh-hk,多種尺寸可選,牛皮紙/白卡紙,加厚手柄牢固,可自訂Logo印刷'.split(','), 'en,Multiple sizes available,Kraft/white card stock,Reinforced handles,Full-color custom logo printing'.split(','), 'ja,多種サイズ対応,クラフト/白カード,補強ハンドル,フルカラーロゴ印刷'.split(',')],
      'business-cards': ['zh-hk,高品質四色印刷,多種紙張可選,即日交貨服務,免費設計諮詢'.split(','), 'en,High-quality full-color printing,Multiple paper options,Same-day delivery,Free design consultation'.split(','), 'ja,高品質4色印刷,複数の紙種選択可,即日納品サービス,無料デザイン相談'.split(',')],
      'flyers': ['zh-hk,標準A4/A5尺寸,157g銅版紙,色彩鮮豔飽滿,適合大量派發'.split(','), 'en,Standard Letter (8.5×11") & Half-Letter sizes,100lb gloss text stock,Vibrant full-color printing,Perfect for mass distribution'.split(','), 'ja,標準A4/A5サイズ,157gコート紙,鮮やかな色彩,大量配布に最適'.split(',')],
      'stickers': ['zh-hk,PVC防水材質,異形模切可選,多種尺寸定制,撕不殘膠可選'.split(','), 'en,PVC waterproof,Custom die-cut shapes,Multiple sizes,Removable adhesive option'.split(','), 'ja,PVC防水素材,カスタムダイカット,複数サイズ,再剥離粘着剤選択可'.split(',')],
      'posters': ['zh-hk,A1/A2/A3 多尺寸,高清柯式印刷,PP裱貼可選,展覽活動適用'.split(','), 'en,A1/A2/A3 sizes,High-resolution offset,PP lamination option,Exhibition-ready'.split(','), 'ja,A1/A2/A3サイズ,高解像度オフセット,PPラミネート選択可,展示対応'.split(',')],
      'packaging': ['zh-hk,白卡/牛皮紙/瓦楞,結構設計免費,燙金UV可選,FSC認證紙'.split(','), 'en,White card/Kraft/Corrugated,Free structural design,Foil/UV options,FSC certified'.split(','), 'ja,白カード/クラフト/段ボール,構造設計無料,箔/UV選択可,FSC認証紙'.split(',')],
      'red-packets': ['zh-hk,120g-200g 紅色紙,燙金/浮雕/UV,客製Logo服務,婚禮企業適用'.split(','), 'en,120g-200g Red paper,Foil/Emboss/UV,Custom logo service,For weddings & corporate'.split(','), 'ja,120g-200g 紅色紙,箔押し/エンボス/UV,ロゴカスタム,婚礼・企業向け'.split(',')],
      'calendars': ['zh-hk,250g-300g 銅版紙,騎馬釘/圈裝/膠裝,封面燙金可選,座枱掛牆多款'.split(','), 'en,250g-300g Art paper,Saddle/Spiral/Perfect bound,Foil cover options,Desk or wall formats'.split(','), 'ja,250g-300g コート紙,中綴じ/スパイラル/無線,箔押し表紙選択可,卓上/壁掛け'.split(',')],
      'menus': ['zh-hk,PVC防水耐用,過膠防油,多摺頁設計,咖啡廳餐廳適用'.split(','), 'en,PVC waterproof durable,Laminated oil-proof,Multi-fold design,For cafés & restaurants'.split(','), 'ja,PVC防水耐久,ラミネート耐油,多折デザイン,カフェ・レストラン向け'.split(',')],
      'banners': ['zh-hk,戶外耐候 3-6 個月,UV固化墨水,包邊打孔可選,展會活動適用'.split(','), 'en,Outdoor 3-6 months,UV-cured inks,Hemming/grommets,For exhibitions & events'.split(','), 'ja,屋外耐候3-6ヶ月,UV硬化インク,ヘミング/ハトメ,展示・イベント向け'.split(',')],
      'books': ['zh-hk,騎馬釘/膠裝/精裝,封面覆膜可選,內頁銅版紙,同人誌紀念冊適用'.split(','), 'en,Saddle/Perfect/Hardcover,Cover lamination,Glossy inner pages,For zines & memorials'.split(','), 'ja,中綴じ/無線綴じ/ハード,表紙ラミネート,光沢本文,同人誌・記念誌向け'.split(',')],
      'envelopes': ['zh-hk,DL/C5/C4 國際標準,自黏封口可選,燙金Logo免費,企業郵寄適用'.split(','), 'en,DL/C5/C4 standard,Self-seal option,Free foil logo,For corporate mailings'.split(','), 'ja,DL/C5/C4規格,自己封緘選択可,箔押しロゴ無料,企業郵送向け'.split(',')],
      'exercise-books': ['zh-hk,FSC認證環保紙,封面免費印Logo,橫線/方格/田字格可選,學校補習社適用'.split(','), 'en,FSC certified eco paper,Free cover logo,Ruled/grid/blank inner,For schools & tutors'.split(','), 'ja,FSC認証エコ紙,表紙ロゴ無料,横罫/方眼/白紙選択可,学校・塾向け'.split(',')],
      'certificates': ['zh-hk,燙金/燙銀/玫瑰金,防偽浮水印,ISO 9706 永久保存,大學企業適用'.split(','), 'en,Gold/Silver/Rose Gold foil,Anti-counterfeit watermark,ISO 9706 archival,For universities & corporates'.split(','), 'ja,金/銀/ローズ金箔,偽造防止透かし,ISO 9706永久保存,大学・企業向け'.split(',')],
      'school-flyers': ['zh-hk,128g-157g 銅版紙,四色柯式印刷,QR Code報名連結,學校招生適用'.split(','), 'en,128g-157g Gloss paper,4-color offset,QR registration link,For school enrollment'.split(','), 'ja,128g-157g コート紙,4色オフセット,QR登録リンク,学校募集向け'.split(',')],
      'textbooks': ['zh-hk,道林紙輕薄不反光,符合教育局規範,ISBN 條碼加印,補習社出版適用'.split(','), 'en,Lightweight non-glare paper,Education Bureau compliant,ISBN barcode add-on,For tutors & publishers'.split(','), 'ja,軽量非反射紙,教育局準拠,ISBNバーコード追加,塾・出版向け'.split(',')],
    };
    const list = map[product.slug] || map[product.category];
    if (!list) {
      return locale === 'zh-hk' ? ['高品質印刷', '環保材料', '即日交貨', '免費設計諮詢']
        : locale === 'en' ? ['High-quality printing', 'Eco-friendly materials', 'Same-day delivery', 'Free design consultation']
        : ['高品質印刷', '環境に優しい素材', '即日納品', '無料デザイン相談'];
    }
    return locale === 'zh-hk' ? list[0].slice(1) : locale === 'en' ? list[1].slice(1) : list[2].slice(1);
  };

  const getUseCases = () => {
    const map: Record<string, string[][]> = {
      'business-cards': ['zh-hk,商務會議,品牌推廣,個人形象,公司介紹'.split(','), 'en,Business meetings,Brand promotion,Personal branding,Company introduction'.split(','), 'ja,ビジネスミーティング,ブランドプロモーション,個人ブランディング,会社紹介'.split(',')],
      'flyers': ['zh-hk,產品推廣,活動宣傳,餐飲外賣,開業慶典'.split(','), 'en,Product promotion,Event advertising,Food delivery,Grand opening'.split(','), 'ja,製品プロモーション,イベント宣伝,フードデリバリー,開業セレモニー'.split(',')],
      'stickers': ['zh-hk,產品標籤,品牌貼紙,包裝裝飾,促銷活動'.split(','), 'en,Product labels,Brand stickers,Packaging decoration,Promotions'.split(','), 'ja,製品ラベル,ブランドステッカー,包装装飾,プロモーション'.split(',')],
      'paper-bags': ['zh-hk,零售購物,禮品包裝,品牌宣傳,活動贈品'.split(','), 'en,Retail shopping,Gift packaging,Brand promotion,Event giveaways'.split(','), 'ja,小売ショッピング,ギフト包装,ブランドプロモーション,イベント景品'.split(',')],
      'posters': ['zh-hk,商場展覽,藝廊開幕,演唱會宣傳,品牌活動'.split(','), 'en,Mall exhibitions,Gallery openings,Concert promotion,Brand events'.split(','), 'ja,商场展示,ギャラリー開幕,コンサート宣伝,ブランドイベント'.split(',')],
      'packaging': ['zh-hk,電商物流,禮品包裝,品牌旗艦,節日禮盒'.split(','), 'en,E-commerce shipping,Gift packaging,Brand flagship,Festival gift boxes'.split(','), 'ja,EC物流,ギフト包装,ブランドフラッグ,祝日ギフトボックス'.split(',')],
      'red-packets': ['zh-hk,企業年會,婚禮回禮,品牌活動,會員回饋'.split(','), 'en,Corporate events,Wedding favors,Brand campaigns,Member rewards'.split(','), 'ja,企業イベント,婚礼引出物,ブランドキャンペーン,会員特典'.split(',')],
      'calendars': ['zh-hk,企業禮品,品牌年曆,客戶送禮,辦公擺設'.split(','), 'en,Corporate gifts,Brand calendars,Client gifts,Office décor'.split(','), 'ja,企業ギフト,ブランドカレンダー,顧客ギフト,オフィス装飾'.split(',')],
      'menus': ['zh-hk,咖啡廳,茶餐廳,酒吧,居酒屋'.split(','), 'en,Cafés,Tea restaurants,Bars,Izakaya'.split(','), 'ja,カフェ,茶餐廳,バー,居酒屋'.split(',')],
      'banners': ['zh-hk,建築圍板,工地告示,巴士站,廣告燈箱'.split(','), 'en,Construction hoarding,Site notices,Bus stops,Ad lightboxes'.split(','), 'ja,建設現場囲い,現場告知,バス停,広告灯箱'.split(',')],
      'books': ['zh-hk,同人誌,學校刊物,產品手冊,會議議程'.split(','), 'en,Zines,School publications,Product manuals,Meeting agendas'.split(','), 'ja,同人誌,学校出版物,製品マニュアル,会議アジェンダ'.split(',')],
      'envelopes': ['zh-hk,商務信函,合約標書,正式文件,品牌郵件'.split(','), 'en,Business letters,Contract bids,Official documents,Brand mailings'.split(','), 'ja,ビジネスレター,契約入札,公式文書,ブランド郵送'.split(',')],
      'exercise-books': ['zh-hk,K12 學校,補習社,暑期作業,班級教材'.split(','), 'en,K12 schools,Tutoring centers,Summer homework,Class materials'.split(','), 'ja,K12学校,塾,夏休みの宿題,クラス教材'.split(',')],
      'certificates': ['zh-hk,大學畢業,專業認證,企業培訓,競賽獎狀'.split(','), 'en,University graduation,Professional certs,Corporate training,Competition awards'.split(','), 'ja,大学卒業,專業資格,企業研修,コンペ賞状'.split(',')],
      'school-flyers': ['zh-hk,招生宣傳,活動通告,家長通知,課程介紹'.split(','), 'en,Enrollment promotion,Event notices,Parent letters,Course intros'.split(','), 'ja,募集宣伝,イベント通知,保護者通知,コース紹介'.split(',')],
      'textbooks': ['zh-hk,補習社教材,出版社,K12 學校,專業培訓'.split(','), 'en,Tutor materials,Publishers,K12 schools,Professional training'.split(','), 'ja,塾教材,出版社,K12学校,專業研修'.split(',')],
    };
    const list = map[product.slug] || map[product.category];
    if (!list) {
      return locale === 'zh-hk' ? ['企業宣傳', '活動推廣', '產品包裝', '品牌展示']
        : locale === 'en' ? ['Corporate promotion', 'Event promotion', 'Product packaging', 'Brand display']
        : ['企業プロモーション', 'イベントプロモーション', '製品包装', 'ブランド展示'];
    }
    return locale === 'zh-hk' ? list[0].slice(1) : locale === 'en' ? list[1].slice(1) : list[2].slice(1);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      {/* Tab导航 */}
      <div className="flex border-b border-gray-100">
        {(['description', 'specs', 'shipping'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-lg font-medium transition-colors ${
              activeTab === tab
                ? 'text-[#2873F5] border-b-2 border-[#2873F5]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4">
                <h4 className="font-medium text-lg mb-2">{t.features}</h4>
                <ul className="text-base text-gray-600 space-y-1">
                  {getFeatures().map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg mb-2">{t.useCases}</h4>
                <ul className="text-base text-gray-600 space-y-1">
                  {getUseCases().map((u, i) => (
                    <li key={i}>• {u}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">{t.material}</span>
                <span className="font-medium text-gray-900">{getSpec('material')}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">{t.size}</span>
                <span className="font-medium text-gray-900">{getSpec('size')}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">{t.finish}</span>
                <span className="font-medium text-gray-900">{getSpec('finish')}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">{t.deliveryTime}</span>
                <span className="font-medium text-gray-900">
                  {locale === 'zh-hk' ? '3-5工作日' : locale === 'en' ? '3-5 business days' : '3-5営業日'}
                </span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-base text-gray-700">
                <span className="font-medium">{t.priceNote}：</span>
                {locale === 'zh-hk'
                  ? '以上價格僅供參考，實際價格可能因紙張、工藝、數量而異。請聯繫客服確認最終報價。'
                  : locale === 'en'
                  ? 'Prices are for reference only. Actual pricing may vary based on paper, finish, and quantity. Please contact us for a final quote.'
                  : '価格は参考です。実際の価格は紙質、加工、数量により異なります。最終見積もりはお問い合わせください。'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2">{t.shippingMethod}</h4>
              <p className="text-base text-gray-600">
                {locale === 'zh-hk'
                  ? '我們提供多種配送方式，包括順豐速運、本地快遞及門市自取。觀塘工廠可港鐵站交收。'
                  : locale === 'en'
                  ? 'We ship worldwide via DHL/FedEx Express. Ships to the US, UK, and Australia within 5-7 business days. Tracking number provided for all orders.'
                  : 'SFエクスプレス、ローカルクーリエ、店舗受取など、複数の配送オプションを提供しています。観塘工場でMTR受取可能。'}
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-lg mb-2">{t.freeShipping}</h4>
              <p className="text-base text-gray-600">
                {locale === 'zh-hk'
                  ? '訂單滿HK$500即可享受免費送貨服務（香港地區）。離島及偏遠地區可能需要額外費用。'
                  : locale === 'en'
                  ? 'Free international shipping included on all EN-market orders. Duties and taxes may apply depending on destination country.'
                  : '注文金額HK$500以上で送料無料（香港地区）。離島は追加料金がかかる場合があります。'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}