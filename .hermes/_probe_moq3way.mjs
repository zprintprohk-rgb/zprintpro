// .hermes/_probe_moq3way.mjs — 4 SKU 三方 MOQ 对照
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const SKUS = ['certificates', 'textbooks', 'electronics-packaging-box', 'kraft-paper-packaging-box'];
for (const sku of SKUS) {
  for (const loc of ['zh-hk']) {
    const url = `https://zprintpro.com/${loc}/product/${sku}/`;
    const r = await fetch(url, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const txt = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    const claims = [...new Set([...txt.matchAll(/(\d{1,6})\s*(?:個|張|枚|本|冊)\s*(?:起印|起\b)/g)].map(m => m[0]))];
    const moqCtx = [...new Set([...txt.matchAll(/最小(?:起訂|訂量|起印)[^。]{0,30}/g)].map(m => m[0].slice(0, 40)))];
    console.log(`${sku} [${r.status}] claims=${JSON.stringify(claims.slice(0, 6))} | moqCtx=${JSON.stringify(moqCtx.slice(0, 3))}`);
  }
}
