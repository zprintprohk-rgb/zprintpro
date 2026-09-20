#!/usr/bin/env node
/**
 * probe-skill-handover.mjs — 技能 / 交生活书 / 规则同源 一次性探针确认
 *
 * 用途: 交付前自检。断言 5 组:
 *   A. 自进化技能已收录本轮避坑与能力 (19 类避坑 / 9 类能力 / 并发协议)
 *   B. 交生活书存在且结构完整 (§1-§9 + 变更日志条目)
 *   C. 标题当量 SSoT 生效 (TITLE_MIN=50 / TITLE_MAX=57 / band(57)=OK / band(58)=TRIM)
 *   D. 规则文本五处同源 (AGENTS.md / docs §6-3 / 5 条 live prompt) 且无 live 50-58 残留
 *   E. 门禁缺口已修 (FULL_EXEMPT_PATHS 含 cron-prompts) + error-patterns 已入档
 *
 * 用法: node scripts/probe-skill-handover.mjs
 * 退出码: 0 = 全 PASS; 1 = 有 FAIL
 */
'use strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(import.meta.dirname, '..');
const SKILL_DIR = 'C:\\Users\\Administrator\\.openclaw-autoclaw\\skills';
const SKILL = path.join(SKILL_DIR, 'zprintpro-self-evolution-hardening', 'SKILL.md');
const BOOK = path.join(ROOT, 'docs', '2026-09-20-handover-living-book.md');

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  ✅ ${m}`); };
const no = (m) => { fail++; console.log(`  🔴 ${m}`); };
const head = (t) => console.log(`\n═══ ${t} ═══`);
const rd = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

/* ---------- A. 技能 ---------- */
head('A. 自进化技能收录');
const skill = rd(SKILL);
if (!skill) no(`技能不存在: ${SKILL}`);
else {
  ok(`技能存在 (${skill.length} 字节)`);
  const need = [
    ['避坑 9–19 段', /##\s*五、避坑 9[–-]19/],
    ['NESTED_STRUCT 铁律', /NESTED_STRUCT_NEEDS_PARSING_NOT_REGEX/],
    ['HANDMADE_CHARSET 铁律', /HANDMADE_CHARSET_CONTAINS_SHARED_CHARS/],
    ['STALE_REMOTE_REF 铁律', /STALE_REMOTE_REF_FALSE_BACKLOG/],
    ['DECLARED_APPLIED 铁律', /DECLARED_APPLIED_IS_NOT_EFFECTIVE/],
    ['DATA_LAYER_LANDED 铁律', /DATA_LAYER_LANDED_COPY_LAYER_NOT/],
    ['共享模板句残留', /SHARED_TEMPLATE_SENTENCE_RESIDUE/],
    ['新增能力 6–9 段', /##\s*六、新增能力 6[–-]9/],
    ['并发会话安全协议', /##\s*七、并发会话安全协议/],
    ['常用汉字表补集正解', /常用汉字表/],
  ];
  for (const [name, re] of need) (re.test(skill) ? ok : no)(`技能含: ${name}`);
}

/* ---------- B. 交生活书 ---------- */
head('B. 交生活书');
const book = rd(BOOK);
if (!book) no(`活书不存在: ${BOOK}`);
else {
  ok(`活书存在 (${book.length} 字节)`);
  for (const s of ['§1 一句话现状', '§2 状态快照', '§3 规则 SSoT 索引', '§5 未完成事项',
                   '§6 再开工清单', '§7 并发会话安全协议', '§8 Push 纪律', '§9 变更日志']) {
    (book.includes(s) ? ok : no)(`活书含: ${s}`);
  }
  (/2026-09-20/.test(book) ? ok : no)('活书含变更日志条目 (2026-09-20)');
  (/禁用未 fetch 的/.test(book) ? ok : no)('活书写明: 禁用未 fetch 的 @{u}');
  (/_cb=/.test(book) ? ok : no)('活书写明: push 后绕 CF 缓存特征验证');
}

/* ---------- C. SSoT 常量 ---------- */
head('C. 标题当量 SSoT');
const te = require('./guards/title-equiv.js');
(te.TITLE_MIN === 50 ? ok : no)(`TITLE_MIN = ${te.TITLE_MIN} (期望 50)`);
(te.TITLE_MAX === 57 ? ok : no)(`TITLE_MAX = ${te.TITLE_MAX} (期望 57)`);
(te.band('x'.repeat(57)) === 'OK' ? ok : no)(`band(57) = ${te.band('x'.repeat(57))} (期望 OK)`);
(te.band('x'.repeat(58)) === 'TRIM' ? ok : no)(`band(58) = ${te.band('x'.repeat(58))} (期望 TRIM)`);

/* ---------- D. 规则文本同源 ---------- */
head('D. 规则文本五处同源');
const agents = rd(path.join(ROOT, 'AGENTS.md')) || '';
(/K3 2026-09-19 裁决 目标区 50-57/.test(agents) ? ok : no)('AGENTS.md §5 含「K3 2026-09-19 裁决 目标区 50-57」');
const freeze = rd(path.join(ROOT, 'docs', '2026-09-13-title-batch-T-freeze.md')) || '';
(/50[–-]57/.test(freeze) ? ok : no)('docs §6-3 含 50–57 取代说明');
const LANES = ['zprintpro-blog-deepfix.md', 'zprintpro-daily-content-1x7w.md',
  'zprintpro-gsc-feedback-loop.md', 'zprintpro-monthly-matrix-audit.md', 'zprintpro-weekly-meta-refresh.md'];
for (const f of LANES) {
  const t = rd(path.join(ROOT, '.hermes', 'cron-prompts', f));
  if (!t) { no(`prompt 缺失: ${f}`); continue; }
  const has57 = t.includes('50-57');
  const liveOld = t.split(/\r?\n/).some((l) => /50-58/.test(l) && !/取代/.test(l));
  (has57 && !liveOld ? ok : no)(`${f}: 含 50-57=${has57} / live 50-58 残留=${liveOld}`);
}

/* ---------- E. 门禁缺口 + 入档 ---------- */
head('E. 门禁缺口与入档');
const common = rd(path.join(ROOT, 'scripts', 'guards', 'common.js')) || '';
const feIdx = common.indexOf('FULL_EXEMPT_PATHS');
const feBlock = feIdx >= 0 ? common.slice(feIdx, feIdx + 1600) : '';
(/cron-prompts/.test(feBlock) ? ok : no)('FULL_EXEMPT_PATHS 含 .hermes/cron-prompts/');
const ep = rd(path.join(ROOT, '.hermes', 'regression-guard', 'error-patterns.md')) || '';
(/STALE_REMOTE_REF_FALSE_BACKLOG/.test(ep) ? ok : no)('error-patterns 已入档 STALE_REMOTE_REF_FALSE_BACKLOG');
(fs.existsSync(path.join(ROOT, 'scripts', 'audit-sku-locale.cjs')) ? ok : no)('结构解析审计工具存在');
(!fs.existsSync(path.join(ROOT, 'scripts', 'sync-title-rule-50-58.mjs')) ? ok : no)('过时脚本 sync-title-rule-50-58.mjs 已删除');

/* ---------- 汇总 ---------- */
console.log(`\n${'═'.repeat(52)}\n📊 探针结果: ✅ ${pass} PASS / 🔴 ${fail} FAIL`);
if (fail) { console.log('❌ 探针未全过 —— 修完再来'); process.exit(1); }
console.log('✅ 探针全过: 技能 / 活书 / SSoT / 规则同源 / 门禁 五组一致');
