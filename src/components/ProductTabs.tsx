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

// 各品类规格参数映射 — 根据品类动态显示
const specsByCategory: Record<string, {
  material: Record<string, string>;
  size: Record<string, string>;
  finish: Record<string, string>;
}> = {
  'business-cards': {
    material: { 'zh-hk': '300g-400g 銅版紙/剛古紙', en: '300g-400g Art/Conqueror Paper', ja: '300g-400g コート/コンカラー紙' },
    size: { 'zh-hk': '90×54mm（標準）', en: '3.5×2.1" (Standard Business Card)', ja: '90×54mm（標準）' },
    finish: { 'zh-hk': '啞膠/光膠/局部UV/燙金', en: 'Matte/Gloss/Spot UV/Foil', ja: 'マット/グロス/局部UV/箔押し' },
  },
  'stickers': {
    material: { 'zh-hk': 'PVC防水材質 / 合成紙', en: 'PVC Waterproof / Synthetic Paper', ja: 'PVC防水材質 / 合成紙' },
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
  'educational': {
    material: { 'zh-hk': '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
    size: { 'zh-hk': '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
    finish: { 'zh-hk': '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
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
  const specs = specsByCategory[product.category] || specsByCategory['educational'];

  const getSpec = (key: 'material' | 'size' | 'finish') => {
    return specs[key][locale] || specs[key]['en'];
  };

  // 根据品类生成特点
  const getFeatures = () => {
    const map: Record<string, string[][]> = {
      'paper-bags': ['zh-hk,多種尺寸可選,牛皮紙/白卡紙,加厚手柄牢固,可自訂Logo印刷'.split(','), 'en,Multiple sizes available,Kraft/white card stock,Reinforced handles,Full-color custom logo printing'.split(','), 'ja,多種サイズ対応,クラフト/白カード,補強ハンドル,フルカラーロゴ印刷'.split(',')],
      'business-cards': ['zh-hk,高品質四色印刷,多種紙張可選,即日交貨服務,免費設計諮詢'.split(','), 'en,High-quality full-color printing,Multiple paper options,Same-day delivery,Free design consultation'.split(','), 'ja,高品質4色印刷,複数の紙種選択可,即日納品サービス,無料デザイン相談'.split(',')],
      'flyers': ['zh-hk,標準A4/A5尺寸,157g銅版紙,色彩鮮豔飽滿,適合大量派發'.split(','), 'en,Standard Letter (8.5×11") & Half-Letter sizes,100lb gloss text stock,Vibrant full-color printing,Perfect for mass distribution'.split(','), 'ja,標準A4/A5サイズ,157gコート紙,鮮やかな色彩,大量配布に最適'.split(',')],
    };
    const list = map[product.category];
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
    };
    const list = map[product.category];
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
            <p className="text-gray-600 leading-relaxed">{description}</p>
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