// Batch #9 probe: packaging category tiered MOQ (zh/en/ja)
let pass = 0, total = 0;
function chk(n, c) { total++; if (c) pass++; console.log(`${n}: ${c ? 'PASS' : 'FAIL'}`); }
const zh = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
const en = await (await fetch('https://zprintpro.com/en/category/packaging/')).text();
const ja = await (await fetch('https://zprintpro.com/ja/category/packaging/')).text();
chk('ZH_200', zh.includes('最低 100 個起（紙卡類盒型）'));
chk('ZH_ALL_GONE', !zh.includes('全盒型 100'));
chk('EN_TIERED', en.includes('corrugated, tuck-end and gang-run styles from 500'));
chk('EN_ALL_GONE', !en.includes('100 units for all box styles') && !en.includes('across all box styles'));
chk('JA_TIERED', ja.includes('段ボール・タック端・白カード箱などは500個から'));
chk('JA_ALL_GONE', !ja.includes('全箱型100個から'));
console.log(`RESULT ${pass}/${total}`);
console.log('BATCH9_DONE');
