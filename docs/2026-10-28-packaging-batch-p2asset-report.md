# D15-21 P2-ASSET-01 内容层执行报告（先行）

> 日期：2026-10-28 · 内容层先行（实物资产待业务侧）
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §9 PKG-P2-ASSET-01

## 0. 数据来源行（§0.23）

- 详情段源：`src/data/products-content.ts`（kraft L11479 / food L6068 / mailer L6313，zh longDescription）
- QC 口径：corrugated body 既有 `full QC checkpoints`（真实流程描述，非虚构数字）
- 门禁：title-v5 HARD=7（存量）/ tsc 54=54 / brand 0 / gsc 0

## 一、交付（commit，1 file 92+/71-）

| 项 | 改动 |
|---|---|
| **全站 免費樣品對比 ×70** | 详情 FAQ「材質和工藝」模板残留（免费实物样断言 P0 ①）→ `免費數碼打樣確認`（1 小时免费数碼打样真实口径；kraft 1 处已单独清，合计 71 处） |
| kraft 详情段 | 新增「印前清單與 QC 流程」（300DPI/CMYK/3mm 出血/字体外框 + 出货前尺寸·颜色·压线 QC）+「常用尺寸參考」（120×80×40 / 200×150×50 / 250×200×80mm，刀模按报价） |
| food 详情段 | 新增「常用尺寸參考」（120×120×50 / 180×120×60 / 250×150×80mm） |
| mailer 详情段 ×2 | 新增「印前清單與 QC 流程」+「常用尺寸參考」（150×100×30 / 250×180×60 / 350×250×100mm） |

## 二、验收（草案 §验收）

- ✅ 每项资产有适用范围（印前清单/QC/尺寸规格 = 真实业务流程，非虚构检测编号）
- ✅ 无 AI 冒充实物（无实物图/刀模文件——**实物资产登记待业务**）
- ✅ 图片 alt 无堆词（本轮无图片改动）

## 三、待业务侧（实物资产）

- **刀模模板**：30+ SKU body 声称「免費刀模線模板下載」——public/ 无真实 downloadable 文件（52 个匹配全为图片）——**待业务提供真实 PDF/AI 模板**上线（P2-ASSET-01 验收「无法证明真实性的资产不发布」）；或业务拍板后条件化「WhatsApp 索取」
- 实物图/试作/质检照片：待业务真实文件

## 四、watch 登记

- en/ja 版 kraft/mailer/food QC/印前增强（本轮只做 zh 详情段）→ D22-25 归并轮
- .bak-* 备份文件含旧断言（category-conversion-blocks.ts.bak-* 等）→ D22-25 清理登记

## 五、下一批

- push 记录：bannerCaps 清毒 + P2-ASSET-01 待 10:53 窗口
- D22-25 P2-CONSOL-01：pricing blog 审计归并（packaging-box-pricing-2026 / packaging-box-price-2026）+ CSV 回源
