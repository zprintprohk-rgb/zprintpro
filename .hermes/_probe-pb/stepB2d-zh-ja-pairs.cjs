'use strict';
/**
 * 裁决 1 (§B) v4: 只用 **zh ↔ ja** 配对 (同一 label 行内标注, 位置可靠)
 * 理由: en 段以 `-`/`,` 切分, 与 zh 的 `,`/【】切分口径不同 ⇒ 位置对齐错位 (v3 教训)
 * 产出: 供日语母语者复核的「中文术语 → 日文已上线译法」清单
 * 只读。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const raw = fs.readFileSync(path.join(REPO, 'src', 'lib', 'price-data.generated.ts'), 'utf8');
const blocks = [...raw.matchAll(/"label":\s*\{([\s\S]*?)\n\s*\}/g)].map(m => m[1]);

const triples = [];
for (const b of blocks) {
  const g = (k) => { const m = b.match(new RegExp('"' + k + '":\\s*"([\\s\\S]*?)"\\s*(?:,|$)')); return m ? m[1] : ''; };
  const t = { zh: g('zh-hk') || g('zh'), en: g('en'), ja: g('ja') };
  if (t.zh && t.ja) triples.push(t);
}
const uniq = [];
const seen = new Set();
for (const t of triples) { const k = t.zh + '|' + t.ja; if (!seen.has(k)) { seen.add(k); uniq.push(t); } }
console.log(`zh+ja 成对的行: ${uniq.length}\n`);

/** 抽取 zh/ja 行中的「工艺段」: 用 , 与 【】 切分 (中日常用同样标点) */
const SEG = /[,\uFF0C\u3010\u3011\[\]()\uFF08\uFF09]+/;
const norm = (s) => s.trim();
const ART = /[摺折裝胶膠膜扣盒釘钉壓压凹凸燙烫袋頁页開开切騎骑線线圈孔位紙纸標标簽签]/;

const pairs = new Map();
for (const t of uniq) {
  const zs = t.zh.split(SEG).map(norm).filter(Boolean);
  const js = t.ja.split(SEG).map(norm).filter(Boolean);
  // 只取**同下标**且两侧都像术语段 (短) 的
  const n = Math.min(zs.length, js.length);
  for (let i = 0; i < n; i++) {
    const z = zs[i], j = js[i];
    if (z.length < 2 || z.length > 14) continue;
    if (j.length < 1 || j.length > 20) continue;
    if (!ART.test(z) && !ART.test(j)) continue;
    if (/^[\dXx×\s.g克]+$/.test(z)) continue;                 // 纯数字段
    if (/^[\dXx×\s.g]+$/.test(j)) continue;
    if (z === j) continue;                                     // 完全相同 = 无翻译需求
    // 形状守卫 (v4.2):
    //  ① 数字结构一致 (一侧有数字另一侧没有 ⇒ 错位)
    //  ② 两侧都有数字时, 数字须相同 (如 350g↔350g, 2摺3頁↔2折り3ページ)
    //  ③ 长度带: |len(z) - len(j)| <= 8 (防「卷裝」↔「巻芯径4cm」这类长度悬殊的错位)
    //  ⚠️ 不用「共享 CJK 字符」作判据 —— 意译对 (覆膜↔ラミネート) 无共享字但正确 (v4.1 教训)
    const nums = (s) => (s.match(/\d+(?:\.\d+)?/g) || []).join(',');
    if (nums(z) !== nums(j)) continue;
    if (Math.abs(z.length - j.length) > 8) continue;
    const k = z + '||' + j;
    if (!pairs.has(k)) pairs.set(k, { zh: z, ja: j, n: 0, samples: [] });
    const p = pairs.get(k);
    p.n++;
    if (p.samples.length < 1) p.samples.push(`${t.zh.slice(0, 70)} → ${t.ja.slice(0, 70)}`);
  }
}

const list = [...pairs.values()].sort((a, b) => b.n - a.n);
console.log(`=== §B 价格 label 中↔日 工艺术语对 (${list.length} 条) ===\n`);
console.log('中文术语'.padEnd(20) + '日文已上线'.padEnd(26) + '出现');
console.log('-'.repeat(74));
list.forEach(p => console.log(`${p.zh}`.padEnd(20) + `${p.ja}`.padEnd(26) + p.n));
console.log('-'.repeat(74));

fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-zh-ja-pairs.json'), JSON.stringify(list, null, 2), 'utf8');
console.log(`\n落盘: .hermes/_probe-pb/stepB2-zh-ja-pairs.json (${list.length} 条)`);
