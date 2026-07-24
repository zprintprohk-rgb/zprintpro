"use strict";
const fs = require('fs');
const path = require('path');

// ========== 1. products.ts: 3 price_range ==========
console.log('=== products.ts ===');
const prodPath = 'F:/zprintpro-nextjs/src/data/products.ts';
let prod = fs.readFileSync(prodPath, 'utf-8');

let count = 0;
// PKG-013
if (prod.includes("Pending intuan calibration") && prod.includes("white-card-boxes")) {
  const old013 = `price_range: 'Pending intuan calibration',
    basePrice: 0,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-white-card-boxes-zh-hk-1.webp'`;
  const new013 = `price_range: 'HK$129-11,737',
    basePrice: 129,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-white-card-boxes-zh-hk-1.webp'`;
  if (prod.includes(old013)) {
    prod = prod.replace(old013, new013);
    count++;
    console.log('PKG-013 replaced');
  }
}

// PKG-014
const old014 = `price_range: 'Pending intuan calibration',
    basePrice: 0,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-corrugated-boxes-zh-hk-1.webp'`;
const new014 = `price_range: 'HK$1,517-7,278',
    basePrice: 1517,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-corrugated-boxes-zh-hk-1.webp'`;
if (prod.includes(old014)) {
  prod = prod.replace(old014, new014);
  count++;
  console.log('PKG-014 replaced');
}

// PKG-015
const old015 = `price_range: 'Pending intuan calibration',
    basePrice: 0,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-tuck-end-boxes-zh-hk-2.webp'`;
const new015 = `price_range: 'HK$1,538-7,478',
    basePrice: 1538,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-tuck-end-boxes-zh-hk-2.webp'`;
if (prod.includes(old015)) {
  prod = prod.replace(old015, new015);
  count++;
  console.log('PKG-015 replaced');
}

fs.writeFileSync(prodPath, prod, 'utf-8');
console.log(`products.ts: ${count}/3 replaced`);

// ========== 2. blog-posts.ts: excerpt intuan ==========
console.log('\n=== blog-posts.ts ===');
const blogPath = 'F:/zprintpro-nextjs/src/data/blog-posts.ts';
let blog = fs.readFileSync(blogPath, 'utf-8');

// Comment lines
blog = blog.replace('// 2026-07-21 v7 daily-content-evolve: Q-004 apparel shopping bag — paper-bags × 服裝 (Tier A) — 純文字・v7 報價型 (5 檔 intuan 校準錨點)', '// 2026-07-21 v7 daily-content-evolve: Q-004 apparel shopping bag — paper-bags × 服裝 (Tier A) — 純文字・v7 報價型 (5 檔實價)');
blog = blog.replace('// 2026-07-23 v7 daily-content-evolve: Q-GR-01 香港拼版彩盒指南 (K3 7/23 插队 priority_boost=3) — packaging × 零售精品 (Tier A) — 純文字・v7 報價型 (5 檔 intuan 校準錨點)', '// 2026-07-23 v7 daily-content-evolve: Q-GR-01 香港拼版彩盒指南 (K3 7/23 插队 priority_boost=3) — packaging × 零售精品 (Tier A) — 純文字・v7 報價型 (5 檔實價)');

// Excerpt replacements
let bc = 0;
const bexcerpts = [
  ['5 檔 intuan 校準錨點 (HKD 811-4,202) 實價', '5 檔實價 (HK$811-4,202)'],
  ['5-tier intuan calibrated anchors (USD 106-546)', '5-tier pricing (USD $106-546)'],
  ['5 段階 intuan 校正アンカー (JPY 16,628-86,141) 実価格', '5 段階実価格 (¥16,628-86,141)'],
  ['5 檔 intuan 校準錨點 (HK$129-2,379) 實價', '5 檔實價 (HK$129-2,379)'],
  ['5-tier intuan calibrated anchors (USD 25-461)', '5-tier pricing (USD $25-461)'],
  ['5 段階 intuan 校正アンカー (¥3,800-69,150) 実価格', '5 段階実価格 (¥3,800-69,150)'],
];
bexcerpts.forEach(([from, to]) => {
  if (blog.includes(from)) {
    blog = blog.replace(from, to);
    bc++;
  }
});

fs.writeFileSync(blogPath, blog, 'utf-8');
console.log(`blog-posts.ts: ${bc} excerpt + 2 comments replaced`);

// ========== 3. page.tsx: description intuan ==========
console.log('\n=== page.tsx ===');
const pagePath = 'F:/zprintpro-nextjs/src/app/[locale]/blog/[slug]/page.tsx';
let page = fs.readFileSync(pagePath, 'utf-8');

// Comments
page = page.replace('// 2026-07-21 v7 daily-content-evolve: Q-004 apparel shopping bag — paper-bags × 服裝 (Tier A) — 純文字・v7 報價型 (5 檔 intuan 校準錨點)', '// 2026-07-21 v7 daily-content-evolve: Q-004 apparel shopping bag — paper-bags × 服裝 (Tier A) — 純文字・v7 報價型 (5 檔實價)');

let pc = 0;
const pdescs = [
  ['5 檔 intuan 校準錨點實價', '5 檔實價'],
  ['5-tier intuan calibrated anchors,', '5-tier pricing,'],  // en locale gang-run
  ['5 段階 intuan 校正アンカー実価格', '5 段階実価格'],
];
pdescs.forEach(([from, to]) => {
  let before = page;
  page = page.replace(from, to);
  if (page !== before) pc++;
});

fs.writeFileSync(pagePath, page, 'utf-8');
console.log(`page.tsx: ${pc} description + 1 comment replaced`);

// ========== 4. Verify zero intuan in customer-facing files ==========
console.log('\n=== Grep verification ===');
const checkFiles = [prodPath, blogPath, pagePath];
checkFiles.forEach(fp => {
  const content = fs.readFileSync(fp, 'utf-8');
  const hits = content.split('\n').filter(l => l.includes('intuan'));
  console.log(`${path.basename(fp)}: ${hits.length} intuan hits (should be 0)`);
  if (hits.length > 0) hits.forEach(l => console.log('  ' + l.trim().slice(0, 120)));
});

console.log('\n=== Done ===');
