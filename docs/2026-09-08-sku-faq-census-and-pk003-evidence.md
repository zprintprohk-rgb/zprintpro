# Subagent 03 — SKU FAQ 空数组普查 + PK-003 价格取证 (K3 v4.0 A4)

- 生成时间: 2026-09-08T06:52:09 (Asia/Shanghai)
- 数据源: `F:\zprintpro-nextjs\src\data\products.ts` (8496 行, 100 个 sku_code) / `F:\zprintpro-nextjs\src\data\sku-seo-data.ts` (3709 行, 84 个条目) — 只读取证, 未修改任何 src 文件
- 字段说明: products.ts 产品对象用 **faqSchema** 字段 (interface line 78, 无 faqs 字段); sku-seo-data.ts 用 **faqs** 字段 (SkuSeoEntry line 10, 按 slug 关联)。两处分别普查。

## 一、总体统计

| 口径 | 总数 | 空数组 | 字段缺失 | 有内容 | 待填充(空+缺) |
|---|---|---|---|---|---|
| products.ts `faqSchema` (100 SKU) | 100 | 0 | 13 | 87 | 13 |
| sku-seo-data.ts `faqs` (按 slug 关联) | 100 | 21 | 17 (含无 SEO 条目) | 62 | 38 |

- sku-seo-data.ts 实有条目数: 84; 未匹配到任何产品 slug 的 SEO key: ['small-bags']
- 判例参照: food-boxes FAQ 空数组已于 8/31 修复 (70edfffa), 本普查反映当前 HEAD 状态。

## 二、按品类待填充清单 (products.ts faqSchema)

| 品类 | sku_code | faqSchema 状态 | 数组长度 | 行号 |
|---|---|---|---|---|
| place-cards | PC-001 | MISSING | 0 | None |
| place-cards | PC-002 | MISSING | 0 | None |
| place-cards | PC-003 | MISSING | 0 | None |
| place-cards | PC-004 | MISSING | 0 | None |
| place-cards | PC-005 | MISSING | 0 | None |
| place-cards | PC-006 | MISSING | 0 | None |
| string; | None | MISSING | 0 | None |
| wedding-invitations | WI-001 | MISSING | 0 | None |
| wedding-invitations | WI-002 | MISSING | 0 | None |
| wedding-invitations | WI-003 | MISSING | 0 | None |
| wedding-invitations | WI-004 | MISSING | 0 | None |
| wedding-invitations | WI-005 | MISSING | 0 | None |
| wedding-invitations | WI-006 | MISSING | 0 | None |

## 三、逐 SKU 明细 (全部 100 个)

| 品类 | sku_code | products.faqSchema | 长度 | seo.faqs | 长度 |
|---|---|---|---|---|---|
| (category 缺失) | PB-001 | has_content | 4 | has_content | 2 |
| (category 缺失) | PK-005 | has_content | 4 | empty | 0 |
| banners | BN-001 | has_content | 4 | has_content | 1 |
| banners | BN-002 | has_content | 4 | has_content | 1 |
| banners | BN-003 | has_content | 4 | empty | 0 |
| banners | BN-004 | has_content | 4 | has_content | 1 |
| banners | BN-005 | has_content | 4 | empty | 0 |
| books | BK-001 | has_content | 8 | has_content | 1 |
| books | BK-002 | has_content | 4 | has_content | 1 |
| books | BK-003 | has_content | 4 | empty | 0 |
| books | BK-004 | has_content | 4 | empty | 0 |
| books | BK-005 | has_content | 4 | has_content | 1 |
| calendars | CL-001 | has_content | 4 | has_content | 1 |
| calendars | CL-002 | has_content | 4 | has_content | 1 |
| calendars | CL-003 | has_content | 4 | empty | 0 |
| calendars | CL-004 | has_content | 4 | empty | 0 |
| calendars | CL-005 | has_content | 4 | empty | 0 |
| calendars | CL-006 | has_content | 4 | empty | 0 |
| educational | ED-001 | has_content | 4 | has_content | 1 |
| educational | ED-002 | has_content | 4 | has_content | 1 |
| educational | ED-003 | has_content | 4 | has_content | 1 |
| educational | ED-004 | has_content | 4 | has_content | 1 |
| educational | ED-005 | has_content | 4 | has_content | 4 |
| envelopes | EV-001 | has_content | 4 | has_content | 1 |
| envelopes | EV-002 | has_content | 4 | has_content | 1 |
| envelopes | EV-003 | has_content | 4 | empty | 0 |
| envelopes | EV-004 | has_content | 4 | has_content | 1 |
| flyers | FL-001 | has_content | 4 | has_content | 2 |
| flyers | FL-002 | has_content | 4 | has_content | 2 |
| flyers | FL-003 | has_content | 4 | has_content | 1 |
| flyers | FL-004 | has_content | 4 | empty | 0 |
| flyers | FL-005 | has_content | 4 | has_content | 1 |
| flyers | FL-007 | has_content | 4 | empty | 0 |
| flyers | FL-008 | has_content | 4 | has_content | 1 |
| greeting-cards | BC-001 | has_content | 4 | has_content | 3 |
| greeting-cards | BC-002 | has_content | 4 | has_content | 3 |
| greeting-cards | BC-003 | has_content | 4 | has_content | 3 |
| greeting-cards | BC-004 | has_content | 4 | has_content | 3 |
| greeting-cards | BC-005 | has_content | 4 | has_content | 3 |
| greeting-cards | BC-006 | has_content | 4 | has_content | 3 |
| japan-doujin | DJ-001 | has_content | 4 | has_content | 3 |
| japan-doujin | DJ-002 | has_content | 4 | has_content | 3 |
| japan-doujin | DJ-003 | has_content | 4 | has_content | 3 |
| japan-doujin | DJ-004 | has_content | 4 | has_content | 3 |
| japan-doujin | DJ-005 | has_content | 4 | has_content | 3 |
| menus | MN-001 | has_content | 4 | has_content | 1 |
| menus | MN-002 | has_content | 4 | has_content | 1 |
| menus | MN-003 | has_content | 4 | has_content | 1 |
| menus | MN-004 | has_content | 4 | empty | 0 |
| menus | MN-005 | has_content | 4 | empty | 0 |
| packaging | PK-003 | has_content | 4 | has_content | 8 |
| packaging | PK-002 | has_content | 4 | has_content | 4 |
| packaging | PK-004 | has_content | 4 | has_content | 1 |
| packaging | PK-006 | has_content | 4 | empty | 0 |
| packaging | PKG-007 | has_content | 4 | has_content | 3 |
| packaging | PKG-008 | has_content | 4 | has_content | 3 |
| packaging | PKG-009 | has_content | 4 | has_content | 3 |
| packaging | PKG-016 | has_content | 4 | has_content | 3 |
| packaging | PKG-013 | has_content | 4 | no_seo_entry | - |
| packaging | PKG-014 | has_content | 4 | no_seo_entry | - |
| packaging | PKG-015 | has_content | 4 | no_seo_entry | - |
| paper-bags | PB-002 | has_content | 4 | has_content | 2 |
| paper-bags | PB-003 | has_content | 4 | has_content | 1 |
| paper-bags | PB-004 | has_content | 4 | empty | 0 |
| paper-bags | PB-005 | has_content | 4 | has_content | 1 |
| paper-bags | PB-007 | has_content | 4 | has_content | 1 |
| place-cards | PC-001 | missing | 0 | no_seo_entry | - |
| place-cards | PC-002 | missing | 0 | no_seo_entry | - |
| place-cards | PC-003 | missing | 0 | no_seo_entry | - |
| place-cards | PC-004 | missing | 0 | no_seo_entry | - |
| place-cards | PC-005 | missing | 0 | no_seo_entry | - |
| place-cards | PC-006 | missing | 0 | no_seo_entry | - |
| posters | PO-001 | has_content | 4 | has_content | 2 |
| posters | PO-002 | has_content | 4 | has_content | 1 |
| posters | PO-003 | has_content | 4 | has_content | 1 |
| posters | PO-004 | has_content | 4 | empty | 0 |
| posters | PO-005 | has_content | 4 | has_content | 1 |
| posters | PO-006 | has_content | 4 | has_content | 1 |
| red-packets | RP-001 | has_content | 4 | has_content | 1 |
| red-packets | RP-002 | has_content | 4 | has_content | 1 |
| red-packets | RP-003 | has_content | 4 | empty | 0 |
| red-packets | RP-004 | has_content | 4 | empty | 0 |
| red-packets | RP-005 | has_content | 4 | empty | 0 |
| red-packets | RP-006 | has_content | 4 | empty | 0 |
| stickers | ST-001 | has_content | 4 | has_content | 3 |
| stickers | ST-002 | has_content | 4 | has_content | 1 |
| stickers | ST-003 | has_content | 4 | has_content | 1 |
| stickers | ST-004 | has_content | 4 | has_content | 1 |
| stickers | ST-005 | has_content | 4 | has_content | 1 |
| stickers | ST-006 | has_content | 4 | has_content | 1 |
| stickers | ST-007 | has_content | 4 | has_content | 1 |
| stickers | ST-008 | has_content | 4 | has_content | 1 |
| stickers | ST-009 | has_content | 4 | no_seo_entry | - |
| string; | None | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-001 | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-002 | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-003 | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-004 | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-005 | missing | 0 | no_seo_entry | - |
| wedding-invitations | WI-006 | missing | 0 | no_seo_entry | - |

## 四、PK-003 价格口径取证 (原文逐字摘录, 不做结论)

**products.ts (line 3194)** — PK-003 basePrice 字段原文:

```
    basePrice: 2.5,
```
**sku-seo-data.ts (line 1305, key=`food-boxes`)** — zh-hk title 原文 (含「HK$X 起」口径):

```
"title": "食品包裝印刷 禮盒訂製 100個起 HK$4起 | 智印港"
```

> 以上为两处原文摘录, 价格口径矛盾与否由 K3 裁决。
