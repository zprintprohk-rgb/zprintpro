const fs = require('fs');
const slugs = ['2027-monthly-calendar-printing-timetable', 'rush-printing-delivery-guide', 'packaging-box-price-2026'];
const locales = ['en', 'ja', 'zh-hk'];
for (const loc of locales) {
  const data = JSON.parse(fs.readFileSync('./src/data/blog-data/' + loc + '.json', 'utf8'));
  console.log('=== Locale:', loc, '===');
  for (const s of slugs) {
    const p = data[s];
    if (!p) { console.log(' ', s, '— NOT FOUND'); continue; }
    const c = p.content || '';
    const re = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
    let m;
    const types = [];
    while ((m = re.exec(c)) !== null) {
      const tm = m[1].match(/"@type":"([^"]+)"/);
      if (tm) types.push(tm[1]);
    }
    console.log(' ', s, 'len=' + c.length, 'inline=' + types.length, 'types=' + types.join(','));
  }
}
