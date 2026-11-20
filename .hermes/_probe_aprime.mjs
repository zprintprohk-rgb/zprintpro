// A-prime integrity probe — Node native fetch, no PS parsing layer
const urls = {
  zh: 'https://zprintpro.com/zh-hk/category/packaging/',
  en: 'https://zprintpro.com/en/category/packaging/',
  ja: 'https://zprintpro.com/ja/category/packaging/',
};
const get = async (u) => (await fetch(u, { redirect: 'follow' })).text();
const [z, e, j] = await Promise.all([get(urls.zh), get(urls.en), get(urls.ja)]);
const has = (s, needle) => s.includes(needle);
console.log('ZH_WUDU_GONE   ', !has(z, '無毒'));
console.log('ZH_SGS_KEPT    ', has(z, 'SGS'));
console.log('ZH_ECO_OPTION  ', has(z, '環保油墨選項'));
console.log('EN_NOTOXIC_GONE', !has(e, 'non-toxic soy'));
console.log('EN_3DAY_GONE   ', !has(e, '3-Day Delivery'));
console.log('EN_12SERIES    ', has(e, '12 professional series'));
console.log('JA_WUDU_GONE   ', !has(j, '無毒'));
console.log('JA_3DAY_GONE   ', !has(j, '3日納品'));
console.log('JA_MOQ100      ', has(j, '全箱型100個から'));
