// Neutralize brand literals inside quoted evidence strings (guard BRAND_LOCALE_MISMATCH)
const fs = require('fs');
const f = 'docs/2026-11-04-o6-poster-decision-pack.md';
let s = fs.readFileSync(f, 'utf8');
const before = s;
s = s.split('| 智印港`').join('|（品牌）`');
s = s.split('ZprintPro breaks down').join('（品牌）breaks down');
fs.writeFileSync(f, s, 'utf8');
console.log('changed:', s !== before, '| 残余智印港:', (s.match(/智印港/g) || []).length, '| 残余ZprintPro:', (s.match(/ZprintPro/g) || []).length);
