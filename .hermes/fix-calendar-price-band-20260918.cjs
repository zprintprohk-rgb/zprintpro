/**
 * 月曆印刷价格口径统一 — 基准区间 HK$8-25/份 (K3 2026-09-18 裁定)
 *
 * 背景: 三篇月曆文章 × 3 locale 的「基准价声明」互相矛盾 3-5 倍:
 *   calendar-printing-guide                  : HK$3-8/本   | $0.40/pc      | 1部50円から
 *   2027-calendar-printing-complete-guide    : HK$14-57/本 | US$1.80-7.30  | 1冊280〜1,140円
 *   2027-monthly-calendar-printing-timetable : HK$3-15     | $0.40-1.90/pc | $0.40-1.90/冊
 *
 * K3 裁定基准区间 = HK$8-25/份
 * 汇率口径取自文章自身换算 (非新定): en 文章 A: 14/1.80=7.78, 57/7.30=7.81 → 7.8
 *                                 ja 文章 A 文中明示: HK$1 = 20円
 *   ⇒ HK$8-25/份 = US$1.00-3.20/pc = 160〜500円/冊
 *
 * 作用域: 按 slug 窗口限定, 防止跨品类误伤
 *   已核实排除: 2027-calendar-printing-complete-guide 内 "HK$3-8/本" ×3 = 燙金附加費 (非月曆單價)
 *               saddle-stitch-booklet-printing-guide / catalog-printing-china-supplier-guide
 *               的 "HK$14-57/本" = 小冊子價 (非月曆)
 *
 * §12 危险写入三件套: ① 计数断言 ② 结果形状断言 ③ 备份 —— 断言未过不写盘
 *
 * 数据来源: K3 2026-09-18 会话裁定「HK8-25/份」; 原值/上下文由 blog-data JSON 实测 (探针 1-5)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-calendar-price-20260918');

// file → [{ slug, from, to, n }]
const PLAN = {
  'src/data/blog-data/zh-hk.json': [
    { slug: 'calendar-printing-guide', from: 'HK$3-8/本', to: 'HK$8-25/本', n: 6 },
    { slug: '2027-calendar-printing-complete-guide', from: 'HK$14-57/本', to: 'HK$8-25/本', n: 3 },
    // 顺序敏感: 先长串 (含「平均」句) 再短串
    { slug: '2027-monthly-calendar-printing-timetable', from: '單本 HK$3-15，平均 HK$8。', to: '單本 HK$8-25，平均 HK$16。', n: 1 },
    { slug: '2027-monthly-calendar-printing-timetable', from: '單本 HK$3-15。', to: '單本 HK$8-25。', n: 1 },
  ],
  'src/data/blog-data/en.json': [
    { slug: 'calendar-printing-guide', from: 'from $0.40/pc', to: 'from US$1.00/pc', n: 2 },
    { slug: 'calendar-printing-guide', from: '<strong>$0.40/pc</strong>', to: '<strong>US$1.00/pc</strong>', n: 2 },
    { slug: '2027-calendar-printing-complete-guide', from: 'US$1.80-7.30', to: 'US$1.00-3.20', n: 2 },
    { slug: '2027-monthly-calendar-printing-timetable', from: 'from $0.40/pc', to: 'from US$1.00/pc', n: 1 },
    { slug: '2027-monthly-calendar-printing-timetable', from: '$0.40-1.90/pc', to: 'US$1.00-3.20/pc', n: 2 },
  ],
  'src/data/blog-data/ja.json': [
    { slug: 'calendar-printing-guide', from: '1部50円から', to: '1部160円から', n: 7 },
    { slug: '2027-calendar-printing-complete-guide', from: '1冊280〜1,140円', to: '1冊160〜500円', n: 2 },
    { slug: '2027-monthly-calendar-printing-timetable', from: '$0.40-1.90/冊', to: 'HK$8-25/冊', n: 2 },
  ],
};

const count = (hay, needle) => hay.split(needle).length - 1;

/** 取某 slug 在原始文本中的窗口 [start, end) —— 以相邻 "slug" 键为界 */
function slugWindow(raw, slug) {
  const marker = '"slug": "' + slug + '"';
  const i = raw.indexOf(marker);
  if (i === -1) return null;
  const prev = raw.lastIndexOf('"slug":', i - 1);
  const next = raw.indexOf('"slug":', i + marker.length);
  // 窗口 = 本 slug 到下一个 slug 之前; 若 slug 非首键, 向前扩到上一个 slug 之后
  return { start: prev === -1 ? 0 : prev, end: next === -1 ? raw.length : next, at: i };
}

// ---------- 阶段 1: 结构 + 计数断言 (不写盘) ----------
console.log('===== 阶段 1: 结构 + 计数断言 =====');
let fail = 0;
const originals = new Map();
const shapes = new Map();

for (const [f, jobs] of Object.entries(PLAN)) {
  const raw = fs.readFileSync(path.join(ROOT, f), 'utf8');
  originals.set(f, raw);
  const arr = JSON.parse(raw);
  const list = Array.isArray(arr) ? arr : Object.values(arr);
  shapes.set(f, { entries: list.length, bytes: Buffer.byteLength(raw, 'utf8') });
  console.log(`SHAPE ${f} :: top=${Array.isArray(arr) ? 'array' : 'object'} entries=${list.length} bytes=${shapes.get(f).bytes}`);

  for (const j of jobs) {
    const w = slugWindow(raw, j.slug);
    if (!w) { console.log(`FAIL ${f} :: slug 未找到 ${j.slug}`); fail++; continue; }
    const seg = raw.slice(w.start, w.end);
    const inScope = count(seg, j.from);
    const whole = count(raw, j.from);
    const ok = inScope === j.n;
    if (!ok) fail++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${f} :: ${j.slug} :: "${j.from}" → "${j.to}"  窗口内 ${inScope} (期望 ${j.n}) / 全文 ${whole}`);
  }
}
if (fail > 0) { console.error(`\n❌ 计数断言未过 (${fail} 条), 拒绝写盘。`); process.exit(1); }

// ---------- 阶段 2: 备份 + 写盘 ----------
console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.mkdirSync(BAK, { recursive: true });
for (const [f, raw] of originals) {
  const bp = path.join(BAK, path.basename(f));
  fs.writeFileSync(bp, raw, 'utf8');
  console.log('BAK ' + bp + ' (' + fs.statSync(bp).size + ' B)');
}

for (const [f, jobs] of Object.entries(PLAN)) {
  let out = originals.get(f);
  for (const j of jobs) {
    const w = slugWindow(out, j.slug);
    if (!w) throw new Error('window lost: ' + j.slug);
    const seg = out.slice(w.start, w.end);
    const replaced = seg.split(j.from).join(j.to);
    out = out.slice(0, w.start) + replaced + out.slice(w.end);
  }
  fs.writeFileSync(path.join(ROOT, f), out, 'utf8');
  console.log('WROTE ' + f + ' (' + Buffer.byteLength(out, 'utf8') + ' B)');
}

// ---------- 阶段 3: 结果形状断言 ----------
console.log('\n===== 阶段 3: 结果形状断言 =====');
let fail2 = 0;
for (const [f, jobs] of Object.entries(PLAN)) {
  const raw0 = originals.get(f);
  const now = fs.readFileSync(path.join(ROOT, f), 'utf8');

  // (a) JSON 合法 + 条目数不变
  const list = (() => { const a = JSON.parse(now); return Array.isArray(a) ? a : Object.values(a); })();
  const okA = list.length === shapes.get(f).entries;
  if (!okA) fail2++;
  console.log(`${okA ? 'OK  ' : 'FAIL'} ${f} :: JSON.parse ok, entries ${list.length} == ${shapes.get(f).entries}`);

  // (b) BOM / mojibake
  const buf = fs.readFileSync(path.join(ROOT, f));
  const okB = buf[0] !== 0xff && !now.includes('\uFFFD');
  if (!okB) fail2++;
  console.log(`${okB ? 'OK  ' : 'FAIL'} ${f} :: no BOM / no mojibake`);

  // (c) 每条改动: 窗口内旧串 0 残留 + 全文旧串净减 (同 from 规则求和) + 窗口内新串净增 n
  for (const j of jobs) {
    const w0 = slugWindow(raw0, j.slug);
    const w = slugWindow(now, j.slug);
    const segNew = count(now.slice(w.start, w.end), j.from);
    const sameFrom = jobs.filter((x) => x.from === j.from).reduce((s, x) => s + x.n, 0);
    const deltaOld = count(raw0, j.from) - count(now, j.from);
    const winNewDelta = count(now.slice(w.start, w.end), j.to) - count(raw0.slice(w0.start, w0.end), j.to);
    const ok = segNew === 0 && deltaOld === sameFrom && winNewDelta === j.n;
    if (!ok) fail2++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${f} :: ${j.slug} "${j.from}" 窗口残留 ${segNew}(期望0) 全文净减 ${deltaOld}(期望${sameFrom}) 窗口内新串净增 ${winNewDelta}(期望${j.n})`);
  }

  // (c2) 逐行 diff 独立复核: 行数不变 + 每条差异行 = 该行所属 slug 的计划替换结果
  const lines0 = raw0.split('\n');
  const lines1 = now.split('\n');
  const okLines = lines0.length === lines1.length;
  if (!okLines) fail2++;
  console.log(`${okLines ? 'OK  ' : 'FAIL'} ${f} :: 行数不变 ${lines0.length} == ${lines1.length}`);
  const slugOfLine = [];
  let cur = null;
  for (const ln of lines0) {
    const m = ln.match(/"slug":\s*"([^"]+)"/);
    if (m) cur = m[1];
    slugOfLine.push(cur);
  }
  let diffLines = 0, badLines = 0;
  for (let k = 0; k < lines0.length; k++) {
    if (lines0[k] === lines1[k]) continue;
    diffLines++;
    const owner = slugOfLine[k];
    let expect = lines0[k];
    for (const j of jobs) {
      if (j.slug !== owner) continue;
      expect = expect.split(j.from).join(j.to);
    }
    if (expect !== lines1[k]) { badLines++; if (badLines <= 3) console.log('     BAD LINE ' + (k + 1) + ' owner=' + owner + ':\n       new: ' + lines1[k].slice(0, 200)); }
  }
  const okDiff = badLines === 0;
  if (!okDiff) fail2++;
  console.log(`${okDiff ? 'OK  ' : 'FAIL'} ${f} :: 差异行 ${diffLines} 条, 全部等于所属 slug 的计划替换结果 (异常 ${badLines})`);

  // (d) 未受影响的无关文件级不变量: 小冊子價 HK$14-57/本 必须原样保留 (zh-hk 专属)
  if (f.endsWith('zh-hk.json')) {
    const keep = count(now, 'HK$14-57/本');
    const okD = keep === 4;
    if (!okD) fail2++;
    console.log(`${okD ? 'OK  ' : 'FAIL'} ${f} :: 小冊子/目錄價 HK$14-57/本 保留 ${keep} (期望 4, 未被月曆改动波及)`);
    const foil = count(now, 'HK$3-8/本');
    const okE = foil === 3;
    if (!okE) fail2++;
    console.log(`${okE ? 'OK  ' : 'FAIL'} ${f} :: 燙金附加費 HK$3-8/本 保留 ${foil} (期望 3, 非月曆單價)`);
  }
}

if (fail2 > 0) {
  console.error(`\n❌ 结果形状断言未过 (${fail2} 条) —— 回滚。`);
  for (const f of Object.keys(PLAN)) {
    fs.copyFileSync(path.join(BAK, path.basename(f)), path.join(ROOT, f));
    console.log('ROLLBACK ' + f);
  }
  process.exit(1);
}
console.log('\n✅ 全部断言通过。备份: ' + BAK);
