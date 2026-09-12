#!/usr/bin/env node
/**
 * check-bc-ban.mjs — 名片类内容【报告式盘点】(原 §0.0 阻断门禁, 已于 2026-09-12 降级)
 *
 * 拍板变更: K3 2026-09-12 「不拒绝名片了, 有单就接」→ 名片解禁 (接单层)。
 *   本脚本由「阻断式门禁」降级为「报告式盘点」: 退出码恒为 0, 不再阻断 push。
 *   保留价值 = 运营盘点名片语境内容分布 (案例/博客/SKU 里哪些地方在讲名片)。
 *
 * 历史: 拍板来源 K3 2026-09-08 01:15 终裁 (§0.0) + §0.0.1 第 3 条; 落地 2026-09-09。
 * 注意: 「展示层/SEO 层是否恢复名片页面」尚未拍板, 任何执行层不得据此脚本自动新建/删除名片资产。
 *
 * 用法:   node scripts/check-bc-ban.mjs
 * 退出码: 恒为 0 (报告式); 输出 [i] 名片类内容盘点 / [PASS] 无命中
 *
 * 扫描范围: src/ + public/ 全递归 + 根配置 (根目录单层, 非递归)
 * 豁免:   *.bak* / 文件名含 gsc / 根目录 .md / redirect 源行 / 本脚本自身
 * 关键词: 名片 | 咭片 | 名刺 | business[- ]card | name[- ]card (大小写不敏感)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname, basename, sep } from 'node:path';

const ROOT = process.cwd();
const BC_RE = /名片|咭片|名刺|business[-\s]?card|name[-\s]?card/i;
// redirect 源行豁免: §0.0 唯一允许「名片」出现的形态 = 301/308 重定向源 URL
// 含 bc→greeting 承接映射行 (v22 改名 pair / middleware 重定向键 → greeting 目的地)
const REDIRECT_LINE_RE = /redirect|\b(?:301|308)\b|\b(?:source|destination|permanent|statusCode)\s*:/i;
const BC_TO_GREETING_RE = /greeting|贺卡|賀卡/i;
// 禁区声明行豁免: 「不提供/禁区」类声明是规则表述本身, 不是把名片重新引入 (per §0.0 意图)
const DECLARATION_RE = /不提供|禁区|禁做|禁止|不得|不做|是否提供|是否做|not\s+(?:offer|provide|support)/i;
// 文件级 deprecated 标记: 头部含 BC-BAN-DEPRECATED 的文件 = K3 拍板保留的断注册遗留代码, 仅记录不阻断
const DEPRECATED_MARKER = 'BC-BAN-DEPRECATED';
const DEPRECATED_HEAD_LINES = 15;

const SCAN_DIRS = ['src', 'public'];
const ROOT_FILE_EXTS = new Set(['.js', '.mjs', '.cjs', '.ts', '.json', '.toml', '.xml', '.webmanifest']);
const TEXT_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.mdx', '.txt', '.csv', '.xml', '.toml', '.html', '.htm', '.css', '.webmanifest']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.next', '.open-next', '.vercel', 'docs', '.hermes', 'patches', 'seo-research', 'zprintpro-en-us-images', '.openclaw', 'archive']);
const MAX_BYTES = 5 * 1024 * 1024;
const SELF = 'check-bc-ban.mjs';

const blocking = [];
const redirectAllowed = [];
let scanned = 0;

function isExemptFile(abs) {
  const base = basename(abs);
  if (base === SELF) return true;
  if (/\.bak/i.test(base)) return true;
  if (/gsc/i.test(base)) return true;
  if (base === 'seo-weekly-history.json') return true; // GSC 历史周报 (§0.0.1 GSC 数据豁免)
  return false;
}

function scanFile(abs) {
  if (isExemptFile(abs)) return;
  const ext = extname(abs).toLowerCase();
  const underScanDir = SCAN_DIRS.some((d) => abs.startsWith(join(ROOT, d) + sep));
  if (underScanDir ? !TEXT_EXTS.has(ext) : !ROOT_FILE_EXTS.has(ext)) return;
  let stat;
  try {
    stat = statSync(abs);
  } catch {
    return;
  }
  if (stat.size > MAX_BYTES) return;
  let text;
  try {
    text = readFileSync(abs, 'utf-8');
  } catch {
    return;
  }
  scanned += 1;
  const rel = relative(ROOT, abs) || abs;
  const lines = text.split(/\r?\n/);
  const fileDeprecated = lines.slice(0, DEPRECATED_HEAD_LINES).some((l) => l.includes(DEPRECATED_MARKER));
  // 挂账2 清偿 (2026-09-10 K3 裁定): GSC_404_R2 redirect 源行严格豁免 —
  // 豁免面严格限定 next.config.js 内 GSC_404_R2 数组块 (URL 对行 + 序号注释行)。
  let inGsc404R2 = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (rel === 'next.config.js' && /const\s+GSC_404_R2\s*=\s*\[/.test(line)) inGsc404R2 = true;
    else if (inGsc404R2 && /^\s*\]\s*;/.test(line)) inGsc404R2 = false;
    if (!BC_RE.test(line)) continue;
    const entry = `${rel}:${i + 1}: ${line.trim().slice(0, 200)}`;
    if (fileDeprecated || line.includes(DEPRECATED_MARKER) || inGsc404R2 || REDIRECT_LINE_RE.test(line) || BC_TO_GREETING_RE.test(line) || DECLARATION_RE.test(line)) {
      redirectAllowed.push(entry);
    } else {
      blocking.push(entry);
    }
  }
}

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const abs = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(abs);
    } else if (e.isFile()) {
      scanFile(abs);
    }
  }
}

for (const d of SCAN_DIRS) {
  try {
    if (statSync(join(ROOT, d)).isDirectory()) walk(join(ROOT, d));
  } catch {
    /* 目录不存在, 跳过 */
  }
}
let rootEntries = [];
try {
  rootEntries = readdirSync(ROOT, { withFileTypes: true });
} catch {
  /* noop */
}
for (const e of rootEntries) {
  if (e.isFile()) scanFile(join(ROOT, e.name));
}

console.log('=== 名片类内容 报告式盘点 (check-bc-ban.mjs, 2026-09-12 起不阻断 push) ===');
console.log(`扫描文本文件: ${scanned} 个 (范围: src/ + public/ + 根配置; 豁免: .bak / gsc / 根目录.md)`);
if (redirectAllowed.length) {
  console.log(`\n[i] 允许形态行 (redirect 源行 / bc→贺卡承接映射 / 禁区声明 / BC-BAN-DEPRECATED 保留代码, 仅记录 ${redirectAllowed.length} 处, 不阻断):`);
  for (const l of redirectAllowed) console.log('  ' + l);
}
if (blocking.length) {
  console.log(`\n[i] 名片类内容盘点 ${blocking.length} 处 (报告式, 不阻断 — K3 2026-09-12 解禁):`);
  for (const l of blocking) console.log('  ' + l);
  console.log('\n[INFO] 名片已解禁 (接单层), 上述命中仅供运营盘点名片页面/文案分布, 不再阻断 push。');
  console.log('      展示层/SEO 层是否恢复名片页面 → 待 K3 选项裁决 (见 AGENTS.md §0.0 解禁块)。');
  process.exit(0);
}
console.log('\n[PASS] 无名片类内容命中 — 干净 (报告式扫描, exit 0)。');
process.exit(0);
