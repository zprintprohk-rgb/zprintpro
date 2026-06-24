-- ============================================================
-- 银行转账 / 电汇支付方式支持
-- ============================================================
-- 2026-06-25 Airwallex 多币种收款账户开通后,需要让网站
-- /checkout 支持"银行转账"作为支付方式。
--
-- 改动:
--   1. orders.payment_status 枚举扩展加 'awaiting_wire_transfer'
--   2. orders.payment_method 加 check 约束 (规范化可选支付方式)
--   3. orders 新增 wire_transfer_info JSONB 字段 (订单的银行账户快照)
-- ============================================================

-- 1. 扩展 payment_status 枚举 (DBS HK 收款账户激活后银行转账场景)
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_payment_status_check
  CHECK (payment_status IN (
    'pending',
    'awaiting_wire_transfer',  -- 等待电汇 (Bank Transfer 选中后)
    'paid',
    'failed',
    'refunded'
  ));

-- 2. payment_method 规范化 (避免脏数据,后续改起来不痛苦)
-- 'airwallex' = Airwallex 卡支付 (Drop-in)
-- 'bank_transfer' = 银行电汇 (DBS HK Airwallex 收款账户)
-- 'wechat_qr' = 微信扫码 (现有 QR 备用,保留兼容)
-- 'alipay_qr' = 支付宝扫码 (现有 QR 备用,保留兼容)
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE orders ADD CONSTRAINT orders_payment_method_check
  CHECK (payment_method IS NULL OR payment_method IN (
    'airwallex',
    'bank_transfer',
    'wechat_qr',
    'alipay_qr'
  ));

-- 3. 加 wire_transfer_info 字段 (订单的银行账户快照)
-- 字段示例:
-- {
--   "bank_name": "DBS Bank (Hong Kong) Limited",
--   "account_number": "7949835442",
--   "account_holder": "SHEN ZHEN SHI CAI LONG YIN SHUA BAO ZHUANG YOU XIAN GONG SI",
--   "swift_code": "DHBKHKHH",
--   "bank_code": "016",          -- HK 本地 RTGS 用,跨境 SWIFT 不需要
--   "branch_code": "478",        -- HK 本地 RTGS 用,跨境 SWIFT 不需要
--   "recipient_address": "Room XXX, ..., Shenzhen, China 518111",  -- 部分国家电汇必填
--   "reference_template": "ZP-ORDER-{order_number}",
--   "snapshot_at": "2026-06-25T00:00:00.000Z"
-- }
ALTER TABLE orders ADD COLUMN IF NOT EXISTS wire_transfer_info JSONB;

-- 4. 索引 (银行转账订单查询用)
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- 5. 注释
COMMENT ON COLUMN orders.payment_status IS
  '支付状态: pending | awaiting_wire_transfer | paid | failed | refunded';
COMMENT ON COLUMN orders.payment_method IS
  '支付方式: airwallex | bank_transfer | wechat_qr | alipay_qr';
COMMENT ON COLUMN orders.wire_transfer_info IS
  '银行转账信息快照 (订单创建时的账户信息,后续账户变更不影响历史订单)';
