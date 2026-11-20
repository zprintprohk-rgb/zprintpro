'use strict';
/** 只讀: 列舉門童 #4 的 legacyRed (既有內向窄集 red, 永不進基線) 全量命中 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));
const common = require(path.join(ROOT, 'scripts', 'guards', 'common.js'));
const files = common.collectFiles(path.join(ROOT, 'src')).filter(f => !common.isExemptPath(f));
let n = 0;
for (const f of files) {
  let c; try { c = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of guard.scanBidirectional(c, f)) {
    if (!h.legacyRed) continue;
    n++;
    const line = c.split('\n')[h.line - 1].trim();
    console.log(`${h.file}:${h.line} [${h.char}] locale=${(h.match.match(/locale=([a-z-]+)/) || [])[1]}\n    ${line.length > 160 ? line.slice(0, 160) + ' …' : line}`);
  }
}
console.log('legacyRed 命中數: ' + n);
