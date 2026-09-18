(async () => {
  for (const u of [
    'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/zine-small-batch-booklet-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/school-exercise-book-printing-guide/',
    'https://zprintpro.com/en/blog/school-exercise-book-printing-guide/',
  ]) {
    const r = await fetch(u, { redirect: 'follow' });
    const h = await r.text();
    const head = h.slice(0, h.indexOf('</head>'));
    const links = [...head.matchAll(/<link[^>]*>/gi)].map((m) => m[0]);
    console.log('\n########## ' + u + '  HTTP ' + r.status);
    console.log('  <link> 总数: ' + links.length);
    for (const l of links) console.log('    ' + l.slice(0, 190));
    const meta = [...head.matchAll(/<meta[^>]*(?:og:locale|property="og:url")[^>]*>/gi)].map((m) => m[0]);
    for (const m of meta) console.log('    META ' + m.slice(0, 150));
    console.log('  age/cache: ' + (r.headers.get('cf-cache-status') || '-') + ' / ' + (r.headers.get('age') || '-'));
  }
})();
