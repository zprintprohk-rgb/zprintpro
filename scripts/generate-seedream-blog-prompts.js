/**
 * 为 11 篇博客文章生成 Seedream 4.5 配图提示词
 * 每篇 1 张主题图（1200×630，适合 OG Image 复用）
 * 11 篇 × 3 语言 = 33 条提示词
 * 输出：CSV + TXT
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = __dirname;

const blogArticles = [
  {
    slug: 'company-intro',
    category: '公司新聞',
    title: { 'zh-hk': '智印云印刷公司簡介', en: 'About ZprintPro', ja: 'ZprintPro会社概要' },
    theme: '現代化印刷工廠內部，海德堡印刷機運作中，專業技術人員操作設備',
    themeEn: 'Modern printing factory interior, Heidelberg press in operation, skilled technicians operating equipment',
    themeJa: '現代の印刷工場内部、ハイデルベルグ印刷機が稼働中、熟練技術者が設備を操作',
    keywords: '印刷工廠,海德堡印刷機,專業印刷',
    keywordsEn: 'printing factory, Heidelberg press, professional printing',
    keywordsJa: '印刷工場,ハイデルベルグ印刷機,プロ印刷',
  },
  {
    slug: 'sticker-guide',
    category: '貼紙知識',
    title: { 'zh-hk': '香港貼紙印刷完全指南', en: 'Complete Sticker Printing Guide', ja: 'ステッカー印刷完全ガイド' },
    theme: '各種貼紙材質樣本平鋪展示：防水貼紙、透明貼紙、燙金貼紙、螢光貼紙，色彩鮮豔',
    themeEn: 'Various sticker material samples laid out: waterproof, transparent, foil, fluorescent stickers, vibrant colors',
    themeJa: '様々なステッカー素材サンプル：防水、透明、箔押し、蛍光ステッカー、鮮やかな色彩',
    keywords: '貼紙材質,防水貼紙,燙金貼紙',
    keywordsEn: 'sticker materials, waterproof stickers, foil stickers',
    keywordsJa: 'ステッカー素材,防水ステッカー,箔押しステッカー',
  },
  {
    slug: 'business-card-design',
    category: '名片知識',
    title: { 'zh-hk': '名片設計的10個黃金法則', en: '10 Golden Rules for Business Card Design', ja: '名刺デザインの10の黄金法則' },
    theme: '設計師桌面場景：多張精美名片設計稿、色卡、排版工具、咖啡杯，創意工作氛圍',
    themeEn: 'Designer desk scene: multiple elegant business card designs, color swatches, layout tools, coffee cup, creative workspace',
    themeJa: 'デザイナーの机：複数のエレガントな名刺デザイン、カラースウォッチ、レイアウトツール、コーヒーカップ、クリエイティブな作業空間',
    keywords: '名片設計,排版,色彩搭配',
    keywordsEn: 'business card design, typography, color matching',
    keywordsJa: '名刺デザイン,タイポグラフィ,配色',
  },
  {
    slug: 'packaging-trends',
    category: '包裝知識',
    title: { 'zh-hk': '2024包裝盒設計趨勢解析', en: '2024 Packaging Design Trends', ja: '2024年パッケージデザイントレンド' },
    theme: '精緻包裝盒陳列：極簡白盒、環保牛皮紙盒、燙金禮盒、彩色化妝品盒，貨架展示效果',
    themeEn: 'Elegant packaging box display: minimalist white boxes, eco kraft boxes, foil gift boxes, colorful cosmetic boxes, shelf display',
    themeJa: 'エレガントな包装箱ディスプレイ：ミニマリスト白箱、エコクラフト箱、箔押しギフトボックス、カラフル化粧品箱、棚展示',
    keywords: '包裝設計,極簡主義,環保包裝',
    keywordsEn: 'packaging design, minimalism, eco packaging',
    keywordsJa: 'パッケージデザイン,ミニマリズム,エコ包装',
  },
  {
    slug: 'cmyk-guide',
    category: '印刷工藝',
    title: { 'zh-hk': 'CMYK vs RGB印刷色彩模式詳解', en: 'CMYK vs RGB Color Modes', ja: 'CMYK vs RGB カラーモード解説' },
    theme: '色彩對比視覺：CMYK色票與RGB色票並排對比，印刷機墨鍵特寫，色彩漸變效果',
    themeEn: 'Color comparison visual: CMYK and RGB swatches side by side, printing press ink keys close-up, color gradient effects',
    themeJa: 'カラー比較ビジュアル：CMYKとRGBスウォッチを並べて、印刷機のインキキークローズアップ、カラーグラデーション効果',
    keywords: 'CMYK,RGB,色彩管理',
    keywordsEn: 'CMYK, RGB, color management',
    keywordsJa: 'CMYK,RGB,カラーマネージメント',
  },
  {
    slug: 'paper-materials',
    category: '印刷工藝',
    title: { 'zh-hk': '印刷紙材選擇指南', en: 'Paper Selection Guide', ja: '印刷用紙選択ガイド' },
    theme: '多種紙張樣本展示：銅版紙、啞粉紙、牛皮紙、棉紙、珠光紙，觸感質感對比',
    themeEn: 'Various paper samples display: glossy art paper, matte paper, kraft paper, cotton paper, pearl paper, texture comparison',
    themeJa: '様々な紙サンプル展示：コート紙、マット紙、クラフト紙、綿紙、パール紙、質感比較',
    keywords: '印刷紙張,銅版紙,特種紙',
    keywordsEn: 'printing paper, art paper, specialty paper',
    keywordsJa: '印刷用紙,コート紙,特殊紙',
  },
  {
    slug: 'eco-printing',
    category: '行業趨勢',
    title: { 'zh-hk': '環保印刷：企業ESG與可持續包裝', en: 'Eco-Friendly Printing & ESG', ja: 'エコ印刷と持続可能な包装' },
    theme: '綠色環保印刷場景：FSC認證標誌、再生紙產品、大豆油墨、綠色植物裝飾，自然光線',
    themeEn: 'Green eco-printing scene: FSC certification logo, recycled paper products, soy-based inks, green plant decoration, natural lighting',
    themeJa: 'グリーンエコ印刷シーン：FSC認証ロゴ、再生紙製品、大豆インク、緑の植物装飾、自然光',
    keywords: '環保印刷,ESG,再生紙',
    keywordsEn: 'eco printing, ESG, recycled paper',
    keywordsJa: 'エコ印刷,ESG,再生紙',
  },
  {
    slug: 'hong-kong-printing-guide',
    category: '香港本地',
    title: { 'zh-hk': '香港印刷公司選擇完全指南', en: 'Hong Kong Printing Company Guide', ja: '香港印刷会社選びガイド' },
    theme: '香港城市景觀與印刷元素結合：觀塘工業區街景、印刷公司招牌、維港天際線背景',
    themeEn: 'Hong Kong cityscape with printing elements: Kwun Tong industrial district street view, printing company signage, Victoria Harbour skyline background',
    themeJa: '香港の街並みと印刷要素：観塘工業地区の街並み、印刷会社の看板、ビクトリアハーバーのスカイライン背景',
    keywords: '香港印刷,觀塘,印刷公司',
    keywordsEn: 'Hong Kong printing, Kwun Tong, printing company',
    keywordsJa: '香港印刷,観塘,印刷会社',
  },
  {
    slug: 'design-file-specs',
    category: '設計技巧',
    title: { 'zh-hk': '印刷文件設計規範', en: 'Print File Design Specs', ja: '印刷用デザインファイル仕様' },
    theme: '設計師電腦屏幕特寫：Illustrator界面顯示出血位標記、300dpi解析度設置、CMYK色彩模式',
    themeEn: 'Designer computer screen close-up: Illustrator interface showing bleed marks, 300dpi resolution setting, CMYK color mode',
    themeJa: 'デザイナーのコンピュータ画面クローズアップ：Illustratorインターフェースに裁ち落としマーク、300dpi解像度設定、CMYKカラーモード',
    keywords: '出血位,分辨率,色彩模式',
    keywordsEn: 'bleed, resolution, color mode',
    keywordsJa: '裁ち落とし,解像度,カラーモード',
  },
  {
    slug: 'brand-materials-checklist',
    category: '品牌建設',
    title: { 'zh-hk': '企業品牌物料清單', en: 'Brand Materials Checklist', ja: '企業ブランド物料チェックリスト' },
    theme: '完整品牌物料套裝展示：名片、信封、信紙、文件夾、宣傳單張統一排列，品牌視覺一致',
    themeEn: 'Complete brand material set display: business cards, envelopes, letterheads, folders, flyers arranged uniformly, consistent brand visual',
    themeJa: '完全なブランド物料セット：名刺、封筒、便箋、フォルダ、チラシを統一的に配置、一貫したブランドビジュアル',
    keywords: '品牌物料,名片,信封,信紙',
    keywordsEn: 'brand materials, business cards, envelopes, letterheads',
    keywordsJa: 'ブランド物料,名刺,封筒,便箋',
  },
  {
    slug: 'mtr-advertising-specs',
    category: '香港本地',
    title: { 'zh-hk': '港鐵廣告印刷規格全解析', en: 'MTR Advertising Print Specs', ja: 'MTR広告印刷仕様' },
    theme: '港鐵站內廣告場景：燈箱廣告、月台幕門廣告、車廂內海報，乘客人流背景',
    themeEn: 'MTR station advertising scene: lightbox ads, platform screen door ads, train interior posters, passenger flow background',
    themeJa: 'MTR駅内広告シーン：ライトボックス広告、ホームドア広告、車内ポスター、乗客流背景',
    keywords: '港鐵廣告,MTR,燈箱廣告',
    keywordsEn: 'MTR advertising, lightbox ads, train posters',
    keywordsJa: 'MTR広告,ライトボックス広告,車内ポスター',
  },
];

const locales = ['zh-hk', 'en', 'ja'];

function generatePrompt(article, locale) {
  const title = article.title[locale];
  const theme = locale === 'zh-hk' ? article.theme : locale === 'en' ? article.themeEn : article.themeJa;
  const keywords = locale === 'zh-hk' ? article.keywords : locale === 'en' ? article.keywordsEn : article.keywordsJa;
  const fontName = locale === 'zh-hk' ? 'PingFang HK Bold' : locale === 'en' ? 'Inter Bold' : 'Hiragino Sans W6';
  const langRule = locale === 'zh-hk'
    ? '所有中文字符必须笔画完整准确'
    : locale === 'en'
    ? 'All English words must be spelled correctly'
    : 'すべての日本語文字が正確であること';

  return `16:9宽屏比例，8K超高清文章配图。画面中绝对不出现任何水印、品牌名、乱码。

${theme}。畫面構圖專業，色彩飽和度適中，光影自然，適合用作博客文章封面圖和OG Image。畫面上方預留20%空間用於後期叠加文字標題「${title}」，背景簡潔不雜亂。${langRule}。

關鍵詞視覺元素：${keywords}。`;
}

// 生成 CSV
const csvHeaders = [
  'id', 'slug', 'category', 'title_zh', 'title_en', 'title_ja',
  'prompt_zh_hk', 'prompt_en', 'prompt_ja',
  'scene_keywords', 'target_audience', 'material_keywords',
  'filename_zh_hk', 'filename_en', 'filename_ja',
  'alt_zh_hk', 'alt_en', 'alt_ja'
];

let csvRows = [csvHeaders.join(',')];
let txtLines = ['=== ZprintPro 印刷知識文章配图 Seedream 4.5 生图提示词 ===\n'];

blogArticles.forEach((article, idx) => {
  const id = `BLOG-${String(idx + 1).padStart(2, '0')}`;

  locales.forEach(locale => {
    const prompt = generatePrompt(article, locale);
    const filename = `blog-${article.slug}-${locale}.jpg`;
    const alt = article.title[locale];

    txtLines.push(`\n--- ${id} | ${locale} | ${article.slug} ---`);
    txtLines.push(`Filename: ${filename}`);
    txtLines.push(`Alt: ${alt}`);
    txtLines.push(`Prompt:\n${prompt}\n`);
  });

  const row = [
    id,
    article.slug,
    article.category,
    article.title['zh-hk'],
    article.title['en'],
    article.title['ja'],
    `"${generatePrompt(article, 'zh-hk').replace(/"/g, '""')}"`,
    `"${generatePrompt(article, 'en').replace(/"/g, '""')}"`,
    `"${generatePrompt(article, 'ja').replace(/"/g, '""')}"`,
    `"${article.theme}"`,
    '"印刷行業從業者、設計師、企業市場部"',
    `"${article.keywords}"`,
    `blog-${article.slug}-zh-hk.jpg`,
    `blog-${article.slug}-en.jpg`,
    `blog-${article.slug}-ja.jpg`,
    `"${article.title['zh-hk']}"`,
    `"${article.title['en']}"`,
    `"${article.title['ja']}"`,
  ];
  csvRows.push(row.join(','));
});

// 写入文件
const csvPath = path.join(OUTPUT_DIR, '..', 'seedream-blog-prompts.csv');
const txtPath = path.join(OUTPUT_DIR, '..', 'seedream-blog-prompts.txt');

fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf-8');
fs.writeFileSync(txtPath, txtLines.join('\n'), 'utf-8');

console.log(`Generated ${blogArticles.length} blog articles × ${locales.length} locales = ${blogArticles.length * locales.length} prompts`);
console.log(`CSV: ${csvPath}`);
console.log(`TXT: ${txtPath}`);
