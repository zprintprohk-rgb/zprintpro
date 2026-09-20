// .hermes/logs/_audit-scenario-keys.mjs — 雙數據源 key 一致性審計（K3 P1，沿用 banners 方法）
//
// 方法（banners 修復中驗證有效）：
//   對每個類別，比對四個來源的 key 集合：
//     ① SCENARIO_LINKS（href 表）
//     ② SCENARIO_INDUSTRY_NAMES（行業名表）
//     ③ CategorySharpHooks
//     ④ CategoryIndustries
//   若 ③/④ 的 key 不在 ①/② 中 → 該場景 resolveScenarioHref/getScenarioIndustryName 會落空
//   → **功能失效**（不是命名分歧）
import fs from 'node:fs';

const reads = {
  links: fs.readFileSync('src/data/industry-scenario-links.ts', 'utf8'),
  sharp: fs.readFileSync('src/components/category/CategorySharpHooks.tsx', 'utf8'),
  ind: fs.readFileSync('src/components/category/CategoryIndustries.tsx', 'utf8'),
};

/** 抽某"表"中每個類別的 key 集合（依縮排 2 的類別行切段） */
function keysByCategory(text, catIndent = 2) {
  const lines = text.split(/\r?\n/);
  const cats = new Map();
  let cur = null;
  let depth = 0;
  lines.forEach((l) => {
    const m = l.match(/^ {2}'?([a-z0-9-]+)'?:\s*[\{[]/);
    if (m) {
      cur = m[1];
      cats.set(cur, []);
      depth = 0;
      return;
    }
    if (!cur) return;
    if (/^ {2}\},?\s*$|^ {2}\],\s*$/.test(l)) {
      cur = null;
      return;
    }
    // 場景 key：縮排 4 的 `key: 'xxx'` 或 `xxx: {`
    const k1 = l.match(/^\s{4}key:\s*'([a-z0-9_]+)'/);
    if (k1) cats.get(cur).push(k1[1]);
    const k2 = l.match(/^\s{4}'?([a-z0-9_]+)'?:\s*\{/);
    if (k2) cats.get(cur).push(k2[1]);
  });
  return cats;
}

const linkCats = keysByCategory(reads.links);
// industry-scenario-links 有兩個表（SCENARIO_LINKS + SCENARIO_INDUSTRY_NAMES）→ 分段處理
const idxNames = reads.links.indexOf('SCENARIO_INDUSTRY_NAMES');
const linksPart = reads.links.slice(0, idxNames);
const namesPart = reads.links.slice(idxNames);
const hrefCats = keysByCategory(linksPart);
const nameCats = keysByCategory(namesPart);
const sharpCats = keysByCategory(reads.sharp);
const indCats = keysByCategory(reads.ind);

const ALL = [...new Set([...hrefCats.keys(), ...nameCats.keys(), ...sharpCats.keys(), ...indCats.keys()])].sort();

console.log('雙數據源 key 一致性審計（banners 方法）\n');
console.log(`類別數：href表 ${hrefCats.size} ｜ 行業名表 ${nameCats.size} ｜ SharpHooks ${sharpCats.size} ｜ Industries ${indCats.size}\n`);

let problems = 0;
for (const cat of ALL) {
  const href = hrefCats.get(cat) ?? [];
  const names = nameCats.get(cat) ?? [];
  const sharp = sharpCats.get(cat) ?? [];
  const ind = indCats.get(cat) ?? [];

  /**
   * ⚠️ 首版判據的假陰性（本輪實測踩到）：
   *   寫成 `sharp.filter(k => !href.includes(k) || !names.includes(k))` ——
   *   當某類別**在 href 表中不存在**時 `href === []`，對應 key 會被 `!href.includes(k)` 標記；
   *   但若該類別**同時**在兩邊都不存在時，`[]` vs `[]` 會得到「無問題」→ 掩蓋事實。
   *   實測：href 13 / 行業名 14 / SharpHooks 17 / Industries 17，卻報「全部一致」。
   * 修法：改為**逐來源顯式檢查**，並把「兩表是否具備該類別」本身列為一項檢查。
   */
  const issues = [];
  if (!hrefCats.has(cat) && (sharp.length || ind.length)) {
    issues.push(`SCENARIO_LINKS **整類缺失**（SharpHooks/Industries 有 ${sharp.length || ind.length} 個場景）→ href 必然落空`);
  }
  if (!nameCats.has(cat) && (sharp.length || ind.length)) {
    issues.push(`SCENARIO_INDUSTRY_NAMES **整類缺失** → 行業名必然落空`);
  }
  const sharpMissingHref = sharp.filter((k) => !href.includes(k));
  const sharpMissingName = sharp.filter((k) => !names.includes(k));
  const indMissingHref = ind.filter((k) => !href.includes(k));
  const indMissingName = ind.filter((k) => !names.includes(k));
  if (sharpMissingHref.length) issues.push(`SharpHooks 的 key 在 href 表缺失: ${sharpMissingHref.join(', ')}`);
  if (sharpMissingName.length) issues.push(`SharpHooks 的 key 在行業名表缺失: ${sharpMissingName.join(', ')}`);
  if (indMissingHref.length) issues.push(`Industries 的 key 在 href 表缺失: ${indMissingHref.join(', ')}`);
  if (indMissingName.length) issues.push(`Industries 的 key 在行業名表缺失: ${indMissingName.join(', ')}`);
  // href ↔ 行業名 互相對齊
  const hrefOrphan = href.filter((k) => !names.includes(k));
  const nameOrphan = names.filter((k) => !href.includes(k));
  if (hrefOrphan.length) issues.push(`href 表有但行業名表缺: ${hrefOrphan.join(', ')}`);
  if (nameOrphan.length) issues.push(`行業名表有但 href 表缺: ${nameOrphan.join(', ')}`);

  if (issues.length) {
    problems++;
    console.log(`🔴 [${cat}]`);
    console.log(`   href表(${href.length}): ${href.join(', ') || '—'}`);
    console.log(`   行業名表(${names.length}): ${names.join(', ') || '—'}`);
    console.log(`   SharpHooks(${sharp.length}): ${sharp.join(', ') || '—'}`);
    console.log(`   Industries(${ind.length}): ${ind.join(', ') || '—'}`);
    for (const x of issues) console.log(`   ⚠️ ${x}`);
    console.log('');
  }
}
console.log(`\n結果：${problems === 0 ? '✅ 全部一致' : `🔴 ${problems} 個類別有 key 不一致`}`);
