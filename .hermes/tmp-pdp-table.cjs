// 提取 PDP 上的「报价表区域」原文 (客户实际看到的价格 = 权威口径)
(async () => {
  const r = await fetch('https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/', { redirect: 'follow' });
  let html = await r.text();
  // 去 script/style
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, ' ');
  console.log('TEXT LEN', text.length);
  const keys = ['HK$6', 'HK$6-32', '100本起', '100 本起', '50 本起', 'MOQ 50', '頁', '規格', '價格', '起訂'];
  for (const k of keys) {
    let i = -1, n = 0;
    while ((i = text.indexOf(k, i + 1)) !== -1 && n < 3) {
      n++;
      console.log('\n--- "' + k + '" #' + n + ' ---');
      console.log(text.slice(Math.max(0, i - 220), i + 220));
    }
  }
})();
