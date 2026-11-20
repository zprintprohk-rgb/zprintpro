// Batch #8 probe: envelope en/ja MOQ truth + calendar ja JPY (category pages)
const r = async (u) => { const x = await fetch(u); return { s: x.status, t: await x.text() }; };
let pass = 0, total = 0;
function chk(name, cond) { total++; if (cond) pass++; console.log(`${name}: ${cond ? 'PASS' : 'FAIL'}`); }

const en = await r('https://zprintpro.com/en/category/envelopes/');
chk('EN_200', en.s === 200);
chk('EN_100pcs', en.t.includes('100 pcs (digital printing)'));
chk('EN_500_pcs_gone', !/(?<![\d,-])500 pcs/.test(en.t));

const ja = await r('https://zprintpro.com/ja/category/envelopes/');
chk('JA_200', ja.s === 200);
chk('JA_100mai', ja.t.includes('100枚から（デジタル印刷）'));
chk('JA_500mai_gone', !ja.t.includes('500枚から'));

const cal = await r('https://zprintpro.com/ja/category/calendars/');
chk('CAL_200', cal.s === 200);
chk('CAL_yen50', cal.t.includes('¥50〜'));
chk('CAL_hkd_gone', !cal.t.includes('HK$3-8／冊'));

console.log(`RESULT ${pass}/${total}`);
console.log('BATCH8_DONE');
