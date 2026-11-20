// Independent spot-check: batch #6/#7 same-day-flyers title price truth in 3 locales
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const SLUG = 'https://zprintpro.com/{L}/product/same-day-flyers/';
// From commit 37f4176a: zh 1.30→0.55 / en 0.16→0.95 / ja 25→125 (title price truth per basePrice)
const CHECKS = [
  { locale: 'zh-hk', mustContain: 'HK$0.55', anti: 'HK$1.30' },
  { locale: 'en',    mustContain: '$0.95',   anti: '$0.16' },
  { locale: 'ja',    mustContain: '¥125',    anti: '¥25〜' },
];
const results = [];
for (const c of CHECKS) {
  const url = SLUG.replace('{L}', c.locale);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal });
    const body = await res.text();
    const m = body.match(/<title>([^<]+)<\/title>/i);
    const title = m ? m[1] : '(no title)';
    // §0.23.2 修正: mustContain/anti 只查 title 域（正文价格阶梯合法含多档位，全页扫描会误报）
    results.push({
      locale: c.locale, status: res.status, bytes: body.length,
      title,
      mustContain: c.mustContain, foundInTitle: title.includes(c.mustContain),
      anti: c.anti, absentInTitle: !title.includes(c.anti),
      ok: res.status === 200 && title.includes(c.mustContain) && !title.includes(c.anti),
    });
  } catch (e) {
    results.push({ locale: c.locale, url, ok: false, error: String(e && e.message || e) });
  } finally { clearTimeout(t); }
  await new Promise((s) => setTimeout(s, 1500));
}
const pass = results.filter((r) => r.ok).length;
console.log(JSON.stringify({ generatedAt: new Date().toISOString(), total: results.length, pass, verdict: pass === results.length ? 'PASS' : 'ATTENTION', results }, null, 2));
