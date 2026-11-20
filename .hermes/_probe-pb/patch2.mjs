import fs from 'node:fs';
const p = 'F:/zprintpro-nextjs/.hermes/_probe-pb/build-selfpub.mjs';
let s = fs.readFileSync(p, 'utf8');
const n = (s.match(/'Varies'/g) || []).length;
s = s.split("'Varies'").join("'By page count'");
fs.writeFileSync(p, s, 'utf8');
console.log('replaced Varies occurrences:', n);
