#!/usr/bin/env node
/* 只读: 抓一个 503 的响应体与控制台可见信息 (判定是 CF 发布中还是页面级错误) */
const U = 'https://zprintpro.com/zh-hk/blog/food-packaging-printing-guide';
(async () => {
  for (let i = 0; i < 3; i++) {
    const r = await fetch(U + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
    const body = await r.text();
    console.log(`\n--- 尝试 ${i + 1}: HTTP ${r.status} len=${body.length} cf-cache=${r.headers.get('cf-cache-status')} server=${r.headers.get('server')} ---`);
    console.log('headers:', JSON.stringify(Object.fromEntries(['retry-after', 'cf-ray', 'x-nextjs-cache', 'cache-control'].map(k => [k, r.headers.get(k)]))));
    console.log('body 片段:', body.replace(/\s+/g, ' ').slice(0, 500));
    await new Promise(res => setTimeout(res, 8000));
  }
})();
