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
| A 已完成 | seo.ts 英文+填充 | 17 | 「internationally certified 9 + 填充模板 3 语 + 補清 3 → seo.ts 全归零」已 commit（FSC/ISO 12647 保留） |
| B | products-content.ts | 72 | 模板级语义替换（删 internationally certified 留 ISO/FSC）——大批 |
| C | sku-seo-data.ts | 31 | **peer 活跃域——协调/等 peer 或静默后做** |
| D | page.tsx 22 + products 7 + category-seo 8 + schema 4 + blocks 4 | 45 | 各产品页/分类页 |

## 五、线上探针补充发现（3cf1a048 验证 12:14）

批 #14（seo.ts）线上生效（ja paper-bags 国際認証体系 0 ✓），但 **zh 分类页组件层残留 5 处/页**（§0.23.2 dump 定位）：
- **TrustBadgeBlock 徽章**「國際認證體系」（客户可见信任徽章）
- **ProductWhyChooseUs 特色卡**「國際認證體系」（「即日交貨/全港順豐速遞」同款卡）
- **分类页正文**「FSC 認證紙材與 國際認證體系把關品質」（category-seo-content 或页面 body）

→ **批 D 扩展**：组件层（TrustBadgeBlock/WhyChooseUs/分类 body）+ page.tsx/products/category-seo/schema/blocks。「國際認證體系」徽章/卡替换候选：中性「品質保證」或「FSC 認證」（有证）——建议 FSC 语境合并。

## 六、组件批已完成（12:2x，commit 待推）

6 组件 11 处清毒（TrustBadges 3语徽章→「ISO 12647 色彩/Color/カラー」+ SUBHEADING 3语 + FloatingQuoteCTA/CategorySharpHooks/HeroBanner「品質保證」/HowItWorks/FactoryTrust「品質管理」）——组件层残留复算 0（§0.23.2）。线上探针的 zh 分类页 5 处（徽章/特色卡/正文）已覆盖。
**新发现**：products-content L63「國際品質認證把關」（FAQ 模板族）——批 B 域；「進口印刷設備把關」中性保留。

## 七、peer F5' 交叉核验（68b51fcc）与批 B 调整（12:2x）

- **peer F5'-EXTENDED 统计全树 210 处**（我 3 词精确口径 157——**口径差异登记**：peer 更宽（含「Certified/認證」全变体 + 派生字段）；全 src 复算精确口径实为 **234 处**（含「international certification」大小写变体）——§0.23.2 双方法：方向一致，数字差异源于词表宽度，非冲突
- **products-content 为脚本化派生**（头部声明「从 products.ts 物理搬移 3 长文本字段（脚本化生成）」）→ **批 B 改道 SOP-5 源修**：改 products.ts 源字段 + 重跑生成器，**禁手改 products-content**
- 批 B 状态：改道登记（生成器脚本名待查，下轮定位）；products.ts 7 处 + products-content 145 处同源一并处理

## 八、批 D-1 完成（13:1x，commit 待推 13:35）

blog/contact/service-areas 4 处清毒（blog「internationally certified factory-direct pricing」→factory-direct + 「4 大合規認證（…/國際認證體系）」→「3 大合規認證（ISO 14298:2021/FSC/G7）」+ contact 信任块→「ISO 12647 色彩」+ service-areas en）——tsc 54 ✓ brand 0 ✓ build PASS。

## 九、§2.2 累计进度（13:1x）

**已清 58 处**（seo.ts 29 + 组件 11 + v9 4 + about 10 + D-1 4）——seo.ts/组件/v9/about/blog/contact/service-areas 层归零。
**剩余 ~280**（精确口径 234 + blog-data 104）：products-content 145（SOP-5 源修待确认）+ **blog-data zh 50 + en 54**（形态多样：國際認證體系+質量管理體系認證/標準/FSC 認證紙 等——需语义替换，§0.35.5 锁已查无） + sku-seo-data 31 + page.tsx 24（catalog 9 peer 域避让 + business-cards 2 待 K3）+ category-seo 9 + products 7 + blocks/schema/blog-posts/buying-guides 13。

## 十、dfee0190 线上验证（13:15）

v9+about 清毒线上生效：zh 分类页 國際認證體系 0（ISO 12647 3 特色卡 ✓）/ ja paper-bags 0 / zh about 0（FSC 14 保留 ✓）。**新发现**：certificate-printing-guide 线上 16 处残留 → blog-data zh-hk.json 全文件 50 处 + en.json 54 处（§0.23.2 三语复算，ja 0）——**批 E 登记**（blog-data 语义替换，§0.35.5 锁已查无，形态多样待 dump）。

## 十一、批 D-1 线上全绿（13:2x，bcf6bcac）

blog/contact/service-areas 4 处清毒线上生效：zh/en contact 國際認證體系 0（zh ISO 12647 3 ✓ 信任块）+ service-areas 0 + 分类页 0/about 0/ja 0（复探）。**§2.2 累计 62 清**。注：peer 本地 commit 9a2e081f（真值批 T1-T3 calendars MOQ 50→1——§0.35.7 不代持，等 peer 推）；批 D 剩余 category-conversion-blocks 4 + sku-seo 31（peer 域避让）。

## 十二、批 E-1/小批/批 E-2 上线登记（14:30-15:30）+ page.tsx 补清（16:00 推）

**批 E-1（blog-data 104 处）上线**：e0e81c02（zh 國際認證體系 50→0 + en internationally certified 54→0，FSC/ISO 保留），peer 推 24c9347d 时带入（14:30，F4' 全链路 CLOSED）。线上 cert-guide 探针：zh 國際認證體系 4→**0** / en internationally certified 12→**0**（schema HowTo + products.ts kraft descriptionEn 源修生效）。

**小批 0fb64f11（15:00）**：blog-posts + buying-guides 無證認證詞 5 处（線上 cert-guide 残留源 2 文件），verify PASS。

**批 E-2 c7a1b665（15:30）**：blog-data 品質認證 zh 18 + en 27 + 残留 2（zh-hk/ja 校园文章 en 混入词 → 品質管理體系/品質管理システム，FAQ 整句重写「EU REACH 比品質管理體系重要?」「品質管理體系是加分項」）+ **products.ts 源修 internationally certified 7**（SOP-5，「internationally certified quality management system」→「quality management system」）+ **schema-extensions 3 语 6 处**（國際認證體系/国際認証 → 深圳自有工廠/Asia factory/アジア自社工場，线上 cert-guide HowTo 残留源）。verify PASS（15:38）。

**page.tsx 补清（c7a1b665 后探针发现）**：blog/[slug]/page.tsx L194 certificate-printing-guide en description「+ 4 certifications (ISO 14298:2021/FSC/G7/**international quality certification**)」→「quality management」（zh 页面 meta 用 en description，线上 6 处同源渲染；本地 grep 复算 0，tsc 54）。**16:00 推**（30min 硬下限 c7a1b665 15:30 + 30）+ 复探 cert-guide 归零。

**§2.2 累计 218 清**（62 + 104 + 5 + 47）。**剩余**：批 C category-seo 7 + catalog 5（peer 域避让）+ sku-seo 2 + category-conversion-blocks 1 + business-cards 1（待 K3 §0.0）+ **products-content 批 B ~145（生成器 b81463a6 一次性搬移不可寻 + 源 products.ts 0「國際品質認證」——SOP-5 源修断，需 K3 裁决直改例外）**。

## 四、数据来源

```
数据来源:
- grep 全 src 复算（§0.23.2 双方法：PowerShell Select-String + grep 工具, 两法一致）
- peer b50ff77c（28d cert 残余族 9 SKU 先例）
- §2.2 无证声明清毒方向（data-driven 战略）
- 七簇域移交红线（FDA/SGS/FSC 文件域——buying-guides 的 FDA/EU REACH 不擅动）
```
