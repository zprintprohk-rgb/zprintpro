'use strict';
/** Step B 渲染验收: ① GSC 尾巴已消失 ② 定价口径已脱敏 ③ 价格数值仍在 (阴性对照自证)
 *  用法: node stepB-render-verify.cjs [baseUrl]   默认本地; 传 https://zprintpro.com 则验收线上
 */
const http = require('http');
const https = require('https');
const BASE = (process.argv[2] || 'http://localhost:3999').replace(/\/$/, '');
const AGENT = BASE.startsWith('https') ? https : http;
const get = u => new Promise((res, rej) => {
  const q = AGENT.get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/120' } }, r => {
    let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ s: r.statusCode, h: d }));
  });
  q.on('error', rej); q.setTimeout(300000, () => q.destroy(new Error('timeout')));
});
const text = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const MUST_GONE = [
  'GSC 数据', 'GSC 數據', 'GSC データ', 'gsc-fresh-2026-09-03.json',
  '数据诚信红线', '數據誠信紅線', '拍板日', '校準報價', '校準來源', '真實校準',
  '参考價格 × 1.3', '參考實詢', '1.3x fair margin', 'CNY→USD', '校正価格',
];
const MUST_STAY = [
  'HK$811', 'HK$1,138', 'HK$4,202',      // zh-hk 价格阶梯
  'HK$965', 'HK$2,800',                  // mailer-boxes 阶梯
  '參考價', '價格依據',                   // 改写后的表格文字 (阳性对照)
  '2026 年最新市場資料',                  // 新尾巴 (zh-hk)
  'latest 2026 market review',           // 新尾巴 (en)
  '2026 年の最新市場情報',                // 新尾巴 (ja)
];

(async () => {
  const URLS = [
    ['/zh-hk/blog/candle-soap-label-printing-guide/', 'GSC 尾巴验收 (zh-hk)'],
    ['/en/blog/candle-soap-label-printing-guide/', 'GSC 尾巴验收 (en)'],
    ['/ja/blog/candle-soap-label-printing-guide/', 'GSC 尾巴验收 (ja)'],
    ['/zh-hk/product/kraft-paper-bags/', '定价口径验收 (kraft)'],
    ['/zh-hk/product/mailer-boxes/', '定价口径验收 (mailer)'],
    ['/en/product/kraft-paper-bags/', '定价口径验收 (en)'],
    ['/ja/product/kraft-paper-bags/', '定价口径验收 (ja)'],
  ];
  let fail = 0;
  const bodies = {};
  for (const [u, label] of URLS) {
    try {
      const r = await get(BASE + u);
      const t = text(r.h);
      bodies[u] = t;
      console.log(`\n=== ${label} ${u} HTTP ${r.s} (len ${t.length}) ===`);
      const hitGone = MUST_GONE.filter(s => t.includes(s));
      console.log(`  应消失串残留: ${hitGone.length ? '❌ ' + JSON.stringify(hitGone) : '✅ 0'}`);
      if (hitGone.length) fail++;
    } catch (e) {
      console.log(`\n=== ${label} ${u} 💥 ${e.message} ===`);
      fail++;
    }
  }
  console.log('\n=== 阳性对照 (价格与新文案必须仍在) ===');
  const all = Object.values(bodies).join(' ');
  for (const s of MUST_STAY) {
    const ok = all.includes(s);
    if (!ok) fail++;
    console.log(`  ${ok ? '✅' : '❌'} 仍存在: ${JSON.stringify(s)}`);
  }
  console.log(`\n=== 渲染验收: FAIL ${fail} ===`);
  console.log('（阴性对照有效性: "应消失串"若在新页面仍出现即报 ❌; 阳性对照确保没把内容整段删掉）');
  process.exit(0);
})();
