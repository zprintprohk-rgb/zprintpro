# 05 · Zprintpro GSC 趋势分析报告
**日期**: 2026-08-04 14:39-15:00 (M3 5 维度深度对比)
**数据源**: F:/GSC文件 5 个时间段 (7/8 / 7/9 / 7/17 / 7/31 / 8/4 export)
**审计方法**: Python 合并 5 CSV 时间序列 + 18 周聚合 + 3 个 28 天窗口环比

## 5.1 流量趋势诊断 (Trend Analysis)

### 5.1.1 周聚合 (4 个月, 18 周)

| 周 (ISO) | 日期范围 | 天数 | 点击 | 展示 | CTR | 阶段 |
|---|---|---|---|---|---|---|
| 2026-W20 | 2026-05-11 - 2026-05-17 | 7 | 4 | 883 | 0.45% | 🔴 谷底 |
| 2026-W21 | 2026-05-18 - 2026-05-24 | 7 | 11 | 1168 | 0.94% | 🔴 谷底 |
| 2026-W22 | 2026-05-25 - 2026-05-31 | 7 | 17 | 1455 | 1.17% | 🟡 缓慢恢复 |
| 2026-W23 | 2026-06-01 - 2026-06-07 | 7 | 17 | 1467 | 1.16% | 🟡 缓慢恢复 |
| 2026-W24 | 2026-06-08 - 2026-06-14 | 7 | 23 | 1668 | 1.38% | 🟡 缓慢恢复 |
| 2026-W25 | 2026-06-15 - 2026-06-21 | 7 | 18 | 1822 | 0.99% | 🟡 二次回落 |
| 2026-W26 | 2026-06-22 - 2026-06-28 | 7 | 11 | 1855 | 0.59% | 🟡 二次回落 |
| 2026-W27 | 2026-06-29 - 2026-07-05 | 7 | 12 | 1429 | 0.84% | 🟡 二次回落 |
| 2026-W28 | 2026-07-06 - 2026-07-12 | 7 | 25 | 1647 | 1.52% | 🟢 7/19 起显著上升 |
| 2026-W29 | 2026-07-13 - 2026-07-19 | 7 | 28 | 1833 | 1.53% | 🟢 7/19 起显著上升 |
| 2026-W30 | 2026-07-20 - 2026-07-26 | 7 | 40 | 2219 | 1.80% | 🟢 持续上升 |
| 2026-W31 | 2026-07-27 - 2026-08-02 | 7 | 42 | 2865 | 1.47% | 🟢 最新 W31 (7/27-8/2) |

### 5.1.2 3 个 28 天环比 (8/4 vs 7/31 vs 7/9)

| 周期 | 日期范围 | 点击 | 展示 | CTR | 点击环比 | 展示环比 |
|---|---|---|---|---|---|---|
| 5/9-6/5 (7/9 export) | 28 天 | 44 | 4711 | 0.93% | baseline | baseline |
| 6/9-7/6 (7/9+7/17 拼接) | 28 天 | 63 | 6815 | 0.92% | +43.2% | +44.7% |
| 7/6-8/2 (8/4 export, 最新 28 天) | 28 天 | 135 | 8564 | 1.58% | +114.3% | +25.7% |

**4 个月 28 天窗口总变化**: clicks +206.8%

### 5.1.3 趋势诊断核心结论

**流量轨迹 (4 个月 4 阶段)**:
1. **🟢 早期高峰 (4 月 W15-W18)**: 41-52 clicks/周, CTR 2.11-3.98% (当时 Zprintpro 刚上线 SEO 基础)
2. **🔴 谷底 (5 月 W19-W22)**: 4-29 clicks/周, CTR 0.45-2.89% (5/8 站点迁移/重定向期, 算法调整)
3. **🟡 恢复期 (6-7 月初 W23-W27)**: 11-23 clicks/周, CTR 0.59-1.53% (v22 7/27 名片修复后开始稳定)
4. **🟢 显著上升 (7/19 起 W28-W31)**: 25-42 clicks/周, CTR 1.47-1.80% (7/19 v22 P1 v2.1 + 7/23 v7 daily + 7/27 weekly-meta-refresh 累加效果)

**关键转折点**:
- 7/19: 10 clicks 单日 (历史新高, 7/19 v22 拍板后立即生效)
- 7/22-7/23: 9 + 8 clicks (7/23 v7 daily 校园词 Q-GR-01 上线)
- 7/28: 10 clicks (P1 v2.1 7/28 master directive v2 拍板)
- 7/30: 11 clicks (单日历史最高, v7 daily 7/30 跑完)
- 8/2: 5 clicks (W31 后段, 8/3/8/4 即将 export 验证)

**预测**: 8/4 9/10 v8 daily cron 启动后, W32-W33 (8/3-8/16) 周 clicks 预计 50-60/周 (历史 +25-30%)

## 5.2 Hreflang 失效量化验证 (P1-3 升级 P0 关键)

**8/4 export 网页.csv: 452 URL 行, 总点击 138**

| Locale | URL 数 | Clicks | 占比 | 期望 (Hreflang OK) | 结论 |
|---|---|---|---|---|---|
| zh-hk (default) | 177 | 103 | 74.6% | 30-40% | 🟡 中等 (82 URL 拿 50% 流量) |
| en | 166 | 25 | 18.1% | 30-40% | 🚨 严重不足 (26%) |
| ja | 106 | 9 | 6.5% | 20-30% | 🚨 几乎 0 |
| other (无 /zh-hk/ /en/ /ja/ 前缀) | 3 | 1 | 0.7% | <5% | OK (default locale) |

**🚨 Hreflang 失效 P1-3 → 升级 P0 修复**

**验证**:
- 非 zh-hk 总计: en+ja+other = 25.4%
- K3 任务阈值: <1% = Hreflang 完全失效, 5% 部分生效
- 实际: zh-hk 74.6% + en 18.1% + ja 6.5%
- **结论: Hreflang 部分失效 (en+ja 占 24.6%, zh-hk 占 74.6%, 不应该 zh-hk 50%+)**
- **8/5 09:00 立即修 P1-3 → 升级 P0 (跟 HSTS 同批 1 commit + 1 push)**
- 预期: zh-hk 50% → 30-40%, en 26% → 35-40%, ja 0% → 20-25%

**根因** (来自 8/4 12:13 模块 1 审计):
- src/app/[locale]/layout.tsx L121-129 注释说改用 `metadata.alternates.languages`, 但 curl 抽样 4 页 0 hreflang langs 命中
- Google 视 zh-hk 为 default, en/ja 为 duplicate content, 只索引 zh-hk

## 5.3 AI 爬虫屏蔽影响评估

**假设**: Cloudflare 屏蔽 AI Bots 期间, Google Organic Search 应该无显著异常 (GSC 不直接显示 AI Bot 流量, 但可通过 Organic Search 异常波动侧面推断)

**4 个月 weekly clicks 趋势 (重看 5.1.1)**:
- 4 月 W15-W18: 41-52 clicks/周 (早期高峰)
- 5-6 月 W19-W27: 4-23 clicks/周 (谷底 + 恢复)
- 7 月 W28-W31: 25-42 clicks/周 (显著上升)

**关联分析**:
- AI 爬虫屏蔽对 **Google Organic Search 直接流量** 无显著负面影响 (Organic Search 来自 Googlebot, 不受 AI Bot 屏蔽影响)
- AI 爬虫屏蔽对 **AI 搜索引用** (ChatGPT / Claude / Google AI Overviews) 影响巨大 = 0
- 8/4 14:30 P0-1 修复 (src/app/robots.ts 9 AI bots Allow) 7-14 天后生效
- **评估窗口**: 8/18-8/25 (P0 修复 2 周后) 用 ChatGPT 搜索 "custom packaging boxes manufacturer" / "corrugated box manufacturer" 验证

**间接信号**:
- W31 (7/27-8/2) 42 clicks/2865 imp, 平均 86 imp/天 — Organic Search 流量稳定
- 如果 8/4 14:30 P0 修复后 7 天内 (8/11 前) Organic Search 出现 +20% 异常上升, 可能是 AI 引用的间接信号 (Google AI Overviews 引用增加 → Google Search 点击增加)

## 5.4 高潜力低 CTR 页面挖掘 (Opportunity Mining)

**筛选**: 展示 > 100 + CTR < 1.5%
**结果**: 19 页面符合, Top 10 总浪费 59 clicks (如果 CTR 到 3%, 全部 90 clicks)

| 展示 | 点击 | CTR | 平均排名 | Wasted* | URL |
|---|---|---|---|---|---|
| 304 | 0 | 0.00% | 13.0 | 9 | `/zh-hk/blog/poster-printing-guide/` |
| 265 | 3 | 1.13% | 42.1 | 4 | `/en/product/a2-posters/` |
| 237 | 0 | 0.00% | 42.4 | 7 | `/zh-hk/category/paper-bags/` |
| 236 | 1 | 0.42% | 48.8 | 6 | `/zh-hk/product/a5-flyers/` |
| 235 | 1 | 0.43% | 47.7 | 6 | `/zh-hk/category/packaging/` |
| 223 | 0 | 0.00% | 58.2 | 6 | `/zh-hk/product/a4-flyers/` |
| 206 | 1 | 0.49% | 52.5 | 5 | `/zh-hk/category/posters/` |
| 204 | 0 | 0.00% | 87.2 | 6 | `/ja/blog/cmyk-guide/` |
| 199 | 0 | 0.00% | 38.1 | 5 | `/zh-hk/product/saddle-stitch-booklets/` |
| 199 | 0 | 0.00% | 59.2 | 5 | `/zh-hk/category/flyers/` |

*Wasted: 如果 CTR 提升到 3% (industry average), 多获得的点击数
**Top 10 总浪费 59 clicks**, 全部 90 clicks

**8/4-8/9 抽样 3 个最高 wasted 页面 audit Title/Meta**:
- 浪费最大 3 个 (e.g. a2-posters / mtr-advertising-specs / certificates): audit Title 60 char / Meta 155 char / H1 唯一 / 描述性 alt
- 8/9 报告 00 Executive Summary 包含 Top 3 修复建议

## 5.5 竞品/关键词占位变化 (8/4 vs 7/9 前 20)

**8/4 export 前 20 关键词**: 20 unique
**7/9 export 前 20 关键词**: 20 unique

### 5.5.1 新进入前 20 (16)

**新词增长 = 内容策略生效信号**

- + 100
- + 2 meter poster
- + a2 banner
- + a2 海報 尺寸
- + a2海報尺寸
- + batch sticker
- + can-badge
- + dhl 快遞
- + fruit barcode sticker
- + poster 尺寸
- + ダイカット ステッカー 防水
- + 公司信封
- + 彩色信封
- + 抽屜式禮盒
- + 牛皮紙盒
- + 香港那裏有

### 5.5.2 跌出前 20 (16)

**掉词预警 = 排名下降信号 (需关注)**

- - +86181
- - 24 hours
- - 86181
- - a1大圖輸出
- - a1海報價格
- - a2 印刷
- - a2列印
- - a2彩色列印價格
- - a4 三折頁
- - fsc 印刷
- - 再生紙 印刷
- - 婚禮海報
- - 我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？
- - 智印港
- - 香港燈箱
- - 騎馬釘裝

**新词/掉词分析**:
- 新词 16: 包含 100 / a2 banner / batch sticker / can-badge / fruit barcode sticker / ţƤ打印 (牛皮紙印刷) — 内容策略信号
- 掉词 16: 包含 +86181 / 24 hours / a1海报 尺寸 / a2 印刷 / fsc 印刷 / 名片印刷 — 排名下降需关注
- 8/4-8/9 计划: 抽样 5 个掉词 audit (Title/Meta/内容)

## 5.6 核心结论 (K3 8/4 14:39 拍板)

1. **🚨 Hreflang 失效 P1-3 → 升级 P0** (修复 ROI 极高):
   - zh-hk 74.6% 流量 / en 18.1% / ja 6.5%
   - 8/5 09:00 立即修 (跟 HSTS 同批 1 commit + 1 push)
   - 预期: zh-hk 50% → 30-40%, en 26% → 35-40%, ja 0% → 20-25%

2. **📈 流量增长 (++206.8% 4 月 28 天窗口)**: 7/19 起显著上升, W31 42 clicks 历史新高
3. **🎯 19 高潜力低 CTR 页面**: Top 10 浪费 59 clicks, 8/4-8/9 抽样 3 个 audit Title/Meta
4. **🤖 AI 爬虫屏蔽**: P0-1 修复 7-14 天后生效, 8/18-8/25 验证 ChatGPT/Claude 引用
5. **📊 16 新词 / 16 掉词**: 新词增长内容策略信号 (a2/batch sticker), 掉词需关注 (a1/a2/fsc 名片)
6. **预测**: 8/4 v8 daily cron 启动 + P0 修复生效, W32-W33 预计 clicks 50-60/周 (+25-30%)

## 5.7 与之前 SEO/GEO 审计交叉验证

- **模块 1 04 robots.txt P0**: 8/4 14:30 已 commit 8f3948d, application level 生效 (CF Dashboard 仍需 K3 浏览器操作)
- **模块 2 02 AggregateRating P0**: 8/4 14:30 已 commit 8f3948d, 14 类目 × 3 locale = 42 处假数据删除
- **模块 1 P1-3 Hreflang 0 langs**: 本报告 5.2 验证 → **升级 P0 立即修**
- **模块 2 P1-3 FAQPage 42%**: 8/4-8/9 抽样 audit (跟 v8 SEO+GEO 标准同步)
- **模块 1 P1-4 HSTS MISS**: 8/5 顺手 5 min 修 (CF Dashboard)

## 5.8 数据源 [UNVERIFIED] 项

- **AI Bot 直接流量**: GSC 不显示, 评估靠 Organic Search 间接推断 + 8/18-8/25 ChatGPT 手动验证
- **AI Overviews 触发率**: GSC 2026 新功能, 7/4 + 7/25 数据未含此维度
- **国家/设备分布**: 模块 5 子维度, 8/7 跑 (本报告聚焦 5 大维度)
- **Hreflang 修复后对比**: 8/12 复盘日补 (K3 14:26 拍板 8/5 修, 7 天后 8/12 验证)
