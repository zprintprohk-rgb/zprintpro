// 取 saddle-stitch-booklets 线上 PDP 显示的权威价格口径 (客户可验证的事实来源)
(async () => {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const url = `https://zprintpro.com/${loc}/product/saddle-stitch-booklets/`;
    try {
      const r = await fetch(url, { redirect: 'follow' });
      const html = await r.text();
      console.log('\n########## ' + loc + ' HTTP ' + r.status + ' (' + html.length + ' B)');
      const m = html.match(/HK\$[\d.,]+(?:\s*[-–~]\s*[\d.,]+)?(?:\s*\/\s*[^<\s"{,]{1,10})?/g) || [];
      console.log('  HK$ 命中: ' + [...new Set(m)].slice(0, 14).join(' | '));
      const u = html.match(/US\$[\d.,]+(?:\s*[-–~]\s*[\d.,]+)?(?:\s*\/\s*[^<\s"{,]{1,10})?/g) || [];
      console.log('  US$ 命中: ' + [...new Set(u)].slice(0, 14).join(' | '));
      const y = html.match(/¥[\d.,]+(?:\s*[-–~]\s*[\d.,]+)?(?:\s*\/\s*[^<\s"{,]{1,10})?/g) || [];
      console.log('  円/¥ 命中: ' + [...new Set(y)].slice(0, 14).join(' | '));
      const moq = html.match(/(\d+)\s*(?:本|copy|copies|部)\s*起|MOQ[^<]{0,20}|最小(?:ロット|注文)[^<]{0,20}/g) || [];
      console.log('  MOQ 命中: ' + [...new Set(moq)].slice(0, 8).join(' | '));
      const t = html.match(/<title>([^<]*)<\/title>/);
      console.log('  title: ' + (t ? t[1] : '(none)'));
    } catch (e) {
      console.log('\n' + loc + ' ERR ' + e.message);
    }
  }
})();
