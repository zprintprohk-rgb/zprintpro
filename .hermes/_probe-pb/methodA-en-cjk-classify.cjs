'use strict';
/**
 * .hermes/_probe-pb/methodA-en-cjk-classify.cjs
 * ============================================================================
 * 方法 A —— 「字符位 → 字段」反查法 (实现 #1, 独立)
 *
 * 口径 (K3 唯一权威, 不新造第二套 locale 判定):
 *   「哪些字符属于 en 语系值」= scripts/guards/common.js resolveLocale()
 *   + 门童 #4 i18n-guard.js 的**结构化值作用域** (buildLocaleScopes/attrLocale)。
 *   本脚本对**每一个 CJK 字符**同时算出两个判定:
 *     · resolveEn  = resolveLocale(text, idx, file) === 'en'
 *     · guardEn    = 落在门童扫描的 en 值作用域内 (由 scanBidirectional 命中重建)
 *   统计分列输出 (A  = resolveEn ∪ guardEn / A' = guardEn 基线口径), **不静默合并**。
 *
 * 实现路径 (与方法 B 刻意不同):
 *   ① 单字符扫描 CJK;
 *   ② 反查该字符位落在哪个**字段值区间**内 —— 由独立实现的
 *      「词法段 + 容器配平」定位器给出 (键名起点表 + 值区间表), 数组裸元素
 *      回溯到最近的**具名**外层字段;
 *   ③ 字段名 → 6 档 (JSON-LD 优先, 保证互斥);
 *   ④ 每个 content 值聚合判定 rendersChineseFAQ 布尔子标记;
 *   ⑤ 白名单候选 (K3 已批 4 行) 跨档标记。
 *   ⇒ 方法 A **不做结构化 parse** (不 JSON.parse, 不建 AST), 纯位置算术。
 *
 * 只读: 不改任何生产文件。
 * ============================================================================
 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const common = require(P + 'scripts/guards/common.js');
const guard = require(P + 'scripts/guards/i18n-guard.js');
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
const QUOTES = new Set(['"', "'", BACKTICK]);

/* ───────── 词法段 ───────── */
function lexSpans(text, isJson) {
  const spans = [];
  const n = text.length;
  let i = 0;
  while (i < n) {
    const a = text[i], b = text[i + 1];
    if (!isJson && a === '/' && b === '/') {
      let e = text.indexOf('\n', i); if (e < 0) e = n;
      spans.push({ type: 'comment', start: i, end: e, text: text.slice(i, e) }); i = e; continue;
    }
    if (!isJson && a === '/' && b === '*') {
      const f = text.indexOf('*/', i + 2); const e = f < 0 ? n : f + 2;
      spans.push({ type: 'comment', start: i, end: e, text: text.slice(i, e) }); i = e; continue;
    }
    if (QUOTES.has(a)) {
      let j = i + 1;
      while (j < n) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === a) break;
        if (text[j] === '\n' && a !== BACKTICK) break;
        j++;
      }
      const e = Math.min(j + 1, n);
      spans.push({ type: 'string', quote: a, start: i, end: e, text: text.slice(i, e) });
      i = e; continue;
    }
    i++;
  }
  spans.sort((x, y) => x.start - y.start);
  return spans;
}

function spanAt(spans, idx) {
  let lo = 0, hi = spans.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, s = spans[mid];
    if (idx < s.start) hi = mid - 1;
    else if (idx >= s.end) lo = mid + 1;
    else return s;
  }
  return null;
}

function firstNonWs(text, i, to) { while (i < to && /\s/.test(text[i])) i++; return i; }

/** 从冒号位置向左解析键名 */
function keyNameBefore(text, colonIdx, spans) {
  let p = colonIdx - 1;
  while (p >= 0 && /\s/.test(text[p])) p--;
  if (p < 0) return null;
  let name = null, keyStart = -1;
  if (QUOTES.has(text[p])) {
    const sp = spanAt(spans, p);
    if (sp && sp.end === p + 1) {
      const inner = sp.text.slice(1, -1);
      if (/^[A-Za-z_\x24][A-Za-z0-9_\x24]*$/.test(inner)) { name = inner; keyStart = p + 1; }
    }
  } else if (/[A-Za-z0-9_\x24]/.test(text[p])) {
    let q = p;
    while (q >= 0 && /[A-Za-z0-9_\x24]/.test(text[q])) q--;
    const cand = text.slice(q + 1, p + 1);
    if (/^[A-Za-z_\x24][A-Za-z0-9_\x24]*$/.test(cand)) { name = cand; keyStart = q + 1; }
  }
  if (name === null) return null;
  let r = keyStart - 1;
  while (r >= 0 && /\s/.test(text[r])) r--;
  if (text[r] === '?' || text[r] === ')') return null;   // 三元 / 类型注解
  return { name, keyStart };
}

/** 全深度收键 (文件根: TS 根是程序, 非容器) */
function scanAllKeysIn(text, from, to, spans) {
  const keys = [];
  let i = from;
  while (i < to) {
    const s = spanAt(spans, i);
    if (s) { i = s.end; continue; }
    if (text[i] === ':') {
      const k = keyNameBefore(text, i, spans);
      if (k) keys.push({ name: k.name, keyStart: k.keyStart, colon: i, valueStart: i + 1 });
    }
    i++;
  }
  return keys;
}

/** 起始层级收键 (容器内部) */
function scanKeysIn(text, from, to, spans) {
  const keys = [];
  let i = from, depth = 0;
  while (i < to) {
    const s = spanAt(spans, i);
    if (s) { i = s.end; continue; }
    const c = text[i];
    if (c === '{' || c === '[' || c === '(') { depth++; i++; continue; }
    if (c === '}' || c === ']' || c === ')') { depth--; if (depth < 0) break; i++; continue; }
    if (c === ':' && depth === 0) {
      const k = keyNameBefore(text, i, spans);
      if (k) keys.push({ name: k.name, keyStart: k.keyStart, colon: i, valueStart: i + 1 });
    }
    i++;
  }
  return keys;
}

function valueRange(text, valueStart, spans) {
  const n = text.length;
  let i = valueStart;
  while (i < n && /\s/.test(text[i])) i++;
  const start = i;
  let depth = 0, j = i;
  while (j < n) {
    const s = spanAt(spans, j);
    if (s && s.start === j) { j = s.end; continue; }
    const c = text[j];
    if (c === '{' || c === '[' || c === '(') { depth++; j++; continue; }
    if (c === '}' || c === ']' || c === ')') { if (depth === 0) return { start, end: j }; depth--; j++; continue; }
    if (depth === 0 && c === ',') return { start, end: j };
    j++;
  }
  return { start, end: n };
}

/**
 * 收集全部「具名字段值区间」(叶子 = 字符串; 容器也记录, 供回溯)
 * 同时记录每个区间的**外层具名字段**链 (供数组裸元素回溯)
 */
function collectFields(text, spans) {
  const fields = [];
  const seen = new Set();
  const pushKey = (k, queue, owner) => {
    const vr = valueRange(text, k.valueStart, spans);
    const s0 = firstNonWs(text, vr.start, vr.end);
    if (s0 >= vr.end) return;
    const sig = k.keyStart + '@' + s0;
    if (seen.has(sig)) return;
    seen.add(sig);
    const first = text[s0];
    const sp = spanAt(spans, s0);
    const isStr = QUOTES.has(first) && sp && sp.start === s0;
    const rec = {
      name: k.name, keyStart: k.keyStart, valStart: vr.start, valEnd: vr.end,
      kind: isStr ? 'string' : 'container',
      strStart: isStr ? s0 : -1,
      strEnd: isStr ? sp.end : -1,
      owner,      // 外层最近具名字段名 (容器递归时传递)
    };
    fields.push(rec);
    if (!isStr && (first === '{' || first === '[')) queue.push([s0 + 1, Math.max(s0 + 1, vr.end - 1), k.name]);
  };
  const queue = [];
  for (const k of scanAllKeysIn(text, 0, text.length, spans)) pushKey(k, queue, null);
  let g = 0;
  while (queue.length && g++ < 500000) {
    const [a, b, owner] = queue.shift();
    for (const k of scanKeysIn(text, a, b, spans)) pushKey(k, queue, owner);
  }
  return fields;
}

/** 反查: idx 所属**字符串**字段 (全部候选, 取最内层 = keyStart 最大者) */
function fieldAt(fields, idx) {
  let best = null;
  for (const f of fields) {
    if (f.kind !== 'string') continue;
    if (f.strStart <= idx && idx < f.strEnd) {
      if (!best || f.keyStart >= best.keyStart) best = f;
    }
  }
  return best;
}

function bucketOf(fieldName, fullValue) {
  if (fullValue != null && shared.isJsonLd(fullValue)) return 'JSON-LD';
  const b = shared.FIELD_BUCKET.get(fieldName);
  return b || '其他';
}

/* ───────── 门童值作用域命中重建 (line + char -> 字符位) ───────── */
function guardEnPositions(text, abs) {
  const set = new Set();
  const hits = guard.scanBidirectional(text, abs).filter(h => h.ruleId === 'I18N_POLLUTION_EN');
  const want = new Map();
  for (const h of hits) {
    if (!want.has(h.line)) want.set(h.line, new Map());
    const mm = want.get(h.line);
    mm.set(h.char, (mm.get(h.char) || 0) + 1);
  }
  const lineStarts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') lineStarts.push(i + 1);
  for (const [line, mm] of want) {
    const ls = lineStarts[line - 1];
    const le = line < lineStarts.length ? lineStarts[line] : text.length;
    if (ls === undefined) continue;
    const seen = new Map();
    for (let i = ls; i < le; i++) {
      const ch = text[i];
      const need = mm.get(ch) || 0;
      if (!need) continue;
      const got = seen.get(ch) || 0;
      if (got >= need) continue;
      seen.set(ch, got + 1);
      set.add(i);
    }
  }
  return set;
}

/* ───────── 主流程 ───────── */
const all = [];
const fileStat = {};
for (const rel of FILES) {
  const abs = P + rel;
  const text = fs.readFileSync(abs, 'utf8');
  const isJson = rel.endsWith('.json');
  const spans = lexSpans(text, isJson);
  const fields = collectFields(text, spans);
  const gSet = guardEnPositions(text, abs);

  // ── 逐字符 ──
  let resolveEn = 0, guardEn = 0, union = 0;
  const byBucket = {}, byBucketGuard = {};
  const recs = [];
  shared.CJK_G.lastIndex = 0;
  let m;
  while ((m = shared.CJK_G.exec(text)) !== null) {
    const idx = m.index;
    const span = spanAt(spans, idx);
    if (!span || span.type !== 'string') continue;
    const isRes = common.resolveLocale(text, idx, abs) === 'en';
    const isG = gSet.has(idx);
    if (isRes) resolveEn++;
    if (isG) guardEn++;
    if (!isRes && !isG) continue;   // 既非 resolveLocale 认的 en, 也非门童认的 en 值 -> 不属本清单
    union++;

    const f = fieldAt(fields, idx);
    const fieldName = f ? f.name : (ownerFallback(fields, idx) || '<no-field>');
    const arrElem = isArrayElement(text, spans, idx);
    const fullVal = f ? text.slice(f.strStart + 1, Math.max(f.strStart + 1, f.strEnd - 1)) : '';
    const b = bucketOf(fieldName, fullVal);
    byBucket[b] = (byBucket[b] || 0) + 1;
    if (isG) byBucketGuard[b] = (byBucketGuard[b] || 0) + 1;
    const line = common.findLineNumber(text, idx);
    const ls = text.lastIndexOf('\n', idx - 1) + 1;
    const le0 = text.indexOf('\n', idx);
    const lineText = text.slice(ls, le0 < 0 ? text.length : le0);
    recs.push({
      file: rel, line, col: idx - ls + 1, char: m[0], bucket: b, field: fieldName,
      arrayElement: arrElem,
      resolveEn: isRes, guardEn: isG,
      jsonLd: b === 'JSON-LD',
      valueKey: f ? (f.keyStart + '') : null,
      valueSpan: f ? [f.strStart + 1, f.strEnd - 1] : null,
      excerpt: lineText.trim().slice(0, 200),
    });
  }

  // ── content 值的 rendersChineseFAQ 子标记 (按值聚合; 用**解码后**的值文本判定) ──
  const byValue = new Map();
  for (const r of recs) {
    if (r.bucket !== 'content' || !r.valueSpan) continue;
    const k = r.valueSpan[0] + ':' + r.valueSpan[1];
    if (!byValue.has(k)) byValue.set(k, { file: rel, span: r.valueSpan, chars: [], lines: new Set(), field: r.field });
    const e = byValue.get(k);
    e.chars.push(r.char); e.lines.add(r.line);
  }
  const faqValues = [];
  for (const [k, e] of byValue) {
    // 解码: JSON 串的 \" \\ \n 等必须还原, 否则 FAQ 结构标记匹配不到 (方法 B 同法)
    const rawv = text.slice(e.span[0], e.span[1]);
    const v = rawv.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (mm, esc) => {
      if (esc[0] === 'u') return String.fromCharCode(parseInt(esc.slice(1), 16));
      const map = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '"': '"', "'": "'", '/': '/', '\\': '\\' };
      return map[esc] !== undefined ? map[esc] : esc;
    });
    const verdict = shared.rendersChineseFAQ(v, e.chars.join(''));
    if (verdict.render) {
      faqValues.push({ file: rel, field: e.field, lines: [...e.lines].sort((a, b) => a - b), chars: e.chars.length, reason: verdict.reason });
      for (const r of recs) {
        if (r.valueSpan && (r.valueSpan[0] + ':' + r.valueSpan[1]) === k) r.rendersChineseFAQ = true;
      }
    }
  }
  // ── 白名单候选标记 (跨档) ──
  for (const r of recs) {
    const wl = shared.whitelistMatch(r.file, r.line, r.excerpt);
    if (wl.length) r.whitelist = wl.map(w => w.id + '(' + w.kind + ')');
  }

  fileStat[rel] = { resolveEn, guardEn, union, byBucket, byBucketGuard, faqValues, fields: fields.length };
  all.push(...recs);
}

/** 数组裸元素回溯: 用容器 owner 链给出最近具名字段名 */
function ownerFallback(fields, idx) {
  let best = null;
  for (const f of fields) {
    if (f.kind !== 'container') continue;
    if (f.valStart <= idx && idx < f.valEnd) {
      if (!best || f.keyStart >= best.keyStart) best = f;
    }
  }
  return best ? best.name : null;
}
/** 是否数组裸元素: 该字符所在字符串的起点前一个有效字符是 '[' 或 ',' 且不在 key: 之后 */
function isArrayElement(text, spans, idx) {
  const sp = spanAt(spans, idx);
  if (!sp) return false;
  let p = sp.start - 1;
  while (p >= 0 && /\s/.test(text[p])) p--;
  if (p < 0) return false;
  if (text[p] === '[') return true;
  if (text[p] === ',') {
    // 上一个兄弟也是裸元素? -> 看它前面是不是 ':' 结构
    return true;
  }
  return false;
}

/* ───────── 输出 ───────── */
const totals = {};
for (const r of all) {
  const t = totals[r.bucket] = totals[r.bucket] || { union: 0, guard: 0, resolveOnly: 0, entries: new Set() };
  t.union++;
  if (r.guardEn) t.guard++; else t.resolveOnly++;
  if (!r.arrayElement) t.entries.add(r.file + ':' + r.line);
}
const summary = {
  method: 'A',
  authority: 'common.resolveLocale() ∪ i18n-guard.scanBidirectional() 值作用域',
  files: fileStat,
  totals: {},
  grand: { resolveEn: 0, guardEn: 0, union: 0 },
};
for (const [b, t] of Object.entries(totals)) {
  summary.totals[b] = { chars: t.union, charsGuardBaseline: t.guard, charsResolveOnly: t.resolveOnly, entryCount: t.entries.size };
}
for (const v of Object.values(fileStat)) {
  summary.grand.resolveEn += v.resolveEn; summary.grand.guardEn += v.guardEn; summary.grand.union += v.union;
}
// content 档 rendersChineseFAQ 汇总
const faqTrue = all.filter(r => r.bucket === 'content' && r.rendersChineseFAQ);
summary.rendersChineseFAQ = {
  chars: faqTrue.length,
  values: [...new Set(faqTrue.map(r => r.file + ' L' + r.line))].length,
  detail: Object.values(fileStat).flatMap(v => v.faqValues),
};
summary.records = all;
fs.writeFileSync(P + '.hermes/_probe-pb/_methodA-result.json', JSON.stringify(summary, null, 1), 'utf8');

console.log('=== 方法 A: 逐字符 resolveLocale ∪ 门童值作用域 + 字段反查 ===\n');
console.log('file'.padEnd(50) + 'resolveEn  guardEn  union  交集');
for (const [f, v] of Object.entries(fileStat)) {
  console.log(f.padEnd(50) + String(v.resolveEn).padEnd(11) + String(v.guardEn).padEnd(9) + String(v.union).padEnd(7) +
    (v.resolveEn + v.guardEn - v.union));
}
console.log('\n档位汇总:');
console.log('  档位'.padEnd(16) + '字符(union)  门童基线口径  resolveLocale独有  条目数(file:line)');
for (const b of shared.BUCKETS) {
  const t = summary.totals[b] || { chars: 0, charsGuardBaseline: 0, charsResolveOnly: 0, entryCount: 0 };
  console.log('  ' + b.padEnd(14) + String(t.chars).padEnd(13) + String(t.charsGuardBaseline).padEnd(15) + String(t.charsResolveOnly).padEnd(20) + t.entryCount);
}
const gt = Object.values(summary.totals).reduce((a, t) => ({ c: a.c + t.chars, g: a.g + t.charsGuardBaseline, e: a.e + t.entryCount }), { c: 0, g: 0, e: 0 });
console.log('  ' + '合计'.padEnd(14) + String(gt.c).padEnd(13) + String(gt.g).padEnd(15) + String(gt.c - gt.g).padEnd(20) + gt.e);
console.log('\nrendersChineseFAQ (content 档子标记): true 字符数 = ' + summary.rendersChineseFAQ.chars +
  ' / 涉及值 = ' + summary.rendersChineseFAQ.values);
for (const d of summary.rendersChineseFAQ.detail) console.log('   · ' + d.file + ' field=' + d.field + ' lines=' + d.lines.join(',') + ' chars=' + d.chars);
const wl = all.filter(r => r.whitelist);
const wlAgg = {};
for (const r of wl) { const k = r.whitelist.join(',') + ' | ' + r.file + ':' + r.line + ' | ' + r.field; wlAgg[k] = (wlAgg[k] || 0) + 1; }
console.log('\n白名单候选 (跨档标记) 命中:');
for (const [k, n] of Object.entries(wlAgg)) console.log('   ' + k + ' => ' + n + ' 字');
