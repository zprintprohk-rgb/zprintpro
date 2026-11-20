'use strict';
/**
 * 交付層獨立複核 Step 4 (不採信專項單元自檢)
 * 核心風險: ① zh-hk 渲染輸出不許變 (聲稱 zh-hk 值 = 原文逐字)
 *          ② 新檔不得把中文塞進 en/ja 值 (否則等於製造新污染)
 *          ③ 映射覆蓋率 (聲稱 238 條三語齊)
 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\';
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const KANA = /[\u3040-\u30ff]/;

const mapSrc = fs.readFileSync(P + 'src/data/product-specs-i18n.ts', 'utf8');
// 抽映射條目 (實際格式: "原文": { 'zh-hk': "…", en: "…", ja: "…" })
const entries = [...mapSrc.matchAll(/"((?:[^"\\]|\\.)*)":\s*\{\s*'zh-hk':\s*"((?:[^"\\]|\\.)*)",\s*en:\s*"((?:[^"\\]|\\.)*)",\s*ja:\s*"((?:[^"\\]|\\.)*)"\s*\}/g)]
  .map(m => ({ src: m[1], zh: m[2], en: m[3], ja: m[4] }));

console.log('=== ① 映射條目解析 ===');
console.log('  條目數: ' + entries.length);

let zhDiff = 0, enCJK = 0, jaSimp = 0, jaNoKana = 0, empty = 0;
const enCJKSamples = [];
for (const e of entries) {
  if (!e.zh || !e.en || !e.ja) empty++;
  // zh-hk 必須 = 原文逐字 (零 churn 前提)
  if (e.zh !== e.src) { zhDiff++; if (zhDiff <= 5) console.log('   ★ zh-hk 與原文不一致: 「' + e.src.slice(0, 40) + '」→「' + e.zh.slice(0, 40) + '」'); }
  if (CJK.test(e.en)) { enCJK++; if (enCJKSamples.length < 5) enCJKSamples.push(e.en.slice(0, 50)); }
  if (CJK.test(e.ja) && !KANA.test(e.ja)) { jaNoKana++; if (jaNoKana <= 8) console.log('     ja 無假名樣本: «' + e.ja + '»  (zh-hk: ' + e.zh.slice(0, 30) + ')'); }
}
console.log('  zh-hk ≠ 原文 條數      : ' + zhDiff + (zhDiff === 0 ? ' ✅ (zh-hk 輸出零改動前提成立)' : ' ★'));
console.log('  en 值含 CJK 條數        : ' + enCJK + (enCJK === 0 ? ' ✅' : ' ★'));
enCJKSamples.forEach(s => console.log('     樣本: ' + s));
console.log('  ja 有漢字零假名 條數    : ' + jaNoKana + (jaNoKana === 0 ? ' ✅' : ' ★'));
console.log('  三語有空值 條數        : ' + empty + (empty === 0 ? ' ✅' : ' ★'));

/* 覆蓋率: products.ts 三欄實際值是否都在映射內 */
const prod = fs.readFileSync(P + 'src/data/products.ts', 'utf8');
const fields = ['material', 'printMethod', 'finishing'];
const vals = new Set();
for (const f of fields) {
  const re = new RegExp('(?:^|[\\s,{])' + f + ":\\s*(['\"`])([\\s\\S]*?)\\1", 'gm');
  let m; while ((m = re.exec(prod)) !== null) vals.add(m[2].trim());
}
const srcKeys = new Set(entries.map(e => e.src));
const missing = [...vals].filter(v => !srcKeys.has(v));
console.log('\n=== ② products.ts 三欄唯一值覆蓋率 ===');
console.log('  products.ts 唯一值: ' + vals.size + ' | 映射 keys: ' + srcKeys.size);
console.log('  ★ 未被映射覆蓋的值: ' + missing.length + (missing.length === 0 ? ' ✅' : ''));
missing.slice(0, 6).forEach(v => console.log('     ' + v.slice(0, 70)));
