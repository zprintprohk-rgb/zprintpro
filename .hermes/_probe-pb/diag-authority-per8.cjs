'use strict';
/** 8 档逐字符: resolveLocale 判 en  vs  门童值作用域判 en —— 一致/不一致精确对账 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const common = require(P + 'scripts/guards/common.js');
const guard = require(P + 'scripts/guards/i18n-guard.js');

const FILES = [
  'src/data/blog-data/en.json',
  'src/data/category-seo-content.ts',
  'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts',
  'src/app/[locale]/payment-methods/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/app/[locale]/category/[slug]/page.tsx',
  'src/data/blog-posts.ts',
];

const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff]/g;

// 复刻门童 scanBidirectional 的归属 (仅取「字符串字面量 + 结构化作用域」)
function guardEnSet(content, abs) {
  const ctx = buildLocaleScopes(content);
  const set = new Set();
  const re = /[\u3400-\u4dbf\u4e00-\u9fff]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const r = rangeAt(ctx.ranges, m.index);
    if (!r || r.type !== 'string') continue;
    const loc = attrLocale(ctx, m.index, abs);
    if (loc === 'en') set.add(m.index);
  }
  return set;
}

// --- 从 i18n-guard.js 复制的词法/作用域实现 (保持一致, 避免行为漂移) ---
const LOCALE_KEY_INLINE_RE = /(?:["'\x60])?(zh-hk|en|ja)(?:["'\x60])?\s*:/g;
const KEY_ONLY_RE = /^["'\x60]?(zh-hk|en|ja)["'\x60]?$/;
const KEY_PREV_OK = new Set(['{', ',', '(', '[', ';', '=', '>', '?', ':']);
const FILE_LOCALE_ONLY_RE = /(?:^|[\/\\])(?:blog-data[\/\\])?(zh-hk|en|ja)(?:\.json|[\/\\])/;

function lexRanges(content) {
  const ranges = [];
  const n = content.length;
  let i = 0;
  while (i < n) {
    const ch = content[i];
    if (ch === '/' && content[i + 1] === '/') {
      let e = content.indexOf('\n', i); if (e === -1) e = n;
      ranges.push({ type: 'comment', start: i, end: e }); i = e; continue;
    }
    if (ch === '/' && content[i + 1] === '*') {
      const f = content.indexOf('*/', i + 2); const e = f === -1 ? n : f + 2;
      ranges.push({ type: 'comment', start: i, end: e }); i = e; continue;
    }
    if (ch === '"' || ch === "'" || ch === '\x60') {
      let j = i + 1;
      while (j < n) {
        if (content[j] === '\\') { j += 2; continue; }
        if (content[j] === ch) break;
        if (content[j] === '\n' && ch !== '\x60') break;
        j++;
      }
      const e = Math.min(j + 1, n);
      ranges.push({ type: 'string', start: i, end: e }); i = e; continue;
    }
    i++;
  }
  ranges.sort((a, b) => a.start - b.start);
  return ranges;
}
function rangeAt(ranges, idx) {
  let lo = 0, hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1; const r = ranges[mid];
    if (idx < r.start) hi = mid - 1;
    else if (idx >= r.end) lo = mid + 1;
    else return r;
  }
  return null;
}
function prevNonWs(content, idx) { let i = idx - 1; while (i >= 0 && /\s/.test(content[i])) i--; return i >= 0 ? content[i] : null; }
function valueEnd(content, start, ranges) {
  const n = content.length; let i = start;
  while (i < n && /\s/.test(content[i])) i++;
  let depth = 0, j = i;
  while (j < n) {
    const r = rangeAt(ranges, j);
    if (r && r.start === j) { j = r.end; continue; }
    const c = content[j];
    if (c === '{' || c === '[' || c === '(') { depth++; j++; continue; }
    if (c === '}' || c === ']' || c === ')') { if (depth === 0) return j; depth--; j++; continue; }
    if (depth === 0 && c === ',') return j;
    j++;
  }
  return n;
}
function buildLocaleScopes(content) {
  const ranges = lexRanges(content);
  const scopes = [];
  LOCALE_KEY_INLINE_RE.lastIndex = 0;
  let km;
  while ((km = LOCALE_KEY_INLINE_RE.exec(content)) !== null) {
    const idx = km.index;
    const r = rangeAt(ranges, idx);
    if (r && r.type === 'comment') continue;
    if (r && r.type === 'string') {
      if (!KEY_ONLY_RE.test(content.slice(r.start, r.end))) continue;
    } else {
      const prev = prevNonWs(content, idx);
      if (prev !== null && !KEY_PREV_OK.has(prev)) continue;
    }
    const colon = idx + km[0].length - 1;
    scopes.push({ locale: km[1], start: colon + 1, end: valueEnd(content, colon + 1, ranges) });
  }
  scopes.sort((a, b) => a.start - b.start || b.end - a.end);
  return { ranges, scopes };
}
function attrLocale(ctx, idx, abs) {
  const norm = String(abs).replace(/\\/g, '/');
  if (/blog-data/.test(norm)) {
    const fm = FILE_LOCALE_ONLY_RE.exec(norm);
    if (fm) return fm[1];
  }
  let best = null;
  for (const s of ctx.scopes) {
    if (s.start <= idx && idx < s.end && (!best || s.start > best.start)) best = s;
  }
  return best ? best.locale : null;
}
// --- 复刻结束 ---

let tRes = 0, tGuard = 0, tBoth = 0;
const rows = [];
for (const rel of FILES) {
  const abs = P + rel;
  const c = fs.readFileSync(abs, 'utf8');
  const gSet = guardEnSet(c, abs);
  let res = 0, g = 0, both = 0, resOnly = 0, gOnly = 0;
  const resOnlyLines = new Map(), gOnlyLines = new Map();
  CJK_RE.lastIndex = 0;
  let m;
  while ((m = CJK_RE.exec(c)) !== null) {
    const isRes = common.resolveLocale(c, m.index, abs) === 'en';
    const isG = gSet.has(m.index);
    if (isRes) res++;
    if (isG) g++;
    if (isRes && isG) both++;
    else if (isRes) { resOnly++; const ln = common.findLineNumber(c, m.index); resOnlyLines.set(ln, (resOnlyLines.get(ln) || 0) + 1); }
    else if (isG) { gOnly++; const ln = common.findLineNumber(c, m.index); gOnlyLines.set(ln, (gOnlyLines.get(ln) || 0) + 1); }
  }
  tRes += res; tGuard += g; tBoth += both;
  rows.push({ rel, res, g, both, resOnly, gOnly, resOnlyLines, gOnlyLines });
}

console.log('file'.padEnd(52) + 'resolveLocale 门童作用域  交集  res独有  guard独有');
for (const r of rows) {
  console.log(r.rel.padEnd(52) + String(r.res).padEnd(14) + String(r.g).padEnd(11) + String(r.both).padEnd(6) + String(r.resOnly).padEnd(9) + r.gOnly);
  if (r.resOnly) console.log('    res独有行: ' + [...r.resOnlyLines.entries()].slice(0, 10).map(([l, n]) => 'L' + l + '×' + n).join(' '));
  if (r.gOnly) console.log('    guard独有行: ' + [...r.gOnlyLines.entries()].slice(0, 10).map(([l, n]) => 'L' + l + '×' + n).join(' '));
}
console.log('\n= 8 档合计: resolveLocale=' + tRes + '  门童作用域=' + tGuard + '  交集=' + tBoth +
  '  res独有=' + (tRes - tBoth) + '  guard独有=' + (tGuard - tBoth));
