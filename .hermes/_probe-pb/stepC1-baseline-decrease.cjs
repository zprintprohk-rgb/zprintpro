'use strict';
/**
 * Step C 基线递减: 测量门童 #4 双向污染当前真值 → 递减 .hermes/i18n-pollution-baseline.json
 *   纪律: 只许递减 —— 任一 file 现值 > 允许值 (即有新增污染) 则**拒绝写盘**。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));
const BASE = path.join(REPO, '.hermes', 'i18n-pollution-baseline.json');

const SCOPE = 'src';
const files = common.collectFiles(SCOPE, false);
console.log('扫描文件数:', files.length);

const per = {};
let all = 0, legacy = 0;
const legacyByFile = {};
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const hits = i18n.scanBidirectional ? i18n.scanBidirectional(content, f) : [];
  const rel = f.replace(/\\/g, '/').replace(REPO.replace(/\\/g, '/') + '/', '');
  for (const h of hits) {
    const key = (h.file || rel);
    if (h.legacyRed) { legacy++; legacyByFile[key] = (legacyByFile[key] || 0) + 1; continue; }
    per[key] = (per[key] || 0) + 1;
    all++;
  }
}
console.log(`双向化实测 (非 legacyRed): ${all} 条 | 既有内向 red (永不进基线): ${legacy} 条`);

const b = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const old = b.perFile || {};
const next = {};
let decreased = 0, increased = [];
for (const f of new Set([...Object.keys(old), ...Object.keys(per)])) {
  const allow = old[f] || 0;
  const now = per[f] || 0;
  if (now > allow) increased.push({ file: f, allow, now });
  next[f] = Math.min(allow, now);
  if (now < allow) decreased++;
}
console.log(`\n递减文件数: ${decreased} | 新增污染文件数: ${increased.length}`);
if (increased.length) {
  console.error('❌ 有文件实测 > 基线 (疑新增污染) -> 拒绝写盘:');
  increased.forEach(x => console.error(`   ${x.file}: 基线 ${x.allow} -> 实测 ${x.now} (超 ${x.now - x.allow})`));
  process.exit(1);
}
const oldTotal = b.total, newTotal = Object.values(next).reduce((a, c) => a + c, 0);
console.log(`基线 total: ${oldTotal} -> ${newTotal} (递减 ${oldTotal - newTotal})`);

// 备份 + 写盘
const bak = path.join(REPO, '.hermes', '_probe-pb', '_i18n-pollution-baseline.bak');
fs.writeFileSync(bak, JSON.stringify(b, null, 2), 'utf8');
const out = {
  ...b,
  total: newTotal,
  measuredTotal: all + legacy,
  perFile: next,
  recordedAt: new Date().toISOString().slice(0, 10),
  note: (b.note || '') + ` | 2026-09-19 递减: total ${oldTotal} -> ${newTotal} (Step B GSC 尾巴 + Step C 批 1 title/description/category/JSON-LD 清理后重测)`,
};
fs.writeFileSync(BASE, JSON.stringify(out, null, 2), 'utf8');
const back = JSON.parse(fs.readFileSync(BASE, 'utf8'));
if (back.total !== newTotal) { console.error('❌ 写盘校验失败 -> 回滚'); fs.writeFileSync(BASE, JSON.stringify(b, null, 2), 'utf8'); process.exit(1); }
console.log(`\n✅ 基线已递减写盘: total ${oldTotal} -> ${back.total}`);
console.log(`   回滚: Copy-Item .hermes/_probe-pb/_i18n-pollution-baseline.bak .hermes/i18n-pollution-baseline.json -Force`);
