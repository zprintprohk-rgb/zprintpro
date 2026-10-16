# 2026-10-16 簇 8 执行报告 + 千问评分卡事实校正

> **触发**: K3 转发千问 3.8 Max 评分卡（94/100 A 级）+「按优先级执行」指令
> **数据来源**（§0.23 强制行）: products.ts 十一 SKU 一手直读 + CSV rows 2-84 逐行扫描 + csv-to-sku-seo.mjs 源码 L10/L149 + .hermes/logs/b1c-queue-progress.json（本批更新）+ 校准 2026-10-16 11:4x-12:1x

## 一、千问评分卡三处事实校正（§0.23.2 双方法）

| 千问声称 | 一手核实 |
|---|---|
| 簇 6b「⬜ 待确认 ~80%，登记今晚 21:17 车道」 | **错误**：簇 6b = 账本 order-8 **DONE**（10-16 03:0x，相似度 27 对全 PASS worst 0.333 + 线上探针双方法已验），无待确认项 |
| 恢复系数「最后 cliff JSON=10-13，已断 4 天」+「检查 .hermes/cliff/」 | **两处不准确**：① 10-15 JSON 存在（恢复系数 97.2% 新链第 1 日），断档实为 10-14（源数据不可回填）+ 10-16/17（K3 尚未导出，截至 11:43 一手 ls 确认）；② 路径勘误：cliff JSON 在 `.hermes/logs/gsc-cliff-*.json`（非 `.hermes/cliff/`） |
| 簇 8 十 SKU 名单（kraft-mailer/corrugated-box/rigid-box/...） | **命名全错但数量对**：实为 cosmetic-boxes / mailer-boxes / rigid-boxes / magnetic-closure-gift-box / electronics-packaging-box / kraft-paper-packaging-box / gang-run-card-boxes / white-card-boxes / corrugated-boxes / tuck-end-boxes（共享模板 "What is the MOQ for custom packaging boxes?" ×10，机器清点实锤） |

## 二、簇 8 交付（本批）

1. **packaging faqSchema ×10 原位替换**（共享模板拆模板，4Q 真值差异化：MOQ=minQuantity 字段直引 + 各自结构/工藝/用途錨）——7 SKU 引用价带（与 basePrice 对齐无矛盾），4 SKU（gang-run/white-card/corrugated/tuck-end）带内部矛盾**只引 MOQ 不引价**（§0.23：不传播可疑数字）
2. **outdoor-posters 余 1 收口**：faqSchema 替换 + CSV row24 descEN + ts desc/h1/body 四处假 MOQ（50+/50-MOQ/|100 MOQ）→ 真值（minQ 1 / HK$16-55/張）
3. **mailer-boxes body 事实修正**：「10 張起印」×2 →「100 個起印」（minQ 100 真值）+ ISO 9001 ×3 口径修正（zh/en/ja）+「15+ 年」×2 → 多年/長年
4. **CSV zh FAQ 列映射链核实**：实锤死数据（regen L10 注释「faqs — 全 src 无消费点」+ L149 不消费）→ 已在上批清毒为 inert-clean，本批仅登记

## 三、新增 K3 价格 SSoT docket（products.ts 内部矛盾，本批不动价格字段）

| SKU | 矛盾 |
|---|---|
| white-card-boxes | basePrice **129** vs price_range **HK$0.50-3.00/個**（自相矛盾） |
| gang-run-card-boxes | HK$129-17,214（疑似批量总价混入单价带，无 /個 量纲） |
| corrugated-boxes | HK$1,517-7,278（同上） |
| tuck-end-boxes | HK$1,538-7,478（同上） |
| kraft-paper-packaging-box | HK$1.5-1000/個（带宽 667×，疑似污染） |
| gang-run/white-card/corrugated/tuck-end | 缺 basePrice_en / basePrice_ja（en/ja PDP 价显示层待核） |

## 四、簇 9 候选（全站 body 清扫清单，已量化）

| 病灶串 | 全站计数（本批后） | 备注 |
|---|---|---|
| 10 張起印，無開版費 | 47 | **minQ=10 SKU 是真值不可盲改**，须逐 SKU 对照 |
| ISO 9001 認證工廠 / 認証工場 / certified | 27 / 22 / 45 | CRED 口径全站清扫 |
| 15+ 年 / 15+ 年の | 58 / 22 | CRED_15_YEARS 口径 |
| 50-MOQ / \| 100 MOQ | 1 / 52 | B1 desc 模板遗产，逐 SKU 对照 minQuantity |

## 五、验收

- tsc **54=54**；regen 断言 A-E（字节级变化恰 1 块 outdoor）；块级形状断言全过（outdoor+mailer 零残留）
- 簇 6b 收口确认（千问 P0-①）：账本 order-8 DONE + 线上探针已验，无待办
- 解除判定（千问 P0-②）：K3 未导新档（11:43 一手 ls），条件① 维持 1/3，球在 K3
