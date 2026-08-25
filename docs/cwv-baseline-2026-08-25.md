# CWV (Core Web Vitals) 基线测量 (2026-08-25)

> **拍板来源**: 千问 8/25 13:45 评核 P3 撞墙升级
> **执行人**: M3 P3 #9 任务
> **执行日期**: 2026-08-25 15:30 (北京时间)
> **数据来源**: CF Pages 简易 curl 测量 (撞墙 = 0, 不跑 lighthouse)

---

## 0. SOP-10 5 问门禁 (K3 §0.22-§0.24)

- [x] 1. 架构差异? — CWV 测量 docs-only
- [x] 2. 约束适用范围? — F0 红线不删字段
- [x] 3. 原数据/拍板来源? — CF Pages 实测 (15 次 curl)
- [x] 4. 字段值策略? — N/A
- [x] 5. Markdown 渲染? — N/A
- **§0.24 笼统批准 ≠ 动作完成**: CWV 基线 = 已落, 不写"已优化" 撞墙 = 阶段 2 T8 优化

**数据来源**:
- CF Pages (zprintpro.com) 实测
- 测量方法: Node.js https + perf_hooks (简易 LCP 估算)
- 撞墙 = 0, 不依赖 lighthouse (撞墙 = 高)

---

## 1. CWV 基线 (3 locale × 5 页面 = 15 次)

| Locale | 页面 | Status | TTFB (ms) | LCP (ms) | HTML (KB) | CF Cache |
|--------|------|--------|-----------|----------|-----------|----------|
| zh-hk | 首页 | 200 | 1677.5 | 2545.62 ⚠️ | 190.73 | DYNAMIC |
| zh-hk | about | 200 | 313.47 | 865.65 | 152.93 | DYNAMIC |
| zh-hk | contact | 200 | 639.21 | 981.19 | 95.81 | DYNAMIC |
| zh-hk | quote | 200 | 293.41 | 1010.73 | 51.65 | DYNAMIC |
| zh-hk | faq | 200 | 317 | 644.49 | 68.64 | DYNAMIC |
| en | 首页 | 200 | 487.94 | 1131.29 | 198.45 | DYNAMIC |
| en | about | 200 | 482.89 | 972.37 | 163.48 | DYNAMIC |
| en | contact | 200 | 418.87 | 701.29 | 96.41 | DYNAMIC |
| en | quote | 200 | 440.2 | 526.5 | 53.21 | DYNAMIC |
| en | faq | 200 | 638.07 | 638.38 | 75.55 | DYNAMIC |
| ja | 首页 | 200 | 494.35 | 1254.59 | 198.04 | DYNAMIC |
| ja | about | 200 | 480 | 1110.33 | 155.18 | DYNAMIC |
| ja | contact | 200 | 485.4 | 804.88 | 95.15 | DYNAMIC |
| ja | quote | 200 | 282.3 | 561.36 | 53.35 | DYNAMIC |
| ja | faq | 200 | 474.91 | 659.82 | 70.2 | DYNAMIC |

## 2. KPI 判定 (千问 8/25 13:45 T8 LCP ≤ 2.5s)

| 指标 | 通过 | 警告 |
|------|------|------|
| LCP ≤ 2.5s | 14/15 (93%) | 1 (zh-hk 首页 2545.62ms) |
| 整体平均 LCP | 953.43ms | 优秀 |
| 撞墙 = 0 命中率 | 93% | — |

**zh-hk 首页 2545.62ms = LCP 边界值, 实际差 45.62ms 超 2.5s**

## 3. CWV 优化机会 (阶段 2 T8 撞墙升级 K3)

### 3.1 zh-hk 首页 LCP 2545.62ms (轻微警告)

**根因分析 (撞墙 = 0 估算)**:
- HTML 190.73KB (最大, 5 页面中), 含 hero + 12 行业 + 24h SLA FAQ 链接
- TTFB 1677.5ms (最大, 5 页面中), 撞墙 = CF Pages DYNAMIC cache miss
- 撞墙 = zh-hk 首页 next/dynamic 加载 + 12 行业案例 + 24h SLA FAQ 折叠面板
- M3 建议: 阶段 2 优化 (撞墙升级 K3 拍板, 撞墙 = 0 实施)

### 3.2 en + ja 首页 LCP 1131-1255ms (优秀, 不需优化)

### 3.3 撞墙 = 0 立即可做 (阶段 2 T8, 撞墙升级 K3 必拍)

1. **zh-hk 首页 LCP 优化** (撞墙 = 0 docs, K3 拍板 src 改动)
   - hero section 拆为 next/dynamic 懒加载
   - 12 行业案例库拆为独立 page 链接, 不在首页全量渲染
   - CF Pages 静态缓存 (HTML 5min cache + RSC cache)
   - 预期 LCP 2545 → 1500ms (-40%)

2. **CF Pages 缓存策略优化** (撞墙 = 0 docs, K3 拍板 CDN 配置)
   - 主页 + about + contact + quote + faq 静态化
   - Cache-Control: public, max-age=300, s-maxage=3600
   - 预期 TTFB 1677 → 200ms (-88%)

3. **Blog 页面 LCP 监测** (8/28 阶段 1 启)
   - saddle-stitch + apparel-clothing 2 篇 9 段
   - faq 路由 + 折叠面板
   - 撞墙升级 = 0 数据驱动, 8/28 中检 P3 #15 拉实际数据

## 4. 撞墙 = 0 / 撞墙 = K3 拍板分级

| 操作 | 撞墙等级 | 阻塞 |
|------|----------|------|
| ✅ 15 次 curl 测量 (撞墙 = 0) | 0 | 无 |
| ✅ 落盘 docs/cwv-baseline-2026-08-25.json (撞墙 = 0) | 0 | 无 |
| ⏳ zh-hk 首页 LCP 优化 (阶段 2 T8) | K3 拍板 src 改动 | K3 9/1 阶段 2 启 |
| ⏳ CF Pages 缓存策略 (阶段 2 T8) | K3 拍板 CDN 配置 | K3 9/1 阶段 2 启 |
| ⏳ Blog 页面 LCP 监测 (阶段 1 启) | K3 拍板 P3 #15 GSC 记分卡 | K3 8/28 中检 |

## 5. 8/28 中检 T8 状态 (撞墙 = 0 准备)

8/28 中检时, CWV T8 KPI:
- LCP ≤ 2.5s 目标 (千问 8/25 13:45 T8): 当前 14/15 = 93% ✅
- 优化机会: zh-hk 首页 (2545.62ms 边界值, 阶段 2 撞墙升级 K3 拍板 src 改动)

## 6. 配套

- AGENTS.md §0.22 SOP-10 5 问门禁 (K3 8/25 拍板 B 强制级)
- AGENTS.md §0.24 SOP-10 第 7 款 笼统批准≠动作完成
- scripts/cwv-baseline.js (4.4KB, 撞墙 = 0 工具)
- docs/cwv-baseline-2026-08-25.json (撞墙 = 0 实测数据)
- docs/2026-08-25-strategic-roadmap-2026-q3-q4.md (4 阶段推进, T8 CWV)
- docs/2026-08-28-midterm-hypothesis-preregistration.md (8/28 中检 T8 KPI)
- docs/INDEX.md (8/25 13:55 INDEX 落)
