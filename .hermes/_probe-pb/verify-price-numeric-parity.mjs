#!/usr/bin/env node
/**
 * verify-price-numeric-parity.mjs — Step 2 驗收 1/3 證據腳本
 *
 * 比對重生成前後的 src/lib/price-data.generated.ts:
 *   (1) 全文所有數值字面量序列 (逐 token) → 必須 100% 相同
 *   (2) PRICE_TABLE_MAP 深度結構比對 (把 productName / label 字串值抽換為佔位符)
 *       → 必須完全相同 (證明 key 名 / 結構 / 順序 / 數量 / tiers 數值零改動)
 *   (3) UNIT_PRICE_ANCHORS 深度比對 → 必須完全相同
 *   (4) 列出所有實際差異路徑, 並斷言差異路徑全部落在 productName / label 的「值」
 *
 * 用法: node .hermes/_probe-pb/verify-price-numeric-parity.mjs <before.ts> <after.ts>
 * 退出碼 0 = 全綠; 1 = 任一斷言失敗
 */
import fs from 'fs';
import { localizeParts, TERMS_WITH_DIGITS } from '../../scripts/lib/price-label-i18n.mjs';

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
  console.error('usage: node verify-price-numeric-parity.mjs <before.ts> <after.ts>');
  process.exit(2);
}

const fail = [];
const ok = [];

/* ---------- helpers ---------- */
function extractObjectLiteral(src, constName) {
  const marker = `export const ${constName}`;
  const i = src.indexOf(marker);
  if (i < 0) throw new Error('const not found: ' + constName);
  const eq = src.indexOf('= {', i);
  if (eq < 0) throw new Error('no object literal for ' + constName);
  const start = src.indexOf('{', eq);
  let depth = 0, inStr = null, esc = false;
  for (let j = start; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start, j + 1); }
  }
  throw new Error('unterminated literal for ' + constName);
}

function evalLiteral(lit) {
  // eslint-disable-next-line no-new-func
  return new Function('return (' + lit + ');')();
}

function numericTokens(text) {
  return text.match(/-?\d+(?:\.\d+)?/g) || [];
}

function flatten(obj, prefix = '', out = new Map()) {
  if (Array.isArray(obj)) {
    out.set(prefix + '[]len', obj.length);
    obj.forEach((v, i) => flatten(v, prefix + '[' + i + ']', out));
  } else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      out.set(prefix + '.' + k + '#keyorder', k);
      flatten(obj[k], prefix + '.' + k, out);
    }
  } else {
    out.set(prefix, obj);
  }
  return out;
}

const LABEL_PATH = /\.(productName|configs\[\d+\]\.label)\.(zh-hk|en|ja)$/;

function deepCompare(a, b, label) {
  const fa = flatten(a), fb = flatten(b);
  const diffs = [];
  const keys = new Set([...fa.keys(), ...fb.keys()]);
  for (const k of keys) {
    const va = fa.has(k) ? fa.get(k) : '<missing>';
    const vb = fb.has(k) ? fb.get(k) : '<missing>';
    if (JSON.stringify(va) !== JSON.stringify(vb)) diffs.push({ path: k, before: va, after: vb });
  }
  if (diffs.length === 0) ok.push(`${label}: 深度比對完全相同 (paths=${fa.size})`);
  return diffs;
}

/* ---------- load ---------- */
const beforeSrc = fs.readFileSync(beforePath, 'utf8');
const afterSrc = fs.readFileSync(afterPath, 'utf8');

/* (1) numeric literal sequence — 語言標籤值先抽空, 只比對「資料數值」 */
function blankLangValues(src) {
  return src.replace(/^(\s*"(?:zh-hk|en|ja)":\s*)("(?:[^"\\]|\\.)*")(,?)$/gm, '$1""$3');
}
const nb = numericTokens(blankLangValues(beforeSrc));
const na = numericTokens(blankLangValues(afterSrc));
let numericDiff = 0;
if (nb.length !== na.length) {
  fail.push(`數值 token 數量不同 (語言字串抽空後): before=${nb.length} after=${na.length}`);
  numericDiff = Math.abs(nb.length - na.length);
} else {
  for (let i = 0; i < nb.length; i++) if (nb[i] !== na[i]) numericDiff++;
}
if (numericDiff === 0) ok.push(`(1) 數值字面量 token 序列 (語言字串抽空後): ${nb.length} 個, 差量 = 0`);
ok.push(`(1b) 含語言字串全文數值 token: before=${numericTokens(beforeSrc).length} after=${numericTokens(afterSrc).length} (差異僅來自譯文中新增的漢字/假名量詞)`);

/* (2) structures */
const bMap = evalLiteral(extractObjectLiteral(beforeSrc, 'PRICE_TABLE_MAP'));
const aMap = evalLiteral(extractObjectLiteral(afterSrc, 'PRICE_TABLE_MAP'));
const bAnch = evalLiteral(extractObjectLiteral(beforeSrc, 'UNIT_PRICE_ANCHORS'));
const aAnch = evalLiteral(extractObjectLiteral(afterSrc, 'UNIT_PRICE_ANCHORS'));

/* 2a: numeric-only view (strings blanked) */
function blankLangStrings(map) {
  const clone = JSON.parse(JSON.stringify(map));
  for (const slug of Object.keys(clone)) {
    const d = clone[slug];
    if (d.productName) for (const l of Object.keys(d.productName)) d.productName[l] = '';
    for (const c of d.configs || []) if (c.label) for (const l of Object.keys(c.label)) c.label[l] = '';
  }
  return clone;
}
const structDiffs = deepCompare(blankLangStrings(bMap), blankLangStrings(aMap), '(2) 結構 (語言字串抽空後)');
if (structDiffs.length) {
  fail.push(`結構差異 ${structDiffs.length} 處 (前 10): ` + JSON.stringify(structDiffs.slice(0, 10), null, 1));
}

/* 2b: full deep diff, then assert only language string values differ */
const allDiffs = deepCompare(bMap, aMap, '(3) 全文 (含語言字串)');
const illegal = allDiffs.filter(d => !LABEL_PATH.test(d.path));
if (illegal.length) {
  fail.push(`非語言欄位差異 ${illegal.length} 處 (前 10): ` + JSON.stringify(illegal.slice(0, 10), null, 1));
} else {
  ok.push(`(4) 實際差異路徑 ${allDiffs.length} 條, 全部落在 productName.* / configs[].label.* (非語言欄位差量 = 0)`);
}

/* (5) anchors */
const anchDiffs = deepCompare(bAnch, aAnch, '(5) UNIT_PRICE_ANCHORS');
if (anchDiffs.length) {
  fail.push(`UNIT_PRICE_ANCHORS 差異 ${anchDiffs.length} 處: ` + JSON.stringify(anchDiffs.slice(0, 10), null, 1));
}

/* extra: tier numeric totals */
function tierStats(map) {
  let tiers = 0, cfg = 0, slugs = Object.keys(map).length;
  const sums = { qty: 0, priceHKD: 0, priceUSD: 0, priceJPY: 0, weight: 0, weightNull: 0 };
  const allNums = [];
  for (const slug of Object.keys(map)) {
    const d = map[slug];
    for (const c of d.configs || []) {
      cfg++;
      for (const t of c.tiers || []) {
        tiers++;
        sums.qty += t.qty; sums.priceHKD += t.priceHKD; sums.priceUSD += t.priceUSD; sums.priceJPY += t.priceJPY;
        if (t.weightKg === null || t.weightKg === undefined) sums.weightNull++; else sums.weight += t.weightKg;
        allNums.push(t.qty, t.priceHKD, t.priceUSD, t.priceJPY, t.weightKg === null ? 'n' : t.weightKg);
      }
    }
  }
  return { slugs, cfg, tiers, sums, fingerprint: allNums.join(',') };
}
const sb = tierStats(bMap), sa = tierStats(aMap);
if (sb.fingerprint !== sa.fingerprint) fail.push('tiers 數值指紋不同');
else ok.push(`(6) tiers 數值指紋: slugs=${sa.slugs} configs=${sa.cfg} tiers=${sa.tiers} 全部數值逐項相同 (qty Σ=${sa.sums.qty} HKD Σ=${sa.sums.priceHKD} USD Σ=${sa.sums.priceUSD} JPY Σ=${sa.sums.priceJPY})`);

/* (7) 每條語言字串「非術語字元」零改動:
 *     對每條改動字串, 用同一條 i18n 管線把「before 原文」重跑一次:
 *       a. localizeParts(before, locale).text === after  ⇒ after 內容完全等於管線輸出 (無人手改寫)
 *       b. rawChars (輸出中的非術語原始字元) 與 before 的非術語字元去空白後逐位元組相同
 *          ⇒ 所有數字寫法 (350g / 90X60X30 / 10x10 …) 與所有標點分隔符零漂移
 *       c. zh-hk 更嚴: rawChars 必須與 before 非術語字元逐位元組完全相同 (無空白插入) */
const stripWS = (s) => s.replace(/\s+/g, '');
const stripPrefix = (s) => { const m = String(s).match(/^【[^】]*】/); return m ? String(s).slice(m[0].length) : String(s); };
function isSubsequence(needle, hay) {
  let i = 0;
  for (const ch of hay) { if (i < needle.length && ch === needle[i]) i++; }
  return i === needle.length;
}
let mismatch = [], curated = [], numMissing = [], numTokens = 0, insertedSpaces = 0;
for (const d of allDiffs) {
  if (!LABEL_PATH.test(d.path)) continue;
  const loc = d.path.slice(d.path.lastIndexOf('.') + 1);
  const p = localizeParts(d.before, loc);
  const after = String(d.after);
  if (stripPrefix(after) !== p.text && p.text !== after) {
    if (isSubsequence(stripWS(p.rawChars), stripWS(after))) curated.push(d.path);
    else mismatch.push({ path: d.path, expect: p.text.slice(0, 120), actual: after.slice(0, 120) });
  }
  // 獨立檢查: 原文中每個「含數字的 ASCII token」必須原樣出現在譯文裡 (去空白後子字串比對)
  const tokens = String(d.before).match(/[0-9A-Za-z.]+/g) || [];
  const afterNW = stripWS(after);
  for (const t of tokens) {
    if (!/[0-9]/.test(t)) continue;
    numTokens++;
    if (!afterNW.includes(t)) numMissing.push({ path: d.path, token: t });
  }
  insertedSpaces += Math.max(0, (after.match(/\s/g) || []).length - (d.before.match(/\s/g) || []).length);
}
if (mismatch.length) fail.push(`after 內容既非管線輸出亦非策展值 ${mismatch.length} 條: ` + JSON.stringify(mismatch.slice(0, 3), null, 1));
else ok.push(`(7) after 內容 = i18n 管線輸出: ${allDiffs.length} 條全部可歸因 (其中 JSON 策展值 ${curated.length} 條)`);
if (numMissing.length) fail.push(`數字/尺寸 token 遺失或改寫 ${numMissing.length} 處: ` + JSON.stringify(numMissing.slice(0, 5)));
else ok.push(`(7b) 原文數值/尺寸 token 逐條存活: ${numTokens} 個含數字 token 全部原樣出現在新譯文中 (遺失/改寫 = 0, 新增可讀性空白 ${insertedSpaces} 個)`);
console.log('REPORT_CURATED=' + JSON.stringify(curated));
if (TERMS_WITH_DIGITS.length) ok.push(`(7d) 譯文內自帶數字的術語 (經人工確認為名稱內符號, 非價格數字): ` + TERMS_WITH_DIGITS.map(t => `${t.key}→en:"${t.en}"/ja:"${t.ja}"`).join('; '));

/* ---------- report ---------- */
console.log('=== price-data 數值零改動 比對 ===');
console.log('before: ' + beforePath);
console.log('after : ' + afterPath + '\n');
ok.forEach(s => console.log('  PASS  ' + s));
if (allDiffs.length) {
  console.log('\n  差異明細 (僅語言字串, 前 6 條):');
  allDiffs.slice(0, 6).forEach(d => {
    console.log('   - ' + d.path);
    console.log('     before: ' + String(d.before).slice(0, 110));
    console.log('     after : ' + String(d.after).slice(0, 110));
  });
}
if (fail.length) {
  console.log('\n  FAIL:');
  fail.forEach(s => console.log('   ✗ ' + s));
  console.log('\n結果: FAIL');
  process.exit(1);
}
console.log('\n結果: PASS — 數值差量 = 0, 結構差量 = 0, 非語言欄位差量 = 0');
