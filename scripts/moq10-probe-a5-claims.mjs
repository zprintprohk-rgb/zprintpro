// moq10-probe-a5-claims.mjs — 精準檢查 A5 頁的「傳單起印量」宣稱 (排除無關的公司級 FAQ)
const url = 'https://zprintpro.com/zh-hk/product/a5-flyers/';
const t = await (await fetch(url, { headers: { 'user-agent': 'probe/1.2' } })).text();

/** A5 傳單**自身**的起印量宣稱樣式 (客戶可見) */
const CLAIMS = [
  { re: /A5傳單印刷訂製，([^。]{0,24})/, label: 'description 首句' },
  { re: /A5 傳單印刷 圓角・覆膜・([^|]{0,20})/, label: 'title' },
  { re: /專為香港中小企、本地餐廳及跨境電商品牌設計。([^。]{0,14})/, label: '長描述首句' },
  { re: /Q2: 最低起印量是多少？[\s\S]{0,80}?([^。]{0,30})。/, label: 'FAQ Q2' },
  { re: /收費透明：([^。]{0,20})/, label: '收費透明句' },
];

let bad = 0;
for (const c of CLAIMS) {
  const m = t.match(c.re);
  if (!m) { console.log(`  ⚠ ${c.label}: 未匹配到 (可能樣式已變)`); continue; }
  const val = m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const has100 = /100\s*張起/.test(val);
  const has10 = /10\s*張起/.test(val);
  const verdict = has100 ? '❌ 仍 100' : has10 ? '✅ 10 張' : '➖ 無起印數字';
  if (has100) bad++;
  console.log(`  ${verdict}  ${c.label}: 「${val}」`);
}

console.log(bad === 0 ? '\n✅ A5 傳單頁自身宣稱已全部更新' : `\n❌ 仍有 ${bad} 處 100 張起`);
process.exit(bad ? 1 : 0);
