# M3 P0 修复 token 验真失败 — 2026-07-29 19:30

## ❌ 阻塞: token 无效 (CF API 401/403)

### 1. 已做
- 读 .env 拿 token: 'cfut_Kf6BSzGQ796yGdDb10cIADbxQHPLoAIdb6hQ5S9r94d96156' (53 字符)
- 字符干净: 无空格/换行/引号/CR/LF

### 2. 失败响应
- GET /user → HTTP 403 Invalid access token (错误码 9109)
- GET /user/tokens/verify → HTTP 401

### 3. 5 个可能根因
1. **token 本身无效** (K3 拿错 / 已 revoke / 复制漏字符)
2. **token 来自不同账号** (不是 z-printpro.com zone 所属账号)
3. **token 格式对但权限不足** (这种情况应该是 403 not 401)
4. **CF API endpoint 路径错** (新版可能改路径, 但 401/403 跟路径无关)
5. **网络问题拦截** (但 status 200 跟 401 区别明显, 不是网络)

### 4. K3 3 步 diagnose
1. **CF Dashboard 自己验真**:
   - https://dash.cloudflare.com/profile/api-tokens
   - 看 'cfut_Kf6BSzGQ...' 开头这个 token 状态
   - 如果 "Active" → 验权限 (下一步)
   - 如果 "Disabled" / "Expired" / "Revoked" → 重新创建 token
2. **权限验真** (Dashboard 该 token edit page):
   - Zone Resources: 必须包含 'z-printpro.com' zone 或 'All zones'
   - Permissions: 必须含 'Account: Bulk Redirect Rules: Edit' (写)
   - 如果不含 → Edit permissions
3. **curl 自己电脑验真** (K3 字面要求):
   - curl.exe -s -w "\n%{http_code}" -H "Authorization: Bearer cfut_Kf6BSzGQ796yGdDb10cIADbxQHPLoAIdb6hQ5S9r94d96156" "https://api.cloudflare.com/client/v4/user"
   - 期望 HTTP 200 + email, 看到 403 同样 = token 失效

### 5. 替代方案 (M3 推荐)
- **方案 B (K3 5 min 手动)**: K3 登 CF Dashboard 手动改 host 匹配
- **方案 D (推后)**: P0 推 7/30 P4 commit 跟 14 词 SEO 一起推, 0 push today

### 6. 0 commit / 0 push
本次仅验真 token, 不动 src/, 不动 CF list. 等 K3 diagnose 反馈.