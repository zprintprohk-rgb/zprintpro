/**
 * 补丁 2: 补齐 en calendar-printing-guide 内漏改的 `$0.40/pc` 变体
 *
 * 背景: 首轮规则只覆盖小写 "from $0.40/pc" 与 "<strong>$0.40/pc</strong>" 两种形态,
 *       漏掉大小写/上下文变体 3 处:
 *         <td>From $0.40/pc</td>            (單價表行, 首字母大写)
 *         calendars start at $0.40/pc        (FAQ A:)
 *         pricing ($0.40/pc from, ...)       (數據來源行)
 *       —— 门童 #19 全量复核把漏网抓出 (正是它存在的意义)。
 *
 * §12 三件套: ① 计数断言 ② 形状断言(含逐行 diff 独立复核) ③ 备份
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-calendar-price-20260918');
const FILE = 'src/data/blog-data/en.json';
const SLUG = 'calendar-printing-guide';
const FROM = '$0.40/pc';
const TO = 'US$1.00/pc';
const EXPECT = 3;

const p = path.join(ROOT, FILE);
const raw0 = fs.readFileSync(p, 'utf8');

function window_(raw, slug) {
  const i = raw.indexOf('"slug": "' + slug + '"');
  if (i === -1) return null;
  const j = raw.indexOf('"slug":', i + 10);
  return { start: i, end: j === -1 ? raw.length : j };
}
const cnt = (h, n) => h.split(n).length - 1;

// 阶段 1
const w = window_(raw0, SLUG);
const inScope = cnt(raw0.slice(w.start, w.end), FROM);
console.log(`阶段1: ${SLUG} 窗口内 "${FROM}" 实测 ${inScope} (期望 ${EXPECT})`);
if (inScope !== EXPECT) { console.error('❌ 计数断言未过, 拒绝写盘'); process.exit(1); }
const entries0 = Object.keys(JSON.parse(raw0)).length;
console.log(`阶段1: JSON 合法, entries=${entries0}`);

// 阶段 2
fs.copyFileSync(p, path.join(BAK, 'en.json.before-patch2'));
console.log('阶段2: 备份 en.json.before-patch2 (' + fs.statSync(path.join(BAK, 'en.json.before-patch2')).size + ' B)');
const out = raw0.slice(0, w.start) + raw0.slice(w.start, w.end).split(FROM).join(TO) + raw0.slice(w.end);
fs.writeFileSync(p, out, 'utf8');
console.log('阶段2: WROTE ' + FILE + ' (' + Buffer.byteLength(out, 'utf8') + ' B)');

// 阶段 3
let fail = 0;
const now = fs.readFileSync(p, 'utf8');
const w2 = window_(now, SLUG);
const residual = cnt(now.slice(w2.start, w2.end), FROM);
const okA = residual === 0;
if (!okA) fail++;
console.log(`${okA ? 'OK  ' : 'FAIL'} 阶段3: 窗口残留 ${residual} (期望 0)`);
const globalDelta = cnt(raw0, FROM) - cnt(now, FROM);
const okB = globalDelta === EXPECT;
if (!okB) fail++;
console.log(`${okB ? 'OK  ' : 'FAIL'} 阶段3: 全文净减 ${globalDelta} (期望 ${EXPECT})`);
const entries1 = Object.keys(JSON.parse(now)).length;
const okC = entries1 === entries0;
if (!okC) fail++;
console.log(`${okC ? 'OK  ' : 'FAIL'} 阶段3: JSON 合法, entries ${entries1} == ${entries0}`);
const buf = fs.readFileSync(p);
const okD = buf[0] !== 0xff && !now.includes('\uFFFD');
if (!okD) fail++;
console.log(`${okD ? 'OK  ' : 'FAIL'} 阶段3: no BOM / no mojibake`);

// 逐行 diff 独立复核
const L0 = raw0.split('\n'), L1 = now.split('\n');
const okE = L0.length === L1.length;
if (!okE) fail++;
console.log(`${okE ? 'OK  ' : 'FAIL'} 阶段3: 行数不变 ${L0.length} == ${L1.length}`);
let diff = 0, bad = 0, slugCur = null;
const owner = L0.map((ln) => { const m = ln.match(/"slug":\s*"([^"]+)"/); if (m) slugCur = m[1]; return slugCur; });
for (let k = 0; k < L0.length; k++) {
  if (L0[k] === L1[k]) continue;
  diff++;
  const expect = owner[k] === SLUG ? L0[k].split(FROM).join(TO) : L0[k];
  if (expect !== L1[k]) { bad++; console.log('     BAD LINE ' + (k + 1) + ' owner=' + owner[k]); }
}
const okF = bad === 0;
if (!okF) fail++;
console.log(`${okF ? 'OK  ' : 'FAIL'} 阶段3: 差异行 ${diff} 条, 全部属于目标 slug 且等于计划替换 (异常 ${bad})`);

if (fail) {
  console.error(`\n❌ 形状断言未过 (${fail} 条) —— 回滚`);
  fs.copyFileSync(path.join(BAK, 'en.json.before-patch2'), p);
  process.exit(1);
}
console.log('\n✅ 补丁 2 全部断言通过');
