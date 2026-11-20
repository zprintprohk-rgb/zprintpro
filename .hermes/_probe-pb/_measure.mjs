import fs from 'fs';
const FW = /[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/;
const equiv = (s) => [...String(s || '')].reduce((n, ch) => n + (FW.test(ch) ? 2 : 1), 0);
const doc = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json', 'utf8'));
console.log('CURRENT zh-hk desc', equiv(doc.description['zh-hk']), JSON.stringify(doc.description['zh-hk']));
console.log('CURRENT ja desc  ', equiv(doc.description.ja), JSON.stringify(doc.description.ja));
console.log('CURRENT zh-hk exc ', equiv(doc.excerpt['zh-hk']));
console.log('CURRENT ja exc    ', equiv(doc.excerpt.ja));

const Z = [
  '自費出版印刷 1 本起印、無最低起訂量。平裝、精裝、騎馬釘、線圈裝四種裝訂對比，附 100 至 10,000 本單價階梯，柯式 100 本以上單價更低。即刻 WhatsApp 傳規格問價。',
  '自費出版印刷 1 本起印、無最低起訂量。平裝、精裝、騎馬釘、線圈裝四種裝訂對比，附 100 至 10,000 本單價階梯，柯式 100 本以上更平。即刻 WhatsApp 傳規格索取報價。',
  '自費出版印刷 1 本起印、無最低起訂量。平裝、精裝、騎馬釘、線圈裝四種裝訂對比，附 100 至 10,000 本單價階梯，柯式 100 本以上更平。WhatsApp 傳規格索取報價。',
  '自費出版印刷 1 本起印、無最低起訂量。平裝、精裝、騎馬釘、線圈裝四種裝訂對比，附 100 至 10,000 本單價階梯，柯式 100 本以上更平。即刻 WhatsApp 傳規格問價。',
];
const J = [
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じ・ワイヤー綴じの 4 製本を比較し、100 部から 10,000 部の単価ラダーを掲載。WhatsApp で実価をご依頼ください。',
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じを比較し、100 部から 10,000 部の単価ラダーを掲載。WhatsApp で実価をどうぞ。',
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じを比較し、100 部から 10,000 部の単価ラダーを掲載。WhatsApp で実価をお尋ねください。',
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じ・ワイヤー綴じを比較し、100 部から 10,000 部の単価ラダーを掲載。WhatsApp で見積りをどうぞ。',
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じ・ワイヤー綴じを比較し、100 部から 10,000 部の単価ラダーを掲載。100 部以上はオフセット向き。WhatsApp で見積りをどうぞ。',
];
Z.forEach((s, i) => console.log(`Z${i}`, equiv(s), s.length));
J.forEach((s, i) => console.log(`J${i}`, equiv(s), s.length));
