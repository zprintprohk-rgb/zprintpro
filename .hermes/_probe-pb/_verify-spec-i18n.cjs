'use strict';
/** 校驗: product-specs-i18n.ts 對門童 #4 三向判據必須 0 命中 + en 值 0 CJK + 223 條 key 全覆蓋 products.ts 原文 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));

const P = path.join(ROOT, 'src', 'data', 'product-specs-i18n.ts');
const content = fs.readFileSync(P, 'utf8');

// 1) 門童 #4 雙向掃描 (locale 作用域 = 值)
const hits = guard.scanBidirectional(content, P);
console.log('门童 #4 双向扫描 (本档): ' + hits.length + ' 命中');
hits.slice(0, 10).forEach(h => console.log('   ' + JSON.stringify(h)));

// 2) 逐條解析 + 形狀檢查
const RE = /^  "((?:[^"\\]|\\.)*)": \{ 'zh-hk': "((?:[^"\\]|\\.)*)", en: "((?:[^"\\]|\\.)*)", ja: "((?:[^"\\]|\\.)*)" \},$/;
const entries = [];
for (const line of content.split('\n')) {
  const m = line.match(RE);
  if (m) entries.push({ key: JSON.parse('"' + m[1] + '"'), zh: JSON.parse('"' + m[2] + '"'), en: JSON.parse('"' + m[3] + '"'), ja: JSON.parse('"' + m[4] + '"') });
}
const dump = require(path.join(ROOT, '.hermes', '_probe-pb', '_spec-strings-full.json'));
const dumpSet = new Set(dump.map(o => o.v));
const keySet = new Set(entries.map(e => e.key));

const SIMP = new Set(guard.SIMP_ZH.split(''));
const SIMP_JA = new Set(guard.SIMP_JA.split(''));
const CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const bad = [];
for (const e of entries) {
  if (CJK.test(e.en)) bad.push('en 含 CJK: ' + e.key);
  if ([...e.zh].some(c => SIMP.has(c))) bad.push('zh-hk 含簡體字形: ' + e.key);
  if ([...e.ja].some(c => SIMP_JA.has(c))) bad.push('ja 含簡體字形: ' + e.key);
  if (e.zh !== e.key) bad.push('zh-hk ≠ 原文: ' + e.key);
}
const missing = [...dumpSet].filter(k => !keySet.has(k));
const extra = [...keySet].filter(k => !dumpSet.has(k));
const dup = entries.length !== keySet.size;

console.log('解析條目數: ' + entries.length + ' (products.ts 唯一原文 ' + dumpSet.size + ')');
console.log('未覆蓋原文: ' + missing.length + (missing.length ? ' -> ' + missing.slice(0, 5).join(' | ') : ''));
console.log('多餘 key: ' + extra.length + (extra.length ? ' -> ' + extra.slice(0, 5).join(' | ') : ''));
console.log('重複 key: ' + dup);
console.log('逐條字集/形狀問題: ' + bad.length);
bad.slice(0, 10).forEach(b => console.log('   ' + b));
const nEn = entries.filter(e => e.en).length, nJa = entries.filter(e => e.ja).length;
console.log('en 非空: ' + nEn + ' / ja 非空: ' + nJa);
const ok = hits.length === 0 && !missing.length && !extra.length && !dup && !bad.length && nEn === dumpSet.size && nJa === dumpSet.size;
console.log(ok ? '\n✅ 全數通過 (' + dumpSet.size + ' 條 0 命中 / 全覆蓋 / 三語齊備)' : '\n❌ 未通過');
process.exit(ok ? 0 : 1);
