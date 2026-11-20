// .hermes/_probe_enja_qa.mjs — en/ja quick answer 验收
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const CASES = [
  ['/en/product/rigid-boxes/', 'Quick answer: 100 pcs MOQ, HK$8-42/pc'],
  ['/en/product/mailer-boxes/', 'Quick answer: 100 pcs MOQ, HK$3.5-10/pc'],
  ['/ja/product/rigid-boxes/', 'クイック回答：100 個から、HK$8-42/個'],
  ['/ja/product/kraft-paper-bags/', 'クイック回答：100 個から、HK$3-8/個'],
];
let pass = 0, fail = 0;
for (const [u, needle] of CASES) {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  const ok = r.status === 200 && vis.includes(needle);
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${u} [${r.status}]`);
  if (!ok) {
    const i = Math.max(vis.indexOf('Quick answer'), vis.indexOf('クイック回答'));
    if (i >= 0) console.log('   actual:', JSON.stringify(vis.slice(i, i + 90).replace(/\s+/g, ' ')));
  }
}
console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
