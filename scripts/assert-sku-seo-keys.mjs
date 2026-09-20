#!/usr/bin/env node
/**
 * scripts/assert-sku-seo-keys.mjs — sku-seo-data.ts 的 key 集合斷言（方案 C 第一步）
 *
 * ══════════════════════════════════════════════════════════════════════════
 * 為什麼需要（K3 2026-09-20 裁決「方案 C 第一步」）
 * ══════════════════════════════════════════════════════════════════════════
 * 事故背景：2026-09-20 改 CSV 後重跑 `csv-to-sku-seo.mjs`，生成器只輸出 **75 entries**，
 *   而 `sku-seo-data.ts` 有 **99 個 key** → 直接採用會**丟失 25 個 SKU**
 *   （diff 4697 行）。已即時還原，但暴露結構性風險：
 *   **該檔是「生成器產物 + 手工擴充」混合檔，生成器已非其完整來源。**
 *
 * K3 指定的 3 條斷言：
 *   ① 斷言總 key 數 = 99
 *   ② GENERATED 區 + MANUAL 區的 key 集合無交集
 *   ③ MANUAL 區的 key 數在生成前後不變
 *
 * ⚠️ 本檔**只建立測試基線，不碰生成器邏輯**（K3 明示）。
 *    目前檔案尚無區塊標記（那是方案 C 第三步）→ 斷言 ②③ 以
 *    「未分區時的退化模式」執行：整體視為單一區塊，記錄 key 集合快照供前後比對。
 *
 * 用法:
 *   node scripts/assert-sku-seo-keys.mjs            # 斷言（exit 1 = 失敗）
 *   node scripts/assert-sku-seo-keys.mjs --snapshot  # 另存 key 集合快照（生成前）
 *   node scripts/assert-sku-seo-keys.mjs --compare   # 與快照比對（生成後）
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET = path.join(ROOT, 'src/data/sku-seo-data.ts');
const SNAPSHOT = path.join(ROOT, '.hermes/logs/sku-seo-keys-snapshot.json');

/** 期望的總 key 數（2026-09-20 基線） */
const EXPECT_TOTAL_KEYS = 99;

const MARKERS = {
  genStart: '=== GENERATED_START ===',
  genEnd: '=== GENERATED_END ===',
  manStart: '=== MANUAL_START ===',
  manEnd: '=== MANUAL_END ===',
};

// ── 讀檔與抽取 ──────────────────────────────────────────────
if (!fs.existsSync(TARGET)) {
  console.error(`🔴 找不到 ${TARGET}`);
  process.exit(1);
}
const src = fs.readFileSync(TARGET, 'utf8');
const lines = src.split(/\r?\n/);

/** 抽取 `  "slug": {` 形式的 key（含行號與所屬區塊） */
function extractKeys() {
  const out = [];
  lines.forEach((l, i) => {
    const m = l.match(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/);
    if (m) out.push({ key: m[1], line: i + 1 });
  });
  return out;
}

/** 依標記切出區塊（未分區時回傳 null） */
function sectionRanges() {
  const find = (marker) => lines.findIndex((l) => l.includes(marker));
  const gs = find(MARKERS.genStart);
  const ge = find(MARKERS.genEnd);
  const ms = find(MARKERS.manStart);
  const me = find(MARKERS.manEnd);
  if (gs < 0 || ge < 0 || ms < 0 || me < 0) return null;
  return { gen: [gs, ge], man: [ms, me] };
}

const keys = extractKeys();
const keySet = new Set(keys.map((k) => k.key));
const dups = keys.map((k) => k.key).filter((k, i) => keys.findIndex((x) => x.key === k) !== i);
const ranges = sectionRanges();

const problems = [];
const infos = [];

// ── 斷言 ①：總 key 數 ───────────────────────────────────────
if (keySet.size !== EXPECT_TOTAL_KEYS) {
  problems.push(
    `斷言① 失敗：總 key 數 ${keySet.size} ≠ 期望 ${EXPECT_TOTAL_KEYS}` +
      `（若為刻意變更，請同步更新本檔 EXPECT_TOTAL_KEYS 並在 commit message 說明）`
  );
} else {
  infos.push(`斷言① 通過：總 key 數 = ${keySet.size}`);
}
if (dups.length) problems.push(`斷言① 附帶：發現重複 key ${[...new Set(dups)].join(', ')}`);

// ── 斷言 ②：GENERATED ∩ MANUAL = ∅ ──────────────────────────
let genKeys = [];
let manKeys = [];
if (!ranges) {
  infos.push(
    '斷言② 退化模式：尚未分區（無 GENERATED/MANUAL 標記）— 整體視為單一區塊。' +
      '正式分區為方案 C 第三步；現階段僅記錄 key 集合快照供前後比對。'
  );
  genKeys = [...keySet];
  manKeys = [];
} else {
  const inRange = (line, [s, e]) => line >= s && line <= e;
  genKeys = keys.filter((k) => inRange(k.line - 1, ranges.gen)).map((k) => k.key);
  manKeys = keys.filter((k) => inRange(k.line - 1, ranges.man)).map((k) => k.key);
  const inter = genKeys.filter((k) => manKeys.includes(k));
  if (inter.length) {
    problems.push(`斷言② 失敗：GENERATED 與 MANUAL 區塊 key 交集非空：${inter.join(', ')}`);
  } else {
    infos.push(`斷言② 通過：GENERATED(${genKeys.length}) ∩ MANUAL(${manKeys.length}) = ∅`);
  }
  // 區塊標記配對檢查
  if (ranges.gen[0] > ranges.gen[1] || ranges.man[0] > ranges.man[1]) {
    problems.push('斷言② 附帶：區塊標記順序顛倒（START 在 END 之後）');
  }
  const between = keySet.size - genKeys.length - manKeys.length;
  if (between !== 0) {
    problems.push(`斷言② 附帶：有 ${between} 個 key 落在兩區塊之外（歸屬不明）`);
  }
}

// ── 斷言 ③：MANUAL 區 key 數前後不變（與快照比對） ──────────
const snap = fs.existsSync(SNAPSHOT) ? JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8')) : null;

if (process.argv.includes('--snapshot')) {
  fs.writeFileSync(
    SNAPSHOT,
    JSON.stringify(
      {
        takenAt: new Date().toISOString().slice(0, 19),
        totalKeys: keySet.size,
        genKeys,
        manKeys,
        allKeys: [...keySet].sort(),
      },
      null,
      2
    ) + '\n',
    'utf8'
  );
  console.log(`✅ 已存快照 ${path.relative(ROOT, SNAPSHOT)}（總 ${keySet.size} / MANUAL ${manKeys.length}）`);
} else if (process.argv.includes('--compare')) {
  if (!snap) {
    problems.push('斷言③ 失敗：找不到快照，請先跑 --snapshot（於生成前）');
  } else {
    const lost = snap.allKeys.filter((k) => !keySet.has(k));
    const added = [...keySet].filter((k) => !snap.allKeys.includes(k));
    const manLost = (snap.manKeys || []).filter((k) => !keySet.has(k));
    if (manLost.length) {
      problems.push(`斷言③ 失敗：MANUAL 區丟失 ${manLost.length} 個 key：${manLost.join(', ')}`);
    } else {
      infos.push(`斷言③ 通過：MANUAL 區 key 無丟失（快照 ${snap.manKeys?.length ?? 0} 個）`);
    }
    if (lost.length) problems.push(`斷言③ 附帶：總體丟失 ${lost.length} 個 key：${lost.join(', ')}`);
    if (added.length) infos.push(`斷言③ 附帶：新增 ${added.length} 個 key：${added.slice(0, 10).join(', ')}`);
    infos.push(`快照時間 ${snap.takenAt}（總 ${snap.totalKeys}）→ 現在（總 ${keySet.size}）`);
  }
} else if (snap) {
  infos.push(`快照存在（${snap.takenAt}，總 ${snap.totalKeys}）— 生成後請跑 --compare 驗證 MANUAL 區未丟失`);
}

// ── 輸出 ────────────────────────────────────────────────────
console.log('sku-seo-data.ts key 集合斷言（方案 C 第一步）\n');
for (const i of infos) console.log(`  ℹ️  ${i}`);
if (problems.length) {
  console.log('');
  for (const p of problems) console.log(`  🔴 ${p}`);
  console.log(`\n結果: FAIL ${problems.length} 條`);
  process.exit(1);
}
console.log(`\n結果: PASS — 全部斷言通過（總 key ${keySet.size}）`);
