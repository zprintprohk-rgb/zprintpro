# §8 站点地图 K3 后台 5 min 真人操作指引 (2026-08-26)

> **拍板来源**: K3 8/26 04:10 `.hermes/logs/2026-08-26-下一阶段战略-k3.md` §8
> **性质**: K3 真人时间操作指引, M3 不能代为执行
> **数据来源**: 4 cron SSoT (.hermes/cron-prompts/k3-v3-addendum-2026-08-23.md) + K3 8/26 §2/§6 + GSC 8/24 14:30 527 词分层
> **撞墙状态**: 🔴 撞墙 = K3 真人时间 (5 min 窗口, 不需 K3 拍板, 是 K3 真人操作)
> **验收**: K3 操作后 ping M3 "done", M3 用 5 步真 verify 验 (curl 200 + sitemap status "成功" + "已发现 URL" 数无异常下跌)

---

## 0 · 核心结论 (≤30 字)

**不重交 sitemap**, GSC 后台"请求编入索引" 10 个核心 URL 是 5 min 最有效动作。

---

## 1 · 不要做什么 (K3 8/26 §8 拍板)

### ❌ 不需要手动重交 sitemap-index.xml

**3 条依据**:

1. **sitemap 每次构建自动 regen** (8/25 04da70f 实证 6 文件 lastmod 自动更新)
2. **T39 IndexNow 自动化 8/28 启动后**, 新 URL 自动推送 Bing/索引
3. **Google 对已在 GSC 注册的 sitemap-index.xml 会自动重抓**, 重复提交**不**增加抓取配额 (Google 按站点权重分配抓取预算, 不按提交次数)

**误判成本**: 重交 sitemap-index.xml 浪费 K3 时间 + GSC 配额 = 0 收益。

---

## 2 · 做什么 (5 min 真人操作)

### ✅ GSC 后台 "请求编入索引" 10 个核心 URL

**操作路径** (K3 浏览器):
1. GSC → zprintpro.com → 网址检查 (URL Inspection)
2. 输入 URL → Enter → 等"URL 已编入 Google 索引"或"URL 已在 Google 索引中"
3. 点击"**请求编入索引**" 按钮 → 等"已请求编入索引"
4. 重复 10 次, 每 URL ~30s = **5 min 总耗时**

**为什么有效**:
- 直接触发 Googlebot 单 URL 抓取, 比重交 sitemap 有效
- 加速本月核心改动 (G1 index 页 + striking 1 梯队 + 月曆 SKU) 收录
- 配合 8/28 IndexNow 自动化, 效果叠加

---

## 3 · 10 个核心 URL 清单 (按优先级排)

| # | URL | 优先级依据 | 期望加速效果 |
|---|-----|-----------|-----------|
| 1 | `/zh-hk/category/paper-bags/` | striking 1 梯队, pos 12.23, 距首页 2 位 | 收录加速 → 推过首页 |
| 2 | `/zh-hk/category/packaging/` | striking 1 梯队, 食品包裝 pos 15.61 | 收录加速 → 推过首页 |
| 3 | `/en/category/paper-bags/` | striking 1 梯队 en, paper bag print file requirements pos 15.21 | 收录加速 → 推过首页 |
| 4 | `/zh-hk/category/envelopes/` | **大信封 pos 2.0, 16 imps 0 click** (撞墙 = 修复) | CTR 修 → 立刻有点击 |
| 5 | `/zh-hk/blog/calendar-printing-guide/` | R5 月曆 8/5 上线, 月曆印刷 pos 23.61, 9/15 硬截止 | 收录加速 → 9 月中冲 pos ≤15 |
| 6 | `/en/blog/calendar-printing-guide/` | R5 月曆 en 8/5 上线 | 同上 |
| 7 | `/ja/blog/calendar-printing-guide/` | R5 月曆 ja 8/5 上线 | 同上 |
| 8 | `/zh-hk/product/wall-calendars/` | R5 月曆 SKU 8/5 上线 | 收录加速 |
| 9 | `/zh-hk/` | 智印港品牌词 40% CTR 主页 | 品牌词稳定 + §0.21 攒批作废后新内容入口 |
| 10 | `/zh-hk/quote/` | CTA 入口, 询盘路径关键页 | 加速 008 度量层接通后询盘转化路径 |

**10 个 URL 全部用 zh-hk locale 优先** (zh-hk 站点主市场 + 撞墙 = 修复最高优)。

---

## 4 · 操作后 K3 必做 (30s)

K3 操作完 10 URL 后, 给 M3 1 行 ack:

```
K3 GSC done. 已请求编入索引 10/10 URL. 现在 M3 verify.
```

M3 收到后跑 3 步 verify:
1. `curl -I https://zprintpro.com/<url>/` 10 个 URL 全部 200
2. GSC → Sitemaps → 确认 sitemap-index.xml 状态"成功"
3. GSC → 网址检查 → 抽查 3 个 URL "已请求编入索引" status

3 步全 PASS → 撞墙 = 🔴 → ⏳ 已排期 → 8/28 中检 GSC 7d clicks 抽样验证。

---

## 5 · 风险与回退

- **GSC 后台 5 min 不可用** (网络 / K3 没空) → M3 退路: 等 8/26 晚 / 8/27 早 K3 上线再操作, 不主动代为执行 (撞墙 = K3 真人时间)
- **K3 误重交 sitemap-index.xml** → M3 主动告知 "按 K3 8/26 §8 拍板, 不需重交", 不阻塞 K3
- **10 URL "已请求编入索引" 但 24h 内未收录** → M3 8/27 抽查, 不达预期升级 K3 拍板 IndexNow 提前启动

---

## 6 · 与其他撞墙的依赖

| 撞墙 | 依赖 |
|------|------|
| §9 Supabase service key | 无 (独立) |
| pos 1-10 69 词 + 大信封 src 改动 | 无 |
| striking 1 梯队 3 词 src 改动 | 无 |
| §4 验收口径 4 cron 改动 | 无 (8/28 中检前不动) |
| R5 月曆冲 pos ≤15 计划 + FAQ 补齐 | **依赖** §8 (收录加速) |
| 008 度量层接通 | **依赖** §9 Supabase key |

**§8 是 R5 月曆 + 008 之外的独立撞墙**, K3 5 min 投入回报最高 (R5 月曆 8/5 上线后等收录, 不加速就错过 9/15 季节硬截止)。

---

## 7 · K3 5 min 时间窗口建议 (K3 排期)

| 日期 | 撞墙 = K3 真人时间窗口 |
|------|----------------------|
| 8/26 (周二) | §8 5 min (本指引) + §9 Supabase key 提交 (5 min, K3 提交) |
| 8/27 (周三) 09:00 | GBP 3 locale 亲提 (15 min, K3 GSC 真人操作) |
| 8/28 (周四) 11:00 | Listicle 投出 (20 min, K3 编辑发送) |
| 8/28 (周四) 12:00 | 8/28 中检 9 时段 10 KPI 拉数据 (30 min, K3 GSC 后台) |
| 9/15 (周一) | R5 月曆 9 月中前 pos ≤15 验收 |

**8/26 当天 K3 总真人时间 = 10 min (5 min 站点地图 + 5 min Supabase key)**, 是 4 阶段最轻的一天。

---

*整理: M3 撞墙升级 (K3 8/26 §8 拍板) / 2026-08-26 / 数据: K3 §8 + GSC 8/24 14:30 527 词分层 + 4 cron SSoT + matrix R5 状态 / docs-only 0 代码改动 / 不列 push 计数 (§0.21)*
