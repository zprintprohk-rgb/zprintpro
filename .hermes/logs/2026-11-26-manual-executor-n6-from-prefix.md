# N6 顯示層口徑 C 方案③ 執行報告（en 裸價面補 From 前綴）

- 執行：Kimi Work 人手會話（首席 SEO/AEO/GEO 數據戰略分析師）
- 授權：K3 2026-11-26 03:17「把 N6 顯示層口徑 C 的三個方案整理成一句話裁決材料…按最優推薦繼續下一步」
- 裁決材料：`重要文件/2026-11-26-n6-display-layer-caliber-c-ruling-material.md`（推薦 = 方案③）
- 代碼 commit：`eb0daec5`（push 03:43，pre-push guard #21 全過）

## 一、方案③落地範圍（3 文件 8 處，零價格數字變動）

| 面 | 文件 | 改動 |
|---|---|---|
| 類目卡 | `CategoryPageV9.tsx` | V9T 介面增 `fromPrefix`（zh-hk=''、en='From '、ja=''），卡片大價行渲染 `{t9.fromPrefix}{fromPrice}` |
| 首頁 HotProducts | `HotProducts.tsx` | 價格 Link 內 en 加 `From ` 前綴 |
| PDP 右欄報價盒 | `ProductPageV9.tsx` L576 | `isEn ? 'From ' : ''` 前綴 |
| PDP 相關產品卡 | `ProductPageV9.tsx` L806 | `locale === 'en' ? 'From ' : ''` 前綴 |

不動：PDP hero 大價行（其上方標籤行已有 `eachFrom='From '`）、zh/ja 後綴（「起」/「〜」既有）、一切價格數字與 title。

## 二、門禁

- `npx tsc --noEmit` 0 錯
- title-v5（HARD=0）/ brand / gsc-leak / entity / price-truth（全零）/ i18n 六門禁全過
- `check-brand-mentions.mjs --strict` A 類 0 命中
- `check-encoding.js --fix` 4 staged 文件 UTF-8 LF 全過

## 三、live 驗收（2026-11-26 09:1x，cache-buster 探針）

| 探針 | 結果 |
|---|---|
| en `/en/category/stickers/` | `From $0.05` ×2（SSR 註釋節點分隔形態，渲染正常）✓ |
| en 首頁 HotProducts | `From $0.x/$2.x` ×4 ✓ |
| en `/en/product/waterproof-stickers/` | `From $0.05` ×2（右欄 + 相關卡）✓ |
| zh-hk `/zh-hk/category/stickers/` | 「起」185 處回歸無損 ✓ |
| ja `/ja/product/waterproof-stickers/` | 「〜」61 處回歸無損 ✓ |

## 四、異常留痕：CF check-run webhook 掛住

- `eb0daec5` 的 GitHub check-run「Cloudflare Pages」自 03:43:40 UTC+8 起 5h+ 停留 `in_progress`（webhook 回調異常，非構建失敗）。
- 實證：五路 live 探針確認新代碼已在 serving；上一批 `1343ec67` check-run 正常 completed/success。
- 處置：如實登記，不以「wrapper/狀態假象」當成功，以 live 探針為準（per §0.35.4 判據鐵律精神）；後續 push 會生成新 check-run，本條掛單隨時間自然沉底。

## 五、留 12-04 月度復盤

- 方案①（MOQ 實價）/ 方案②（區間錨）：涉及價格數字展示口徑變更，留 12-04 月度復盤連同落差審計（`price-scale-audit-20261116.json`，15/20 SKU ≥5×，custom-flyers 86.8× 最劣）一併議。
- N5（ja 卡 ¥8.40 小數円）：值未拍，維持登記不動。

數據來源：src 實碼 diff（eb0daec5）+ live 5 URL cache-buster 探針（2026-11-26 09:1x）+ GitHub check-runs API（2026-11-26 09:0x）+ K3 拍板記錄（2026-11-26 03:17 會話）。
