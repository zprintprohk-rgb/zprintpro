import React from 'react';

/**
 * 2026-11-02 (v3 终局修复): 本组件**必须是服务端组件，不得标 'use client'**。
 *
 * 原因（GSC「字段 brand 重复」76 项的真正根因）：
 *   标了 'use client' 后，页面传入的 `data` prop（整个 JSON-LD schema 对象）会被序列化进
 *   RSC flight 载荷（<script>self.__next_f.push(...)</script>），HTML 里于是出现两份完整 schema：
 *     ① <script type="application/ld+json"> 本体
 *     ② flight 载荷里的组件 props 拷贝
 *   Google 解析器两份都吃 → 同一 Product 的 brand/seller/offers 等字段各出现两次 →
 *   「Duplicate field: brand」→ 商家信息判定无效（GSC 76 项；RRT 现场复现，2026-11-02 取证）。
 *   与 brand 取什么值无关（两份值相同也报重复）。
 *
 * 证据链：RRT 解析树字段出现两遍 + HTML 取证 ProcureAction×2 / #product×6 / flight 偏移 133192 处
 *        完整第二份；本组件无任何 hook/交互，23 个引用方全部为服务端页面，去 'use client' 零行为变化。
 */

interface JsonLdProps {
  data: unknown;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
