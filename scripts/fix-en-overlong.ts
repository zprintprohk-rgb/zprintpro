/**
 * P3 final: en 13 meta + 2 title 超长 精简
 * 2026-07-15 10:50
 */
import { skuSeoData } from '../src/data/sku-seo-data.ts';
import { readFileSync, writeFileSync } from 'node:fs';

const SKU_DATA_PATH = 'src/data/sku-seo-data.ts';
const isApply = process.argv.includes('--apply');

// 13 en meta 精简 (目标 ≤160)
const META_FIXES: Record<string, string> = {
  'premium-business-cards': 'Premium Business Cards, 350gsm premium paper. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery for small business. | ZprintPro',
  'foil-business-cards': 'Foil Business Cards with gold/silver foil stamping. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA turnaround. | ZprintPro',
  'spot-uv-business-cards': 'Spot UV Business Cards, glossy UV coating on logos. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery. | ZprintPro',
  'matte-business-cards': 'Matte Business Cards custom printing, 300gsm matte paper. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for premium brands. | ZprintPro',
  'rounded-corner-cards': 'Rounded Corner Cards custom printing, smooth 4-corner radius finishing. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery. | ZprintPro',
  'waterproof-stickers': 'Waterproof Stickers custom printing, PVC UV-resistant material. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for DTC brands. | ZprintPro',
  'transparent-stickers': 'Transparent Stickers custom printing, clear PET material. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for product labels. | ZprintPro',
  'security-stickers': 'Security Stickers, VOID tamper-evident material. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery for asset tracking. | ZprintPro',
  'fluorescent-stickers': 'Fluorescent Stickers custom printing, UV-reactive neon colors. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for events. | ZprintPro',
  'art-posters': 'Art Posters custom printing, premium matte art paper. Free design mockup, 50 MOQ, Free Shipping $99+. 4-day USA delivery for artists. | ZprintPro',
  'folding-boxes': 'Folding Boxes custom printing, eco-friendly kraft paper. Free design mockup, 100 MOQ, Free Shipping $99+. 4-day USA delivery for retail packaging. | ZprintPro',
  'magnetic-closure-gift-box': 'Magnetic Gift Box, premium rigid board. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery for premium brands. | ZprintPro',
  'fruit-food-label-stickers': 'Fruit Food Label Stickers, FDA-compliant. Free Design, 100 MOQ, Free Shipping $99+. 4-day USA delivery. | ZprintPro',
};

// 2 en title 超长 精简
const TITLE_FIXES: Record<string, string> = {
  'cosmetic-boxes': 'Cosmetic Boxes | 100 MOQ | Free US Ship | ZprintPro',
  'graduation-yearbook': 'Graduation Yearbook | 50 MOQ | Free US Ship | ZprintPro',
};

console.log(`\n🔧 P3 final: en 13 meta + 2 title 精简 (${isApply ? 'APPLY' : 'DRY-RUN'})\n`);

let modified = 0;
let failed = 0;
const metaWrites: Array<{ slug: string; newVal: string }> = [];
const titleWrites: Array<{ slug: string; newVal: string }> = [];

for (const [slug, newMeta] of Object.entries(META_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { failed++; continue; }
  const oldMeta = (data.seo && data.seo.en && data.seo.en.description) || '';
  console.log(`  [${slug}] en meta (${oldMeta.length}→${newMeta.length})`);
  if (newMeta.length > 160) { console.log(`  ❌ 仍 >160, 跳过`); failed++; continue; }
  if (isApply) metaWrites.push({ slug, newVal: newMeta });
  modified++;
}

for (const [slug, newTitle] of Object.entries(TITLE_FIXES)) {
  const data = skuSeoData[slug] as any;
  if (!data) { failed++; continue; }
  const oldTitle = (data.seo && data.seo.en && data.seo.en.title) || '';
  console.log(`  [${slug}] en title (${oldTitle.length}→${newTitle.length})`);
  if (newTitle.length > 65) { console.log(`  ❌ 仍 >65, 跳过`); failed++; continue; }
  if (isApply) titleWrites.push({ slug, newVal: newTitle });
  modified++;
}

if (isApply && (metaWrites.length > 0 || titleWrites.length > 0)) {
  console.log(`\n💾 写回...`);
  let content = readFileSync(SKU_DATA_PATH, 'utf-8');
  let successCount = 0;
  for (const w of metaWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    const seoStart = content.indexOf('"seo":', slugStart);
    const enStart = content.indexOf('"en":', seoStart);
    const descStart = content.indexOf('"description":', enStart);
    const valStartQuote = content.indexOf('"', descStart + 14);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  for (const w of titleWrites) {
    const slugStart = content.indexOf(`"${w.slug}":`);
    const seoStart = content.indexOf('"seo":', slugStart);
    const enStart = content.indexOf('"en":', seoStart);
    const titleStart = content.indexOf('"title":', enStart);
    const valStartQuote = content.indexOf('"', titleStart + 8);
    const valStart = valStartQuote + 1;
    const valEnd = content.indexOf('"', valStart);
    content = content.substring(0, valStart) + w.newVal + content.substring(valEnd);
    successCount++;
  }
  writeFileSync(SKU_DATA_PATH, content, 'utf-8');
  console.log(`✅ 完成: ${successCount} 成功`);
} else {
  console.log(`\n✅ DRY-RUN 完成: ${modified} 待修改`);
}
