// moq10-probe-variants.mjs — 檢查 A5 是否仍有其他 100 起印變體 (含 HTML 轉義)
const url = 'https://zprintpro.com/zh-hk/product/a5-flyers/';
const t = await (await fetch(url, { headers: { 'user-agent': 'probe/1.1' } })).text();
const VARIANTS = [
  '100 張起印', '100張起印', '100 張起', '100張起', '100 枚起', '100起印',
  '100 張起訂', '100張起訂', '100 &#215;張', '100起', '起印 100',
];
console.log(`len=${t.length}`);
for (const v of VARIANTS) {
  const n = t.split(v).length - 1;
  if (n) {
    const i = t.indexOf(v);
    console.log(`  ${n} × 「${v}」→ …${t.slice(Math.max(0, i - 110), i + 60).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}…`);
  }
}
// 檢查 10 張起印 是否已出現
for (const v of ['10 張起印', '10張起印']) {
  console.log(`  ${t.split(v).length - 1} × 「${v}」(應 >0)`);
}
