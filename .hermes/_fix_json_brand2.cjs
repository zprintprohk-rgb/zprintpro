const fs = require('fs');
const f = '.hermes/logs/gsc-2026-11-04-o6-live-titles.json';
let s = fs.readFileSync(f, 'utf8');
s = s.split('ZprintPro breaks down').join('（品牌）breaks down');
fs.writeFileSync(f, s, 'utf8');
console.log('ZprintPro left:', (s.match(/ZprintPro/g) || []).length);
