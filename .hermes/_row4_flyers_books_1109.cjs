// Row-4 MEASURE evidence: 宣傳單張 / 書刊印刷 query×page attribution + live page check
const fs = require('fs');
function parseCSV(text) {
  const rows = []; let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) { if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; } else field += ch; }
    else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const qp = parseCSV(fs.readFileSync('GSC数据/money-kw-query-page-country-2026-10-31.csv', 'utf8'));
const OUT = {};
for (const q of ['宣傳單張', '宣傳單張印刷', '書刊印刷', '印書']) {
  const rows = qp.slice(1).filter((r) => r.length >= 7 && r[0] === q).sort((a, b) => Number(b[4]) - Number(a[4]));
  OUT[q] = rows.slice(0, 6).map((r) => ({ url: r[1].replace('https://zprintpro.com', ''), ctry: r[2], imp: Number(r[4]), clk: Number(r[3]), pos: r[6] }));
  console.log(`\n== ${q} ==`);
  OUT[q].forEach((x, i) => console.log(`  ${i + 1}. ${x.url} | ${x.ctry} | ${x.imp}imp ${x.clk}clk pos${x.pos}`));
}
fs.writeFileSync('.hermes/logs/gsc-2026-11-09-flyers-books-attribution.json', JSON.stringify(OUT, null, 2), 'utf8');
// live check: flyers + books category pages (title equiv + price truth spot)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36';
function pick(h, re) { const m = h.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; }
const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
(async () => {
  const live = [];
  for (const u of ['https://zprintpro.com/zh-hk/category/flyers/', 'https://zprintpro.com/zh-hk/category/books/']) {
    const r = await fetch(u, { headers: { 'User-Agent': UA } });
    const b = await r.text();
    const title = pick(b, /<title>([^<]+)<\/title>/i);
    const desc = pick(b, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    live.push({ url: u.replace('https://zprintpro.com', ''), status: r.status, title, titleEquiv: equiv(title), descLen: (desc || '').length, hasSingle10: /10\s*張起|10張起/.test(b), priceAfterFix: /HK\$0\.(38|45|55)|HK\$8/.test(b) });
    await new Promise((s) => setTimeout(s, 1200));
  }
  fs.writeFileSync('.hermes/logs/gsc-2026-11-09-flyers-books-live.json', JSON.stringify(live, null, 2), 'utf8');
  live.forEach((l) => console.log('\nLIVE', l.url, l.status, '| equiv', l.titleEquiv, '| desc', l.descLen, '| 10張起:', l.hasSingle10));
})();
