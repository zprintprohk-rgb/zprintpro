'use strict';
/**
 * 裁决 1 (§B) v3: 从价格 label 三语行中**抽取术语配对** (非整行), 产出母语复核清单
 * 手法: 以分隔符 [,，\-\[\]()] 切分三语行 -> 逐段对齐 -> 抽取「非字面直译」候选
 * 只读。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const data = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-price-labels.json'), 'utf8'));
const all = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-price-labels.json'), 'utf8'));

// 重新从生成档取全量三元组
const raw = fs.readFileSync(path.join(REPO, 'src', 'lib', 'price-data.generated.ts'), 'utf8');
const blocks = [...raw.matchAll(/"label":\s*\{([\s\S]*?)\n\s*\}/g)].map(m => m[1]);
const triples = [];
for (const b of blocks) {
  const g = (k) => { const m = b.match(new RegExp('"' + k + '":\\s*"([\\s\\S]*?)"\\s*(?:,|$)')); return m ? m[1] : ''; };
  const t = { zh: g('zh-hk') || g('zh'), en: g('en'), ja: g('ja') };
  if (t.zh || t.en || t.ja) triples.push(t);
}
const uniq = [];
const seen = new Set();
for (const t of triples) { const k = t.zh + '|' + t.en + '|' + t.ja; if (!seen.has(k)) { seen.add(k); uniq.push(t); } }

const SPLIT = /[,\uFF0C\-\[\]()\uFF08\uFF09\/]+/;
const norm = (s) => s.trim().replace(/\s+/g, ' ');

// 候选术语: 从 zh 中找含「摺/折/裝/胶/膠/膜/扣/盒/釘/钉」等工艺术语的短段, 与 en/ja 对应段配对
const ART = /[摺折裝胶膠膜扣盒釘钉壓压凹凸燙烫樽袋頁页開开切騎骑線线圈孔位版紙纸]/;
const pairs = new Map();
for (const t of uniq) {
  const zs = t.zh.split(SPLIT).map(norm).filter(Boolean);
  const es = t.en.split(SPLIT).map(norm).filter(Boolean);
  const js = t.ja.split(SPLIT).map(norm).filter(Boolean);
  // zh 段里含工艺术语且长度 2-10 的
  zs.forEach((z, i) => {
    if (z.length < 2 || z.length > 12) return;
    if (!ART.test(z)) return;
    if (/^[\dXx×\s.g克]+$/.test(z)) return;
    const e = es[i] || '';
    const j = js[i] || '';
    if (!e && !j) return;
    const key = z;
    if (!pairs.has(key)) pairs.set(key, { zh: z, en: e, ja: j, n: 0 });
    pairs.get(key).n++;
    // 优先保留同时有 en+ja 的样例
    if (!pairs.get(key).en && e) pairs.get(key).en = e;
    if (!pairs.get(key).ja && j) pairs.get(key).ja = j;
  });
}

const list = [...pairs.values()].filter(p => p.en || p.ja).sort((a, b) => b.n - a.n);
console.log(`=== §B 价格 label 工艺术语配对 (${list.length} 条) ===\n`);
console.log('zh'.padEnd(18) + 'en'.padEnd(40) + 'ja');
console.log('-'.repeat(100));
list.forEach(p => console.log(`${p.zh}`.padEnd(18) + `${p.en.slice(0, 38)}`.padEnd(40) + `${p.ja}`));

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-price-term-pairs.json'), JSON.stringify(list, null, 2), 'utf8');
console.log(`\n落盘: .hermes/_probe-pb/stepB2-price-term-pairs.json (${list.length} 条)`);
