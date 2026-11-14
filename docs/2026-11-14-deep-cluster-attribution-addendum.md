# 2026-11-14 增补 · 深位词簇承接归因（貼紙/宣傳單張/書刊/包裝）+ 数据面检查

> 日期：2026-11-14 16:0x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：`2026-11-14-coordinated-seo-aeo-geo-flywheel.md` §2.2（深位词先承接诊断）· `2026-11-13-three-market-seo-aeo-geo-two-week-flywheel.md` §3.1
> 性质：测量（PROPOSE_ONLY）；承接数据为 09-30..10-27 query×page×country（hkg），非今日联接。

## 〇、一句话结论

**深位词簇承接归因补齐：貼紙印刷 3 路分流（category 38% + 两 blog）、書刊印刷 blog/类目近平分（92 vs 90 imp，blog 位次更高 30 vs 55）、宣傳單張/包裝簇高度集中于交易页（flyers category 78-82%、packaging category 96-98%）。包裝簇杠杆 = 交易页采购要素与真值（pos 30-34），不建近似包装文；貼紙/書刊为 11-21 承接份额复测的观察对象。数据面：GSC 最新仍 11-12 三档，11-13 导出未到——今晚 gsc 20:13 若无新档将再次 NO_NEW_BATCH。**

## 一、深位词簇承接归因（09-30..10-27 hkg）

| 词簇（28d 11-12 值） | 承接分布 | 判定 |
|---|---|---|
| 貼紙印刷 136@34.35 | category/stickers 80@39.52（38%）+ sticker-guide 66@55.64 + sticker-buying-guide 62@71.21 | **3 路分流**；CT-D2 真值任务（STICKER-ZH-TRUTH-CONFLICT）与 11-21 份额复测观察；不建泛贴纸文 |
| 宣傳單張 136@36.46 | category/flyers 106@32.71（**82% 集中**）+ a4-flyers 16@13.81 | 交易页集中；11-08 价格修正复测窗；强化 flyers 主页转化模块 |
| 宣傳單張印刷 126@28.17 | category/flyers 98@28.84（**78%**）+ a4-flyers 20@57.85 | 同上 |
| 書刊印刷 129@33.74 | book-buying-guide 92@30.41 + category/books 90@55.08（**近平分**） | **blog 位次更高（30 vs 55）**——与海报 blog 抢头同型；主 URL 待 11-21 query×page 复测后定，不凭位置改页 |
| 紙盒印刷 56@36.38 | category/packaging 42@33.62（63%）+ kraft PDP 23@52.13 | 类目主承接 |
| 包裝盒印刷 52@32.08 | category/packaging 52@32.04（**96%**） | **高度集中**；杠杆=交易页采购要素与真值 |
| 包裝盒訂製 56@34.45 | category/packaging 45@31.60（**96%**） | 同上 |
| 紙盒訂製 54@32.19 | category/packaging 45@30.38（**98%**） | 同上 |

**含义**：
1. 包裝簇（4 词合计 208 imp）全部集中 category/packaging（pos 30-34）→ 按 §3.1「先完成包装商业真值裁决，再选一个盒型采购路径实验」，不动 canonical/301、不建多篇近似包装文；采购 UX 六项（尺寸/数量/MOQ/材质/文件/报价/交付）为杠杆。
2. 貼紙印刷 3 路分流 + 書刊印刷 blog 领先类目——两条「承接分流」观察，11-21 同基线复测份额；blog 不抢交易主词（§0.35.3 口径），主 URL 决策门保持。
3. 宣傳單張簇已集中交易页，剩余为「页内转化模块 + 摘要」问题，非承接问题。

## 二、数据面检查

- `GSC数据/` 最新 = 11-12 三档（24h/7d/28d，22:40-22:47 落地）；**11-13 导出未到**（k3 11-13 NEXT 曾指示 gsc 用 11-13 新导出）。
- 今晚 gsc 20:13：若无 11-13 档 → 再次 `NO_NEW_BATCH`（72h 越限）；detector 第 11 日缺失；3mo 缺第 5 批。需 K3 今日补导。

## 三、给今晚车道的支持（不抢动作）

- **gsc 20:13**：若 K3 已补 11-13 档则消费（重验 A53 previous_*/current_* 键）；无档则 NO_NEW_BATCH 如实登记，不造数。
- **daily 21:17**：按协同板取下一个 READY 真值任务（catalog residual / 五分类真值 / zh sticker 真值冲突）；包裝簇锚点见 §一（category/packaging 集中）。
- **blog 23:47**：海报 bounded task（poster-guide D1/D6，锚点见 11:33 报告）；貼紙/書刊不写新文。
- **调度**：S4U canary 仍未应用（watchdog 仍 Interactive/Result=2147946720）；今晚触发仍依赖会话常驻，若缺跑按四方对账记录并升级管理员。

## 四、数据来源与边界

- `GSC数据/money-kw-query-page-country-2026-10-31.csv`（hkg 页级归因）· `.hermes/logs/gsc-2026-11-12-money-keyword-delta.json`（28d 值）· `GSC数据/` 文件清单 · `Get-ScheduledTask`（调度未变）。
- 零 `src/`、零线上改动、零队列/调度翻转；分流观察只登记不改 canonical/301；11-21 复测为份额判定点。

（本报告落 `docs/`，同步副本 `重要文件/`。）
