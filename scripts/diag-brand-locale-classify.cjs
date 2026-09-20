// 分诊 2: BRAND_LOCALE_MISMATCH 全量明细按「文件 × 命中形态」归类
// 目的: 找出哪些是真错配、哪些是工具/口径问题 (只读, 不改任何文件)
// 用法: node scripts/diag-brand-locale-classify.cjs [scopeDir=src] [--all]
const fs = require('node:fs');
const common = require('./guards/common.js');
const brand = require('./guards/brand-guard.js');

const scope = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'src';
const files = common.collectFiles(scope, false);

(async () => {
  const hits = await brand.scan(files);
  const mm = hits.filter((h) => h.ruleId === 'BRAND_LOCALE_MISMATCH');
  console.log(`范围 ${scope}/ 文件 ${files.length} 个 · BRAND_LOCALE_MISMATCH 明细 ${mm.length} 条`);

  // 真实计数 (未截断)
  try {
    const st = common.getScanStats ? common.getScanStats() : null;
    if (st) {
      const line = (Array.isArray(st) ? st : Object.values(st))
        .filter((s) => s.ruleId === 'BRAND_LOCALE_MISMATCH' || s.id === 'BRAND_LOCALE_MISMATCH');
      if (line.length) console.log('门童内部未截断真值: ' + JSON.stringify(line[0]));
    }
  } catch (e) { /* 辅助信息 */ }

  // 按文件聚合
  const byFile = new Map();
  for (const h of mm) {
    if (!byFile.has(h.file)) byFile.set(h.file, []);
    byFile.get(h.file).push(h);
  }

  // 命中形态判定 (读取命中行, 分类)
  const buckets = { 'faq-answer-shared': [], 'seo-zh-hk-subfield': [], 'title-field': [], 'app-page-locale-ternary': [], 'other': [] };
  for (const [file, hs] of byFile) {
    let lines = [];
    try { lines = fs.readFileSync(file, 'utf8').split('\n'); } catch (e) { continue; }
    for (const h of hs) {
      const ln = lines[h.line - 1] || '';
      let key = 'other';
      if (/"a"\s*:/.test(ln) && /智印港|ジープリント/.test(ln)) key = 'faq-answer-shared';
      else if (/src\/app\//.test(file) && /locale\s*===|locale\s*==/.test(ln)) key = 'app-page-locale-ternary';
      else if (/"(title|h1|seoTitle|metaTitle|title_zh)"/.test(ln)) key = 'title-field';
      else if (/src\/data\//.test(file)) key = 'seo-zh-hk-subfield';
      buckets[key].push({ file, line: h.line, match: h.match, ln: ln.trim().slice(0, 110) });
    }
  }

  for (const [k, arr] of Object.entries(buckets)) {
    console.log(`\n═══ ${k}: ${arr.length} 条 ═══`);
    const filesAgg = new Map();
    for (const a of arr) filesAgg.set(a.file, (filesAgg.get(a.file) || 0) + 1);
    console.log('  文件分布: ' + [...filesAgg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([f, n]) => `${f}(${n})`).join('  '));
    for (const a of arr.slice(0, 6)) console.log(`    ${a.file}:${a.line}  ${a.match}\n        ${a.ln}`);
  }

  console.log('\n⚠️ 只读分诊: 不修改任何文件。分类依据 = 命中行文本形态, 仅供定位; 落地前须逐条人读 (避坑 13)。');
})().catch((e) => { console.error('🔴 异常:', e.message); process.exit(1); });
