# summary-s3 — GEO 第 4 轮（2026-11-24 18:05-18:41 · S2 窗口末日补跑）

> 数据来源: 本目录 s2-c1..c7-aio-r3/r4 ×14 + s3-q08..q12-aio ×5（19/19 完成）· 固定条件见 R4-RUN-SHEET.md
> 执行偏差: 原定 11:00-11:45 窗因唤醒器死亡错过（shell 0xC0000142 族故障，与 13:37 车道同族）；本场地 18:05-18:41 补跑，与 r2=11:14 的时间-of-day 可比性受限——**跨场对比只取方向，不取绝对值**（kit §六）
> 红线遵守: 全部数据只进 .hermes/geo/；未改任何 src；C7 只入台账

## 一、7 簇 × AIO 矩阵（r3/r4 = 11-24；r1/r2 = 11-21 对照）

| 簇 | r3 | r4 | 当日稳定? | r2 对照 | 方向判定 |
|---|---|---|---|---|---|
| C1 食品包裝 zh | 无AIO | 无AIO | ✓ | AIO 触发×2 且 ZP 被引 | **不稳定**（4 跑 2:2）；AIO 引用面本日不可判 |
| C2 同人誌 en | 无AIO | 无AIO | ✓ | AIO#1+organic#1 ×2 | **不稳定**（AIO 2:2）；organic #1→#3 滑位信号 |
| C3 月曆 zh | 无AIO | 无AIO | ✓ | chip AMBIGUOUS | chip 本场 0/2；AMBIGUOUS 维持 |
| C4 紙袋 zh | 无AIO | 无AIO | ✓ | 无×2 | 稳定零 |
| C5 ja 同人誌 | 无AIO | 无AIO | ✓ | 无×2 | 稳定零 |
| C6 ja 食品 | 无AIO | 无AIO | ✓ | 无×2 | 稳定零 |
| C7 年賀状 ja | 无AIO | 无AIO | ✓ | 无×2 | 稳定零（监控专用） |

**核心背景判定**: 本日 19/19 跑 AIO 全部未触发（r2 至少 C1/C2/C3 有触发）——当日 session 的 SERP 组装整体不含 AI Overviews。该变量使「AI 引用位次」维度本日整体不可判（无样本）；organic 层判读不受影响。假说：AIO 触发率随 session/时段/Google 侧灰度波动——下场探针须先跑 C2 单跑验证 AIO 是否回归，再决定是否全套跑。

## 二、organic 防守位（本日有效层）

| 簇/问 | ZP 位次 | 证据 |
|---|---|---|
| C1 食品包裝 | **#5 ×2 稳定** | 食品包裝印刷完全指南（FAQ 摘要抽取健康：100 個起印 HK$2.5 起/個） |
| C2 同人誌 en | **#3 ×2**（r2 曾 #1） | doujinshi-printing PDP——滑位信号，11-28 复测窗确认 |
| C3 月曆 | 混合块可见（精确位次不可靠） | 月曆印刷攻略 blog；本地包+Print100 FB 压顶 |
| Q09 catalog en | **#2** | catalog-printing-china 服务页（压 ChinaBookPrinter/Chinaprinting4u） |
| Q11 教材 zh | **#3** | 教科書印刷・教材印刷指南（直答式摘要完整抽取） |
| Q10 smallbatch en | **前 10 缺席** | vs GSC 28d pos 8.57——漂移信号，11-28 判定窗必查（不作单日因果） |
| Q08 海報 zh | web 缺席；**图片包有 A1 大幅海報** | e-banner「特快急件即日交貨」专页占即日意图 |
| Q12 ステッカー | 缺席 | Bynock 貼紙訂製全攻略 + E-print 終極指南占位；竞品 50張起訂钩子 |

## 三、三向边缘结论

- **E1（C1 旧名）**: AIO 缺席无标签样本；有机面品牌=「智印港」×2 干净。B1 实体归一（Kompass/GBP）紧迫性维持但未见新增 AI 面旧名固化证据（本日 AIO 无样本）
- **E2（C2 防守位）**: 本场两跑失守（无 AIO + organic #3）；与 bf9e35b5（02:41 doujin 宽表面上线）因果不可分（时间相邻），如实记录不归因；11-28 GEO 复测为判定点
- **E3（C3 chip）**: 本场 0/2（AIO 缺席即无 chip）；AMBIGUOUS 判定维持不翻案

## 四、🚨 伴随发现（非探针目标，须入 K3 视野）

1. **「¥7,500」公开可见于 en SERP 摘要**（doujinshi-printing PDP，两跑复现）——k3-review P0 的 doujin 价格/币种问题已从页面层烧到搜索摘要层；D1 拍板紧迫性升级
2. **简体「满 HK$300免运费」出现在 en PDP SERP 摘要**（两跑复现）——en 页语言泄漏（promo/merchant annotation 层），§13.16.1 繁体铁律 + en 单品牌层双红线
3. **en 页 SERP 标题品牌后缀=「智印港」**（doujin PDP「10 MOQ 智印港」+ catalog service「DHL 2-4 Days 智印港」两页复现）——假说 A: §0.39 实体统一名「ZprintPro智印港」（WebSite/Organization schema）被 Google 截断；假说 B: 页面 title 实值即智印港。**冻结面不动**，meta title 解冻窗核对 CSV c7 + WebSite schema 后判
4. **Q09 ZP 摘要含「ISO 9001 + FSC 認證」「慳30-40%」**——门童 #1 CRED_ISO_9001 口径张力 + 无来源百分比；登记 k3-review 审计 lane 处置，不擅改
5. **纸袋簇需求=現貨批发导向**（chips: 深水埗/灣仔現貨/Muji）；**年賀状=消费级垄断**（TOLOT 162円/郵便局官方）——均与既定不投资判断一致，无新动作

## 五、下一场探针约定（11-28 窗）

1. 开场先跑 C2 单跑验证 AIO 触发是否回归（回归才跑全套；仍无 AIO 则只记 organic 层）
2. 12 固定问题已冻结（kit §三 7 条 + §7.3 五问 verbatim 见 R4-RUN-SHEET.md）；S3 场命名沿用 s3-q08..q12 + s2-c*-aio-r5/r6
3. 11-28 判定窗三件: C2 organic 位次复测 + small batch live 位次 vs GSC 复核 + en 品牌后缀假说核对（title 解冻窗同场）
