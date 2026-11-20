'use strict';
/** 波 1 前置: 取 B-1(16) + B-2(4) + B-3(3) + B-4(1) 的**精确原文串** (只读, 不猜) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const TARGETS = [
  // [术语, 文件]
  ['輸入六色印刷設備', 'src/data/buying-guides.ts'],
  ['批量以上', 'src/data/buying-guides.ts'],
  ['月最後黃金窗', 'src/app/[locale]/category/[slug]/page.tsx'],
  ['月前就位', 'src/app/[locale]/category/[slug]/page.tsx'],
  ['认证体系', 'src/data/blog-posts.ts'],
  ['餐牌', 'src/data/blog-data/en.json'],
  ['騎馬釘', 'src/data/blog-data/en.json'],
  ['核心頁', 'src/data/blog-data/en.json'],
  ['坑紙', 'src/data/blog-data/en.json'],
  ['衍生', 'src/data/blog-data/en.json'],
  ['紅包', 'src/data/blog-data/en.json'],
  ['中綴', 'src/data/blog-data/en.json'],
  ['细分', 'src/data/blog-data/en.json'],
  ['满足', 'src/data/blog-data/en.json'],
  ['镂空', 'src/data/category-seo-content.ts'],
  ['離島', 'src/data/category-seo-content.ts'],
  ['燙金名片', 'src/data/sku-seo-data.ts'],
  ['名片', 'src/data/sku-seo-data.ts'],
  ['厚口', 'src/data/sku-seo-data.ts'],
  ['箔押', 'src/data/sku-seo-data.ts'],
  ['答案', 'src/data/blog-data/en.json'],
  ['万邑通', 'src/data/blog-data/en.json'],
];

for (const [term, rel] of TARGETS) {
  const p = path.join(REPO, rel);
  if (!fs.existsSync(p)) { console.log(`\n### 「${term}」 (缺档 ${rel})`); continue; }
  const raw = fs.readFileSync(p, 'utf8');
  const lines = raw.split('\n');
  console.log(`\n${'#'.repeat(76)}\n### 「${term}」  ${rel}\n${'#'.repeat(76)}`);
  let i = -1, n = 0;
  while ((i = raw.indexOf(term, i + 1)) !== -1 && n < 6) {
    n++;
    const lineNo = raw.slice(0, i).split('\n').length;
    const line = lines[lineNo - 1] || '';
    const inComment = /^\s*(\/\/|\*|\/\*)/.test(line);
    console.log(`\n  [${n}] L${lineNo}${inComment ? ' 【注释行】' : ''}  len=${line.length}`);
    console.log(`      …${JSON.stringify(line.slice(Math.max(0, line.indexOf(term) - 150), line.indexOf(term) + term.length + 150))}…`);
  }
  const total = raw.split(term).length - 1;
  console.log(`  → 全文出现 ${total} 次`);
}
