# GSC 反馈环日志 · 2026-09-08 (v7 新执行层首次运行)

> **cron**: gsc-feedback-loop 22:43 Asia/Shanghai (autoclaw / deepseek hermes 承接, M3 已出局 K3 9/8 05:58 拍板)
> **任务**: ① matrix priority_boost 回灌 (T1-T4) ② 零点击高展示 / CTR 异常 / striking(pos 5-20) 清单更新 ③④ 校准日判定

```
数据来源:
- GSC数据/gsc-fresh-2026-09-03.json (canonical, K3 9/3 15:22 上传 16 xlsx = 3 站点 × 4 窗口 + 4 汇总, 校准 2026-09-03T15:25+08:00)
- .hermes/industry-keyword-matrix.json (回写目标, 本次 commit 同步)
- K3 拍板: §2 词价值分层 T1-T4 (8/30 12:37) / §3 带钱词地图 v1 (8/30) / §0.0 名片终裁 (9/8 01:15) / v4 §5.1 校准排期 (9/8 主报告)
校准状态: 已校准 (canonical 9/3 15:25, STALE 5d > 72h 门限, 待 9/10 校准窗口刷新)
撤回声明: 7d 全站 CTR = 0.54% (9/3 官方口径实测 0.005437); 旧 0.79% 已撤回, 本报告禁用
```

## 0. 校准日判定 (③④ 不触发)

2026-09-08 **非校准日**。v4 §5.1 排期: **9/10** = Pillar 收录验证 + §2.3 九篇抓取状态表补齐 + BC 旧 URL 404 清零复核; **9/12-13** = 8/30 批验证窗判定 (同口径导出 + CTR 前后对比)。本次仅执行 ①②, ③④ 由 9/10 cron 承接。当前处 8/30 批验证窗内 (9/5-9/12), title/keywords 只读, **本次零改文案**。

## 1. 全站口径核对 (canonical 9/3, 实测值)

| 窗口 | clicks | imps | CTR | 加权 pos | 词数 |
|------|--------|------|-----|---------|------|
| 24h | 3 | 387 | 0.78% | 25.11 | 195 |
| 7d | 12 | 2,207 | **0.54%** | 29.94 | 534 |
| 28d | 41 | 7,618 | 0.54% | 34.62 | 1,000 |
| 3m | 65 | 17,129 | 0.38% | 38.41 | 1,000 |

分 locale 7d: hk 11/1,380/0.80% · en 1/416/0.24% · ja 0/145/0.00%。en/ja 新生儿 (~45 天, §0.30 B6) 有曝光即正向, CTR<3% 正常起步, 不判恐慌。

## 2. 词价值分层回灌 (priority_boost 变更, §2 规则 + B5 数据来源)

| queue ID | slug | 旧 | 新 | GSC 证据 (7d canonical 9/3) |
|----------|------|----|----|------------------------------|
| Q-P1-02 | restaurant-menu-printing-guide | 1 | **3** | 餐牌印刷 18 imp / pos 12.39 / 0 click → T1 窗 (5-15 速赢); 28d pos 15.27 同窗 |
| Q-P1-01 | retail-poster-printing-guide | 1 | **2** | 海報印刷 43 imp / pos 17.79 / 0 click = 全站零点击头号词 → T2 窗 (16-30) |
| Q-P1-03 | lai-see-packet-printing-guide | 1 | **2** | 利是封印刷 22 imp / pos 27.32 / 0 click → T2 窗 + R5 季节军令 (W7 9/30 08:00 必发) |
| Q-P2-03 | doujin-circle-printing-guide | 2 | 2 (维持) | doujinshi printing en 9 imp / pos 17.11 striking; ja 同人誌印刷 7d 0 展示 (新生儿正常) |

维持: Q-005 boost=2 (直接对应词 7d 无新展示证据)。B7 W3 月曆 boost=4 维持 — **月曆印刷 7d 32 imp pos 18.16 + 月歷印刷 15 imp pos 16.53, 28d 月曆印刷 138 imp 1 click, R5 9/15 硬截止, 明日 9/9 W3 窗口开启, daily-content 必发**。

**名片 3 词剔除 (§0.0 终裁登记)**: 名片印刷 / business card printing / 名刺印刷 激安 — 原带钱词地图 v1 "业务子类目豁免" 3 词正式剔除, 永不入 queue/title/内容; 旧名片 URL 唯一形态 = 301/308 → greeting-cards (9/8 42d897b2 已修 404 回归, 9/10 校准复核清零)。

## 3. 零点击高展示词 (7d clicks=0 & imps≥10)

### zh-hk (47 词, Top 15)

| 词 | 7d imp | 7d pos | 28d imp / pos | 处置 |
|----|--------|--------|---------------|------|
| 海報印刷 | 43 | 17.79 | 133 / 25.59 | striking 头号, B7 W4 (9/16-9/22) 已排 |
| 食品包裝印刷 | 38 | 5.29 | 109 / 16.57 | pos 升但 0 点击 → CTR 修复轨; D8 blog 12 段已升级 (f8c194a0) |
| 貼紙印刷 | 37 | 29.24 | 133 / 35.14 | T2 培育窗, 类页 meta refresh (weekly-meta) |
| 宣傳單張印刷 | 36 | 29.53 | 137 / 29.31 | T2 培育窗 |
| 月曆印刷 | 32 | 18.16 | 138 / 19.76 | **R5 军令, 明日 W3 必发** |
| 宣傳單張 | 31 | 36.42 | 135 / 36.80 | T3 攻坚窗 |
| 印海報 | 29 | 23.38 | 123 / 26.30 | 与 海報印刷 同簇, W4 协同 |
| 條碼紙 | 29 | 42.62 | 29 / 42.62 | 未覆盖, labels 相邻, 待 K3 拍板立项 |
| a6 尺寸 | 26 | 7.38 | 29 / 7.69 | pos 7.4 零点击 → CTR 修复轨; AEO 尺寸表资产 (W7 addendum ⑤) 承接 |
| 車身廣告 | 26 | 46.62 | 60 / 49.23 | 疑似超经营范围, 仅记录不行动 |
| 貼紙 | 24 | 42.79 | — | 泛词 T4, 博客捕词 |
| 利是封印刷 | 22 | 27.32 | 57 / 30.39 | R5 季节, Q-P1-03 已提 boost=2 |
| 紙袋印刷 | 19 | 12.53 | — | T1 窗, B7 W3 紙袋趨勢已覆盖 |
| 餐牌印刷 | 18 | 12.39 | — | T1 窗, Q-P1-02 已提 boost=3 |
| 貼紙設計 | 18 | 13.94 | — | T1 窗, 设计意图词, 与 sticker 类目协同 |

### en (7 词)

| 词 | 7d imp | 7d pos | 28d imp / pos |
|----|--------|--------|---------------|
| small batch label printing | 25 | 26.76 | 72 / 43.81 |
| small batch sticker printing | 23 | 8.04 | 53 / 11.64 |
| china catalog printing | 18 | 17.00 | 64 / 18.58 (1 click) |
| catalog printing china | 15 | 20.73 | 40 / 20.65 |
| small quantity label printing | 14 | 58.57 | — |
| calendar sizes | 10 | 42.40 | — |
| custom foil stickers | 10 | 53.20 | — |

en 差异化主线确认: china catalog printing + catalog printing china + catalogue printing china 三变体 7d 合计 40 imp (T2 窗 17-21), 承接 D12, "Factory-direct from Shenzhen" 口径 (K3 9/2 en 指南 v2)。

### ja (1 词)

両面カラー印刷 13 imp / pos 39.46 (28d 65 imp / 29.57) — ja 最大流量词, T3 攻坚窗, 新生儿期正常。

## 4. CTR 异常词 (7d)

**负向异常 (pos≤10 & imp≥8 & CTR=0)** — CTR 修复轨优先队列:

| locale | 词 | imp | pos | 备注 |
|--------|----|-----|-----|------|
| hk | 食品包裝印刷 | 38 | 5.29 | pos 5.3 且 38 imp 0 点击 = 全站头号 CTR 异常; 8/30 title 批验证窗内只读, 9/12-13 判定 |
| hk | a6 尺寸 | 26 | 7.38 | 尺寸词 SERP 意图或为快速答案, AEO 尺寸对照表承接 |
| hk | 珠光紙 | 14 | 1.00 | **pos 1.0 且 0 点击 (7d+28d 同) = 极端异常**, 疑 SERP 特征吃掉点击或词-页错配, 列入 9/12 判定复核 |
| hk | 防水貼紙 | 14 | 7.57 | Pillar 2 主题词, 28d pos 15.31 |
| hk | 即日印刷 | 13 | 7.85 | W1 即日急件 blog 已发 (B7), 观察窗内 |
| hk | 邊度有紙袋買 | 11 | 7.45 | 问句词, AEO 快速答案块机会 |
| en | small batch sticker printing | 23 | 8.04 | en 头号, D11 承接页 stickers 类目, 验证窗内只读 |
| en | fluorescent stickers | 8 | 6.88 | 利基词, 无独立落地页, 评估进 sticker 变体内容 |

**正向异常 (CTR≥20% & imp≥3)**: 信封印刷 5 imp CTR 20% · 智印港 4 imp 4 click CTR 100% (品牌词健康) · poster printing 3 imp CTR 33.3%。

## 5. Striking distance 清单 (7d pos 5-20, imps≥5)

- **zh-hk 33 词** (Top: 海報印刷 43/17.8 · 食品包裝印刷 38/5.3 · 月曆印刷 32/18.2 · a6 尺寸 26/7.4 · 紙袋印刷 19/12.5 · 餐牌印刷 18/12.4 · 貼紙設計 18/13.9 · 騎馬釘印刷 18/14.7 · 戶外貼紙 18/14.8 · 騎馬釘 17/19.2 · 訂做紙袋 16/16.9 · 月歷印刷 15/16.5 · 防水貼紙 14/7.6 · 印刷紙袋 14/13.3 · 海報與印刷 14/16.9 · 即日印刷 13/7.9 · 食品包裝訂製 13/13.6 · 邊度有紙袋買 11/7.5 · 小冊子印刷 11/10.7 · 可移貼紙 10/16.0)
- **en 8 词** (small batch sticker printing 23/8.0 · china catalog printing 18/17.0 · doujinshi printing 9/17.1 · fluorescent stickers 8/6.9 · z print 8/12.3 · small batch stickers 7/6.4 · catalogue printing china 7/17.7 · small batch custom stickers 6/10.5)
- **ja 1 词** (pvc シール 8/18.5; 28d 19 imp / 19.79)

全量清单已落 `industry-keyword-matrix.json → gsc_feedback_2026_09_08.striking_distance_7d_pos5_20`。

## 6. 词-选题对账 (B7 覆盖检查, 不自主加 queue 防撞 B7 拍板排期)

| 高价值词 | 覆盖状态 |
|----------|----------|
| 海報印刷 43 imp | ✅ B7 W4 poster 印刷 (9/16-9/22) |
| 月曆印刷 + 月歷印刷 47 imp | ✅ B7 W3 (明日 9/9 开启, R5 9/15 硬截止) |
| 紙袋簇 (紙袋印刷/訂做紙袋/邊度有紙袋買/印刷紙袋 60 imp) | ✅ B7 W3 紙袋趨勢 |
| small batch label printing 25 imp | ✅ Q-P1-04 在 queue (boost=1, 28d pos 43.81 弱化, 观察) |
| 條碼紙 29 imp | ❌ 未覆盖 → 待 K3 拍板立项 (labels 相邻品类) |
| 車身廣告 26 imp | ❌ 疑似超经营范围, 仅记录 |
| 騎馬釘印刷 + 騎馬釘 35 imp | ❌ 未覆盖 → 建议 Q4 评估 (与教材/同人誌装订簇协同) |

## 7. 给下游 cron 的建议 (仅建议, 不越权改 src)

1. **daily-content (21:17)**: 明日 9/9 = B7 W3 窗口开启, 月曆印刷 2027 訂製時間表 (slug: 2027-calendar-printing-timetable) 必发, R5 军令; Q-P1-02 餐牌印刷 (boost=3) 为下一候选。
2. **weekly-meta (周五 23:07)**: T2 培育窗词 (貼紙印刷 29.24 / 宣傳單張印刷 29.53 / 貼紙訂製 24.09 / china catalog printing 17.00) 类目页 meta refresh 覆盖, 验证窗内仅白名单新词。
3. **9/10 校准 cron**: Pillar 收录验证 + §2.3 抓取状态表补齐 + BC 旧 URL 404 清零复核 + 同口径导出; 珠光紙 pos 1.0 零点击列入 URL Inspection 复核。
4. **撞墙升级候选 (K3 拍板)**: 條碼紙立项 / 騎馬釘装订簇 Q4 评估 / 車身廣告 排除确认。

## 8. 验收与边界

- 写权限: 仅 `.hermes/industry-keyword-matrix.json` + 本日志 (T2 cron 治理合规, 零 src 改动, 零文案改动)
- 数据边界 (§0.30 B9): 全部为 zprintpro.com 新站属性, 无老站对比基线
- 数据时效: canonical 9/3 已 STALE 5d (>72h 门限), 结论供 9/10 校准前过渡使用, 9/10 校准后全部重判
- 门童: check-encoding --fix + tsc --noEmit 本次执行 (数据/脚本改动验收); src 零改动故 build 闸门不触发
