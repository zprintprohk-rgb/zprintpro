/**
 * Quote Desk /all — 老板全表总览页 (Hidden Internal Tool)
 * M3 v10 任务卡 2026-07-24: 全表 10 张价格表一次性浏览, 含 cost_rmb + ×1.5/×2.2 毛利透视
 *
 * 安全红线 (跟 /quote-desk 主报价台同):
 * - 隐藏路由 (无内链, sitemap 不含, middleware 跳过 locale prefix redirect)
 * - SHA-256 密钥门 (复用 QUOTE_DESK_KEY)
 * - 页面 noindex (本页豁免显示 cost_rmb, 仅限老板内部用, "勿外发" 红字警示)
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Desk /all — Boss View (Internal)',
  description: 'Boss internal cost view of all 10 price tables (ZprintPro owner only).',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function QuoteDeskAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
