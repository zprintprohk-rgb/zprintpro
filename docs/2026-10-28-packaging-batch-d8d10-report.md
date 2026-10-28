# D8-D10 en（P1-EN-01 supplier 近首页冲刺）执行报告

> 日期：2026-10-28（原排 11-03—05，按「指令按最优推荐执行」提前落位）
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §9 PKG-P1-EN-01

## 0. 数据来源行（§0.23）

- 价格/MOQ：`src/data/products.ts` electronics（basePrice_en=1.84、minQuantity=200，L6204-6210）/ food（basePrice_en=0.74、minQuantity=100）
- 目标词：策略 §9 P1-EN-01（`electronics packaging supplier`、`food packaging supplier`，GSC 各 5 展示实证）
- 门禁：title-v5 HARD=7（存量）/ tsc 54=54 / brand 0 / gsc 0

## 一、交付（commit `8d34982e`，2 files 9+/9-）

| 项 | 改动 |
|---|---|
| en electronics title | `Electronics Packaging Box | From $1.84` → **`Electronics Packaging Supplier | From $1.84 | ZprintPro`**（当量 55，$1.84=basePrice_en ✓） |
| en electronics h1 | → `Electronics Packaging Supplier | Custom Boxes from $1.84 | ZprintPro` |
| en electronics desc | 语病修复 `from ZprintPro the US` → `supplier for US brands`；**MOQ 100→200**（products.ts 真值；原 100 错误）+ EVA 内衬/CMYK/DHL 2-4 日 |
| en electronics keywords | `electronics packaging supplier` 置首 + 去 `free shipping`/`USD` 变体 |
| en electronics body | 新增 **Supplier checklist 段**：①结构/内衬（EVA/吸塑/纸浆 ≤0.5mm 公差）②打样（1h 免费数码 + 3D 渲染）③QC（出货前尺寸/颜色/压线检查）④交期起算（文件确认后，标准 4 工作日 + DHL 2-4 天美国）；报价所需信息 |
| en food title | → **`Food Packaging Supplier | 100 MOQ from $0.74 | ZprintPro`**（当量 57，$0.74=basePrice_en ✓；原 title 无 supplier 词） |
| en food keywords | `food packaging supplier` 置首 |
| en food body | 新增 **Supplier checklist 段**：①食品接触边界（直接接触 PE/PLA 内层、间接接触食品级纸+油墨）②合规文件（按单提供材料说明，非市场认证替代）③打样 ④交期起算；报价所需信息 |
| products-content anti-static | `meet electronics protection standards` → `available for static-sensitive components (confirm at order time)`（ESD 断言弱化，P1-EN-01 禁虚构 ESD） |

## 二、验收（草案 §验收）

- ✅ 每个 supplier 声明后有可核验规格（checklist 段含结构/公差/打样/QC/交期/报价所需）
- ✅ 采购 CTA 不要求客户重复提供页面已给信息（checklist 末尾「share box dimensions, quantity, material...」= 页面未含的参数）
- ✅ 无虚构 ESD/ISTA/FDA/跌落/耐重/美国本地交付（anti-static 弱化；美国 4 天 = 业务证据口径保留）
- ✅ title-v5：两 title 当量 55/57 带内 + PRICE 对照真值（1.84/0.74）
- ⏳ GSC 复核 11-23：两者各 5 展示（必须同时看展示量避免只看平均位置）

## 三、执行教训

- **TS 源码 body 字符串换行**：模板字符串 `\n` 是真实换行符 → 写盘断字符串（tsc 54→2097）；必须 `\\n`（v1-v3 踩坑，v4 修好）
- **title-v5 PRICE 对照**：en title 价格必须对照 `basePrice_en`（food $2.50→$0.74），HARD 7→8→7
- **块内定位**：全站 en 模板结尾（`Get an instant quote...` 23 处）非唯一 → `repInBlock`（slug 块内 indexOf）

## 四、下一批

- D11-D12 rigid（P1-JA-02）：ja rigid-boxes 贴り箱/リジッドボックス 自然术语修复 + 规格表
- push 记录：`8d34982e` 待 09:43 窗口（与 5d655016 组件清毒 + docs 批3 报告同批）
