'use strict';
/** 定位 CRED_HEIDELBERG 红项的具体档/行 (只读) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const { execSync } = require('child_process');

// 只扫 staged + 工作区改动档 (推断门禁扫描面)
const staged = execSync('git diff --cached --name-only', { cwd: REPO, encoding: 'utf8' }).split('\n').filter(Boolean);
console.log('staged 档:', staged.length);

const cred = require(path.join(REPO, 'scripts', 'guards', 'credibility-guard.js'));
const RULE = cred.RULES.find(r => r.id === 'CRED_HEIDELBERG');
console.log('CRED_HEIDELBERG pattern:', RULE.pattern.source, '| severity:', RULE.severity);

for (const rel of staged) {
  const p = path.join(REPO, rel);
  if (!fs.existsSync(p)) continue;
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split('\n');
  const hits = [];
  lines.forEach((L, i) => {
    RULE.pattern.lastIndex = 0;
    const m = L.match(RULE.pattern);
    if (m) hits.push({ line: i + 1, n: m.length, text: L.trim().slice(0, 130) });
  });
  if (hits.length) {
    console.log(`\n### ${rel} — ${hits.length} 行命中 ###`);
    hits.slice(0, 8).forEach(h => console.log(`  L${h.line} ×${h.n}: ${h.text}`));
  }
}

console.log('\n=== 判定 CRED_HEIDELBERG 是否可豁免 ===');
console.log('  isExemptPath(.hermes/logs/x.md) =', common.isExemptPath(path.join(REPO, '.hermes/logs/2026-09-19-etsy-wording-card.md')));
console.log('  isNonExemptRule(CRED_HEIDELBERG) =', common.isNonExemptRule('CRED_HEIDELBERG'));
console.log('  => 即使 .hermes/logs/ 属 EXEMPT_PATHS, 该规则仍强制扫描 (设计如此: 防 SOP 文档误植假数据)');
