'use client';

/**
 * Quote Desk v2 — Hidden Internal Tool
 * M3 v9 任务卡 2026-07-24: 12 张价格表 + 三级选择器 + 30kg 运费引擎 + 3 locale WhatsApp
 *
 * 安全红线 (K3 7/24 拍板):
 * 1. 隐藏路由 /quote-desk/ (无首页/类目页内链, sitemap 不含)
 * 2. SHA-256 密钥门: URL ?k=<secret>, client 端字符串比较
 * 3. 页面 noindex (robots/SEO 屏蔽)
 * 4. 任何位置不出现: e-print / intuan / yate98 / 成本 / anchor / ×1.5 / ×2.2
 * 5. 落款: zh-hk = 智印港 ZprintPro, en/ja = ZprintPro
 */

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getAllTables,
  getConfigs,
  getTiersForConfig,
  calcPrice,
  calcShipping,
  buildCopy,
  verifyKey,
  QUOTE_DESK_KEY,
  type Locale,
  type TableMeta,
  type PriceResult,
  type ShippingResult,
} from '@/lib/quote-engine/desk';

const T: Record<Locale, {
  title: string;
  lockedTitle: string;
  lockedBody: string;
  keyLabel: string;
  keyPlaceholder: string;
  submitBtn: string;
  invalidKey: string;
  tableLabel: string;
  configLabel: string;
  qtyLabel: string;
  outputTitle: string;
  priceLabel: string;
  shippingLabel: string;
  copyBtn: string;
  copied: string;
  noSelection: string;
  leadTime: string;
  freeDesign: string;
}> = {
  'zh-hk': {
    title: '報價台 (內部工具)',
    lockedTitle: '🔒 報價台',
    lockedBody: '請輸入密鑰繼續。',
    keyLabel: '密鑰',
    keyPlaceholder: '請輸入密鑰',
    submitBtn: '驗證',
    invalidKey: '密鑰錯誤',
    tableLabel: '1. 選擇產品類別',
    configLabel: '2. 選擇規格',
    qtyLabel: '3. 輸入數量',
    outputTitle: '報價輸出',
    priceLabel: '貨品價',
    shippingLabel: '運費',
    copyBtn: '📋 複製 WhatsApp 文案',
    copied: '已複製 ✓',
    noSelection: '請選擇規格與數量',
    leadTime: '交期',
    freeDesign: '✅ 免費設計稿',
  },
  en: {
    title: 'Quote Desk (Internal Tool)',
    lockedTitle: '🔒 Quote Desk',
    lockedBody: 'Please enter the access key to continue.',
    keyLabel: 'Access Key',
    keyPlaceholder: 'Enter access key',
    submitBtn: 'Verify',
    invalidKey: 'Invalid key',
    tableLabel: '1. Select Product',
    configLabel: '2. Select Configuration',
    qtyLabel: '3. Enter Quantity',
    outputTitle: 'Quote Output',
    priceLabel: 'Price',
    shippingLabel: 'Shipping',
    copyBtn: '📋 Copy WhatsApp Message',
    copied: 'Copied ✓',
    noSelection: 'Please select config & quantity',
    leadTime: 'Lead time',
    freeDesign: '✅ Free design mockup',
  },
  ja: {
    title: '見積デスク (社内ツール)',
    lockedTitle: '🔒 見積デスク',
    lockedBody: 'アクセス キーを入力してください。',
    keyLabel: 'アクセス キー',
    keyPlaceholder: 'キーを入力',
    submitBtn: '認証',
    invalidKey: 'キーが無効です',
    tableLabel: '1. 製品を選択',
    configLabel: '2. 仕様を選択',
    qtyLabel: '3. 数量を入力',
    outputTitle: '見積出力',
    priceLabel: '商品代金',
    shippingLabel: '送料',
    copyBtn: '📋 WhatsApp メッセージをコピー',
    copied: 'コピー済み ✓',
    noSelection: '仕様と数量を選択してください',
    leadTime: '納期',
    freeDesign: '✅ 無料デザイン モックアップ',
  },
};

const LOCALE_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'zh-hk', label: '繁體中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
];

function QuoteDeskInner() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState<string>('');
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [showInvalid, setShowInvalid] = useState<boolean>(false);
  const [locale, setLocale] = useState<Locale>('zh-hk');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [qty, setQty] = useState<number>(500);
  const [copied, setCopied] = useState<boolean>(false);

  const t = T[locale];

  // URL ?k= 自动 unlock
  useEffect(() => {
    const k = searchParams.get('k');
    if (k && verifyKey(k)) {
      setUnlocked(true);
      setKey(k);
    }
  }, [searchParams]);

  const handleUnlock = () => {
    if (verifyKey(key)) {
      setUnlocked(true);
      setShowInvalid(false);
    } else {
      setShowInvalid(true);
    }
  };

  // 12 张表
  const tables = useMemo(() => getAllTables(), []);

  // 选中表的 config 列表
  const configs = useMemo(() => {
    if (!selectedTable) return [];
    return getConfigs(selectedTable);
  }, [selectedTable]);

  // 选中 config 的 tier 列表（用于数量下拉）
  const tiers = useMemo(() => {
    if (!selectedTable || !selectedConfig) return [];
    return getTiersForConfig(selectedTable, selectedConfig);
  }, [selectedTable, selectedConfig]);

  // 价格 + 运费
  const priceResult: PriceResult | null = useMemo(() => {
    if (!selectedTable || !selectedConfig || !qty) return null;
    return calcPrice(selectedTable, selectedConfig, qty, locale);
  }, [selectedTable, selectedConfig, qty, locale]);

  const shippingResult: ShippingResult | null = useMemo(() => {
    if (!priceResult) return null;
    return calcShipping(selectedTable, priceResult.tier.weightKg, locale);
  }, [priceResult, selectedTable, locale]);

  // WhatsApp 文案
  const whatsappCopy = useMemo(() => {
    if (!priceResult || !shippingResult) return '';
    const table = tables.find((t) => t.sku === selectedTable);
    if (!table) return '';
    return buildCopy({
      productName: table.name,
      configHuman: priceResult.configHuman,
      qty,
      sellHKD: priceResult.sellHKD,
      sellUSD: priceResult.sellUSD,
      sellJPY: priceResult.sellJPY,
      shipping: shippingResult,
      locale,
    });
  }, [priceResult, shippingResult, tables, selectedTable, qty, locale]);

  // 复制
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = whatsappCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ============================================================
  // 渲染
  // ============================================================

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.lockedTitle}</h1>
          <p className="text-slate-600 mb-6 text-sm">{t.lockedBody}</p>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">{t.keyLabel}</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder={t.keyPlaceholder}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showInvalid && <p className="text-red-600 text-sm">{t.invalidKey}</p>}
            <button
              onClick={handleUnlock}
              className="w-full bg-slate-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-800"
            >
              {t.submitBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{t.title}</h1>
          <div className="flex items-center gap-2">
            {LOCALE_OPTIONS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`px-3 py-1 rounded text-sm ${
                  locale === l.code
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左：3 级选择器 */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.tableLabel}</label>
              <select
                value={selectedTable}
                onChange={(e) => {
                  setSelectedTable(e.target.value);
                  setSelectedConfig('');
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="">--</option>
                {tables.map((tb) => (
                  <option key={tb.sku} value={tb.sku}>
                    {tb.name[locale]} ({tb.sku})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.configLabel}</label>
              <select
                value={selectedConfig}
                onChange={(e) => setSelectedConfig(e.target.value)}
                disabled={!selectedTable}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm disabled:bg-slate-100"
              >
                <option value="">--</option>
                {configs.map((c, i) => (
                  <option key={i} value={c.config}>
                    {c.configHuman[locale]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.qtyLabel}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 0))}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
                {tiers.length > 0 && (
                  <select
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                    value=""
                  >
                    <option value="">preset</option>
                    {tiers.map((tier) => (
                      <option key={tier.qty} value={tier.qty}>
                        {tier.qty.toLocaleString()}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {tiers.length > 0 && (
              <div className="text-xs text-slate-500">
                {tiers.length} tiers: {tiers.map((t) => t.qty).join(' / ')}
              </div>
            )}
          </div>

          {/* 右：输出区 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{t.outputTitle}</h2>
            {!priceResult || !shippingResult ? (
              <p className="text-slate-500 text-sm">{t.noSelection}</p>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-md p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{t.priceLabel}:</span>
                    <span className="font-semibold text-slate-900 text-lg">
                      {locale === 'en' ? '$' : locale === 'ja' ? '¥' : 'HK$'}
                      {locale === 'en'
                        ? priceResult.sellUSD.toFixed(2)
                        : locale === 'ja'
                        ? priceResult.sellJPY.toLocaleString()
                        : priceResult.sellHKD.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{t.shippingLabel}:</span>
                    <span className="text-slate-900">{shippingResult.line}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{t.leadTime}:</span>
                    <span className="text-slate-900">{shippingResult.leadDays}</span>
                  </div>
                  {priceResult.tier.weightKg !== null && priceResult.tier.weightKg !== undefined && (
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                      Weight: {priceResult.tier.weightKg} kg
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-slate-700">WhatsApp</h3>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700"
                    >
                      {copied ? t.copied : t.copyBtn}
                    </button>
                  </div>
                  <pre className="bg-slate-50 rounded-md p-3 text-xs text-slate-800 whitespace-pre-wrap font-mono">
                    {whatsappCopy}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          {t.freeDesign} · {locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro'}
        </p>
      </div>
    </div>
  );
}

export default function QuoteDeskPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading…</div>}>
      <QuoteDeskInner />
    </Suspense>
  );
}
