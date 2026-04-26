/**
 * 为首页 HeroBanner 的 5 张轮播图生成 Seedream 4.5 生图提示词
 * 5 张图 × 3 语言 = 15 条提示词
 * 输出：CSV + TXT
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = __dirname;

// 轮播图数据（与 HeroBanner.tsx 对应）
const heroSlides = [
  {
    slug: 'kraft-bag',
    productSlug: 'kraft-paper-bags',
    category: 'paper-bags',
    name: { 'zh-hk': '專業牛皮紙袋印刷', en: 'Professional Kraft Paper Bags', ja: 'クラフト紙袋印刷' },
    subtitle: { 'zh-hk': '環保材質，堅固耐用，適合零售外賣', en: 'Eco-friendly, durable, perfect for retail and takeout', ja: '環境に優しく耐久性があり、小売やテイクアウトに最適' },
    price: { 'zh-hk': 'HK$1.2起', en: 'From HK$1.2', ja: 'HK$1.2〜' },
    tagLine: { 'zh-hk': '牛皮紙袋｜HK$1.2起', en: 'Kraft Bags｜From HK$1.2', ja: 'クラフト紙袋｜HK$1.2〜' },
    tagSub: { 'zh-hk': '環保材質・免費設計', en: 'Eco-friendly · Free Design', ja: '環境に優しい・無料デザイン' },
    scene: '零售店鋪門口/咖啡店外賣櫃檯/環保市集攤位',
    sceneEn: 'retail storefront / coffee shop takeaway counter / eco market stall',
    sceneJa: '小売店舗入口/コーヒーショップテイクアウトカウンター/エコマーケット屋台',
    userContent: { 'zh-hk': '牛皮紙袋上印有品牌Logo「ZprintPro」、店鋪名稱「綠意咖啡」、地址「中環皇后大道中100號」、環保標語「Reduce Reuse Recycle」', en: 'Kraft bags printed with brand logo "ZprintPro", shop name "Green Cafe", address "100 Queen\'s Road Central", eco slogan "Reduce Reuse Recycle"', ja: 'クラフト紙袋にブランドロゴ「ZprintPro」、店舗名「グリーンカフェ」、住所「クイーンズロードセントラル100番」、環保標語「Reduce Reuse Recycle」が印刷されている' },
    material: '牛皮紙、環保油墨、棉繩手挽',
    materialEn: 'kraft paper, eco-friendly ink, cotton rope handles',
    materialJa: 'クラフト紙、環境に優しいインク、綿紐持ち手',
    audience: '零售店主、咖啡店、環保品牌',
    audienceEn: 'retail shop owners, coffee shops, eco-friendly brands',
    audienceJa: '小売店主、コーヒーショップ、環境に配慮するブランド',
  },
  {
    slug: 'flyer',
    productSlug: 'a4-flyers',
    category: 'flyers',
    name: { 'zh-hk': 'A4宣傳單張印刷', en: 'A4 Flyer Printing', ja: 'A4チラシ印刷' },
    subtitle: { 'zh-hk': '彩色印刷，即日可取，宣傳首選', en: 'Full color, same-day pickup, ideal for promotion', ja: 'フルカラー、当日受取可能、宣伝に最適' },
    price: { 'zh-hk': 'HK$0.3起', en: 'From HK$0.3', ja: 'HK$0.3〜' },
    tagLine: { 'zh-hk': 'A4宣傳單張｜HK$0.3起', en: 'A4 Flyers｜From HK$0.3', ja: 'A4チラシ｜HK$0.3〜' },
    tagSub: { 'zh-hk': '彩色印刷・即日可取', en: 'Full Color · Same Day', ja: 'フルカラー・当日受取' },
    scene: '商業街派發/展會派傳單/餐廳門口宣傳',
    sceneEn: 'street distribution / trade show handout / restaurant doorway promotion',
    sceneJa: '商業街配布/展示会配布/レストラン入り口宣伝',
    userContent: { 'zh-hk': '宣傳單張上印有活動信息「夏日音樂節」、日期「2026年7月15日」、地點「維多利亞公園」、優惠碼「ZPRINT20」、主辦方「ZprintPro文化傳播」', en: 'Flyer printed with event info "Summer Music Festival", date "July 15, 2026", venue "Victoria Park", promo code "ZPRINT20", organizer "ZprintPro Cultural"', ja: 'チラシにイベント情報「サマーミュージックフェスティバル」、日付「2026年7月15日」、会場「ビクトリアパーク」、割引コード「ZPRINT20」、主催者「ZprintProカルチャー」が印刷されている' },
    material: '157g銅版紙、四色印刷',
    materialEn: '157g glossy art paper, 4-color printing',
    materialJa: '157gコート紙、4色印刷',
    audience: '活動主辦方、餐飲店、零售店',
    audienceEn: 'event organizers, restaurants, retail stores',
    audienceJa: 'イベント主催者、飲食店、小売店',
  },
  {
    slug: 'sticker',
    productSlug: 'waterproof-stickers',
    category: 'stickers',
    name: { 'zh-hk': '防水貼紙印刷', en: 'Waterproof Sticker Printing', ja: '防水ステッカー印刷' },
    subtitle: { 'zh-hk': '耐用材質，多種形狀，適用於任何表面', en: 'Durable material, various shapes, for any surface', ja: '耐久性のある素材、様々な形状、あらゆる表面に対応' },
    price: { 'zh-hk': 'HK$0.5起', en: 'From HK$0.5', ja: 'HK$0.5〜' },
    tagLine: { 'zh-hk': '防水貼紙｜HK$0.5起', en: 'Waterproof Stickers｜From HK$0.5', ja: '防水ステッカー｜HK$0.5〜' },
    tagSub: { 'zh-hk': 'PVC材質・多種形狀', en: 'PVC Material · Various Shapes', ja: 'PVC素材・様々な形状' },
    scene: '產品包裝貼紙/車身貼紙/戶外標識',
    sceneEn: 'product packaging stickers / car decals / outdoor signage',
    sceneJa: '製品包装シール/車用ステッカー/屋外サイン',
    userContent: { 'zh-hk': '貼紙上印有品牌Logo「ZprintPro」、產品名稱「有機蜂蜜」、重量「250g」、生產日期「2026.04.01」、條碼和環保標籤', en: 'Stickers printed with brand logo "ZprintPro", product name "Organic Honey", weight "250g", production date "2026.04.01", barcode and eco label', ja: 'ステッカーにブランドロゴ「ZprintPro」、商品名「オーガニックハニー」、重量「250g」、生産日「2026.04.01」、バーコードと環保ラベルが印刷されている' },
    material: 'PVC防水材質、防曬油墨',
    materialEn: 'PVC waterproof material, UV-resistant ink',
    materialJa: 'PVC防水素材、UV耐性インク',
    audience: '電商賣家、食品品牌、戶外用品',
    audienceEn: 'e-commerce sellers, food brands, outdoor products',
    audienceJa: 'EC販売者、食品ブランド、アウトドア用品',
  },
  {
    slug: 'gift-box',
    productSlug: 'gift-boxes',
    category: 'packaging',
    name: { 'zh-hk': '包裝盒定制', en: 'Custom Gift Boxes', ja: 'ギフトボックス定制' },
    subtitle: { 'zh-hk': '精緻包裝，提升品牌形象', en: 'Premium packaging to elevate your brand', ja: '高級感のある包装でブランド価値を向上' },
    price: { 'zh-hk': 'HK$5起', en: 'From HK$5', ja: 'HK$5〜' },
    tagLine: { 'zh-hk': '禮品盒定制｜HK$5起', en: 'Gift Boxes｜From HK$5', ja: 'ギフトボックス｜HK$5〜' },
    tagSub: { 'zh-hk': '精緻包裝・提升品牌', en: 'Premium · Brand Elevation', ja: '高級感・ブランド向上' },
    scene: '高端禮品展示/化妝品櫃檯/茶葉專賣店',
    sceneEn: 'luxury gift display / cosmetics counter / tea specialty shop',
    sceneJa: '高級ギフト展示/化粧品カウンター/茶専門店',
    userContent: { 'zh-hk': '禮品盒上印有品牌Logo「ZprintPro」、產品名稱「頂級茶葉禮盒」、重量「200g」、成分表、生產日期、條碼和環保標籤，精緻燙金工藝', en: 'Gift boxes printed with brand logo "ZprintPro", product name "Premium Tea Gift Box", weight "200g", ingredient list, production date, barcode and eco label, exquisite foil stamping', ja: 'ギフトボックスにブランドロゴ「ZprintPro」、商品名「プレミアムティーギフトボックス」、重量「200g」、成分表、生産日、バーコードと環保ラベル、精巧な箔押し加工が施されている' },
    material: '白卡紙、燙金工藝、UV光油',
    materialEn: 'white card paper, foil stamping, UV coating',
    materialJa: '白カード紙、箔押し加工、UVコーティング',
    audience: '高端品牌、化妝品、茶葉禮品',
    audienceEn: 'luxury brands, cosmetics, tea gifts',
    audienceJa: '高級ブランド、化粧品、茶ギフト',
  },
  {
    slug: 'poster',
    productSlug: 'a2-posters',
    category: 'posters',
    name: { 'zh-hk': '海報定制印刷', en: 'Custom Poster Printing', ja: 'ポスター印刷' },
    subtitle: { 'zh-hk': '大圖輸出，色彩鮮豔，宣傳利器', en: 'Large format, vivid colors, great for advertising', ja: '大判出力、鮮やかな色彩、広告に最適' },
    price: { 'zh-hk': 'HK$15起', en: 'From HK$15', ja: 'HK$15〜' },
    tagLine: { 'zh-hk': '海報印刷｜HK$15起', en: 'Posters｜From HK$15', ja: 'ポスター印刷｜HK$15〜' },
    tagSub: { 'zh-hk': '大圖輸出・色彩鮮豔', en: 'Large Format · Vivid Colors', ja: '大判出力・鮮やかな色彩' },
    scene: '街頭廣告/商場促銷/展會背景牆',
    sceneEn: 'street advertising / mall promotion / exhibition backdrop',
    sceneJa: '街頭広告/モールプロモーション/展示会バックドロップ',
    userContent: { 'zh-hk': '海報上印有活動信息「香港國際電影節」、日期「2026年8月1-15日」、地點「香港文化中心」、主辦方「ZprintPro文化傳播」、明星照片和電影劇照', en: 'Poster printed with event info "Hong Kong International Film Festival", date "Aug 1-15, 2026", venue "Hong Kong Cultural Centre", organizer "ZprintPro Cultural", celebrity photos and film stills', ja: 'ポスターにイベント情報「香港国際映画祭」、日付「2026年8月1-15日」、会場「香港文化センター」、主催者「ZprintProカルチャー」、有名人写真と映画スチルが印刷されている' },
    material: '157g銅版紙、防水PP紙',
    materialEn: '157g glossy art paper, waterproof PP paper',
    materialJa: '157gコート紙、防水PP紙',
    audience: '活動主辦方、品牌商場、電影院',
    audienceEn: 'event organizers, brand malls, cinemas',
    audienceJa: 'イベント主催者、ブランドモール、映画館',
  },
];

const locales = ['zh-hk', 'en', 'ja'];

function generatePrompt(slide, locale) {
  const tagLine = slide.tagLine[locale];
  const tagSub = slide.tagSub[locale];
  const userContent = slide.userContent[locale];
  const scene = locale === 'zh-hk' ? slide.scene : locale === 'en' ? slide.sceneEn : slide.sceneJa;
  const material = locale === 'zh-hk' ? slide.material : locale === 'en' ? slide.materialEn : slide.materialJa;
  const audience = locale === 'zh-hk' ? slide.audience : locale === 'en' ? slide.audienceEn : slide.audienceJa;

  const fontName = locale === 'zh-hk' ? 'PingFang HK Bold' : locale === 'en' ? 'Inter Bold' : 'Hiragino Sans W6';
  const langRule = locale === 'zh-hk'
    ? '所有中文字符必须笔画完整准确，英文单词拼写正确、无粘连、无乱码'
    : locale === 'en'
    ? 'All English words must be spelled correctly, no粘连, no gibberish'
    : 'すべての日本語文字が正確で、英単語のスペルが正しく、文字の重なりや乱码がないこと';

  return `16:9宽屏比例，8K超高清电商Banner图。右上角固定放置单一枚大红色(#DC2626)底色、白色粗体字(${fontName})、白色3px描边的爆炸促销标签。标签主标题：${tagLine}，副标题：${tagSub}。标签外画面内绝对不出现任何其他文字、乱码、水印、品牌名、多标签。

前景为${slide.name[locale]}产品实物展示，${userContent}，${material}工艺细节清晰可见。背景虚化${scene}，自然柔和暖色调灯光，营造高端商业氛围。产品占画面60%-70%，材质和工艺细节高清呈现。${langRule}。`;
}

// 生成 CSV
const csvHeaders = [
  'id', 'slug', 'category', 'name_zh', 'name_en', 'name_ja',
  'tag_line_zh', 'tag_sub_zh', 'tag_line_en', 'tag_sub_en', 'tag_line_ja', 'tag_sub_ja',
  'prompt_zh_hk', 'prompt_en', 'prompt_ja',
  'scene_keywords', 'target_audience', 'material_keywords',
  'filename_zh_hk', 'filename_en', 'filename_ja',
  'alt_zh_hk', 'alt_en', 'alt_ja'
];

let csvRows = [csvHeaders.join(',')];
let txtLines = ['=== ZprintPro 首页轮播图 Seedream 4.5 生图提示词 ===\n'];

heroSlides.forEach((slide, idx) => {
  const id = `HERO-${String(idx + 1).padStart(2, '0')}`;

  locales.forEach(locale => {
    const prompt = generatePrompt(slide, locale);
    const filename = `hero-${slide.slug}-${locale}.jpg`;
    const alt = `${slide.name[locale]} - ${slide.subtitle[locale]} ${slide.price[locale]}`;

    txtLines.push(`\n--- ${id} | ${locale} | ${slide.slug} ---`);
    txtLines.push(`Filename: ${filename}`);
    txtLines.push(`Alt: ${alt}`);
    txtLines.push(`Prompt:\n${prompt}\n`);
  });

  const row = [
    id,
    slide.slug,
    slide.category,
    slide.name['zh-hk'],
    slide.name['en'],
    slide.name['ja'],
    slide.tagLine['zh-hk'],
    slide.tagSub['zh-hk'],
    slide.tagLine['en'],
    slide.tagSub['en'],
    slide.tagLine['ja'],
    slide.tagSub['ja'],
    `"${generatePrompt(slide, 'zh-hk').replace(/"/g, '""')}"`,
    `"${generatePrompt(slide, 'en').replace(/"/g, '""')}"`,
    `"${generatePrompt(slide, 'ja').replace(/"/g, '""')}"`,
    `"${slide.scene}"`,
    `"${slide.audience}"`,
    `"${slide.material}"`,
    `hero-${slide.slug}-zh-hk.jpg`,
    `hero-${slide.slug}-en.jpg`,
    `hero-${slide.slug}-ja.jpg`,
    `"${slide.name['zh-hk']} - ${slide.subtitle['zh-hk']} ${slide.price['zh-hk']}"`,
    `"${slide.name['en']} - ${slide.subtitle['en']} ${slide.price['en']}"`,
    `"${slide.name['ja']} - ${slide.subtitle['ja']} ${slide.price['ja']}"`,
  ];
  csvRows.push(row.join(','));
});

// 写入文件
const csvPath = path.join(OUTPUT_DIR, '..', 'seedream-hero-prompts.csv');
const txtPath = path.join(OUTPUT_DIR, '..', 'seedream-hero-prompts.txt');

fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf-8');
fs.writeFileSync(txtPath, txtLines.join('\n'), 'utf-8');

console.log(`Generated ${heroSlides.length} hero slides × ${locales.length} locales = ${heroSlides.length * locales.length} prompts`);
console.log(`CSV: ${csvPath}`);
console.log(`TXT: ${txtPath}`);
