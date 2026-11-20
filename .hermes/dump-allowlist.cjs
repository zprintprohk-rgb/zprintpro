#!/usr/bin/env node
/* 只读: 打印允许清单明细 (排除 products-content.ts 大件后逐条; 大件只给形态统计与样本) */
const fs = require('fs');
const A = JSON.parse(fs.readFileSync('F:\\zprintpro-nextjs\\.hermes\\dual-brand-allowlist.json', 'utf8'));
const big = A.allow.filter(x => x.file === 'src/data/products-content.ts');
const rest = A.allow.filter(x => x.file !== 'src/data/products-content.ts');
console.log(`=== 逐条 (${rest.length} 条, 不含 products-content.ts) ===`);
rest.forEach(x => console.log(`${x.file}:${x.line} [${x.form}] …${x.ctx}…`));
console.log(`\n=== products-content.ts (${big.length} 条): 形态 ${JSON.stringify(big.reduce((a, x) => (a[x.form] = (a[x.form] || 0) + 1, a), {}))} ===`);
big.slice(0, 8).forEach(x => console.log(`  :${x.line} [${x.form}] …${x.ctx}…`));
console.log('\n=== hold 明细 (title 面, 本批不动) ===');
A.hold.forEach(x => console.log(`${x.file}:${x.line} [${x.reason}] …${x.ctx}…`));
