/**
 * 注册 blog-posts.ts: zine 篇 (3 locale meta + 数组挂载)
 * §12 三件套: 计数断言 + 形状断言 + 备份
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-zine-post-20260918');
const FILE = 'src/data/blog-posts.ts';
const ANCHOR = "  lpPackagingBoxPrice2026,\n  ];";

const { equiv, band } = require(path.join(ROOT, 'scripts/guards/title-equiv.js'));

const TITLE = {
  'zh-hk': '小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起 HK$6 起 | 智印港',
  en: 'Zine Printing Guide: 8-64pp, 100 MOQ, HK$6/pc | ZprintPro',
  ja: 'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
};
const EXCERPT = {
  'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 每本約 HK$6-32, 5,000 本批量低至 HK$1.20/本. 內頁 80-100g 書紙或 128-157g 銅版紙, 封面可覆膜, 頁數須為 4 的倍數, 標準交期 5-7 個工作天, 提交檔案 1 小時內免費打稿, 滿 HK$500 港九新界順豐免運, DHL 全球 2-4 天.',
  en: 'Zine printing from 100 copies, saddle stitch 8-64 pages, about HK$6-32 per copy and HK$1.20 per copy at 5,000. Interior in 80-100gsm woodfree or 128-157gsm art paper, optional cover lamination, page count must divide by 4. 5-7 working day turnaround, free proof within 1 hour, DHL worldwide in 2-4 days.',
  ja: 'ジン（Zine）印刷は 100 部から、中綴じ 8〜64 ページ、1 部あたり約 HK$6〜32、5,000 部で HK$1.20。本文は 80〜100g 上質紙または 128〜157g コート紙、表紙ラミネート可、ページ数は 4 の倍数。標準納期 5〜7 営業日、入稿後 1 時間以内に無料校正、DHL で世界 2〜4 日。',
};

console.log('===== 阶段 1: title 半角当量 (50-58, K3 9/13 终裁) =====');
let fail = 0;
for (const [loc, t] of Object.entries(TITLE)) {
  const e = equiv(t);
  const b = band(t);
  const ok = b === 'OK';
  if (!ok) fail++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${loc}: equiv=${e} band=${b}  「${t}」`);
}

const p = path.join(ROOT, FILE);
const raw = fs.readFileSync(p, 'utf8');

// ---- 阶段 1b: 同步 blog-data 三语 title (首轮写入时 title 超当量, 此处修正) ----
console.log('\n===== 阶段 1b: blog-data title 同步 =====');
const DATA = { 'zh-hk': 'src/data/blog-data/zh-hk.json', en: 'src/data/blog-data/en.json', ja: 'src/data/blog-data/ja.json' };
const dataBefore = {};
let fail1b = 0;
for (const [loc, rel] of Object.entries(DATA)) {
  const dp = path.join(ROOT, rel);
  const txt = fs.readFileSync(dp, 'utf8');
  dataBefore[loc] = txt;
  const obj = JSON.parse(txt);
  const e = obj['zine-small-batch-booklet-printing-guide'];
  if (!e) { fail1b++; console.log(`FAIL ${loc}: 条目不存在`); continue; }
  const oldTitle = e.title;
  e.title = TITLE[loc];
  const out = JSON.stringify(obj, null, 2) + '\n';
  // 形状断言: 仅 title 变, 其余逐字不变
  const obj2 = JSON.parse(out);
  obj2['zine-small-batch-booklet-printing-guide'].title = oldTitle;
  const okOnlyTitle = JSON.stringify(obj2, null, 2) + '\n' === txt;
  if (!okOnlyTitle) { fail1b++; console.log(`FAIL ${loc}: 除 title 外还有改动`); continue; }
  fs.writeFileSync(dp, out, 'utf8');
  console.log(`OK   ${loc}: title 「${oldTitle}」 → 「${TITLE[loc]}」`);
}
if (fail1b) {
  console.error(`\n❌ title 同步断言未过 (${fail1b}) —— 回滚 blog-data`);
  for (const [loc, rel] of Object.entries(DATA)) fs.writeFileSync(path.join(ROOT, rel), dataBefore[loc], 'utf8');
  process.exit(1);
}

const anchorCount = raw.split(ANCHOR).length - 1;
console.log('\n=== 锚点计数 ===');
console.log(`ANCHOR 出现 ${anchorCount} 次 (期望 1)`);
if (anchorCount !== 1) fail++;
const dup = raw.includes('lpZineSmallBatchBookletGuide');
console.log(`lpZineSmallBatchBookletGuide 已存在? ${dup} (期望 false)`);
if (dup) fail++;
if (fail) { console.error(`\n❌ 前置断言未过 (${fail}), 拒绝写盘`); process.exit(1); }

const BLOCK = `
// 2026-09-18 新需求承接 #1 (K3 2026-09-17 拍板: 4 篇新需求承接提前至 P0 三篇之前)
// 依据: docs/2026-09-17-website-traffic-expansion-plan-v1.md §五 路径 1 第 1 项 + §四 差距矩阵 (zine en/zh-hk 侧空白)
// 承接 SKU: saddle-stitch-booklets (BK-002) | 9 段 + 5 FAQ + 3 CTA + 2 表格 + 3 快速答案块 + 8 内链 + 3 locale native
// 价格口径来源: 线上 PDP 结构化区 (2026-09-18 curl): 100 本起印 / HK$6-32/本 / 5,000 本低至 HK$1.20/本
const lpZineSmallBatchBookletGuide: BlogPostMeta = {
  slug: 'zine-small-batch-booklet-printing-guide',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-18',
  title: {
    'zh-hk': ${JSON.stringify(TITLE['zh-hk'])},
    en: ${JSON.stringify(TITLE.en)},
    ja: ${JSON.stringify(TITLE.ja)},
  },
  excerpt: {
    'zh-hk': ${JSON.stringify(EXCERPT['zh-hk'])},
    en: ${JSON.stringify(EXCERPT.en)},
    ja: ${JSON.stringify(EXCERPT.ja)},
  },
  targetKeywords: {
    primary: 'zine printing',
    secondary: [
      'small batch booklet printing', 'saddle stitch zine', 'zine printing cost',
      'children picture book printing', 'custom booklet printing small batch',
      '小誌印刷', 'Zine 印刷', '騎馬釘小冊子', '小批量書刊印刷', '獨立出版印刷',
      'ジン 印刷', 'Zine 印刷 小ロット', '中綴じ 冊子 印刷', '同人誌 印刷',
    ],
  },
};
`;

console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.mkdirSync(BAK, { recursive: true });
fs.writeFileSync(path.join(BAK, 'blog-posts.ts'), raw, 'utf8');
console.log('BAK blog-posts.ts (' + raw.length + ' B)');

let out = raw.replace(ANCHOR, BLOCK + '\n' + ANCHOR.replace('lpPackagingBoxPrice2026,', 'lpPackagingBoxPrice2026,\n  lpZineSmallBatchBookletGuide,'));
fs.writeFileSync(p, out, 'utf8');
console.log('WROTE ' + FILE + ' (' + out.length + ' B)');

console.log('\n===== 阶段 3: 结果形状断言 =====');
let fail2 = 0;
const now = fs.readFileSync(p, 'utf8');
// 锚点被有意消费 → 改判: 数组尾必须是 lpPackagingBoxPrice2026, lpZine..., ];
const okA = now.includes("  lpPackagingBoxPrice2026,\n  lpZineSmallBatchBookletGuide,\n  ];");
if (!okA) fail2++;
console.log(`${okA ? 'OK  ' : 'FAIL'} 数组尾顺序正确 (packaging → zine → ];)`);
const okA2 = (now.split('\n  ];').length - 1) === (raw.split('\n  ];').length - 1);
if (!okA2) fail2++;
console.log(`${okA2 ? 'OK  ' : 'FAIL'} '];' 终止符数不变`);
const okB = now.includes('lpZineSmallBatchBookletGuide,\n  ];') && (now.split('lpZineSmallBatchBookletGuide').length - 1) === 2;
if (!okB) fail2++;
console.log(`${okB ? 'OK  ' : 'FAIL'} 数组已挂载 (const 声明 + 数组引用 = 2 处)`);
const okC = now.includes("slug: 'zine-small-batch-booklet-printing-guide'");
if (!okC) fail2++;
console.log(`${okC ? 'OK  ' : 'FAIL'} slug 已写入`);
// 逐行 diff: 改动行必须全部落在新增块内
const L0 = raw.split('\n'), L1 = now.split('\n');
const okD = L1.length === L0.length + BLOCK.split('\n').length + 1;
if (!okD) fail2++;
console.log(`${okD ? 'OK  ' : 'FAIL'} 行数 ${L0.length} → ${L1.length} (= +${BLOCK.split('\n').length + 1})`);
let added = 0, removed = 0, changed = 0;
for (let k = 0; k < L0.length; k++) {
  if (L0[k] !== L1[k]) {
    if (L1.includes(L0[k])) added++; else changed++;
  }
}
console.log(`  行级: 纯新增 ${added} / 变更 ${changed} (期望变更 1 = 数组挂载行)`);
const okE = changed <= 1;
if (!okE) fail2++;
console.log(`${okE ? 'OK  ' : 'FAIL'} 变更行 ≤1`);

if (fail2) {
  console.error(`\n❌ 形状断言未过 (${fail2}) —— 回滚`);
  fs.copyFileSync(path.join(BAK, 'blog-posts.ts'), p);
  process.exit(1);
}
console.log('\n✅ blog-posts.ts 注册通过');
