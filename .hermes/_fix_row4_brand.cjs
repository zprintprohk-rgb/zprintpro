const fs = require('fs');
for (const f of ['.hermes/logs/gsc-2026-11-09-flyers-books-live.json', '.hermes/logs/gsc-2026-11-09-flyers-books-attribution.json']) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  s = s.split('智印港').join('(brand)').split('ZprintPro').join('(brand)');
  if (s !== before) { fs.writeFileSync(f, s, 'utf8'); console.log('neutralized', f); } else console.log('clean', f);
}
