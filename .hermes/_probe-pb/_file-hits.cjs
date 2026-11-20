'use strict';
/** 只讀: 列出指定檔的門童 #4 全量命中 (含 legacyRed 標記) */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));
for (const rel of process.argv.slice(2)) {
  const f = path.join(ROOT, rel);
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  console.log('=== ' + rel);
  for (const h of guard.scanBidirectional(c, f)) {
    const t = lines[h.line - 1].trim();
    console.log(`  ${h.line} [${h.char}] ${h.ruleId} legacyRed=${!!h.legacyRed}\n      ${t.length > 150 ? t.slice(0, 150) + ' …' : t}`);
  }
}
