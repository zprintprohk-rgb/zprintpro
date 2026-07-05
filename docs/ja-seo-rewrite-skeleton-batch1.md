# JA 核心 10 SKU 日文 SEO 重写骨架（AI 出稿 · 待母语审核）

> **状态**：AI 生成骨架 · 标 `// TODO: ja-review` · 需要日文母语人士审核后 apply
> **优先级**：P0（ja 流量为 0 的根因）
> **生成日期**：2026-06-27
> **目标字段**：h1（30 字）/ description（140-160 字）— 影响 SERP 和 SEO 头部
> **暂不动字段**：body（500+ 字，质量要求更高，下一批）/ keywords（已合并到 description）
> **应用位置**：`src/data/sku-seo-data.ts`
> **审核任务清单**：见末尾 §6

---

## ⚠️ 重要说明

1. **AI 写的日文可能被 Google 当 MT（机器翻译）标记**——已经避免"XのXは Yに"自重复模板，但仍然需要母语审核
2. **不要直接覆盖线上 SKU 的 ja 字段**——用新 key（比如 `seoDraft.ja`）让审核完成后再 merge
3. **审核完成前不上线**——可以先把骨架写进 `src/data/sku-seo-data-draft.ts` 作为待审核草稿

---

## 1. premium-business-cards（高級名刺）

### 英文原文（参考）
- h1: "Premium Business Cards | Luxury Foil | ZprintPro"
- description: "Premium business card printing. 300g-400g matte paper, foil stamping, spot UV. 100-MOQ. Free US shipping over $100, DHL Express. FSC, ISO 9001. Get a quote."

### 中文版（参考 zh-hk）
- h1: "高級商務咭片 | 印刷即日速遞送貨"
- description: "高級商務咭片 - 高級商務名片/名片印刷 100 張起。採用 300g-400g 銅版紙/啞面/棉紙 高品質材質..."

### 日文骨架（AI 出 · 待审核）
- **h1**: `高級名刺 | 箔押し・スポットUV加工 | ZprintPro`
- **description**: `ZprintPro のプレミアム名刺印刷サービス。300g-400g のマット紙・コットン紙・コート紙に対応し、箔押し・スポットUV・エンボス加工が可能です。100 枚から対応、ISO 9001 認証取得工場で生産。香港直結で 1-3 営業日納品、全国配送承ります。無料見積もり、即日対応可能。`

---

## 2. thick-business-cards-400g（厚紙名刺(400g)）

### 英文原文
- h1: "Thick Business Cards (400g) | Heavyweight Cardstock | ZprintPro"
- description: "400gsm heavyweight business cards. Premium thick cardstock, foil stamping, spot UV. 100-MOQ. Free US shipping. ISO 9001 certified."

### 中文版
- h1: "400g 厚身名片 | 燙金 UV 多工藝"

### 日文骨架（AI 出 · 待审核）
- **h1**: `400g 厚紙名刺 | 重厚感プレミアムカード | ZprintPro`
- **description**: `400g の極厚名刺印刷サービス。マット紙・コーンスターチ紙・アート紙に対応、箔押し・UV 加工可能。弁護士・デザイナー・ハイエンドサービス向けに最適。100 枚から対応、香港直結で短納期。全国配送、ISO 9001 認証。`

---

## 3. foil-business-cards（箔押し名刺）

### 英文原文
- h1: "Foil Stamped Business Cards | Gold/Silver Foil | ZprintPro"

### 中文版
- h1: "燙金名片 | 金箔銀箔"

### 日文骨架（AI 出 · 待审核）
- **h1**: `箔押し名刺 | 金箔・銀箔・ローズ金 | ZprintPro`
- **description**: `箔押し名刺印刷サービス。金箔・銀箔・銅箔・ホログラム箔に対応し、300g-400g のアート紙・マット紙にプレス加工。法人名刺・パーソナルブランド向けに最適。100 枚から小ロット対応、香港直結で短納期納品。`

---

## 4. spot-uv-business-cards（スポットUV名刺）

### 英文原文
- h1: "Spot UV Business Cards | Gloss Accent Finish | ZprintPro"

### 中文版
- h1: "局部UV名片 | 亮面光泽"

### 日文骨架（AI 出 · 待审核）
- **h1**: `スポットUV名刺 | ロゴ部分光沢仕上げ | ZprintPro`
- **description**: `スポット UV 加工名刺印刷サービス。ロゴ・イラスト・テキストの一部に UV ニスで光沢を演出。300g-400g のマット紙・アート紙に対応。ブランド名刺・クリエイター名刺に最適。100 枚から対応、ISO 9001 認証工場。`

---

## 5. matte-business-cards（マット名刺）

### 英文原文
- h1: "Matte Business Cards | Soft-Touch Finish | ZprintPro"

### 中文版
- h1: "哑面名片 | 柔軟觸感"

### 日文骨架（AI 出 · 待审核）
- **h1**: `マット名刺 | ソフトタッチ仕上げ | ZprintPro`
- **description**: `マット仕上げ名刺印刷サービス。300g-400g のマット紙・アート紙にラミネート加工、指触りの良いソフトタッチ。法律事務所・会計事務所・コンサルティング向けに最適。100 枚から対応。`

---

## 6. rounded-corner-cards（角丸名刺）

### 英文原文
- h1: "Rounded Corner Business Cards | Modern Die-Cut | ZprintPro"

### 中文版
- h1: "圓角名片 | 模切設計"

### 日文骨架（AI 出 · 待审核）
- **h1**: `角丸名刺 | モダンダイカット仕上げ | ZprintPro`
- **description**: `角丸名刺印刷サービス。4 角または 1 角を丸くカットし、モダンな印象に。300g-400g のアート紙・マット紙に対応。クリエイター・デザイナー・スタートアップに最適。100 枚から対応。`

---

## 7. waterproof-stickers（防水ステッカー）

### 英文原文
- h1: "Waterproof Vinyl Stickers | UV Resistant | ZprintPro"

### 中文版
- h1: "防水貼紙 | 耐用材質"

### 日文骨架（AI 出 · 待审核）
- **h1**: `防水ステッカー | UV耐性ビニール素材 | ZprintPro`
- **description**: `防水ステッカー印刷サービス。UV 耐性ビニール素材に対応し、屋外 3-5 年の耐久性。飲料ボトル・化粧品・日用品ラベルに最適。ダイカット自由形状、50 枚から対応、FDA 準拠素材あり。`

---

## 8. transparent-stickers（透明ステッカー）

### 英文原文
- h1: "Transparent Clear Stickers | Custom Die-Cut | ZprintPro"

### 中文版
- h1: "透明貼紙 | 玻璃表面"

### 日文骨架（AI 出 · 待审核）
- **h1**: `透明ステッカー | クリア素材カスタム | ZprintPro`
- **description**: `透明クリアステッカー印刷サービス。ガラス面・パッケージシール・ウィンドウ装飾に最適。CMYK + 白インクオプション対応。ダイカット自由形状、50 枚から対応。`

---

## 9. removable-stickers（剥がせるステッカー）

### 英文原文
- h1: "Removable Stickers | No-Residue Adhesive | ZprintPro"

### 中文版
- h1: "可移貼紙 | 不留痕跡"

### 日文骨架（AI 出 · 待审核）
- **h1**: `剥がせるステッカー | 糊残りなし再剥離 | ZprintPro`
- **description**: `再剥離可能ステッカー印刷サービス。90 日以内に糊残りなく剥がせる弱粘着タイプ。店舗ウィンドウ・短期キャンペーン・季節商品に最適。ダイカット自由形状、50 枚から対応。`

---

## 10. small-batch-stickers（小ロットステッカー）

### 英文原文
- h1: "Small-Batch Custom Stickers | Low MOQ | ZprintPro"

### 中文版
- h1: "小批量貼紙 | 低起訂量"

### 日文骨架（AI 出 · 待审核）
- **h1**: `小ロットオリジナルステッカー | 低 MOQ | ZprintPro`
- **description**: `小ロットカスタムステッカー印刷サービス。10 枚から対応、個人のハンドメイド商品・同人イベント・ノベルティに最適。ダイカット自由形状、防水・耐候オプション対応。`

---

## §6. 审核任务清单

### 审核维度（每条日文必须检查）

| # | 维度 | 检查点 | 严重度 |
|---|------|-------|--------|
| 1 | **MT 痕迹** | 是否有 "XのXは Yに..." 自重复模板 | ❌ FAIL |
| 2 | **关键词前置** | 主关键词是否在前 30 字符内 | ⚠️ WARN |
| 3 | **字符数** | h1 ≤ 30 字符、description 140-160 字符 | ⚠️ WARN |
| 4 | **EN 关键词混入** | keywords/description 不能含 `premium business cards` 等英文字符串 | ❌ FAIL |
| 5 | **JP 表达自然** | 不使用"ホリデーマーケティング"这种片假名直译（应用"年末年始キャンペーン"） | ⚠️ WARN |
| 6 | **品牌名格式** | ZprintPro（首字母大写、无空格） | ⚠️ WARN |
| 7 | **CTA 完整性** | description 末尾是否含 CTA（"無料見積もり"/"ご注文"/"お問い合わせ"） | ⚠️ WARN |
| 8 | **数字具体性** | 数量（100 枚、300g 等）是否真实、是否符合产品规格 | ❌ FAIL |

### 审核流程

1. **第 1 轮（快速 review）**：懂日文的人快速过 10 条，标记 MT 痕迹 + EN 混入
2. **第 2 轮（细节 review）**：母语级审核，润色不自然的表达
3. **第 3 轮（apply）**：审核通过后，从 `sku-seo-data-draft.ts` merge 到 `sku-seo-data.ts`

### Apply 步骤（审核完成后）

```bash
# 1. 把骨架写入 draft 文件
cp src/data/sku-seo-data-draft.ts src/data/sku-seo-data.ts

# 2. TypeScript 验证
npx tsc --noEmit -p tsconfig.json

# 3. 构建验证
npm run build

# 4. ja PDP 抽 3 个页面 webfetch 验证
# - /ja/product/premium-business-cards/
# - /ja/product/waterproof-stickers/
# - /ja/product/small-batch-stickers/
# 检查 <h1> 和 <meta name="description"> 是日文
```

---

## §7. 后续批次（剩余 69 SKU）

按品类分 5 批，每批 12-15 SKU：

| 批次 | 品类 | SKU 数 | 预计工作量 |
|------|------|--------|-----------|
| 第 1 批（已完成） | business-cards + stickers (top) | 10 | 本文件 |
| 第 2 批 | posters + packaging (top) | 14 | 5-6 小时 |
| 第 3 批 | packaging (剩) + paper-bags | 14 | 5-6 小时 |
| 第 4 批 | red-packets + calendars + banners | 14 | 5-6 小时 |
| 第 5 批 | flyers + books + menus + educational + envelopes | 17 | 6-8 小时 |

每批出完后先验证（webfetch 抽页 + 母语快速 review），再进下一批。

---

**维护者**：Mavis · **下次更新**：第 2 批（posters + packaging top）完成后
