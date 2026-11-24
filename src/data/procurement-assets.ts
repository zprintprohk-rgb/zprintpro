/**
 * 独特采购资产数据模块 (2026-11-25, ASSET-20261030-PACKAGING-PROCUREMENT-ASSETS)
 * 任务源: 重要文件/2026-10-30-three-strategy-completion-and-next-phase.md §十二 独特采购资产建设计划
 *   三項可做資產: PDF 入稿檢查清單 / 學校採購清單 / 紙袋報價尺寸模板
 *   BLOCKED 維持: 真實刀模下載 (public/ pdf/ai/eps/zip = 0 files) / C109 倒排 (天數未確認) — 本模組不含兩者
 * gate: no new numbers, no die-line download claim — 所有数字/规格均为既有真值复用:
 *   - 300dpi/CMYK/3mm 出血/字型轉外框 ← src/data/faq/zh-hk.json L49 (打样资格条件)
 *   - 騎馬釘 4 倍数页 / 膠裝 48 頁以上 / 48-400 頁 ← products.ts perfect-bound-books L5229-5235 + 行业标准
 *   - 練習簿 10 本起 / 80-100g 書紙道林紙 / 橫線方格空白 ← products.ts exercise-books L5762-5770
 *   - 數量階梯 100/500/1000/2000/3000/5000/10000 ← price-tables/books.json anchor 阶梯
 *     (10-99 modeled-small-batch 档标「待校准」, 不对外展示)
 *   - 紙袋 100 個起 / 牛皮紙 120-200g / 紙繩棉繩 / 燙金局部UV / 3-5 工作天 / 免費刀模設計 / 糊位檢查
 *     ← products.ts kraft-paper-bags L1364-1372 (title + description + features)
 *   - 中號示例 260×170×250mm / FSC 牛皮白卡 / 絲帶三股繩 ← price-tables/paper-bags.json config (intuan-2026-07-18 校准)
 *   - 同人誌 A5/B5 封面彩色內頁單色 / 10 本起印 / 特急按報價確認 ← products.ts doujinshi-printing L6701
 * 挂载: src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx §11 選購指南之後 (server component, 無 client JS, 無 JSON-LD)
 * 上线形态: 在線輸入表/檢查清單 (§十二「最低可用形態」, 非下載文件) — push 需 K3 §0.25.10.5 預覽+確認
 */
import { Locale } from '@/lib/seo';

export interface ProcurementRow {
  label: string;
  value: string;
}

export interface ProcurementLink {
  label: string;
  href: string;
}

export interface ProcurementAsset {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  rows: ProcurementRow[];
  links: ProcurementLink[];
  footnote: string;
}

/* ---------- 内链构造（全部为已确认存在的路由: /{locale}/category/<slug>/ · /{locale}/product/<slug>/ · /{locale}/quote/） ---------- */
function links(locale: Locale, kind: 'pdf' | 'school' | 'bag'): ProcurementLink[] {
  const p = `/${locale}`;
  if (kind === 'pdf') {
    return [
      { label: locale === 'zh-hk' ? '書刊類目' : locale === 'en' ? 'Books & Booklets' : '書籍・冊子', href: `${p}/category/books/` },
      { label: locale === 'zh-hk' ? '無線膠裝書籍' : locale === 'en' ? 'Perfect-Bound Books' : '無線綴じ書籍', href: `${p}/product/perfect-bound-books/` },
      { label: locale === 'zh-hk' ? '同人誌印刷' : 'Doujinshi Printing', href: `${p}/product/doujinshi-printing/` },
      { label: locale === 'zh-hk' ? '立即報價' : locale === 'en' ? 'Get a Quote' : '今すぐ見積', href: `${p}/quote/` },
    ];
  }
  if (kind === 'school') {
    return [
      { label: locale === 'zh-hk' ? '練習簿印刷' : locale === 'en' ? 'Exercise Book Printing' : '練習帳印刷', href: `${p}/product/exercise-books/` },
      { label: locale === 'zh-hk' ? '書刊類目' : locale === 'en' ? 'Books & Booklets' : '書籍・冊子', href: `${p}/category/books/` },
      { label: locale === 'zh-hk' ? '立即報價' : locale === 'en' ? 'Get a Quote' : '今すぐ見積', href: `${p}/quote/` },
    ];
  }
  return [
    { label: locale === 'zh-hk' ? '牛皮紙袋訂製' : locale === 'en' ? 'Kraft Paper Bags' : 'クラフト紙袋', href: `${p}/product/kraft-paper-bags/` },
    { label: locale === 'zh-hk' ? '紙袋類目' : locale === 'en' ? 'Paper Bags' : '紙袋カテゴリー', href: `${p}/category/paper-bags/` },
    { label: locale === 'zh-hk' ? '立即報價' : locale === 'en' ? 'Get a Quote' : '今すぐ見積', href: `${p}/quote/` },
  ];
}

/* ---------- zh-hk ---------- */
const ZH_HK: Record<string, ProcurementAsset> = {
  'pdf-checklist': {
    id: 'pdf-checklist',
    eyebrow: '入稿檢查',
    title: '落單前 8 項 PDF 入稿檢查清單（書刊・同人誌・海報適用）',
    intro: '上傳檔案前對照以下 8 項逐項過一遍，可大幅減少來回改稿，更快安排開機生產。',
    rows: [
      { label: '色彩模式', value: '全檔轉 CMYK；RGB 檔直接開印會有色差（藍、紫、鮮綠最明顯）。' },
      { label: '解像度', value: '點陣圖 300dpi 或以上；低解像度圖像放大後會出現鋸齒。' },
      { label: '出血位', value: '成品邊緣預留 3mm 出血；底色與圖案須延伸至出血線，裁切後才不會現白邊。' },
      { label: '字型', value: '全部文字轉外框（outline），避免對方電腦缺少字型導致重排。' },
      { label: '頁序', value: '按 P1（封面）→ 內頁 → 封底順序排頁，跨頁勿合併交稿。' },
      { label: '騎馬釘頁數', value: '騎馬釘總頁數須為 4 的倍數（如 8P／16P／32P）；不足需補白頁。' },
      { label: '膠裝頁數', value: '無線膠裝適用 48 頁以上，書脊平整牢固；封面另計 4 頁，總頁數 48-400 頁內最穩。' },
      { label: '檔案格式', value: '印刷級 PDF（附 AI 原檔更佳）；單色內頁可交灰階檔——同人誌封面彩色、內頁單色亦適用此分工。' },
    ],
    links: links('zh-hk', 'pdf'),
    footnote: '標準規格以產品頁即時報價為準；燙金／UV／過膠等特殊工藝起印量視工藝而定，落單前由報價確認。',
  },
  'school-procurement': {
    id: 'school-procurement',
    eyebrow: '採購清單',
    title: '學校・補習社採購輸入清單（練習簿・教材・校刊）',
    intro: '把 6 欄資料填齊發 WhatsApp，30 秒收到報價；數量階梯與裝訂方式可直接對照選定。',
    rows: [
      { label: '品項與冊數', value: '練習簿／作業本／校刊分開列明；常用階梯 100／500／1,000／2,000／3,000／5,000／10,000 本（練習簿數碼 10 本起）。' },
      { label: '尺寸與頁數', value: 'A5／A4 直度；總頁數（如 A5 32PP）直接影響用紙與報價。' },
      { label: '裝訂方式', value: '騎馬釘（頁數少、可攤平）／無線膠裝（48 頁以上、書脊平整）。' },
      { label: '用紙', value: '內頁 80g–100g 書紙／道林紙，書寫流暢不反光；封面可選 157g–200g 銅版／啞粉。' },
      { label: '內頁版式', value: '橫線／方格／空白三種內頁可選；頁碼、章節與習題欄位可免費排版。' },
      { label: '文件與交期', value: '交印刷級 PDF（對照上方入稿檢查清單）；交期以即時報價顯示為準，開學季建議提早落單。' },
    ],
    links: links('zh-hk', 'school'),
    footnote: '數量階梯與用紙規格以產品頁為準；實際報價以 30 秒即時報價為準。',
  },
  'bag-quote-template': {
    id: 'bag-quote-template',
    eyebrow: '報價模板',
    title: '紙袋報價尺寸輸入模板（一表交齊，即刻報價）',
    intro: '按下表 6 欄填寫後發 WhatsApp；示例行為牛皮紙袋中號現行規格，照抄改數即可。',
    rows: [
      { label: '展開尺寸', value: '長 × 側闊 × 高（mm）。示例：中號 260 × 170 × 250 mm；小／中／大袋型可配置。' },
      { label: '材質', value: '牛皮紙 120–200g 級；另備 FSC 牛皮／白卡紙袋，環保品牌適配。' },
      { label: '手挽', value: '紙繩／扁繩／棉繩；禮品袋可選絲帶／三股繩。' },
      { label: '印刷工藝', value: '單色至四色；可加燙金／局部 UV 品牌工藝。' },
      { label: '數量', value: '100 個起印；常用階梯 500／1,000／2,000／3,000／5,000。' },
      { label: '交期與檔案', value: '標準生產 3-5 個工作天；交印刷級 PDF 或 AI 展開圖（含糊位檢查）。' },
    ],
    links: links('zh-hk', 'bag'),
    footnote: '免費刀模設計 + 免費打稿；港九新界滿 HK$500 順豐免運；最終報價以 30 秒即時報價為準。',
  },
};

/* ---------- en ---------- */
const EN: Record<string, ProcurementAsset> = {
  'pdf-checklist': {
    id: 'pdf-checklist',
    eyebrow: 'Prepress Checklist',
    title: '8-Point PDF Prepress Checklist (Books / Doujinshi / Posters)',
    intro: 'Run through these 8 checks before uploading your file to cut revision loops and start production sooner.',
    rows: [
      { label: 'Color mode', value: 'Convert all artwork to CMYK; RGB files shift color in print (blues, purples and vivid greens most visibly).' },
      { label: 'Resolution', value: 'Raster images at 300 dpi or higher; lower-resolution art pixelates when scaled up.' },
      { label: 'Bleed', value: 'Keep 3 mm bleed on every trimmed edge and extend backgrounds to the bleed line so trimming never leaves white edges.' },
      { label: 'Fonts', value: 'Convert all text to outlines to prevent missing-font reflow on our side.' },
      { label: 'Page order', value: 'Arrange files P1 (front cover) → inside pages → back cover; do not merge spreads.' },
      { label: 'Saddle-stitch pages', value: 'Total page count must be a multiple of 4 (8P / 16P / 32P); pad with blank pages if short.' },
      { label: 'Perfect-bound pages', value: 'Perfect binding suits 48+ pages with a flat sturdy spine; add a 4-page cover, best within 48–400 pages total.' },
      { label: 'File format', value: 'Print-ready PDF (AI source files welcome); monochrome interiors may be grayscale — doujinshi color cover + mono interior follows the same split.' },
    ],
    links: links('en', 'pdf'),
    footnote: 'Specifications follow each product page and instant quote; MOQ for foil / UV / lamination finishing varies by process and is confirmed at quoting.',
  },
  'school-procurement': {
    id: 'school-procurement',
    eyebrow: 'Procurement Worksheet',
    title: 'School & Tutoring Procurement Worksheet (Workbooks / Materials / Yearbooks)',
    intro: 'Fill in these 6 fields and send them on WhatsApp for a quote in 30 seconds; quantity tiers and binding can be picked straight from the table.',
    rows: [
      { label: 'Items & quantity', value: 'List workbooks / assignments / yearbooks separately; common tiers 100 / 500 / 1,000 / 2,000 / 3,000 / 5,000 / 10,000 copies (digital runs from 10 for exercise books).' },
      { label: 'Size & pages', value: 'A5 / A4 portrait; total page count (e.g. A5 32PP) drives paper usage and pricing.' },
      { label: 'Binding', value: 'Saddle stitch (fewer pages, lies flat) or perfect binding (48+ pages, flat spine).' },
      { label: 'Paper stock', value: '80g–100g woodfree / Daulin interior — smooth writing, low glare; 157g–200g coated / matte art covers available.' },
      { label: 'Interior layout', value: 'Ruled, grid or blank interiors; page numbers, chapters and exercise fields laid out free of charge.' },
      { label: 'Files & lead time', value: 'Print-ready PDF (see the prepress checklist above); lead time per instant quote — order early for back-to-school season.' },
    ],
    links: links('en', 'school'),
    footnote: 'Quantity tiers and paper specs follow product pages; final pricing via the 30-second instant quote.',
  },
  'bag-quote-template': {
    id: 'bag-quote-template',
    eyebrow: 'Quote Worksheet',
    title: 'Paper Bag Quote Worksheet (Fill One Table, Get Priced Fast)',
    intro: 'Fill in the 6 fields below and send via WhatsApp; the sample mirrors our current medium kraft bag spec — copy it and change the numbers.',
    rows: [
      { label: 'Flat size', value: 'Width × side gusset × height (mm). Sample: medium 260 × 170 × 250 mm; small / medium / large formats configurable.' },
      { label: 'Material', value: 'Kraft paper 120–200g; FSC kraft / white card options for eco brands.' },
      { label: 'Handle', value: 'Twisted / flat paper rope / cotton rope; gift bags may take ribbon or three-strand cord.' },
      { label: 'Printing & finishing', value: '1–4 colors; foil stamping and spot UV available for brand finishing.' },
      { label: 'Quantity', value: 'MOQ 100 pcs; common tiers 500 / 1,000 / 2,000 / 3,000 / 5,000.' },
      { label: 'Lead time & file', value: 'Standard production 3–5 working days; print-ready PDF or AI dieline (glue flaps checked).' },
    ],
    links: links('en', 'bag'),
    footnote: 'Free dieline design + free proof; free SF Express delivery in Hong Kong over HK$500; final pricing via the 30-second instant quote.',
  },
};

/* ---------- ja ---------- */
const JA: Record<string, ProcurementAsset> = {
  'pdf-checklist': {
    id: 'pdf-checklist',
    eyebrow: '入稿チェック',
    title: '入稿チェックリスト 8 項目（書籍・同人誌・ポスター共通）',
    intro: 'データ入稿前に以下の 8 項目を確認すると、修正の往復が減り、生産開始までが早くなります。',
    rows: [
      { label: 'カラーモード', value: 'すべて CMYK に変換。RGB のまま入稿すると色ずれが発生します（青・紫・鮮緑で顕著）。' },
      { label: '解像度', value: 'ビットマップ画像は 300dpi 以上。低解像度のまま拡大すると輪郭が荒れます。' },
      { label: 'ドブ（断ち落とし）', value: '仕上がり端に 3mm のドブを確保し、背景・画像はドブまで延長。断ち切り後の白フチを防ぎます。' },
      { label: 'フォント', value: 'すべてアウトライン化。フォント未搭載による文字崩れ・再組版を防止します。' },
      { label: 'ページ順', value: '表紙（P1）→ 本文 → 裏表紙の順で並べ、見開きの結合はしないでください。' },
      { label: '中綴じページ数', value: '中綴じは総ページ数が 4 の倍数で（8P／16P／32P）。足りない場合は白紙ページで調整します。' },
      { label: '無線綴じページ数', value: '無線綴じは 48 ページ以上に適用。表紙は別途 4 ページ加算、総ページ 48〜400 ページが最適です。' },
      { label: 'データ形式', value: '印刷用 PDF（AI 元データがあれば歓迎）。モノクロ本文はグレースケール可——同人誌の「表紙カラー・本文モノクロ」も同じ分かり分けです。' },
    ],
    links: links('ja', 'pdf'),
    footnote: '仕様・納期は各製品ページと即時見積の表示基準。箔押し・UV・ラミネート加工の最少部数は加工により異なり、見積時確認となります。',
  },
  'school-procurement': {
    id: 'school-procurement',
    eyebrow: '購買シート',
    title: '学校・学習塾向け購買チェックシート（練習帳・教材・学年誌）',
    intro: '以下の 6 項目を記入して WhatsApp にご送信ください。30 秒で見積をご返信します。数量と製本は表を目安にご選択いただけます。',
    rows: [
      { label: '品目と部数', value: '練習帳／問題集／学年誌は分けてご記入ください。常用段階 100／500／1,000／2,000／3,000／5,000／10,000 部（練習帳はデジタル 10 部から）。' },
      { label: 'サイズとページ数', value: 'A5／A4 縦。総ページ数（例：A5 32PP）が用紙と見積に直結します。' },
      { label: '製本', value: '中綴じ（ページ数が少なく平らに開く）／無線綴じ（48 ページ以上、背表紙が平ら）。' },
      { label: '用紙', value: '本文は 80g〜100g の上質紙・道林紙（書きやすく反射しにくい）。表紙は 157g〜200g のコート／マットコート紙。' },
      { label: '内面レイアウト', value: '横罫／マス／無地の 3 種。ページ番号・章立て・設問欄は無料で組版します。' },
      { label: 'データと納期', value: '印刷用 PDF（上の入稿チェックリスト参照）。納期は即時見積の表示基準。新学期シーズンは早めのご発注を。' },
    ],
    links: links('ja', 'school'),
    footnote: '数量段階・用紙仕様は製品ページ基準。最終見積は 30 秒即時見積にて。',
  },
  'bag-quote-template': {
    id: 'bag-quote-template',
    eyebrow: '見積シート',
    title: '紙袋見積サイズ入力シート（1 枚記入でスムーズ見積り）',
    intro: '下表 6 項目を記入して WhatsApp へご送信ください。記入例は当社の中判クラフト袋の現行仕様です。数字だけ差し替えても構いません。',
    rows: [
      { label: '展開サイズ', value: '幅 × マチ × 高さ（mm）。例：中判 260 × 170 × 250 mm。小判／中判／大判で対応可。' },
      { label: '用紙', value: 'クラフト 120〜200g。FSC クラフト／白板紙も選択可（エコブランド対応）。' },
      { label: '持ち手', value: '紙紐（ツイスト／フラット）／綿紐。ギフト袋はリボン・三つ打ち紐も対応。' },
      { label: '印刷・加工', value: '単色〜4 色。箔押し・スポット UV のブランド加工に対応。' },
      { label: '数量', value: '100 個から。常用段階 500／1,000／2,000／3,000／5,000。' },
      { label: '納期とデータ', value: '標準生産 3〜5 営業日。印刷用 PDF または AI 展開図（糊しろ確認込み）。' },
    ],
    links: links('ja', 'bag'),
    footnote: 'ニカ（刀型）デザイン無料・版下無料。HK$500 以上は香港九龍新界送料無料。最終見積は 30 秒即時見積にて。',
  },
};

/* ---------- 挂载映射（§十二 词簇: 书刊/同人/海报 → pdf-checklist; 教材/书刊 → school-procurement; 纸袋 → bag-quote-template） ---------- */
const CATEGORY_ASSET_IDS: Record<string, string[]> = {
  books: ['pdf-checklist', 'school-procurement'],
  educational: ['school-procurement'],
  'japan-doujin': ['pdf-checklist'],
  posters: ['pdf-checklist'],
  'paper-bags': ['bag-quote-template'],
};

export function getProcurementAssets(locale: Locale, categorySlug: string): ProcurementAsset[] {
  const ids = CATEGORY_ASSET_IDS[categorySlug];
  if (!ids) return [];
  const table = locale === 'zh-hk' ? ZH_HK : locale === 'en' ? EN : JA;
  return ids.map((id) => table[id]).filter(Boolean);
}
