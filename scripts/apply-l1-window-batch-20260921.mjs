// L1-1 窗内内容批应用器 (K3 2026-09-21 01:57「执行」) v2
// 范围: #17 打稿 2h→1h 三语全量清扫 (SKU desc/body + blog zh-hk/en/ja) + #18 small-batch-stickers MOQ 统一为数据层真值 10
// v2 修正 (干跑反例固化):
//   避坑 19 跨 SKU 共享模板句 — MOQ 替换限定 small-batch-stickers 块内 (全局计数 8/35/9 会误伤其他 SKU)
//   漏网写法 — en blog `digital proof within 2 hours` (无 free 前缀) 3 处; ja sku desc `校正 2 時間` 2 处
// 纪律: 显式 (old→new, expectedCount) 清单; 干跑默认; --apply 才写; 备份; 未分类 2h 复扫 = 0 否则 exit 2
// 不碰: SKU title 字段 (9/30 验证窗, 唯一例外 = en title 的 50 pcs 已在窗时登记) ; WhatsApp/LINE 回覆 2h; PDF 預檢; FDA 運輸; keywords 数组
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';

const APPLY = process.argv.includes('--apply');
const BLOG_ONLY = process.argv.includes('--blog-only'); // v3: sku 层已在 HEAD 时只重放 blog 层 (geo 会话覆盖事故恢复)
const BAK = '.hermes/_bak-l1-window-20260921';
mkdirSync(BAK, { recursive: true });

let failures = 0;
const report = [];

// ---------- 1. sku-seo-data.ts ----------
const SKU = 'src/data/sku-seo-data.ts';
let sku = readFileSync(SKU, 'utf8');

// 1a. 全局打稿 2h→1h (K3 拍板「1小时为统一值」覆盖全部 SKU) — blog-only 模式跳过
const globalOps = BLOG_ONLY ? [] : [
  ['2 小時內免費提供數碼打稿', '1 小時內免費提供數碼打稿', 1],
  ['2 小時內免費數碼打稿', '1 小時內免費數碼打稿', 1],
  ['2 小時數碼打稿', '1 小時數碼打稿', 1],
  ['即日打稿 2 小時', '即日打稿 1 小時', 10],
  ['免費 2 小時打稿', '免費 1 小時打稿', 9],
  ['free digital proof in 2 hours', 'free digital proof in 1 hour', 36],
  ['Free design proof in 2 hours', 'Free design proof in 1 hour', 1],
  ['Free design mockup in 2 hours', 'Free design mockup in 1 hour', 1],
  ['free 2-hour digital proof', 'free 1-hour digital proof', 2],
  ['2 時間で無料デジタル校正', '1 時間で無料デジタル校正', 36],
  ['2 時間無料デジタル校正', '1 時間無料デジタル校正', 1],
  ['校正 2 時間', '校正 1 時間', -1], // ja leaflet/poster desc 漏网写法 (v2 补)
];
for (const [oldS, newS, exp] of globalOps) {
  const n = sku.split(oldS).length - 1;
  if (n === 0) { failures++; report.push(`FAIL ${SKU}: "${oldS.slice(0,30)}" 0 命中`); continue; }
  if (exp >= 0 && n !== exp) { failures++; report.push(`FAIL ${SKU}: "${oldS.slice(0,30)}" 期望 ${exp} 实得 ${n}`); continue; }
  sku = sku.split(oldS).join(newS);
  report.push(`OK   ${SKU} ×${n}: ${oldS.slice(0,36)} → ${newS.slice(0,36)}`);
}

// 1b. #18 MOQ — 限定 small-batch-stickers 块 (避坑 19: 同句模板被多 SKU 共享) — blog-only 模式跳过
if (!BLOG_ONLY) {
const sbStart = sku.indexOf('"small-batch-stickers": {');
const sbEnd = sku.indexOf('\n  "', sbStart + 10);
if (sbStart < 0 || sbEnd < 0) { failures++; report.push('FAIL: small-batch-stickers 块边界找不到'); }
let block = sku.slice(sbStart, sbEnd);
const sbOps = [
  ['小批量貼紙印刷 50 張起印 HK$0.45/張', '小批量貼紙印刷 10 張起印 HK$0.45/張', 1],
  ['10 張起印，無開版費、無製版費。小批量系列可低至 50 張。', '10 張起印，無開版費、無製版費。', 1],
  ['Custom small batch stickers from 50 pcs at $0.045/pc', 'Custom small batch stickers from 10 pcs at $0.045/pc', 1],
  ['100-piece minimum, no setup fees, no plate fees', '10-piece minimum, no setup fees, no plate fees', 1],
  ['Small Batch Stickers 50+ | No Setup | ZprintPro', 'Small Batch Stickers 10+ | No Setup | ZprintPro', 1],
  ['50 枚〜 $0.045/枚〜', '10 枚〜 $0.045/枚〜', 1],
  ['100 枚から対応、FDA 認可接着剤', '10 枚から対応、FDA 認可接着剤', 1],
  ['料金透明：100 枚から、版代・型代ゼロ。', '料金透明：10 枚から、版代・型代ゼロ。', 1],
  ['100 枚から対応、版代・型代ゼロ。スモールバッチシリーズは 50 枚まで対応可能。', '10 枚から対応、版代・型代ゼロ。', 1],
];
for (const [oldS, newS, exp] of sbOps) {
  const n = block.split(oldS).length - 1;
  if (n !== exp) { failures++; report.push(`FAIL sb-block: "${oldS.slice(0,30)}" 期望 ${exp} 实得 ${n}`); continue; }
  block = block.split(oldS).join(newS);
  report.push(`OK   sb-block ×${n}: ${oldS.slice(0,40)} → ${newS.slice(0,40)}`);
}
sku = sku.slice(0, sbStart) + block + sku.slice(sbEnd);
}

// ---------- 2. blog-data 三语 JSON ----------
const KEEP_TOKENS = ['回覆', '返信', 'reply within', 'Quote within', 'precheck', 'プリチェック', 'プレチェック', '預檢', 'FDA', 'Bioterrorism', '取件', '受取', '海運', '空運', '陸運', 'ocean', 'road', 'air ', '快印', '急速印刷', '2小時取', '修正リスト', '点検'];

const blogOps = {
  'zh-hk': [
    ['2 小時內免費數碼打稿確認', '1 小時內免費數碼打稿確認', -1],
    ['2 小時內收到數碼打稿', '1 小時內收到數碼打稿', 1],
    ['<strong>2 小時內</strong>免費數碼打稿', '<strong>1 小時內</strong>免費數碼打稿', 1],
    ['2 小時內免費數碼打稿', '1 小時內免費數碼打稿', -1],
  ],
  'en': [
    ['digital proof within 2 hours', 'digital proof within 1 hour', -1], // 全文件合计 3 (sticker×2 + cost-baseline×1); 复扫兜底
  ],
  'ja': [
    ['2 時間以内に無料デジタル校正', '1 時間以内に無料デジタル校正', 1],
    ['2 時間以内にデジタル校正', '1 時間以内にデジタル校正', 1],
    ['データ提出後2時間以内にデジタル無料校正', 'データ提出後1時間以内にデジタル無料校正', 1],
  ],
};

const FAQ_INSERT_OLD = '<p><strong>Q：騎馬釘小冊子最少幾多本起印？</strong><br/>A：10 本起印，無開版費；補習社試刊、商場活動場刊 50 本都接，500-1000 本大批量單價更抵。</p>';
const FAQ_INSERT_NEW = FAQ_INSERT_OLD + '\n<p><strong>Q：印刷小冊子要多少錢？</strong><br/>A：10 本起印、8-64 頁的騎馬釘小冊子 HK$6-32/本（2026 價目），視數量、紙張克重同加工工藝而定；128g 銅版紙目錄級基準 HK$1.8-2.0/本，數量越多單價越低。智印港 30 秒 AI 即時報價，落單前可知實價。</p>';

const jsonResults = {};
for (const loc of ['zh-hk', 'en', 'ja']) {
  const f = `src/data/blog-data/${loc}.json`;
  const raw = readFileSync(f, 'utf8');
  const data = JSON.parse(raw);
  const rt = JSON.stringify(data, null, 2) + '\n';
  if (rt !== raw) { failures++; report.push(`FAIL ${f}: JSON round-trip 非无损 — 禁写`); continue; }

  let touched = 0;
  for (const [slug, post] of Object.entries(data)) {
    let c = post.content;
    for (const [oldS, newS, exp] of blogOps[loc]) {
      const n = c.split(oldS).length - 1;
      if (n === 0) continue;
      if (exp >= 0 && n !== exp) { failures++; report.push(`FAIL ${f} ${slug}: "${oldS.slice(0,24)}" 期望 ${exp} 实得 ${n}`); continue; }
      c = c.split(oldS).join(newS);
      touched += n;
      report.push(`OK   ${f} [${slug}] ×${n}: ${oldS.slice(0,32)}`);
    }
    if (loc === 'zh-hk' && slug === 'saddle-stitch-booklet-printing-guide') {
      const n = c.split(FAQ_INSERT_OLD).length - 1;
      if (n !== 1) { failures++; report.push(`FAIL ${f}: FAQ 插入锚点期望 1 实得 ${n}`); }
      else {
        c = c.split(FAQ_INSERT_OLD).join(FAQ_INSERT_NEW);
        c = c.replace('最後更新：2026-09-16', '最後更新：2026-09-21');
        touched += 2;
        report.push(`OK   ${f} [saddle-stitch] FAQ 價格問答插入 + lastUpdated→2026-09-21`);
      }
    }
    if (c !== post.content) post.content = c;
  }
  jsonResults[f] = { data, touched };
}

// ---------- 3. 未分类 2h 复扫 ----------
function unclassified2h(text, label) {
  const hits = [];
  const re = /(?<![\d/.-])2\s*(?:小\s*時|時間|[-\s]?hours?)/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const ctx = text.slice(Math.max(0, m.index - 45), m.index + 45);
    if (KEEP_TOKENS.some(t => ctx.includes(t))) continue;
    hits.push(`${label}: …${ctx.replace(/\s+/g, ' ')}…`);
  }
  return hits;
}

report.push('--- 未分类 2h 复扫 (应只剩 keywords 数组与已声明 KEEP 类) ---');
const remaining = [
  ...unclassified2h(sku, SKU),
  ...Object.entries(jsonResults).flatMap(([f, r]) => unclassified2h(JSON.stringify(r.data, null, 2) + '\n', f)),
];
for (const r of remaining) report.push(`LEFT ${r}`);
if (remaining.length > 0) failures++;

// ---------- 4. 落盘 ----------
if (APPLY && failures === 0) {
  const ts = new Date().toISOString().replace(/[:T]/g, '').slice(0, 14);
  copyFileSync(SKU, `${BAK}/sku-seo-data.ts.${ts}.bak`);
  writeFileSync(SKU, sku);
  report.push(`WROTE ${SKU}`);
  for (const [f, r] of Object.entries(jsonResults)) {
    if (r.touched === 0) continue;
    copyFileSync(f, `${BAK}/${f.split('/').pop()}.${ts}.bak`);
    writeFileSync(f, JSON.stringify(r.data, null, 2) + '\n');
    report.push(`WROTE ${f} (${r.touched} 处)`);
  }
} else if (APPLY) {
  report.push('!! --apply 但存在 FAIL — 拒绝写入 (exit 2 纪律)');
}

console.log(report.join('\n'));
console.log(`\n=== ${APPLY ? (failures === 0 ? 'APPLIED' : 'BLOCKED') : 'DRY-RUN'} · ${failures} failures ===`);
process.exit(failures === 0 ? 0 : 2);
