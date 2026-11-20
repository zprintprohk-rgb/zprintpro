// Extract live SEO snippet fields for the 11-06 weekly-meta headline target + peers
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const urls = [
  'https://zprintpro.com/zh-hk/category/packaging/',
  'https://zprintpro.com/en/category/stickers/',
  'https://zprintpro.com/zh-hk/category/calendars/',
];
function pick(html, re) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, ' ').trim() : null;
}
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
      const ogtitle = pick(b, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
      const h1 = pick(b, /<h1[^>]*>([\s\S]{1,200}?)<\/h1>/i);
      // equivalence: CJK counts 2
      const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
      // first visible paragraph-ish text after h1
      const firstP = pick(b, /<h1[^>]*>[\s\S]{1,200}?<\/h1>[\s\S]{0,600}?<p[^>]*>([\s\S]{1,300}?)<\/p>/i);
      out.push({ url: u, status: r.status, title, titleEquiv: equiv(title), ogtitle, desc, descLen: (desc || '').length, h1: h1 ? h1.replace(/<[^>]+>/g, '') : null, firstP: firstP ? firstP.replace(/<[^>]+>/g, '').slice(0, 220) : null });
    } catch (e) {
      out.push({ url: u, error: String((e && e.message) || e) });
    }
    await new Promise((s) => setTimeout(s, 1200));
  }
  console.log(JSON.stringify(out, null, 2));
})();
