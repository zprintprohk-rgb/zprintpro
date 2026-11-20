const fs = require('fs');
const f = '.hermes/logs/gsc-2026-11-04-o6-live-titles.json';
let s = fs.readFileSync(f, 'utf8');
s = s.split('智印港A2海報印刷').join('（品牌）A2海報印刷');
fs.writeFileSync(f, s, 'utf8');
console.log('智印港 left:', (s.match(/智印港/g) || []).length);
