# 2 条新增 CF Bulk Redirect 规则 (K3 7/23 00:30 拍板, P0-2 修复 #8 #9)

> **触发**: K3 7/22 21:27 拍板 5 项监控 8/10 PASS, 2 真异常 #8 #9
> **K3 7/23 00:30 拍板**: #8 #9 都选 A 修法 = 加 Bulk Redirect 规则
> **执行分工**: CF API token K3 7/22 21:05 拍板 Mavis 不用, **K3 自己在 CF Dashboard 加** (跟 149 条同模式)
> **Mavis 跑**: 改后 5 项监控 verify 闭环 (10/10 PASS 预期)

---

## 1. 2 条新规则 (K3 复制到 CF Bulk Redirect List `z_printpro_legacy_301`)

```json
{
  "redirects": [
    {
      "source_url": "https://z-printpro.com/products/business-card-printing/",
      "target_url": "https://zprintpro.com/zh-hk/",
      "status_code": 301
    },
    {
      "source_url": "https://z-printpro.com/about-us/",
      "target_url": "https://zprintpro.com/about/",
      "status_code": 301
    }
  ]
}
```

### 修法说明
- **#8 business-card-printing/**: 跳到 `/zh-hk/` (跟 K3 21:27 拍板"业务-card 跳走是设计"一致, 业务-card 页面不该在站内存在, 跳首页兜底)
- **#9 about-us/**: 跳到 `/about/` (新站有 about 路由, 跳到具体页比跳首页更合理, 跟 149 条"老 URL → 新站对应页"模式一致)

---

## 2. CF Dashboard 操作步骤 (K3 操作, Mavis 跑 verify)

### 选项 A: 用 wrangler CLI (跟 K3 7/22 21:00 149 条同模式)
```bash
# K3 在自己本地 (有 CF API token) 跑:
wrangler bulk-redirects update --list z_printpro_legacy_301 --add '[
  {"source_url":"https://z-printpro.com/products/business-card-printing/","target_url":"https://zprintpro.com/zh-hk/","status_code":301},
  {"source_url":"https://z-printpro.com/about-us/","target_url":"https://zprintpro.com/about/","status_code":301}
]'
```

### 选项 B: 用 CF Dashboard UI
1. 登录 CF Dashboard → Account → Bulk Redirects → Lists
2. 找到 `z_printpro_legacy_301` (149 条) → Edit
3. Append 2 条新规则 (上面 JSON 数组)
4. Save

### 选项 C: 用 CF API 直接 PATCH
```bash
curl -X PATCH \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/bulk_redirects/lists/$LIST_ID" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"redirects": [...149 existing + 2 new...]}'
```
⚠️ **PATCH 需要传全部 150 条** (CF API 不支持 append, 必须传完整 list), 149 条源数据在 K3 7/22 21:00 部署时手里

---

## 3. Mavis 跑改后 verify (K3 改完通知 Mavis)

### 5 项监控完整跑 (用 K3 21:27 官方 10 样本 + 2 条新规则)
```bash
cd F:\zprintpro-nextjs
node .hermes/tmp/cf-301-monitor-2026-07-22.cjs 2>&1
```

### 预期结果: **10/10 PASS** (从 8/10 闭环)
- 清单内 5/5 ✅ (不变)
- 清单外 #6 #7 #10 ✅ (不变)
- 清单外 **#8 business-card** ✅ 301 → /zh-hk/ (从 200 直出 → 修复)
- 清单外 **#9 about-us** ✅ 301 → /about/ (从 404 → 修复)

### 报告落盘
- 写到 `F:\zprintpro-nextjs\logs\2026-07-23-cf-301-monitor.md`
- 写"P0-2 闭环段": 8/10 → 10/10, K3 7/23 00:30 拍板 #8 #9 加 2 条 Bulk Redirect, K3 7/23 0X:XX 改完, Mavis 改后 verify 10/10 PASS 闭环
- commit + push (C9 攒批 1 push 1 build quota)

---

## 4. 149 → 150 规则 (K3 改完会查 Bulk Redirect List 总数)

- 改前: 149 条 (P0-2 DEPLOYED 7/21)
- 改后: 151 条 (149 旧 + 2 新)
- 验证: CF Dashboard → Bulk Redirect Lists → `z_printpro_legacy_301` → 151 条
- Mavis 跑: 改后 5 项监控 + sitemap (确保 151 条规则都生效)

---

## 5. 时序 (7/23 00:35 → K3 改 → Mavis verify 闭环)

```
K3 7/23 00:30 拍板 #8 #9 修法 A+A + GSC URL Inspection API 1
  ↓
Mavis 7/23 00:40 准备素材 (本文件 + GSC URL Inspection API SOP)
  ↓
Mavis 升级 K3: K3 7/22 21:05 不用 token, K3 自己加 2 条规则, Mavis 跑 verify
  ↓
K3 在 CF Dashboard 改 2 条规则 (5 min)
  ↓
K3 通知 Mavis 改完 (Slack/CLI)
  ↓
Mavis 跑 5 项监控 verify 10/10 PASS (10 min)
  ↓
Mavis 写闭环报告 (10 min) + commit + push (5 min)
  ↓
P0-2 8/10 → 10/10 PASS 闭环 ✅
```

---

**K3 操作完通知 Mavis**: 在 zprintpro mavis session 发 "K3 改完 2 条 Bulk Redirect 规则" + 1 段简短话 (改了啥 + 时间)
**Mavis 触发**: 5 项监控 verify + 闭环报告 + commit + push
