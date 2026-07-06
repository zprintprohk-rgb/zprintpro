# Google Search Console API 接入指南 (v2, 2026-07-06)

> **目标**：从 GSC 拉 90 天真实数据 (替代手动 export 的 `gsc_data.csv` 快照)。
> **预期时间**：首次 15-20 分钟 (GCP project + service account + Search Console 授权)。
> **前置**：[`docs/GSC-SETUP.md`](./GSC-SETUP.md) Step 1-2 已完成 (主域 + zh-hk + en + ja 已 verify)。

---

## 背景

`gsc_data.csv` 当前是 6/17 手动 export 的快照 (12 KB, 359 行, 覆盖上线 ~ 42 天)。
**问题**：
- 不是 90-day rolling window (GSC API 默认上限)
- 不是 7-day rolling window (cron prompt §rules 要求)
- 不能判 "30/90 天连续趋势" (auto-upgrade / auto-downgrade rules)

**解决**：接 GSC API → `scripts/fetch_gsc_data.py` 每次跑 cron 时拉真实 90-day rolling window。

---

## Step 1: Google Cloud Project 启用 Search Console API

1. 打开 https://console.cloud.google.com/
2. 创建或选择一个 project (e.g. `zprintpro-seo`)
3. **APIs & Services** → **Library** → 搜索 **"Google Search Console API"**
4. 点 **Enable** (启用)

---

## Step 2: 创建 Service Account + 下载 JSON Key

1. **IAM & Admin** → **Service Accounts** → **Create Service Account**
2. Service account name: `zprintpro-gsc-reader` (或任意)
3. Grant role: **不需要** (Search Console API 不需要 GCP IAM role, 权限在 GSC 那侧给)
4. **Done** → 进 service account detail → **Keys** tab → **Add Key** → **Create New Key** → **JSON**
5. 保存到：`C:\Users\Administrator\gsc-key.json` (**不要 commit, 不在 git tree 内**)

JSON 文件长这样：
```json
{
  "type": "service_account",
  "project_id": "zprintpro-seo",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "zprintpro-gsc-reader@zprintpro-seo.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  ...
}
```

**记下 `client_email`** —— 下一步要用。

---

## Step 3: 在 Search Console 把 service account 加为 User

⚠️ **关键** —— service account 必须被 GSC 显式加 user 才能 query data。

1. 打开 https://search.google.com/search-console
2. **Settings** → **Users and permissions**
3. **Add user**
4. Email: `<client_email from Step 2>` (e.g. `zprintpro-gsc-reader@zprintpro-seo.iam.gserviceaccount.com`)
5. Permission: **Owner** 或 **Full** (Read-only 不够, 但 Owner 最稳)
6. **Add**

**4 个 property 都要加** (主域 + zh-hk + en + ja)。
按 GSC UI 切换到对应 property, 重复 Step 3。

---

## Step 4: 配置 .env

`.env.example` 已经有 GSC 三件套模板值, 把它复制到 `.env` 并填真值：

```bash
cp .env.example .env
# 编辑 .env:
GSC_ACCOUNT_EMAIL=zprintpro-gsc-reader@zprintpro-seo.iam.gserviceaccount.com
GSC_KEY_FILE=C:\Users\Administrator\gsc-key.json
GSC_SITE_URL=https://zprintpro.com/
```

⚠️ 不 commit `.env` (已经在 .gitignore)。

---

## Step 5: 验证 auth + 跑一次

```bash
python scripts/verify_gsc_auth.py
# 预期全部 ✅ PASS (8/8)

python scripts/fetch_gsc_data.py --days 90 --also-fetch-sitemaps
# 预期: Fetched ~400-2000 rows. Written to: ./gsc_data.csv
# Verify: gsc_data.csv size 20-50 KB (5-10 倍现有, 因为 90 天真实窗口)
```

---

## Step 6: 集成到 cron (自动跑)

改 `gsc-feedback-run.py` 调用 `fetch_gsc_data.py` 而不是读静态 CSV：

```bash
# gsc-feedback-loop cron prompt §1 加:
"Step 0: 拉数据 — python scripts/fetch_gsc_data.py --days 90 (overwrites gsc_data.csv)"
```

这样 GSC cron **不再依赖手动 export**, 实时拉真实 90-day window。

**memory rule (orchestrator/mavis memory §13.1)**: cron 自报"完成"不算完成, orchestrator 必须跑 `verify_gsc_auth.py` + `fetch_gsc_data.py --dry-run` 独立 verify。

---

## 常见问题

**Q: service account 跟 OAuth user 有什么区别？**
A: OAuth user 是人 (你的 google account), service account 是 bot identity (机器跑的)。
   GSC API 只支持 service account (OAuth user flow 要每 7 天重新 auth 不适合 cron)。

**Q: 为什么 4 个 property 都要加？**
A: GSC API 的 `searchanalytics().query()` endpoint 一次只查一个 siteUrl。
   主域查 1 次, 3 个子目录 (zh-hk/en/ja) 各自独立查 1 次 = 4 次。

**Q: 拉 90 天 vs 16 个月？**
A: GSC API 默认窗口 90 天。要 16 个月用 manual `dimensions=['date']` + 时间分布。
   90 天对 priority_boost (当前 cron rules) 够用, 暂不需 16 月。

**Q: API quota 限制？**
A: Search Console API = **1,200 queries/minute, 600 per project per minute**。
   实际跑 = 4 properties × 1 query ≈ 3 rows/run, 远低于 quota。

**Q: 拉数据延迟？**
A: GSC 数据通常滞后 2-3 天 (Google 处理时间)。昨天或前天的数据可能不全, **别问为什么没有 "今天"**。

---

## 文件清单 (本 setup 涉及)

| 文件 | 用途 | git |
|---|---|---|
| `scripts/fetch_gsc_data.py` | 拉 90 天数据 → `gsc_data.csv` | tracked |
| `scripts/verify_gsc_auth.py` | 检查 env + key + JSON | tracked |
| `docs/GSC-API-SETUP.md` | 本文档 | tracked |
| `C:\Users\Administrator\gsc-key.json` | Service account 私钥 | **❌ NEVER commit** (在 git tree 外) |
| `.env` (本机) | 填 GSC 三件套真值 | **❌ NEVER commit** (.gitignore) |

---

**Updated**: 2026-07-06
**Status**: 服务端已 ready (Python lib 装好 + client 写好 + doc 完整), **缺 user 拍板跑 GCP + GSC setup**。
**Owner**: mavis orchestrator (user authorized)
