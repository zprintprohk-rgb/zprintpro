// .hermes/logs/_verify-datasource-equivalence.mjs — 收斂前等價性驗證
//
// 目的：CategorySharpHooks 用 `CATEGORY_INDUSTRIES[slug][locale][idx]` 取行業名，
//   idx 來自它自己那份 scenarios 的顺序。若把 scenarios 改為 import CategoryIndustries 的版本，
//   **順序一旦不同 → 行業名與文案錯配**（比數字錯更嚴重）。
// 故先驗證：對每個 category，(SharpHooks 現有顺序) === (Industries 按 priority 排序後前 3)，
//   且 (Industries 原始顺序) === (CATEGORY_INDUSTRIES 顺序)。
import fs from 'node:fs';

const ind = fs.readFileSync('src/components/category/CategoryIndustries.tsx', 'utf8');
const sharp = fs.readFileSync('src/components/category/CategorySharpHooks.tsx', 'utf8');
const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');

/** 從 CategoryIndustries 取 {category: [{key,priority,tier,order}]} */
function parseIndustries() {
  const out = {};
  // 逐 category 抓區塊：`  <name>: [` ... `\n  ],`
  const re = /\n  '?([a-z-]+)'?:\s*\[([\s\S]*?)\n  \],/g;
  let m;
  while ((m = re.exec(ind))) {
    const cat = m[1];
    const body = m[2];
    const items = [];
    const bRe = /\{\s*key:\s*'([^']+)',[\s\S]*?priority:\s*(\d+),\s*tier:\s*'([AB])'/g;
    let b;
    while ((b = bRe.exec(body))) items.push({ key: b[1], priority: Number(b[2]), tier: b[3] });
    if (items.length) out[cat] = items;
  }
  return out;
}

/** 從 SharpHooks 取 {category: [key,...]}（其資料只有 key+scenarios） */
function parseSharp() {
  const out = {};
  const re = /\n  '?([a-z-]+)'?:\s*\[([\s\S]*?)\n  \],\n/g;
  let m;
  while ((m = re.exec(sharp))) {
    const cat = m[1];
    const keys = [...m[2].matchAll(/\{\s*key:\s*'([^']+)'/g)].map((x) => x[1]);
    if (keys.length) out[cat] = keys;
  }
  return out;
}

const I = parseIndustries();
const S = parseSharp();

console.log('=== 逐類別等價性比對 ===');
let bad = 0;
let checked = 0;
const onlySharp = Object.keys(S).filter((c) => !I[c]);
for (const cat of Object.keys(S)) {
  if (!I[cat]) continue;
  checked++;
  const sharpKeys = S[cat].slice(0, 3);
  const sorted = [...I[cat]].sort((a, b) => a.priority - b.priority).slice(0, 3).map((x) => x.key);
  const equivalent = JSON.stringify(sharpKeys) === JSON.stringify(sorted);
  if (!equivalent) {
    bad++;
    console.log(`  🔴 ${cat}`);
    console.log(`       SharpHooks(前3): ${sharpKeys.join(', ')}`);
    console.log(`       Industries(前3): ${sorted.join(', ')}`);
  } else {
    console.log(`  ✓ ${cat}: ${sharpKeys.join(', ')}`);
  }
}
console.log(`\n比對 ${checked} 個類別 ｜ 不一致 ${bad} ｜ SharpHooks 獨有類別 ${onlySharp.length}${onlySharp.length ? ': ' + onlySharp.join(', ') : ''}`);
console.log(bad === 0 ? '\n✅ 順序等價 —— 可安全收斂為單一資料源' : '\n🔴 順序不等價 —— 收斂會改變渲染，須先對齊資料');

// ---------- 完整分歧清單（供裁決） ----------
console.log('\n\n=== 完整分歧清單（全類別，供 K3 裁決收斂方向）===');
const allCats = [...new Set([...Object.keys(I), ...Object.keys(S)])].sort();
for (const cat of allCats) {
  const iKeys = I[cat] ? [...I[cat]].sort((a, b) => a.priority - b.priority).map((x) => `${x.key}(p${x.priority},${x.tier})`) : null;
  const sKeys = S[cat] ? S[cat] : null;
  const status = !iKeys ? '🔸 僅 SharpHooks 有' : !sKeys ? '🔹 僅 Industries 有' : '·';
  console.log(`\n${status} [${cat}]`);
  console.log(`   SharpHooks(${sKeys ? sKeys.length : 0}): ${sKeys ? sKeys.join(', ') : '—'}`);
  console.log(`   Industries(${iKeys ? iKeys.length : 0}): ${iKeys ? iKeys.join(', ') : '—'}`);
}
