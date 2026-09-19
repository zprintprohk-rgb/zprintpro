// moq10-classify-blog-books.ts — 逐條判斷博客「書刊/校園」條目的產品歸屬 (真門檻對照)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const s = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf-8');
const lines = s.split('\n');

/** 真實門檻 */
const T = {
  'saddle-stitch-booklets': 10, 'catalog-printing': 10, 'perfect-bound-books': 10,
  'hardcover-books': 10, 'spiral-notebooks': 10, 'exercise-books': 10, 'school-flyers': 10,
  textbooks: 100, certificates: 100, 'graduation-yearbook': 50, 'doujinshi-printing': 10,
};

/** 關鍵詞 → SKU (由產品名/描述特性判斷) */
const RULES: [RegExp, keyof typeof T, string][] = [
  [/教科書|教材|textbook/i, 'textbooks', '教科書/教材 → 100 (未改, 正確)'],
  [/證書|certificate/i, 'certificates', '證書 → 100 (未改, 正確)'],
  [/畢業冊|畢業紀念冊|畢業紀念|graduation|yearbook/i, 'graduation-yearbook', '畢業冊 → 50 (未改, 正確)'],
  [/練習簿|練習冊|作業簿|exercise/i, 'exercise-books', '練習冊 → 10 (第三波已改)'],
  [/騎馬釘|saddle/i, 'saddle-stitch-booklets', '騎馬釘 → 10 (第三波已改)'],
  [/畫冊|型錄|catalog/i, 'catalog-printing', '畫冊/型錄 → 10 (第三波已改)'],
  [/無線膠裝|perfect/i, 'perfect-bound-books', '無線膠裝 → 10 (第三波已改)'],
  [/精裝|hardcover/i, 'hardcover-books', '精裝書 → 10 (第三波已改)'],
  [/線圈|spiral/i, 'spiral-notebooks', '線圈 → 10 (第三波已改)'],
  [/同人|zine|小誌/i, 'doujinshi-printing', '同人/小誌 → 10'],
  [/學校.*單張|school flyer/i, 'school-flyers', '學校單張 → 10'],
];

const MOQ = /(\d+)\s*(本|張|個|冊|部)\s*起|\bMOQ\s*(\d+)\b|(\d+)\s*[- ]copy\s*MOQ|(\d+)\s*冊から|(\d+)\s*部から|(\d+)\s*枚から/gi;

let rows = 0;
lines.forEach((l, i) => {
  MOQ.lastIndex = 0;
  const m = [...l.matchAll(MOQ)];
  if (!m.length) return;
  const nums = m.map((x) => Number(x[1] ?? x[3] ?? x[4] ?? x[5] ?? x[6] ?? x[7] ?? 0)).filter((n) => n === 100 || n === 50);
  if (!nums.length) return;

  const rule = RULES.find(([re]) => re.test(l));
  if (!rule) return;
  const [, sku, why] = rule;
  const truth = T[sku as keyof typeof T];
  const stale = nums.some((n) => n !== truth);
  if (!stale) return;   // 宣稱值 == 真實門檻 → 正確, 不動

  rows++;
  console.log(`L${i + 1}  宣稱 ${[...new Set(nums)].join('/')} vs 真實 ${truth}  [${why}]`);
  console.log(`   ${l.trim().slice(0, 165)}`);
});
console.log(`\n需修 (宣稱 ≠ 真實門檻): ${rows} 條`);
