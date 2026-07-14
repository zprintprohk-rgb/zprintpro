/**
 * P3 en 严重问题批量修复
 * 2026-07-15 00:12 P3 启动
 *
 * 修 2 类 ERROR:
 *   1. title 重复 "ZprintPro" 出现 2 次 (11 SKU)
 *   2. alt 超长 > 120 字符 (2 SKU: large-bags, display-posters)
 *
 * 用法:
 *   npx tsx scripts/fix-p3-en-error.ts --dry-run
 *   npx tsx scripts/fix-p3-en-error.ts --apply
 *
 * SSoT: src/data/sku-seo-data.ts
 * Refs:
 *   - §13.15 美国市场集中 (en sharp hook: Free US Ship / Free Design / Free Mockup)
 *   - §13.10 NAP 脱钩
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// 11 title 重复: 删 "| ZprintPro | ZprintPro" 加 "Free US Ship | ZprintPro"
const TITLE_FIXES: Record<string, string> = {
  'same-day-flyers': 'Same-day Flyers | Same-Day Printing | Free US Ship | ZprintPro',
  'foil-red-packets': 'Foil Red Packets | Gold Foil Print | Free US Ship | ZprintPro',
  'large-red-packets': 'Large Red Packets | Gold Foil Print | Free US Ship | ZprintPro',
  'wall-calendars': 'Wall Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro',
  'desk-calendars': 'Desk Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro',
  'mini-calendars': 'Mini Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro',
  'laminated-menus': 'Laminated Menus | Laminated Durable | Free US Ship | ZprintPro',
  'hardcover-menus': 'Hardcover Menus | Laminated Durable | Free US Ship | ZprintPro',
  'catalog-printing': 'Catalog Printing | Saddle-Stitched | Free US Ship | ZprintPro',
  'perfect-bound-books': 'Perfect Bound Books | Perfect Bound | Free US Ship | ZprintPro',
  'drawer-slide-gift-box': 'Drawer Slide Gift Box | Ribbon Pull | Free US Ship | ZprintPro',
};

// 2 alt 超长: 截断到 ≤120 字, 保留 sharp hook
const ALT_FIXES: Record<string, string> = {
  'large-bags': 'Large paper bags printing 12-20kg load 100 MOQ | Free US Ship $99+ | 2-4 day DHL | ZprintPro',
  'display-posters': 'Display posters printing foam board | Free US Ship $99+ | 2-4 day DHL | ZprintPro',
};

console.log(`\n🔧 P3 en 严重问题修复 (${isApply ? 'APPLY' : 'DRY-RUN'})`);
console.log(`  - ${Object.keys(TITLE_FIXES).length} title 重复修复`);
console.log(`  - ${Object.keys(ALT_FIXES).length} alt 超长修复\n`);

let modified = 0;
let failed = 0;
const pendingWrites: Array<{ slug: string; field: 'title-en' | 'alt-en'; newVal: string }> = [];

for (const [slug, newTitle] of Object.entries(TITLE_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data?.seo?.en) { console.log(`⚠️ ${slug} 无 en seo 条目`); failed++; continue; }
  const oldTitle = data.seo.en.title;
  console.log(`  [${slug}] title (${oldTitle.length}字): ${oldTitle}`);
  console.log(`             NEW (${newTitle.length}字): ${newTitle}`);
  if (isApply) pendingWrites.push({ slug, field: 'title-en', newVal: newTitle });
  modified++;
}

for (const [slug, newAlt] of Object.entries(ALT_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data?.imageAlt) { console.log(`⚠️ ${slug} 无 imageAlt 条目`); failed++; continue; }
  const oldAlt = data.imageAlt.en || '';
  console.log(`  [${slug}] alt (${oldAlt.length}字): ${oldAlt.substring(0, 60)}...`);
  console.log(`             NEW (${newAlt.length}字): ${newAlt}`);
  if (isApply) pendingWrites.push({ slug, field: 'alt-en', newVal: newAlt });
  modified++;
}

if (isApply && pendingWrites.length > 0) {
  console.log(`\n💾 写回 ${SKU_DATA_PATH}...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of pendingWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    if (slugStart < 0) { failed++; continue; }
    if (w.field === 'title-en') {
      const seoStart = content.indexOf('"seo":', slugStart);
      const enStart = content.indexOf('"en":', seoStart);
      const titleKeyStart = content.indexOf('"title":', enStart);
      const valStartQuote = content.indexOf('"', titleKeyStart + 8);
      const valStart = valStartQuote + 1;
      const valEnd = content.indexOf('"', valStart);
      content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    } else if (w.field === 'alt-en') {
      const imgAltStart = content.indexOf('"imageAlt":', slugStart);
      const enStart = content.indexOf('"en":', imgAltStart);
      const valStartQuote = content.indexOf('"', enStart + 5);
      const valStart = valStartQuote + 1;
      const valEnd = content.indexOf('"', valStart);
      content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    }
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 修改完成: ${successCount} 成功, ${failed} 失败`);
  console.log(`\n📋 后续: 重 audit en + Live curl + commit + push + verify-deploy`);
} else {
  console.log(`\n✅ DRY-RUN 完成: ${modified} SKU 待修改`);
  console.log(`确认后运行: npx tsx scripts/fix-p3-en-error.ts --apply`);
}
