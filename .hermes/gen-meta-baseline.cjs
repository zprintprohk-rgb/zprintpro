/** P0-1: 生成门童 #20 专用基线 (K3 决策 3-B: 只许递减, 每批报剩余数) */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const g = require(path.join(ROOT, 'scripts/guards/meta-description-guard.js'));
const hits = g.scan([]);
const perFile = {};
for (const h of hits) perFile[h.file] = (perFile[h.file] || 0) + 1;
const out = {
  guard: 'META_DESCRIPTION_INTEGRITY',
  recordedAt: '2026-09-18',
  decision: 'K3 2026-09-18 决策 3-B: 专用基线通道, 存量只许递减, 每批报告附剩余数',
  total: hits.length,
  perFile,
};
const dst = path.join(ROOT, '.hermes', 'meta-baseline.json');
fs.writeFileSync(dst, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('✅ 基线落盘: .hermes/meta-baseline.json');
console.log('   total = ' + out.total);
Object.entries(perFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('   ' + String(n).padStart(4) + '  ' + f));
