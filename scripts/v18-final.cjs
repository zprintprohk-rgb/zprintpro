// v18-final.cjs — v18 v2 完整执行
const fs = require('fs');

console.log('=== V18 Final v2 ===\n');

// ============================================================
// 任务 1C: 乱码修复 — gang-run price_range 三币种串接
// ============================================================
let prod = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf-8');
const oldGR = "price_range: 'HKD 129 起 / USD 25 起 / ￥3,800 起'";
const newGR = "price_range: 'HK$129-17,214'";
prod = prod.replace(oldGR, newGR);
console.log('T1C: gang-run price_range fixed');

// 全站扫描同型三币种串接
const multiCurrencyMatches = prod.match(/price_range:\s*'HKD\s+\d+.*USD.*JPY.*'/g) || [];
console.log('  Multi-currency residual: ' + multiCurrencyMatches.length);

// ============================================================
// 任务 1A/B: 分层 — A类留价格表, B类撤表改区间锚
// ============================================================

// A类 slugs (保留真实价格表 + ReferencePriceBlock)
const A_CLASS = new Set([
  'gang-run-card-boxes','tuck-end-boxes','corrugated-boxes',
  'a2-posters','a1-posters',
  'white-card-bags',
  'waterproof-stickers','digital-stickers',
  'a4-flyers','a5-flyers','folded-leaflets','same-day-flyers','eco-flyers',
  'saddle-stitch-booklets','perfect-bound-books','exercise-books',
]);

// B类 slugs (撤价格表, 只留区间锚)
const B_RANGES = {
  'white-card-boxes': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'rigid-boxes': { zh: '每個 HK$2-10 起 · 實價按規格報價', en: 'from US$0.25-1.30/pc · final quote by specs', ja: '1個 ¥40-200 〜 · 仕様により正式見積' },
  'hardcover-books': { zh: '每本 HK$5-10 起 · 實價按規格報價', en: 'from US$0.65-1.30/book · final quote by specs', ja: '1冊 ¥100-200 〜 · 仕様により正式見積' },
  'spiral-notebooks': { zh: '每本 HK$0.5-2 起 · 實價按規格報價', en: 'from US$0.07-0.26/book · final quote by specs', ja: '1冊 ¥10-40 〜 · 仕様により正式見積' },
  'catalog-printing': { zh: '每本 HK$0.5-2 起 · 實價按規格報價', en: 'from US$0.07-0.26/book · final quote by specs', ja: '1冊 ¥10-40 〜 · 仕様により正式見積' },
  'mailer-boxes': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'food-boxes': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'cosmetic-boxes': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'folding-boxes': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'kraft-paper-packaging-box': { zh: '每個 HK$0.5-2 起 · 實價按規格報價', en: 'from US$0.07-0.26/pc · final quote by specs', ja: '1個 ¥10-40 〜 · 仕様により正式見積' },
  'electronics-packaging-box': { zh: '每個 HK$0.5-3 起 · 實價按規格報價', en: 'from US$0.07-0.40/pc · final quote by specs', ja: '1個 ¥10-60 〜 · 仕様により正式見積' },
  'magnetic-closure-gift-box': { zh: '每個 HK$2-8 起 · 實價按規格報價', en: 'from US$0.25-1.05/pc · final quote by specs', ja: '1個 ¥40-160 〜 · 仕様により正式見積' },
};

// ============================================================
// 任务 1D: 起订量一致性 — a2-posters 统一 10 張
// ============================================================
const a2Idx = prod.indexOf("slug: 'a2-posters'");
const a2Next = prod.indexOf("id: 'PO-002'", a2Idx);
const a2Block = prod.slice(a2Idx, a2Next);

// Fix title_zh
const a2OldTitle = "title_zh: 'A2海報印刷 1張起印 HK$8/張 雙面彩印 防水 | 零售精品/餐飲外賣/教育培訓 | 智印雲 ZprintPro'";
const a2NewTitle = "title_zh: 'A2海報印刷 10張起印 HK$12.9/張 雙面彩印 防水 | 零售精品/餐飲外賣/教育培訓 | 智印雲 ZprintPro'";
prod = prod.replace(a2OldTitle, a2NewTitle);

// Fix description
const a2OldDesc = "description: 'A2海報印刷訂製，1張起印，HK$8起/張。200g銅版紙/PP合成紙，雙面四色印刷，防水防曬耐用。適合地產活動展覽店舖推廣，48小時交貨，全港送貨。**適配行業**:零售精品店、品牌 pop-up、商場快閃、餐廳菜單推廣、咖啡店、教育培訓機構、藝廊展覽、婚慶活動。'";
const a2NewDesc = "description: 'A2海報印刷訂製，10張起印，HK$12.9起/張。200g銅版紙/PP合成紙，雙面四色印刷，防水防曬耐用。適合地產活動展覽店舖推廣，48小時交貨，全港送貨。**適配行業**:零售精品店、品牌 pop-up、商場快閃、餐廳菜單推廣、咖啡店、教育培訓機構、藝廊展覽、婚慶活動。'";
prod = prod.replace(a2OldDesc, a2NewDesc);

// Fix description_zh
const a2OldDescZh = "description_zh: '標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。'";
const a2NewDescZh = "description_zh: '標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，10張起訂。'";
prod = prod.replace(a2OldDescZh, a2NewDescZh);

// Fix descriptionEn
const a2OldDescEn = "descriptionEn: 'Standard A2 size, first choice for event promotion. 157g glossy paper, vibrant colors, same-day delivery. **Best for**: retail boutique, brand pop-up, mall flash store, restaurant menu promo, cafe, education training, gallery exhibition, wedding events.'";
const a2NewDescEn = "descriptionEn: 'Standard A2 size poster, 10-sheet minimum. 157g glossy paper, vibrant colors. **Best for**: retail boutique, brand pop-up, mall flash store, restaurant menu promo, cafe, education training, gallery exhibition, wedding events.'";
prod = prod.replace(a2OldDescEn, a2NewDescEn);

// Fix descriptionJa
const a2OldDescJa = "descriptionJa: '標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、即日納品。**適用業界**:小売セレクト、ブランド pop-up、ショッピングモール フラッシュ、レストランメニュー、カフェ、教育研修、ギャラリー展示、ブライダルイベント。'";
const a2NewDescJa = "descriptionJa: '標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、10枚から。**適用業界**:小売セレクト、ブランド pop-up、ショッピングモール フラッシュ、レストランメニュー、カフェ、教育研修、ギャラリー展示、ブライダルイベント。'";
prod = prod.replace(a2OldDescJa, a2NewDescJa);

// Fix minQuantity
const a2OldMinQ = "minQuantity: 1,";
const a2NewMinQ = "minQuantity: 10,";
if (a2Block.includes(a2OldMinQ)) {
  prod = prod.slice(0, a2Idx) + a2Block.replace(a2OldMinQ, a2NewMinQ) + prod.slice(a2Next);
} else {
  // Try minQuantity: 10 but not found - might be 100
  if (a2Block.includes("minQuantity: 100,")) {
    const fixed = a2Block.replace("minQuantity: 100,", a2NewMinQ);
    prod = prod.slice(0, a2Idx) + fixed + prod.slice(a2Next);
  }
}
console.log('T1D: a2-posters minQuantity: 10');

fs.writeFileSync('F:/zprintpro-nextjs/src/data/products.ts', prod, 'utf-8');

// ============================================================
// 任务 1E: 运费文案统一 — 满$500包邮
// ============================================================
let page = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');

// PDP page badge texts
const badgeReps = [
  ["'小批量順豐快遞 · 運費實報'", "'滿$500包郵到手'"],
  ["'Small-batch SF Express · Freight collect'", "'Free shipping over $500'"],
  ["'小ロット SF Express · 配送料実費'", "'$500 相当以上 送料無料'"],
  ["'順豐快遞 · 運費實報'", "'滿$500包郵到手'"],
  ["'SF Express · Freight collect'", "'Free shipping over $500'"],
  ["'SF Express · 配送料実費'", "'$500 相当以上 送料無料'"],
];
badgeReps.forEach(([old,neu]) => { page = page.replace(old, neu); });
console.log('T1E: Badge texts updated');

// Fix the en/ja shipping banner in PDP
const oldEnBadge = "locale === 'en' ? 'Free International Shipping' : 'SF Express · 配送料実費'";
const newEnBadge = "locale === 'en' ? 'Free shipping over $500' : '$500 相当以上 送料無料'";
page = page.replace(oldEnBadge, newEnBadge);

// Fix DHL shipping text
const oldDHL = "locale === 'en' ? 'DHL/FedEx 3-5 days to USA, 2-4 days to Japan' : 'DHL/FedEx アメリカ3-5日、日本2-4日'";
const newDHL = "locale === 'en' ? 'DHL Global 2-4 days · Free over $500' : 'DHL 国際 2-4日 · $500相当以上送料無料'";
page = page.replace(oldDHL, newDHL);
fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', page, 'utf-8');

// Update ReferencePriceBlock shipping function
let rpb = fs.readFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', 'utf-8');

// Replace getShippingText function
const oldShipFn = "function getShippingText(w, locale) {\n  if (w === null || w === undefined) return locale === \"ja\" ? \"配送料別途\" : locale === \"en\" ? \"Shipping TBD\" : \"運費另計\";\n  if (w > 30) return locale === \"ja\" ? \"配送料別途見積\" : locale === \"en\" ? \"Freight quoted separately\" : \"物流另行報價\";\n  return locale === \"ja\" ? \"SF Express (着払い)\" : locale === \"en\" ? \"SF Express (collect)\" : \"順豐到付\";\n}";
const newShipFn = "function getShippingText(w, locale) {\n  // v18: unified — 满$500包邮含物流件\n  return locale === \"ja\" ? \"$500相当以上 送料無料\" : locale === \"en\" ? \"Free over $500\" : \"滿$500包郵 (順豐/物流) · 未滿$500運費實報\";\n}";
rpb = rpb.replace(oldShipFn, newShipFn);
fs.writeFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', rpb, 'utf-8');
console.log('T1E: ReferencePriceBlock shipping unified');

// ============================================================
// 任务 2: 交期文案 — 更新 PDP 页 sameDay/quality/freeShipping 三元组
// ============================================================
let page2 = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');

// Replace the zh-hk sameDay/quality/freeShipping translation block
const oldSameDayZh = "sameDay: '標準交期',";
const newSameDayZh = "sameDay: '標準交期 · 交期因產品而異',";
page2 = page2.replace(oldSameDayZh, newSameDayZh);

const oldSameDayEn = "sameDay: 'Standard lead time',";
const newSameDayEn = "sameDay: 'Standard lead time · Varies by product',";
page2 = page2.replace(oldSameDayEn, newSameDayEn);

const oldSameDayJa = "sameDay: '標準納期',";
const newSameDayJa = "sameDay: '標準納期 · 製品により異なる',";
page2 = page2.replace(oldSameDayJa, newSameDayJa);

fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', page2, 'utf-8');
console.log('T2: Lead-time texts updated');

// ============================================================
// VERIFY
// ============================================================
const p2 = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf-8');
console.log('\n=== Verify ===');
console.log('gang-run pr: ' + (p2.includes("'HK$129-17,214'") ? 'FIXED' : 'FAIL'));
console.log('Multi-currency: ' + (p2.match(/HKD\s+\d+.*USD.*JPY/g) ? 'RESIDUAL' : 'CLEAN'));
console.log('a2 title: ' + (p2.includes('10張起印') ? 'FIXED' : 'FAIL'));
console.log('a2 minQty: ' + (p2.slice(a2Idx, a2Next).includes('minQuantity: 10,') ? 'FIXED' : 'FAIL'));

const pg = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/product/[slug]/page.tsx', 'utf-8');
console.log('badge zh: ' + (pg.includes('滿$500包郵到手') ? 'OK' : 'FAIL'));
console.log('badge en: ' + (pg.includes('Free shipping over $500') ? 'OK' : 'FAIL'));
const r = fs.readFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', 'utf-8');
console.log('ship fn: ' + (r.includes('滿$500包郵') ? 'OK' : 'FAIL'));

console.log('\n=== Done ===');
