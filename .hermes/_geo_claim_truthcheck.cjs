// Verify AI-answer claims attributed to zprintpro actually exist on live site
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const targets = [
  { name: 'C4 紙袋 · 1 小時免費數碼打稿', url: 'https://zprintpro.com/zh-hk/category/paper-bags/', needles: ['1小時', '一小時', '1 小時', '免費數碼打稿', '數碼打稿'] },
  { name: 'C3 月曆 · 48 小時快遞 / 1 本起印 / 300 本上機', url: 'https://zprintpro.com/zh-hk/category/calendars/', needles: ['48小時', '48 小時', '1本起', '1 本起', '300本', '300 本', 'FSC'] },
  { name: 'C1 食品包裝 · 100 個起 / HK$2.5 / 免開版費', url: 'https://zprintpro.com/zh-hk/category/packaging/', needles: ['100個', '100 個', 'HK$2.5', '開版費', 'FDA'] },
];
(async () => {
  const out = [];
  for (const t of targets) {
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 30000);
      const r = await fetch(t.url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
      const b = await r.text();
      clearTimeout(to);
      const found = t.needles.filter((n) => b.includes(n));
      out.push({ name: t.name, url: t.url, status: r.status, bytes: b.length, found, missing: t.needles.filter((n) => !b.includes(n)) });
    } catch (e) {
      out.push({ name: t.name, url: t.url, error: String(e && e.message || e) });
    }
    await new Promise((s) => setTimeout(s, 1200));
  }
  console.log(JSON.stringify(out, null, 2));
})();
