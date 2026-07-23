/**
 * Quote Desk v2 — Hidden Internal Tool Layout
 * M3 v9 任务卡 2026-07-24: 隐藏路由, noindex, 零内链
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Desk — Internal Tool',
  description: 'Internal pricing tool (ZprintPro sales team only).',
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

export default function QuoteDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
