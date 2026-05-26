/**
 * 产品规格变量多语言翻译映射表
 * 解决 variables label 硬编码中文导致 EN/JA 页面语言混乱的问题
 * 覆盖所有 64 个产品的 sizes / materials / finishings / quantities 标签
 */

import { Locale } from '@/lib/seo';

type LabelMap = Record<string, Record<Exclude<Locale, 'zh-hk'>, string>>;

const SIZES_ZH2EN: Record<string, string> = {
  'A0 (841×1189mm)': 'A0 (841×1189mm)',
  'A1 (594×841mm)': 'A1 (594×841mm)',
  'A2 (420×594mm)': 'A2 (420×594mm)',
  'A3 (297×420mm)': 'A3 (297×420mm)',
  'A4 (210×297mm)': 'A4 (210×297mm)',
  'A5 (148×210mm)': 'A5 (148×210mm)',
  'B4 (250×353mm)': 'B4 (250×353mm)',
  'B5 (176×250mm)': 'B5 (176×250mm)',
  'C4 (229×324mm)': 'C4 (229×324mm)',
  'C5 (162×229mm)': 'C5 (162×229mm)',
  'DL (110×220mm)': 'DL (110×220mm)',
  'DL (99×210mm)': 'DL (99×210mm)',
  '標準尺寸 (90×54mm)': 'Standard (90×54mm)',
  '標準 (90×170mm)': 'Standard (90×170mm)',
  '豪華 (120×220mm)': 'Deluxe (120×220mm)',
  '方形 (65×65mm)': 'Square (65×65mm)',
  '中尺寸(51-100mm)': 'Medium (51-100mm)',
  '小尺寸(≤50mm)': 'Small (≤50mm)',
  '大尺寸(>100mm)': 'Large (>100mm)',
  '小號(100×80×50mm)': 'Small (100×80×50mm)',
  '中號(150×120×80mm)': 'Medium (150×120×80mm)',
  '大號(200×180×100mm)': 'Large (200×180×100mm)',
  '小號(180×230×80mm)': 'Small (180×230×80mm)',
  '中號(250×300×100mm)': 'Medium (250×300×100mm)',
  '大號(320×400×120mm)': 'Large (320×400×120mm)',
  '小號(850×2000mm)': 'Small (850×2000mm)',
  '中號(1000×2500mm)': 'Medium (1000×2500mm)',
  '大號(1200×3000mm)': 'Large (1200×3000mm)',
  '大號 (100×190mm)': 'Large (100×190mm)',
};

const SIZES_ZH2JA: Record<string, string> = {
  'A0 (841×1189mm)': 'A0 (841×1189mm)',
  'A1 (594×841mm)': 'A1 (594×841mm)',
  'A2 (420×594mm)': 'A2 (420×594mm)',
  'A3 (297×420mm)': 'A3 (297×420mm)',
  'A4 (210×297mm)': 'A4 (210×297mm)',
  'A5 (148×210mm)': 'A5 (148×210mm)',
  'B4 (250×353mm)': 'B4 (250×353mm)',
  'B5 (176×250mm)': 'B5 (176×250mm)',
  'C4 (229×324mm)': 'C4 (229×324mm)',
  'C5 (162×229mm)': 'C5 (162×229mm)',
  'DL (110×220mm)': 'DL (110×220mm)',
  'DL (99×210mm)': 'DL (99×210mm)',
  '標準尺寸 (90×54mm)': '標準 (90×54mm)',
  '標準 (90×170mm)': '標準 (90×170mm)',
  '豪華 (120×220mm)': 'デラックス (120×220mm)',
  '方形 (65×65mm)': '正方形 (65×65mm)',
  '中尺寸(51-100mm)': '中型 (51-100mm)',
  '小尺寸(≤50mm)': '小型 (≤50mm)',
  '大尺寸(>100mm)': '大型 (>100mm)',
  '小號(100×80×50mm)': '小 (100×80×50mm)',
  '中號(150×120×80mm)': '中 (150×120×80mm)',
  '大號(200×180×100mm)': '大 (200×180×100mm)',
  '小號(180×230×80mm)': '小 (180×230×80mm)',
  '中號(250×300×100mm)': '中 (250×300×100mm)',
  '大號(320×400×120mm)': '大 (320×400×120mm)',
  '小號(850×2000mm)': '小 (850×2000mm)',
  '中號(1000×2500mm)': '中 (1000×2500mm)',
  '大號(1200×3000mm)': '大 (1200×3000mm)',
  '大號 (100×190mm)': '大 (100×190mm)',
};

const MATERIALS_ZH2EN: Record<string, string> = {
  '80g書紙': '80g Book Paper',
  '100g書紙': '100g Book Paper',
  '128g銅版紙': '128g Glossy Art Paper',
  '157g銅版紙': '157g Glossy Art Paper',
  '300g銅版紙': '300g Glossy Art Paper',
  '銅版紙': 'Glossy Art Paper',
  '120g彩色紙': '120g Colored Paper',
  '128g紅紙': '128g Red Paper',
  '157g厚紅紙': '157g Thick Red Paper',
  '200g厚紙': '200g Thick Card',
  '250g卡紙': '250g Cardstock',
  '300g卡紙': '300g Cardstock',
  '400g厚紙': '400g Thick Card',
  '白卡紙': 'White Cardstock',
  '硬紙板': 'Rigid Board',
  '牛皮紙': 'Kraft Paper',
  'PVC防水': 'PVC Waterproof',
  'PET透明': 'PET Transparent',
  'PP合成紙': 'PP Synthetic Paper',
  '防水帆布': 'Waterproof Canvas',
  '網孔布': 'Mesh Fabric',
  '旗幟布': 'Flag Fabric',
  '相紙': 'Photo Paper',
  '特種紙': 'Specialty Paper',
};

const MATERIALS_ZH2JA: Record<string, string> = {
  '80g書紙': '80g書籍用紙',
  '100g書紙': '100g書籍用紙',
  '128g銅版紙': '128gコート紙',
  '157g銅版紙': '157gコート紙',
  '300g銅版紙': '300gコート紙',
  '銅版紙': 'コート紙',
  '120g彩色紙': '120gカラー紙',
  '128g紅紙': '128g赤色紙',
  '157g厚紅紙': '157g厚口赤色紙',
  '200g厚紙': '200g厚紙',
  '250g卡紙': '250gカードストック',
  '300g卡紙': '300gカードストック',
  '400g厚紙': '400g厚紙',
  '白卡紙': 'ホワイトカード',
  '硬紙板': '硬質ボード',
  '牛皮紙': 'クラフト紙',
  'PVC防水': 'PVC防水',
  'PET透明': 'PET透明',
  'PP合成紙': 'PP合成紙',
  '防水帆布': '防水キャンバス',
  '網孔布': 'メッシュ生地',
  '旗幟布': 'フラッグ生地',
  '相紙': '写真用紙',
  '特種紙': '特殊紙',
};

const FINISHINGS_ZH2EN: Record<string, string> = {
  '無': 'None',
  '無窗口': 'No Window',
  '有窗口': 'With Window',
  '單面': 'Single-sided',
  '雙面': 'Double-sided',
  '單面印刷': 'Single-sided Print',
  '雙面印刷': 'Double-sided Print',
  '光膜': 'Gloss Lamination',
  '啞膜': 'Matte Lamination',
  '光膠': 'Gloss Glue',
  '啞膠': 'Matte Glue',
  '過膠': 'Lamination',
  'UV': 'UV Coating',
  '局部UV': 'Spot UV',
  '燙金': 'Hot Foil Stamping',
  '燙金/燙銀': 'Gold/Silver Foil',
  '燙金浮雕': 'Foil Embossing',
  '立體燙金': '3D Foil Stamping',
  '擊凸': 'Embossing',
  '凹凸': 'Emboss/Deboss',
  '摺疊': 'Folding',
  '摺頁': 'Folding',
  '打孔': 'Punch Hole',
  '騎馬釘': 'Saddle Stitching',
  '膠裝': 'Perfect Binding',
  '精裝': 'Hardcover',
  '鐵圈裝': 'Wire-O Binding',
  '釘裝': 'Stapling',
  'PP裱貼': 'PP Mounting',
  'PP護膜': 'PP Lamination',
  '泡沫板裱貼': 'Foam Board Mounting',
  '手挽繩': 'Handle Rope',
  '穿杆袋': 'Pole Pocket',
  '自黏封口': 'Self-adhesive Seal',
  '異形模切': 'Custom Die-cut',
};

const FINISHINGS_ZH2JA: Record<string, string> = {
  '無': 'なし',
  '無窗口': '窓なし',
  '有窗口': '窓あり',
  '單面': '片面',
  '雙面': '両面',
  '單面印刷': '片面印刷',
  '雙面印刷': '両面印刷',
  '光膜': 'グロスラミネート',
  '啞膜': 'マットラミネート',
  '光膠': 'グロス接着',
  '啞膠': 'マット接着',
  '過膠': 'ラミネート',
  'UV': 'UVコーティング',
  '局部UV': 'スポットUV',
  '燙金': '箔押し',
  '燙金/燙銀': '金/銀箔押し',
  '燙金浮雕': '箔エンボス',
  '立體燙金': '3D箔押し',
  '擊凸': 'エンボス加工',
  '凹凸': 'エンボス/デボス',
  '摺疊': '折り加工',
  '摺頁': '折り加工',
  '打孔': '穴あけ',
  '騎馬釘': '中綴じ',
  '膠裝': '無線綴じ',
  '精裝': 'ハードカバー',
  '鐵圈裝': 'ワイヤー綴じ',
  '釘裝': 'ホチキス綴じ',
  'PP裱貼': 'PPマウント',
  'PP護膜': 'PPラミネート',
  '泡沫板裱貼': 'フォームボードマウント',
  '手挽繩': '手提げ紐',
  '穿杆袋': 'ポールポケット',
  '自黏封口': 'シール封かん',
  '異形模切': '変形打ち抜き',
};

const QUANTITIES_ZH2EN: Record<string, string> = {
  '1張': '1 pc',
  '5張': '5 pcs',
  '10張': '10 pcs',
  '50張': '50 pcs',
  '100張': '100 pcs',
  '500張': '500 pcs',
  '1000張': '1000 pcs',
  '2000張': '2000 pcs',
  '5000張': '5000 pcs',
  '100個': '100 pcs',
  '200個': '200 pcs',
  '500個': '500 pcs',
  '1000個': '1000 pcs',
  '50本': '50 pcs',
  '100本': '100 pcs',
  '500本': '500 pcs',
};

const QUANTITIES_ZH2JA: Record<string, string> = {
  '1張': '1枚',
  '5張': '5枚',
  '10張': '10枚',
  '50張': '50枚',
  '100張': '100枚',
  '500張': '500枚',
  '1000張': '1000枚',
  '2000張': '2000枚',
  '5000張': '5000枚',
  '100個': '100個',
  '200個': '200個',
  '500個': '500個',
  '1000個': '1000個',
  '50本': '50部',
  '100本': '100部',
  '500本': '500部',
};

// 所有翻译聚合
const sizeMap: LabelMap = {};
for (const [zh, en] of Object.entries(SIZES_ZH2EN)) {
  sizeMap[zh] = { en, ja: SIZES_ZH2JA[zh] || en };
}

const materialMap: LabelMap = {};
for (const [zh, en] of Object.entries(MATERIALS_ZH2EN)) {
  materialMap[zh] = { en, ja: MATERIALS_ZH2JA[zh] || en };
}

const finishingMap: LabelMap = {};
for (const [zh, en] of Object.entries(FINISHINGS_ZH2EN)) {
  finishingMap[zh] = { en, ja: FINISHINGS_ZH2JA[zh] || en };
}

const quantityMap: LabelMap = {};
for (const [zh, en] of Object.entries(QUANTITIES_ZH2EN)) {
  quantityMap[zh] = { en, ja: QUANTITIES_ZH2JA[zh] || en };
}

/**
 * 将变量中文 label 翻译为目标语言
 * @param label 中文标签
 * @param locale 目标语言
 * @param category size | material | finishing | quantity
 * @returns 翻译后的标签，找不到时回退到中文
 */
export function translateVariableLabel(
  label: string,
  locale: Locale,
  category: 'size' | 'material' | 'finishing' | 'quantity'
): string {
  if (locale === 'zh-hk') return label;

  const map = category === 'size'
    ? sizeMap
    : category === 'material'
    ? materialMap
    : category === 'finishing'
    ? finishingMap
    : quantityMap;

  return map[label]?.[locale as 'en' | 'ja'] || label;
}

/**
 * 根据 value 和 product variables 获取翻译后的 label
 * 用于 getSelectedLabel 等场景
 */
export function getTranslatedLabelByValue(
  value: string,
  options: Array<{ value: string; label: string }>,
  locale: Locale,
  category: 'size' | 'material' | 'finishing' | 'quantity'
): string {
  const option = options.find(o => o.value === value);
  if (!option) return value;
  return translateVariableLabel(option.label, locale, category);
}