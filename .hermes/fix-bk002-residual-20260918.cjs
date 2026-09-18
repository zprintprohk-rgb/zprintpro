/**
 * BK-002 残留补齐: 窗口内所有 50→100 (MOQ 口径)
 * 门童 #19 复核抓出: zh-hk 窗口仍有 "50 本起" ×5, ja 窗口 "50 冊から" ×6
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SLUG = 'saddle-stitch-booklet-printing-guide';
const JOBS = [
  { f: 'src/data/blog-data/zh-hk.json', rules: [['50 本起', '100 本起']] },
  { f: 'src/data/blog-data/ja.json', rules: [['50 冊', '100 冊'], ['50 部', '100 部']] },
  { f: 'src/data/blog-data/en.json', rules: [['50 copies', '100 copies'], ['50-copy', '100-copy']] },
];
function win(raw) {
  const i = raw.indexOf('"slug": "' + SLUG + '"');
  if (i === -1) return null;
  const j = raw.indexOf('"slug":', i + 10);
  return { i, j: j === -1 ? raw.length : j };
}
const cnt = (h, n) => h.split(n).length - 1;
console.log('===== 阶段 1: 计数 =====');
const st = [];
for (const job of JOBS) {
  const raw = fs.readFileSync(path.join(ROOT, job.f), 'utf8');
  const w = win(raw);
  if (!w) { console.log('FAIL ' + job.f + ' slug 未找到'); process.exit(1); }
  const seg = raw.slice(w.i, w.j);
  const rec = { job, raw, w, counts: [] };
  for (const [from] of job.rules) {
    const n = cnt(seg, from);
    rec.counts.push(n);
    console.log(`  ${job.f} :: "${from}" ×${n}`);
  }
  st.push(rec);
}
console.log('\n===== 阶段 2: 写盘 =====');
const BAK = path.join(ROOT, '.hermes', '_bak-bk002-price-20260918');
fs.mkdirSync(BAK, { recursive: true });
for (const rec of st) {
  fs.writeFileSync(path.join(BAK, path.basename(rec.job.f) + '.before-tail'), rec.raw, 'utf8');
  let seg = rec.raw.slice(rec.w.i, rec.w.j);
  for (const [from, to] of rec.job.rules) seg = seg.split(from).join(to);
  const out = rec.raw.slice(0, rec.w.i) + seg + rec.raw.slice(rec.w.j);
  JSON.parse(out);
  fs.writeFileSync(path.join(ROOT, rec.job.f), out, 'utf8');
  console.log('  WROTE ' + rec.job.f);
}
console.log('\n===== 阶段 3: 形状断言 =====');
let fail = 0;
for (const rec of st) {
  const now = fs.readFileSync(path.join(ROOT, rec.job.f), 'utf8');
  const w2 = win(now);
  const seg = now.slice(w2.i, w2.j);
  const before = JSON.parse(rec.raw);
  const after = JSON.parse(now);
  const okC = Object.keys(before).length === Object.keys(after).length;
  if (!okC) { fail++; console.log('FAIL ' + rec.job.f + ' 条目数变化'); }
  let sum = 0;
  rec.job.rules.forEach(([from], k) => {
    const res = cnt(seg, from);
    const net = cnt(rec.raw, from) - cnt(now, from);
    sum += net;
    console.log(`  ${rec.job.f} :: "${from}" 窗口残留 ${res} (期望0) 全文净减 ${net} (原窗口 ${rec.counts[k]})`);
    if (res !== 0) fail++;
  });
  const okB = fs.readFileSync(path.join(ROOT, rec.job.f))[0] !== 0xff && !now.includes('\uFFFD');
  if (!okB) { fail++; console.log('FAIL ' + rec.job.f + ' BOM/mojibake'); }
  console.log(`  ${rec.job.f} :: 条目数不变 ${okC?'OK':'FAIL'} / 无 BOM ${okB?'OK':'FAIL'} / 净替换 ${sum}`);
}
if (fail) { console.error('\n❌ 断言未过, 回滚'); for (const rec of st) fs.writeFileSync(path.join(ROOT, rec.job.f), rec.raw, 'utf8'); process.exit(1); }
console.log('\n✅ 残留补齐完成');
