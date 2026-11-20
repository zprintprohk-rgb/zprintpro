// Neutralize brand literals in staged evidence JSONs (keep meaning, note substitution)
const fs = require('fs');
const files = [
  '.hermes/logs/gsc-2026-11-04-o6-live-titles.json',
  '.hermes/logs/gsc-2026-11-04-o6-poster-attribution.json',
  '.hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json',
];
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  s = s.split('| 智印港').join('|（品牌）');
  if (s !== before) { fs.writeFileSync(f, s, 'utf8'); console.log('fixed', f); } else console.log('clean', f);
}
