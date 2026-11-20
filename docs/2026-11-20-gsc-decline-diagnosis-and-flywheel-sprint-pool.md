# 2026-11-20 GSC「热度下降」诊断 + 三语冲刺池主 URL 定版（周复盘输入）

> 日期：2026-11-20（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 触发：K3 11-20 指令（六张 GSC 截图：热度下降清单 / 同人指南页 drill-down / 商家 brand 重复残留）+「重点做行业大词和带钱大词排名首页的飞轮提升」
> 上游 SSoT：`重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md`（七车道/两周窗/判定规则）、`docs/2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md`（飞轮判据）、`.hermes/logs/flywheel-learning-ledger.json`（实验账本）
> 性质：测量、诊断与冲刺池定版；**本轮未修改 `src/`，未 commit／push**。

数据来源：
- GSC 原始档：`GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-19.xlsx`（28d 滚动窗 10-20..11-16）与 2026-11-16 档（10-17..11-13），openpyxl 逐行提取「网页」「查询数」sheet。
- K3 截图（GSC 数据洞见-热度下降 / 效果-比较 / 商家信息-brand 重复），对比口径 = 相邻两个 28 天窗（月环比 MoM）。
- 词级证据：`.hermes/logs/gsc-2026-11-19-money-keyword-delta.json`（23+ 词 × 8 次导出序列，openpyxl＋pandas 双方法已于 11-19 对账 `reconciliation_all_match=true`）。
- 线上实测：live fetch `zprintpro.com/zh-hk/product/premium-greeting-cards/`（2026-11-20，JSON-LD 全块解析）。
- git 历史：`git log -S` 标题串溯源。
校准状态：已校准至 11-19 导出 + 11-20 线上实测。
测量红线：query／page 为独立聚合表，不联接；MoM 与滚动窗不混用；缺行 = NO_CURRENT_BASELINE。

---

## 1. 核心结论：热度下降 = 月环比强基线效应，位次其实守住了

把截图（MoM 点击差）与 11-19 导出（滚动 28d 现状）对照后，20 个「热度下降」页面的**当前位次几乎全部持平或改善**。逐页分解（clk/imp/CTR%/pos，11-19 导出）：

| 页面 | MoM 点击Δ(截图) | 当前滚动28d clk/imp/ctr/pos | 位次判定 |
|---|---|---|---|
| /zh-hk/blog/doujin-circle-printing-guide | -9 (−43%) | 12/285/4.21%/**5.74** | 页1上部，位次 6.00→5.74 改善 |
| /zh-hk/product/a2-posters | -8 (−31%) | 18/825/2.18%/**12.98** | 位次 13.52→12.98 改善；近 3 日点击 17→18 |
| /zh-hk/blog/poster-printing-guide | -6 (−35%) | 11/1194/0.92%/10.86 | 位次 ~11，展示量 1194 极高、CTR<1%（snippet 层问题） |
| /en/（en 首页） | -5 (−63%) | 3/253/1.19%/8.43 | 低位点击基量小 |
| /zh-hk/product/foil-stickers | -5 (−63%) | 3/74/4.05%/12.78 | 位次 12.11→12.78 微退 |
| /zh-hk/product/doujinshi-printing | -4 (−100%) | 0/49/0%/**10.37** | **展示 38→49 (+29%)、位次 9.0→10.4，近页 1 零点击** |
| /zh-hk/product/foil-wedding-invitations | -4 (−80%) | 1/24/4.17%/5.83 | 位次稳 |
| /zh-hk/product/fruit-food-label-stickers | -4 (−100%) | 0/13/0%/44.62 | 位次 55.07→44.62 大幅改善，仍深位 |
| /zh-hk/product/saddle-stitch-booklets | -4 (−100%) | 0/395/0%/37.76 | 展示 379→395 增，深位 |
| /en/category/stickers | -3 (−60%) | 1/55/1.82%/14.22 | 位次 14.68→14.22 改善 |
| /en/product/doujinshi-printing | -3 (−43%) | 4/198/2.02%/8.06 | 页 1，稳 |
| /ja/category/packaging | -3 (−75%) | 2/102/1.96%/31.79 | 位次 30.58→31.79 微退，深位 |
| /ja/product/fluorescent-stickers | -3 (−100%) | 0/5/0%/9.2 | 样本 5 imp，方差层不判读（§2.1 纪律） |
| /zh-hk/blog/hotel-keycard-sleeve-printing-guide | -3 (−100%) | 0/11/0%/4.73 | 位次 4.73 不变、11 imp 零点击（小样本） |
| /（根 URL） | -2 (−100%) | 0/16/0%/3.69 | 根 URL 仅 16 imp，非真实流量入口 |
| /en/blog/company-intro | -2 (−100%) | 0/31/0%/11.26 | 位次 10.44→11.26 微退 |
| /en/product/a5-flyers | -2 (−100%) | 0/46/0%/9.96 | 位次 10.28→9.96 改善 |
| /ja/product/large-red-packets | -2 (−100%) | 0/8/0%/9.0 | 8 imp 小样本 |
| /ja/product/saddle-stitch-booklets | -2 (−67%) | 1/424/0.24%/61.87 | **展示 348→424 (+22%)，位次 61.9 深位** |
| /zh-hk/blog/book-buying-guide | -2 (−100%) | 0/479/0%/36.73 | 深位 |

**判定**：
1. 不是排名塌方——塌的是「上月（9 月中—10 月中）的季节强基线」（C109/Comiket 备货季与 9 月批次动作叠加）；11-19 导出的全站 28d 仍是量增（展示 +1,529、点击 +10）、CTR/位次微退（2.06%→1.99%、14.68→14.95），与 11-19 战略文档 §0.2 一致。
2. 11-08 / 11-13 / 11-18 三批单变量实验仍在判定窗内（账本稀释表：11-21 导出 → 7d 100% 可判；12-04 → 28d 82% 可判）。当前状态 = `EFFECTIVE_PENDING`，**不评价赢输、不叠加第二变量**（硬规则 single_variable / 决策窗）。
3. 唯一两个「位次稳定但 CTR 减半」的页面：同人指南（见 §2）与 en 首页——属 snippet/SERP 层，先取证再动。

## 2. 截图 4/5 修正：过滤页是同人指南，不是首页

K3 截图 4 的过滤条件显示 12 点击/284 展示/CTR 4.2%/pos 5.6——与 `/zh-hk/blog/doujin-circle-printing-guide/` 的 xlsx 行（12/285/4.21%/5.74）逐项吻合，**不是首页**。真实首页现状（11-19 导出）：

| 首页 | clk/imp/ctr/pos |
|---|---|
| /zh-hk/ | 60/1488/4.03%/12.64 |
| /en/ | 3/253/1.19%/8.43 |
| /ja/ | 4/22/18.18%/4.18 |
| /（根） | 0/16/0%/3.69 |

同人簇真实承接格局（滚动 28d）：**指南页 pos 5.74 页1上部截流**（12 点击，CTR 4.21%）、zh PDP pos 10.37（0 点击/49 展示，展示 +29%）、en PDP pos 8.06（4 点击）、ja PDP pos 14.43（4 点击）。
- 指南页 title 自 2026-09-04（commit f5d50092）未再改动 → MoM CTR 8.7%→4.2% **非我方 title 引起**，指向 SERP 竞争加剧（备货季）或查询构成变化。
- 动作：weekly 保存 `同人誌印刷 / 同人誌 印刷` 真实 SERP；zh 同人簇**主承接 URL 裁决材料**（指南 vs PDP）整理后呈 K3（precedent：11-08 海报/喜帖主承接由 K3 拍板）。在裁决前不改两页任何字段。

## 3. 商家信息「brand 重复」残留：已实证清零，无需改代码

- GSC：验证已通过（2026/11/14→11/15），受影响项目从峰值 ~76（10/19-11/02）降至 **1**；示例 URL 上次抓取 **2026-11-02**（早于 11-13/11-14 修复部署）。
- 线上实测（2026-11-20）：premium-greeting-cards 页 7 个 JSON-LD 块中 **brand 恰 1 处**（`{"@type":"Brand","name":"ZprintPro",...}`），原始 HTML `"brand":` 亦仅 1 处。
- **判定 = 旧抓取样例残留，等 Google 重抓自动清零，不添加变量、不重写 schema。** 复核点：11-28 周复盘时确认归零；若届时仍 >0 再查该 URL 的其他出口（merchant feed）。

## 4. 带钱词／行业大词 board（23+ 词池，11-19 导出）

| 层 | 词 | imp/clk/pos（11-19） | 方向 | 说明 |
|---|---|---|---|---|
| 页1·有点击（保护） | 即日印刷 | 55/2/8.58 | STABLE | 保即日条件真值 |
| 页1·零点击（最大机会） | **食品包裝印刷** | 125/0/7.93 | STABLE(-0.32) | 11-18 meta 修复在窗；11-25 导出判破零 |
| 页1·零点击 | small batch sticker printing | 13/0/8.92 | WORSE(+1.4) | 11-13 真值修复在窗，en 簇恶化始于 11-10 窗（早于修复） |
| 页1·零点击（小样本） | 书籍印刷 / 印刷廠 / 卒アル販売 | 5／1／1 imp | — | 不包装成突破 |
| 近首页·改善中 | 學校印刷 16.89(-3.18)、摺頁印刷 18.66(-2.26)、貼紙印刷 29.94(-2.64)、月曆印刷 20.4(-1.34)、包裝盒印刷 30.29(-1.35)、印刷公司 25.9(-1.02)、a2印刷 11.2(-1.0) | — | BETTER | **无部署变更的自然漂移，只记录不 SCALE** |
| 近首页·稳定候选（冲刺池） | 可移貼紙 12.62(71)、doujinshi printing 11.22(59)、pvc シール 14.38(26)、catalog printing china 15.57(37)、印海報 16.81(104)、香港印刷 12.18(34/2clk) | — | STABLE | 主 URL 定版见 §5 |
| 恶化·实验在窗（禁新变量） | 海報印刷 20.37(+2.13)、china catalog printing 14.99(+1.01)、宣傳單張 39.39(+1.3)、書刊印刷 35.45(+1.62)、禮盒訂製 47.86(+1.33)、教材 印刷製本 43.95(+3.95)、コミケ 印刷 30.49(+3.12) | — | WORSE | 等 11-21/11-25 判定窗出 FIX/HOLD/STOP |
| 季节 | 利是封印刷 24.27、月曆印刷 20.4、年賀状/2027年賀状 NO_CURRENT_BASELINE | — | — | 用既有承接页；年賀状等 12 月新导出再决策 |

## 5. 冲刺池主 URL 定版（今日退出标准：每簇一个 owner／主 URL／baseline）

| 簇 | 主承接 URL | baseline（11-19 导出） | owner／下一步 |
|---|---|---|---|
| 食品包装 zh | /zh-hk/blog/food-packaging-printing-guide/（页1 pos 7.21，2/330）；PDP food-boxes pos 23.3 辅助 | weekly：等 11-25 复测 agenda3 meta 修复 → 未破零则 SERP 取证 → snippet 单变量提案（WAITING_K3） |
| small batch en | /en/category/stickers/（14.22）＋既有 PDP 承接事实 | weekly：真值修复复测 11-21；snippet 提案维持 WAITING_K3 |
| doujinshi en | /en/product/doujinshi-printing/（页1 8.06，4clk） | GSC：11-21 复测；采购路径完整性核查（文件/页数/装订/数量/打样/交付） |
| doujinshi zh | 指南 5.74 vs PDP 10.37 双页并存 | **主承接裁决材料 → WAITING_K3**（不自主拍板）；裁决前双页禁改 |
| catalog en | /en/product/catalog-printing/（20.3） | GSC：EXP-1109 复测 11-21；不因窗口改善直接 SCALE |
| ステッカー小ロット ja | /ja/category/stickers/（pos 7.1，10 imp）＋防水/材质 PDP | daily+GSC：数量/材质梯度真值核对（有真值才写，无真值只写报价条件） |
| 教材 ja | ja 教材承接页（PDP/blog 分工由 lane 核 slug） | GSC：EXP-1108-JA-TEXTBOOK-PRICE 复测 11-21；语言质量 + 旧真值清扫 |
| コミケ ja | /ja/product/doujinshi-printing/（14.43） | ja owner：活动信息与采购词分开；官方日期未核实不写（EXP-1108 do_not_touch 继续有效） |
| 可移貼紙 zh | removable PDP（slug 由 lane 核对后回填） | daily+GSC：采购差距清单（11-22 作战表项） |

## 6. 飞轮执行队列（lane 可消费；每项单变量＋审批门＋复测日）

| # | 动作 | owner | 变量 | 审批门 | 复测/判定 |
|---|---|---|---|---|---|
| A | 11-21 导出 = 11-08 批七实验判定级 7d 复测（flyers 价格真值 / poster 主URL收敛 / wedding 主URL / ja doujin 单位 / ja textbook / en a2 / catalog）——**本周最高优先** | ZP-gsc-feedback | 无（纯测量） | 无 | 7d 100% → 账本 verdict 迁移 |
| B | 同人簇 zh SERP 取证（同人誌印刷/同人誌 印刷）+ 主承接裁决材料 | ZP-weekly-meta | 无 | 材料呈 K3 | 11-23 前完成取证 |
| C | 食品包裝印刷 11-25 导出复测 agenda3 meta 修复；未破零 → SERP → 单变量提案 | ZP-weekly-meta | 无（先测量） | snippet 提案须 K3 | 11-25 / 12-04 |
| D | small batch 11-21 复测（真值修复后 7d） | ZP-gsc-feedback | 无 | — | 11-21 / 11-27 / 12-04 |
| E | 商家 brand 残留观察（零动作） | k3-review | 无 | — | 11-28 复核归零 |
| F | 恶化词（教材/コミケ/宣傳單張/海報印刷）诊断分流 | ZP-gsc-feedback | 无 | 禁批量 title（11-19 doc §12.4） | 随 A/B 窗口 |

**禁止清单（重申账本硬规则）**：已部署实验页 title/canonical/301 冻结；无 READY 不产文；低展示词（<15 imp）不作单点因果；不因 MoM 下降回滚未判定实验；GSC 数据不进客户可见内容（§0.23.1）。

## 7. SOP-10 五问自检

1. 架构差异：已核 11-08/11-09/11-13/11-18 各实验实现路径（git -S 溯源 + 账本），未与既有变量混淆。
2. 约束范围：不触 title 冻结域/贺卡资产/301；stickers-en 商业口径 4 处残留仍归 K3/weekly-meta，本报告未动。
3. 数据来源：全部 GSC 数字可溯源至 11-19 导出 xlsx + delta JSON + 本轮 openpyxl 提取脚本（`.hermes/tmp/gsc-20261120-decompose.py`、`-pass2.py`）+ live fetch；双方法（截图 MoM × 导出滚动窗）交叉。
4. 字段值策略：未批价格/MOQ/交期一律不写新值；主 URL 裁决不越权。
5. Markdown 渲染：内部文档，无 user-facing 渲染改动。

## 8. 已执行与未执行

已执行：协同板生成器刷新（`build-coordination-board.py --date 2026-11-20`：47 任务，READY GSC 9/weekly 1/Blog 4/k3 1，gsc_available=true）+ `lane-status.mjs` 重算（今日四 lane PENDING 属正常日间状态；blog-deepfix MISSING 自 11-14、monthly UNKNOWN 移交 watchdog 关注）+ 本诊断文档。
未执行：`src/` 零改动（无 READY 授权 + 实验在窗）；未跑 lane wrapper；未动调度配置。
