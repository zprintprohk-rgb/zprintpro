#!/usr/bin/env node
/**
 * scripts/guards/cron-prompts-exemption-guard.js
 * 门童 #23 · cron prompt 豁免台账对账 (K3 2026-09-19 决策一(a) 的「附加条件」)
 *
 * ── 为什么存在 ────────────────────────────────────────────────────────────
 * 决策 (a): 把 `.hermes/cron-prompts/` 加入 `common.js` FULL_EXEMPT_PATHS —— 豁免理由成立:
 *   规则书/指令书**必然引用禁用形态字面**（「不要写 FSC-C123456」这句话本身含 FSC-C123456）,
 *   字面扫描 = 必然误报。与 AGENTS.md / `.hermes/logs/` 同族。
 * 但**豁免不是无条件的**: 否则就成了「整个目录全放行」的盲区。
 *
 * ── 机制 (把豁免从「整目录」收紧为「逐条登记 + 可对账」) ────────────────────
 * ① 台账: `.hermes/regression-guard/cron-prompts-exemption-manifest.json`
 *    列出每个 prompt 文件**确实包含**的禁用形态字面 (literals) + 理由 + 登记时间/人。
 * ② 对账: 本门童逐文件扫描, 求「manifest 声明集合」与「文件实际命中集合」的**对称差**:
 *    - 文件里有、manifest 未登记 ⇒ 🔴 豁免范围外的新字面 (须登记或清除)
 *    - manifest 登记了、文件里已无     ⇒ 🟡 台账过期 (须更新, 防「幽灵豁免」)
 * ③ 覆盖: manifest 未列出的 prompt 文件 → 忽略 (等于不豁免); 列出但 literals 为空 → 声明「无命中」,
 *    一旦出现命中即报 🔴 (这正是把「整目录放行」变成「逐文件声明」的关键)。
 *
 * ── 用法 ──────────────────────────────────────────────────────────────────
 *   node scripts/guards/cron-prompts-exemption-guard.js            # 对账 (exit 1 = 有漂移)
 *   node scripts/guards/cron-prompts-exemption-guard.js --verbose  # 打印每个文件的声明/实际集合
 *
 * 配套: scripts/guards/common.js 的 FULL_EXEMPT_PATHS 已加入 `.hermes/cron-prompts/`
 *       (由 scripts/guards/apply-cron-prompts-exemption.mjs 施加, 幂等)。
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, '.hermes/regression-guard/cron-prompts-exemption-manifest.json');
const DIR = path.join(ROOT, '.hermes/cron-prompts');

// 与 common.js 的 red/orange 字面规则同源 (只查「禁用形态字面」, 不查语义)
const LITERAL_RULES = [
  { id: 'SOP10_CERT_NO', re: /FSC-C\d{6}|01 100 150 1234/g },
  { id: 'CRED_ISO_9001', re: /ISO 9001/g },
  { id: 'CRED_1000_PLUS', re: /\b1,000\+|\b1000\+/g },
  { id: 'CRED_HEIDELBERG', re: /海德堡|Heidelberg/g },
  { id: 'SOP10_24H_SLA', re: /24h SLA|24 小時加急|24小时加急/gi },
  { id: 'SOP10_12_INDUSTRIES', re: /12 大行業|12 大行业|12 大行業覆蓋/g },
];

function scanFile(abs) {
  const text = fs.readFileSync(abs, 'utf8');
  const found = new Set();
  for (const r of LITERAL_RULES) {
    const m = text.match(r.re);
    if (m) for (const x of m) found.add(x);
  }
  return [...found].sort();
}

function main() {
  const verbose = process.argv.includes('--verbose');
  if (!fs.existsSync(MANIFEST)) {
    console.log(`\n🔴 [CRON-PROMPTS-EXEMPTION] 台账不存在: ${path.relative(ROOT, MANIFEST).replace(/\\/g, '/')}`);
    process.exit(1);
  }
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) {
    console.log(`\n🔴 [CRON-PROMPTS-EXEMPTION] 台账 JSON 损坏: ${e.message}`);
    process.exit(1);
  }
  const entries = manifest.entries || [];
  const unused = [];
  const unregistered = [];
  for (const e of entries) {
    const abs = path.join(ROOT, e.file);
    if (!fs.existsSync(abs)) { unused.push(`${e.file} (台账登记但文件不存在)`); continue; }
    const actual = scanFile(abs);
    const declared = new Set(e.literals || []);
    const extra = actual.filter(x => !declared.has(x));       // 文件有、台账无
    const stale = [...declared].filter(x => !actual.includes(x)); // 台账有、文件无
    if (verbose) console.log(`   ${e.file}\n     声明=[${[...declared].join(', ')}]\n     实际=[${actual.join(', ')}]`);
    if (extra.length) unregistered.push(`${e.file}: 未登记字面 [${extra.join(', ')}]`);
    if (stale.length) unused.push(`${e.file}: 台账幽灵登记 [${stale.join(', ')}] (文件已无该字面)`);
  }
  // 目录里有、台账完全没提的 prompt 文件 → 不豁免, 只提示 (不影响 exit)
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.md')) : [];
  const listed = new Set(entries.map(e => e.file.split('/').pop()));
  const uncovered = files.filter(f => !listed.has(f));

  if (unregistered.length) {
    console.log(`\n🔴 [CRON-PROMPTS-EXEMPTION] ${unregistered.length} 处豁免范围外的新字面:`);
    for (const u of unregistered) console.log(`   + ${u}`);
    console.log('\n   口径: cron-prompts 的豁免必须**逐条登记**在 cron-prompts-exemption-manifest.json (附理由)。');
    console.log('   修法: ① 若属规则书引用 → 在 manifest 对应文件补 literals + reason; ② 若是误引入 → 清掉。');
    process.exit(1);
  }
  if (unused.length) {
    console.log(`\n🟡 [CRON-PROMPTS-EXEMPTION] ${unused.length} 处台账过期 (幽灵豁免, 不阻断但不许留):`);
    for (const u of unused) console.log(`   - ${u}`);
    console.log('   修法: 更新 manifest 的 literals (删掉已不存在的字面), 保持台账=事实。');
  }
  if (uncovered.length) console.log(`\nℹ️ 未纳入台账的 prompt 文件 ${uncovered.length} 个 (等于不豁免, 命中即由主门童拦): ${uncovered.join(', ')}`);
  if (!unregistered.length && !unused.length) console.log(`\n✅ [CRON-PROMPTS-EXEMPTION] 0 命中 - ${entries.length} 个文件的「声明集合 = 实际集合」完全对账`);
  process.exit(unregistered.length ? 1 : 0);
}

if (require.main === module) main();
module.exports = { scanFile, LITERAL_RULES, MANIFEST };
