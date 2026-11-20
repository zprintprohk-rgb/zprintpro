'use strict';
/**
 * Self-Publishing 三語注入 blog-data (交付層)
 * 隊列依據: v10 §四.2「P0 三篇 en blog」第 2 篇 (Candle/Soap → Self-Publishing → Etsy)
 * 安全三件套 (§12): ① 備份 ② 計數斷言 ③ 結果形狀斷言 —— 斷言未過**不寫盤**
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const ST = path.join(ROOT, '.hermes', 'staging');
const DATA = path.join(ROOT, 'src', 'data', 'blog-data');
const BAK = path.join(ROOT, '.hermes', '_bak-selfpub-20260918');

const SLUG = 'self-publishing-printing-guide';
const DATE = '2026-09-18';
const LOCS = ['zh-hk', 'en', 'ja'];

/* ── 1. 讀兩份 staging 並合併 ── */
const en = JSON.parse(fs.readFileSync(path.join(ST, 'self-publishing-content.json'), 'utf8'));
const zj = JSON.parse(fs.readFileSync(path.join(ST, 'self-publishing-content.zhhk-ja.json'), 'utf8'));
const merged = {};
for (const loc of LOCS) {
  const src = loc === 'en' ? en : zj;
  for (const k of ['title', 'description', 'excerpt', 'category', 'content']) {
    if (!src[k] || !src[k][loc]) throw new Error(`staging 缺 ${k}.${loc}`);
    merged[k] = merged[k] || {};
    merged[k][loc] = src[k][loc];
  }
}
console.log('合併完成: 三語 × 5 欄位齊備');

/* ── 2. 形狀斷言 (寫盤前; 未過即 throw, 不留半成品) ── */
const errors = [];
const has = (s, re) => (s.match(re) || []).length;
for (const loc of LOCS) {
  const c = merged.content[loc], t = merged.title[loc], d = merged.description[loc];
  const brand = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
  const other = loc === 'zh-hk' ? 'ZprintPro' : '智印港';
  const qaLit = loc === 'zh-hk' ? '快速答案：' : loc === 'ja' ? 'クイック回答：' : null;
  const eq = s => { let n = 0; for (const ch of s) n += /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1; return n; };
  const titleEq = eq(t), descEq = eq(d);

  const qaShape = has(c, /<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">/g);
  const qaLiteral = loc === 'en'
    ? has(c, /<p class="font-semibold mb-1">Quick Answer: /g)
    : has(c, new RegExp('<p class="font-semibold mb-1">' + qaLit, 'g'));
  const faq = has(c, /<p><strong>Q\d+[:：][\s\S]*?<\/strong>\s*<br\s*\/?>\s*A\d*[:：][\s\S]*?<\/p>/g);
  const tbl = has(c, /<table/g), thead = has(c, /<thead/g);
  const wa = has(c, /wa\.me/g);
  const links = new Set([...c.matchAll(/href="(\/[^"]+)"/g)].map(m => m[1]));
  const offWL = [...links].filter(h => !h.startsWith(`/${loc}/`));

  const A = (cond, msg) => { if (!cond) errors.push(loc + ': ' + msg); };
  A(titleEq >= 50 && titleEq <= 58, `title 半角當量 ${titleEq} 不在 50-58`);
  A(t.trim().endsWith(brand), `title 未以 ${brand} 收尾`);
  A(!t.includes(other), `title 含他語系品牌 ${other}`);
  A(descEq >= 150 && descEq <= 160, `desc 半角當量 ${descEq} 不在 150-160`);
  A(qaShape === 3, `快速答案塊 class 形狀 ${qaShape} ≠ 3`);
  A(qaLiteral === 3, `快速答案塊引語字面 ${qaLiteral} ≠ 3`);
  A(faq >= 4 && faq <= 5, `FAQ 可解析 ${faq} 條 不在 4-5`);
  A(tbl >= 2 && tbl === thead, `表格 ${tbl} / thead ${thead} 異常`);
  A(wa >= 2 && wa <= 3, `CTA ${wa} 不在 2-3`);
  A(links.size >= 7, `唯一內鏈 ${links.size} < 7`);
  A(offWL.length === 0, `內鏈未帶本語系前綴: ${offWL.slice(0, 3).join(',')}`);
  A(has(c, /<img|<figure/gi) === 0, '含 <img>/<figure>');
  A(has(c, /<script|application\/ld\+json/gi) === 0, '含 <script>/JSON-LD');
  A(!/智印印港/.test(c), '含錯字 智印印港');
  console.log(`  ${loc}: title=${titleEq} desc=${descEq} QA=${qaShape}/${qaLiteral} FAQ=${faq} 表=${tbl} CTA=${wa} 鏈=${links.size}`);
}

/* ── 3. 目標檔計數斷言 (91 → 92) ── */
const files = {};
for (const loc of LOCS) {
  const p = path.join(DATA, loc + '.json');
  const raw = fs.readFileSync(p, 'utf8');
  const obj = JSON.parse(raw);
  const keys = Object.keys(obj);
  if (keys.includes(SLUG)) errors.push(`${loc}.json 已存在該 slug (冪等中止)`);
  if (keys.length !== 91) errors.push(`${loc}.json 鍵數 ${keys.length} ≠ 預期 91 (寫入前基準)`);
  files[loc] = { p, raw, obj, keys };
  console.log(`  ${loc}.json 鍵數 ${keys.length} (含 slug? ${keys.includes(SLUG)})`);
}

if (errors.length) {
  console.error('\n❌ 斷言未過, 不寫盤:');
  errors.forEach(e => console.error('   - ' + e));
  process.exit(1);
}
console.log('\n✅ 全部斷言通過 → 寫盤');

/* ── 4. 備份後寫入 ── */
fs.mkdirSync(BAK, { recursive: true });
for (const loc of LOCS) {
  fs.copyFileSync(files[loc].p, path.join(BAK, loc + '.json'));
}
for (const loc of LOCS) {
  const obj = files[loc].obj;
  obj[SLUG] = {
    slug: SLUG,
    title: merged.title[loc],
    description: merged.description[loc],
    date: DATE,
    category: merged.category[loc],
    content: merged.content[loc],
  };
  const out = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(files[loc].p, out, 'utf-8');
  // 寫後複驗
  const back = JSON.parse(fs.readFileSync(files[loc].p, 'utf8'));
  const n = Object.keys(back).length;
  const ok = n === 92 && back[SLUG] && back[SLUG].content === merged.content[loc]
    && back[SLUG].title === merged.title[loc] && !/\r\n/.test(fs.readFileSync(files[loc].p, 'utf8'));
  console.log(`  ${loc}.json 寫入 → 鍵數 ${n} 複驗 ${ok ? 'OK' : '★FAIL'}`);
  if (!ok) { console.error('❌ 寫後複驗失敗, 立即回滾'); fs.copyFileSync(path.join(BAK, loc + '.json'), files[loc].p); process.exit(1); }
}
console.log('\n✅ 三語注入完成。備份: ' + BAK);
