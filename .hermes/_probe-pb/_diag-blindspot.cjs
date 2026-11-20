'use strict';
/** 诊断: 为什么我的 title 注入样本没被门童 #16 抓到 (纯内存, 不写生产档) */
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const LEAK = '数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)';

const samples = {
  "title 双引号": `export const x = {\n  a: { 'en': { title: "${LEAK}" } },\n};\n`,
  "title 单引号": `export const x = {\n  a: { 'en': { title: '${LEAK}' } },\n};\n`,
  "title 顶格": `title: "${LEAK}"\n`,
  "title 顶格单引号": `title: '${LEAK}'\n`,
};

const singleLineRe = /(?:^|\n)\s*(?:title|description|excerpt|keywords)\s*[:=]\s*['"]([^'"]{20,})['"],?/g;

for (const [name, s] of Object.entries(samples)) {
  singleLineRe.lastIndex = 0;
  const ms = [];
  let m;
  while ((m = singleLineRe.exec(s)) !== null) ms.push(m[1].length);
  console.log(`${name}: singleLineRe 命中 ${ms.length} 次, 捕获长度 ${JSON.stringify(ms)}`);
}

// 直接调 guard 的正则与豁免判断
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
console.log('\n--- 逐条正则直测 LEAK ---');
guard.GSC_LEAK_PATTERNS.forEach((re, i) => {
  re.lastIndex = 0;
  const m = re.exec(LEAK);
  console.log(`  [${i}] ${re.source.slice(0, 46)} => ${m ? JSON.stringify(m[0]) : '-'}`);
});

// 检查豁免逻辑是否把整串判为合法语境
const ctx = LEAK.slice(0, 80);
console.log('\n--- 豁免检查 ---');
console.log('  该串是否被 isLegitCustomerToken 判为合法:', /pos(?:ition|e|itive)/gi.test(LEAK) ? 'pos 记法会命中豁免!' : '否');
const posRe = /pos(?:ition|e|itive)/gi;
console.log('  /pos(?:ition|e|itive)/gi 对 LEAK 的 test:', posRe.test(LEAK));
const imps = /Impress(?:ion|ions)?(?!s?\s*\d)/gi;
console.log('  Impression 豁免 test:', imps.test(LEAK));
const k3w = /K1-K3/gi;
console.log('  K1-K3 豁免 test:', k3w.test(LEAK));
