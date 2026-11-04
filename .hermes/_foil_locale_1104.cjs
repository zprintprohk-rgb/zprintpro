// ja vs zh-hk foil red packet page snippet comparison (why JP SERP picks zh-hk page)
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function pick(h, re) { const m = h.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; }
const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
const urls = [
  'https://zprintpro.com/ja/product/foil-red-packets/',
  'https://zprintpro.com/zh-hk/product/foil-red-packets/',
];
(async () => {
  const out = [];
  for (const u of urls) {
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 35000);
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
      const b = await r.text(); clearTimeout(to);
      const title = pick(b, /<title>([^<]+)<\/title>/i);
      const desc = pick(b, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      const h1 = pick(b, /<h1[^>]*>([\s\S]{1,200}?)<\/h1>/i);
      const hreflang = [...b.matchAll(/hreflang=["']([a-zA-Z-]+)["'][^>]*href=["']([^"']+)["']/g)].map((m) => `${m[1]}→${m[2].replace('https://zprintpro.com', '')}`);
      const hasJaText = /[ぁ-んァ-ヶ]/.test(b);
      const lang = pick(b, /<html[^>]+lang=["']([^"']+)["']/i);
      out.push({ url: u.replace('https://zprintpro.com', ''), status: r.status, lang, title, titleEquiv: equiv(title), desc, descLen: (desc || '').length, h1: h1 ? h1.replace(/<[^>]+>/g, '') : null, hasJaText, hreflang: hreflang.slice(0, 6) });
    } catch (e) { out.push({ url: u, error: String((e && e.message) || e) }); }
    await new Promise((s) => setTimeout(s, 1200));
  }
  fs.writeFileSync('.hermes/logs/gsc-2026-11-04-foil-redpacket-locale.json', JSON.stringify(out, null, 2), 'utf8');
  for (const o of out) {
    console.log('\n==', o.url, o.status, '| lang', o.lang, '| ja-text', o.hasJaText, '| equiv', o.titleEquiv, '| desc', o.descLen);
    console.log('  title:', o.title);
    console.log('  desc:', (o.desc || '').slice(0, 120));
    console.log('  h1:', o.h1);
    console.log('  hreflang:', o.hreflang.join(' '));
  }
})();
