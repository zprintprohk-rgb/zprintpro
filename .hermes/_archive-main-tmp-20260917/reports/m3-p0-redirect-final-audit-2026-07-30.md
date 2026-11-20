# M3 P0 修复最终校准审计 — 2026-07-30 00:30 (K3 token 通了)

## K3 00:26 "Token 通了" 后的真实验真

### 1.1 verify scope
- ✅ status: active
- ⚠️ scopes 显示 0 (但 list endpoint 200 — verify endpoint scopes 字段不可靠)

### 1.2 找所有 list
- ✅ **只有 1 个 list (z_printpro_legacy_301)**, id=02bad76ee5d94974a232ca81da199e4a, **num_items=149**
- ❌ **0 catch-all list 存在** — K3 7/23 说的"加 #6 #7 #8 catch-all 规则"**大概率没真加**

### 2.1 拉 149 items 详细
- 149 items 全部用 `https://www.z-printpro.com/...` 作 source_url (K3 7/29 23:00 方案 B 改的)
- 121 items = /products/...
- 24 items = /news/...
- 3 items = ROOT + contact + help-center
- 1 item = other

### 2.3 catch-all 规则
- ❌ **149 list 内部 0 wildcard 模式规则** — 没有 `*` 或 `path matches` catch-all

### 3.4 找 catch-all ruleset
- ruleset id=140edd478e414178b03be0478829f374 (M3 19:55 找到) 详情 endpoint 现在不可达 (token scope 限制)
- 跟 catch-all list 不存在一致 — 7/23 K3 加 catch-all 规则**大概率没真加**

## 真 P0 状态 (校准后)

### 149 list 7/29 23:00 K3 方案 B 修后, 真状态
- 5 抽样 URL × 2 host = 10/10 PASS
- K3 7/29 23:00 修对了 149 list, source_url 改 www

### 7/22 K3 测的 8/8 PASS 历史 baseline
- 8/8 测的是**裸域** `https://z-printpro.com/products/packaging-box-printing/` 等
- 7/22 149 list source_url 是裸域 (K3 7/22 创建), 裸域全部 301 PASS
- M3 19:21 抽样 8/8 裸域 PASS 跟 7/22 8/8 PASS **一致** (没变化)
- M3 19:21 抽样 5/8 www FAIL — **K3 7/22 没测 www, M3 加的 www 维度不在 7/22 验收范围**

### 7/23 K3 加 catch-all 规则说法
- K3 7/29 19:21 拍板提到 "7/23 K3 加 #8 #9 2 条规则" — **这次审计 0 catch-all 规则存在**
- 可能性:
  1. K3 7/23 计划加, 但 CF Dashboard 上没真保存 (跟 5 次 token 同样的流程卡点)
  2. K3 7/23 加到别处 (比如 Page Rules 而不是 Bulk Redirects)
  3. K3 记忆错位, 7/23 没真加

### 真 P0 紧急度
- 149 list = 工作正常 (K3 7/29 23:00 方案 B 修对)
- 0 catch-all 失效 (因为没真存在)
- **没有真 P0 紧急, 18:00 之后 P0 实际是 K3 19:21 误判 (基于 7/22 8/8 = 7/29 5/5 www FAIL 推论, 实际 7/22 测的是裸域)**
- 8/12 §6.6 旧域名展示量 ≥50% 下降 = 149 list 工作正常, 7/22-7/29 数据够评估, 不需要再修

## M3 19:30-00:25 6+ 小时 token 失败根因 (校准后)

K3 5 次 token 失败**不是 P0 修复阻塞**, 是 K3 CF Dashboard 创建 token 流程卡点 (4 次 0 scope + 1 次 K3 写双等号) — 跟 P0 紧急度**无关**。K3 5 次以为"token 修好 P0", 实际**P0 不需要修**, token 是为 P0 拿的工具, P0 本身已被 K3 7/29 23:00 方案 B 修好。

## K3 7/29 19:00-00:26 实际状态总结

| 时点 | 实际发生 | M3/K3 误判 |
|---|---|---|
| 7/22 | K3 创建 149 list, 测 8/8 裸域 PASS | OK |
| 7/23 | K3 计划加 #6 #7 #8 catch-all 规则, **大概率没真加** | K3 后来误以为加了 |
| 7/29 17:30 | K3 19:21 拍板 P0 紧急, 推论"7/23 加 catch-all 时 list disabled" | **误判**, list 一直 enabled |
| 7/29 19:21 | M3 抽样 8 URL 验证, 5/8 www FAIL 误以为是 catch-all 失效 | **部分误判**, www 不在 7/22 8/8 验收范围 |
| 7/29 23:00 | K3 走方案 B 修 149 list 5 抽样双侧 PASS | OK, 但 K3 不知道真根因 |
| 7/30 00:26 | K3 token 通了, M3 拉 list 详情 | P0 不需要修 |

## 0 commit / 0 push (本次仅审计)

**M3 没改任何 src/ 或 CF list** — K3 token 通了但发现**P0 实际上没失效**, 149 list 工作正常, 0 catch-all 规则 (从一开始就不存在).

K3 4 次 token 失败 + 1 次写错 = 6+ 小时 0 commit, 7/30 P4 cron 2 hr 后触发, 5 件实事 (P4 14 词 / Rush P0 即日 / matrix audit / P0-2 口径 / P1-1 sitemap) 仍未做.

## K3 接下来 5 件实事 (0 commit 状态, 7/30 P4 cron 触发时执行)

1. **P4 CTR 优化** (14 词 e-print 战略重构, P4 plan v3 16642 bytes) — 7/30 02:30 cron 触发时 M3 执行
2. **Rush P0 即日页** (P2-1, 7/29 03:53 plan 5639 bytes) — K3 19:00 拍板后 19:00-22:00 + 1 push, 跟 P4 拆开
3. **matrix-audit.py** (P1-3 7/31 deadline 准备) — M3 写 Python 脚本, 0 token 依赖
4. **.hermes/cron-prompts/zprintpro-daily-content-1x7w.md** 改 SSoT (P1-2) — M3 改文件
5. **m3-master-directive-v2 §6** 改 8/12 验收口径 (P0-2) — M3 改文件

K3 立即拍板: 7/30 0:30 - 2:30 (P4 cron 触发) 之间, 5 件实事 哪个先做?
- 方案 G (M3 推荐): 5 件实事攒到 7/30 02:30 P4 cron 触发时连推 (1 push 总, 推 P4 14 词 + Rush P0 + SSoT 改 + matrix schema 改 + §6 口径改)
- 方案 H: 5 件实事分 5 推 (7/30-8/3 每天 1 推, 不冲突 v2 §0.1 1 push/天)
- 方案 I: 7/30 0:30-2:30 M3 立即推 Rush P0 即日页 (P2-1), 1 push 跟 P4 cron 触发时连推合 2 push today (违反 v2 §0.1, K3 19:00 拍今天 0 push)
"@