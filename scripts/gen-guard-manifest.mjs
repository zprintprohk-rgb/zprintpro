// scripts/gen-guard-manifest.mjs — 產生/校驗門童清單（防編號與規則 ID 衝突）
//
// 為什麼需要（K3 2026-09-19 第四項建議）：
//   「门童编号、规则 ID、豁免台账都是共享命名空间，新增条目时必须先扫描全目录确认无冲突。
//     建议在 scripts/guards/ 下新增一个 guard-manifest.json，列出所有已分配的编号与规则 ID，
//     新增时自动检查冲突。」
//   事故背書：2026-09-19 本車道新增 MOQ 閘門時**只掃了 check-regression-guard.js**，
//   漏掃 scripts/guards/ 目錄 → 誤編 #22（實際已被 bypass-audit-guard 佔用）與
//   #23（cron-prompts-exemption-guard）→ push 時才發現撞號，浪費一輪。
//
// 用法：
//   node scripts/gen-guard-manifest.mjs            # 校驗：有衝突 → exit 1
//   node scripts/gen-guard-manifest.mjs --write    # 重新產生清單
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['scripts/guards', 'scripts'];
const OUT = 'scripts/guards/guard-manifest.json';

/** 收集：門童編號 → 來源檔；以及「自身聲明」用於衝突判定 */
function collect() {
  const numbers = new Map(); // number → [{file, line, text}]（所有提及）
  const declarations = new Map(); // number → [{file, line, text}]（僅自身聲明）
  const ruleIds = new Map(); // ruleId → [{file, line}]

  const scanFile = (file) => {
    const src = fs.readFileSync(file, 'utf8');
    const lines = src.split(/\r?\n/);
    lines.forEach((l, i) => {
      // 門童編號：`门童 #N` / `GUARD #N` / `门禁 #N` ——一律收集（供清單）
      for (const m of l.matchAll(/(?:门童|门禁|GUARD)\s*#(\d+)/g)) {
        const n = Number(m[1]);
        if (!numbers.has(n)) numbers.set(n, []);
        numbers.get(n).push({ file, line: i + 1, text: l.trim().slice(0, 100) });
      }
      /**
       * ★ 只把「**檔案自身聲明**」記為 declaration（用於衝突判定）。
       *
       * ⚠️ 兩次假陽性教訓（與 METRIC_INTEGRITY_FIVE_TRAPS 的邊界陷阱同源）：
       *   首版把所有「提及」算宣告 → 19 個假衝突（`common.js` 註解提到 #15 被當成它聲明了 #15）。
       *   二版放寬到「任何 `* 门童 #N`」→ 仍有 6 個假衝突，因為：
       *     · hook 的 `echo "[X] 门童 #14 拦截: ..."` 是**引用**要呼叫的 guard
       *     · `test-*-guard.js` 檔頭寫「门童 #20 规则 D 回归测试」也是**引用**
       *   三版（現行）：**只在檔案頭註解區（前 20 行）且以 `*` 起頭**才算自身聲明。
       *     理由：門童的「這裡是我」宣告慣例都寫在檔案頭 docblock 首幾行。
       */
      const inHeader = i < 20;
      const isHeaderDecl = inHeader && /^\s*\*\s*(?:反审)?门童\s*#\d+/.test(l);
      if (isHeaderDecl) {
        for (const m of l.matchAll(/(?:门童|门禁|GUARD)\s*#(\d+)/g)) {
          const n = Number(m[1]);
          if (!declarations.has(n)) declarations.set(n, []);
          declarations.get(n).push({ file, line: i + 1, text: l.trim().slice(0, 100) });
        }
      }
      // 規則 ID：全大寫蛇形且長度 ≥8（如 DOUBLE_METHOD_RECOUNT）
      for (const m of l.matchAll(/\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+){1,6})\b/g)) {
        const id = m[1];
        if (id.length < 8) continue;
        if (/^(TRUE|FALSE|NULL|UNDEFINED|STRING|NUMBER|OBJECT|ARRAY)$/.test(id)) continue;
        if (!ruleIds.has(id)) ruleIds.set(id, []);
        ruleIds.get(id).push({ file, line: i + 1 });
      }
    });
  };

  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules') continue;
        walk(p);
      } else if (/\.(js|mjs|ts|sh)$/.test(e.name)) {
        // pre-commit 之類無副檔名者另行處理
        scanFile(p);
      } else if (e.name === 'pre-commit' || e.name === 'pre-push') {
        scanFile(p);
      }
    }
  };
  for (const r of ROOTS) walk(r);
  // canonical hook（無副檔名）
  for (const f of ['scripts/canonical/pre-commit', 'scripts/canonical/pre-push', '.githooks/pre-commit', '.githooks/pre-push']) {
    if (fs.existsSync(f)) scanFile(f);
  }

  return { numbers, declarations, ruleIds };
}

/**
 * 同一編號被多個**不同門童**聲明 = 真衝突。
 * 判據：只看 declarations（自身聲明），並把 hook 副本正規化為同一份
 *   （`.githooks/pre-commit` 與 `scripts/canonical/pre-commit` 是同檔的安裝副本）。
 */
function findConflicts(declarations) {
  const conflicts = [];
  const norm = (f) =>
    f
      .replace(/\\/g, '/')
      .replace(/^\.githooks\//, 'scripts/canonical/')
      .replace(/^scripts\//, 'scripts/');
  /**
   * 回歸測試檔**不是門童本體**：`scripts/test-*-guard.js` 檔頭寫「门童 #N 回归测试」
   * 是**引用它所測試的 guard**，不會與該 guard 爭編號（第三輪假陽性即此）。
   * → 排除檔名以 `test-` 起頭者，或含 `.test.` / `.spec.` 者。
   *   ⚠️ 首版正則 `(^|\/)(test-|.*\.(test|spec)\.)` 有 bug：
   *      `(^|\/)` 已吃掉 `/test-` 前的那個斜線，`test-` 分支又要從該斜線後直接匹配，
   *      對 `scripts/test-x.js` 而言 `/test-` 的斜線被 `(^|\/)` 消耗、`test-` 需匹配 `test-x` 起頭
   *      —— 看似可行，但與 `.*\.(test|spec)\.` 分支交替時回溯行為不符預期 → 漏配。
   *      改用最直觀的「檔名起頭」判定，不再靠複雜正則。
   */
  const isTestFile = (f) => {
    const base = f.replace(/\\/g, '/').split('/').pop() || '';
    return base.startsWith('test-') || base.includes('.test.') || base.includes('.spec.');
  };
  for (const [n, refs] of declarations) {
    const files = [...new Set(refs.filter((r) => !isTestFile(r.file)).map((r) => norm(r.file)))];
    if (files.length > 1) conflicts.push({ number: n, files, refs: refs.slice(0, 6) });
  }
  return conflicts.sort((a, b) => a.number - b.number);
}

const { numbers, declarations, ruleIds } = collect();
const conflicts = findConflicts(declarations);

const manifest = {
  schema: 'guard-manifest/v1',
  note:
    '門童編號與規則 ID 是**共享命名空間**：新增前必須先查本清單避免撞號（K3 2026-09-19 建議）。' +
    '產生器：scripts/gen-guard-manifest.mjs；校驗：node scripts/gen-guard-manifest.mjs（有衝突 exit 1）',
  generatedAt: new Date().toISOString(),
  guardNumbers: Object.fromEntries([...numbers].sort((a, b) => a[0] - b[0]).map(([n, refs]) => [n, [...new Set(refs.map((r) => r.file))]])),
  ruleIds: Object.fromEntries([...ruleIds].sort().map(([id, refs]) => [id, [...new Set(refs.map((r) => r.file))]])),
  maxGuardNumber: Math.max(...[...numbers.keys()]),
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`✅ 已寫入 ${OUT}`);
  console.log(`   門童編號 ${numbers.size} 個（最大 #${manifest.maxGuardNumber}）｜ 規則 ID ${ruleIds.size} 個`);
  if (conflicts.length) {
    console.log(`\n🔴 偵測到 ${conflicts.length} 個編號衝突（共用同號但不同門童）:`);
    for (const c of conflicts) {
      console.log(`   #${c.number}: ${c.files.join(' , ')}`);
      for (const r of c.refs.slice(0, 3)) console.log(`      ${r.file}:${r.line}  ${r.text}`);
    }
  } else {
    console.log('   ✅ 無編號衝突');
  }
  process.exit(conflicts.length ? 1 : 0);
}

// 校驗模式
const problems = [];
if (conflicts.length) {
  problems.push(`${conflicts.length} 個門童編號衝突`);
  for (const c of conflicts) {
    problems.push(`   #${c.number} 同時指派給: ${c.files.join(' , ')}`);
  }
}
if (problems.length) {
  console.log('🔴 [GUARD-MANIFEST] 衝突:');
  for (const p of problems) console.log(`   ${p}`);
  console.log('\n   修法: 新增門童前先查 scripts/guards/guard-manifest.json 的 maxGuardNumber, 取遞增值。');
  process.exit(1);
}
console.log(`✅ [GUARD-MANIFEST] 0 衝突 — 門童編號 ${numbers.size} 個（最大 #${manifest.maxGuardNumber}）｜ 規則 ID ${ruleIds.size} 個`);
