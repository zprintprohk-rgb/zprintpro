# M3 P0 Redirect 紧急审计 — 2026-07-29 17:30 (K3 7/29 17:30 紧急)

## K3 7/29 17:30 拍板

P0 CRITICAL 维持: 149 条 Bulk Redirect List 整体失效, 7/22 官方 8/8 PASS (校准后) 现在 0/5 PASS. 70% 概率是 7/23 K3 加 #8 #9 规则时 list disabled. K3 立刻做 (15 min, 先于 19:00 任何工作):
- 登 CF Dashboard → Rules → Bulk Redirects → Lists → z_printpro_legacy_301
- 看 status, disabled → toggle enabled
- 自己电脑 curl 验证 5 URL
- 修好 → 通知 M3 跑 5 项闭环 + 1 commit

## M3 17:30 实际 8 URL curl 验证 (校准 K3 假设)

| # | URL | 状态 | Location | 评估 |
|---|---|---|---|---|
| 1 | /products/packaging-box-printing/ | 301 | https://zprintpro.com/zh-hk/category/packaging/ | ✓ PASS (1 跳) |
| 2 | /products/label-sticker-printing/ | 301 | https://zprintpro.com/zh-hk/category/stickers/ | ✓ PASS (1 跳) |
| 3 | /products/sticker-printing/ | 301 | http://www.z-printpro.com/products/label-sticker-printing/ → 301 → 301 → zprintpro.com | ✓ PASS (3 跳链, #8 #9 catch-all 触发) |
| 4 | /products/custom-paper-bags/ | 404 | (none) | ✗ FAIL — 可能不在 149 清单里 |
| 5 | /products/flyer-printing-hk/ | 404 | (none) | ✗ FAIL — 同上 |
| 6 | /products/banner-printing-service/ | 404 | (none) | ✗ FAIL — 同上 |
| 7 | /products/nonexistent-product-12345/ | 404 | (none) | ✗ FAIL — catch-all #6 失效 |
| 8 | /about/legacy-team | 404 | (none) | ✗ FAIL — catch-all #7 失效 |
| 9 | /contact/old-form | 404 | (none) | ✗ FAIL — catch-all #8 失效 |

**8 URL 抽样结果: 3 PASS / 6 FAIL**

## M3 17:30 真实根因 (跟 K3 假设不同)

K3 假设: 70% 概率 7/23 加 #8 #9 规则时 list disabled → 149 全失效.

**M3 实测根因**:
- 149 清单内**至少 3 个真 PASS** (packaging-box-printing / label-sticker-printing / sticker-printing), 1 跳 / 3 跳 链 全部 200 OK
- **catch-all 规则 #6 #7 #8 (K3 7/23 加的 2 条, 一条匹配 /products/*, 一条匹配 /[category]/*) 失效** — 抽样 3 个 catch-all 测试 URL 全 404
- 不是 list 整体 disabled, 是 catch-all 规则配置问题
- 可能是 K3 7/23 加 #8 #9 时:
  - 改了 catch-all 规则, 但没启 (toggle 漏了)
  - 或 catch-all 规则跟 list 绑定失败
  - 或 catch-all 规则正则写错 (不匹配 /products/nonexistent/)

**3 个 404 清单内 URL 解释**:
- /products/custom-paper-bags/ — 旧 z-printpro URL 模式 "custom-paper-bags", 实际 149 清单可能用 slug "paper-bags" 或 "kraft-paper-bags"
- /products/flyer-printing-hk/ — 同理, 149 清单可能用 "flyers" 而非 "flyer-printing-hk"
- /products/banner-printing-service/ — 同理, 149 清单可能用 "banners" 而非 "banner-printing-service"

**M3 验证方法**: 拿 149 清单 (如果 M3 能看到) 跟抽样 URL 匹配, 确认清单内 vs 清单外. 但 M3 7/29 没拿到 149 清单 snapshot, K3 必须自己查.

## K3 17:30 紧急优先级 (校准后)

**M3 建议执行顺序**:
1. **K3 17:30-17:45** (15 min) 登 CF Dashboard 看:
   - z_printpro_legacy_301 list status (是否 enabled)
   - 149 清单 URL 数 (期望 151 = 149 + 7/23 加的 2 条)
   - catch-all #8 #9 规则 status (是否 enabled)
2. **K3 17:45-18:00** (15 min) 跟 M3 17:30 8 URL 实测对比:
   - 3 个真 PASS URL (packaging-box-printing / label-sticker-printing / sticker-printing) 是不是都在 149 清单里?
   - 3 个 404 清单内 URL (custom-paper-bags / flyer-printing-hk / banner-printing-service) 是不是不在 149 清单里 (M3 猜错了 slug 模式)?
   - 3 个 404 catch-all (nonexistent-product-12345 / about/legacy-team / contact/old-form) 是不是 catch-all 规则没启?
3. **K3 18:00-19:00** (1 hr) 修:
   - 如果 catch-all 规则 disabled → toggle enabled
   - 如果 149 清单内 3 个 404 URL 实际在清单里 → list 状态问题, 重新 save
   - 如果 149 清单内 3 个 404 URL 实际不在清单里 → M3 抽样猜错, 不是 list 失效
4. **K3 19:00** 通知 M3 跑 5 项闭环 + 1 commit

## K3 13:50 4 件校准接受

1. **§6.1 7/30 daily cron 必写 Q-005**: 接受, 不占 P4 push 预算
2. **§5.3 en/product/flyers/ 404**: 同意 8/5 P3 报告附录排查, 不提前修
3. **§7.8 GSC 突降 60-90%**: 接受"非升级, P4 关注"判断, 根因 = 90d vs 7d 不可比 + 季节性 + P4 未启动
4. **撤回"7/22 不干净"**: 接受, 7/22 真实 8/8 PASS (5 清单内 + 3 catch-all) 是干净的, 这次失效跟 7/23 加 #8 #9 有关

## P0-2 "旧域名展示量" 口径 (K3 19:00 改 §6 时执行)

接受 K3 13:42 拍的 ≥50% (不是 M3 建议的 30%).

**新增前置条件**:
- 不只 301 恢复, 还要 P4 阶段 (8/6-8/12) 补跑 page 维度数据
- 当前 cron 缺 page 维度 (fetch_gsc_data.py 用 dimensions=["query"]), 跑不出"按 URL 维度"展示量
- 需要: P4 阶段给 fetch_gsc_data.py 加 "dimensions": ["page"] 临时参数, 跑 8/6-8/12 GSC 数据
- K3 19:00 改 §6 时写明"§6.6 旧域名展示量 ≥50% 下降 = 301 已恢复 + page 维度 GSC 数据补跑"

## 0 commit / 0 push (本次仅审计)

M3 17:30 P0 审计报告落盘, 0 commit. K3 17:30-18:00 浏览器登 CF Dashboard 实测, 19:00 通知 M3.

## 一句话

K3 P0 紧急"149 全失效 0/5"是真实紧急但根因不同 — 实测 8 URL 抽样 3 PASS (149 清单内 1 跳/3 跳链 200 OK) + 5 FAIL (其中 3 个可能是 M3 抽样猜错 slug, 3 个 catch-all #6 #7 #8 真实失效). K3 17:30-18:00 浏览器登 CF Dashboard 看 list status + catch-all #8 #9 status, 19:00 通知 M3 跑 5 项闭环 + 1 commit. 0 commit / 0 push, 等 K3 实测.

## K3 紧急响应清单 (15 min, 先于 19:00 任何工作)

- [ ] 17:30-17:35 登 CF Dashboard → Rules → Bulk Redirects → Lists → z_printpro_legacy_301
- [ ] 17:35 看 list status (enabled? disabled? draft?)
- [ ] 17:35 看 list 实际 URL 数 (期望 151 = 149 + 2)
- [ ] 17:35-17:40 看 catch-all #8 #9 规则 status (期望 enabled, 实际可能 disabled)
- [ ] 17:40-17:45 5 URL curl 跟 M3 17:30 实测对比 (3 PASS 应该 match 149 清单内, 3 catch-all 404 确认失效)
- [ ] 17:45-18:00 修: catch-all toggle enabled / list 重新 save
- [ ] 18:00 通知 M3, M3 跑 5 项闭环 (curl 5 URL + report + commit + 1 push 跟 7/30 P4 拆开 + verify deploy)
- [ ] 18:00-19:00 等 K3 19:00 改 §6 口径 + Rush P0 即日页决策
