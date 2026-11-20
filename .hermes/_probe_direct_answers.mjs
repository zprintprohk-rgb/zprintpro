// .hermes/_probe_direct_answers.mjs — 直答段上线验收（zh 5+3 样例）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const CASES = [
  ['/zh-hk/product/rigid-boxes/', '精裝盒訂製直答：100 個起印、HK$8-42/個'],
  ['/zh-hk/product/cosmetic-boxes/', '化妝品包裝盒訂製直答：100 個起印、HK$8-65/個'],
  ['/zh-hk/product/mailer-boxes/', '快遞盒／飛機盒訂製直答：100 個起印、HK$3.5-10/個'],
  ['/zh-hk/product/white-card-bags/', '白卡紙袋訂製直答：100 個起印、HK$5-12/個'],
  ['/zh-hk/product/kraft-paper-bags/', '牛皮紙袋訂製直答：100 個起印、HK$3-8/個'],
  ['/zh-hk/product/wall-calendars/', '直答：1 本起印、HK$3-8/本'],
  ['/zh-hk/product/pvc-menus/', '直答：10 張起印、HK$8-32/張'],
  ['/zh-hk/product/business-envelopes/', '直答：100 個起印、HK$0.22-1.80/個'],
];
let pass = 0, fail = 0;
for (const [u, needle] of CASES) {
  await sleep(5000);
  try {
    const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    const ok = r.status === 200 && vis.includes(needle);
    ok ? pass++ : fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${u} [${r.status}] needle=${JSON.stringify(needle.slice(0, 26))}`);
    if (!ok && r.status === 200) {
      const i = vis.indexOf('直答');
      if (i >= 0) console.log('     actual:', JSON.stringify(vis.slice(i, i + 70).replace(/\s+/g, ' ')));
    }
  } catch (e) {
    fail++;
    console.log(`ERR ${u} ${e.message}`);
  }
}
console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
