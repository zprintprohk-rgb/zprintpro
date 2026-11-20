# V23.1 三语生图提示词 — 完成报告

日期: 2026-08-23
任务: K3 拍板"按最优执行" — V23.1 三语 (EN / zh-hk / JA) 生图提示词,基于豆包 V23 修 4 硬伤 + 增强项 1/2/3

## 交付物 (3 个 TXT,纯提示词文件,未改 products.ts 接线,未 commit/push)

| 文件 | 语言策略 | SKU | Prompts | META |
|------|---------|-----|---------|------|
| `seedream/v23.1-prompts-en.txt` (995 KB) | 英文,US 场景 | 99 | 396 | 99 |
| `seedream/v23.1-prompts-zh-hk.txt` (789 KB) | 全繁体中文,HK 本土场景 | 99 | 396 | 99 |
| `seedream/v23.1-prompts-ja.txt` (1043 KB) | 英文 prompt + 日本本土场景 (Comiket/omotenashi/水引/和風婚禮) | 99 | 396 | 99 |

生成器: `.hermes/_v231_generator.py` (脚本化,K3 红线 — 不 AI 手搓;输入 `.hermes/_v23_prompts.txt` + `.hermes/_products_export.json`,可重跑)

## K3 拍板项落地确认

- ✅ A 命名归位: 贺卡 6 SKU (含 BC-006 rounded-corner-greeting-cards,初版 key 不匹配已修) 文件名 `zprintpro-stickers-*` → `zprintpro-greeting-cards-*`,旧错名残留 0
- ✅ JA 场景本土化: 做 (SCENE_JA 独立表)
- ✅ 爆炸贴/主图卖点文字: 三语全部不加 — 负面清单追加「促銷標籤、爆炸貼、圖上價格標籤」/ "promotional badges, starburst labels, price tags on image";促销卖点后续由网页端 overlay 实现
- ✅ 保留 1200×1200 + HERO 80-85% (user 坚持)

## 4 硬伤修复验证

1. AUDIENCE 断句/串类目 → 16 类目 × 3 locale 独立 AUDIENCE 表重建,PKG-014 现为 packaging 买家 ✅
2. seo_filename 从 products.ts imagesByLocale 导出 (站点真实来源) ✅
3. alt_en 断词 → clean_alt 句边界/词边界截断,真断词 0 (74 条无句号是 rstrip 设计,唯一 152 字符案例词完整 "embossing") ✅
4. 销售话术混入生图 prompt → strip_sales 60+ 正则三语清零:
   - 终检关键词: 免費打樣/免費設計/DHL/包郵/起印/交期/刀模費/排版費/成本直降/交貨/送貨 (zh-hk);Free sample/Free design/DHL/MOQ/free shipping/AI quote/% off (en);無料/DHL/MOQ/納期/ロット/コスト削減/适配行业/適配行業/¥/送料 (ja) — **全部 0 残留**
   - 修复过程中发现并修掉的形态: `[，,]。?` 标点类 bug (天交期跟句号失配)、"100 sets MOQ"、"(vs Alibaba 500+ MOQ)"、"50-copy MOQ"、"1-2 day turnaround"、"15% off bundle"、"全港免費送貨"、JA "型代無料/全国送料込み/¥258-1030/個" 等

## 3 增强项落地

1. 所有 prompt PRODUCT 段末尾加「有印刷设计感但无可读文字」(DESIGN_NO_TEXT 三语) — 解 blank-fake vs gibberish 两难
2. VARIETY 构图含人手互动 (holding/placing/opening) — 信任信号
3. 4 视图场景去重: HERO/DETAIL 主场景,VARIETY 使用中场景,MULTI-ANGLE 中性影棚

## 补 V23 漏的 2 SKU

foil-wedding-invitations + kraft-paper-bags,已按 V23.1 模板生成 4 视图 + META

## ⚠️ 源数据质量问题 (products.ts,不阻塞本次交付,建议 v3.16+ 排期)

约 14 个 SKU 的 `descriptionJa` 字段实际存的是繁体中文 (含「适配行业:」「3-7天交貨」等),不是日文。影响: 这些 SKU 的 alt_ja 是中文,JA 页图片 alt 的日文 SEO 信号缺失。生成器已做兜底清洗,但根治要改 products.ts 源数据。

## 试跑建议 (K3 拍板后执行)

抽 2 代表 SKU 试跑: PC-001 wedding-place-cards (婚礼纸品) + PKG-014 corrugated-boxes (包装),各 4 视图 × 3 locale = 24 张。校验清单:
1. 无 autoClaw AI 水印 / AI 生成水印
2. 产品表面无可读乱码文字 (200% 放大检伪文字)
3. 材质质感真实 (纸张/油墨/烫金)
4. 场景合理 (JA 版是日本场景不是美国场景)
5. 1200×1200 无裁切

试跑通过后全量 388×3 = 1,164 张。
