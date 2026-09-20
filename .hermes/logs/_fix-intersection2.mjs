// .hermes/logs/_fix-intersection2.mjs — 修正交集剩餘 4 條（第二輪：變體涵蓋）
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/sku-seo-data.ts';

/** [slug, 行號, 原文, 新文, 說明] */
const FIXES = [
  ['drink-menus', 2126, '最小注文は100枚からです。', '最小注文は10枚からです。', 'ja body 第二處（FAQ 已於第一輪修正）'],
  ['rounded-corner-greeting-cards', 3694, '角丸グリーティングカード印刷 100枚〜', '角丸グリーティングカード印刷 10枚〜', 'ja title 對齊真值 10'],
  ['drink-tokens', 3746, '50〜100枚からご注文いただけます', '50枚からご注文いただけます', 'ja 範圍表述對齊真值 50'],
  ['name-tags-badges', 3776, '50〜100枚からご注文いただけます', '50枚からご注文いただけます', 'ja 範圍表述對齊真值 50'],
];

const lines = fs.readFileSync(FILE, 'utf8').split(/\r?\n/);
const plans = [];
const problems = [];

for (const [slug, lineNo, from, to, why] of FIXES) {
  const idx = lineNo - 1;
  const line = lines[idx];
  if (!line) {
    problems.push(`L${lineNo} [${slug}] 行不存在`);
    continue;
  }
  const cnt = line.split(from).length - 1;
  if (cnt === 0) {
    problems.push(`L${lineNo} [${slug}] 找不到「${from.slice(0, 45)}」`);
    continue;
  }
  plans.push({ slug, lineNo, from, to, why, idx, cnt });
}

console.log(`交集剩餘 4 條修正（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);
for (const p of plans) {
  console.log(`  L${p.lineNo} [${p.slug}] ×${p.cnt}`);
  console.log(`     「${p.from.slice(0, 60)}」→「${p.to.slice(0, 60)}」`);
}
if (problems.length) {
  console.log('\n問題:');
  for (const x of problems) console.log(`   - ${x}`);
}
if (!APPLY) {
  console.log('\n（dry-run，未寫檔）');
  process.exit(0);
}
if (problems.length) {
  console.error('\n🔴 有問題，整批中止');
  process.exit(1);
}

const keysBefore = (lines.join('\n').match(/^ {2}"[a-z0-9][a-z0-9-]*":\s*\{/gm) || []).length;
const lineCountBefore = lines.length;

for (const p of plans) lines[p.idx] = lines[p.idx].split(p.from).join(p.to);

const after = lines.join('\n');
const afterLines = after.split(/\r?\n/);
const bad = [];
for (const p of plans) {
  if (afterLines[p.idx].includes(p.from)) bad.push(`L${p.lineNo} 舊文殘留`);
  if (!afterLines[p.idx].includes(p.to)) bad.push(`L${p.lineNo} 新文未寫入`);
}
const keysAfter = (after.match(/^ {2}"[a-z0-9][a-z0-9-]*":\s*\{/gm) || []).length;
if (keysAfter !== keysBefore) bad.push(`key 數 ${keysBefore}→${keysAfter}`);
if (afterLines.length !== lineCountBefore) bad.push(`行數變動`);
if (bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${FILE}.bak-intersect2-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 條（key 數不變 ${keysAfter}）`);
console.log(`   備份: ${backup}`);
