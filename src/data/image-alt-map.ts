// src/data/image-alt-map.ts
// SEO/GEO 增强 Alt 标签映射表
// 格式：{产品关键词}-{工艺}-{地区}-{语言}

export const altTagMap: Record<string, Record<string, string>> = {
  flyers: {
    'zh-hk': '宣傳單張印刷-157g銅版紙-香港-繁體中文',
    en: 'flyer-printing-157gsm-art-paper-hong-kong-english',
    ja: 'チラシ印刷-157gアート紙-香港-日本語',
  },
  posters: {
    'zh-hk': '海報印刷-防水材質-香港-繁體中文',
    en: 'poster-printing-waterproof-material-hong-kong-english',
    ja: 'ポスター印刷-防水材質-香港-日本語',
  },
  stickers: {
    'zh-hk': '貼紙印刷-防水PVC透明-香港-繁體中文',
    en: 'sticker-printing-waterproof-pvc-clear-hong-kong-english',
    ja: 'シール印刷-防水PVC透明-香港-日本語',
  },
  'business-cards': {
    'zh-hk': '名片印刷-燙金棉紙局部UV-香港-繁體中文',
    en: 'business-card-printing-foil-cotton-spot-uv-hong-kong-english',
    ja: '名刺印刷-箔押しコットン局部UV-香港-日本語',
  },
  booklets: {
    'zh-hk': '畫冊印刷-騎馬釘膠裝覆膜-香港-繁體中文',
    en: 'booklet-printing-saddle-stitch-perfect-bound-hong-kong-english',
    ja: '冊子印刷-中綴じ無線綴じラミネート-香港-日本語',
  },
  'roll-up-banners': {
    'zh-hk': '易拉寶噴繪-鋁合金支架高清-香港-繁體中文',
    en: 'roll-up-banner-printing-aluminum-stand-hd-hong-kong-english',
    ja: 'ロールアップバナー印刷-アルミスタンド高画質-香港-日本語',
  },
  'paper-bags': {
    'zh-hk': '紙袋印刷-牛皮紙白卡紙環保-香港-繁體中文',
    en: 'paper-bag-printing-kraft-white-card-eco-hong-kong-english',
    ja: '紙袋印刷-クラフト紙白カードエコ-香港-日本語',
  },
  'packaging-boxes': {
    'zh-hk': '包裝盒定制-磁吸禮盒摺疊盒-香港-繁體中文',
    en: 'packaging-box-custom-magnetic-gift-foldable-hong-kong-english',
    ja: '包装盒オーダーメイド-磁吸ギフト折りたたみ-香港-日本語',
  },
  envelopes: {
    'zh-hk': '信封印刷-定制尺寸燙金-香港-繁體中文',
    en: 'envelope-printing-custom-size-foil-hong-kong-english',
    ja: '封筒印刷-オーダーサイズ箔押し-香港-日本語',
  },
  menus: {
    'zh-hk': '餐牌印刷-過膠防水材質-香港-繁體中文',
    en: 'menu-printing-laminated-waterproof-hong-kong-english',
    ja: 'メニュー印刷-ラミネート防水材質-香港-日本語',
  },
  certificates: {
    'zh-hk': '證書印刷-燙金凹凸壓印-香港-繁體中文',
    en: 'certificate-printing-foil-embossing-hong-kong-english',
    ja: '賞状印刷-箔押しエンボス加工-香港-日本語',
  },
  'exercise-books': {
    'zh-hk': '作業簿印刷-騎馬釘彩色封面-香港-繁體中文',
    en: 'exercise-book-printing-saddle-stitch-color-cover-hong-kong-english',
    ja: 'ワークブック印刷-中綴じカラーカバー-香港-日本語',
  },
  'large-format': {
    'zh-hk': '大格式噴繪-戶外高清寫真-香港-繁體中文',
    en: 'large-format-inkjet-outdoor-hd-canvas-hong-kong-english',
    ja: '大判インクジェット-屋外高画質キャンバス-香港-日本語',
  },
  'electronics-boxes': {
    'zh-hk': '電子產品包裝盒-手機盒耳機盒定制-香港-繁體中文',
    en: 'electronics-packaging-box-phone-earphone-custom-hong-kong-english',
    ja: '電子製品包装盒-スマホイヤホンオーダーメイド-香港-日本語',
  },
  'kraft-boxes': {
    'zh-hk': '牛皮紙盒印刷-環保禮品食品盒-香港-繁體中文',
    en: 'kraft-paper-box-printing-eco-gift-food-hong-kong-english',
    ja: 'クラフト紙箱印刷-エコギフト食品箱-香港-日本語',
  },
};

// 辅助函数：获取 Alt 标签
export function getAltTag(slug: string, locale: string): string {
  return altTagMap[slug]?.[locale] || `${slug}-custom-printing-hong-kong-${locale}`;
}
