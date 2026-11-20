'use client';

/**
 * Quote Desk /all — 老板全表总览页
 * M3 v10 任务卡 2026-07-24
 *
 * 功能: 一次浏览全部 10 张价格表, 每档列 (config | qty | cost_rmb | sell_hkd | en USD | ja JPY | weight | shipping)
 * 模式: zh-hk 为主 + USD/JPY 列; 内部豁免显示 cost_rmb (对客 UI 不显示)
 * 安全: 跟主报价台同 SHA-256 密钥门 (QUOTE_DESK_KEY); 独立验 key, 不共享主报价台 state
 */

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getAllTables,
  getConfigs,
  getTiersForConfig,
  calcPrice,
  calcShipping,
  verifyKey,
  QUOTE_DESK_KEY,
  type Locale,
  type TableMeta,
  type PriceResult,
  type ShippingResult,
} from '@/lib/quote-engine/desk';

const T = {
  'zh-hk': {
    title: '報價台 / 全表總覽 (老闆視圖)',
    lockedTitle: '🔒 報價台 / 全表總覽',
    lockedBody: '請輸入密鑰繼續。',
    keyLabel: '密鑰',
    keyPlaceholder: '請輸入密鑰',
    submitBtn: '驗證',
    invalidKey: '密鑰錯誤',
    tableCount: (n: number) => `共 ${n} 張表`,
    configCol: '規格',
    qtyCol: '數量',
    costRMBCol: '成本 (¥ RMB)',
    sellHKDCol: '賣價 (HK$ ×1.5)',
    enUSDCol: 'EN 價 (US$ ×2.2)',
    jaJPYCol: 'JA 價 (¥ ×2.2)',
    weightCol: '重量 (kg)',
    shippingCol: '運費 (HK$)',
    tableSummary: (table: TableMeta) =>
      `${table.name['zh-hk']} (${table.sku}) — ${table.priceMode}${table.hasWeight ? ' / 有重量' : ' / 無重量'}`,
  },
};

function QuoteDeskAllInner() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState<string>('');
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [showInvalid, setShowInvalid] = useState<boolean>(false);
  const t = T['zh-hk'];

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

  // 锁定态
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

  return <QuoteDeskAllUnlocked />;
}

function QuoteDeskAllUnlocked() {
  const tables = useMemo(() => getAllTables(), []);
  const t = T['zh-hk'];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 头部: 内部成本视图警示 */}
        <div className="bg-red-600 text-white rounded-md p-3 mb-4 text-center font-bold text-sm">
          ⚠️ 內部成本視圖·勿外發 (含工廠成本 RMB, 僅限老闆查閱)
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">報價台 / 全表總覽</h1>
          <div className="text-sm text-slate-600">{t.tableCount(tables.length)}</div>
        </div>

        {/* 10 张表, 每张一个 <details> 折叠 */}
        <div className="space-y-3">
          {tables.map((table) => (
            <AllTableSection key={table.sku} table={table} t={t} />
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          智印港 ZprintPro · Boss Internal View
        </p>
      </div>
    </div>
  );
}

function AllTableSection({
  table,
  t,
}: {
  table: TableMeta;
  t: typeof T['zh-hk'];
}) {
  const configs = useMemo(() => getConfigs(table.sku), [table.sku]);
  const tierCount = useMemo(() => {
    return configs.reduce((sum, c) => sum + getTiersForConfig(table.sku, c.config).length, 0);
  }, [table.sku, configs]);

  return (
    <details className="bg-white rounded-lg shadow-sm overflow-hidden" open={false}>
      <summary className="cursor-pointer px-5 py-4 hover:bg-slate-50 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">{t.tableSummary(table)}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {table.configCount} configs · {tierCount} tiers
          </p>
        </div>
        <span className="text-slate-400 text-sm">點擊展開</span>
      </summary>

      <div className="border-t border-slate-200 overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">{t.configCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.qtyCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.costRMBCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.sellHKDCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.enUSDCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.jaJPYCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.weightCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.shippingCol}</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((c) => (
              <ConfigRows key={c.config} table={table} config={c.config} t={t} />
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function ConfigRows({
  table,
  config,
  t,
}: {
  table: TableMeta;
  config: string;
  t: typeof T['zh-hk'];
}) {
  const tiers = useMemo(() => getTiersForConfig(table.sku, config), [table.sku, config]);

  return (
    <>
      {tiers.map((tier, i) => {
        // 复用 calcPrice (zh-hk locale 取 configHuman zh-hk)
        const price = calcPrice(table.sku, config, tier.qty, 'zh-hk');
        if (!price) return null;
        const shipping = calcShipping(table.sku, tier.weightKg, 'zh-hk');
        return (
          <tr key={`${config}-${i}`} className="border-t border-slate-100 hover:bg-slate-50">
            <td className="px-3 py-2 text-slate-700 font-mono text-[10px] max-w-md truncate" title={config}>
              {price.configHuman['zh-hk']}
            </td>
            <td className="px-3 py-2 text-right text-slate-900 font-semibold">
              {tier.qty.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right text-slate-600 font-mono">
              {price.costRMB !== null ? `¥${price.costRMB.toFixed(1)}` : '—'}
            </td>
            <td className="px-3 py-2 text-right text-slate-900 font-semibold font-mono">
              HK${price.sellHKD.toFixed(2)}
            </td>
            <td className="px-3 py-2 text-right text-slate-700 font-mono">
              ${price.sellUSD.toFixed(2)}
            </td>
            <td className="px-3 py-2 text-right text-slate-700 font-mono">
              ¥{price.sellJPY.toLocaleString()}
            </td>
            <td className="px-3 py-2 text-right text-slate-500 font-mono">
              {tier.weightKg !== null ? tier.weightKg.toFixed(2) : '—'}
            </td>
            <td className="px-3 py-2 text-right text-slate-700 font-mono">
              {tier.weightKg === null || tier.weightKg === undefined ? (
                <span className="text-slate-400">順豐到付</span>
              ) : tier.weightKg <= 30 ? (
                <span className="text-slate-400">順豐到付</span>
              ) : (
                `HK$${shipping.costHKD.toFixed(0)}`
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default function QuoteDeskAllPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading…</div>}>
      <QuoteDeskAllInner />
    </Suspense>
  );
}
