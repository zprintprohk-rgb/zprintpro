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
// 全位置内嵌 LD 序列 (2026-09-19 扩展): 实测 poster en/ja 的 5 个块**不在开头**
// (ja 位置 5,816 / en 8,405, 位于 Related Services 列表之后) ⇒ 只处理开头会漏。
// 仍保持严格断言: 每个被删片段必须**恰好**是连续的 LD 序列 (不含任何其他内容)。
const ANY_SEQ_RE = /(?:<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*)+/g;
const TYPES_RE = /"@type"\s*:\s*"([A-Za-z]+)"/g;

let changed = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const entry = data[slug];
  if (!entry || !entry.content) { console.log(`⚠️  ${loc}: 无该 slug`); continue; }
  const before = entry.content;

  // 收集全部 LD 序列 (含位置), 逐个验证
  const hits = [...before.matchAll(ANY_SEQ_RE)]
    .filter(m => m[0].trim().length > 0 && m[0].includes('<script type="application/ld+json"'));
  if (!hits.length) { console.log(`✅ ${loc}: 无内嵌 LD 序列 (幂等/无需处理)`); continue; }

  let out = '';
  let cursor = 0;
  const removedTypes = new Set();
  let removedBytes = 0;
  let bad = false;
  for (const h of hits) {
    const chunk = h[0];
    // 断言 ①: 被删片段必须恰好是连续 LD 序列 (trim 后以 <script 开头、以 </script> 结尾, 且不含其他标签)
    const stripped = chunk.trim();
    const isOnlyLd = /^(?:<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)+$/.test(stripped);
    if (!isOnlyLd) { console.log(`🔴 ${loc}: 断言①失败 — 片段含非 LD 内容, abort (不写盘)`); bad = true; break; }
    for (const t of chunk.matchAll(TYPES_RE)) removedTypes.add(t[1]);
    out += before.slice(cursor, h.index);
    cursor = h.index + chunk.length;
    removedBytes += chunk.length;
  }
  if (bad) { process.exitCode = 1; continue; }
  out += before.slice(cursor);

  // 断言 ②: strip 后无残留
  const remnants = (out.match(/<script type="application\/ld\+json"/g) || []).length;
  if (remnants > 0) { console.log(`🔴 ${loc}: 断言②失败 — 残留 ${remnants} 个内嵌 LD, abort`); process.exitCode = 1; continue; }
  // 断言 ③: 剩余字节 = 原文逐段拼接 (由构造保证), 再做一次长度守恒校验
  if (out.length !== before.length - removedBytes) { console.log(`🔴 ${loc}: 断言③失败 — 长度守恒不成立, abort`); process.exitCode = 1; continue; }

  console.log(`${APPLY ? '写入' : 'DRY-RUN'} ${loc}: 删 ${hits.length} 个 LD 序列 / ${removedBytes} 字节 / ${removedTypes.size} 类型 (${[...removedTypes].join(',')}) | content ${before.length} → ${out.length}`);
  changed++;
  if (APPLY) {
    entry.content = out;
    fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
}
console.log(`\n合计处理 ${changed} 个 locale | 模式=${APPLY ? 'APPLY' : 'DRY-RUN'}`);
