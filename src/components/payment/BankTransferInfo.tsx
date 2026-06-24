'use client';

import { useState } from 'react';
import { Copy, Check, Building2, Hash, User, Globe, AlertCircle, MapPin } from 'lucide-react';

export interface WireTransferInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  swift_code: string;
  /** 2026-06-25: HK 本地 RTGS 用 (跨境 SWIFT 不需要) */
  bank_code?: string;
  /** 2026-06-25: HK 本地 RTGS 用 (跨境 SWIFT 不需要) */
  branch_code?: string;
  /** 2026-06-25: 部分国家跨境电汇必填的收款人地址 */
  recipient_address?: string;
  reference_template: string;
  snapshot_at: string;
}

interface BankTransferInfoProps {
  /**
   * 2026-06-25: 银行账户信息 (来自 create-payment-session bank_transfer 分支)
   */
  wireTransferInfo: WireTransferInfo;
  /**
   * 订单号 (用于电汇参考号模板 ZP-ORDER-{order_number})
   */
  orderNumber: string;
  /**
   * 订单金额 (显示给客户,让客户核对汇款金额)
   */
  amount: number;
  /**
   * 币种
   */
  currency: string;
  /**
   * 翻译函数或 key-value map (三语)
   * 用 prop 而不是 import,避免组件依赖具体翻译文件
   */
  t: {
    title: string;
    subtitle: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    swiftCode: string;
    /** 2026-06-25: 收款人地址 (部分国家跨境电汇必填) */
    recipientAddress: string;
    reference: string;
    referenceHint: string;
    amountLabel: string;
    copy: string;
    copied: string;
    notice: string;
  };
}

/**
 * 2026-06-25: 银行转账 / 电汇收款信息展示组件
 *
 * 场景: 客户在 checkout 选 Bank Transfer, 后端创建订单 (payment_status=awaiting_wire_transfer)
 * 后跳到 order-confirmation, 显示本组件让客户知道往哪个账户打款。
 *
 * 安全要点:
 * - 组件只渲染订单对应的账户信息 (wire_transfer_info)
 * - 不暴露其他客户的账户信息
 * - 复制按钮只复制敏感字段, 不复制整块内容
 */
export function BankTransferInfo({
  wireTransferInfo,
  orderNumber,
  amount,
  currency,
  t,
}: BankTransferInfoProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 计算参考号 (订单参考模板: ZP-ORDER-{order_number})
  const reference = wireTransferInfo.reference_template.replace('{order_number}', orderNumber);

  // 复制函数
  const handleCopy = (value: string, field: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg border border-[#2873F5]/30 bg-[#2873F5]/5 p-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-[#2873F5] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-[#333333]">{t.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
        {/* Bank Name */}
        <Field
          icon={<Building2 className="w-4 h-4 text-gray-400" />}
          label={t.bankName}
          value={wireTransferInfo.bank_name}
          copyable
          onCopy={() => handleCopy(wireTransferInfo.bank_name, 'bankName')}
          copied={copiedField === 'bankName'}
          t={t}
        />

        {/* Account Number */}
        <Field
          icon={<Hash className="w-4 h-4 text-gray-400" />}
          label={t.accountNumber}
          value={wireTransferInfo.account_number}
          copyable
          onCopy={() => handleCopy(wireTransferInfo.account_number, 'accountNumber')}
          copied={copiedField === 'accountNumber'}
          t={t}
          monospace
        />

        {/* Account Holder */}
        <Field
          icon={<User className="w-4 h-4 text-gray-400" />}
          label={t.accountHolder}
          value={wireTransferInfo.account_holder}
          copyable
          onCopy={() => handleCopy(wireTransferInfo.account_holder, 'accountHolder')}
          copied={copiedField === 'accountHolder'}
          t={t}
          monospace
        />

        {/* SWIFT Code */}
        <Field
          icon={<Globe className="w-4 h-4 text-gray-400" />}
          label={t.swiftCode}
          value={wireTransferInfo.swift_code}
          copyable
          onCopy={() => handleCopy(wireTransferInfo.swift_code, 'swiftCode')}
          copied={copiedField === 'swiftCode'}
          t={t}
          monospace
        />

        {/* 2026-06-25: Recipient Address (部分国家跨境电汇必填, 如美国/澳大利亚) */}
        {wireTransferInfo.recipient_address && (
          <Field
            icon={<MapPin className="w-4 h-4 text-gray-400" />}
            label={t.recipientAddress}
            value={wireTransferInfo.recipient_address}
            copyable
            onCopy={() => handleCopy(wireTransferInfo.recipient_address!, 'recipientAddress')}
            copied={copiedField === 'recipientAddress'}
            t={t}
          />
        )}

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Reference */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <AlertCircle className="w-3 h-3" />
            <span>{t.reference}</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-amber-50 border border-amber-200 rounded font-mono font-bold text-amber-900 text-sm">
              {reference}
            </code>
            <button
              type="button"
              onClick={() => handleCopy(reference, 'reference')}
              className="px-3 py-2 text-sm text-[#2873F5] hover:bg-[#2873F5]/10 rounded transition-colors"
              aria-label={t.copy}
            >
              {copiedField === 'reference' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-amber-700 mt-1.5">{t.referenceHint}</p>
        </div>

        {/* Amount */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-500">{t.amountLabel}</span>
            <span className="text-xl font-bold text-[#F87314]">
              {currency} {amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">{t.notice}</p>
      </div>
    </div>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyable: boolean;
  onCopy: () => void;
  copied: boolean;
  t: { copy: string; copied: string };
  monospace?: boolean;
}

function Field({ icon, label, value, copyable, onCopy, copied, t, monospace = false }: FieldProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`flex-1 text-sm text-[#333333] ${monospace ? 'font-mono font-medium tracking-wide' : ''}`}>
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={onCopy}
            className="px-2 py-1 text-xs text-[#2873F5] hover:bg-[#2873F5]/10 rounded transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                {t.copy}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
