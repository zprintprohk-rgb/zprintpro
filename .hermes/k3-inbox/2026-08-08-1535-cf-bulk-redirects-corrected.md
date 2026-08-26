# 8/8 15:35 CF Bulk Redirect List 草稿 (修正版, per K3 §0.18 拍板)

> **拍板来源**: K3 8/8 15:35 战略级 5 段反馈 §二.2 + §0.18 重定向上线 SOP
> **修正**: 删 2 条问题规则 (`/blog/*→/zh-hk/` 覆盖多 locale 活路径 + `kraft-paper-bags→自己` 自指向)
> **新增**: 4 步 SOP (curl 验证目标 200 + 禁止兜底 + 禁止自指向 + m3u8 用 410)
> **K3 真实身份操作**: CF Dashboard → Bulk Redirects → Add rules (5 分钟事)
> **GSC 30+ URL 来源**: 8/8 14:56 K3 GSC 报告截图

## 1. 4 步 SOP (per §0.18)

1. **curl 验证目标 200**: `curl -I https://zprintpro.com/<target>/` 必须返回 200
2. **禁止兜底规则覆盖多 locale 活路径**: `/blog/*` 不覆盖 `/en/blog/*` `/ja/blog/*`
3. **禁止自指向规则**: source 和 target 不一致
4. **m3u8 用 410 正确**: CF Edge Rule (Ruleset) → 410 Gone, 不是 Bulk Redirects (301)

## 2. CF Bulk Redirect List 草稿 (修正版, 必跑 4 步 SOP)

### 类别 A: 双 locale 前缀 (Next.js as-needed 模式 bug, per §0.7 / §0.13)

```
/en/en/*        → /en$1            301
/ja/ja/*        → /ja$1            301
/zh-hk/zh-hk/*  → /zh-hk$1         301
```

**SOP 验证**:
- (1) `curl -I https://zprintpro.com/en/services/rush-printing-delivery/` 期望 200
- (1) `curl -I https://zprintpro.com/en/en/services/rush-printing-delivery/` 期望 308 → /en/services/rush-printing-delivery/
- (2) 不覆盖 `/en/services/rush-printing-delivery/` 活路径, 因为规则是 `/en/en/* → /en$1`, `/en/services/...` 不匹配 `/en/en/`

### 类别 B: 类目错位 (per K3 8/8 14:56 GSC 报告)

```
/zh-hk/product/packaging/  → /zh-hk/category/packaging/    301
```

**SOP 验证**:
- (1) `curl -I https://zprintpro.com/zh-hk/category/packaging/` 期望 200
- (2) 单一路径, 不覆盖多 locale

### 类别 C: www 域裸域跳转 (per K3 8/8 14:56 GSC 报告 5/23 + 5/13)

```
www.zprintpro.com/個から   → zprintpro.com/                  301
www.zprintpro.com/個起     → zprintpro.com/                  301
www.zprintpro.com/枚から   → zprintpro.com/                  301
```

**SOP 验证**:
- (1) `curl -I https://zprintpro.com/` 期望 200
- (2) 仅 www 域命中, 不覆盖主域

**注**: 实际是 CF 层 www 跳裸域, 不是 Bulk Redirects。如果 CF SSL/TLS Edge Certificates 已配, 不需要这条 Bulk Redirect; 否则加。

### 类别 D: 永久删除 (per K3 8/8 14:56 GSC 报告 m3u8)

```
# CF Edge Rule (Ruleset) → 410 Gone, 不是 Bulk Redirects (301)
# CF Dashboard → Rulesets → Add rule
# 匹配: http.request.uri.path matches "/upload/.*\\.m3u8$"
# 动作: 410 Gone
```

**SOP 验证**:
- (4) m3u8 用 410, 不是 301
- (1) `curl -I https://zprintpro.com/upload/22163932084.m3u8` 期望 410

## 3. 删除的 2 条问题规则 (K3 §二.2 纠偏)

### ❌ 删除 1: `/blog/* → /zh-hk/`
- **问题**: 覆盖 `/en/blog/*` + `/ja/blog/*` 活路径 (zh-hk blog 跟 en/ja blog 是不同内容)
- **修正**: 改为 仅 `/blog/* (无前缀) → /zh-hk/blog/$1`, 保留路径
- **或直接删除**: GSC 报告 5/30 /blog/design-file-specs/, 5/20 /blog/mtr-advertising-specs/ — 实际 5/30 之前可能 blog 无 locale 模式, 现在已经有 locale, 这些旧 URL 自然 404 即可 (GSC 30 天后自动消除)
- **SOP 验证**: (1) `curl -I https://zprintpro.com/blog/design-file-specs/` 期望 404 (或 308 到 /zh-hk/blog/design-file-specs/ if 已迁移)
- **K3 真实身份决定**: 删 vs 改 `/zh-hk/blog/$1`

### ❌ 删除 2: `kraft-paper-bags → 自己` (自指向)
- **问题**: 占位符 URL 实际指向正确 SKU, 不需 301
- **修正**: 完全删除该规则
- **SOP 验证**: (3) source == target, 自指向, 必删

## 4. 其他被删除的规则 (low priority / 自指向 / 覆盖多 locale)

| 规则 | 删除原因 |
|------|---------|
| `/product/* → /zh-hk/` | ❌ 覆盖 `/en/product/*` `/ja/product/*` 活路径 (PDP locale 化) |
| `/services/* → /zh-hk/services/rush-printing-delivery/` | ❌ 覆盖 `/en/services/*` `/ja/services/*` 活路径 |
| `/license/ → /zh-hk/` | low priority, GSC 无流量 |
| `/ja/guide/ → /zh-hk/` | low priority, GSC 无流量 |
| `/upload/*.m3u8 → 301 → 主域` | ❌ 应该是 410 (永久删除), 不是 301 |
| `/zh-hk/zh-hk/services/rush-printing-delivery/ → /zh-hk/...` | 重复, 已在类别 A 覆盖 |

## 5. 完整 Bulk Redirect List 必加 (4 条)

```
# 类别 A 双 locale 前缀 (3 条)
/en/en/*        → /en$1
/ja/ja/*        → /ja$1
/zh-hk/zh-hk/*  → /zh-hk$1

# 类别 B 类目错位 (1 条)
/zh-hk/product/packaging/  → /zh-hk/category/packaging/

# 类别 C www 域 (3 条, 如果 CF SSL 没配)
/www.zprintpro.com/個から   → /zprintpro.com/
/www.zprintpro.com/個起     → /zprintpro.com/
/www.zprintpro.com/枚から   → /zprintpro.com/

# 类别 D 410 (CF Edge Rule, 不是 Bulk Redirects)
/upload/*.m3u8  → 410 Gone
```

**总计**: 4-7 条 (类别 A 3 + 类别 B 1 + 类别 C 0-3 + 类别 D 1 Edge Rule)

## 6. K3 真实身份操作 SOP

```
1. CF Dashboard 登录 → zprintpro.com zone
2. Rules → Bulk Redirects → Create new redirects
3. 复制上面 4 条 Bulk Redirect (类别 A 3 + 类别 B 1)
4. Save → Deploy
5. Rules → Rulesets → Create new rule (类别 D 410)
6. 表达式: http.request.uri.path matches "^/upload/.*\\.m3u8$"
7. 动作: Custom Response → Status code 410
8. Save → Deploy
9. 验证 (K3 浏览器或 curl):
   - curl -I https://zprintpro.com/en/en/services/rush-printing-delivery/ → 308
   - curl -I https://zprintpro.com/upload/22163932084.m3u8 → 410
   - curl -I https://zprintpro.com/zh-hk/category/packaging/ → 200
```

## 7. 上线后监控

- **24h 后 GSC 重抓**: GSC 报告 30+ URL 数量下降
- **7 天后 GSC 流量**: 流量恢复或上升 (之前 404 黑洞)
- **30 天后 GSC 完全消除**: 30+ URL 全部 200/410 (GSC 自然消除)

## 8. 配额 (per §0.14)

- CF Bulk Redirects 操作**不消耗 CF build 配额** (这是 CF edge 配置, 不是 deploy)
- 5 分钟事, K3 真实身份立即跑

## 9. M3 升级 K3

K3, 404 草稿修正版已就绪:
- 删 2 条问题规则: `/blog/*→/zh-hk/` 覆盖多 locale 活路径 + `kraft-paper-bags→自己` 自指向
- 4 步 SOP: curl 200 + 禁止兜底 + 禁止自指向 + m3u8 用 410
- 4-7 条 Bulk Redirects (类别 A 3 + 类别 B 1 + 类别 C 0-3 + 类别 D 1 Edge Rule)
- 5 分钟事, K3 真实身份操作

报告: `.hermes/k3-inbox/2026-08-08-1535-cf-bulk-redirects-corrected.md` (5 KB)
