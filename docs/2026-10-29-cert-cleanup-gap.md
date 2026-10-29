# §2.2 无证认证声明全站缺口分析（2026-10-29 12:0x）

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师。触发：data-driven §2.2「先清除未经证实的 FDA/认证声明」+ peer b50ff77c 只清 9 个 28d 数据驱动 SKU（日文「国際認証体系」）——grep 复算（§0.23.2）发现全站其余存量。

## 一、复算分布（2026-10-29 12:0x，全 src 排除 .bak）

| 文件 | 处数 | 语义类型 |
|---|---|---|
| products-content.ts | 72 | 「internationally certified lines with ISO 12647-2」模板 ~20 + FAQ「FSC-certified and internationally certified」~15 + 红封套族模板 |
| sku-seo-data.ts | 31 | 英/繁体 body 残留（peer 只清 9 SKU） |
| page.tsx（多个） | 22 | 各产品页 desc/FAQ（「internationally certified」） |
| seo.ts | 9 | **「internationally certified」英文（繁体/日文已清 12→0，本批 #14）** |
| category-seo-content.ts | 8 | 利是封族「國際認證體系工廠」等 |
| products.ts | 7 | desc 字段 |
| schema-extensions.ts | 4 | HowTo「internationally certified Asia factory」 |
| category-conversion-blocks.ts | 4 | 「internationally certified + FSC-certified」 |
| **合计** | **~157** | 全部为无具体认证编号的笼统声明（FSC 有证保留，ISO 12647-2 标准编号保留） |

## 二、语义口径（与 peer 先例一致）

- **删**：「國際認證體系 / 国際認証体系 / internationally certified」单独声明（无编号、§0.23 无来源）
- **保留**：FSC-certified（有证域·七簇移交）；ISO 12647-2（标准编号可验证）
- **待 K3**：①「internationally certified」若实指 ISO 9001 类体系——是否改为具体编号（需 K3 提供编号或确认删）② FDA 21 CFR / EU REACH（buying-guides L266/303——涉 FDA 文件域·红线——不动待移交）

## 三、分批清毒计划（建议）

| 批 | 文件 | 处数 | 说明 |
|---|---|---|---|
| #14 已完成 | seo.ts 繁体+日文 | 12 | 「國際認證體系 9 + 国際認証体系 3 → 0」已 commit |
| A | seo.ts 英文 | 9 | 「internationally certified.」分类模板——下一步 |
| B | products-content.ts | 72 | 模板级语义替换（删 internationally certified 留 ISO/FSC）——大批 |
| C | sku-seo-data.ts | 31 | **peer 活跃域——协调/等 peer 或静默后做** |
| D | page.tsx 22 + products 7 + category-seo 8 + schema 4 + blocks 4 | 45 | 各产品页/分类页 |

## 四、数据来源

```
数据来源:
- grep 全 src 复算（§0.23.2 双方法：PowerShell Select-String + grep 工具, 两法一致）
- peer b50ff77c（28d cert 残余族 9 SKU 先例）
- §2.2 无证声明清毒方向（data-driven 战略）
- 七簇域移交红线（FDA/SGS/FSC 文件域——buying-guides 的 FDA/EU REACH 不擅动）
```
