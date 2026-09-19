/**
 * B2 · 内嵌 JSON-LD strip (K3 2026-09-19 评估: 理由升级为「消除 AI 可读层的实体歧义」)
 *
 * 为什么 strip: 线上实测 12/15 组合「生成区 1 个 FAQPage + content 内嵌 1 个 FAQPage」
 *   = `Duplicate field FAQPage`; Google 指南「每页只应有一个 FAQPage」。
 *   ⚠️ FAQ 报告已于 2026-06 结束 ⇒ GSC 可能不再报此错 ⇒ 只能自测。
 *
 * 前置铁律 (顺序敏感, 违反则富摘要归零):
 *   ① 必须**先**确认线上生成区已有 FAQPage (工具: verify-b1-campus-live.mjs 同型切片逻辑)
 *   ② 达不到 ① ⇒ 禁止 strip (本脚本会 abort)
 *
 * 本脚本做三件事:
 *   A. 前置断言: content 内嵌块 = 开头连续的 `<script type="application/ld+json">…</script>` 序列
 *      (结构断言: 首个非空白字符必须是该标签; 且序列长度 >0) —— 否则 abort, 不写盘。
 *   B. strip: 仅删该序列; content 其余字节**逐字不变** (写盘前做「删掉的恰好是 LD 序列」断言)。
 *   C. 留证: 记录 strip 前后 content 长度 + 被删块类型, 供 HTML diff 验收引用。
 *
 * 用法:
 *   node .hermes/_probe-pb/strip-inline-jsonld.mjs --slug=<slug>            # dry-run 全部 locale
 *   node .hermes/_probe-pb/strip-inline-jsonld.mjs --slug=<slug> --apply    # 写盘
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const slug = (process.argv.find(a => a.startsWith('--slug=')) || '').split('=')[1];
if (!slug) { console.error('用法: --slug=<slug> [--apply]'); process.exit(2); }

const LEAD_RE = /^(?:\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)+/;
const TYPES_RE = /"@type"\s*:\s*"([A-Za-z]+)"/g;

let changed = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const entry = data[slug];
  if (!entry || !entry.content) { console.log(`⚠️  ${loc}: 无该 slug`); continue; }
  const before = entry.content;
  const m = before.match(LEAD_RE);
  if (!m || !m[0].trim()) { console.log(`✅ ${loc}: content 开头无内嵌 LD 序列 (幂等/无需处理)`); continue; }
  const removed = m[0];
  const after = before.slice(removed.length);
  // 结构断言: 删掉的必须是完整 LD 序列; 且 after 不含同型 LD (防残留半截)
  const remnants = (after.match(/<script type="application\/ld\+json"/g) || []).length;
  const strippedIsOnlyLd = /^(?:\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)+\s*$/.test(removed);
  if (!strippedIsOnlyLd) { console.log(`🔴 ${loc}: 前置断言失败 — 被删片段含非 LD 内容, abort (不写盘)`); process.exitCode = 1; continue; }
  if (remnants > 0) { console.log(`🔴 ${loc}: 断言失败 — strip 后仍残留 ${remnants} 个内嵌 LD, abort`); process.exitCode = 1; continue; }
  if (before.replace(removed, '') !== after) { console.log(`🔴 ${loc}: 断言失败 — 剩余内容不等于原文减该序列, abort`); process.exitCode = 1; continue; }
  const types = [...new Set([...removed.matchAll(TYPES_RE)].map(x => x[1]))];
  console.log(`${APPLY ? '写入' : 'DRY-RUN'} ${loc}: 删 ${removed.length} 字节 / ${types.length} 块 (${types.join(',')}) | content ${before.length} → ${after.length}`);
  changed++;
  if (APPLY) {
    entry.content = after;
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log(`\n合计处理 ${changed} 个 locale | 模式=${APPLY ? 'APPLY' : 'DRY-RUN'}`);
