// O6 live titles: blog poster-printing-guide / category posters / a2-posters PDP
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function pick(html, re) { const m = html.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; }
const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
const urls = [
  'https://zprintpro.com/zh-hk/blog/poster-printing-guide/',
  'https://zprintpro.com/zh-hk/category/posters/',
  'https://zprintpro.com/zh-hk/product/a2-posters/',
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
      out.push({ url: u.replace('https://zprintpro.com', ''), status: r.status, title, titleEquiv: equiv(title), desc, descLen: (desc || '').length, h1: h1 ? h1.replace(/<[^>]+>/g, '') : null });
    } catch (e) { out.push({ url: u, error: String((e && e.message) || e) }); }
    await new Promise((s) => setTimeout(s, 1200));
  }
  fs.writeFileSync('.hermes/logs/gsc-2026-11-04-o6-live-titles.json', JSON.stringify(out, null, 2), 'utf8');
  console.log(JSON.stringify(out, null, 1));
})();
