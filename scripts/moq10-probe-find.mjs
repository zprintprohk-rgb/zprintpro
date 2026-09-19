// moq10-probe-find.mjs — 找出 A1/A5 產品頁仍出現「100 張起印」的上下文
const urls = [
  'https://zprintpro.com/zh-hk/product/a1-posters/',
  'https://zprintpro.com/zh-hk/product/a5-flyers/',
];
for (const u of urls) {
  const res = await fetch(u, { headers: { 'user-agent': 'probe/1.0' } });
  const t = await res.text();
  console.log(`\n===== ${u} (HTTP ${res.status} len ${t.length}) =====`);
  for (const needle of ['100 張起印', '100張起印']) {
    let i = t.indexOf(needle), n = 0;
    while (i >= 0 && n < 6) {
      const ctx = t.slice(Math.max(0, i - 180), i + 90).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`  [${needle}] …${ctx.slice(-230)}…`);
      i = t.indexOf(needle, i + needle.length);
      n++;
    }
    if (n === 0) console.log(`  [${needle}] 無`);
  }
}
