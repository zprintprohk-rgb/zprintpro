'use strict';
/**
 * FSC 待提交集精确核对 (等 MOQ10 push 期间的前置准备)
 * 判据: ① 档清单 = 我的 20 档中「仍有未提交改动」者 ② 每行改动必须与 FSC 相关 (无 FSC 的行 = 他人内容, 需剔除)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const REPO = path.resolve(__dirname, '..', '..');

const MINE = [
  'src/data/blog-data/en.json', 'src/data/sku-seo-data.ts', 'src/data/category-seo-content.ts',
  'src/data/products-content.ts', 'src/lib/seo.ts', 'src/app/[locale]/services/catalog-printing-china/page.tsx',
  'src/app/[locale]/about/page.tsx', 'src/data/blog-posts.ts', 'src/data/category-conversion-blocks.ts',
  'src/data/buying-guides.ts', 'src/components/category/CategoryIndustries.tsx', 'src/components/ProductTabs.tsx',
  'src/data/case-studies/cover-industries-en.json', 'src/app/[locale]/blog/[slug]/page.tsx',
  'src/app/[locale]/service-areas/page.tsx', 'src/components/home/HeroBanner.tsx',
  'src/components/layout/FloatingQuoteCTA.tsx', 'src/data/pillar-content.ts', 'src/data/product-faqs.ts',
  'src/data/products.ts',
];

const status = execSync('git status --porcelain', { cwd: REPO, encoding: 'utf8' }).split('\n');
const dirty = new Set(status.filter(l => l.startsWith(' M') || l.startsWith('M ')).map(l => l.slice(3).trim()));

console.log('=== 我的 20 档当前状态 ===');
const needCommit = [];
for (const f of MINE) {
  const isDirty = dirty.has(f);
  // 该档是否已被他人 commit 带走 (与 origin/main 比较是否有 FSC 改动)
  console.log(`  ${isDirty ? '未提交' : '已提交/无改动'}  ${f}`);
  if (isDirty) needCommit.push(f);
}
console.log(`\n待我提交: ${needCommit.length} 档`);
console.log(`已被他人 commit 带走: ${MINE.length - needCommit.length} 档`);

console.log('\n=== 逐档核对: 未提交改动的行是否全为 FSC 相关 ===');
let suspicious = 0;
for (const f of needCommit) {
  let d = '';
  try { d = execSync(`git diff -- "${f}"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }); } catch (e) { console.log(`  (diff 失败 ${f})`); continue; }
  const lines = d.split('\n').filter(l => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'));
  const nonFsc = lines.filter(l => !/FSC/.test(l));
  if (nonFsc.length) {
    suspicious += nonFsc.length;
    console.log(`  ⚠️ ${f}: 共 ${lines.length} 行改动, 其中 ${nonFsc.length} 行与 FSC 无关`);
    nonFsc.slice(0, 3).forEach(l => console.log(`       ${l.slice(0, 130)}`));
  } else {
    console.log(`  ✅ ${f}: ${lines.length} 行, 全部含 FSC`);
  }
}
console.log(`\n结论: ${suspicious ? '⚠️ 有 ' + suspicious + ' 行疑似他人内容, 提交前需剔除' : '✅ 全部为 FSC 改动, 可安全逐档 add'}`);
