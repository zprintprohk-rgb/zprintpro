// 同一 URL 连续 6 次抓取: 验证响应是否确定性 (探针可信度前提)
(async () => {
  const urls = [
    'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/',
    'https://zprintpro.com/ja/blog/',
    'https://zprintpro.com/zh-hk/blog/school-exercise-book-printing-guide/',
  ];
  for (const u of urls) {
    const counts = [], lens = [], codes = [];
    for (let i = 0; i < 6; i++) {
      const r = await fetch(u, { redirect: 'follow', headers: { 'cache-control': 'no-cache' } });
      const h = await r.text();
      const n = (h.match(/rel="alternate"[^>]*hreflang=/gi) || []).length;
      counts.push(n); lens.push(h.length); codes.push(r.status);
    }
    console.log('\n' + u);
    console.log('  alternate+hreflang 计数: ' + counts.join(', '));
    console.log('  HTML 长度:            ' + lens.join(', '));
    console.log('  HTTP:                 ' + codes.join(', '));
    console.log('  确定性: ' + (new Set(counts).size === 1 ? '✅ 稳定' : '❌ 不稳定'));
  }
})();
