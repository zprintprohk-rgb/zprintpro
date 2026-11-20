# M3 V7 Daily 报告反馈 + V7 优化方案 — 2026-07-29 13:42

## K3 7/29 13:42 反馈 6 条异常评估

### 异常 1-5 (K3 同意是"执行层 A+, verify 真"): 跳过

### 异常 #2 (简繁残留) — K3 误判, M3 反驳

**K3 拍板**: P0-1 修 5 个 7/28 SKU zh-hk "适配行业" → "適配行業"

**M3 反驳 (13:43 真实验证)**:
- `node scripts/scan-simplified.mjs` exit 0 = 全仓 0 简体残留
- `grep -r "适配行业" src/` 0 matches
- 7/28 v2.1 P1 commit `764e4e4` 实际改的字段是 `descriptionEn/descriptionJa` (加 Tier A 关键词), **没改 zh-hk 字段**, 所以不可能有"适配行业"残留
- M3 7/28 报告 §13.16.1 zh-hk 0 简体验证是**真实 PASS**

**结论**: P0-1 不需要修, 7/28 zh-hk 0 简体状态保持. 8/12 清单异常 #2 改为"已验证 0 简体, 不进复盘".

### 异常 #3 (8/12 三项不可达) — K3 同意重定义

**K3 拍板 (P0-2 冻结)**:
- 校园词排名 → 删 (与 §8 blocklist 矛盾)
- Rich Results 100% → ≥95% 覆盖 + 0 error
- 旧域名展示量 → 环比下降 ≥X% (X 待 K3 定)

**M3 13:43 反馈**:
- 第 1 条 (校园词排名) ✓ K3 拍
- 第 2 条 (Rich Results 95%+) — M3 提醒 K3: 当前 7/28 状态是 12/12 有效响应 PDP **100% 缺 aggregateRating** (v2.1 P1 删了), K3 21:08 拍板 C 维持 14 天 = 7/28-8/12 期间 Rich Results 0% = 95% 不可达. **真正 95% 需要 8/26 上线 Trustpilot 评价 (K3 21:08 方案 A 启动)**, 8/12 验收 95% 仍然不可达
- 第 3 条 (旧域名展示量环比下降 ≥X%) — 需要 K3 定 X. 建议 X ≥ 50% 环比下降 (7/22 baseline 5/5 PASS 旧域还在展示, 8/12 期望 ≥ 50% 下降 = 5 旧域仅 2-3 还有展示)

## K3 V7 优化方案 (4 件 P0/P1/P2 + 1 件流程改进)

### P0-2 8/12 验收口径冻结 (K3 拍 + M3 记录)

**3 项新口径**:
1. 校园词排名 → **删除** (与 §8 blocklist 自相矛盾, 禁词但要排名不可能)
2. Rich Results 100% → **≥95% 覆盖 + 0 error** (绝对值不可达, 相对值可行, 8/12 K3 复盘拍板方案 A 启动后 8/26 完工)
3. 旧域名展示量 → **环比下降 ≥50%** (方向指标, 不卡绝对值, 7/22 baseline 5/5 PASS → 8/12 期望 ≤ 2-3 旧域展示)

**冻结后 8/12 验收表** (7 项 - 3 不可达 = 4 项真验收):
1. 开学季询盘 ≥1 (K3 v3 拍板) ✓
2. 收录页面 +3 页 (P3 新增) ✓
3. AI 可见性 ≥1/4 (K3 v3 拍板, 剔除禁区+无市场) ✓
4. 总 push ≤14 (v2 §0.1 铁律) ✓
5. Rich Results ≥95% 覆盖 + 0 error (新口径)
6. 旧域名展示量环比 ≥50% (新口径)
7. 7/29-8/12 P4 14 词 CTR 0% → ≥1.5% (新口径, 8/6-8/12 CTR 优化目标)

### P1-1 meta 改动触发重抓 (K3 拍, M3 实施)

**现状**: 改 title/desc 后 sitemap 不 rebuild (正确, Next.js 自动生成), 但**没触发 Google 重抓** (漏).

**3 选项 (K3 拍)**:
- A: Sitemap lastmod 更新 (P2 阶段, 改 next-sitemap.config.js 或类似)
- B: Google Search Console URL Inspection API "请求编入索引" (需 Service Account + URL Inspection API 权限)
- C: IndexNow API (需 Bing + Yandex API key, Google 现在也吃 IndexNow 部分)

**M3 13:43 实施建议**:
- 短期 (7/30 P4 前): Sitemap lastmod 立即更新 (1 个 next-sitemap.config.js 改), 不需要新 API key
- 中期 (P3 阶段): 评估 GSC URL Inspection API 接入
- 长期 (P5 阶段): IndexNow 评估

**P1-1 阻塞 7/30 P4 必要条件**: 7/30 P4 commit 推完后, 14 个 URL 改 lastmod, 1 小时内 Sitemap 提交, 触发重抓 → 8/12 验收 14 词 CTR 优化见效.

### P1-2 daily A 步转型养护 (7/30 起)

**K3 拍板 (P1-2)**:
- 旧: A 步 = 1 篇新博客 (P0/P1 饱和 → 永远 skip, 信噪比差)
- 新: A 步 = 1 项养护任务, 按优先级轮询:
  1. 修 1 个 404 / 断内链 (接 8/12 3 PDP 404)
  2. 巡检 1 个 PDP 的 schema 漂移
  3. 补 1 处 FAQ 钩子 / 内链 (接即日页 P2 方案)
  4. 追修 1 处简繁 / 多 locale 漂移

**matrix 加 v7_maintenance 字段**: 累计养护次数, daily 报 "DONE 养护: xxx" 不再 "SKIP"

**M3 13:43 实施步骤 (7/29 19:00 前)**:
1. 改 `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` (SSoT) 把"1 篇博客"改成"1 项养护"
2. `mavis cron update` 同步到 daemon (短 prompt 模式, 不超 1.5K chars)
3. 改 `.hermes/industry-keyword-matrix.json` 加 `v7_maintenance` 字段 (counter)
4. 7/30 daily cron 触发时按新定义跑

### P1-3 matrix drift 7/31 截止对账 (K3 拍, M3 立即)

**K3 拍板 (P1-3)**: 7/31 前 M3 跑一次 matrix 对账脚本, code 已上线但 status=pending 的, 全部回填 done.

**M3 13:43 实际状态**:
- matrix.json (115,280 bytes) `v7_sku_optimizations` / `v7_pdp_reviews` 已有
- matrix 缺 `code_status` 字段 (K3 假设的字段)
- 真正需要做的: 跑一次 matrix.json vs src/ 实际文件对账, 看哪些 v7 SKU 优化实际 code 已上线但 matrix 没标

**实施步骤 (7/29 13:45-15:00)**:
1. `matrix.json` 的 v7_sku_optimizations 列 slug 跟 `src/data/products.ts` 实际 slug 对比
2. 7/28 改的 5 SKU 实际有 v7 字段 (committed 7/28) 但 matrix 可能没标 done
3. 跑对账脚本 (Python 写一个, 用 matrix.json schema 验证), 输出 7/31 deadline 报告

### P2-1 即日页 P0 搭 7/30 / 独立小 commit (K3 拍, M3 实施)

接 03:53 Rush P0 plan. P0 全部 7 件工程量 45-60 min + verify 30 min. 7/29 19:00 K3 拍板后 M3 立即执行. 跟 7/30 P4 同 push 还是独立 commit 由 K3 9:00 拍板 (M3 建议独立 commit = 2 push, 7/29 + 7/30).

### P2-2 8/12 复盘清单瘦身 (K3 拍, M3 8/12 报告自动反映)

**8/12 清单瘦身后**:
- 删: P0-1 简繁残留 (已验证 0, 误判) ✓
- 删: P0-2 三项不可达验收 (已重定义) ✓
- 删: §13.16.1 追修 (已验证 0 简体) ✓
- 删: matrix drift (P1-3 7/31 对账完成) ✓
- 剩: 7 项 §6 (重定义后 4 项真验收 + 3 项 KPI) + 3 PDP 404 + Trustpilot 方案 A

**M3 8/12 报告模板**:
```
8/12 复盘清单 (瘦身后):
- 7 项 §6 验收 (4 项真验收 + 3 项 KPI 监控)
- 3 PDP 404 排查 (custom-stickers / die-cut-stickers / paper-bags)
- Trustpilot 方案 A 启动 / 维持 C 拍板
- 5 cron SSoT/daemon 模式统一
- 汇率口径 + ED-005 同步
```

## K3 流程改进建议 (M3 接受)

1. **异常列表只放"真异常"** — "常态 skip" 移到独立"结构性观察"段 (7/29 03:53 报告 §B 异常列表有 6 条, 3 条是 SKIP 常态, 应该分开)
2. **每条"推到 8/12"的项必须挂"最晚清理日"** — P1-3 7/31 deadline 是这个原则的体现, 8/12 后续不能挂无 deadline 的推迟
3. **报"不可达"必须附根因** — 7/29 03:53 报告 P2 §6.2 校园词排名不可达没附根因, 补"8/12 14 天窗口不够 GSC 收录到排名" (M3 接受)

## M3 7/29 19:00 之前必做清单

- [ ] 写 `m3-matrix-audit-2026-07-29.md` (P1-3 对账报告, 7/31 deadline 预备)
- [ ] 改 `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` (P1-2 A 步转型养护) + mavis cron update
- [ ] 改 `.hermes/industry-keyword-matrix.json` (P1-2 加 v7_maintenance 字段)
- [ ] 改 `.hermes/cron-prompts/m3-master-directive-v2-2026-07-28.md` §6 (P0-2 8/12 验收口径冻结)
- [ ] 7/30 P4 14 词 commit 推完后, 立即跟 sitemap lastmod 更新 (P1-1 短期方案)
- [ ] Rush P0 即日页 (P2-1): K3 9:00 拍板后, 19:00-22:00 执行 + 1 push

## 0 commit / 0 push (本次仅规划)

7/29 13:43 落 V7 优化方案报告, 0 commit. 7/29 19:00 K3 醒了拍板后 M3 实施 (matrix audit / SSoT 改 / P0-2 口径冻结).

## K3 13:42 反馈一句话

K3 反馈让 M3 知道 3 件事: (1) P0-1 误判已识别 (执行层 A+), (2) 8/12 验收口径冻结 (复盘公信力), (3) daily A 步从"内容工厂"升级成"增长养护系统" (跟 P4 + 即日页方向合流). M3 19:00 实施清单已落, 等 K3 拍板.
