/**
 * 修正注册: 把 lpZineSmallBatchBookletGuide 的 const 声明放到数组**之外**
 * (首版误插在 `lpPackagingBoxPrice2026,\n  ];` 位置 = 数组字面量内部 → TS1137 语法错误)
 *
 * §12 三件套: 计数断言 + 形状断言 + 备份
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-zine-post-20260918');
const FILE = path.join(ROOT, 'src/data/blog-posts.ts');
const ARRAY_DECL = 'export const blogPosts: BlogPostMeta[] = [';
const ARRAY_TAIL_ANCHOR = '  lpPackagingBoxPrice2026,\n  ];';
const NAME = 'lpZineSmallBatchBookletGuide';

const raw = fs.readFileSync(path.join(BAK, 'blog-posts.ts'), 'utf8');

console.log('===== 阶段 1: 前置断言 (基于首版前的干净备份) =====');
let fail = 0;
const okA = raw.includes(ARRAY_DECL);
const okB = raw.split(ARRAY_TAIL_ANCHOR).length - 1 === 1;
const okC = !raw.includes(NAME);
console.log(`${okA ? 'OK  ' : 'FAIL'} 数组声明存在`);
console.log(`${okB ? 'OK  ' : 'FAIL'} 数组尾锚点唯一 (实测 ${raw.split(ARRAY_TAIL_ANCHOR).length - 1})`);
console.log(`${okC ? 'OK  ' : 'FAIL'} ${NAME} 尚未注册`);
if (!okA || !okB || !okC) { console.error('❌ 前置断言未过'); process.exit(1); }

const BLOCK = `// 2026-09-18 新需求承接 #1 (K3 2026-09-17 拍板: 4 篇新需求承接提前至 P0 三篇之前)
// 依据: docs/2026-09-17-website-traffic-expansion-plan-v1.md §五 路径 1 第 1 项 + §四 差距矩阵 (zine en/zh-hk 侧空白)
// 承接 SKU: saddle-stitch-booklets (BK-002) | 9 段 + 5 FAQ + 3 CTA + 2 表格 + 3 快速答案块 + 8 内链 + 3 locale native
// 价格口径来源: 线上 PDP 结构化区 (2026-09-18 curl): 100 本起印 / HK$6-32/本 / 5,000 本低至 HK$1.20/本
const ${NAME}: BlogPostMeta = {
  slug: 'zine-small-batch-booklet-printing-guide',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-18',
  title: {
    'zh-hk': '小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起 HK$6 起 | 智印港',
    en: 'Zine Printing Guide: 8-64pp, 100 MOQ, HK$6/pc | ZprintPro',
    ja: 'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
  },
  excerpt: {
    'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 每本約 HK$6-32, 5,000 本批量低至 HK$1.20/本. 內頁 80-100g 書紙或 128-157g 銅版紙, 封面可覆膜, 頁數須為 4 的倍數, 標準交期 5-7 個工作天, 提交檔案 1 小時內免費打稿, 滿 HK$500 港九新界順豐免運, DHL 全球 2-4 天.',
    en: 'Zine printing from 100 copies, saddle stitch 8-64 pages, about HK$6-32 per copy and HK$1.20 per copy at 5,000. Interior in 80-100gsm woodfree or 128-157gsm art paper, optional cover lamination, page count must divide by 4. 5-7 working day turnaround, free proof within 1 hour, DHL worldwide in 2-4 days.',
    ja: 'ジン（Zine）印刷は 100 部から、中綴じ 8〜64 ページ、1 部あたり約 HK$6〜32、5,000 部で HK$1.20。本文は 80〜100g 上質紙または 128〜157g コート紙、表紙ラミネート可、ページ数は 4 の倍数。標準納期 5〜7 営業日、入稿後 1 時間以内に無料校正、DHL で世界 2〜4 日。',
  },
  targetKeywords: {
    primary: 'zine printing',
    secondary: [
      'small batch booklet printing', 'saddle stitch zine', 'zine printing cost',
      'custom booklet printing small batch', 'booklet printing 100 copies',
      '小誌印刷', 'Zine 印刷', '騎馬釘小冊子', '小批量書刊印刷', '獨立出版印刷',
      'ジン 印刷', 'Zine 印刷 小ロット', '中綴じ 冊子 印刷', '同人誌 印刷',
    ],
  },
};

`;

console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.writeFileSync(path.join(BAK, 'blog-posts.ts.before-register'), raw, 'utf8');
let out = raw.replace(ARRAY_DECL, BLOCK + ARRAY_DECL);
out = out.replace(ARRAY_TAIL_ANCHOR, '  lpPackagingBoxPrice2026,\n  ' + NAME + ',\n  ];');
fs.writeFileSync(FILE, out, 'utf8');
console.log('WROTE ' + path.relative(ROOT, FILE) + ' (' + out.length + ' B)');

console.log('\n===== 阶段 3: 结果形状断言 =====');
let fail2 = 0;
const now = fs.readFileSync(FILE, 'utf8');
const checks = [
  ['const 声明 1 处', (now.match(new RegExp('const ' + NAME + ': BlogPostMeta', 'g')) || []).length === 1],
  ['数组引用 1 处', (now.match(new RegExp('^  ' + NAME + ',$', 'm')) || []).length === 1],
  ['const 声明在数组声明之前', now.indexOf('const ' + NAME + ': BlogPostMeta') < now.indexOf(ARRAY_DECL)],
  ['数组声明仍 1 处', (now.match(/export const blogPosts: BlogPostMeta\[\] = \[/g) || []).length === 1],
  ['数组尾顺序正确', now.includes(ARRAY_TAIL_ANCHOR.replace('lpPackagingBoxPrice2026,\n', 'lpPackagingBoxPrice2026,\n  ' + NAME + ',\n'))],
  ['slug 已写入', now.includes("slug: 'zine-small-batch-booklet-printing-guide'")],
  ['无 BOM', fs.readFileSync(FILE)[0] !== 0xff],
];
for (const [label, ok] of checks) { if (!ok) fail2++; console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}`); }
const L0 = raw.split('\n'), L1 = now.split('\n');
console.log(`  行数 ${L0.length} → ${L1.length}`);
let changed = 0;
for (let k = 0; k < L0.length; k++) if (L0[k] !== L1[k] && !L1.includes(L0[k])) changed++;
const okDiff = changed <= 1;
if (!okDiff) fail2++;
console.log(`${okDiff ? 'OK  ' : 'FAIL'} 变更行 ≤1 (实测 ${changed})`);

if (fail2) {
  console.error(`\n❌ 形状断言未过 (${fail2}) —— 回滚`);
  fs.copyFileSync(path.join(BAK, 'blog-posts.ts.before-register'), FILE);
  process.exit(1);
}
console.log('\n✅ blog-posts.ts 注册通过 (const 在数组外)');
