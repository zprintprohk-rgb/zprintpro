'use strict';
/**
 * 裁决 1 (§B): 从**价格数据源头** src/data/price-tables/*.json 反查重出
 * 「三语译法非 1:1 字典对应」的价格术语 (K3 风险提示: 优先含「起印」「階梯價」「開版費」者)
 * 只读。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const DIR = path.join(REPO, 'src', 'data', 'price-tables');

const CORE = ['起印', '起訂', '起订', '階梯', '阶梯', '開版', '开版', '版費', '版费', '最低', '單價', '单价', '報價', '报价', 'MOQ', '割引', '割引', 'ロット', '版代', '製版', '制版', '階層', '段階'];

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
console.log(`价格源文件: ${files.length} 个\n`);

/** 深度遍历, 收集所有 {zh-hk, en, ja} 三元组 (或含其中 2 者) */
function collect(node, out, keyPath) {
  if (node == null) return;
  if (typeof node === 'object') {
    const zh = node['zh-hk'] ?? node['zh'];
    const en = node.en;
    const ja = node.ja;
    if (typeof zh === 'string' || typeof en === 'string' || typeof ja === 'string') {
      out.push({ key: keyPath, zh: zh || '', en: en || '', ja: ja || '' });
      return;
    }
    for (const [k, v] of Object.entries(node)) collect(v, out, keyPath ? keyPath + '.' + k : k);
  }
}

const all = [];
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const out = [];
  collect(j, out, '');
  out.forEach(o => { o.file = f; });
  all.push(...out);
}
console.log(`三语三元组: ${all.length} 条`);

// ① 含行业核心术语者
const coreHits = all.filter(o => CORE.some(k => (o.zh || '').includes(k) || (o.en || '').includes(k) || (o.ja || '').includes(k)));
console.log(`\n=== ① 含行业核心术语者: ${coreHits.length} 条 (去重后展示) ===`);
const seenCore = new Set();
coreHits.forEach(o => {
  const sig = o.zh.slice(0, 40);
  if (seenCore.has(sig)) return;
  seenCore.add(sig);
  const hit = CORE.filter(k => (o.zh || '').includes(k) || (o.ja || '').includes(k) || (o.en || '').includes(k));
  console.log(`  [${hit.join(',')}] ${o.file}`);
  console.log(`    zh: ${o.zh.slice(0, 110)}`);
  console.log(`    en: ${o.en.slice(0, 110)}`);
  console.log(`    ja: ${o.ja.slice(0, 110)}`);
});

// ② 非 1:1 直译候选: 含汉字但 en/ja 明显不是字面逐字对应 (启发式: zh 含中文 且 en 长度显著短于 zh 的字符数×3)
console.log('\n=== ② 非字面直译候选 (启发式, top 25) ===');
const cand = all.filter(o => /[\u4e00-\u9fff]/.test(o.zh) && o.en && o.ja)
  .map(o => {
    const zhLen = (o.zh.match(/[\u4e00-\u9fff]/g) || []).length;
    const ratio = zhLen ? o.en.length / (zhLen * 3) : 1;
    return { ...o, zhLen, ratio };
  })
  .filter(o => o.zhLen >= 3)
  .sort((a, b) => a.ratio - b.ratio);
cand.slice(0, 25).forEach(o => {
  console.log(`  (${o.zhLen}字, ratio ${o.ratio.toFixed(2)}) ${o.file}`);
  console.log(`    zh: ${o.zh.slice(0, 95)}`);
  console.log(`    en: ${o.en.slice(0, 95)}`);
  console.log(`    ja: ${o.ja.slice(0, 95)}`);
});

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-price-terms.json'),
  JSON.stringify({ totalTriples: all.length, coreHits: coreHits.length, candidates: cand.slice(0, 60) }, null, 2), 'utf8');
console.log('\n落盘: .hermes/_probe-pb/stepB2-price-terms.json');
