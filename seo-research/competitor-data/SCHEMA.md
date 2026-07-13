# 竞品数据 JSON Schema v1 (2026-07-13)

所有竞品数据文件按 `seo-research/competitor-data/{locale}/{category}-{competitor-slug}.json` 存放。

## 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `competitor` | string | ✓ | 竞品品牌名 (e.g. "Sticker Mule", "ラクスル") |
| `slug` | string | ✓ | 竞品 URL-friendly slug (e.g. "sticker-mule") |
| `category` | string | ✓ | 对标的 zprintpro 品类 slug (stickers/flyers/...) |
| `categoryName` | object | ✓ | 3 locale 品类名 `{en, ja, zh-hk}` |
| `url` | string | ✓ | 竞品对应品类的 landing page |
| `currency` | enum | ✓ | `USD` 或 `JPY` |
| `basePrice` | number | ✓ | 该品类的入口价位 (per-piece/per-order entry) |
| `basePriceUnit` | string | ✓ | `per-piece` / `per-set` / `per-order` |
| `priceRange` | object | ✓ | `{min, max}` for 该品类典型订单 (e.g. 100-1000 件) |
| `priceRangeText` | string | ✓ | 原始报价文本 (e.g. "$0.85 - $2.50 per sticker") |
| `moq` | number | ✓ | 最小起订量 |
| `leadTime` | object | ✓ | `{minDays, maxDays, productionDays, shippingDays}` |
| `sharpHooks` | string[] | ✓ | 该竞品主打的卖点 (e.g. ["Free Shipping $50+", "Free Die Cut", "100% Satisfaction"]) |
| `materialOptions` | string[] | ✓ | 提供的材质/工艺选项 (e.g. ["Vinyl", "Holographic", "Gloss Lamination"]) |
| `sizes` | string[] | ✓ | 提供的尺寸 (e.g. ["1x1", "2x2", "3x3", "Custom"]) |
| `freeShippingThreshold` | number \| null | ✓ | 免运费门槛 (USD/JPY), null=无 |
| `paymentMethods` | string[] | ✓ | 接受的支付方式 |
| `globalShipping` | boolean | ✓ | 是否全球发货 |
| `capturedAt` | string (ISO 8601) | ✓ | 数据采集时间 |
| `dataSource` | string | ✓ | 数据来源 URL 或备注 |
| `notes` | string |  | 备注, 注意点, 与 zprintpro 的差异 |

## 例子

```json
{
  "competitor": "Sticker Mule",
  "slug": "sticker-mule",
  "category": "stickers",
  "categoryName": {
    "en": "Custom Stickers",
    "ja": "カスタムステッカー",
    "zh-hk": "貼紙印刷"
  },
  "url": "https://www.stickermule.com/stickers",
  "currency": "USD",
  "basePrice": 0.32,
  "basePriceUnit": "per-piece",
  "priceRange": { "min": 0.32, "max": 2.50 },
  "priceRangeText": "$0.32 - $2.50 per sticker (3x3 size, vinyl)",
  "moq": 10,
  "leadTime": { "minDays": 4, "maxDays": 9, "productionDays": 2, "shippingDays": 2 },
  "sharpHooks": [
    "Free Shipping (US orders)",
    "Free Die Cut",
    "100% Satisfaction Guarantee",
    "Fast Turnaround (4-9 days)"
  ],
  "materialOptions": ["Vinyl", "Holographic", "Glitter", "Clear", "Gloss Lamination", "Matte Lamination"],
  "sizes": ["1x1", "2x2", "3x3", "4x4", "5x5", "6x6", "Custom"],
  "freeShippingThreshold": null,
  "paymentMethods": ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"],
  "globalShipping": true,
  "capturedAt": "2026-07-13T15:00:00+08:00",
  "dataSource": "https://www.stickermule.com/stickers (pricing page, captured 2026-07-13)",
  "notes": "Industry leader for custom stickers, premium positioning. 25-30% higher than mid-tier competitors like CustomStickers.com. Free die cut on all orders."
}
```

## 与 zprintpro 的对标原则

1. **同品类对标**: 每个竞品只对标一个 zprintpro 品类 (避免跨品类混淆)
2. **同价位段**: 优先选与 zprintpro basePriceHKD 价位段 ±25% 的竞品
3. **同 target market**: en-US 竞品对标 en locale, ja-JP 竞品对标 ja locale
4. **不抄底**: 不选明显低质低价 (e.g. $0.01/sticker 质量可疑), 也不选奢侈品级 (e.g. 印刷设计服务), 选主流商用
5. **优先 head 3**: 每市场选品类头部 1-2 名 (Sticker Mule > CustomStickers.com), 头部代表了行业 standard

## 数据用途

Step 4 写回 products.ts 时, 用 `basePrice` 作为 zprintpro `basePrice_en/ja` 的参考价.
- 计算公式: `zprintpro_basePrice_local = competitor.basePrice × (1 - 0.10 ~ 0.20)` 留 10-20% 价格优势
- MOQ + sharp hooks 用于 en/ja marketing copy 优化
- materialOptions + sizes 用于产品页 spec 区块内容补全
