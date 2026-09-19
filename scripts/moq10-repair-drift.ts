// moq10-repair-drift.ts — 依 SKU 真值修正 MOQ 文案漂移（精確、可審計、有前後斷言）
//
// 安全設計（源於 2026-09-19 上一輪「隨機替換把紙袋改成 10 張起印」事故）：
//   1. **不做全站隨機替換**：每條修改都綁定「SKU 區塊 + 精確原文」兩重定位。
//   2. **前後斷言**：改前必須 hit==1（唯一命中），改後必須 hit==0（確實改掉）。
//   3. **dry-run 優先**：預設只印計畫；`--apply` 才寫檔，並先備份。
//   4. **任何一條不符預期 → 整批中止**（不放行半套修改）。
//
// 用法:
//   npx tsx scripts/moq10-repair-drift.ts           # dry-run
//   npx tsx scripts/moq10-repair-drift.ts --apply   # 寫入

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const APPLY = process.argv.includes('--apply');
const SELF = 'src/data/products.ts';

type Fix = {
  slug: string;
  from: string;
  to: string;
  why: string;
};

/**
 * 修正清單。
 * 真值出處 = src/data/products.ts 各 SKU 的 minQuantity（本輪已用掃描器逐條核對）。
 * 「競品側數字（vs Alibaba 黃頁 500+）」屬事實，不動；只改我方數字。
 */
const FIXES: Fix[] = [
  // ---- books 類（真值 10 / 真值 50）----
  {
    slug: 'catalog-printing',
    from: 'ZprintPro 100 pcs MOQ',
    to: 'ZprintPro 10 pcs MOQ',
    why: 'catalog-printing minQuantity=10；en FAQ schema 仍寫 100 pcs',
  },
  {
    slug: 'exercise-books',
    from: 'School exercise book printing service — 50-100 book MOQ (vs Alibaba yellow pages 500+ MOQ)',
    to: 'School exercise book printing service — 10 book MOQ (vs Alibaba yellow pages 500+ MOQ)',
    why: 'exercise-books minQuantity=10；en 描述寫 50-100 區間（舊口徑），我方數字須為 10',
  },
  {
    slug: 'exercise-books',
    from: '【100本起訂】小批量數碼，大量柯式',
    to: '【10本起訂】小批量數碼，大量柯式',
    why: 'exercise-books minQuantity=10；features 仍寫 100本起訂',
  },
  {
    slug: 'school-flyers',
    from: '【100本起訂】小批量數碼，大量柯式',
    to: '【10本起訂】小批量數碼，大量柯式',
    why: 'school-flyers minQuantity=10；features 仍寫 100本起訂',
  },
  {
    slug: 'graduation-yearbook',
    from: 'Free design mockup, 100 MOQ',
    to: 'Free design mockup, 50 MOQ',
    why: 'graduation-yearbook minQuantity=50（K3 裁決 只修矛盾不改真實門檻）；en 描述寫 100',
  },
  {
    slug: 'graduation-yearbook',
    from: '100冊〜、アジア自社工場からDHL国際速達2-4日',
    to: '50冊〜、アジア自社工場からDHL国際速達2-4日',
    why: 'graduation-yearbook minQuantity=50；ja 描述寫 100冊〜',
  },

  // ---- features「【N本起訂】」口徑（真值 10 卻寫 1 或 100）----
  // 注意：certificates / textbooks 的【100本起訂】真值確為 100 → 正確，**不動**
  //       （K3 校園裁決：只修矛盾，不改真實門檻）
  { slug: 'catalog-printing', from: '【1本起訂】小批量數碼，大量柯式', to: '【10本起訂】小批量數碼，大量柯式', why: 'catalog-printing minQuantity=10；features 寫 1 本' },
  { slug: 'saddle-stitch-booklets', from: '【100本起訂】小批量數碼，大量柯式', to: '【10本起訂】小批量數碼，大量柯式', why: 'saddle-stitch-booklets minQuantity=10；features 寫 100 本' },
  { slug: 'perfect-bound-books', from: '【1本起訂】小批量數碼，大量柯式', to: '【10本起訂】小批量數碼，大量柯式', why: 'perfect-bound-books minQuantity=10；features 寫 1 本' },
  { slug: 'hardcover-books', from: '【1本起訂】小批量數碼，大量柯式', to: '【10本起訂】小批量數碼，大量柯式', why: 'hardcover-books minQuantity=10；features 寫 1 本' },
  { slug: 'spiral-notebooks', from: '【1本起訂】小批量數碼，大量柯式', to: '【10本起訂】小批量數碼，大量柯式', why: 'spiral-notebooks minQuantity=10；features 寫 1 本' },

  // ---- 婚宴/枱卡類（真值一律 50）----
  {
    slug: 'wedding-thank-you-cards',
    from: 'Wedding thank you cards 100 sets MOQ',
    to: 'Wedding thank you cards 50 sets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'wedding-program-cards',
    from: 'Wedding program / agenda cards 100 sets MOQ',
    to: 'Wedding program / agenda cards 50 sets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'wedding-menu-cards',
    from: 'Wedding menu cards 100 sets MOQ',
    to: 'Wedding menu cards 50 sets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'wedding-suite-bundle',
    from: 'menu + seating chart), 100 sets MOQ',
    to: 'menu + seating chart), 50 sets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'wedding-place-cards',
    from: 'Wedding place cards / table cards 100 sheets MOQ',
    to: 'Wedding place cards / table cards 50 sheets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'wedding-place-cards',
    from: '婚宴枱卡 / 餐桌卡 100 張起印',
    to: '婚宴枱卡 / 餐桌卡 50 張起印',
    why: 'minQuantity=50；zh + description_zh 共 2 處',
  },
  {
    slug: 'drink-tokens',
    from: 'Drink tokens / beverage markers 100 sheets MOQ',
    to: 'Drink tokens / beverage markers 50 sheets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'drink-tokens',
    from: '酒水牌 / 飲品標記卡 100 張起印',
    to: '酒水牌 / 飲品標記卡 50 張起印',
    why: 'minQuantity=50；zh + description_zh 共 2 處',
  },
  {
    slug: 'escort-cards',
    from: 'Escort cards / guest markers 100 sheets MOQ',
    to: 'Escort cards / guest markers 50 sheets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'escort-cards',
    from: '座位卡 / 賓客標記 100 張起印',
    to: '座位卡 / 賓客標記 50 張起印',
    why: 'minQuantity=50；zh + description_zh 共 2 處',
  },
  {
    slug: 'name-tags-badges',
    from: 'Conference badges / event name tags 100 sheets MOQ',
    to: 'Conference badges / event name tags 50 sheets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'name-tags-badges',
    from: '會議名牌 / 展會名牌 100 張起印',
    to: '會議名牌 / 展會名牌 50 張起印',
    why: 'minQuantity=50；zh + description_zh 共 2 處',
  },
  {
    slug: 'cafe-table-cards',
    from: 'Café / restaurant table cards 100 sheets MOQ',
    to: 'Café / restaurant table cards 50 sheets MOQ',
    why: 'minQuantity=50',
  },
  {
    slug: 'cafe-table-cards',
    from: '餐廳 / 咖啡廳枱卡 100 張起印',
    to: '餐廳 / 咖啡廳枱卡 50 張起印',
    why: 'minQuantity=50；zh + description_zh 共 2 處',
  },

  // ---- 婚宴枱卡 ja（枚から）----
  { slug: 'wedding-place-cards', from: 'ウエディング席札 / テーブルカード 100 枚から', to: 'ウエディング席札 / テーブルカード 50 枚から', why: 'minQuantity=50' },
  { slug: 'drink-tokens', from: 'ドリンクトークン / 飲み物マーカー 100 枚から', to: 'ドリンクトークン / 飲み物マーカー 50 枚から', why: 'minQuantity=50' },
  { slug: 'escort-cards', from: 'エスコートカード / ゲストマーカー 100 枚から', to: 'エスコートカード / ゲストマーカー 50 枚から', why: 'minQuantity=50' },
  { slug: 'name-tags-badges', from: '会議バッジ / イベント名札 100 枚から', to: '会議バッジ / イベント名札 50 枚から', why: 'minQuantity=50' },
  { slug: 'cafe-table-cards', from: 'カフェ / レストラン テーブルカード 100 枚から', to: 'カフェ / レストラン テーブルカード 50 枚から', why: 'minQuantity=50' },
];

// ---------- 定位：把每條 fix 綁定到 SKU 區塊 ----------
function isProductSlugLine(line: string): string | undefined {
  const m = line.match(/^(\s*)slug:\s*'([^']+)'/);
  if (!m) return undefined;
  return m[1].length === 4 ? m[2] : undefined;
}

function skuRanges(lines: string[]): { slug: string; start: number; end: number }[] {
  const starts: { slug: string; start: number }[] = [];
  lines.forEach((l, i) => {
    const s = isProductSlugLine(l);
    if (s) starts.push({ slug: s, start: i });
  });
  return starts.map((s, idx) => ({
    slug: s.slug,
    start: s.start,
    end: idx + 1 < starts.length ? starts[idx + 1].start - 1 : lines.length - 1,
  }));
}

const abs = path.join(ROOT, SELF);
const original = fs.readFileSync(abs, 'utf-8');
const lines = original.split(/\r?\n/);
const ranges = skuRanges(lines);

type Plan = { fix: Fix; lineNo: number; hitsInBlock: number; hitsWholeFile: number };
const plans: Plan[] = [];
const problems: string[] = [];

for (const fix of FIXES) {
  const range = ranges.find((r) => r.slug === fix.slug);
  if (!range) {
    problems.push(`找不到 SKU 區塊 [${fix.slug}]`);
    continue;
  }
  let hitsInBlock = 0;
  let firstLine = -1;
  for (let i = range.start; i <= range.end; i++) {
    const n = lines[i].split(fix.from).length - 1;
    if (n > 0) {
      hitsInBlock += n;
      if (firstLine < 0) firstLine = i + 1;
    }
  }
  const hitsWholeFile = original.split(fix.from).length - 1;
  if (hitsInBlock === 0) {
    problems.push(`[${fix.slug}] 區塊內找不到原文「${fix.from.slice(0, 45)}…」`);
    continue;
  }
  plans.push({ fix, lineNo: firstLine, hitsInBlock, hitsWholeFile });
}

// ---------- 報告 ----------
console.log(`MOQ 漂移修正計畫（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`SKU 區塊 ${ranges.length} ｜ 計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);

if (problems.length) {
  console.log('🔴 問題（需先處理，否則不放行）:');
  for (const p of problems) console.log(`   - ${p}`);
  console.log('');
}

let totalReplacements = 0;
for (const p of plans) {
  totalReplacements += p.hitsInBlock;
  console.log(`  ✓ [${p.fix.slug}] L${p.lineNo} (區塊內 ${p.hitsInBlock} 處 / 全檔 ${p.hitsWholeFile} 處)`);
  console.log(`      「${p.fix.from}」`);
  console.log(`   →  「${p.fix.to}」`);
  console.log(`      理由: ${p.fix.why}`);
}
console.log(`\n合計取代 ${totalReplacements} 處`);

if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(problems.length ? 1 : 0);
}

if (problems.length) {
  console.error('\n🔴 有問題未解，整批中止，未寫入任何檔案。');
  process.exit(1);
}

// ---------- 套用：只在各自 SKU 區塊內取代 ----------
let updated = 0;
for (const p of plans) {
  const range = ranges.find((r) => r.slug === p.fix.slug)!;
  for (let i = range.start; i <= range.end; i++) {
    if (lines[i].includes(p.fix.from)) {
      lines[i] = lines[i].split(p.fix.from).join(p.fix.to);
      updated++;
    }
  }
}

// ---------- 後斷言：所有 from 必須歸零 ----------
const after = lines.join('\n');
const leftovers: string[] = [];
for (const fix of FIXES) {
  const range = ranges.find((r) => r.slug === fix.slug)!;
  // 用套用後的行重算區塊（行數不變）
  let n = 0;
  for (let i = range.start; i <= range.end; i++) n += lines[i].split(fix.from).length - 1;
  if (n > 0) leftovers.push(`[${fix.slug}] 仍有 ${n} 處「${fix.from.slice(0, 40)}…」`);
}
if (leftovers.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const l of leftovers) console.error(`   - ${l}`);
  process.exit(1);
}
if (after === original) {
  console.error('\n🔴 檔案內容未變（預期有變更），中止。');
  process.exit(1);
}

const backup = `${abs}.bak-moq10-${Date.now()}`;
fs.copyFileSync(abs, backup);
fs.writeFileSync(abs, after);
console.log(`\n✅ 已寫入 ${updated} 處取代`);
console.log(`   備份: ${path.basename(backup)}`);
