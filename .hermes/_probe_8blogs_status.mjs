// .hermes/_probe_8blogs_status.mjs — 8 篇 blog 线上 200 + 段落数回归
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PAGES = [
  ['/ja/blog/new-year-card-printing-2027-guide/', 'nengajo'],
  ['/ja/blog/comiket-printing-prep-guide/', 'comiket-ja'],
  ['/en/blog/comiket-printing-prep-guide/', 'comiket-en'],
  ['/zh-hk/blog/cny-2027-red-packet-printing-guide/', 'red-packet'],
  ['/zh-hk/blog/corporate-calendar-customization-2027/', 'calendar-zh'],
  ['/en/blog/calendar-sizes-print-reference/', 'calendar-en'],
  ['/en/blog/corporate-holiday-cards-printing-guide/', 'holiday'],
  ['/zh-hk/blog/paper-bag-printing-guide/', 'paper-bag'],
];
for (const [u, name] of PAGES) {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const art = b.slice(b.indexOf('blog-content'));
  const h2 = (art.match(/<h2/g) || []).length;
  console.log(`${r.status} ${name} h2=${h2}`);
}
