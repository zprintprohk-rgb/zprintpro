// 11-04 supplement: (A) 14-query handoff snapshot from end1103 API CSV (per-country)
//                   (B) live snippet fields for candidate owning pages (ja stickers, en books)
const fs = require('fs');

// ---------- A: CSV aggregation ----------
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
const QUERIES = {
  FIX: ['食品包裝印刷', 'small batch sticker printing', 'small batch stickers', '卒アル販売', 'saddle stitch booklet printing'],
  MEASURE: ['コミケ 印刷', '貼紙印刷', '宣傳單張', '月曆印刷', '書刊印刷', '利是封印刷', '包裝盒印刷', '教材 印刷製本', '喜帖印刷'],
};
const csv = parseCSV(fs.readFileSync('GSC数据/gsc-query-country-28d-end1103.csv', 'utf8'));
const snapshot = {};
for (const [route, qs] of Object.entries(QUERIES)) {
  for (const q of qs) {
    const perCountry = {};
    for (const r of csv.slice(1)) {
      if (r.length < 6) continue;
      const [query, ctry, clk, imp, , pos] = r;
      if (query !== q) continue;
      const a = perCountry[ctry] || (perCountry[ctry] = { clk: 0, imp: 0, wpos: 0, n: 0 });
      const c = Number(clk) || 0, m = Number(imp) || 0, p = Number(pos) || 0;
      a.clk += c; a.imp += m; a.wpos += p * m; a.n += 1;
    }
    const countries = {};
    for (const [ctry, a] of Object.entries(perCountry)) {
      countries[ctry] = { clk: a.clk, imp: a.imp, pos_weighted: a.imp ? +(a.wpos / a.imp).toFixed(2) : null, rows: a.n };
    }
    const totalImp = Object.values(perCountry).reduce((s, a) => s + a.imp, 0);
    snapshot[q] = { route, total_imp_all_countries: totalImp, countries };
  }
}

// ---------- B: live snippet probe ----------
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
function pick(html, re) { const m = html.match(re); return m ? m[1].replace(/\s+/g, ' ').trim() : null; }
const equiv = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1), 0);
async function probe(url) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 35000);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
    const b = await r.text();
    clearTimeout(to);
    const title = pick(b, /<title>([^<]+)<\/title>/i);
    const desc = pick(b, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      || pick(b, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    const h1 = pick(b, /<h1[^>]*>([\s\S]{1,200}?)<\/h1>/i);
    return { url, status: r.status, title, titleEquiv: equiv(title), desc, descLen: (desc || '').length, h1: h1 ? h1.replace(/<[^>]+>/g, '') : null };
  } catch (e) { return { url, error: String((e && e.message) || e) }; }
}

(async () => {
  const pages = [];
  for (const u of ['https://zprintpro.com/ja/category/stickers/', 'https://zprintpro.com/en/category/books/']) {
    pages.push(await probe(u));
    await new Promise((s) => setTimeout(s, 1200));
  }
  const out = {
    generated_at: new Date().toISOString(),
    source_csv: 'GSC数据/gsc-query-country-28d-end1103.csv (API, window 2026-10-06..2026-11-02, data day 11-02)',
    grain_note: 'query×country 现值快照 — 与 28d xlsx 全国家基线不同 grain，只作 MEASURE/FIX 路由的当前态补充，不作同法对比',
    handoff_snapshot: snapshot,
    live_snippets: pages,
  };
  fs.writeFileSync('.hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json', JSON.stringify(out, null, 2), 'utf8');
  // console summary
  for (const [q, v] of Object.entries(snapshot)) {
    const top = Object.entries(v.countries).sort((a, b) => b[1].imp - a[1].imp).slice(0, 3)
      .map(([c, a]) => `${c}:${a.imp}imp/${a.clk}clk/pos${a.pos_weighted}`).join(' | ');
    console.log(`[${v.route}] ${q} => ${top || '(no rows)'}`);
  }
  console.log('--- snippets ---');
  for (const p of pages) console.log(p.url, p.status, '| equiv', p.titleEquiv, '|', p.title);
})();
