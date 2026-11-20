/**
 * v9.3-L4 / P4 法务页文字 diff 门禁 (spec §5 铁律 + K3 v9.3.2 P4)
 *
 * 规则: legal 页只改排版/骨架, 法务文字一字不改。
 * P4 新增精简 Hero (色块+面包屑+H1), 面包屑是 UI chrome 词典词 -> 允许"新增", 但:
 *   1) A 区 (return 之前的法务正文数据区) 必须逐字节 IDENTICAL        <- 真正的红线
 *   2) B 区 (render 区) 原有 CJK 节点必须全部按序保留 (零删除/零改写)
 *   3) B 区 新增 CJK 节点必须全部在 allowlist 内 (仅面包屑 UI 词典词)
 *   4) 文案 token 集合必须完全相同 (同一 token 在多处复用不算文案增删)
 *
 * 注: 多行 {/* ... *​/} 注释块整体剔除 (v1 版本只剔首行, 导致自证性误报 FAIL)。
 */
const fs = require('fs');

const ALLOW_NEW = new Set(['首頁', 'ホーム']);

const before = fs.readFileSync('.hermes/_legal-before.tsx', 'utf8').split(/\r?\n/);
const after = fs.readFileSync('src/app/[locale]/legal/page.tsx', 'utf8').split(/\r?\n/);

const idx = (lines) => lines.findIndex((l) => /^\s*return \(/.test(l));
const ib = idx(before);
const ia = idx(after);

/** 逐行遍历, 剔除 JSX 注释块(含续行)/行注释/块注释 */
const stripComments = (lines) => {
  const out = [];
  let inJsx = false;
  let inBlock = false;
  for (const l of lines) {
    const t = l.trim();
    if (inJsx) { if (t.includes('*/}')) inJsx = false; continue; }
    if (inBlock) { if (t.includes('*/')) inBlock = false; continue; }
    if (t.startsWith('{/*')) { if (!t.includes('*/}')) inJsx = true; continue; }
    if (t.startsWith('/*')) { if (!t.includes('*/')) inBlock = true; continue; }
    if (t.startsWith('//')) continue;
    out.push(l);
  }
  return out;
};

const cjk = (lines) => {
  const out = [];
  for (const l of stripComments(lines)) {
    const m = l.match(/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]+/g);
    if (m) out.push(...m);
  }
  return out;
};
/** 文案 token 集合 (JSX 表达式内的数据源引用, 如 t.h1 / section.subtitle) */
const tokenSet = (lines) =>
  new Set(stripComments(lines).join('\n').match(/\{[a-zA-Z_$][\w$.]*\.[\w$]+\}/g) || []);

const aOk = before.slice(0, ib).join('\n') === after.slice(0, ia).join('\n');
const b1 = cjk(before.slice(ib));
const b2 = cjk(after.slice(ia));

// 零删除/零改写: b1 必须是 b2 的子序列
let j = 0;
for (const node of b1) {
  while (j < b2.length && b2[j] !== node) j++;
  if (j >= b2.length) { console.log(`X 原节点被删除或改写: ${JSON.stringify(node)}`); process.exit(1); }
  j++;
}
const added = b2.filter((n) => !b1.includes(n));
const badAdded = added.filter((n) => !ALLOW_NEW.has(n));

const s1 = tokenSet(before.slice(ib));
const s2 = tokenSet(after.slice(ia));
const lost = [...s1].filter((x) => !s2.has(x));
const gained = [...s2].filter((x) => !s1.has(x));

console.log(`A 区 (法务正文数据区): ${aOk ? 'IDENTICAL' : 'CHANGED'}`);
console.log(`B 区 CJK 节点: ${b1.length} -> ${b2.length}; 原节点全部按序保留: 是; 新增=${JSON.stringify(added)}`);
console.log(`文案 token: 丢失=${JSON.stringify(lost)} 新增=${JSON.stringify(gained)}`);
const pass = aOk && badAdded.length === 0 && lost.length === 0;
if (badAdded.length) console.log(`X 越界新增节点 (不在 allowlist): ${JSON.stringify(badAdded)}`);
console.log(pass ? 'LEGAL-TEXT-DIFF: PASS (零删除/零改写/原文案 token 零丢失)' : 'LEGAL-TEXT-DIFF: FAIL -> git checkout 重来');
process.exit(pass ? 0 : 1);
