'use strict';
/**
 * 口径冲突量化: 门童 #4 裸扫 (scanBidirectional, 结构化值作用域) vs common.resolveLocale (最近左侧 locale 键)
 * 对象 = 命中 CJK 的字符; 只读。
 */
const fs = require('fs');
const path = require('path');
const P = 'F:/zprintpro-nextjs/';
const guard = require(P + 'scripts/guards/i18n-guard.js');
const common = require(P + 'scripts/guards/common.js');

const files = common.collectFiles(path.join(P, 'src')).filter(f => !common.isExemptPath(f));
const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff]/g;

const rows = [];
let tGuardEn = 0, tResolveEn = 0;
for (const abs of files) {
  const c = fs.readFileSync(abs, 'utf8');
  const rel = path.relative(P, abs).replace(/\\/g, '/');

  // A) 门童裸扫口径
  const guardHits = guard.scanBidirectional(c, abs);
  const gEn = guardHits.filter(h => h.ruleId === 'I18N_POLLUTION_EN').length;

  // B) resolveLocale 口径: 文件中每个 CJK 字符
  let rEn = 0;
  const gOnly = new Map();     // 门童 en, resolveLocale 非 en
  const rOnly = new Map();     // resolveLocale en, 门童非 en
  CJK_RE.lastIndex = 0;
  let m;
  const perChar = [];
  while ((m = CJK_RE.exec(c)) !== null) {
    const loc = common.resolveLocale(c, m.index, abs);
    const isEn = loc === 'en';
    if (isEn) rEn++;
    perChar.push({ idx: m.index, ch: m[0], isEn });
  }
  // 门童 en 命中的位置集合
  const gSet = new Set(guardHits.filter(h => h.ruleId === 'I18N_POLLUTION_EN').map(h => {
    // 用 line+char 近似 -> 改为重新定位: 门童未给 index, 用行内逐字匹配
    return h.line + '|' + h.char + '|' + h.match;
  }));
  tGuardEn += gEn; tResolveEn += rEn;
  rows.push({ rel, gEn, rEn, chars: perChar.length });

  if (gEn !== rEn) {
    // 细化: 找 resolveLocale 判 en 但门童不判 en 的位置 (前 5 例)
    const perLine = new Map();
    for (const p of perChar) {
      if (!p.isEn) continue;
      const ln = common.findLineNumber(c, p.idx);
      perLine.set(ln, (perLine.get(ln) || 0) + 1);
    }
    const guardLines = new Map();
    for (const h of guardHits) {
      if (h.ruleId !== 'I18N_POLLUTION_EN') continue;
      guardLines.set(h.line, (guardLines.get(h.line) || 0) + 1);
    }
    const extra = [];
    for (const [ln, n] of perLine) {
      const gn = guardLines.get(ln) || 0;
      if (n > gn) extra.push({ ln, n, gn });
    }
    rows[rows.length - 1].extra = extra.slice(0, 12);
    rows[rows.length - 1].extraTotal = extra.reduce((a, b) => a + (b.n - b.gn), 0);
  }
}

console.log('file'.padEnd(56) + '门童EN  resolveLocaleEN   差');
for (const r of rows) {
  if (r.gEn === 0 && r.rEn === 0) continue;
  const d = r.rEn - r.gEn;
  console.log(r.rel.padEnd(56) + String(r.gEn).padEnd(9) + String(r.rEn).padEnd(16) + (d === 0 ? '=' : d));
  if (r.extra) console.log('      差额行 (行:resolveLocale数/门童数) ' + r.extra.map(e => e.ln + ':' + e.n + '/' + e.gn).join('  ') + '  Σ差=' + r.extraTotal);
}
console.log('\n= 全 src/ 合计: 门童EN=' + tGuardEn + '  resolveLocaleEN=' + tResolveEn + '  差=' + (tResolveEn - tGuardEn));
