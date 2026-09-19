'use strict';
/**
 * 裁决 1 (§B) v2: 反查 src/lib/price-data.generated.ts 的**三语 label 集**
 * (生成档 DO NOT EDIT ⇒ 本脚本**只读**, 用于「重出术语清单」; 若需改动则回源头 JSON + 重跑生成器)
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = path.join(REPO, 'src', 'lib', 'price-data.generated.ts');
const raw = fs.readFileSync(F, 'utf8');

// 抽取所有 "label": { ... } 块
const blocks = [...raw.matchAll(/"label":\s*\{([\s\S]*?)\n\s*\}/g)].map(m => m[1]);
console.log(`label 块: ${blocks.length}`);

const triples = [];
for (const b of blocks) {
  const g = (k) => {
    const m = b.match(new RegExp('"' + k + '":\\s*"([\\s\\S]*?)"\\s*(?:,|$)'));
    return m ? m[1] : '';
  };
  const zh = g('zh-hk') || g('zh');
  const en = g('en');
  const ja = g('ja');
  if (zh || en || ja) triples.push({ zh, en, ja });
}
console.log(`三语 label 三元组: ${triples.length}`);

// 去重
const uniq = [];
const seen = new Set();
for (const t of triples) { const k = t.zh + '|' + t.en + '|' + t.ja; if (!seen.has(k)) { seen.add(k); uniq.push(t); } }
console.log(`去重后: ${uniq.length}\n`);

// 行业核心术语
const CORE = ['起印', '起訂', '起订', '階梯', '阶梯', '開版', '开版', '版費', '版费', '最低', '單價', '单价', '報價', '报价', 'MOQ', '版代', '製版', '制版', '割引', 'ロット', '数量', '數量', '重量', '交期', '納期', '工藝', '工艺', '加工'];
console.log('=== ① 含行业核心术语的三语 label ===');
let n1 = 0;
for (const t of uniq) {
  const hit = CORE.filter(k => (t.zh || '').includes(k) || (t.ja || '').includes(k) || (t.en || '').includes(k));
  if (!hit.length) continue;
  n1++;
  if (n1 <= 20) {
    console.log(`  [${hit.join(',')}]`);
    console.log(`    zh: ${t.zh.slice(0, 120)}`);
    console.log(`    en: ${t.en.slice(0, 120)}`);
    console.log(`    ja: ${t.ja.slice(0, 120)}`);
  }
}
console.log(`  合计 ${n1} 条`);

// ② 术语选型判断候选: zh 含中文, en/ja 非字面直译 (启发式)
console.log('\n=== ② 术语选型候选 (含中文 + 短 en, top 20) ===');
const cand = uniq.filter(t => /[\u4e00-\u9fff]/.test(t.zh) && t.en && t.ja)
  .map(t => {
    const zhLen = (t.zh.match(/[\u4e00-\u9fff]/g) || []).length;
    return { ...t, zhLen, ratio: zhLen ? t.en.length / (zhLen * 3) : 9 };
  })
  .filter(t => t.zhLen >= 2 && t.zhLen <= 12)
  .sort((a, b) => a.ratio - b.ratio);
cand.slice(0, 20).forEach(t => {
  console.log(`  (${t.zhLen}字) zh=${JSON.stringify(t.zh)}`);
  console.log(`          en=${JSON.stringify(t.en)}  ja=${JSON.stringify(t.ja)}`);
});

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-price-labels.json'),
  JSON.stringify({ total: triples.length, unique: uniq.length, coreHits: n1, candidates: cand.slice(0, 40) }, null, 2), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/stepB2-price-labels.json');
