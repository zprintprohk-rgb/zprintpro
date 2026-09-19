// moq10-locate-exact.ts — 用「線上實際出現的原文片段」精確定位來源
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** 線上 books 品類頁實際出現的陳舊片段 (探針原文) → 目標真值 */
const NEEDLES: [string, string, string][] = [
  ['目錄/雜誌/練習冊 100 本起', '10 本起', 'saddle-stitch SKU 描述 (真值 10)'],
  ['適合藝術展覽圖錄、品牌作品集、攝影集、企業年報、珍藏紀念冊。50 本起印', '10 本起印', 'catalog-printing SKU 描述 (真值 10)'],
  ['線圈筆記本印刷，企業禮品、補習社教材、培訓手冊、校園紀念本首選。金屬/塑料 YO 圈可拆卸重組，100 本起印。', '10 本起印', 'spiral-notebooks SKU 描述 (真值 10)'],
  ['Bulk Catalog Printing 50本起 · 全球配送', '10本起 · 全球配送', '畫冊產品卡 alt 文字 (真值 10)'],
  ['小批量靈活化 (50 本起 MOQ + 30 秒 AI 報價)', '小批量靈活化 (10 本起 MOQ + 30 秒 AI 報價)', 'books 品類 SEO (真值 10)'],
  ['香港畫冊/攝影集/產品型錄印刷服務，色彩還原度達 95%+。適合藝術展覽圖錄、品牌作品集、攝影集、企業年報、珍藏紀念冊。50 本起印', '10 本起印', 'books 品類 SEO 描述'],
];

const DIRS = ['src/data', 'src/lib', 'src/components', 'src/app'];
const files: string[] = [];
function walk(d: string) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx|json)$/.test(f.name) && !/\.bak/.test(f.name)) files.push(p.replace(/\\/g, '/'));
  }
}
for (const d of DIRS) if (fs.existsSync(d)) walk(d);

for (const [needle, target, why] of NEEDLES) {
  const hits: string[] = [];
  for (const f of files) {
    const s = fs.readFileSync(path.join(ROOT, f), 'utf-8');
    const n = s.split(needle).length - 1;
    if (n) hits.push(`${f} ×${n}`);
  }
  console.log(`${hits.length ? '✓ 找到' : '✗ 未找到'} — ${why}`);
  console.log(`   片段: 「${needle.slice(0, 60)}…」`);
  console.log(`   目標: ${target}`);
  if (hits.length) console.log(`   來源: ${hits.join(' | ')}`);
  console.log('');
}
