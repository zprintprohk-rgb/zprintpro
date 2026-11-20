// .hermes/_ledger_addendum.cjs — 簇8 order-10 note 追加 c9eb5347 补记 (JSON 安全)
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const fp = path.join(REPO, '.hermes/logs/b1c-queue-progress.json');
const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
const last = j.clusters[j.clusters.length - 1];
if (last.order !== 10) { console.error('FAIL: last cluster order != 10'); process.exit(2); }
if (last.note.includes('c9eb5347')) { console.log('already appended'); process.exit(0); }
last.note += ' 补充 (c9eb5347): outdoor H1 三格在 CSV 覆盖域, 首次 push 后 live probe 抓到 ts h1 被 regen 回灌 (cluster-7 教训复发) — 已改 CSV 三格 + regen 同步 + 重推, 终验 NEW=1/OLD=0。铁律重申: desc/h1/alt 属 CSV 覆盖域, 一切修正必须落 CSV 再 regen, 禁止直改 ts。';
j.updated_at = '2026-10-16T12:25:00+08:00';
fs.writeFileSync(fp, JSON.stringify(j, null, 2) + '\n', 'utf-8');
console.log('PASS: note addendum written');
