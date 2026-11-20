'use strict';
/**
 * .hermes/_probe-pb/methodB-en-cjk-classify.cjs
 * ============================================================================
 * 方法 B —— 结构化解析法 (实现 #2, 与 A 刻意独立)
 *
 * 口径: 同 §2 权威口径 (门童 #4 en 值判据)。本脚本**不做逐字符 resolveLocale 扫描**,
 *       而是先**解析出 en 语系的值对象**, 再在该范围内计 CJK。
 *
 * 实现路径:
 *   · JSON   : JSON.parse 后逐字段走访 + 原文定位 (键序列定位, 独立实现), 字段名由对象键给出;
 *   · TS/TSX : 自己的**括号栈 tokenizer** ——
 *               ① 先扫出全部 locale 键 (en / ja / zh-hk) 及其值区间;
 *               ② 对 en 值区间做二次解析, 得到 `字段 → 值区间` 与 `数组下标 → 值区间`;
 *               ③ 计 CJK 字符 (仅字符串字面量内)。
 *   ⇒ 覆盖 v上一版失败处: **别名键** (supportJA 属 ja 语系, 不入 en; beneficiaryCn 属 en 语系内字段)
 *     与 `isEn ? … : …` 三元 (由 locale 键作用域天然区分, 不做行内文本猜测)。
 *
 * 只读: 不改任何生产文件。
 * ============================================================================
 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const shared = require(P + '.hermes/_probe-pb/en-cjk-classify-shared.cjs');

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
const BACKTICK = String.fromCharCode(96);
const QUOTE_CHARS = '"' + "'" + BACKTICK;
const CJK_TEST = /[\u3400-\u4dbf\u4e00-\u9fff]/;

/* ══════════════════ 通用小工具 ══════════════════ */

/** 跳过注释 (返回新位置); 非注释返回原位 */
function skipComment(s, i) {
  if (s[i] === '/' && s[i + 1] === '/') { const e = s.indexOf('\n', i); return e < 0 ? s.length : e; }
  if (s[i] === '/' && s[i + 1] === '*') { const e = s.indexOf('*/', i + 2); return e < 0 ? s.length : e + 2; }
  return i;
}

/** 读一个字符串字面量, 返回 {quote, start, end, raw, value} ; 非字符串返回 null
 *  ★ 同时返回 cjkPos: 解码后 CJK 字符的**原文索引** (转义安全: 逐段构造, 位置可追踪)
 */
function readString(s, i) {
  const q = s[i];
  if (QUOTE_CHARS.indexOf(q) < 0) return null;
  let j = i + 1;
  while (j < s.length) {
    if (s[j] === '\\') { j += 2; continue; }
    if (s[j] === q) break;
    if (s[j] === '\n' && q !== BACKTICK) break;
    j++;
  }
  const end = Math.min(j + 1, s.length);
  let value = '', cjkPos = [];
  let k = i + 1;
  while (k < end - 1) {
    const ch = s[k];
    if (ch === '\\' && k + 1 < end - 1) {
      const nx = s[k + 1];
      if (nx === 'u' && /^[0-9a-fA-F]{4}$/.test(s.slice(k + 2, k + 6))) {
        const cp = parseInt(s.slice(k + 2, k + 6), 16);
        const dec = String.fromCharCode(cp);
        if (CJK_TEST.test(dec)) cjkPos.push(k);
        value += dec; k += 6; continue;
      }
      const map = { b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' };
      const dec = map[nx] !== undefined ? map[nx] : nx;
      if (CJK_TEST.test(dec)) cjkPos.push(k);
      value += dec; k += 2; continue;
    }
    if (CJK_TEST.test(ch)) cjkPos.push(k);
    value += ch; k += 1;
  }
  return { quote: q, start: i, end, raw: s.slice(i, end), value, cjkPos };
}

/** 值区间 (tokenizer 版): 从 i 起按括号栈扫到同级 ',' 或闭合 */
function tokenValueRange(s, i) {
  let depth = 0, j = i;
  while (j < s.length) {
    const c = skipComment(s, j);
    if (c !== j) { j = c; continue; }
    const ch = s[j];
    const st = readString(s, j);
    if (st) { j = st.end; continue; }
    if (ch === '{' || ch === '[' || ch === '(') { depth++; j++; continue; }
    if (ch === '}' || ch === ']' || ch === ')') { if (depth === 0) return { start: i, end: j }; depth--; j++; continue; }
    if (depth === 0 && ch === ',') return { start: i, end: j };
    j++;
  }
  return { start: i, end: s.length };
}

/**
 * 前向键扫描: 返回原文中全部 `key:` 的键名与该冒号索引。
 * ★ 为什么不用「从冒号向左读」: 键名内可能含转义引号 (`"a\"b":`), 反向配对会错位
 *   —— 实测该方法在 en.json 的 `"hong-kong-printing-guide":` 上直接返回 null, 导致
 *      整个 JSON 定位失灵 (方法 B 第一版为零的根因之一)。改为正向读串/读标识符后
 *      再看下一个非空白字符是否 ':'; 三元 `x ? 'a' : b` 的 'a' 后面是 ':' 会被误当键,
 *      故额外要求冒号前一个非空白字符不是 '?' (排除三元形态)。
 */
function scanKeys(src) {
  const keys = [];
  let i = 0;
  while (i < src.length) {
    const c = skipComment(src, i);
    if (c !== i) { i = c; continue; }
    const st = readString(src, i);
    if (st) {
      let k = st.end;
      while (k < src.length && /\s/.test(src[k])) k++;
      if (src[k] === ':') {
        let prev = st.start - 1;
        while (prev >= 0 && /\s/.test(src[prev])) prev--;
        if (src[prev] !== '?') keys.push({ name: st.value, colon: k, keyStart: st.start });
      }
      i = st.end; continue;
    }
    const ch = src[i];
    if (/[A-Za-z_$]/.test(ch)) {
      let k = i;
      while (k < src.length && /[A-Za-z0-9_$]/.test(src[k])) k++;
      const name = src.slice(i, k);
      let k2 = k;
      while (k2 < src.length && /\s/.test(src[k2])) k2++;
      if (src[k2] === ':') {
        let prev = i - 1;
        while (prev >= 0 && /\s/.test(src[prev])) prev--;
        if (src[prev] !== '?') keys.push({ name, colon: k2, keyStart: i });
      }
      i = k; continue;
    }
    i++;
  }
  return keys;
}

/** 兼容旧调用: 从冒号位置反查键名 (一次性建表, 避免 O(n^2)) */
let __KEY_CACHE_SRC = null, __KEY_CACHE = null;
function keyTable(src) {
  if (__KEY_CACHE_SRC === src) return __KEY_CACHE;
  __KEY_CACHE_SRC = src; __KEY_CACHE = scanKeys(src);
  return __KEY_CACHE;
}
function readKeyBefore(s, colon) {
  const ks = keyTable(s);
  for (let i = ks.length - 1; i >= 0; i--) if (ks[i].colon === colon) return { name: ks[i].name, keyStart: ks[i].keyStart };
  return null;
}

/* ══════════════════ ① JSON 走访 (JSON.parse + 原文键序列定位) ══════════════════ */

/**
 * 在原文中按**键序列**定位某个 JSON 值的区间。
 * 做法: 对每一层, 用 tokenizer 在父区间内找到目标键, 取其值区间; 逐层下钻。
 * keys 形如 ['certificate-printing-guide','content']
 */
function locateJsonValue(src, keys) {
  // 键表 → 带值区间的条目 (一次构建, 供逐层下钻复用)
  const tbl = [];
  for (const k of keyTable(src)) {
    let v = k.colon + 1;
    while (v < src.length && /\s/.test(src[v])) v++;
    const st = readString(src, v);
    if (st && st.start === v) { tbl.push({ name: k.name, keyStart: k.keyStart, vStart: v, vEnd: st.end, container: false }); continue; }
    if (src[v] === '{' || src[v] === '[') {
      const r = tokenValueRange(src, v);
      tbl.push({ name: k.name, keyStart: k.keyStart, vStart: v, vEnd: r.end, container: true });
    }
  }
  let lo = 0, hi = src.length;
  let found = null;
  for (let n = 0; n < keys.length; n++) {
    const key = keys[n];
    const cands = tbl.filter(k => k.name === key && k.keyStart > lo && k.vStart >= lo && k.vEnd <= hi);
    if (!cands.length) return null;
    cands.sort((a, b) => a.keyStart - b.keyStart);
    const c = cands[0];
    if (n < keys.length - 1 && !c.container) return null;
    found = c;
    lo = c.vStart + 1;
    hi = c.vEnd - 1;
  }
  return found ? { start: found.vStart, end: found.vEnd } : null;
}

/** 在 [from,to) 内找 name===key 的 'key: value' (诊断用) */
function findKeyValueRange(src, from, to, key) {
  for (const k of keyTable(src)) {
    if (k.name !== key) continue;
    if (k.keyStart < from || k.keyStart >= to) continue;
    let v = k.colon + 1;
    while (v < src.length && /\s/.test(src[v])) v++;
    const st = readString(src, v);
    if (st && st.start === v) return { start: v, end: st.end };
    if (src[v] === '{' || src[v] === '[') { const r = tokenValueRange(src, v); return { start: v, end: r.end }; }
  }
  return null;
}

function jsonWalk(file) {
  const src = fs.readFileSync(P + file, 'utf8');
  const obj = JSON.parse(src);
  const recs = [];
  const byBucket = {};
  let chars = 0;

  const visit = (keys, value) => {
    if (typeof value === 'string') {
      const r = locateJsonValue(src, keys);
      if (!r) { recs.push({ file, field: keys[keys.length - 1], keys, error: '定位失败', chars: 0, lines: [], excerpt: '' }); return; }
      // ★ 用 readString 拿到「解码值 + CJK 原文索引」, 保证位置与值一致 (转义安全)
      const st = readString(src, r.start);
      if (!st || st.start !== r.start) { recs.push({ file, field: keys[keys.length - 1], keys, error: '非字符串值', chars: 0, lines: [], excerpt: '' }); return; }
      const text = st.value;
      const g = text.match(shared.CJK_G);
      if (!g) return;
      const pos = st.cjkPos;
      const fieldName = keys[keys.length - 1];
      const b = (function () {
        if (shared.isJsonLd(text)) return 'JSON-LD';
        return shared.FIELD_BUCKET.get(fieldName) || '其他';
      })();
      chars += g.length;
      byBucket[b] = (byBucket[b] || 0) + g.length;
      const lines = [...new Set(pos.map(p => src.slice(0, p).split('\n').length))].sort((a, b2) => a - b2);
      const ls = src.lastIndexOf('\n', pos[0] - 1) + 1;
      const le = src.indexOf('\n', pos[0]);
      recs.push({
        file, field: fieldName, keys: keys.join('.'), bucket: b,
        chars: g.length, charList: g.join(''), lines,
        excerpt: src.slice(ls, le < 0 ? src.length : le).trim().slice(0, 200),
        arrayElement: /\[\d+\]$/.test(keys.join('.')),
        valueSpan: [st.start + 1, st.end - 1],
      });
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => visit(keys.concat('[' + i + ']'), v));
    } else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) visit(keys.concat(k), v);
    }
  };
  for (const [k, v] of Object.entries(obj)) visit([k], v);
  return { chars, byBucket, recs };
}

/**
 * 取原文某字符串字面量内 CJK 字符的原文索引 (转义安全)。
 * 用 readString 的解码结果做长度一致断言, 不一致则抛错 (不静默给错位置)。
 */
function charPositionsInJsonString(src, start, decoded, wantCjk) {
  const st = readString(src, start);
  if (!st || st.start !== start) throw new Error('charPositionsInJsonString: 起始位置不是字符串字面量 @' + start);
  const g = st.value.match(shared.CJK_G) || [];
  if (g.length !== wantCjk) {
    throw new Error('charPositionsInJsonString: CJK 数不一致 (解码=' + g.length + ' 期望=' + wantCjk + ') @' + start);
  }
  return st.cjkPos;
}

/* ══════════════════ ② TS/TSX 括号栈解析 ══════════════════ */

/**
 * 扫出全部「locale 键 → 值区间」.
 * ★ 修正点 (v 上一版失败处之一): **别名键与直串写法都要覆盖**
 *   - 收集**所有** `key:` 对 (不预设键名白名单), 由调用方按 locale 键名筛;
 *   - 值可以是**字符串字面量** (`en: '...'`) 或容器 (`en: { ... }`), 两者都收。
 * 返回 [{locale, keyName, kind:'string'|'container', start, end, strStart, strEnd}]
 */
const LOCALE_KEYS = new Set(['en', 'ja', 'zh-hk']);

/** 键表 → 值区间 (一次建表, 供 localeBlocks / keyedStrings 复用) */
function valueEntries(src) {
  const out = [];
  for (const k of keyTable(src)) {
    let v = k.colon + 1;
    while (v < src.length && /\s/.test(src[v])) v++;
    const st = readString(src, v);
    if (st && st.start === v) {
      out.push({ name: k.name, keyStart: k.keyStart, kind: 'string', start: st.start + 1, end: st.end - 1 });
      continue;
    }
    if (src[v] === '{' || src[v] === '[') {
      const r = tokenValueRange(src, v);
      out.push({ name: k.name, keyStart: k.keyStart, kind: 'container', start: v, end: r.end });
    }
  }
  return out;
}

function localeBlocks(src) {
  return valueEntries(src)
    .filter(e => LOCALE_KEYS.has(e.name))
    .map(e => ({ locale: e.name, keyName: e.name, kind: e.kind, start: e.start, end: e.end, strStart: e.start - 1, strEnd: e.end + 1 }));
}

/** 全部 keyed 字符串 (与 locale 判定无关, 供字段归属) */
function keyedStrings(src) {
  return valueEntries(src)
    .filter(e => e.kind === 'string')
    .map(e => ({ name: e.name, keyStart: e.keyStart, strStart: e.start - 1, strEnd: e.end + 1 }));
}

/** 数组裸元素区间 (位于某个 `key: [` 容器内, 且其前一个非空白不是 ':') */
function bareArrayStrings(src) {
  const out = [];
  for (const a of valueEntries(src)) {
    if (a.kind !== 'container' || src[a.start] !== '[') continue;
    let j = a.start + 1;
    while (j < a.end - 1) {
      const c = skipComment(src, j);
      if (c !== j) { j = c; continue; }
      const s2 = readString(src, j);
      if (s2 && s2.start === j) {
        let p = j - 1;
        while (p >= 0 && /\s/.test(src[p])) p--;
        if (src[p] !== ':') out.push({ strStart: s2.start, strEnd: s2.end, listKey: a.name });
        j = s2.end; continue;
      }
      if (src[j] === '{' || src[j] === '[') { const r = tokenValueRange(src, j); j = r.end; continue; }
      j++;
    }
  }
  return out;
}

function tsScan(file) {
  const src = fs.readFileSync(P + file, 'utf8');
  const blocks = localeBlocks(src);
  const enBlocks = blocks.filter(b => b.locale === 'en');
  const keyed = keyedStrings(src);
  const bare = bareArrayStrings(src);
  const recs = [];
  const byBucket = {};
  let chars = 0;

  const inEn = (pos) => enBlocks.some(b => b.start <= pos && pos < b.end);

  // ① 逐 keyed 字符串: 其**全部** CJK 字符都在 en 块内才算入 (字符级精确)
  for (const ks of keyed) {
    const span = [ks.strStart + 1, ks.strEnd - 1];
    const v = src.slice(span[0], span[1]);
    const positions = charPositionsInJsonString(src, ks.strStart, v, (v.match(shared.CJK_G) || []).length);
    const inScope = positions.filter(p => inEn(p));
    if (!inScope.length) continue;
    const bucket = (function () {
      if (shared.isJsonLd(v)) return 'JSON-LD';
      return shared.FIELD_BUCKET.get(ks.name) || '其他';
    })();
    chars += inScope.length;
    byBucket[bucket] = (byBucket[bucket] || 0) + inScope.length;
    const lines = [...new Set(inScope.map(p => src.slice(0, p).split('\n').length))].sort((x, y) => x - y);
    const ls = src.lastIndexOf('\n', inScope[0] - 1) + 1;
    const le = src.indexOf('\n', ls);
    recs.push({
      file, field: ks.name, path: file.includes('blog-data') ? ks.name : ks.name, bucket,
      chars: inScope.length, charList: inScope.map(p => src[p]).join(''), lines,
      arrayElement: false,
      excerpt: src.slice(ls, le < 0 ? src.length : le).trim().slice(0, 200),
      valueSpan: span,
      isJsonLdInnerContent: bucket === 'JSON-LD',
    });
  }

  // ② 数组裸元素 (无键), 归属最近具名外层键 —— 若在 en 块内
  for (const bs of bare) {
    const span = [bs.strStart + 1, bs.strEnd - 1];
    const v = src.slice(span[0], span[1]);
    const positions = charPositionsInJsonString(src, bs.strStart, v, (v.match(shared.CJK_G) || []).length);
    const inScope = positions.filter(p => inEn(p));
    if (!inScope.length) continue;
    // 归属: 数组所在键 (listKey); 若其不在 FIELD_BUCKET, 再向外找最近的**具名**容器键
    let fname = bs.listKey;
    if (!shared.FIELD_BUCKET.has(fname)) {
      let best = null;
      for (const e of valueEntries(src)) {
        if (e.kind === 'container' && e.start <= bs.strStart && bs.strEnd <= e.end && shared.FIELD_BUCKET.has(e.name)) {
          if (!best || e.start > best.start) best = e;
        }
      }
      if (best) fname = best.name;
    }
    const bucket = shared.FIELD_BUCKET.get(fname) || '其他';
    chars += inScope.length;
    byBucket[bucket] = (byBucket[bucket] || 0) + inScope.length;
    const lines = [...new Set(inScope.map(p => src.slice(0, p).split('\n').length))].sort((x, y) => x - y);
    const ls = src.lastIndexOf('\n', inScope[0] - 1) + 1;
    const le = src.indexOf('\n', ls);
    recs.push({
      file, field: fname, path: fname + '[array]', bucket,
      chars: inScope.length, charList: inScope.map(p => src[p]).join(''), lines,
      arrayElement: true,
      excerpt: src.slice(ls, le < 0 ? src.length : le).trim().slice(0, 200),
      valueSpan: span,
    });
  }

  // 去重 (同 file:line:charList 同 span)
  const seen = new Set();
  const dedup = recs.filter(r => {
    const k = r.file + '|' + r.valueSpan[0] + '|' + r.bucket;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
  const outByBucket = {};
  let outChars = 0;
  for (const r of dedup) { outChars += r.chars; outByBucket[r.bucket] = (outByBucket[r.bucket] || 0) + r.chars; }
  return { chars: outChars, byBucket: outByBucket, recs: dedup };
}

/** 与 charPositionsInJsonString 同族, 但用于 JS 风格字符串 */
function charPositionsInJsLike(src, start, decoded, wantCjk) { return charPositionsInJsonString(src, start, decoded, wantCjk); }
function charPositionsInTsString(src, start, decoded, wantCjk) { return charPositionsInJsonString(src, start, decoded, wantCjk); }

/* ══════════════════ 主流程 ══════════════════ */
const all = [];
const fileStat = {};
for (const rel of FILES) {
  let r;
  try {
    r = rel.endsWith('.json') ? jsonWalk(rel) : tsScan(rel);
  } catch (e) {
    r = { chars: 0, byBucket: {}, recs: [], error: e.message };
    console.error('★ ' + rel + ' 解析失败: ' + e.message);
  }
  fileStat[rel] = { chars: r.chars, byBucket: r.byBucket, entries: new Set(r.recs.map(x => x.file + ':' + ((x.lines && x.lines[0]) || 0))).size, values: r.recs.length };
  all.push(...r.recs);
}

// content 档 rendersChineseFAQ
const byVal = new Map();
for (const r of all) {
  if (r.bucket !== 'content' || !r.valueSpan) continue;
  const k = r.file + '|' + r.valueSpan[0];
  byVal.set(k, r);
}
const faqVals = [];
for (const [k, r] of byVal) {
  const src = fs.readFileSync(P + r.file, 'utf8');
  const v = src.slice(r.valueSpan[0], r.valueSpan[1]);
  const verdict = shared.rendersChineseFAQ(v, r.charList);
  if (verdict.render) {
    r.rendersChineseFAQ = true;
    faqVals.push({ file: r.file, field: r.field, lines: r.lines, chars: r.chars, reason: verdict.reason });
  }
}
// 白名单标记
for (const r of all) {
  if (!r.lines) r.lines = [];
  if (!r.excerpt) r.excerpt = '';
  const wl = shared.whitelistMatch(r.file, r.lines[0], r.excerpt);
  if (wl.length) r.whitelist = wl.map(w => w.id + '(' + w.kind + ')');
}

const totals = {};
for (const r of all) {
  const t = totals[r.bucket] = totals[r.bucket] || { chars: 0, entries: new Set(), values: 0 };
  t.chars += r.chars;
  t.values++;
  t.entries.add(r.file + ':' + r.lines[0]);
}
const summary = {
  method: 'B',
  authority: 'en 语系值结构化解析 (locale 键作用域; 别名键按语系归属, 不按字段名猜测)',
  files: fileStat,
  totals: {},
  grand: { chars: 0 },
  rendersChineseFAQ: { chars: all.filter(r => r.bucket === 'content' && r.rendersChineseFAQ).reduce((a, r) => a + r.chars, 0), values: faqVals.length, detail: faqVals },
  records: all,
};
for (const [b, t] of Object.entries(totals)) summary.totals[b] = { chars: t.chars, entryCount: t.entries.size, valueCount: t.values };
for (const v of Object.values(fileStat)) summary.grand.chars += v.chars;
fs.writeFileSync(P + '.hermes/_probe-pb/_methodB-result.json', JSON.stringify(summary, null, 1), 'utf8');

console.log('=== 方法 B: 结构化解析 (en 值对象 → 字段 → CJK) ===\n');
console.log('file'.padEnd(50) + '字符  值数  条目数');
for (const [f, v] of Object.entries(fileStat)) {
  console.log(f.padEnd(50) + String(v.chars).padEnd(6) + String(v.values).padEnd(6) + v.entries);
}
console.log('\n档位汇总 (方法 B):');
for (const b of shared.BUCKETS) {
  const t = summary.totals[b] || { chars: 0, entryCount: 0, valueCount: 0 };
  console.log('  ' + b.padEnd(14) + String(t.chars).padEnd(8) + '条目=' + t.entryCount + '  值=' + t.valueCount);
}
console.log('  ' + '合计'.padEnd(14) + summary.grand.chars);
console.log('\nrendersChineseFAQ: true 字符数 = ' + summary.rendersChineseFAQ.chars + ' / 值 = ' + summary.rendersChineseFAQ.values);
for (const d of summary.rendersChineseFAQ.detail) console.log('   · ' + d.file + ' field=' + d.field + ' lines=' + d.lines.join(',') + ' chars=' + d.chars + ' | ' + d.reason);
