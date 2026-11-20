// Reviews A1 probe: PDP 200 (section hidden), API fail-closed 404
const pdp = await fetch('https://zprintpro.com/zh-hk/product/die-cut-stickers/');
const html = await pdp.text();
console.log('PDP_STATUS:', pdp.status);
console.log('PDP_OK_CONTENT:', html.includes('異形模切貼紙'));
const api = await fetch('https://zprintpro.com/api/reviews?slug=die-cut-stickers&locale=zh-hk');
console.log('API_FAIL_CLOSED_STATUS:', api.status, '(404 = table not yet applied, feature hidden = expected pre-migration)');
const post = await fetch('https://zprintpro.com/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ slug: 'die-cut-stickers', locale: 'zh-hk', rating: 5, body: '測試評價內容足夠長度', consent: true }),
});
console.log('POST_FAIL_CLOSED_STATUS:', post.status, '(404 expected pre-migration; 200 post-migration)');
console.log('REVIEWS_A1_PROBE_DONE');
