// K3 v3.17 F1-batch-4 立即执行 (K3 8/24 19:03 拍板):
// 关于页 Markdown 链接语法 [text](url) 未被解析, 直接以纯文本渲染
// (例如 (/category/labels/)、[聯絡我們](/contact/) 等)
// 修复: 写一个轻量解析函数, 用正则解析 [text](url) → <Link> 或 <a>
// 业务 0 改动红线: 不动数据层, 1 改 1 验证, 不爆炸半径
//
// SOP-10 第 5 款新增: 任何 user-facing 文本含 [text](url) Markdown 语法,
// 必须用 parseInlineLinks 工具解析, 禁止 <p>{text}</p> 直接渲染纯文本
// 8/25 P1 数据层重构为结构化数组 { label, href }[] (K3 报告方案 B)

import Link from 'next/link';
import React from 'react';

/**
 * 解析 Markdown 内联链接语法 [text](url) 转为 React 节点
 * - 内部链接 /xxx → Next.js <Link> 组件
 * - 外部链接 https://xxx → <a target="_blank">
 * - 普通文本 → 纯文本节点
 * - 空字符串/null/undefined → 返回空 <></>
 */
export function parseInlineLinks(text: string | null | undefined): React.ReactNode {
  if (!text) return null;

  // Markdown 内联链接正则: [label](url)
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      if (plain) parts.push(plain);
    }

    const [, label, href] = match;
    if (!label || !href) continue;

    if (href.startsWith('http://') || href.startsWith('https://')) {
      parts.push(
        <a
          key={`a-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {label}
        </a>
      );
    } else if (href.startsWith('#')) {
      // 锚点链接 (#factory)
      parts.push(
        <a
          key={`a-${match.index}`}
          href={href}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {label}
        </a>
      );
    } else {
      // 内部链接 (/category/xxx, /blog/xxx, /contact/)
      parts.push(
        <Link
          key={`l-${match.index}`}
          href={href}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {label}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining) parts.push(remaining);
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
