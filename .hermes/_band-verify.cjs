const m = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
console.log('TITLE_MIN=', m.TITLE_MIN, 'TITLE_MAX=', m.TITLE_MAX);
console.log('equiv(51)=', m.equiv('x'.repeat(51)), 'band=', m.band(m.equiv('x'.repeat(51))));
console.log('band(54)=', m.band(54));
console.log('band(58)=', m.band(58));
console.log('band(60)=', m.band(60));
// real title checks
const t1 = 'A4 傳單印刷 宣傳單張 覆膜 10起印 HK$0.35起 | 智印港';
const t2 = '環保傳單印刷 | 再生紙 | 10張起印 HK$0.38起 | 智印港';
console.log('a4 new equiv=', m.equiv(t1), 'band=', m.band(m.equiv(t1)));
console.log('eco new equiv=', m.equiv(t2), 'band=', m.band(m.equiv(t2)));
