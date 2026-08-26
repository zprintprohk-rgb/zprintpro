# M3 P0 修复 token 权限不足 — 2026-07-29 19:55 (阻塞)

## K3 7/29 19:54 拍板: token 改好了, M3 重试

## M3 19:55 实测结果 (5 步 diagnose)

### 1. Token 字符分析 ✓
- 长度: 53 字符
- 起始: `cfut_T7b...` (K3 换了一个新 token)
- 字符干净: 无空格/换行/引号/CR/LF

### 2. Token 状态: 半有效 (zone-scope ✓, account-scope ✗)

| Endpoint | HTTP | 评估 |
|---|---|---|
| `GET /user` | 403 code 9109 | token 不能查 /user (无 self-scope 权限) |
| `GET /zones?name=z-printpro.com` | **200** | ✓ token 找到 zone (id=32ec1b9381d610d866c22aab4865ed79) |
| `GET /zones/<ZONE>/rulesets` (list) | **200** | ✓ 4 个 ruleset 列表, 找到 http_request_dynamic_redirect (id=140edd478e414178b03be0478829f374) |
| `GET /zones/<ZONE>/rulesets/<RULESET>` (single) | 403 "request is not authorized" | ❌ 不能读 single ruleset 详情 |
| `GET /accounts/<ACCOUNT>/rules/lists` (account-scope) | 403 code 10000 | ❌ **token 没 account-scope list 权限** |
| `GET /zones/<ZONE>/bulk-redirects` (zone-scope) | 400 code 7003 | ❌ endpoint 不存在, bulk-redirects 是 account-scope |

### 3. 真实根因
- K3 新 token `cfut_T7b...` 有 `Zone: Zone: Read` 权限 (能 list zones, list rulesets)
- **缺** `Account: Bulk Redirect Rules: Read/Edit` 权限 (Bulk Redirect 是 account-scope 资源)
- 这跟 K3 字面"token 有 Bulk Redirect 写权限"不一致 — K3 19:54 替换的 token 缺关键权限

### 4. 替代方案

**方案 A: K3 重新创建 token (M3 推荐)**
- CF Dashboard → My Profile → API Tokens → Create Token
- 模板: "Edit Cloudflare Pages" 或 "Custom token"
- 必须含:
  - `Account: Bulk Redirect Rules: Edit` (写) ← 关键
  - `Account: Bulk Redirect Rules: Read` (读)
  - `Zone Resources: z-printpro.com` 或 `All zones`
- 创建后 K3 替换 .env 里 `CLOUDFLARE_API_TOKEN=...`, 通知 M3 重试

**方案 B: K3 手动改 (5 min, 0 token 风险)**
- CF Dashboard → z-printpro.com zone → Rules → Bulk Redirects
- 找到承载 149 规则的 list (z_printpro_legacy_301)
- 改 host 匹配: 加 `www.z-printpro.com` (或改规则表达式为 `http.host in {"z-printpro.com" "www.z-printpro.com"}`)
- 保存
- K3 自己电脑 curl 双侧 5 URL 验证 5/5 PASS
- 通知 M3, M3 跑双侧 10 抽样闭环

**方案 D: P0 推 7/30 P4 (M3 不推荐, 0 push today)**
- 7/29 0 push
- 7/30 P4 14 词 commit 时跟 14 词一起推, K3 19:30 之前改 list
- 风险: P0 等于拖 1 天, 跟"今天修 8/12 验收还有救"时间窗冲突

### 5. 0 commit / 0 push
本次仅验真 token 权限, 不动 src/, 不动 CF list. 等 K3 拍板 A/B/D.

### 6. K3 紧急响应清单

- [ ] 19:55-20:00 K3 拍板 A/B/D
- [ ] 20:00-20:05 (方案 A) 重新创建 token 含 `Account: Bulk Redirect Rules: Edit`, 写 .env, 通知 M3
- [ ] 20:00-20:05 (方案 B) 登 CF Dashboard 手动改 host 匹配, 自己电脑 curl 5 URL, 通知 M3 跑双侧 10 抽样
- [ ] 20:00 (方案 D) 等明天 7/30 跟 P4 一起推
- [ ] 不管哪个方案, M3 修完跑双侧 10 抽样闭环 5/5 PASS 写报告
