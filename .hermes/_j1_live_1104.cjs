// J1 live probe: ja textbook blog / PDP / category — snippet fields + procurement info markers
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function pick(html, re) { const m = html.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; }
const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
const MARKERS = {
  binding: ['中綴じ', '無線綴じ', '製本', '綴じ'],
  volume: ['部数', '10部', '100部', 'ロット'],
  proof: ['校正', 'ゲラ', '入稿'],
  moq_claim: ['部から', '冊から', '1部'],
  link_to_cat: ['/ja/category/educational', '/ja/product/textbooks'],
};
const urls = [
  'https://zprintpro.com/ja/blog/textbook-printing-guide/',
  'https://zprintpro.com/ja/product/textbooks/',
  'https://zprintpro.com/ja/category/educational/',
];
(async () => {
  const out = [];
  for (const u of urls) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 35000);
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
      const b = await r.text();
      clearTimeout(to);
      const title = pick(b, /<title>([^<]+)<\/title>/i);
      const desc = pick(b, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
        || pick(b, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
      const h1 = pick(b, /<h1[^>]*>([\s\S]{1,200}?)<\/h1>/i);
      const robots = pick(b, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
      const canonical = pick(b, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      const markers = {};
      for (const [k, arr] of Object.entries(MARKERS)) markers[k] = arr.filter((m) => b.includes(m));
      out.push({
        url: u.replace('https://zprintpro.com', ''), status: r.status, bytes: b.length,
        title, titleEquiv: equiv(title), desc, descLen: (desc || '').length,
        h1: h1 ? h1.replace(/<[^>]+>/g, '') : null, robots: robots || 'none', canonical,
        markers,
      });
    } catch (e) { out.push({ url: u, error: String((e && e.message) || e) }); }
    await new Promise((s) => setTimeout(s, 1300));
  }
  fs.writeFileSync('.hermes/logs/gsc-2026-11-04-j1-live-probe.json', JSON.stringify(out, null, 2), 'utf8');
  for (const o of out) {
    console.log('\n==', o.url, o.status, '| equiv', o.titleEquiv, '| desc', o.descLen);
    console.log('  title:', o.title);
    console.log('  robots:', o.robots, '| canonical:', o.canonical);
    for (const [k, v] of Object.entries(o.markers || {})) console.log(`  ${k}: ${v.length ? v.join(',') : '—'}`);
  }
})();
