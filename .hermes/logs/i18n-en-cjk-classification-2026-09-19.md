# en 值內中文殘留 — 分類清單 (K3 一次審批用)

> 口徑: 門童 #4 規則 `I18N_POLLUTION_EN`(en 值含 CJK) **全量掃描、未經基線豁免**
> 資料來源: `.hermes/logs/i18n-en-cjk-inventory-2026-09-19.csv`(逐筆 1138 行) + `i18n-en-cjk-inventory-2026-09-19.md`(80 行)
> 生成時間: 2026-09-19 · 生成者: 執行層 (交付層獨立分類)

## 一、分類匯總

| 檔位 | 筆數 | 處置建議 |
|---|---|---|
| A 白名單(專有名詞 4 行) | 28 | **(A) 白名單**(K3 已批准; 唐运提 保留简体 per K3 裁決) |
| B JSON-LD 殘留 | 31 | **清理** —— 結構化資料串入繁中, en 頁 schema 會漏中文 |
| C FAQ 殘留(會渲染中文 FAQ) | 7 | **清理(最高優先)** —— en 頁面會渲染中文 FAQ (真缺陷) |
| D category 欄位殘留 | 32 | **清理** —— en blog 分類顯示中文 |
| E title/description 欄位殘留 | 52 | **清理** —— 直接影響 SERP 摘要語言 |
| F content 正文內嵌繁中 | 300 | **清理** —— 正文段落/表格內繁中 |
| G 其他/待判 | 148 | 待逐條判(多為段落陣列/變數賦值) |
| **合計** | **598** | |

## A 白名單(專有名詞 4 行) — 28 筆

檔案分布: `src/app/[locale]/payment-methods/page.tsx`(16) · `src/components/layout/Footer.tsx`(12)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 2 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 3 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 4 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 5 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 6 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 7 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 8 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 9 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 10 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 11 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 12 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 13 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn: '深圳市彩龍印刷包裝有限公司', |
| 14 | `src/app/[locale]/payment-methods/page.tsx:758` | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |
| 15 | `src/app/[locale]/payment-methods/page.tsx:758` | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |
| 16 | `src/app/[locale]/payment-methods/page.tsx:758` | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |
| 17 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 18 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 19 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 20 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 21 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 22 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 23 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 24 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 25 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 26 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 27 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |
| 28 | `src/components/layout/Footer.tsx:146` | supportJA: '中国本土 24時間対応 · 香港現地サポート', |

## B JSON-LD 殘留 — 31 筆

檔案分布: `src/data/blog-data/en.json`(31)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 2 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 3 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 4 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 5 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 6 | `src/data/blog-data/en.json:468` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 7 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 8 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 9 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 10 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 11 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 12 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 13 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 14 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 15 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 16 | `src/data/blog-data/en.json:644` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 17 | `src/data/blog-data/en.json:677` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 18 | `src/data/blog-data/en.json:677` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 19 | `src/data/blog-data/en.json:677` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 20 | `src/data/blog-data/en.json:677` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 21 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 22 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 23 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 24 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 25 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 26 | `src/data/blog-data/en.json:691` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 27 | `src/data/blog-data/en.json:712` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 28 | `src/data/blog-data/en.json:712` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 29 | `src/data/blog-data/en.json:712` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 30 | `src/data/blog-data/en.json:712` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |
| 31 | `src/data/blog-data/en.json:712` | "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\", |

## C FAQ 殘留(會渲染中文 FAQ) — 7 筆

檔案分布: `src/data/blog-data/en.json`(7)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 2 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 3 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 4 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 5 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 6 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |
| 7 | `src/data/blog-data/en.json:617` | "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI qu |

## D category 欄位殘留 — 32 筆

檔案分布: `src/data/blog-data/en.json`(32)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/data/blog-data/en.json:125` | "category": "餐飲外賣", |
| 2 | `src/data/blog-data/en.json:125` | "category": "餐飲外賣", |
| 3 | `src/data/blog-data/en.json:125` | "category": "餐飲外賣", |
| 4 | `src/data/blog-data/en.json:125` | "category": "餐飲外賣", |
| 5 | `src/data/blog-data/en.json:143` | "category": "寵物", |
| 6 | `src/data/blog-data/en.json:143` | "category": "寵物", |
| 7 | `src/data/blog-data/en.json:180` | "category": "美妝護膚", |
| 8 | `src/data/blog-data/en.json:180` | "category": "美妝護膚", |
| 9 | `src/data/blog-data/en.json:180` | "category": "美妝護膚", |
| 10 | `src/data/blog-data/en.json:180` | "category": "美妝護膚", |
| 11 | `src/data/blog-data/en.json:376` | "category": "母嬰食品", |
| 12 | `src/data/blog-data/en.json:376` | "category": "母嬰食品", |
| 13 | `src/data/blog-data/en.json:376` | "category": "母嬰食品", |
| 14 | `src/data/blog-data/en.json:376` | "category": "母嬰食品", |
| 15 | `src/data/blog-data/en.json:384` | "category": "房地產", |
| 16 | `src/data/blog-data/en.json:384` | "category": "房地產", |
| 17 | `src/data/blog-data/en.json:384` | "category": "房地產", |
| 18 | `src/data/blog-data/en.json:392` | "category": "醫藥保健", |
| 19 | `src/data/blog-data/en.json:392` | "category": "醫藥保健", |
| 20 | `src/data/blog-data/en.json:392` | "category": "醫藥保健", |
| 21 | `src/data/blog-data/en.json:392` | "category": "醫藥保健", |
| 22 | `src/data/blog-data/en.json:400` | "category": "汽車汽配", |
| 23 | `src/data/blog-data/en.json:400` | "category": "汽車汽配", |
| 24 | `src/data/blog-data/en.json:400` | "category": "汽車汽配", |
| 25 | `src/data/blog-data/en.json:408` | "category": "體育賽事", |
| 26 | `src/data/blog-data/en.json:408` | "category": "體育賽事", |
| 27 | `src/data/blog-data/en.json:408` | "category": "體育賽事", |
| 28 | `src/data/blog-data/en.json:408` | "category": "體育賽事", |
| 29 | `src/data/blog-data/en.json:702` | "category": "書籍印刷", |
| 30 | `src/data/blog-data/en.json:702` | "category": "書籍印刷", |
| 31 | `src/data/blog-data/en.json:702` | "category": "書籍印刷", |
| 32 | `src/data/blog-data/en.json:702` | "category": "書籍印刷", |

## E title/description 欄位殘留 — 52 筆

檔案分布: `src/data/blog-data/en.json`(44) · `src/data/sku-seo-data.ts`(8)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 2 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 3 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 4 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 5 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 6 | `src/data/blog-data/en.json:5` | "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare  |
| 7 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 8 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 9 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 10 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 11 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 12 | `src/data/blog-data/en.json:131` | "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect bindi |
| 13 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 14 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 15 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 16 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 17 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 18 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 19 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 20 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 21 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 22 | `src/data/blog-data/en.json:577` | "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, Zprin |
| 23 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 24 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 25 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 26 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 27 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 28 | `src/data/blog-data/en.json:593` | "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% |
| 29 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 30 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 31 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 32 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 33 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 34 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 35 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 36 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 37 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 38 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 39 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| 40 | `src/data/blog-data/en.json:609` | "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event |
| … | (其餘 12 筆見 csv 逐筆檔) | |

## F content 正文內嵌繁中 — 300 筆

檔案分布: `src/data/blog-data/en.json`(300)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 2 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 3 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 4 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 5 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 6 | `src/data/blog-data/en.json:8` | "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekl |
| 7 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 8 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 9 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 10 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 11 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 12 | `src/data/blog-data/en.json:16` | "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges  |
| 13 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 14 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 15 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 16 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 17 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 18 | `src/data/blog-data/en.json:24` | "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, ev |
| 19 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 20 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 21 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 22 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 23 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 24 | `src/data/blog-data/en.json:56` | "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consume |
| 25 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 26 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 27 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 28 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 29 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 30 | `src/data/blog-data/en.json:64` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the  |
| 31 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 32 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 33 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 34 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 35 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 36 | `src/data/blog-data/en.json:72` | "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use |
| 37 | `src/data/blog-data/en.json:80` | "content": "<p>Sustainability is now a global trend. More companies embed ESG (Environmental, Social, Governan |
| 38 | `src/data/blog-data/en.json:80` | "content": "<p>Sustainability is now a global trend. More companies embed ESG (Environmental, Social, Governan |
| 39 | `src/data/blog-data/en.json:80` | "content": "<p>Sustainability is now a global trend. More companies embed ESG (Environmental, Social, Governan |
| 40 | `src/data/blog-data/en.json:80` | "content": "<p>Sustainability is now a global trend. More companies embed ESG (Environmental, Social, Governan |
| … | (其餘 260 筆見 csv 逐筆檔) | |

## G 其他/待判 — 148 筆

檔案分布: `src/data/category-seo-content.ts`(88) · `src/data/buying-guides.ts`(26) · `src/data/sku-seo-data.ts`(20) · `src/app/[locale]/category/[slug]/page.tsx`(10) · `src/data/blog-posts.ts`(4)

| # | file:line | 上下文(節錄) |
|---|---|---|
| 1 | `src/app/[locale]/category/[slug]/page.tsx:170` | 'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities', |
| 2 | `src/app/[locale]/category/[slug]/page.tsx:170` | 'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities', |
| 3 | `src/app/[locale]/category/[slug]/page.tsx:170` | 'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities', |
| 4 | `src/app/[locale]/category/[slug]/page.tsx:170` | 'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities', |
| 5 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 6 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 7 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 8 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 9 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 10 | `src/app/[locale]/category/[slug]/page.tsx:206` | 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts', |
| 11 | `src/data/blog-posts.ts:1834` | en: 'School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clien |
| 12 | `src/data/blog-posts.ts:1834` | en: 'School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clien |
| 13 | `src/data/blog-posts.ts:1834` | en: 'School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clien |
| 14 | `src/data/blog-posts.ts:1834` | en: 'School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clien |
| 15 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 16 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 17 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 18 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 19 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 20 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 21 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 22 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 23 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 24 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 25 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 26 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 27 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 28 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 29 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 30 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 31 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 32 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 33 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 34 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 35 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 36 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 37 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 38 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 39 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| 40 | `src/data/buying-guides.ts:930` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes |
| … | (其餘 108 筆見 csv 逐筆檔) | |
