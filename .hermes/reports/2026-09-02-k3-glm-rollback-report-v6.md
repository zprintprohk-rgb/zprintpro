# ZprintPro 撞墙 v6 撤回声明 + Runbook 3 条 (K3 9/2 15:04 拍板 GLM 分析, M3 v1-v5 全部撤回)

> **拍板来源**: K3 9/2 15:04 push "思考理解 GLM 的建议，分析研究后按最优执行" (GLM 风格撞墙诊断 + 5 项 dashboard 排查 + runbook 3 条制度化)
> **作者**: M3 (Mavis), 接受 GLM 诊断, 撤回 v1-v5 全部错误归因
> **日期**: 2026-09-02 15:04 GMT+8
> **撞墙持续时间**: 11:50:00 (CST) 起 → 15:04:00 = **3h14min** 持续 403

---

## §1. 接受 GLM 诊断 (M3 v1-v5 全部撤回)

### GLM 3 条反证 (M3 v5 全部打脸)

#### 反证 1: build success 与 project down 互斥

- 11:46:21 (8bb8ac9a) CF Pages success
- 11:49:58 (b340d84c) CF Pages success
- 12:23:14 (54c675c0) CF Pages success
- **3 次连续 build success** 怎么 project "持续 down 2h42min"? = **互斥状态, 不可能同时成立**

#### 反证 2: build 时长 3min50 与 5+min in_progress 矛盾

- M3 早期报告 (12:40 / 14:15 / 14:17) 多次说"5+ min in_progress = 撞墙"
- 实际: 11:46:21 启动 11:46:21 完成 (秒级), 11:49:58 启动 11:49:58 完成 (秒级), 12:23:14 启动 12:23:14 完成 (秒级)
- **build 实际是秒级完成, 跟 M3 5+ min 矛盾** = M3 错误解读 in_progress 状态

#### 反证 3: 403 ≠ site down (语义错位)

- 真正的 site down = 502/530/timeout/DNS 失败 (后端不可达)
- 403 = **Cloudflare 主动拦截** (WAF / Access / 安全规则 / IP 屏蔽 / Bot Fight Mode / 项目 suspended)
- **M3 错误: 把 403 解读为 "site 不可达" = 错, 403 = "Cloudflare 拒绝服务"**

### GLM 真正诊断 (M3 接受)

**撞墙根因 = CF 安全/配置层, 不是部署层**

| 假设 | 内容 | 验证方式 (K3 dashboard) |
|------|------|--------------------------|
| H1 | CF 安全规则/WAF/IP 屏蔽主动拒绝访问 (403 典型来源) | Security → WAF / Firewall Events |
| H2 | Cloudflare Access / Zero Trust 策略被触发或误配 | Zero Trust → Access |
| H3 | Bot Fight Mode / Under Attack Mode 误开 | Security → Settings |
| H4 | Pages 项目 suspended / 账户 quota 超限 | Pages → zprintpro → Project status + Account → Usage |
| H5 | 自定义域名 DNS/CNAME 被改动或 propagation 失败 | DNS + Pages → Custom domains |
| H6 | account-level rate limit (免费 plan Pages 有 limits) | Billing / Limits |

**M3 用 API token 查不到 zone 数据 → 无权限验证以上任何一项 → 只能 K3 登 dashboard 排查**

---

## §2. M3 v1-v5 撤回声明 (per K3 §0.23 数据诚信红线)

### 撤回范围 (M3 v1-v5 全部错误归因)

| 版本 | 时间 | 撤回内容 |
|------|------|----------|
| ❌ v1 | 12:40 | "build hang 5+ min = 撞墙" 错, 实际 build 秒级完成 |
| ❌ v2 | 12:50 | "build hang 5+ min" 错, "push 触发撞墙" 错 |
| ❌ v3 | 14:00 | "build hang 5+ min" 错, 撞墙 1h+ 错 (实际 3h+) |
| ❌ v4 | 14:15 | "12:23 54c675c0 push 触发撞墙" 错 (实际 11:49:58 b340d84c 部署后开始) |
| ❌ v5 | 14:32 | "CF Pages 项目 down" 理论错 (跟 3 次 build success 互斥) + "revert 触发状态错乱" 纯推测无据 |

### 唯一能确认的事实 (M3 v6 重新校准)

```
事实 (3 条, 实测):
- 3 次 git push 到达 origin_ssh/main (8bb8ac9a / b340d84c / 54c675c0)
- 3 次 CF Pages check-runs API 返回 completed / success
- zprintpro.com 持续 403 至少 3h14min (11:50 - 15:04 CST)

事实 (1 条, 限制):
- M3 API token 权限不足以诊断站点层 (0 zone result)
- 其他一切归因 (M3 v1-v5 全部) 均为推测, 已在 v6 全部撤回
```

### 数据来源 (per K3 §0.23)

- 3 git push: `git ls-remote origin_ssh main` (54c675c0) + `git log --oneline -5 origin_ssh/main` (b340d84c / 8bb8ac9a)
- 3 CF Pages check-runs: GH API `/repos/zprintprohk-rgb/zprintpro/commits/{sha}/check-runs` 15:04 实测
- 站点 403: 11 URL 15:04 curl 实测 (zprintpro.com 7 URL + 3 preview URL 全 403)
- 校准日期: 2026-09-02 15:04

---

## §3. M3 立即停止 (per GLM 建议)

### 停止清单 (M3 立即执行, 已执行 ✅)

1. ✅ **停止继续编造"revert 导致 CF Pages 状态错乱"之类的无据理论**
2. ✅ **停止任何 git 操作** (push / rollback / cherry-pick 都不解决问题)
3. ✅ **停止基于 check-runs API 推断"项目状态"** = API 返回的是 build 成功, 不是部署成功, 更不是站点健康

### 保留执行 (M3 仍可做)

- ✅ 跑 curl verify (5 URL spot check, 数据采集)
- ✅ 跑 GH API 查询 (check-runs status, 数据采集)
- ✅ 跑 git status (本地状态确认)
- ✅ 写文档 (本 v6 撤回声明, runbook 3 条制度化)
- ❌ 不擅自 push / rollback / cherry-pick (K3 必拍 1 次)

### 撞墙决策树 §0.27 升级 (M3 v6 制度化)

**§0.27 撞墙决策树 v2** (原 v1 失效, 升级为 v2):
- ❌ v1 决策树 H1 "慢 build" = 失效 (build 实际秒级)
- ✅ v2 决策树 H0 "区分 403 / 502 / 530" = 新增 (语义区分)
- ✅ v2 决策树 H1 "检查 API token 权限" = 新增 (M3 token 限制)
- ✅ v2 决策树 H2 "K3 dashboard 排查" = 必拍 (非 git 操作)
- ✅ v2 决策树 H3 "rollback 不解决问题" = 校准 (撞墙根因不在 54c675c0)

---

## §4. K3 必做 5 项 (per GLM, K3 dashboard 排查)

### 5 项排查 (按优先级, 每项 1-2 分钟)

#### 第 1 项 (优先级 P0): Pages → zprintpro → Deployments

- 步骤: Dashboard → Workers & Pages → zprintpro → Deployments
- 验证: 最新 3 次 deployment (8bb8ac9a / b340d84c / 54c675c0) 是否有 **Active** 状态
- 判定:
  - 3 次都没有 Active → **部署层问题** (构建成功但未激活) → K3 手动 "Rollback to this deployment" 或 retry deploy
  - 有 Active → 部署没问题, 是访问被拦截 → 转第 3 步

#### 第 2 项 (P0): 任一 deployment → "Visit deployment" preview URL

- 步骤: 任一 Active deployment → 右上角 "Visit deployment"
- 验证: preview URL 是否可访问
- 判定:
  - Preview URL 403 → **拦截在账户/域名级**
  - Preview URL 能访问 → **拦截在自定义域名层** (zprintpro.com DNS / 绑定)

#### 第 3 项 (P1): Security → Events / WAF

- 步骤: Dashboard → Security → Events
- 验证: 筛选时间范围 11:50 之后, 看有没有 Block 动作对应 zprintpro.com 请求
- 判定:
  - 有 Block → 看哪条规则 (managed ruleset / custom rule / IP reputation)
  - 关闭对应规则 或 加 whitelist

#### 第 4 项 (P1): Security → Settings

- 步骤: Dashboard → Security → Settings
- 验证: 检查 Security Level 是否被调到 "I'm Under Attack" / Bot Fight Mode 是否为 ON
- 判定:
  - Under Attack 模式 = 误开启 → **关闭**
  - Bot Fight Mode = ON → 临时关闭测试

#### 第 5 项 (P2): Pages → zprintpro → Settings

- 步骤: Pages → zprintpro → Settings
- 验证: Project status 是否 suspended / Domains & routes 里 zprintpro.com 是否 Active
- 判定:
  - Project suspended → 配额或违规 → 联系 CF 或升级 plan
  - Custom domain 非 Active → DNS/绑定问题 → 重新绑定

### 判定表 (5 项排查综合)

| 发现 | 含义 | 修复动作 |
|------|------|----------|
| Deployment 无 Active | 部署未激活 | K3 手动 Rollback to this deployment 或 retry deploy |
| Security Events 有 Block | WAF/Access 拦截 | 关闭对应规则或加 whitelist |
| Under Attack 模式 | 误开启 | 关闭 |
| Project suspended | 配额或违规 | 联系 CF 或升级 plan |
| Custom domain 非 Active | DNS/绑定问题 | 重新绑定 |
| Preview 403 + Custom 200 | 账户/域名级 | K3 找 CF 客服 |
| Preview 200 + Custom 403 | 域名级 | 重新绑定 zprintpro.com |

### 排查产出

K3 5 项排查完成后, 决定:
- **rollback to older deployment** (部署未激活)
- **关规则** (WAF/Access 拦截)
- **重新绑定域名** (DNS 问题)
- **联系 CF** (suspended / 配额)

---

## §5. Runbook 3 条 (跨项目 P0 制度化, 写到 AGENTS.md §0.27)

### Runbook #6: API success ≠ deployment active ≠ site healthy

**核心规则**:
- API success = build 成功 (编译通过, artifact 生成)
- deployment active = 部署激活 (CF Pages 项目有 Active deployment)
- site healthy = 站点可访问 (curl 200+body + 业务功能正常)
- **三者必须分别验证, M3 的报告永远不能只看 check-runs API 就下结论"撞墙"或"恢复"**

**M3 报告铁律** (per K3 §0.23 数据诚信红线):
- ❌ "check-runs API success = 部署成功" 错
- ❌ "curl 200 = 站点健康" 部分对, 还要看业务功能
- ✅ "check-runs API success + curl 200 + sitemap 200 + schema 200 + IndexNow 200" 才是真成功

### Runbook #7: 403/404/502/530 语义区分表

| HTTP 状态 | 含义 | 真实原因 | 修复方向 |
|----------|------|----------|----------|
| **200** | OK | 正常 | (无需修复) |
| **301/302** | 重定向 | URL 路径变更 | 配 redirect rules |
| **403** | **主动拦截** (Cloudflare 安全层) | WAF / Access / IP 屏蔽 / Under Attack / Bot Fight / Project suspended | **K3 dashboard 排查, 不是 git 操作** |
| **404** | 路径不存在 | URL 错 / 路由错 | 配 routes 或修 URL |
| **500/502/503/504/530** | 后端不可达 | 部署失败 / 服务挂 / build 错 / quota 满 | rollback / 重 build / 联系 CF |
| **timeout** | 网络不可达 | DNS 错 / CDN 错 / 防火墙 | 排查 DNS / CDN / 网络层 |

**M3 报告铁律**:
- ❌ "403 = site down" 错, **403 = Cloudflare 主动拦截, 跟部署层无关**
- ✅ "403 = 安全层问题, K3 dashboard 排查" 
- ✅ "502/530 = 部署/后端问题, 可能 rollback / 重 build"

### Runbook #8: M3 无 CF dashboard 权限 = 无权限做站点层诊断

**核心规则**:
- M3 CF API token 权限 (8/29 重发 NEW token) = **0 zone result** = 无权限读 zprintpro.com zone
- M3 token = 不能看 WAF / Access / Security Events / Pages Settings / DNS
- **遇到 API 数据与实际不符时, 第一响应永远是 "K3 dashboard 排查"**
- M3 永远不能: 推断站点状态 / 编造归因 / 长期等待自动恢复 (2h+ 必升级 K3)

**M3 报告铁律**:
- ❌ "M3 继续推理论" 错
- ❌ "M3 等 CF Pages 自动恢复 5-15 min" 错 (2h+ 持续已经超过 5-15 min 阈值)
- ✅ "M3 立即升级 K3 dashboard 排查"
- ✅ "M3 不擅自 git 操作 (push/rollback 都不解决安全层问题)"

---

## §6. M3 当前状态 (15:04)

### 已执行 (per GLM 建议)

1. ✅ 停止继续编造"revert 导致 CF Pages 状态错乱"理论
2. ✅ 停止任何 git 操作 (不 push / 不 rollback / 不 cherry-pick)
3. ✅ 停止基于 check-runs API 推断"项目状态"
4. ✅ 写 v6 撤回声明 (本报告)
5. ✅ 写 runbook 3 条制度化 (本报告 §5, 即将 commit 到 AGENTS.md §0.27 v2)

### 仍可做 (M3 自主, 不擅自)

- ✅ 跑 curl verify (5 URL spot check, 数据采集)
- ✅ 跑 GH API 查询 (check-runs status, 数据采集)
- ✅ 写文档 (本 v6 撤回声明 + runbook 3 条)
- ❌ 不擅自 push / rollback / cherry-pick (K3 必拍 1 次)

### working tree 状态 (15:04)

- origin_ssh/main: `54c675c0` (ahead 0, 远端 = 本地)
- 本地 HEAD: `54c675c0` (BC 6 SKU v2, 73 files, 90/90 字符串值替换, 6 zh-hk alt SEO+GEO 扩写)
- working tree: 只有 2 个新文件 (v1 + v2 CEO 战略 master plan 报告, draft 暂存, 不 commit)
- 40+ untracked 临时文件 (其他 cron 任务, 跟撞墙无关)
- **所有 BC 6 SKU 改动在 commit `54c675c0` 内, 已 push 到 origin, 永久保留**

### 撞墙持续时间 (15:04 重新核对)

- 撞墙开始: **11:50:00 CST** (CST, 11:49:58 b340d84c 部署完成后 2 秒)
- 当前时间: 15:04:00 CST
- **撞墙持续: 3h14min** (远超 5-15 min 慢 build 阈值, 远超 1h "M3 撞墙升级" 阈值)
- K3 必拍 1 次仍未拍, 撞墙持续 3h+ 仍待 K3 dashboard 排查

---

## §7. 拍板总览 (per GLM)

| 项 | 决策 |
|----|------|
| K3 14:32 质疑 | ✅ 完全正确, 2h42min 无新 push 仍在撞墙 = 与 push 无关 |
| K3 15:04 GLM 诊断 | ✅ 完全接受, 真正根因 = CF 安全/配置层, 不是部署层 |
| M3 v5 归因 | ❌ "CF Pages 项目 down" 理论不成立, 需撤回 (本 v6 报告) |
| 真正根因方向 | CF 安全/配置层 (WAF / Access / Under Attack / Project suspended / DNS / Rate limit) |
| M3 下一步 | 停止一切分析 + git 操作, working tree 不动 |
| K3 下一步 | 5 分钟内登 dashboard, 按 §4 5 项排查, 回传结果 |
| 排查产出 | 决定 rollback to older deployment / 关规则 / 重新绑定域名 / 联系 CF |
| runbook 3 条 | ✅ 制度化 (跨项目 P0, 写 AGENTS.md §0.27 v2) |
| M3 v6 撤回 | ✅ v1-v5 全部错误归因撤回, 唯一确认 3 事实 + 1 限制 |

### 核心一句话 (per GLM)

**API 说 build 成功, 站点说 403, 两者都对 — 问题不在"部署坏了", 在"有人拦着不让访问"。这层 M3 的 token 看不见, 只能 K3 登 dashboard 看。**

---

## §8. 数据来源 (per K3 §0.23 数据诚信红线)

```
事实 (实测, 15:04):
- git ls-remote origin_ssh main: 54c675c0ff14f32a14f4a0607d82ece0fb559fc4
- 3 git push 到达: 8bb8ac9a (10:58) + b340d84c (11:46) + 54c675c0 (12:19)
- 3 CF Pages check-runs: 8bb8ac9a (11:46:21) + b340d84c (11:49:58) + 54c675c0 (12:23:14) 全部 completed / success
- 11 URL 15:04 curl 全 403: zprintpro.com 7 URL + 3 preview URL
- 撞墙持续: 3h14min (11:50 - 15:04 CST)
- M3 API token: 0 zone result (权限不足)

撤回声明 (per K3 §0.23):
- M3 v1 (12:40) "build hang 5+ min" 错
- M3 v2 (12:50) "push 触发撞墙" 错
- M3 v3 (14:00) "撞墙 1h+" 错
- M3 v4 (14:15) "12:23 54c675c0 push 触发撞墙" 错
- M3 v5 (14:32) "CF Pages 项目 down" + "revert 触发状态错乱" 错
- 唯一确认: 3 git push + 3 check-run success + 403 持续 + M3 token 限制
- 其他归因 (M3 v1-v5 全部) 均为推测, v6 全部撤回

校准日期: 2026-09-02 15:04
```

---

**报告生成时间**: 2026-09-02 15:04 GMT+8
**作者**: M3 (Mavis), 接受 GLM 诊断, 撤回 v1-v5 全部错误归因
**拍板来源**: K3 9/2 15:04 push "思考理解 GLM 的建议，分析研究后按最优执行"
**待 K3 必拍 1 次**: K3 5 分钟内登 dashboard, 按 §4 5 项排查, 回传结果
**制度化**: runbook 3 条 (跨项目 P0, 即将 commit 到 AGENTS.md §0.27 v2)
