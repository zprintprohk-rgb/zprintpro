// moq10-probe-strings.mjs — 直接抓線上 rush 頁, 列出 MOQ 相關字串與「下午 3 時」來源
const urls = [
  'https://zprintpro.com/zh-hk/services/rush-printing-delivery/',
  'https://zprintpro.com/en/services/rush-printing-delivery/',
];
for (const u of urls) {
  const res = await fetch(u, { headers: { 'user-agent': 'probe/1.0' } });
  const t = await res.text();
  console.log(`\n===== ${u} (HTTP ${res.status}, len ${t.length}) =====`);
  const pats = [
    /下午\s*3\s*時前落單/g, /18:00 前落單/g, /10 張起印/g, /100 張起印/g,
    /\d+\s*MOQ/g, /from \d+ pcs/g, /10枚〜/g, /100枚〜/g, /100\+ MOQ/g,
  ];
  for (const p of pats) {
    const m = [...t.matchAll(p)];
    if (m.length) console.log(`  ${p.source} × ${m.length}  → 例: ${t.slice(Math.max(0, m[0].index - 70), m[0].index + 40).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150)}`);
  }
  // meta description
  const md = t.match(/<meta name="description" content="([^"]*)"/);
  if (md) console.log(`  META desc: ${md[1].slice(0, 220)}`);
  const ti = t.match(/<title>([^<]*)<\/title>/);
  if (ti) console.log(`  TITLE    : ${ti[1].slice(0, 160)}`);
}
