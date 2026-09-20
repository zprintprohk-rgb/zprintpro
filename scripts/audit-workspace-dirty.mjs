// scripts/audit-workspace-dirty.mjs — 工作区脏文件三分分类盘点（**只读，绝不删档**）
//
// 为什么存在（见 error-patterns.md → WORKSPACE_DIRTY_OVERFLOW）:
//   2026-09-20 实测 `git status --porcelain` 共 **599 条**（绝大多数是 .hermes/ 下的
//   未追踪备份目录 + 生成报告）。单条无害，堆到三位数后性质改变：
//     · 真实改动被淹没（找「我这轮改了哪 3 个档」只能靠 grep）
//     · 掩盖并发会话的未提交改动 → §0.35.7 撞车的温床
//     · 「工作区干净」不再是可靠信号（收尾信号本就只是单点快照）
//
// 铁律: **本脚本只读** —— 不删、不移动、不改 .gitignore、不 git add。
//   分类结果交 K3 裁决（本项目已发生过「一方清理扫掉另一方 staged 变更」）。
//
// 用法:
//   node scripts/audit-workspace-dirty.mjs                # 盘点到 stdout + 落盘
//   node scripts/audit-workspace-dirty.mjs --threshold 600  # 未追踪条数超阈 → exit 1（告警用）
//   node scripts/audit-workspace-dirty.mjs --json          # 只出机器可读摘要
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const AS_JSON = args.includes('--json');
const ti = args.indexOf('--threshold');
const THRESHOLD = ti !== -1 ? Number(args[ti + 1]) : null;

const ROOT = process.cwd();
const git = (a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 });

let raw = '';
try {
  raw = git(['status', '--porcelain']);
} catch (e) {
  console.error(`🔴 git status 失败: ${e.message}`);
  process.exit(2);
}

const entries = raw
  .split(/\r?\n/)
  .filter(Boolean)
  .map((l) => ({ code: l.slice(0, 2), p: l.slice(3).trim().replace(/^"|"$/g, '') }));

/** 分类规则（显式、可审计；新增规则必须写在这里，不许藏在 if 里） */
const RULES = [
  // ① 备份 / 坏档 → 疑似可删（**候选**，不执行删除）
  { bucket: 'C', name: '备份目录', re: /^\.hermes\/_(bak|archive|bak-)/, note: '备份，非交付物 → 建议 .gitignore' },
  { bucket: 'C', name: '坏档残留', re: /_broken-|\.bak(-|$)|\.orig$/, note: '事故残留/旧版备份 → 建议 .gitignore 或人工确认后清' },
  { bucket: 'C', name: '一次性探针', re: /^\.hermes\/logs\/_(probe|forge|test|msg)[-/]/, note: '一次性探针/临时讯息档；可复跑者建议转正式 scripts/' },
  // ② 生成物 → 建议 .gitignore（或按需 -f 入库）
  { bucket: 'B', name: '生成日志/报告', re: /^\.hermes\/(logs|reports)\//, note: '生成物；若需留证应显式 -f 入库并注明' },
  { bucket: 'B', name: 'GSC 导出', re: /^GSC数据\//, note: '后台数据导出，不应入库' },
  { bucket: 'B', name: '构建/缓存产物', re: /^(\.next|out|node_modules|dist)\//, note: '构建产物' },
];

function classify(e) {
  const tracked = !e.code.includes('?');
  if (tracked) {
    const generated = /^\.hermes\/(logs|reports)\//.test(e.p);
    return {
      bucket: 'A',
      sub: generated ? '已追踪·生成物' : '已追踪·真实改动',
      note: generated
        ? '受版控的生成物（已入库 → 需保持更新或考虑改流程）'
        : '⚠️ 这是真实改动，**最需要看的一类**',
    };
  }
  for (const r of RULES) if (r.re.test(e.p)) return { bucket: r.bucket, sub: r.name, note: r.note };
  return { bucket: 'B', sub: '未分类', note: '需人工判断归属' };
}

const buckets = { A: [], B: [], C: [] };
for (const e of entries) {
  const c = classify(e);
  buckets[c.bucket].push({ ...e, ...c });
}
const untracked = entries.filter((e) => e.code.includes('?')).length;
const tracked = entries.length - untracked;

const topDir = (p) => (p.includes('/') ? p.split('/').slice(0, 2).join('/') : '(根)');
const groupCount = (arr) => {
  const m = new Map();
  for (const e of arr) m.set(topDir(e.p), (m.get(topDir(e.p)) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const summary = {
  generatedAt: new Date().toISOString(),
  total: entries.length,
  tracked,
  untracked,
  buckets: {
    A: { label: '已追踪·未提交（真实改动，最需要看）', count: buckets.A.length },
    B: { label: '未追踪·建议 .gitignore / 需人工判断', count: buckets.B.length },
    C: { label: '未追踪·疑似可删（备份/坏档/一次性探针）', count: buckets.C.length },
  },
};

if (AS_JSON) {
  console.log(JSON.stringify({ ...summary, distribution: { A: groupCount(buckets.A), B: groupCount(buckets.B), C: groupCount(buckets.C) } }, null, 2));
} else {
  console.log('工作区脏文件盘点（**只读**；本脚本不删档、不改 .gitignore）');
  console.log(`总计 ${summary.total} 条 = 已追踪 ${tracked} + 未追踪 ${untracked}\n`);
  for (const k of ['A', 'B', 'C']) {
    console.log(`【${k}】${summary.buckets[k].label} — ${buckets[k].length} 条`);
    const dist = groupCount(buckets[k]);
    if (dist.length) console.log(`    分布: ${dist.slice(0, 6).map(([d, n]) => `${d} ${n}`).join(' ｜ ')}`);
    for (const e of buckets[k].slice(0, 8)) console.log(`      ${e.p}   (${e.sub})`);
    if (buckets[k].length > 8) console.log(`      … 另 ${buckets[k].length - 8} 条（见落盘 JSON）`);
    console.log('');
  }
  console.log('下一步（交 K3 裁决，执行层不擅自删）:');
  console.log('  C 类 → 建议进 .gitignore；B 类 → 分类后决定 gitignore 或 -f 入库；A 类 → 逐条确认该提交还是该丢弃');
}

const OUT_JSON = '.hermes/reports/workspace-dirty-audit.json';
try {
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(
    OUT_JSON,
    JSON.stringify({ ...summary, items: { A: buckets.A, B: buckets.B, C: buckets.C } }, null, 2) + '\n',
    'utf8',
  );
  if (!AS_JSON) console.log(`\n📄 已落盘: ${OUT_JSON}`);
} catch (e) {
  console.error(`⚠️ 落盘失败: ${e.message}`);
}

if (THRESHOLD !== null && untracked > THRESHOLD) {
  console.error(`\n🔴 WORKSPACE_DIRTY_OVERFLOW: 未追踪 ${untracked} 条 > 阈值 ${THRESHOLD} → 需盘点（见 error-patterns.md）`);
  process.exit(1);
}
process.exit(0);
