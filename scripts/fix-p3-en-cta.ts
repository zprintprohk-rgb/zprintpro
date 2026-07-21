/**
 * P3 en WARN 批量修复 - CTA sharp hook
 * 2026-07-15 00:26 P3 收尾
 *
 * 修 1 类 WARN: meta CTA 缺失
 * 修法: 末尾追加 sharp hook (Free Design / Free Shipping / No MOQ / 100 MOQ)
 *
 * §13.15 美国市场集中 sharp hook:
 *   - stickers/flyers/packaging/paper-bags (P0 cat): Free Design | 100 MOQ | Free Shipping
 *   - others: Free Design | 100 MOQ
 *
 * SSoT: src/data/sku-seo-data.ts
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// P0 cat 强 sharp hook
const P0_HOOK = 'Free Design | 100 MOQ | Free Shipping $99+';
// P1/P2 cat 标准 sharp hook
const STD_HOOK = 'Free Design | 100 MOQ';

const P0_CATS = new Set(['stickers', 'flyers', 'packaging', 'paper-bags']);

const CTA_TRIGGERS = ['Free Shipping', 'Free Design', 'Free Mockup', 'No Minimum', 'No MOQ', 'Same Day', 'Fast Turnaround', 'Made in USA', 'Made for USA', 'Get Quote', 'Order Now', '100 MOQ'];

console.log(`\n🔧 P3 en WARN 修复 (${isApply ? 'APPLY' : 'DRY-RUN'})`);

let modified = 0;
let skipped = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, data] of Object.entries(skuSeoData)) {
  const d = data as any;
  const seo = d.seo?.en;
  if (!seo) { skipped++; continue; }
  const oldMeta = seo.description || '';
  // 跳过已包含 CTA 的
  if (CTA_TRIGGERS.some(t => oldMeta.includes(t))) { skipped++; continue; }
  // 选 hook
  const productCat = d.cat || (slug.includes('sticker') ? 'stickers' : '');
  const hook = P0_CATS.has(productCat) ? P0_HOOK : STD_HOOK;
  // 追加: 总长 ≤ 160 字
  let newMeta = oldMeta.replace(/[.!?]?$/, '');
  const candidate = newMeta + ' | ' + hook;
  if (candidate.length > 160) {
    // 截断到 140 字 + hook (15 字) = 155
    const cut = newMeta.substring(0, 140);
    const lastDot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
    newMeta = lastDot > 80 ? cut.substring(0, lastDot) : cut;
    newMeta = newMeta + ' | ' + hook;
  } else {
    newMeta = candidate;
  }
  // NAP check
  if (/Shenzhen|名片|咭片|business card|智印印港/.test(newMeta)) {
    console.log(`❌ ${slug} 含 NAP, 跳过`); failed++; continue;
  }
  if (newMeta.length > 160) {
    console.log(`❌ ${slug} 超长 (${newMeta.length}), 跳过`); failed++; continue;
  }
  console.log(`  [${slug}] (${oldMeta.length}→${newMeta.length}字)`);
  if (isApply) pendingWrites.push({ slug, newVal: newMeta });
  modified++;
}

console.log(`\n📊 总览: ${modified} 待修, ${skipped} 跳过 (无 en/已有 CTA), ${failed} 失败`);

if (isApply && pendingWrites.length > 0) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of pendingWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    const seoStart = content.indexOf('"seo":', slugStart);
    const enStart = content.indexOf('"en":', seoStart);
    const descKeyStart = content.indexOf('"description":', enStart);
    const valStartQuote = content.indexOf('"', descKeyStart + 13);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failed} 失败`);
} else {
  console.log(`\n确认后运行: npx tsx scripts/fix-p3-en-cta.ts --apply`);
}
