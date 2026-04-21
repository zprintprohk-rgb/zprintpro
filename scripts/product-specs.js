// 各品类规格参数映射
const specsByCategory = {
  'business-cards': {
    material: { zh: '300g-400g 銅版紙/剛古紙', en: '300g-400g Art/Conqueror Paper', ja: '300g-400g コート/コンカラー紙' },
    size: { zh: '90×54mm（標準）', en: '90×54mm (Standard)', ja: '90×54mm（標準）' },
    finish: { zh: '啞膠/光膠/局部UV/燙金', en: 'Matte/Gloss/Spot UV/Foil', ja: 'マット/グロス/局部UV/箔押し' },
  },
  'stickers': {
    material: { zh: 'PVC防水材質 / 合成紙', en: 'PVC Waterproof / Synthetic Paper', ja: 'PVC防水材質 / 合成紙' },
    size: { zh: '按客戶要求模切', en: 'Custom Die-cut', ja: 'カスタムダイカット' },
    finish: { zh: '光膜/啞膜', en: 'Gloss/Matte Lamination', ja: 'グロス/マットラミネーション' },
  },
  'paper-bags': {
    material: { zh: '牛皮紙 / 白卡紙 / 環保紙', en: 'Kraft / White Card / Eco Paper', ja: 'クラフト/白カード/エコ紙' },
    size: { zh: '多種尺寸可選', en: 'Multiple sizes', ja: '複数サイズ' },
    finish: { zh: '燙金/UV/凹凸', en: 'Foil/UV/Emboss', ja: '箔押し/UV/エンボス' },
  },
  'flyers': {
    material: { zh: '128g-250g 銅版紙', en: '128g-250g Art Paper', ja: '128g-250g コート紙' },
    size: { zh: 'A4(210×297mm) / A5 / A3', en: 'A4(210×297mm) / A5 / A3', ja: 'A4(210×297mm) / A5 / A3' },
    finish: { zh: '單面/雙面 / 摺頁', en: 'Single/Double sided / Folded', ja: '片面/両面 / 折りパンフレット' },
  },
  'posters': {
    material: { zh: '128g-200g 銅版紙 / 相紙', en: '128g-200g Art Paper / Photo Paper', ja: '128g-200g コート紙 / 写真用紙' },
    size: { zh: 'A2 / A1 / A0 / 自定', en: 'A2 / A1 / A0 / Custom', ja: 'A2 / A1 / A0 / カスタム' },
    finish: { zh: 'PP裱貼 / 啞膜', en: 'PP Lamination / Matte', ja: 'PPラミネート / マット' },
  },
  'packaging': {
    material: { zh: '白卡紙 / 牛皮紙 / 瓦楞紙', en: 'White Card / Kraft / Corrugated', ja: '白カード / クラフト / 段ボール' },
    size: { zh: '按客戶要求定制', en: 'Custom Size', ja: 'カスタムサイズ' },
    finish: { zh: '覆膜/UV/燙金/凹凸', en: 'Lamination/UV/Foil/Emboss', ja: 'ラミネート/UV/箔押し/エンボス' },
  },
  'red-packets': {
    material: { zh: '128g-200g 特種紙', en: '128g-200g Specialty Paper', ja: '128g-200g 特殊紙' },
    size: { zh: '標準利是封尺寸', en: 'Standard Red Packet Size', ja: '標準ポチ袋サイズ' },
    finish: { zh: '燙金/浮雕/UV', en: 'Foil/Emboss/UV', ja: '箔押し/エンボス/UV' },
  },
  'calendars': {
    material: { zh: '250g-300g 銅版紙', en: '250g-300g Art Paper', ja: '250g-300g コート紙' },
    size: { zh: 'A4 / A3 / 自定', en: 'A4 / A3 / Custom', ja: 'A4 / A3 / カスタム' },
    finish: { zh: '騎馬釘/圈裝/膠裝', en: 'Saddle Stitch/Spiral/Perfect Bound', ja: '中綴じ/スパイラル/無線綴じ' },
  },
  'menus': {
    material: { zh: 'PVC / 157g銅版紙 / 過膠', en: 'PVC / 157g Art Paper / Laminated', ja: 'PVC / 157gコート紙 / ラミネート' },
    size: { zh: 'A4 / A5 / 三折', en: 'A4 / A5 / Trifold', ja: 'A4 / A5 / 三つ折り' },
    finish: { zh: '光膜/啞膜/軟膠', en: 'Gloss/Matte/Soft PVC', ja: 'グロス/マット/ソフトPVC' },
  },
  'banners': {
    material: { zh: '戶外燈布 / 背膠 / 網格布', en: 'Outdoor Vinyl / Adhesive / Mesh', ja: '屋外ビニール / 粘着 / メッシュ' },
    size: { zh: '按平方米計算', en: 'Per square meter', ja: '平方メートル単位' },
    finish: { zh: '包邊/打孔/穿繩', en: 'Hemming/Grommets/Ropes', ja: 'ヘミング/ハトメ/ロープ' },
  },
  'books': {
    material: { zh: '200g封面 + 157g內頁', en: '200g Cover + 157g Inner', ja: '200g表紙 + 157g本文' },
    size: { zh: 'A4 / A5 / B5 / 自定', en: 'A4 / A5 / B5 / Custom', ja: 'A4 / A5 / B5 / カスタム' },
    finish: { zh: '騎馬釘/膠裝/精裝', en: 'Saddle/Perfect/Hardcover', ja: '中綴じ/無線綴じ/ハードカバー' },
  },
  'envelopes': {
    material: { zh: '100g-150g 書紙 / 牛皮紙', en: '100g-150g Writing / Kraft Paper', ja: '100g-150g 書籍紙 / クラフト紙' },
    size: { zh: 'DL / C5 / C4 / 自定', en: 'DL / C5 / C4 / Custom', ja: 'DL / C5 / C4 / カスタム' },
    finish: { zh: '單色/彩色印刷', en: 'Single/Full Color', ja: '単色/フルカラー' },
  },
  'educational': {
    material: { zh: '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
    size: { zh: '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
    finish: { zh: '按產品類型', en: 'Per Product Type', ja: '製品タイプ別' },
  },
};

console.log(JSON.stringify(specsByCategory, null, 2));
