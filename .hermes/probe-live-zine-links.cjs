// 1) hreflang 是否站级缺失 (对比既有旧文) ; 2) 新篇内链目标是否 200
(async () => {
  const pages = [
    'https://zprintpro.com/zh-hk/blog/school-exercise-book-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/zine-small-batch-booklet-printing-guide/',
  ];
  for (const u of pages) {
    const r = await fetch(u, { redirect: 'follow' });
    const h = await r.text();
    console.log(`hreflang 计数 ${(h.match(/hreflang=/g) || []).length}  |  ${u}`);
  }
  console.log('\n=== 新篇内链目标可用性 ===');
  const targets = [
    'https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/',
    'https://zprintpro.com/zh-hk/blog/saddle-stitch-booklet-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/catalog-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/school-exercise-book-printing-guide/',
    'https://zprintpro.com/zh-hk/services/rush-printing-delivery/',
    'https://zprintpro.com/zh-hk/quote/',
    'https://zprintpro.com/zh-hk/about/',
    'https://zprintpro.com/en/blog/saddle-stitch-booklet-printing-guide/',
    'https://zprintpro.com/ja/blog/catalog-printing-guide/',
    'https://zprintpro.com/en/services/rush-printing-delivery/',
    'https://zprintpro.com/ja/services/rush-printing-delivery/',
  ];
  let bad = 0;
  for (const t of targets) {
    try {
      const r = await fetch(t, { redirect: 'follow', method: 'GET' });
      const ok = r.status === 200;
      if (!ok) bad++;
      console.log(`  ${ok ? 'OK  ' : 'BAD '} ${r.status}  ${t}`);
    } catch (e) { bad++; console.log('  BAD ERR ' + t + ' ' + e.message); }
  }
  console.log('\n坏链 ' + bad);
})();
