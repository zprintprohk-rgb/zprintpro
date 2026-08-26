// Inspect blog-data JSON structure for poster-size-guide (yesterday's entry = format reference)
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'blog-data');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, loc + '.json'), 'utf-8'));
  const keys = Object.keys(j);
  console.log('=== ' + loc + ' === total keys:', keys.length);
  const e = j['poster-size-guide'];
  if (e) {
    console.log('entry keys:', Object.keys(e).join(', '));
    const s = JSON.stringify(e, null, 1);
    console.log(s.substring(0, 900));
    console.log('... content length:', (e.content || e.html || '').length);
  } else {
    console.log('poster-size-guide NOT found');
  }
}
