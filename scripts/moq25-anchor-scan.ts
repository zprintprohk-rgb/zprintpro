// scripts/moq25-anchor-scan.ts — Anchor 掃描器（門童 #25 候選）
//
// ══════════════════════════════════════════════════════════════════════════
// 為什麼需要（K3 2026-09-19 建議）
// ══════════════════════════════════════════════════════════════════════════
// 現有 `moq10-books-context-scan.ts` 是**關鍵詞中心**：正則掃「N 張起」，
// 再靠「後向最近 SKU key」推斷歸屬。本輪實測它在跨品類檔上四度失準：
//   ① 只認一種 key 風格 → 4 個目標檔整檔跳過（覆蓋率 8%）
//   ② 跨品類綜合內容 → 歸屬錯誤（賀卡區塊內實為貼紙/紙袋的數字）
//   ③ 品類級文案無 SKU key → 整段跳過
//   ④ 快照靜默過期 → 分析基於舊真值
//
// K3 建議改為 **SKU 中心**：
//   · 以 SKU 為中心 → 不需要區分 key 風格（slug: / "slug": / record key）
//   · 以**段落**為單位 → 避開「判定域」與「歸屬」的雙重陷阱
//   · **雙向驗證** → 既發現「真值 100 但宣稱 10」，也發現「真值 10 但宣稱 100」
//
// ══════════════════════════════════════════════════════════════════════════
// 判據（與關鍵詞中心互補，兩者並行運行、互相比對）
// ══════════════════════════════════════════════════════════════════════════
//   1. anchor = SKU 的名稱變體（zh name / nameEn / nameJa / slug）
//   2. 在每個「段落」（HTML 塊 / JSON 欄位值 / TS 欄位值）內找 anchor
//   3. 該段落**同時**命中 anchor 與 MOQ 樣式 → 該 MOQ 數字即「此 SKU 的宣稱」
//   4. 宣稱 ≠ 真值 → 漂移
//
// ⚠️ 已知邊界（誠實標註，不假裝完備）：
//   · anchor 必須夠特異（如「PVC餐牌」），過短的 anchor（如「餐牌」）會撈到別品類
//   · 段落同時講多個 SKU 時仍可能歸屬模糊 → 標記 `AMBIGUOUS` 而非直接判漂移
//
// 用法:
//   npx tsx scripts/moq25-anchor-scan.ts            # 人讀報告
//   npx tsx scripts/moq25-anchor-scan.ts --json     # 機器讀（同時落盤）
//   npx tsx scripts/moq25-anchor-scan.ts --gate     # 閘門：有未登錄項則 exit 1

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const AS_JSON = process.argv.includes('--json');
const AS_GATE = process.argv.includes('--gate');

const TRUTH_FILE = 'src/data/products.ts';
const SCAN_FILES = [
  'src/data/products.ts',
  'src/data/sku-seo-data.ts',
  'src/data/products-content.ts',
  'src/lib/seo.ts',
  'src/data/category-seo-content.ts',
];

// ── MOQ 樣式（沿用已在 moq10 驗證過的模式，避免重造） ──
const MOQ_PATTERNS: RegExp[] = [
  /(?:^|[^\d,])(\d+)\s*本\s*起(?:印|訂)?(?!\s*\/)/g,
  /(?:^|[^\d,])(\d+)\s*張\s*起(?:印|訂)?(?!\s*\/)/g,
  /(?:^|[^\d,])(\d+)\s*個\s*起(?:印|訂)?(?!\s*\/)/g,
  /(?:^|[^\d,])(\d+)\s*份\s*起(?:印|訂)?(?!\s*\/)/g,
  /(?:^|[^\d,])(\d+)\s*枚\s*(?:から|〜|~)/g,
  /(?:^|[^\d,])(\d+)\s*冊\s*(?:から|〜|~)/g,
  /(?:^|[^\d,])(\d+)[ \t]+(?:[A-Za-z]{3,12}[ \t]+)?(?:MOQ|Copies|copies)\b/g,
  // 無「起」字的變體：`100 MOQ` / `最小注文は 100 枚から`（已含） / `from 100`
  /(?:^|[^\d,])(\d+)\s*(?:pcs?|sheets?|copies)\s*MOQ\b/gi,
];

/** 真值 + anchor 詞（來自 products.ts 的 name / nameEn / nameJa / slug） */
type Sku = { slug: string; truth: number; anchors: string[] };

function readSkus(): Sku[] {
  const lines = fs.readFileSync(path.join(ROOT, TRUTH_FILE), 'utf-8').split(/\r?\n/);
  const skus: Sku[] = [];
  let cur: { slug: string; name?: string; nameEn?: string; nameJa?: string; truth?: number } | null = null;
  const flush = () => {
    if (cur && cur.slug && typeof cur.truth === 'number') {
      const anchors = new Set<string>();
      anchors.add(cur.slug);
      for (const n of [cur.name, cur.nameEn, cur.nameJa]) {
        if (!n) continue;
        // 取名稱的第一段（以 / | · — 分隔）作為主 anchor，去掉修飾
        for (const part of n.split(/[\/|·—,，]/)) {
          const t = part.trim();
          if (t.length >= 3 && t.length <= 24) anchors.add(t);
        }
      }
      skus.push({ slug: cur.slug, truth: cur.truth, anchors: [...anchors] });
    }
  };
  for (const line of lines) {
    const s = line.match(/^ {4}slug: '([^']+)'/);
    if (s) {
      flush();
      cur = { slug: s[1] };
      continue;
    }
    if (!cur) continue;
    if (line.includes('name:') || line.includes('nameEn:') || line.includes('nameJa:')) {
      const mz = line.match(/name:\s*'([^']*)'/);
      if (mz && !cur.name) cur.name = mz[1];
      const me = line.match(/nameEn:\s*'([^']*)'/);
      if (me && !cur.nameEn) cur.nameEn = me[1];
      const mj = line.match(/nameJa:\s*'([^']*)'/);
      if (mj && !cur.nameJa) cur.nameJa = mj[1];
    }
    const mq = line.match(/^\s*minQuantity:\s*(\d+)/);
    if (mq && typeof cur.truth !== 'number') cur.truth = Number(mq[1]);
  }
  flush();
  return skus;
}

/**
 * 段落切分。
 * 判據：以「結構邊界」切——HTML 塊（`</p>` / `</div>` / `\n\n`）、
 *   JSON/TS 欄位值（`"key": "…"` 或 `key: '…'`）、行。
 * 目的：讓 anchor 與 MOQ 落在**同一語義單元**內，而非全檔亂配。
 */
function segmentsOf(text: string): { text: string }[] {
  const segs: { text: string }[] = [];
  // 先按整體切成「欄位級」單元
  const units = text.split(/(?<=",)|(?<=',)|(?<=\\n\\n)|(?<=<\/p>)|(?<=<\/div>)/);
  for (const u of units) {
    if (u.length < 8 || u.length > 6000) continue;
    segs.push({ text: u });
  }
  return segs;
}

type Finding = {
  file: string;
  line: number;
  slug: string;
  truth: number;
  found: number;
  anchor: string;
  ambiguous: boolean;
  text: string;
};

const skus = readSkus();

/**
 * ★ anchor 唯一性過濾（2026-09-19 首版實測：2442 條候選中 2299 條「歸屬模糊」）
 *
 * 根因：anchor 抽取把**通用類別詞**也收進來了（「包裝盒」「餐牌」「貼紙」）——
 *   這些詞在 10+ 個 SKU 的名稱裡都出現 → 任一含該詞的段落被**多個 SKU 同時認領**
 *   → 一個數字被判成 N 個 SKU 的漂移，且全部標記模糊，報告失去可用性。
 *
 * 修法：只保留**在此 SKU 內出現、且在全部 SKU 名稱中唯一**的 anchor。
 *   · 統計每個 anchor 被多少個 SKU 認領
 *   · 認領數 > 1 → 剔除（不具區分度）
 *   · 剔除後若某 SKU **無 anchor 可用** → 該 SKU 記為「anchor 不足」，
 *     明確排除在掃描之外（**不靜默跳過**，避免重演「0 命中 ≠ 乾淨」）
 */
const anchorOwners = new Map<string, Set<string>>();
for (const s of skus) {
  for (const a of s.anchors) {
    if (!anchorOwners.has(a)) anchorOwners.set(a, new Set());
    anchorOwners.get(a)!.add(s.slug);
  }
}
const uniqueAnchor = (a: string) => (anchorOwners.get(a)?.size ?? 0) === 1;

const skuNoAnchor: string[] = [];
const usable: Sku[] = [];
for (const s of skus) {
  const keep = s.anchors.filter(uniqueAnchor);
  if (!keep.length) {
    skuNoAnchor.push(s.slug);
    continue;
  }
  usable.push({ ...s, anchors: keep });
}

const findings: Finding[] = [];
const stats = { files: 0, segments: 0, anchorHit: 0, moqHit: 0, pairs: 0, skuScanned: usable.length, skuNoAnchor: skuNoAnchor.length };

for (const file of SCAN_FILES) {
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) continue;
  stats.files++;
  const text = fs.readFileSync(abs, 'utf-8');

  for (const seg of segmentsOf(text)) {
    // 該段命中哪些 SKU anchor（anchor 已唯一化 → 多命中即真模糊）
    const hitSkus = usable.filter((s) => s.anchors.some((a) => seg.text.includes(a)));
    if (!hitSkus.length) continue;
    stats.anchorHit++;

    // 該段的 MOQ 數字
    const moqs: { value: number; raw: string }[] = [];
    for (const re of MOQ_PATTERNS) {
      const r = new RegExp(re.source, re.flags);
      let m: RegExpExecArray | null;
      while ((m = r.exec(seg.text))) moqs.push({ value: Number(m[1]), raw: m[0] });
    }
    if (!moqs.length) continue;
    stats.moqHit++;

    for (const s of hitSkus) {
      for (const q of moqs) {
        if (q.value === s.truth) continue;
        stats.pairs++;
        // 定位行號
        const at = text.indexOf(seg.text.slice(0, 60));
        const line = at >= 0 ? text.slice(0, at).split(/\r?\n/).length : 0;
        const anchorUsed = s.anchors.find((a) => seg.text.includes(a)) ?? '';
        findings.push({
          file,
          line,
          slug: s.slug,
          truth: s.truth,
          found: q.value,
          anchor: anchorUsed,
          ambiguous: hitSkus.length > 1,
          text: seg.text.replace(/\s+/g, ' ').slice(0, 150),
        });
      }
    }
  }
}

const payload = {
  scannedAt: new Date().toISOString().slice(0, 19),
  skuCount: skus.length,
  skuScanned: usable.length,
  skuNoAnchor,
  stats,
  total: findings.length,
  ambiguous: findings.filter((f) => f.ambiguous).length,
  findings,
};
fs.writeFileSync('.hermes/logs/moq-anchor-scan-latest.json', JSON.stringify(payload, null, 2) + '\n', 'utf8');

if (AS_JSON) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  console.log('MOQ Anchor 掃描（SKU 中心 · 段落為單位 · anchor 唯一化）');
  console.log(`SKU ${skus.length} 個 ｜ 可掃 ${usable.length} ｜ anchor 不足 ${skuNoAnchor.length}`);
  console.log(`掃描檔 ${stats.files} ｜ 段落命中 anchor ${stats.anchorHit} ｜ 含 MOQ ${stats.moqHit}`);
  console.log(`候選 ${findings.length} 條（歸屬模糊 ${payload.ambiguous} 條）\n`);
  if (skuNoAnchor.length) {
    console.log(`⚠️ anchor 不足而排除的 SKU（${skuNoAnchor.length} 個）—— 非「無問題」，是「掃不了」：`);
    console.log(`   ${skuNoAnchor.slice(0, 12).join(', ')}${skuNoAnchor.length > 12 ? ' …' : ''}\n`);
  }
  const bySlug = new Map<string, Finding[]>();
  for (const f of findings) {
    if (!bySlug.has(f.slug)) bySlug.set(f.slug, []);
    bySlug.get(f.slug)!.push(f);
  }
  for (const [slug, arr] of [...bySlug].sort((a, b) => b[1].length - a[1].length).slice(0, 15)) {
    const amb = arr.filter((x) => x.ambiguous).length;
    console.log(`  [${slug}] 真值 ${arr[0].truth} — ${arr.length} 條（模糊 ${amb}）`);
    for (const f of arr.filter((x) => !x.ambiguous).slice(0, 2)) {
      console.log(`     ${f.file.split('/').pop()}:${f.line} found=${f.found} anchor=「${f.anchor}」`);
      console.log(`        ${f.text.slice(0, 120)}`);
    }
  }
  console.log(`\n明細: .hermes/logs/moq-anchor-scan-latest.json`);
}

if (AS_GATE) {
  // 閘門模式：只擋「非模糊」且未登錄者（模糊者人工複核）
  if (findings.length > 0) {
    console.error(`\n[ANCHOR GATE] FAIL — ${findings.length} 條 anchor 漂移候選（${payload.ambiguous} 條歸屬模糊）`);
    process.exit(1);
  }
  console.log('\n[ANCHOR GATE] PASS');
}
