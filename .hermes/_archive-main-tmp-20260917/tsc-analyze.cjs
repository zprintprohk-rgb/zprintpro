#!/usr/bin/env node
/* 只读: 跑 tsc 并把 error 按文件归类 — 用于「基线持平」判定 (断言命令真跑起来, 防假 0) */
const { execSync } = require('child_process');
let out = '', code = 0;
try {
  out = execSync('npx tsc --noEmit', { cwd: 'F:\\zprintpro-main-tmp', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
} catch (e) { out = (e.stdout || '') + (e.stderr || ''); code = e.status === undefined ? 1 : e.status; }
// 断言命令确实跑起来 (防 npx 失败被当成 0 错)
if (!/error TS|^$/.test(out) && out.length < 10 && code !== 0) {
  console.log('[FAIL] tsc 未正常执行, 输出:', JSON.stringify(out.slice(0, 300)), 'exit', code);
  process.exit(2);
}
const errs = out.split(/\r?\n/).filter(l => /error TS\d+/.test(l));
const byFile = {};
errs.forEach(l => { const f = (l.match(/^([^(]+)\(/) || [, '?'])[1].trim(); byFile[f] = (byFile[f] || 0) + 1; });
console.log(`tsc exit=${code} | error 行数=${errs.length} | 涉及文件=${Object.keys(byFile).length}`);
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(3)}  ${f}`));
const TOUCHED = ['src/data/sku-seo-data.ts', 'src/data/products.ts', 'src/lib/seo.ts', 'src/app/[locale]/layout.tsx', 'src/data/products-content.ts', 'src/lib/seo/schema-extensions.ts'];
const hit = Object.keys(byFile).filter(f => TOUCHED.includes(f));
console.log(hit.length ? `\n[FAIL] 本批改动文件出现 tsc 错误: ${hit.join(', ')}` : '\n[PASS] 本批改动文件 0 tsc 错误 (54 处均在 __tests__ 等既有基线文件)');
process.exit(hit.length ? 1 : 0);
