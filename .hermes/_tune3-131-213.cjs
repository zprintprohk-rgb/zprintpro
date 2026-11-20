const fs = require('fs');
const F = '.hermes/title-quality-proposals-20260921-b131-213.json';
const j = JSON.parse(fs.readFileSync(F, 'utf8'));
const R = {
  'spot-uv-greeting-cards|ja': '部分UVグリーティングカード｜光沢｜10枚〜¥27〜｜ZprintPro',
  'matte-greeting-cards|en': 'Matte Greeting Cards | 10 MOQ $0.14 | Holiday | ZprintPro',
  'foil-wedding-invitations|en': 'Foil Wedding Invites | 50 MOQ | Gold & Silver | ZprintPro',
};
for (const p of j.proposals) {
  const k = `${p.slug}|${p.locale}`;
  if (R[k] && p.title) p.title = R[k];
}
fs.writeFileSync(F, JSON.stringify(j, null, 2));
console.log('done');
