// .hermes/_probe_ctx2.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const show = async (u, needles) => {
  await sleep(4000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  console.log(`\n${u} [${r.status}] len=${b.length}`);
  for (const n of needles) {
    const i = vis.indexOf(n);
    console.log(`  "${n}" @${i}` + (i >= 0 ? ' :: ' + JSON.stringify(vis.slice(Math.max(0, i - 90), i + 60).replace(/\s+/g, ' ')) : ''));
  }
};
await show('/ja/blog/comiket-printing-prep-guide/', ['C107', 'C109']);
await show('/ja/category/educational/', ['HK$24', 'HK$28', '教科書 印刷 100本']);
