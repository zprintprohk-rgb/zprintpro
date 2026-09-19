// .hermes/logs/_find-duplicate-datasources.mjs — 全站「重複資料源」盤點
//
// 目的（K3 2026-09-19 第三項建議）：
//   「任何声称『复用』但实际复制的数据源，应在 push 前被拦下。」
//   本腳本先做**盤點**：找出「跨檔案鍵集合高度重疊」的資料常數 → 這些就是候選重複源。
//   盤點結果確認後，才值得固化成門童（避免誤報把好資料當問題）。
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src/components', 'src/data', 'src/lib'];
const files = [];
function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p.replace(/\\/g, '/'));
  }
}
for (const r of ROOTS) walk(r);

/** 抓「物件常數」：`const NAME ... = {` 後的頂層 key 集合（縮排 2 或 4 的 `key:` / `'key':`） */
function extractConsts(src) {
  const out = [];
  const re = /(?:export\s+)?const\s+([A-Za-z_][A-Za-z0-9_]*)[^=]*=\s*\{/g;
  let m;
  while ((m = re.exec(src))) {
    const name = m[1];
    const start = m.index + m[0].length;
    // 用括號深度找配對的 }
    let depth = 1;
    let i = start;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      i++;
    }
    const body = src.slice(start, i - 1);
    if (body.length < 400) continue; // 太小的不算「資料源」
    const keys = new Set();
    for (const km of body.matchAll(/^ {2,4}'?([A-Za-z_][A-Za-z0-9_-]*)'?:\s*[[{]/gm)) keys.add(km[1]);
    if (keys.size >= 3) out.push({ name, keys, len: body.length, body });
  }
  return out;
}

const all = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const c of extractConsts(src)) all.push({ file: f, ...c });
}

console.log(`掃描 ${files.length} 檔 ｜ 找到 ${all.length} 個資料常數（鍵數 ≥3 且長度 ≥400）\n`);

/**
 * 找跨檔案的高重疊配對。
 *
 * ⚠️ 首版用「頂層 key 集合」直接比 → 命中 1098 組全是假陽性：
 *   站上每個 UI 字典都有 `{ 'zh-hk': …, en: …, ja: … }` 三個鍵，
 *   彼此 Jaccard 恆為 1.0 → 把「語系字典」误判成「重複資料源」。
 * 修法：把「語系鍵」單獨識別——
 *   ① 兩邊都只有語系鍵 → 進一步比對**內層鍵**（語系字典的第二層 key），才算真重複；
 *   ② 否則用「非語系鍵」的 Jaccard。
 */
const LOCALE_KEYS = new Set(['zh-hk', 'en', 'ja', 'zh', 'zh-cn', 'zh-tw', 'ko', 'es', 'fr', 'de', 'pt', 'ru']);
const isLocaleOnly = (keys) => [...keys].length > 0 && [...keys].every((k) => LOCALE_KEYS.has(k));

/** 取語系字典的「內層鍵」（第一層 key 底下的 key 名），用於區分不同的語系字典 */
function innerKeysOf(body) {
  const inner = new Set();
  // 找 `'zh-hk': {` 之後到下一個頂層 key 之前的區塊，收集其 key
  for (const m of body.matchAll(/^ {2,4}'?(zh-hk|en|ja)'?:\s*\{([\s\S]*?)^ {2,4}/gm)) {
    for (const km of m[2].matchAll(/^\s{4,8}'?([A-Za-z_][A-Za-z0-9_-]*)'?:\s*/gm)) inner.add(km[1]);
  }
  return inner;
}

const MIN_OVERLAP = 0.7;
const MIN_KEYS = 3;
const pairs = [];
for (let i = 0; i < all.length; i++) {
  for (let j = i + 1; j < all.length; j++) {
    const a = all[i];
    const b = all[j];
    if (a.file === b.file) continue;

    let aKeys = a.keys;
    let bKeys = b.keys;
    if (isLocaleOnly(a.keys) && isLocaleOnly(b.keys)) {
      // 兩邊都是語系字典 → 比內層鍵；內層鍵也全同才是真重複
      aKeys = innerKeysOf(a.body);
      bKeys = innerKeysOf(b.body);
      if (aKeys.size < MIN_KEYS || bKeys.size < MIN_KEYS) continue;
    } else {
      // 去掉語系鍵再比（語系鍵是站上通用結構，不具區分度）
      aKeys = new Set([...a.keys].filter((k) => !LOCALE_KEYS.has(k)));
      bKeys = new Set([...b.keys].filter((k) => !LOCALE_KEYS.has(k)));
    }

    const inter = [...aKeys].filter((k) => bKeys.has(k));
    if (inter.length < MIN_KEYS) continue;
    const jac = inter.length / new Set([...aKeys, ...bKeys]).size;
    if (jac >= MIN_OVERLAP) pairs.push({ a, b, inter, jac });
  }
}
pairs.sort((x, y) => y.jac - x.jac);

if (!pairs.length) {
  console.log('✅ 未發現跨檔案高重疊資料常數');
} else {
  console.log(`🔴 發現 ${pairs.length} 組跨檔案高重疊資料常數（Jaccard ≥ ${MIN_OVERLAP}）：\n`);
  for (const p of pairs) {
    console.log(`  [${p.jac.toFixed(2)}] ${p.a.file}::${p.a.name} (${p.a.keys.size} keys)`);
    console.log(`         ${p.b.file}::${p.b.name} (${p.b.keys.size} keys)`);
    console.log(`         共同鍵 ${p.inter.length}: ${p.inter.slice(0, 8).join(', ')}${p.inter.length > 8 ? '…' : ''}`);
    console.log(`         僅 A 有: ${[...p.a.keys].filter((k) => !p.b.keys.has(k)).slice(0, 6).join(', ') || '—'}`);
    console.log(`         僅 B 有: ${[...p.b.keys].filter((k) => !p.a.keys.has(k)).slice(0, 6).join(', ') || '—'}`);
    console.log('');
  }
}
