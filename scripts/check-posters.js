// gen-posters-data.mjs — quick verification + price_range update helper
const posters = JSON.parse(require('fs').readFileSync('F:/zprintpro-nextjs/src/data/price-tables/posters.json','utf-8'));

// Find A2 157g simplex config
const a2simplex = posters.configs.find(c => c.config === 'A2 · 铜版纸 · 157g · 單面');
console.log('A2 · 铜版纸 · 157g · 單面 price range:');
const prices = a2simplex.tiers.map(t => t.sell_hkd);
console.log('Min HK$' + Math.min(...prices) + ' — Max HK$' + Math.max(...prices));
console.log('Tiers:', a2simplex.tiers.map(t => `${t.qty}: HK$${t.sell_hkd}`).join(', '));

// Total configs
console.log('\nTotal configs:', posters.configs.length);
posters.configs.forEach(c => console.log('  ' + c.config + ' (' + c.tiers.length + ' tiers)'));
