// 首页 SKU 卡 v9 格式 + 排序 线上验证 — push 后跑
const { execSync } = require('child_process');
const checks = [
  // [locale, 期望含, 期望含2]
  ['zh-hk', '[材質]', '[起訂]'],
  ['en', '[Material]', '[MOQ]'],
  ['ja', '[材質]', '[最小注文]'],
];
let fail = 0;
for (const [loc, m1, m2] of checks) {
  const url = `https://zprintpro.com/${loc}/`;
  try {
    const html = execSync(`curl.exe -s "${url}"`, { encoding: 'utf8', timeout: 40000 });
    const ok1 = html.includes(m1);
    const ok2 = html.includes(m2);
    // 排序验证: 热度第一 waterproof-stickers 应出现在 magnetic-closure-gift-box 之前
    const wsPos = html.indexOf('waterproof-stickers');
    const mcPos = html.indexOf('magnetic-closure-gift-box');
    const sortOk = wsPos > -1 && mcPos > -1 && wsPos < mcPos;
    console.log(`${ok1 ? '✅' : '❌'} ${loc}: ${m1} ${ok2 ? '✅' : '❌'} ${m2} | 排序(ws<mc) ${sortOk ? '✅' : '❌'} (pos ws=${wsPos} mc=${mcPos})`);
    if (!ok1 || !ok2 || !sortOk) fail++;
  } catch (e) { console.log(`❌ ${loc}: ERR ${e.message.slice(0, 50)}`); fail++; }
}
console.log(fail ? `❌ ${fail} 项失败` : '✅ 首页 SKU v9 格式 + 热度排序全部线上确认');
