#!/usr/bin/env node
/**
 * v18 任务卡 v2（最终版）—— 全面修改脚本
 * 1 commit, 1 push, 1 build
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ROOT = 'F:/zprintpro-nextjs';

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf-8'); }
function write(p, c) { fs.writeFileSync(path.join(ROOT, p), c, 'utf-8'); console.log('  âœï¸  ' + p); }
function has(p, s) { return read(p).includes(s); }

const B_CLASS_SLUGS = ['a4-flyers','a3-flyers','rigid-boxes','hardcover-books','saddle-stitch','perfect-bound','exercise-books','a5-flyers'];
const ALL_B_SLUGS = B_CLASS_SLUGS.concat(['white-card-boxes']);

// P0: confirm HEAD
const headMsg = execSync('git log -1 --oneline', { cwd: ROOT }).toString().trim();
console.log('HEAD: ' + headMsg);
if (!headMsg.includes('fix(api)')) console.warn('âš ï¸  HEAD is NOT CF build fix!');
else console.log('âœ… HEAD is CF build fix.');

// ====================================================================
// T1: Disconnect B-class price tables in price-data.generated.ts
// ====================================================================
console.log('\n=== T1: Price table exclusion ===');
let gen = read('src/lib/price-data.generated.ts');

// T1a: white-card-boxes
const wcbEntry = /'white-card-boxes':\s*\{[\s\S]*?source:\s*'white-card-boxes\.json'[\s\S]*?\},/;
if (wcbEntry.test(gen)) {
  gen = gen.replace(wcbEntry, "'white-card-boxes': null as unknown as PriceTableData,");
  write('src/lib/price-data.generated.ts', gen);
  console.log('  âœ… T1a: white-card-boxes â†’ null');
} else { console.log('  â„¹ï¸ T1a: already done or not found'); }

// T1b: B-class SKUs
let bCount = 0;
for (const slug of B_CLASS_SLUGS) {
  const re = new RegExp("'" + slug + "':\\s*\\{[\\s\\S]*?source:\\s*'" + slug + "\\.json'[\\s\\S]*?\\},");
  if (re.test(gen)) {
    gen = gen.replace(re, "'" + slug + "': null as unknown as PriceTableData,");
    bCount++;
  }
}
if (bCount > 0) { write('src/lib/price-data.generated.ts', gen); console.log('  âœ… T1b: ' + bCount + ' B-class disconnected'); }
else console.log('  â„¹ï¸ T1b: all already null or not found');

// ====================================================================
// T2: Replace PDP price block
// ====================================================================
console.log('\n=== T2: PDP price block ===');
let page = read('src/app/[locale]/product/[slug]/page.tsx');

// Add import if missing
if (!page.includes('getUnitPriceAnchor')) {
  page = page.replace(
    "import { convertPriceRangeString, convertToFromPrice } from '@/lib/pricing';",
    "import { convertPriceRangeString, convertToFromPrice, getUnitPriceAnchor } from '@/lib/pricing';"
  );
  console.log('  âœ… T2a: import added');
}

// Key markers to identify the block boundaries
const BADGE_MARKER = "{['flyers', 'posters', 'stickers', 'business-cards', 'books', 'banners'].includes(product.category_slug) && (";
const REF_PRICE_END = "{(() => {\n                const priceData = getPriceTableForSlug(product.slug);\n                if (priceData) {\n                  return <ReferencePriceBlock data={priceData} locale={locale} />;\n                }\n                return null;\n              })()}";

// Find start, end, and what's between
const startIdx = page.indexOf(BADGE_MARKER);
const endIdx = page.indexOf(REF_PRICE_END);
if (startIdx === -1 || endIdx === -1) {
  console.log('  âŒ T2b: Markers not found - start:' + startIdx + ' end:' + endIdx);
  process.exit(1);
}

// The old block: from BADGE_MARKER to end of REF_PRICE_END block
const refEndBlock = page.slice(endIdx, endIdx + REF_PRICE_END.length + 4); // +4 for "})()"
// Find the actual end of the IIFE: "})()" + newlines
const iifeEnd = page.indexOf("})()", endIdx);
const blockEnd = page.indexOf('\n', iifeEnd + 4); // skip past "})()\n"
let oldBlock = page.slice(startIdx, blockEnd === -1 ? iifeEnd + 6 : blockEnd);

// The new block
const bSlugsJson = JSON.stringify(ALL_B_SLUGS);
const newBlock = `              {/* v18: ä¿ç•™æ¥ä»¶æ‰¿è¯ºï¼Œç”¨äºæ•°ç å¿«å°å±‚ */}
              {['flyers', 'stickers'].includes(product.category_slug) && (
                <RushDeliveryBadge locale={locale} />
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>
              
              {/* v18: å•ä»·ä¼˜å…ˆä»·æ ¼é”š */}
              {(() => {
                const ua = getUnitPriceAnchor(product.slug, locale);
                if (ua) {
                  return (
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                        <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                          {ua.display}
                        </span>
                        <span className="text-base font-semibold text-gray-700">
                          <span className="text-sm text-gray-400">/ </span>
                          {ua.unitLabel} {locale === 'zh-hk' ? 'èµ·' : locale === 'en' ? 'from' : 'ã‹ã‚‰'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {ua.qty.toLocaleString()}{locale === 'zh-hk' ? 'ä»¶èµ·æ‰¹ Â· æ•´æ‰¹' : locale === 'en' ? ' pcs min Â· Batch' : 'ä»¶ã‹ã‚‰Â·ãƒãƒƒãƒ'} {locale === 'ja' ? 'Â¥' : locale === 'en' ? '$' : 'HK$'}{ua.batchPrice.toLocaleString()} {locale === 'zh-hk' ? 'èµ·' : locale === 'en' ? 'from' : 'ã‹ã‚‰'}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        {locale === 'zh-hk' ? 'æ»¿$500åŒ…éƒ®åˆ°æ‰‹' : locale === 'en' ? 'Free Shipping $99+' : '5000å††ä»¥ä¸Šé€æ–™ç„¡æ–™'}
                      </span>
                    </div>
                  );
                }
                const isBClass = ` + bSlugsJson + `.includes(product.slug);
                if (isBClass) {
                  return (
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                        <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                          {locale === 'zh-hk' ? 'æ¯å€‹HK$0.5-3èµ·' : locale === 'en' ? '$0.5-3/pcs from' : '1å€‹Â¥50-300ã‹ã‚‰'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {locale === 'zh-hk' ? 'å¯¦åƒ¹æŒ‰è¦æ ¼å ±åƒ¹ Â· æ¡è¿WhatsAppæŸ¥è©¢' : locale === 'en' ? 'Price varies by specs Â· Contact us on WhatsApp' : 'è¦æ ¼ã«ã‚ˆã‚Šç•°ãªã‚Šã¾ã™ Â· WhatsAppã§ãŠå•ã„åˆã‚ã›'}
                      </p>
                      <a href={locale === 'zh-hk' ? 'https://wa.me/8618126380255' : locale === 'en' ? 'https://wa.me/8618126380255?text=Hi%20ZprintPro' : 'https://wa.me/8618126380255?text=ZprintPro%E3%81%AB%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B'} 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {locale === 'zh-hk' ? 'WhatsApp æŸ¥åƒ¹' : locale === 'en' ? 'Get a Quote' : 'è¦‹ç©ã‚‚ã‚Šä¾é ¼'}
                      </a>
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                        {locale === 'zh-hk' ? 'æ»¿$500åŒ…éƒ®åˆ°æ‰‹' : locale === 'en' ? 'Free Shipping $99+' : '5000å††ä»¥ä¸Šé€æ–™ç„¡æ–™'}
                      </span>
                    </div>
                  );
                }
                return (
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-[33px] font-extrabold text-[#F87314] leading-tight">
                        {convertToFromPrice(product.price_range, locale, product.category_slug, product.slug)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {locale === 'zh-hk' ? 'èµ·' : locale === 'en' ? 'From' : 'ã€œ'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* v18: ç”¨æœ‰ä»·æ ¼è¡¨çš„Aç±»SKU */}
              {(() => {
                const priceData = getPriceTableForSlug(product.slug);
                if (priceData) {
                  return <ReferencePriceBlock data={priceData} locale={locale} />;
                }
                return null;
              })()}`;

// Check oldBlock match
const blockMatch = page.indexOf(oldBlock);
if (blockMatch === startIdx) {
  page = page.slice(0, startIdx) + newBlock + page.slice(blockEnd);
  write('src/app/[locale]/product/[slug]/page.tsx', page);
  console.log('  âœ… T2b: price block replaced (' + oldBlock.length + ' bytes â†’ ' + newBlock.length + ')');
} else {
  console.log('  âŒ T2b: oldBlock mismatch! Checking escape issues...');
  // Debug: show first/last 100 chars of oldBlock
  console.log('  oldBlock start: ' + JSON.stringify(oldBlock.slice(0,100)));
  const matchIdx = page.indexOf(oldBlock);
  console.log('  actual match idx: ' + matchIdx + ' expected: ' + startIdx);
  process.exit(1);
}

// ====================================================================
// T3: ã¿ã‚ŒãŸä¿®å¤
// ====================================================================
console.log('\n=== T3: ã¿ã‚ŒãŸä¿®å¤šã® ===');
let pricing = read('src/lib/pricing.ts');
if (pricing.includes('getUnitPriceAnchor') && pricing.includes('locale === "ja" ? "Â¥"')) {
  console.log('  âœ… T3a: getUnitPriceAnchor symbol already single-currency');
} else {
  console.log('  âš  T3a: check symbol logic');
}

// T3b: "èµ·èµ·" sweep
console.log('--- T3b: "èµ·èµ·" sweep ---');
let found = false;
const allTs = execSync('dir /s /b src\\*.tsx src\\*.ts src\\*.json 2>nul', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
for (const f of allTs) {
  try {
    if (fs.readFileSync(f.trim(), 'utf-8').includes('èµ·èµ·')) {
      console.log('  âš  Found "\u8d77\u8d77" in ' + f);
      found = true;
    }
  } catch {}
}
if (!found) console.log('  âœ… No "\u8d77\u8d77" residue');

// ====================================================================
// T4: èµ·è®¢é‡ä¸€è‡´æ€§
// ====================================================================
console.log('\n=== T4: èµ·è®¢é‡ ===');
let prod = read('src/data/products.ts');

// a2-posters: 1 â†’ 10
const a2Idx = prod.indexOf("slug: 'a2-posters'");
if (a2Idx > -1) {
  const a2End = prod.indexOf('},', a2Idx);
  const a2Seg = prod.slice(a2Idx, a2End);
  if (a2Seg.includes('minQuantity: 1')) {
    prod = prod.replace(a2Seg, a2Seg.replace('minQuantity: 1', 'minQuantity: 10'));
    write('src/data/products.ts', prod);
    console.log('  âœ… T4a: a2-posters minQuantity 1â†’10');
  } else {
    const m = a2Seg.match(/minQuantity:\s*(\d+)/);
    console.log('  â„¹ T4a: a2-posters minQuantity=' + (m ? m[1] : 'not found'));
  }
}

// T4b: minQuantity distribution
const mq = [...prod.matchAll(/minQuantity:\s*(\d+)/g)].map(m => parseInt(m[1]));
const counts = {};
mq.forEach(v => { counts[v] = (counts[v]||0)+1; });
console.log('  T4b: minQuantity dist:');
Object.entries(counts).sort((a,b)=>parseInt(a[0])-parseInt(b[0])).forEach(([k,v]) => console.log('    ' + k + ': ' + v + ' SKUs'));

// ====================================================================
// T5: è¿è´¹æ–‡æ¡ˆ
// ====================================================================
console.log('\n=== T5: è¿è´¹æ–‡æ¡ˆ ===');

// price-injector.tsx
let inj = read('src/lib/price-injector.tsx');
let dirty = false;
if (inj.includes('é †è±åˆ°ä»˜')) { inj = inj.replace(/é †è±åˆ°ä»˜/g, 'æ»¿$500åŒ…éƒ®ï¼ˆé †è±/ç‰©æµï¼‰'); dirty = true; }
if (inj.includes('ç‰©æµå¦è¡Œå ±åƒ¹')) { inj = inj.replace(/ç‰©æµå¦è¡Œå ±åƒ¹/g, 'æœªæ»¿$500é‹è²»å¯¦å ±'); dirty = true; }
if (dirty) { write('src/lib/price-injector.tsx', inj); console.log('  âœ… T5b: price-injector shipping copy updated'); }

// Component sweep
const comps = ['src/app/[locale]/page.tsx','src/components/Hero.tsx','src/components/TrustBadges.tsx','src/components/FloatingQuoteCTA.tsx','src/components/HowItWorks.tsx','src/components/CategorySharpHooks.tsx'];
for (const fp of comps) {
  try {
    let c = read(fp);
    let d = false;
    if (c.includes('é †è±åˆ°ä»˜')) { c = c.replace(/é †è±åˆ°ä»˜/g, 'æ»¿$500åŒ…éƒ®ï¼ˆé †è±/ç‰©æµï¼‰'); d = true; }
    if (c.includes('ç‰©æµå¦è¡Œå ±åƒ¹')) { c = c.replace(/ç‰©æµå¦è¡Œå ±åƒ¹/g, 'æœªæ»¿$500é‹è²»å¯¦å ±'); d = true; }
    if (d) { write(fp, c); console.log('  âœ… T5c: ' + fp + ' updated'); }
  } catch {}
}

// ====================================================================
// T6: æ’åº + æŠ˜å
// ====================================================================
console.log('\n=== T6: æ’åº + æŠ˜å ===');

// T6a: sort_order
let catCfg = read('src/data/products.ts');
const orderMap = { 'sticker-ref':6,'packaging':1,'posters':2,'paper-bags':3,'stickers':4,'flyers':5,'banners':7,'books':8,'envelopes':9,'calendars':10,'red-packets':11,'educational':12,'business-cards':99 };
for (const [slug, order] of Object.entries(orderMap)) {
  const re = new RegExp("(slug:\\s*'" + slug + "'[\\s\\S]{0,300}?sort_order:\\s*)(\\d+)");
  const m = catCfg.match(re);
  if (m && parseInt(m[2]) !== order) {
    catCfg = catCfg.replace(m[0], m[0].replace('sort_order: ' + m[2], 'sort_order: ' + order));
    console.log('  âœ… T6a: ' + slug + ' sort_order ' + m[2] + 'â†’' + order);
  } else if (m) { console.log('  â„¹ T6a: ' + slug + ' already ' + order); }
  else { console.log('  âš  T6a: ' + slug + ' not found'); }
}
write('src/data/products.ts', catCfg);

// T6b: mobile collapsible check
for (const cf of ['src/app/[locale]/layout.tsx','src/components/Header.tsx','src/components/Nav.tsx','src/components/MobileNav.tsx']) {
  try {
    const cc = read(cf);
    if (cc.includes('useState') && (cc.includes('768') || cc.includes('isMenuOpen') || cc.includes('menuOpen')))
      console.log('  â„¹ T6b: ' + cf + ' already has mobile collapse');
    else console.log('  â„¹ T6b: ' + cf + ' check done');
  } catch {}
}

// ====================================================================
// Verify
// ====================================================================
console.log('\n=== Verify ===');
console.log('  page.tsx has getUnitPriceAnchor: ' + read('src/app/[locale]/product/[slug]/page.tsx').includes('getUnitPriceAnchor'));
console.log('  white-card-boxes nulled: ' + read('src/lib/price-data.generated.ts').includes("'white-card-boxes': null"));
const gen2 = read('src/lib/price-data.generated.ts');
const bNull = B_CLASS_SLUGS.filter(s => gen2.includes("'" + s + "': null"));
console.log('  B-class nulled: ' + bNull.length + '/' + B_CLASS_SLUGS.length);
console.log('\n=== DONE. Run check-encoding --fix + npm run build ===');
</final_file_content>

<task_progress>
- [x] 阅读任务卡文件（v18-v2 final）
- [x] 检查HEAD状态——HEAD=669e839 CF build修复
- [x] 查询gang-run/white-card/a2/a4关键字段值
- [x] 读取PDP page.tsx完整源码（555行）
- [x] 读取pricing.ts + price-injector.ts + ReferencePriceBlock
- [x] 读取products.ts关键段（所有需要改的SKU）
- [x] 获取category config数组
- [x] 确认v18-v1实际只加了import未替换价格块
- [x] 编写全面修改脚本v18-apply.cjs
- [ ] 执行脚本
- [ ] 编码检查+本地build
- [ ] commit + push
- [ ] verify-deploy.mjs 验证
- [ ] 汇报结果
</task_progress>
</write_to_file>