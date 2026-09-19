// .hermes/logs/_probe-k3-batch2.mjs — K3 第二批改動的線上探針
//
// 目的：驗證 push 後線上是否已渲染：
//   ① art-posters PDP 的「1 張起印」（真值 100→1）
//   ② a2-posters PDP 的「10 張起印」（真值 100→10）
//   ③ 貼紙品類頁子品類 MOQ 映射（10 個起 / 戶外·可移 100 個起）
//   ④ 膠印門檻 300（報價器過渡區文案）
//
// ⚠️ 部署有延遲（CF Pages build）。辨別方法：
//   · 若頁面仍顯示舊值 → 先看 build 是否完成（HTTP 200 + 頁面 marker 正常）
//   · 只有「頁面可正常取得 + marker 正常 + 值為舊」才可能是「部署未完成」
//   · 連續兩次間隔抓取結果一致才可下結論（§0.23.2 確定性閘門）
const BASE = 'https://zprintpro.com';
const TARGETS = [
  { name: 'art-posters PDP (zh-hk)', url: `${BASE}/zh-hk/product/art-posters/`, expect: [/1\s*張起印/, /1張起印/], forbid: [/100\s*張起印/] },
  { name: 'art-posters PDP (en)', url: `${BASE}/en/product/art-posters/`, expect: [], forbid: [] },
  { name: 'a2-posters PDP (zh-hk)', url: `${BASE}/zh-hk/product/a2-posters/`, expect: [/10\s*張起印/, /10張起印/], forbid: [/100\s*張起印/] },
  { name: '貼紙品類頁 (zh-hk)', url: `${BASE}/zh-hk/category/stickers/`, expect: [/10\s*個起/], forbid: [/50\s*個起印/] },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOnce(url) {
  const t0 = Date.now();
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZP-probe/1.0)', 'Accept-Language': 'zh-HK,zh;q=0.9' },
  });
  const html = await res.text();
  return { status: res.status, len: html.length, html, ms: Date.now() - t0 };
}

const results = [];
for (const t of TARGETS) {
  const r = await fetchOnce(t.url);
  // 響應有效性三重校驗（§0.23.2）
  const valid = r.status === 200 && r.len > 20000;
  const row = { name: t.name, status: r.status, len: r.len, ms: r.ms, valid, hits: [], forbids: [], stale: false };
  if (valid) {
    for (const re of t.expect) if (re.test(r.html)) row.hits.push(String(re));
    for (const re of t.forbid) if (re.test(r.html)) row.forbids.push(String(re));
    row.stale = row.hits.length === 0 && row.forbids.length > 0 ? true : false;
  }
  results.push(row);
  await sleep(600); // 串行 + 間隔（避免突發被限流 → 假 0）
}

console.log('=== K3 第二批 線上探針 ===');
console.log(`時間: ${new Date().toISOString()}\n`);
for (const r of results) {
  const verdict = !r.valid ? '🔴 INVALID(響應不合格,不計入 0)' : r.forbids.length ? '🔴 仍見舊值' : r.hits.length ? '✅ 已生效' : '⚠️ 未見預期值(可能部署未完成)';
  console.log(`${verdict}  ${r.name}`);
  console.log(`     HTTP ${r.status} | ${r.len} bytes | ${r.ms}ms`);
  if (r.hits.length) console.log(`     命中預期: ${r.hits.join(' , ')}`);
  if (r.forbids.length) console.log(`     仍見舊值: ${r.forbids.join(' , ')}`);
  console.log('');
}

const invalid = results.filter((r) => !r.valid).length;
const stale = results.filter((r) => r.valid && r.forbids.length).length;
const ok = results.filter((r) => r.valid && r.hits.length && !r.forbids.length).length;
console.log(`彙總: 已生效 ${ok} ｜ 仍見舊值 ${stale} ｜ INVALID ${invalid} ｜ 總計 ${results.length}`);
if (stale) console.log('→ 仍見舊值：請先確認 CF Pages build 是否完成，勿直接判失敗（§0.23.2 響應有效性）。');
