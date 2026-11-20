const { equiv, band } = require('../scripts/guards/title-equiv.js');
const j = require('./title-quality-proposals-20260921-b131-213.json');
let bad = 0;
for (const p of j.proposals) {
  if (!p.title) continue;
  const b = band(p.title);
  if (b !== 'OK') { bad++; console.log(`${b}(${equiv(p.title)}) ${p.slug}|${p.locale} :: ${p.title}`); }
}
console.log(bad === 0 ? 'ALL TITLES IN BAND' : `${bad} titles out of band`);
