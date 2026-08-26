# K3 指令 v3.9 · PDP 最高标准（PDS v1）+ 婚礼/贺卡全量收官 + 校园词统计（2026-08-21 中午）

> **K3 8/21 11:51 指令**：婚礼（喜帖/酒水牌/枱卡）+ 贺卡全部 SKU 详情页 + Blog 今天完成；SKU 详情页必须符合最高 SEO+GEO 标准、具备核心词进前 10 能力；内容完成后出生图提示词、补全图片；不一点点推进；旺季前夜抢时间。
> **现状诊断（K3 原话「裸奔」属实）**：12 婚礼 SKU + 6 贺卡 SKU 详情页 = 一段营销 description + 通用 tabs，无价格阶梯、无场景段、无 PAA FAQ 专配、无图。骨架组件（ProductTabs/FAQ/RelatedProducts）已有，**缺的是 PDS 内容数据层 + 专属区块**。

---

## 一、校园词拖欠统计（补上，GSC API 实测 8/14-8/20 vs 8/7-8/13）

**总体：20 个校园词在榜，排名集体从 25-50 区间向 10-25 区间移动，P3 校园 blog（8/14-17 上线）开始贡献 NEW 词。**

| 亮点 | 数据 |
|------|------|
| 🎯 畢業紀念冊香港 | pos **8.3**，**1 click**（首页 + 有点击，校园线旗舰词） |
| 🚀 exercise book printing | 19.3 → **10.7**（临门一脚进首页） |
| 🚀 exercise book printing business | 18.2 → **11.0** |
| 🚀 custom exercise book | 14.0 → **13.5** |
| 🆕 NEW 进榜 | 畢業紀念冊內頁設計 11.0 / school textbook printing 12.0 / customised exercise books 12.0 |
| 📈 school exercise book printing | 30.7 → 23.8（16 imps，量最大的校园词） |
| ⚠️ ja 教材集群 | 教材 印刷製本 50.9→52.7 imps 16→10，**量缩位滞**，ja 校园内容需加强 |
| P3 blog 页 | graduation-yearbook-printing-guide 4 imps（上线 1 周，索引爬坡中，正常） |

**判断**：校园线「een exercise book 三词组」（10.7/11.0/13.5）是**下一个一击三词集群**——educational 类目页 + exercise-book PDP 一次加强可能 3 词同进首页。优先级排在纸袋集群 A 之后、catalog 集群 B 并列。

## 二、PDS v1 · SKU 详情页最高 SEO+GEO 标准（14 段规范）

**每段对应排名/转化功能，验收逐条打勾：**

| # | 段落 | SEO/GEO 功能 | 硬指标 |
|---|------|-------------|--------|
| 1 | H1 = 核心词+规格卖点 | 排名主锚 | 含 targetKeywords 主词，≤60 字符 |
| 2 | **答案前置块**（40-60 字直答「是什么/多少钱起/多久到」） | GEO AIO 引用弹药（被引用 +120% 点击） | 首屏可见，数字开头 |
| 3 | 价格锚点块 | 转化 + 价格词排名 | 起价 + 3-6 档阶梯价表（table）+ MOQ |
| 4 | 规格表 | 长尾词命中（材质/尺寸词） | 材质/尺寸/工艺/印刷方式 4+ 字段 table |
| 5 | 场景段 | 行业词覆盖 | 3-5 场景各 1-2 句（婚礼 SKU = 酒楼/教堂/海外婚礼等） |
| 6 | 品质信号段 | B2B 信任 | Delta E ≤3 / ISO / 免费打样 |
| 7 | **专属 FAQ ≥4**（PAA 问题式，非通用集兜底） | PAA 占位 + FAQPage rich result | 问题含主词变体，答案 40-80 字 |
| 8 | 内链 ≥5 | 权重传导 | 类目页 1 + 相关 SKU 2 + 相关博客 1 + /quote/ 1 |
| 9 | CTA 三件套 | 询盘转化 | 30 秒报价 / WhatsApp / 免费打样 |
| 10 | Schema 四件 | rich results | Product + Offer（price/priceCurrency）+ FAQPage + BreadcrumbList |
| 11 | **图片 ≥3**（主图/细节/场景，4:3 1200×900 ≥180KB） | 视觉转化 + image search | 无图不上线（v3.7 SKU v2 条款 1） |
| 12 | targetKeywords 登记 | 词排名追踪 | 1 主词 + 2-3 长尾写入数据层 |
| 13 | Last updated 时间戳 | freshness 信号 | 页面渲染可见 |
| 14 | 3 locale 本地化 | §13.10 铁律 | 禁机翻残留地区词，禁 supplier origin 塞标题，品牌词 智印港/ZprintPro/ジープリント 不漂移 |

**验收 checklist（每 SKU ×3 locale）**：build PASS → 3 locale 200 → 主词命中 grep → schema 校验（Rich Results Test 0 错）→ 内链全 200 → 禁词 grep（名片/咭片误用/智印印港/觀塘）→ IndexNow ping。

## 三、执行方案（今天 8/21 + 周末 8/22-23，M3 行动指令）

### 架构决策（先定再动手）
PDP 内容数据层：products.ts 每 SKU 增加 `pds` 对象（pricingTiers[] / scenarios[] / faqSlug / targetKeywords[] / updatedAt），组件层新建 `ProductPDS.tsx` 渲染第 2/3/5/6/13 段（FAQ 走现有 product-faqs.ts 扩展专属集，schema 走现有生成器扩展 Offer.price）。**一次架构投入，全站 99 SKU 复用。**

### 时间线
| 时段 | 任务 | 产出 |
|------|------|------|
| **8/21 下午** | ① ProductPDS 组件 + products.ts pds 字段架构 ② 婚礼 12 SKU（WI-001~006 + PC-001~006）pds 数据 ×3 locale ③ 婚礼专属 FAQ 集（12 SKU × 4 问 ×3 locale） | 1 push |
| **8/21 晚** | 贺卡 greeting-cards 6 SKU pds ×3 locale + 校园 exercise-book 三词集群加强（PDP+类目） | 1 push |
| **8/22** | ① 婚礼 2 篇博客（en cost guide + zh-hk 枱卡指南，§13.4 v3 标准）② 全站 P0 类目（stickers/flyers/packaging/paper-bags）核心 SKU pds 补齐 ③ 纸袋集群 A 类目 Pillar 加厚 | 1-2 push |
| **8/23** | ① 全站剩余 SKU pds 补齐 ② 婚礼/贺卡 18 SKU 生图提示词（V22 婚礼场景模块：烫金质感/整套 flat lay/HK 酒楼 vs US 花园）③ 内链三角收尾 + IndexNow 全量 | 1 push |
| **8/24** | K3 给 ARK_API_KEY 后：V22 批量生图（婚礼 49 张优先 → 贺卡 → 全站补缺）→ 图上线 push | 1 push |
| **8/26** | **全效果验收日**：GSC 周快照 + 100 词池 rank + 婚礼词 imps 首读 + 22 词/五件套 CTR 验证 | 0 push |

### K3 依赖（仅 2 件）
1. 今晚 21:12 窗口：008 SQL + CF env + D4 7/10（~27 min）
2. ARK_API_KEY（2 min，火山方舟控制台）——决定 8/24 图像批次能否开跑

## 四、目标分解（小目标 → 大目标）

| 小目标 | 截止 | 验收 |
|--------|------|------|
| 婚礼+贺卡 18 SKU PDS 全绿 | 8/23 | 14 段 checklist 逐页 PASS |
| 纸袋集群 A 4 词进首页 | 8/31 | GSC pos ≤10 |
| 校园 exercise book 3 词进首页 | 8/31 | 同上 |
| 婚礼词 imps 破 0 | 8/26 | GSC 出现喜帖/wedding 词 |
| 核心词首个 top10（候选：紙袋印刷 12.0 / 月曆印刷 18.4） | 9/15 | GSC |
| 30% 首页词（修订口径：核心 3 + 次核心 10 + 长尾 60 保持） | 11/16 M3 | 100 词池周快照 |

---

*Mavis / K3 核心大脑 · 2026-08-21 12:0x · 本地落盘不 push，M3 按 §三时间线执行。*
