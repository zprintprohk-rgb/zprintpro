// DJ-001 ja feed price check
const x = await (await fetch('https://zprintpro.com/api/merchant-feed/ja/')).text();
const seg = x.split('<item>').find(i => i.includes('DJ-001'));
const price = seg ? (seg.match(/<g:price>([^<]+)/) || [])[1] : 'ITEM_NOT_FOUND';
console.log('DJ001_JA_FEED_PRICE:', price);
console.log('EOD_PROBE_DONE');
