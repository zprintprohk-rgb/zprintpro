/**
 * L1-1 诊断：7 条「位置<=12 却 28 天 0 点击」查询 → 我方落地页实况
 * 只读线上页面, 不做任何改动 (§0.2 禁区 2 零改文案)
 */
const CASES = [
  ['食品包裝印刷', 'zh-hk', ['/zh-hk/blog/food-packaging-printing-guide/', '/zh-hk/category/packaging/', '/zh-hk/product/food-boxes/']],
  ['a6 尺寸', 'zh-hk', ['/zh-hk/blog/a5-vs-a6-flyer-size/', '/zh-hk/blog/flyer-printing-guide/']],
  ['small batch sticker printing', 'en', ['/en/product/small-batch-stickers/', '/en/blog/sticker-guide/', '/en/category/stickers/']],
  ['小冊子印刷', 'zh-hk', ['/zh-hk/blog/saddle-stitch-booklet-printing-guide/', '/zh-hk/product/saddle-stitch-booklets/', '/zh-hk/category/books/']],
  ['大信封', 'zh-hk', ['/zh-hk/product/large-envelopes/', '/zh-hk/category/envelopes/']],
  ['small batch stickers', 'en', ['/en/product/small-batch-stickers/', '/en/category/stickers/']],
  ['邊度有紙袋買', 'zh-hk', ['/zh-hk/category/paper-bags/', '/zh-hk/product/kraft-paper-bags/', '/zh-hk/blog/paper-bag-printing-guide/']],
];
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
(async () => {
  for (const [q, loc, urls] of CASES) {
    console.log('\n' + '='.repeat(100));
    console.log('查询: ' + q + '   (' + loc + ')');
    console.log('='.repeat(100));
    for (const u of urls) {
      const url = 'https://zprintpro.com' + u;
      try {
        const r = await fetch(url, { redirect: 'follow' });
        if (r.status !== 200) { console.log('  [%s] HTTP %s  (跳过)', u, r.status); continue; }
        const h = await r.text();
        const title = strip((h.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
        const meta = (h.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || [])[1] || '';
        const h1 = strip((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '');
        const bodyText = strip(h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' '));
        const qInTitle = title.includes(q) || title.toLowerCase().includes(q.toLowerCase());
        const qInBody = bodyText.includes(q);
        // 快速答案块首句
        const qa = (h.match(/快速答案[：:]([^<]{0,90})/i) || [])[1] || (h.match(/Quick Answer[：:]([^<]{0,90})/i) || [])[1] || '';
        console.log('\n  URL   : ' + u);
        console.log('  title : ' + title);
        console.log('  meta  : ' + meta.slice(0, 175));
        console.log('  H1    : ' + h1.slice(0, 110));
        console.log('  查询词在 title: ' + (qInTitle ? '是' : '否') + ' / 在正文: ' + (qInBody ? '是' : '否'));
        if (qa) console.log('  答案块: ' + strip(qa).slice(0, 100));
      } catch (e) { console.log('  [%s] ERR %s', u, e.message.slice(0, 60)); }
    }
  }
})();
