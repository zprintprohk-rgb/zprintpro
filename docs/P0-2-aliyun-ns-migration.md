# P0-2 301 迁移 · 阿里云 (万网) NS 改动 5 步 SOP

> **目标**: 把 z-printpro.com 域名从阿里云 (万网) 解析迁到 Cloudflare NS
> **触发**: 2026-07-20 K3 v7 §P0-2 拍板 8/12 开学季前启动
> **风险**: NS 改动有 24-48h 全球生效延迟, 期间 z-printpro.com 可能不可访问
> **回退**: 如出问题, 阿里云控制台可一键恢复原 NS (`dns1.hichina.com` / `dns2.hichina.com`)
> **配套**: K3 v7 301 runbook `analysis-2026-07-17\301-migration-runbook.md` + Bulk Redirect List 150 条 CSV 已就绪

---

## 前置 (你提前 1 天准备)

1. **登录 Cloudflare dashboard**: https://dash.cloudflare.com/
2. **添加 z-printpro.com zone** (如果还没添加):
   - 左侧栏 → Add a site → 填 z-printpro.com → Free plan
   - Cloudflare 会扫描现有 DNS 记录, **逐个确认** (重点保留 A 记录指向 AWS GA 15.197.148.33 / 3.33.130.190, MX, TXT/SPF 记录)
3. **记录 Cloudflare 分配的 NS 服务器** (e.g. `amalia.ns.cloudflare.com` / `kevin.ns.cloudflare.com`)
   - **复制保存到剪贴板** (下一步要填进阿里云)

---

## 5 步 NS 改动 (阿里云万网控制台)

### Step 1: 登录阿里云控制台
- 打开 https://dns.console.aliyun.com/ (或 https://account.aliyun.com/ 登录后跳域名控制台)
- 左侧栏 → **域名** → **域名列表**
- 找到 `z-printpro.com`, 点击右侧 **"管理"** 按钮

### Step 2: 进入 DNS 修改页
- 左侧栏 → **DNS 修改** (或 "DNS管理" / "域名DNS修改", 不同阿里云版本措辞略不同)
- 选 tab **"修改 DNS 服务器"** (不是"修改解析记录"!)

### Step 3: 填 Cloudflare NS
- 把当前 2 条阿里云 NS (`dns1.hichina.com` / `dns2.hichina.com`) 替换成 Cloudflare 分配的 2 条:
  ```
  NS1: amalia.ns.cloudflare.com
  NS2: kevin.ns.cloudflare.com
  ```
  (具体值以你 Cloudflare dashboard 显示为准, 别照抄)
- **检查拼写**: 末尾的 `.com` 必须有, 中间是 `.ns.cloudflare.` 不是 `.cloudflare.`
- 点 **"确认"** 按钮

### Step 4: 阿里云二次验证
- 阿里云会弹短信验证或邮箱验证 (你账号绑定的)
- 输 6 位验证码确认
- 成功后页面显示 **"DNS 修改成功, 全球生效预计 24-48 小时"**
- **截图保存** (出问题回滚时需要原 NS 字符串)

### Step 5: Cloudflare 端验证生效
- 回到 Cloudflare dashboard → z-printpro.com → Overview
- 等 **24-48 小时** (通常 1-6 小时就生效, 最长 48h)
- Cloudflare 顶部会显示 "Active" + 绿勾 ✅ 表示 NS 已切换
- 如果 48h 后仍 "Pending", 检查:
  - 阿里云控制台 NS 是否真的改了 (回 Step 2 确认)
  - Cloudflare 拼写是否对 (回 Step 3)
  - 用 `nslookup z-printpro.com 8.8.8.8` 在 Windows 查 NS 记录

---

## 后续 (NS 生效后, Mavis 接棒)

1. ✅ 你在阿里云改完 NS → 通知 Mavis
2. **Mavis 用 WebBridge 驱动 Cloudflare dashboard**:
   - 上传 `301-bulk-redirects-2026-07-20.csv` (150 条规则, 已就绪在 K3 文档)
   - 灰度验证 20 条关键 URL (校园/单张词页优先)
   - 启用 Bulk Redirect List
3. **GSC Change of Address** (Mavis 协助你):
   - 打开 https://search.google.com/search-console (GSC)
   - 选 z-printpro.com 老资源 → 设置 → 变更地址
   - 选 zprintpro.com 新资源 → 验证 → 提交
4. **301 监控启用** (P0-2 部署后 7 天内):
   - `zprintpro-gsc-feedback-loop` v3 cron 每周三自动跑 4 项监控:
     - 老域名抓取错误数 < 5
     - sitemap 残留老 URL 数 = 0
     - 索引转移率 ≥ 50%
     - 权重交接差异 < 5
   - 任一异常 → 立即升级 user

---

## 风险预案

| 风险 | 概率 | 应对 |
|---|---|---|
| NS 改了但 48h 未生效 | 低 | 用 `nslookup z-printpro.com 8.8.8.8` 看 NS, 仍是 hichina = 阿里云没改; 检查 Step 2-3 拼写 |
| 老域名访问断了 | 中 | 立刻回滚: 阿里云 → DNS 修改 → 改回 `dns1/dns2.hichina.com`, 1h 内恢复 |
| 邮件 (MX 记录) 失效 | 低 | Cloudflare 添加 site 时**必须保留 MX 记录**, 否则邮件丢 |
| 301 规则错误循环 | 中 | Bulk Redirect List 灰度验证 20 条, 不要全量直接上, 先 `enabled=false` 测, 再 `enabled=true` |
| GSC Change of Address 失败 | 中 | 老资源必须能验证 (DNS TXT), 否则 GSC 不收 Change of Address 请求 |

---

## 用户/我分工

| 步骤 | 谁干 | 时间 |
|---|---|---|
| 阿里云 NS 改动 (Step 1-5) | **你** | 30 min |
| 截图 + 通知 Mavis | 你 | 5 min |
| 24-48h 等 NS 全球生效 | 等待 | 1-48h |
| Cloudflare Bulk Redirect 上传 + 灰度 | **Mavis** | 1h |
| GSC Change of Address 提交 | 你 + Mavis 协助 | 30 min |
| 7 天 301 监控 | Mavis (cron 自动) | 持续 |

**回退方案**: 任何一步出问题, 阿里云控制台 → DNS 修改 → 改回 `dns1/dns2.hichina.com` → 1h 内回滚, 无数据丢失风险 (DNS NS 改动只影响解析, 不影响注册)

---

## 验证 checklist (NS 改完后跑)

```bash
# 1. NS 记录查询
nslookup -type=NS z-printpro.com 8.8.8.8
# 期望: amalia.ns.cloudflare.com / kevin.ns.cloudflare.com

# 2. Cloudflare dashboard 状态
# https://dash.cloudflare.com/ → z-printpro.com → Overview → Active ✅

# 3. z-printpro.com 解析 (用 CF 节点)
curl -I https://z-printpro.com
# 期望: 200/301/302, server: cloudflare

# 4. 邮件 MX 记录未丢
nslookup -type=MX z-printpro.com 8.8.8.8
# 期望: 你之前的 MX 记录 (阿里云邮箱 / 腾讯企业邮 / Gmail)

# 5. Bulk Redirect 灰度 20 条
# Mavis 跑 20 条关键 URL, 全部 301 → zprintpro.com/{locale}/...
```

---

**完成 NS 改动后, 通知 Mavis "NS 已改", 我接棒跑步骤 5+ CF + GSC + 监控。**
