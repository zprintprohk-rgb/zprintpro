'use strict';
/** Step B-2b: 量化「未覆盖档 / 双引号值」中的真实 GSC 泄漏 (决定补面范围, 不猜) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const dataDir = path.join(REPO, 'src', 'data');

// 用 guard 导出的正则 (含豁免判定不便直接调, 这里做原始命中统计, 再人工核)
function rawHits(text) {
  const out = [];
  for (const re of guard.GSC_LEAK_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      out.push(m[0]);
      if (out.length > 200) return out;
    }
  }
  return out;
}

const TARGETS = [
  'products-content.ts',          // 1,195 KB 未覆盖
  'sku-seo-data.ts',              // 1,138 KB 未覆盖, 全双引号
  'category-conversion-blocks.ts',// 182 KB 未覆盖
  'product-specs-i18n.ts',        // 73 KB 未覆盖
  'product-faqs.ts',              // 59 KB 未覆盖
  'cluster-content.ts',           // 16 KB 未覆盖
  'product-seo.ts',               // 11 KB 未覆盖
  'industry-scenario-links.ts',   // 16 KB 未覆盖
  'breadcrumb-names.ts',          // 11 KB 未覆盖
  'image-alt-map.ts',             // 5 KB 未覆盖
  'blog-posts.ts',                // 覆盖但双引号失效
];

console.log('=== 未覆盖/双引号档 GSC 黑话原始命中统计 ===\n');
const summary = [];
for (const f of TARGETS) {
  const p = path.join(dataDir, f);
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  const hits = rawHits(t);
  const uniq = [...new Set(hits)];
  summary.push({ f, n: hits.length, uniq });
  console.log(`${f.padEnd(30)} 原始命中 ${String(hits.length).padStart(4)} | 去重 ${uniq.length}`);
  if (uniq.length) console.log(`   tokens: ${JSON.stringify(uniq.slice(0, 12))}`);
}

console.log('\n=== 关键定性: 这些命中是「真泄漏」还是「注释/技术标识」 ===');
// 逐档判断命中是否落在注释行
for (const { f, n } of summary) {
  if (!n) continue;
  const p = path.join(dataDir, f);
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  let inComment = 0, inCode = 0;
  lines.forEach(L => {
    const trimmed = L.trim();
    const has = rawHits(L).length > 0;
    if (!has) return;
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) inComment++;
    else inCode++;
  });
  console.log(`  ${f.padEnd(30)} 注释行内 ${String(inComment).padStart(3)} | 代码行内 ${String(inCode).padStart(3)}  <-- 代码行内=客户可见风险`);
}
