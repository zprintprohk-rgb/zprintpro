const fs = require('fs');
const JOBS = [
  ['src/data/blog-data/zh-hk.json', 'calendar-printing-guide'],
  ['src/data/blog-data/zh-hk.json', '2027-calendar-printing-complete-guide'],
  ['src/data/blog-data/zh-hk.json', '2027-monthly-calendar-printing-timetable'],
  ['src/data/blog-data/en.json', 'calendar-printing-guide'],
  ['src/data/blog-data/en.json', '2027-calendar-printing-complete-guide'],
  ['src/data/blog-data/en.json', '2027-monthly-calendar-printing-timetable'],
  ['src/data/blog-data/ja.json', 'calendar-printing-guide'],
  ['src/data/blog-data/ja.json', '2027-calendar-printing-complete-guide'],
  ['src/data/blog-data/ja.json', '2027-monthly-calendar-printing-timetable'],
];
const NEEDLE = /HK\$8-25|US\$1\.00|1部160円|160〜500円/g;
for (const [f, slug] of JOBS) {
  const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
  const p = Object.values(arr).find((x) => x.slug === slug);
  console.log('\n=== ' + f.split('/').pop() + ' :: ' + slug);
  for (const k of ['description', 'excerpt', 'content']) {
    const v = p[k];
    if (typeof v !== 'string') continue;
    const hits = [...new Set(v.match(NEEDLE) || [])];
    if (!hits.length) continue;
    console.log('  [' + k + '] ' + hits.join(' | ') + '  ×' + (v.match(NEEDLE) || []).length);
    // 打印第一处上下文
    const m = NEEDLE.exec(v);
    NEEDLE.lastIndex = 0;
    if (m) console.log('      …' + v.slice(Math.max(0, m.index - 70), m.index + 70).replace(/\n/g, ' ') + '…');
  }
}
