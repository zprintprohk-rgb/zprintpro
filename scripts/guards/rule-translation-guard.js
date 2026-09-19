#!/usr/bin/env node
/**
 * scripts/guards/rule-translation-guard.js
 * 门童 #21 · 规则翻译层守卫 (K3 2026-09-19 指令落地)
 *
 * ── 为什么存在 ────────────────────────────────────────────────────────────
 * 2026-09-19 实测结论: 12 段骨架写在 SSoT 文档里，但**生成**发生在 cron prompt 里、
 * **渲染**发生在 page.tsx 里、**门禁**驻守在 blog-data JSON 里 —— 四个位置各读各的，
 * 没有强制同步。结果 = 门童报「0 命中 / 全部符合 12 鐵律」，线上却有 12/15 个
 * Pillar-locale 组合没有 page.tsx 生成的 FAQPage、13/15 组合 content 内嵌 JSON-LD 重复渲染。
 *
 * 所以「把规则写得更权威」不解决问题 (反复失败时加强措辞是无效反应)，
 * 真正缺的是**规则翻译层**: SSoT 变更必须同步翻译到「生成位置」与「门禁位置」。
 *
 * ── 机制 (三者绑定) ──────────────────────────────────────────────────────
 *   ① 规则 SSoT 变更      docs/ 下的规则主文档
 *   ② 生成位置补丁        .hermes/cron-prompts/<lane>.md (STEP 0 必读段)
 *   ③ 门禁断言补丁        scripts/guards/<guard>.js  +  .hermes/regression-guard/rule-translation-ledger.json
 * 触发时点: ① 的 sha256 变化 ⇒ ②③ 的 sha256 必须同时在 ledger 里刷新
 *          (一条命令刷新三者: node scripts/guards/rule-translation-guard.js --stamp)
 *
 * ── 用法 ──────────────────────────────────────────────────────────────────
 *   node scripts/guards/rule-translation-guard.js            # 校验 (exit 1 = 三处未同步)
 *   node scripts/guards/rule-translation-guard.js --stamp    # 规则变更后刷新台账 (须三个文件都确已更新)
 *   node scripts/guards/rule-translation-guard.js --verbose  # 打印每个绑定项的 sha256 前 12 位
 *
 * 台账: .hermes/regression-guard/rule-translation-ledger.json
 * 反例留档: .hermes/regression-guard/error-patterns.md → RULE_TRANSLATION_MISSING
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = process.cwd();
const LEDGER_PATH = path.join(ROOT, '.hermes/regression-guard/rule-translation-ledger.json');

/**
 * 绑定表: 每一条「规则主文档」必须同时登记它在「生成位置」与「门禁位置」的翻译产物。
 * 新增绑定 = 在 BINDINGS 里加一项；禁止只改文档不改生成/门禁。
 */
const BINDINGS = [
  {
    id: 'blog-12-segment-skeleton',
    title: '深度 blog 12 段骨架 (SSoT §3.1 + §5.3)',
    rule: 'docs/2026-09-08-title-rules-and-deep-blog-standard.md',
    producers: [
      '.hermes/cron-prompts/zprintpro-daily-content-1x7w.md',
      '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
    ],
    guards: [
      'scripts/guards/blog-quality-12-rules-guard.js',
      'scripts/guards/internal-links-cta-guard.js',
    ],
  },
  {
    id: 'blog-meta-title-rule',
    title: 'Blog/SKU 标题 + meta 规则 (v4 写满原则)',
    rule: 'docs/2026-09-09-k3-title-rule-v4-write-full.md',
    producers: [
      '.hermes/cron-prompts/zprintpro-weekly-meta-refresh.md',
    ],
    guards: [
      'scripts/guards/blog-standard-guard.js',
      'scripts/guards/meta-description-guard.js',
    ],
  },
  {
    id: 'schema-single-source-of-truth',
    title: 'Schema 单一来源 = page.tsx (content 禁内嵌 JSON-LD)',
    rule: 'docs/2026-09-08-title-rules-and-deep-blog-standard.md',
    producers: [
      '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
    ],
    guards: [
      'scripts/guards/blog-quality-12-rules-guard.js',
    ],
  },
];

function sha256(p) {
  const abs = path.join(ROOT, p);
  if (!fs.existsSync(abs)) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
}
function s12(h) { return h ? h.slice(0, 12) : 'MISSING'; }

function buildNow() {
  const out = {};
  for (const b of BINDINGS) {
    out[b.id] = {
      title: b.title,
      rule: { path: b.rule, sha256: sha256(b.rule) },
      producers: b.producers.map(p => ({ path: p, sha256: sha256(p) })),
      guards: b.guards.map(p => ({ path: p, sha256: sha256(p) })),
    };
  }
  return out;
}

function loadLedger() {
  if (!fs.existsSync(LEDGER_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8')); } catch (e) { return { _broken: e.message }; }
}

function main() {
  const argv = process.argv.slice(2);
  const stamp = argv.includes('--stamp');
  const verbose = argv.includes('--verbose');
  const now = buildNow();

  if (stamp) {
    const prev = loadLedger();
    const payload = {
      schema: 'rule-translation-ledger/v1',
      note: 'SSoT 变更必须同步刷新「生成位置」与「门禁位置」；本台账是三者绑定的唯一凭据 (门童 #21)',
      updated_at: new Date().toISOString(),
      bindings: now,
    };
    // 防呆: --stamp 时若只有 rule 变了、producers/guards 未变 ⇒ 提示 (不阻断, 但打警告)
    if (prev && prev.bindings) {
      for (const id of Object.keys(now)) {
        const p = prev.bindings[id];
        if (!p) continue;
        const ruleChanged = p.rule && p.rule.sha256 !== now[id].rule.sha256;
        const anyProdChanged = (p.producers || []).some((x, i) => now[id].producers[i] && x.sha256 !== now[id].producers[i].sha256);
        const anyGuardChanged = (p.guards || []).some((x, i) => now[id].guards[i] && x.sha256 !== now[id].guards[i].sha256);
        if (ruleChanged && !anyProdChanged && !anyGuardChanged) {
          console.log(`⚠️  [${id}] 规则文档已变更，但「生成位置」与「门禁位置」都没变 —— 规则翻译层未落地 (允许 stamp, 但请在提交信息里说明为何无需翻译)`);
        }
      }
    }
    fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(payload, null, 1), 'utf8');
    console.log(`✅ [RULE-TRANSLATION-GUARD] 台账已刷新: ${path.relative(ROOT, LEDGER_PATH).replace(/\\/g, '/')} (${Object.keys(now).length} 条绑定)`);
    process.exit(0);
  }

  const ledger = loadLedger();
  if (!ledger) {
    console.log(`\n🔴 [RULE-TRANSLATION-GUARD] 台账不存在: ${path.relative(ROOT, LEDGER_PATH).replace(/\\/g, '/')}`);
    console.log('   修法: node scripts/guards/rule-translation-guard.js --stamp (首次建账)');
    process.exit(1);
  }
  if (ledger._broken) {
    console.log(`\n🔴 [RULE-TRANSLATION-GUARD] 台账 JSON 损坏: ${ledger._broken}`);
    process.exit(1);
  }

  const drifts = [];
  for (const id of Object.keys(now)) {
    const cur = now[id];
    const rec = (ledger.bindings || {})[id];
    if (!rec) { drifts.push(`[${id}] 台账无此绑定 (新增绑定未登记)`); continue; }
    const items = [
      ['规则 SSoT', rec.rule, cur.rule],
      ...cur.producers.map((x, i) => ['生成位置', (rec.producers || [])[i], x]),
      ...cur.guards.map((x, i) => ['门禁断言', (rec.guards || [])[i], x]),
    ];
    for (const [kind, old, cur2] of items) {
      if (!old) { drifts.push(`[${id}] ${kind} 未登记: ${cur2.path}`); continue; }
      if (old.sha256 !== cur2.sha256) {
        drifts.push(`[${id}] ${kind} 已漂移: ${cur2.path} (ledger ${s12(old.sha256)} → now ${s12(cur2.sha256)})`);
      }
      if (verbose) console.log(`   ${kind}: ${cur2.path} sha256=${s12(cur2.sha256)}`);
    }
  }

  if (drifts.length) {
    console.log(`\n🔴 [RULE-TRANSLATION-GUARD] ${drifts.length} 处规则翻译层漂移:`);
    for (const d of drifts) console.log(`   - ${d}`);
    console.log('\n   口径: SSoT 变更 ⇒ 「生成位置」(cron prompt) 与「门禁断言」(guards) 必须同步翻译，三者绑定才算规则生效。');
    console.log('   若三处确已更新: node scripts/guards/rule-translation-guard.js --stamp 刷新台账，随同一次 commit 提交。');
    console.log('   （只改文档不改生成/门禁 = 规则不会被执行层读到，也不会被门禁检到 —— 2026-09-19 12 段骨架事故根因）');
    process.exit(1);
  }
  console.log(`\n✅ [RULE-TRANSLATION-GUARD] 0 命中 - ${Object.keys(now).length} 条绑定的「规则/生成/门禁」三处 sha256 全部一致`);
}

if (require.main === module) main();
module.exports = { BINDINGS, buildNow, LEDGER_PATH };
