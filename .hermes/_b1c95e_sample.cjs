// .hermes/_b1c95e_sample.cjs — 修正候选 + 灰区样本抽样
const j = require('./logs/b1c-cluster95e-inventory-2026-10-16.json');
const isQty = /(個|枚|本|張|件|部|sets?| pcs|ロット|下单|订单|享|折|以上〜|个起|MOQ| qty|quantity)/i;
const isClient = /(客戶|客户|clients?|customers?|brands?|ブランド|users?|served|服務|服务)/i;
const fix = j.items.filter(o => !o.pat.startsWith('12') && isClient.test(o.ctx) && !(isQty.test(o.ctx) && !isClient.test(o.ctx)));
const gray = j.items.filter(o => o.pat.startsWith('12') || (!isQty.test(o.ctx) && !isClient.test(o.ctx)));
console.log('== FIX (' + fix.length + ') ==');
fix.slice(0, 12).forEach(o => console.log('[' + o.f.split('/').pop() + '|' + o.pat + ']', o.ctx.slice(0, 115)));
console.log('== GRAY (' + gray.length + ') ==');
gray.slice(0, 14).forEach(o => console.log('[' + o.pat + '|' + o.f.split('/').pop() + ']', o.ctx.slice(0, 105)));
