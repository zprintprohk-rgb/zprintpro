/**
 * 修正 zine 篇 meta description 至 150-160 半角当量 (门童 #4 I18N_META_LENGTH 口径)
 * §12 三件套: 计数断言 + 形状断言 + 备份
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-zine-post-20260918');
const { equiv } = require(path.join(ROOT, 'scripts/guards/title-equiv.js'));

const DESC = {
  'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 單價 HK$6-32/本, 5,000 本低至 HK$1.20/本, 5-7 個工作天, 1 小時免費打稿. 紙材/裝訂/頁數 4 的倍數, 30 秒 AI 即時報價.',
  en: 'Zine printing from 100 copies, saddle stitch 8-64pp, HK$6-32/copy, HK$1.20 at 5,000. Free proof in 1 hour, 5-7 day turnaround, DHL 2-4 days. Instant quote.',
  ja: 'ジン（Zine）印刷は 100 部から。中綴じ 8〜64 ページ、1 部 HK$6〜32（5,000 部で HK$1.20）。標準納期 5〜7 営業日、1 時間以内に無料校正。30 秒 AI 見積もり。',
};
const FILES = { 'zh-hk': 'src/data/blog-data/zh-hk.json', en: 'src/data/blog-data/en.json', ja: 'src/data/blog-data/ja.json' };
const SLUG = 'zine-small-batch-booklet-printing-guide';

console.log('===== 阶段 1: 半角当量断言 (150-160) =====');
let fail = 0;
for (const [loc, d] of Object.entries(DESC)) {
  const e = equiv(d);
  const ok = e >= 150 && e <= 160;
  if (!ok) fail++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${loc}: equiv=${e}`);
}
if (fail) { console.error('❌ 断言未过, 拒绝写盘'); process.exit(1); }

console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.mkdirSync(BAK, { recursive: true });
const before = {};
for (const [loc, rel] of Object.entries(FILES)) {
  const p = path.join(ROOT, rel);
  const txt = fs.readFileSync(p, 'utf8');
  before[loc] = txt;
  fs.writeFileSync(path.join(BAK, path.basename(rel) + '.before-desc'), txt, 'utf8');
  const obj = JSON.parse(txt);
  obj[SLUG].description = DESC[loc];
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('WROTE ' + rel);
}

console.log('\n===== 阶段 3: 形状断言 =====');
let fail2 = 0;
for (const [loc, rel] of Object.entries(FILES)) {
  const p = path.join(ROOT, rel);
  const now = fs.readFileSync(p, 'utf8');
  const obj = JSON.parse(now);
  const okA = obj[SLUG].description === DESC[loc];
  if (!okA) fail2++;
  console.log(`${okA ? 'OK  ' : 'FAIL'} ${loc} description 与写入一致`);
  // 除该条 description 外零改动
  const o2 = JSON.parse(now);
  o2[SLUG].description = JSON.parse(before[loc])[SLUG].description;
  const okB = JSON.stringify(o2, null, 2) + '\n' === before[loc];
  if (!okB) fail2++;
  console.log(`${okB ? 'OK  ' : 'FAIL'} ${loc} 除该条 description 外零改动`);
  const okC = Object.keys(obj).length === Object.keys(JSON.parse(before[loc])).length;
  if (!okC) fail2++;
  console.log(`${okC ? 'OK  ' : 'FAIL'} ${loc} 条目数不变`);
  const buf = fs.readFileSync(p);
  const okD = buf[0] !== 0xff && !now.includes('\uFFFD');
  if (!okD) fail2++;
  console.log(`${okD ? 'OK  ' : 'FAIL'} ${loc} no BOM / no mojibake`);
}
if (fail2) {
  console.error(`\n❌ 形状断言未过 (${fail2}) —— 回滚`);
  for (const [loc, rel] of Object.entries(FILES)) fs.writeFileSync(path.join(ROOT, rel), before[loc], 'utf8');
  process.exit(1);
}
console.log('\n✅ description 修正通过');
