'use strict';
/**
 * .hermes/_probe-pb/diag-resolveLocale-only.cjs
 * 逐条列出 8 档内「resolveLocale 判 en 但门童结构化作用域不认」的字符 (即本清单排除的假阳性)。
 * 只读。输出 _resolveOnly.json 供对账脚本并入报告。
 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const common = require(P + 'scripts/guards/common.js');
const guard = require(P + 'scripts/guards/i18n-guard.js');

const FILES = [
  'src/data/blog-data/en.json', 'src/data/category-seo-content.ts', 'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts', 'src/app/[locale]/payment-methods/page.tsx',
  'src/components/layout/Footer.tsx', 'src/app/[locale]/category/[slug]/page.tsx', 'src/data/blog-posts.ts',
];
const CJK_G = /[\u3400-\u4dbf\u4e00-\u9fff]/g;

function guardPositions(text, abs) {
  const set = new Set();
  const hits = guard.scanBidirectional(text, abs).filter(h => h.ruleId === 'I18N_POLLUTION_EN');
  const want = new Map();
  for (const h of hits) {
    if (!want.has(h.line)) want.set(h.line, new Map());
    want.get(h.line).set(h.char, (want.get(h.line).get(h.char) || 0) + 1);
  }
  const lineStarts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') lineStarts.push(i + 1);
  for (const [line, mm] of want) {
    const ls = lineStarts[line - 1], le = line < lineStarts.length ? lineStarts[line] : text.length;
    if (ls === undefined) continue;
    const seen = new Map();
    for (let i = ls; i < le; i++) {
      const ch = text[i], need = mm.get(ch) || 0;
      if (!need) continue;
      const got = seen.get(ch) || 0;
      if (got >= need) continue;
      seen.set(ch, got + 1); set.add(i);
    }
  }
  return set;
}

/** 判断某行是否处于注释体内 (与门童/方法 A 同族的词法段判定, 保证一致) */
function commentStateAt(text, lineIdx) {
  const before = text.split('\n').slice(0, lineIdx).join('\n');
  let i = 0, inBlock = false;
  while (i < before.length) {
    const ch = before[i];
    // 跳过字符串字面量 (其中的 /* 或 // 不是注释)
    if (ch === '"' || ch === "'" || ch === '`') {
      const q = ch; let j = i + 1;
      while (j < before.length) {
        if (before[j] === '\\') { j += 2; continue; }
        if (before[j] === q) break;
        if (before[j] === '\n' && q !== '`') break;
        j++;
      }
      i = j + 1; continue;
    }
    if (!inBlock && ch === '/' && before[i + 1] === '/') { const e = before.indexOf('\n', i); i = e < 0 ? before.length : e; continue; }
    if (!inBlock && ch === '/' && before[i + 1] === '*') { inBlock = true; i += 2; continue; }
    if (inBlock && ch === '*' && before[i + 1] === '/') { inBlock = false; i += 2; continue; }
    i++;
  }
  return inBlock;
}

const out = { total: 0, files: {}, records: [] };
for (const rel of FILES) {
  const abs = P + rel;
  const text = fs.readFileSync(abs, 'utf8');
  const gSet = guardPositions(text, abs);
  const lines = text.split('\n');
  let n = 0;
  CJK_G.lastIndex = 0;
  let m;
  while ((m = CJK_G.exec(text)) !== null) {
    const idx = m.index;
    if (gSet.has(idx)) continue;
    if (common.resolveLocale(text, idx, abs) !== 'en') continue;
    const ln = common.findLineNumber(text, idx);
    const t = (lines[ln - 1] || '').trim();
    const kind = t.startsWith('//') ? '行注释'
      : (t.startsWith('/*') || t.startsWith('*') || t.startsWith('{/*') || /^\{\/\*/.test(t) || commentStateAt(text, ln - 1)) ? '块/JSX 注释'
        : '代码(非注释行)';
    n++;
    out.records.push({ file: rel, line: ln, char: m[0], kind, excerpt: t.slice(0, 150) });
  }
  if (n) {
    const byLine = new Map();
    for (const r of out.records.filter(r => r.file === rel)) {
      if (!byLine.has(r.line)) byLine.set(r.line, { line: r.line, chars: [], kind: r.kind, excerpt: r.excerpt });
      byLine.get(r.line).chars.push(r.char);
    }
    out.files[rel] = { chars: n, lines: [...byLine.values()].map(v => ({ line: v.line, chars: v.chars.join(''), kind: v.kind, excerpt: v.excerpt })) };
  }
  out.total += n;
}
fs.writeFileSync(P + '.hermes/_probe-pb/_resolveOnly.json', JSON.stringify(out, null, 1), 'utf8');
console.log('8 档内 resolveLocale 独有 (门童不认) 字符数 = ' + out.total);
for (const [f, v] of Object.entries(out.files)) console.log('  ' + f + '  ' + v.chars + ' 字 / ' + v.lines.length + ' 行');
for (const r of out.records) console.log('   L' + r.line + ' [' + r.kind + '] ' + r.char + '  | ' + r.excerpt.slice(0, 110));
