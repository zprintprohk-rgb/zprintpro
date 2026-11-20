// .hermes/_probe_c109_links.mjs — C109 页内链目标可达性（前置检查）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const URLS = [
  '/ja/category/japan-doujin/',
  '/ja/product/doujinshi-printing/',
  '/ja/quote/',
  '/en/category/japan-doujin/',
  '/en/product/doujinshi-printing/',
  '/zh-hk/product/doujinshi-printing/',
];
for (const u of URLS) {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA }, redirect: 'manual' });
  console.log(`${r.status} ${u}`);
}
