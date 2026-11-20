// Patch OrderConfirmationClient: unify wire/amount source (RLS-proof) + JPY unit fix
import fs from 'node:fs';

const p = 'src/app/[locale]/order-confirmation/OrderConfirmationClient.tsx';
const original = fs.readFileSync(p, 'utf8');
const backup = `.hermes/_bak-orderconfirmation-${Date.now()}.tsx`;
fs.copyFileSync(p, backup);

let src = original;
const expect = (cond, msg) => { if (!cond) { console.error('ASSERT FAIL:', msg); process.exit(1); } };

// 1) total/currency + unified effective vars
const anchor1 = [
  "  const total = dbOrder?.amount ? dbOrder.amount / 100 : localOrder?.total || 0;",
  "  const currency = dbOrder?.currency || 'HKD';",
  "",
  "  const isZh = locale === 'zh-hk';",
].join('\r\n');

const repl1 = [
  "  /* 2026-11-01: 金额按币种换算 — JPY/CNY 无小数位 (checkout toSmallestUnit 不 ×100), 其余为分 */",
  "  const total = dbOrder?.amount",
  "    ? ((dbOrder as any).currency === 'JPY' || (dbOrder as any).currency === 'CNY'",
  "        ? dbOrder.amount",
  "        : dbOrder.amount / 100)",
  "    : localOrder?.total || 0;",
  "  const currency = (dbOrder as any)?.currency || (localOrder as any)?.currency || 'HKD';",
  "",
  "  const isZh = locale === 'zh-hk';",
  "",
  "  /* 2026-11-01: 统一数据源 — orders 表 RLS 仅 admin 可读 (migration 001),",
  "     确认页的 Supabase 查询在浏览器端必然为空 → 实际展示走 localStorage 快照。",
  "     故 wire 信息 / 单号 / 支付方式必须两条路同时取, 否则客户看不到收款账户",
  "     = GMC「用户无法完成购买交易」根因之一。 */",
  "  const effectiveWire =",
  "    (dbOrder as any)?.wire_transfer_info || (localOrder as any)?.wireTransferInfo || null;",
  "  const effectivePayMethod =",
  "    (dbOrder as any)?.payment_method || (localOrder as any)?.paymentMethod || 'bank_transfer';",
  "  const effectiveOrderNumber =",
  "    (dbOrder as any)?.order_number ||",
  "    (localOrder as any)?.orderNumber ||",
  "    (dbOrder as any)?.id ||",
  "    (localOrder as any)?.id ||",
  "    orderId;",
  "  const effectiveCurrency = currency;",
  "  const effectiveAmount = total;",
].join('\r\n');

const c1 = src.split(anchor1).length - 1;
expect(c1 === 1, `anchor1 count=${c1} (expect 1)`);
src = src.replace(anchor1, repl1);

// 2) first branch condition + props
const anchor2 = [
  "                dbOrder?.payment_method === 'bank_transfer' && dbOrder.wire_transfer_info ? (",
  "                  /* 2026-06-25: 银行电汇 — 显示 DBS 账户信息 + 国内客户 QR 备用 */",
  "                  <>",
  '                    <h2 className="font-bold text-[#333333] mb-3">{t.bankInfoTitle}</h2>',
  "                    <BankTransferInfo",
  "                      wireTransferInfo={dbOrder.wire_transfer_info}",
  "                      orderNumber={dbOrder.order_number || dbOrder.id}",
  "                      amount={(dbOrder.amount || 0) / 100}",
  "                      currency={dbOrder.currency || 'HKD'}",
].join('\r\n');

const repl2 = [
  "                effectivePayMethod === 'bank_transfer' && effectiveWire ? (",
  "                  /* 2026-06-25: 银行电汇 — 显示 DBS 账户信息 + 国内客户 QR 备用 */",
  "                  <>",
  '                    <h2 className="font-bold text-[#333333] mb-3">{t.bankInfoTitle}</h2>',
  "                    <BankTransferInfo",
  "                      wireTransferInfo={effectiveWire}",
  "                      orderNumber={effectiveOrderNumber}",
  "                      amount={effectiveAmount}",
  "                      currency={effectiveCurrency}",
].join('\r\n');

const c2 = src.split(anchor2).length - 1;
expect(c2 === 1, `anchor2 count=${c2} (expect 1)`);
src = src.replace(anchor2, repl2);

// 3) second (fallback) branch condition + props
const anchor3 = [
  "                    {dbOrder?.wire_transfer_info ? (",
  "                      <BankTransferInfo",
  "                        wireTransferInfo={dbOrder.wire_transfer_info}",
  "                        orderNumber={dbOrder.order_number || dbOrder.id}",
  "                        amount={(dbOrder.amount || 0) / 100}",
  "                        currency={dbOrder.currency || 'HKD'}",
].join('\r\n');

const repl3 = [
  "                    {effectiveWire ? (",
  "                      <BankTransferInfo",
  "                        wireTransferInfo={effectiveWire}",
  "                        orderNumber={effectiveOrderNumber}",
  "                        amount={effectiveAmount}",
  "                        currency={effectiveCurrency}",
].join('\r\n');

const c3 = src.split(anchor3).length - 1;
expect(c3 === 1, `anchor3 count=${c3} (expect 1)`);
src = src.replace(anchor3, repl3);

// shape assertions before write
expect(src.includes('effectivePayMethod === \'bank_transfer\' && effectiveWire'), 'shape: branch1 not applied');
expect(src.includes('{effectiveWire ? ('), 'shape: branch2 not applied');
expect((src.match(/dbOrder\.wire_transfer_info/g) || []).length === 0, 'shape: dbOrder.wire_transfer_info still present');
expect((src.match(/effectiveWire/g) || []).length === 5, 'shape: effectiveWire refs count != 5');
expect(src.length > original.length, 'shape: file did not grow');

fs.writeFileSync(p, src, 'utf-8');
const b = fs.readFileSync(p);
console.log('OK wrote', p);
console.log('size', original.length, '->', b.length, '| BOM', b[0] === 0xEF, '| CRLF-only', !/(?<!\r)\n/.test(src));
console.log('backup', backup);
