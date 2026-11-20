// E4 線上終驗 v2: 只查本批新增元素的指紋（href / CTA 文案 / 塊標記）
const fs = require('fs');
const checks = {
  'en/blog/poster-printing-guide/': ['data-e4', '/en/blog/poster-size-guide/', '/en/category/flyers/', 'WhatsApp Instant Quote'],
  'ja/blog/poster-printing-guide/': ['data-e4', '/ja/category/flyers/', '/ja/blog/cross-border-ecommerce-shipping-box-guide/', 'WhatsApp 即時見積'],
  'ja/blog/sticker-material-pvc-vinyl-removable/': ['ZprintPro WhatsApp'],
  'en/blog/school-exercise-book-printing-guide/': ['data-e4', '/en/category/educational/', '/en/category/books/', '/en/services/rush-printing-delivery/'],
  'ja/blog/school-exercise-book-printing-guide/': ['data-e4', '/ja/category/educational/', '/ja/category/books/', '/ja/services/rush-printing-delivery/'],
  'zh-hk/blog/school-exercise-book-printing-guide/': ['data-e4', '/zh-hk/category/educational/', '/zh-hk/category/books/', '/zh-hk/services/rush-printing-delivery/'],
  'zh-hk/blog/packaging-box-pricing-2026/': ['data-e4', '/zh-hk/blog/poster-printing-guide/'],
};
(async () => {
  let allOk = true;
  for (const [url, fps] of Object.entries(checks)) {
    const r = await fetch('https://zprintpro.com/' + url);
    const h = await r.text();
    const miss = fps.filter((f) => !h.includes(f));
    const ok = miss.length === 0;
    if (!ok) allOk = false;
    console.log((ok ? '✅' : '🔴') + ' ' + url + (miss.length ? ' 缺: ' + miss.join(', ') : ' 指紋全齊'));
  }
  process.exit(allOk ? 0 : 1);
})();
