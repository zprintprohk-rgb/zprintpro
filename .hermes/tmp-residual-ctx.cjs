(async () => {
  for (const u of [
    'https://zprintpro.com/zh-hk/blog/saddle-stitch-booklet-printing-guide/',
    'https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/',
  ]) {
    const r = await fetch(u, { redirect: 'follow' });
    const t = await r.text();
    const text = t.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log('\n########## ' + u);
    let i = -1, n = 0;
    while ((i = text.indexOf('50 本起', i + 1)) !== -1 && n < 8) {
      n++;
      console.log('  #' + n + ': …' + text.slice(Math.max(0, i - 130), i + 60) + '…');
    }
    console.log('  合计 ' + n + ' 处');
  }
})();
