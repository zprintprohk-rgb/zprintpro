// .hermes/logs/_align-fallbacks-gradient.mjs — 把 CategoryProductCard 的素色底改為漸層（K3 2.1 裁決）
//
// K3 裁決：「統一為漸層」——理由：
//   ① 與產品頁視覺一致（product/ProductCard.tsx 已用漸層）
//   ② 漸層提供更豐富層次，素色底在深色模式可能對比不足
//   ③ 收斂成本最低（只需改 CategoryProductCard 一個檔案）
//
// 資料來源：以 product/ProductCard.tsx 的 categoryFallbacks 為**權威基準**
//   （它與 components/ProductCard.tsx 逐字相同），把 CategoryProductCard 的
//   `{ icon, bgColor, iconColor }` 逐鍵轉為 `{ icon, gradient, iconColor }`。
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const SRC = 'src/components/product/ProductCard.tsx';
const DST = 'src/components/category/CategoryProductCard.tsx';

/** 抽 `const categoryFallbacks … = { … }` 的物件原文 */
function extractFallbacks(file) {
  const s = fs.readFileSync(file, 'utf8');
  const i = s.indexOf('categoryFallbacks');
  const eq = s.indexOf('=', i);
  const st = s.indexOf('{', eq);
  let d = 0;
  let j = st;
  for (; j < s.length; j++) {
    if (s[j] === '{') d++;
    else if (s[j] === '}') {
      d--;
      if (!d) break;
    }
  }
  return { full: s.slice(i, j + 1), start: i, end: j + 1, text: s };
}

/** 解析 `'key': { icon: X, gradient: '...', iconColor: '...' }` 為 map */
function parseEntries(objText, styleField) {
  const map = new Map();
  const re = new RegExp(`'([a-z0-9-]+)':\\s*\\{\\s*icon:\\s*([A-Za-z0-9_]+),\\s*${styleField}:\\s*'([^']*)',\\s*iconColor:\\s*'([^']*)'`, 'g');
  let m;
  while ((m = re.exec(objText))) map.set(m[1], { icon: m[2], style: m[3], iconColor: m[4] });
  return map;
}

const srcFB = extractFallbacks(SRC);
const dstFB = extractFallbacks(DST);
const srcMap = parseEntries(srcFB.full, 'gradient');
const dstMap = parseEntries(dstFB.full, 'bgColor');

console.log(`權威基準 (${SRC}): ${srcMap.size} 鍵（gradient）`);
console.log(`待改檔   (${DST}): ${dstMap.size} 鍵（bgColor）\n`);

const onlyDst = [...dstMap.keys()].filter((k) => !srcMap.has(k));
const onlySrc = [...srcMap.keys()].filter((k) => !dstMap.has(k));
if (onlySrc.length) console.log(`⚠️ 僅基準有: ${onlySrc.join(', ')}`);
if (onlyDst.length) console.log(`⚠️ 僅待改檔有: ${onlyDst.join(', ')}（將無漸層可對應）`);

// 逐鍵產生新行
const newLines = [];
for (const [key, info] of dstMap) {
  const src = srcMap.get(key);
  const gradient = src ? src.style : 'from-gray-500/15 to-slate-600/15';
  newLines.push(`  '${key}': { icon: ${info.icon}, gradient: '${gradient}', iconColor: '${info.iconColor}' },`);
}

console.log('\n=== 轉換計畫 ===');
let shown = 0;
for (const [key, info] of dstMap) {
  const src = srcMap.get(key);
  if (shown < 5) {
    console.log(`  '${key}': bgColor '${info.style}' → gradient '${src ? src.style : '(預設)'}'`);
    shown++;
  }
}
console.log(`  … 共 ${dstMap.size} 鍵`);

if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(0);
}

const out = dstFB.text
  .slice(0, dstFB.start)
  .concat(dstFB.full.replace(/\{[\s\S]*\}$/, '{\n' + newLines.join('\n') + '\n}'))
  .concat(dstFB.text.slice(dstFB.end))
  // 型別宣告同步（否則 tsc 會報 Property 'gradient' does not exist）
  .replace(/(icon:\s*typeof Box;\s*)bgColor(\s*:\s*string)/, '$1gradient$2');

// 後斷言
// ⚠️ 首版誤判（本輪實測）：用「全檔出現次數」計數，把**註解中的 "gradient" 字串**
//   與**渲染端的 `bg-gradient-to-br`** 也算進去 → 得 14 ≠ 13 → 拒絕寫入（假陽性）。
//   修法：只計「資料鍵」形式（行首縮排 + 'key': { icon:…, gradient: '…'）。
const problems = [];
const dataKeyGrad = (out.match(/^\s+'[a-z0-9-]+':\s*\{\s*icon:\s*[A-Za-z0-9_]+,\s*gradient:\s*'/gm) || []).length;
const dataKeyBg = (out.match(/^\s+'[a-z0-9-]+':\s*\{\s*icon:\s*[A-Za-z0-9_]+,\s*bgColor:\s*'/gm) || []).length;
if (dataKeyBg !== 0) problems.push(`仍有 ${dataKeyBg} 個資料鍵用 bgColor`);
if (dataKeyGrad !== dstMap.size) problems.push(`gradient 資料鍵 ${dataKeyGrad} ≠ 期望 ${dstMap.size}`);
// 型別宣告也要跟著改
if (/\{\s*icon:\s*typeof Box;\s*bgColor:\s*string/.test(out)) problems.push('型別宣告仍為 bgColor');
if (problems.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const p of problems) console.error(`   - ${p}`);
  process.exit(1);
}

const backup = `${DST}.bak-gradient-${Date.now()}`;
fs.copyFileSync(DST, backup);
fs.writeFileSync(DST, out, 'utf8');
console.log(`\n✅ 已寫入 ${dstMap.size} 鍵改為漸層`);
console.log(`   備份: ${backup}`);
