# 2026-10-16 B1c 簇9 全站 body 清扫 — 执行报告（千问方案 P0-①+P1-①）

> **数据来源**（§0.23 强制行）: `.hermes/_b1c9_plan.json`（Phase 1 逐 SKU minQuantity 对照）+ products.ts 一手 + ts/CSV 替换前后计数断言 + 校准 2026-10-16 13:5x-14:3x

## 一、恢复系数重大读数（P0-②，今日先行）

- **K3 13:51 导出 10-16 24h 档**（三站点汇总 + 分站 ×3）→ 检测器即时生成 `.hermes/logs/gsc-cliff-2026-10-16.json`
- **10-16 窗（10-15 08:00~10-16 07:00）恢复系数 = 120.6%**（706 展示 / 24 点击，vs 固定断崖前基线 585.2）
- **解除条件① 计数 2/3 日**（10-15 窗 97.2% ✅ → 10-16 窗 120.6% ✅）：**10-17 窗再 ≥60% + K3 GA4 核验 → 三条件齐，解除判定可宣布**
- 24 点击为恢复期新高（24/706 = 3.4% CTR，CTR 批承接信号正向）

## 二、簇 9 Phase 1（逐 SKU 对照，不盲改）

- 全站 85 块扫描 × 9 病灶模式 → `_b1c9_plan.json`：**KEEP 77（真值保护）/ FIX 224**
- 关键判定：`10 張起印` 在 minQ=10 SKU（stickers/flyers 家族）是**真值**——34 处 KEEP 保护；`| 100 MOQ` 在 minQ=100 SKU（bags/envelopes）真值——32 处 KEEP
- 幻影块破案：`"seo": {` 2 空格缩进块 = **fruit-food-label-stickers 的 seo 子键缩进异常**（minQ 500），其 3 处「10 張起印」全假 → 500 張起印

## 三、簇 9 Phase 2（执行）

| 批次 | 处数 | 内容 |
|---|---|---|
| A（低风险口径） | **ts 243 + CSV 23** | ISO 9001 全变体（認證工廠/認証工場/認証工場无空格/certified/quality control/品質管理/QC/品質検査/質檢/質檢報告/+FSC/裸句）→ 國際認證體系（zh）/国際認証体系（ja）/internationally certified（en）；15+ 年→多年、15+ 年の→長年の、15+ years→over a decade |
| B（逐 SKU 真值） | **13** | 10 張起印 → 100 個（bags/boxes ×8）、200 個（electronics）、300 個（kraft-packaging）、500 張（fruit-food 幻影块） |

**终态断言**：`ISO 9001 = 0`、`15+ 年 = 0`、`15+ years = 0`（ts+CSV 两域）；`10 張起印，無開版費 = 34`（KEEP 保护精确命中）；tsc **54=54**；门童 #29 违规 0 / brand A 0 / meta-desc 静默过；regen 断言 A-E。

## 四、执行过程教训（3 条，均已量化）

1. **Phase 1 扫描器块边界缺陷**：初版块起点正则漏检 → 幻影 "seo" 块混入（fruit-food 缩进异常），计数 plan vs 实际不符被逐块断言拦下 → 改用 slug 行锚定法（与簇 8 一致）
2. **ISO 9001 变体长尾**：4 轮收敛（无空格 ja / QC 无句点 / 質檢報告 / 裸句）——失败即打印残余上下文的断言设计把收敛从猜测变成直读
3. **KEEP 保护断言**：`10 張起印 = 34` 精确断言保证真值零误伤——「计数断言拦盲改」第二次实战验证（千问上批扣分项闭环）

## 五、新增 docket（本批发现，未动）

- 「SGS 遷移測試 / SGS migration tested」（stickers 家族 body）——认证主张需 K3 确认真伪
- 「15,000+ clients across 100+ countries」（fruit-food en body）——无源 4 位数，CRED 口径应撤除（本批 scope 未含，登记）
- 「15+ years」en 其余形态已本批清零

## 六、B1c 队列终态

**簇 1-9 全部 DONE（去指纹 9/9 主簇 + 全站 body 清扫）**。剩余登记项：greeting-cards ×6 FAQ（挂 §0.0 裁决）、wedding 2 SKU 无 faqSchema、簇 9 docket（SGS/15000+）、products.ts 价格 SSoT 5 项（K3 裁定）。
