// Post-deploy end-to-end probe for checkout fix (run AFTER CF build success)
const SITE = 'https://zprintpro.com';
const url = `${SITE}/api/create-payment-session`;
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

console.log('=== 1) OPTIONS (route exists?) ===');
const opt = await fetch(url, { method: 'OPTIONS' });
console.log('OPTIONS status', opt.status, '(expect 204)');

console.log('\n=== 2) invalid payload (validation) ===');
const bad = await fetch(url, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 0, currency: 'HKD', payment_method: 'bank_transfer' }),
});
console.log('bad-amount status', bad.status, '(expect 400)', (await bad.text()).slice(0, 120));

console.log('\n=== 3) valid bank_transfer order (marked test row) ===');
const payload = {
  amount: 80000, // HK$800.00 in cents
  currency: 'HKD',
  payment_method: 'bank_transfer',
  quote_data: {
    locale: 'zh-hk',
    items: [{ sku_code: 'PK-002', name: '化妝品包裝盒', quantity: 100, unitPrice: 8, options: {} }],
    contact: {
      name: '系統測試 · 可刪 (probe 2026-11-01)',
      phone: '+85200000000',
      email: 'zprintpro@outlook.com',
      address: 'PROBE — no shipment',
    },
  },
};
const r = await fetch(url, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
});
const text = await r.text();
console.log('POST status', r.status, '(expect 200)');
let j = null;
try { j = JSON.parse(text); } catch {}
if (j) {
  console.log('  orderId      :', j.orderId, '| uuid?', uuidRe.test(j.orderId || ''));
  console.log('  orderNumber  :', j.orderNumber);
  console.log('  paymentMethod:', j.paymentMethod);
  console.log('  amountMajor  :', j.amountMajor, j.currency, '(expect 800 HKD)');
  console.log('  persisted    :', j.persisted, j.persistSchema || '', j.persistError ? ('| err: ' + String(j.persistError).slice(0, 160)) : '');
  const w = j.wireTransferInfo;
  console.log('  wire         :', w ? `bank=${w.bank_name} acct=${w.account_number} swift=${w.swift_code} holder=${String(w.account_holder).slice(0, 28)}...` : 'MISSING');
} else {
  console.log('  non-JSON body:', text.slice(0, 300));
}

console.log('\n=== 4) confirmation page reachable with that order id ===');
if (j && j.orderId) {
  const c = await fetch(`${SITE}/zh-hk/order-confirmation/?order=${j.orderId}`);
  const ch = await c.text();
  console.log('confirmation status', c.status, 'len', ch.length, 'html closed', ch.includes('</html>'));
}

console.log('\n=== 5) currency validation boundary (no extra orders created) ===');
for (const cur of ['EUR', 'JPY']) {
  const rr = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, currency: cur, quote_data: { ...payload.quote_data, contact: { ...payload.quote_data.contact, name: 'x' } } }) });
  console.log(`${cur}: status ${rr.status}`, cur === 'EUR' ? '(expect 400 — 白名单)' : '(expect 200 — JPY 合法)' );
  if (cur === 'JPY') { try { const jj = await rr.json(); console.log('   JPY orderId', jj.orderId, 'amountMajor', jj.amountMajor, '(expect 80000 无小数)'); } catch {} }
}
console.log('E2E_PROBE_DONE');
