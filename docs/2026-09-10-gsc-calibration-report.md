# GSC 校准报告 · 2026-09-10 (v4 §5.1 校准日)

> **任务**: gsc-feedback-loop cron (92141523, 22:43 → 延迟至 9/11 03:01 手动触发)
> **执行层**: zprintpro autoclaw v1.2 (deepseek hermes 承接)
> **校准日判定**: 2026-09-10 = v4 §5.1 排期校准日 (Pillar 收录验证 + §2.3 抓取状态表补齐 + BC 词 URL 404 清零复核 + 同口径导出)
> **报告路径**: docs/2026-09-10-gsc-calibration-report.md (本文件)

```
数据来源:
- GSC数据/2026-09-10 xlsx 12 件 (24h/7d/28d × hk/en/ja/三站点汇总, 9/10 18:31-18:36 下载, 真总量口径)
- .hermes/hk28d-queries.json (78 词, 9/10 19:09 解析)
- .hermes/enja28d-queries.json (en 116 / ja 56, 9/10 23:43 解析)
- .hermes/industry-keyword-matrix.json (回灌目标, 9/9 22:53 版本 → 本次 +gsc_feedback_2026_09_10)
- .hermes/logs/2026-09-10-gsc-decision-data.md (9/10 18:51 决策数据日志)
- 9/10 title-audit 系列 (title-audit-final.json 等, 线上探针 99 SKU × 3 locale)
- git log 8/31-9/10 改动对照 (v9.2 模板全量上线 9/10)
校准状态: 本次 xlsx 真总量口径 (非 canonical Top100); canonical gsc-fresh-2026-09-03.json 仍 STALE 8d
撤回声明: 7d 全站 CTR 0.54% (9/3 官方口径) 仍有效; 旧 0.79% 已撤回禁用 (9/8 记录)
```

## 一、SOP-10 5 问门禁段

1. **架构差异**: 本次仅 data/matrix/docs 层 (`.hermes/industry-keyword-matrix.json` + docs 报告 + 脚本), **零 src 行为改动**, 无架构冲突
2. **约束适用**: 校准日工作 = v4 §5.1 排期内; 零改文案 (8/30 批验证窗 9/5-9/12 只读); 攒批 push per §0.25.9
3. **数据来源**: 见上 (全部实测值来自 9/10 xlsx 真总量 + 9/10 解析 JSON; 无估算填补)
4. **字段策略**: matrix 追加 `gsc_feedback_2026_09_10` 键 (幂等: 已存在则跳过), 不动旧 `gsc_feedback_2026_09_08`
5. **渲染**: 本报告为内部校准文档 (docs/), 非 user-facing

## 二、校准日三线执行 (v4 §5.1)

### 2.1 全站真总量 (28d 8/11-9/10, xlsx 真值)

| 市场 | clicks | imps | CTR | 加权 pos | 环比 9/3 基线 |
|------|--------|------|-----|---------|--------------|
| hk | 247 | 10,022 | 2.46% | 26.6 | +25 clicks / +1,512 imps / pos -1.8 |
| en | 19 | 3,925 | 0.48% | 43.6 | +5 / +524 / -4.4 |
| ja | 35 | 1,791 | 1.95% | 41.2 | +5 / +117 / -2.6 |
| **all** | **349** | **20,323** | **1.72%** | **31.3** | **+50 / +2,421 / -3.3** |

> 环比口径: 9/3 基线 (8/7-9/3) vs 今日 (8/14-9/10), 窗口不同含改版效应, 只读方向 (见 9/10 gsc-decision-data §8)

### 2.2 Pillar 收录验证 (校准日 §A1)

| Pillar | 收录状态 | 依据 |
|--------|---------|------|
| 包裝盒 (packaging-box-pricing-2026) | ✅ 在线 | 9/10 title-audit 线上探针 + 三语 sitemap 229 不变 |
| 防水貼紙 (sticker-material-pvc-vinyl-removable) | ✅ 在线 | 9/10 title-audit 线上探针 |
| 海報 (poster-printing-guide) | ✅ 在线 | 9/10 title-audit 线上探针 |
| 校園教育 (campus-education-printing-pillar-guide) | ✅ 在线 | 9/10 title-audit 线上探针 |
| 燙金 (foil-stamping-3-applications-2026) | ✅ 在线 | 9/10 title-audit 线上探针 |

### 2.3 抓取状态表补齐 (校准日 §A2)

| 检查项 | 状态 |
|--------|------|
| sitemap 三语 | 229 不变 (9/10 build 后), 无幽灵页 |
| BC 词 URL 404 清零 | 9/8 42d897b2 已修 404 回归, 本轮复核无新增 |
| 8/30 批 title 验证窗 | 9/5-9/12 只读, **9/12 判定日** 执行同口径导出 |
| v9.2 模板 (9/10 上线) | 新批次, **9/13 后才可判定** (title 冻结 2-4 周) |

### 2.4 同口径导出 (校准日 §A3)

- 9/10 导出 = 28d xlsx 真总量 (12 件) + 词级 JSON (hk78/en116/ja56), 已存 .hermes/
- **9/12 CTR 判定日**: 8/30 批 31 词 + food-boxes 3 locale, 按词对比 CTR 前后值写 seo-weekly-history.json (K3-0912 提醒 job b4fa582d 已排)

## 三、matrix 回灌结果 (gsc_feedback_2026_09_10)

### 3.1 零点击高展示词 (28d clicks=0 & imps≥10)

| locale | 词数 | Top 5 |
|--------|------|-------|
| hk | 72 | 海報印刷 161imp/25.1 / 貼紙印刷 153imp/31.2 / 食品包裝印刷 145imp/12.9 / 印海報 137imp/25.1 / 月曆印刷 132imp/19.3 |
| en | 27 | small batch label printing 78imp/36.7 / small batch sticker printing 56imp/9.4 / saddle stitch booklet 47imp/81.1 / custom foil stickers 46imp/52.9 / catalog printing china 39imp/19.2 |
| ja | 21 | コミケ 印刷 52imp/41.0 / 両面カラー印刷 48imp/36.8 / クラフト紙 パッケージ印刷 37imp/23.6 / クラフト紙 パッケージ 印刷 33imp/25.9 / pvc シール 25imp/18.3 |

### 3.2 Striking distance (28d pos 5-20, imps≥5)

| locale | 词数 | 代表词 |
|--------|------|--------|
| hk | 25 | 食品包裝印刷 12.9 / 月曆印刷 19.3 / 餐牌印刷 (T1) / 紙袋印刷 / 貼紙設計 |
| en | 23 | small batch sticker printing 9.4 / china catalog printing 17.2 / catalog printing china 19.2 / doujinshi printing 18.2 |
| ja | 2 | pvc シール 18.3 / クラフト紙 パッケージ印刷 23.6 (23.6 略超, 保留观察) |

### 3.3 CTR 异常 (pos≤10 & imps≥10 & clicks=0)

| locale | 词 | imp | pos | 判定 |
|--------|-----|-----|-----|------|
| hk | 食品包裝印刷 | 145 | 12.9 | pos 12.9 接近 T1 窗, 0 点击 → 9/12 判定日复核 |
| hk | a6 尺寸 | 88 | 8.7 | 尺寸词 SERP 意图, AEO 尺寸表资产承接 |
| hk | 即日印刷 | 28 | 8.3 | W1 即日 blog 已发, 观察窗内 |
| hk | 大信封 | 24 | 6.3 | 信封词 0 点击, 待 K3 拍板 (信封品类未覆盖) |
| en | small batch sticker printing | 56 | 9.4 | en 头号词, D11 承接页 stickers 类目, 验证窗内 |
| en | fluorescent stickers | 18 | 7.2 | 利基词, 无独立落地页 |

### 3.4 priority_boost 变更

**本次 0 变更 / 4 维持** (9/8 已把餐牌+3、利是封+2、海報+2、doujin 维持; 9/10 数据 pos 未突破分层阈值)。

| 维持项 | boost | 依据 |
|--------|-------|------|
| Q-P1-02 restaurant-menu-printing-guide | 3 | 餐牌印刷 T1 窗维持 |
| Q-P1-03 lai-see-packet-printing-guide | 2 | 利是封印刷 R5 季节军令 (W7 9/30 必发) |
| Q-P1-01 retail-poster-printing-guide | 2 | 海報印刷 28d 161imp pos 25.1 |
| Q-P2-03 doujin-circle-printing-guide | 2 | doujinshi printing en 18.2 / ja コミケ 印刷 41.0 |

## 四、9/12 判定日预排 (下轮)

1. 8/30 批 31 词 + food-boxes 3 locale: 同口径 GSC 导出, 按词对比 CTR 前后值 → seo-weekly-history.json
2. 仍 0 点击词 → title v2 清单, 9/13 放行
3. v9.2 模板 (9/10 上线) 首窗数据观察开始

## 五、边界与验收

- **边界**: 本次零 src 改动; 数据仅 matrix + docs; 未触发 build/tsc 门禁 (数据层)
- **验收**: check-encoding + tsc 本轮对 .mjs 脚本执行 (数据改动验证); matrix JSON 合法性已由 node parse 确认
- **撞增升级候选 (K3 拍板)**: 大信封 24imp pos6.3 零点击 (信封品类未覆盖); fluorescent stickers 无独立落地页


---

## 附: 9/11 凌晨实测复校补遗 (K3-0910 cron A5 执行层, 工具链实测而非仅 git 对照)

### ① 九篇重写 blog 线上可达性 27/27 = 200 (9 slug × 3 locale, HEAD 请求)

www 域 301 → 裸域规范化正常; GSC UI 逐条抓取状态仍需人工确认 (A5 交接项); IndexNow 27 URL 已补推 HTTP 200 (2026-09-11T03:30, 真 key 首次打通)

### ② BC 旧 URL 404 复校: 主体全绿 + 新发现 2 处残留断链 (已修 D-9/11-1)

| 检查项 | 结果 |
|--------|------|
| V22 6 SKU 落点 (premium/thick/foil/spot-uv/matte/rounded-corner-greeting-cards) × 3 locale | ✅ 200 (14/14 含 en/ja category) |
| `/{locale}/product/business-cards/` → category 承接 | ✅ 200 |
| `/{locale}/blog/business-card-buying-guide/` | ✅ 200 (落 /blog/greeting-card-buying-guide/) |
| 三语 sitemap business-card 残留 (本地+线上) | ✅ = 0 |
| `✗ /{locale}/product/business-card-buying-guide/` | **→ 404** (落点产品页不存在) |
| `✗ 裸/business-card-buying-guide/` | **→ 404** (无规则覆盖) |

→ 两处残留已于 next.config.js 修复 (product 旧路径改指 /blog/ 落点 + 裸路径兜底), 待 CF Pages 部署后复测归零

### ③ FAQ schema 收录抽检 (63af89ab): 渲染链+线上 6/6 全过

business-envelopes + wall-calendars × 3 locale: 均 200 + FAQPage JSON-LD 在位 + 4 问三语正确 + JSON 合法 (抽检子 agent 实测, 2026-09-10); Rich Results 全量抽检可在 GSC 上线后随巡检扩展
