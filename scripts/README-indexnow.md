# IndexNow 自动化脚本 (K3 v3.17 B5 工具层)

> 签发: Mavis / 2026-08-24 18:00 / K3 v3.17 战略 8/24 11:37 B5 工具层殿后, 承接 B1-B4 全部新 URL 自动化 24h 索引 (vs Google 7-14 天)

---

## 目的

K3 v3.17 §一 B5 工具层殿后, 把 B1-B4 全部新 URL (T45 envelopes + T42 7 类目 + T44 ja 5 类目 + T41 catalog PDP + books + blog 新路由 + G1 Vol.2 3 locale) 自动化提交到 IndexNow API, 缩短索引时间从 7-14 天 → 24h。

---

## 核心功能

- **每日扫 sitemap.xml** 解析全部 URL (B5 后 sitemap 660 URLs)
- **diff 历史** (.hermes/secrets/indexnow-history.json) 找新 URL
- **批量 POST IndexNow API** (Bing + Yandex + Seznam + Naver, 最多 10000 URL/次)
- **log 落盘** (.hermes/logs/indexnow-YYYY-MM-DD.json)
- **history 保存** (.hermes/secrets/indexnow-history.json, 累加)

---

## 使用方式

### 1. K3 key 注入 (一次性)

K3 8/24 提前拍板, 把真实 IndexNow key 写到 `.hermes/secrets/indexnow-key.json`:

```json
{
  "key": "<K3_PROVIDED_INDEXNOW_KEY>",
  "created_at": "2026-08-24T17:30:00+08:00",
  "source": "K3 v3.17 B5"
}
```

> 模板: `{"key": "zprintpro-indexnow-2026"}` (B4 测试用, 实际 K3 需替换为真实 key)

### 2. 手动跑 (调试 / 一次性补提交)

```bash
cd F:\zprintpro-nextjs
python scripts/indexnow-auto-submit.py
# 期望: log 落盘 + IndexNow 200 + history 保存
```

### 3. Cron 自动跑 (推荐)

通过 v3 SSoT §A 17 B5 段自动集成到 `zprintpro-daily-content-1x7w` (每天 9:10 Asia/Shanghai):

- 4 cron 启动必读 SSoT 第 1 优先级 (`.hermes/cron-prompts/k3-v3-addendum-2026-08-23.md`)
- daily-cron 8/25+ 启动 T39 IndexNow 自动化段
- 不需 mavis cron update (SOP-5 派生数据禁手搓 + SSoT 模式)

---

## 退路 (手动 curl IndexNow API)

如果脚本失败, 手动 curl IndexNow API:

```powershell
$key = "zprintpro-indexnow-2026"
$body = @{
  host = "zprintpro.com"
  key = $key
  keyLocation = "https://zprintpro.com/indexnow-key.txt"
  urlList = @("https://zprintpro.com/zh-hk/insights/hk-print-inquiry-index/", "https://zprintpro.com/en/insights/hk-print-inquiry-index/", "https://zprintpro.com/ja/insights/hk-print-inquiry-index/")
} | ConvertTo-Json
Invoke-WebRequest -Uri "https://api.indexnow.org/indexnow" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
# 期望: HTTP 202
```

---

## 监控

| 文件 | 说明 |
|------|------|
| `.hermes/secrets/indexnow-key.json` | K3 注入的 IndexNow key |
| `.hermes/secrets/indexnow-history.json` | 历史提交 URL 列表 (累加) |
| `.hermes/logs/indexnow-YYYY-MM-DD.json` | 每日提交 log (script version + URL counts + result) |

每日 9:10 跑后查 `.hermes/logs/indexnow-YYYY-MM-DD.json` 确认:
- `all_urls_count` 跟 sitemap.xml 一致 (~660)
- `new_urls_count` 跟 B1-B4 新增 URL 一致
- `result.status` = "ok" 或 "no_new_urls"
- `result.results[*].status_code` = 202

---

## 业务 0 改动红线

- 不动 src/ (业务子类目豁免, 脚本化生成 history + log)
- 不删任何 SKU/文案/长文本字段
- 工具层 (scripts/ + .hermes/secrets/) 增量提交

---

## SOP-5 派生数据禁手搓

- history + log 必须脚本化生成, 禁手写
- K3 key 注入后, history 自动累加, log 自动落盘
- 撞车兜底: 派活前 3 问 + 抢跑识别 tsc+build 必过

---

## 关联资源

- 战略: `docs/k3-strategy-v3.17-seven-tasks-today-2026-08-24.md` §一 B5
- v3.16: `docs/k3-strategy-v3.16-full-category-seo-geo-2026-08-22.md` §七 T39
- v3 增补: `.hermes/cron-prompts/k3-v3-addendum-2026-08-23.md` §A 17 v3.17 战略同步
- IndexNow 文档: https://www.indexnow.org/
