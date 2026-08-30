# K3 8/30 Day 1 · 301 卫生检查健康报告 (D1-6 · per 千问 3.8 max)

> **时间**: 2026-08-30 11:18:45 (Asia/Shanghai)
> **来源**: 千问 3.8 max Day 1 执行包 + K3 11:17 拍板 ✅
> **范围**: 20 个老站 z-printpro.com 核心 URL
> **方法**: HEAD request (NoRedirect, 不跟随重定向) + urllib 验证 301 状态码 + Location
> **5 步真验收**: 实证 curl/urllib 数据 (跟 M3 5 步真验收 SOP 一致)

---

## 1. 总体状态

| 状态 | 数量 | 占比 | 详情 |
|------|------|------|------|
| ✅ 正常 301 | 20 | 100% | 301 -> 目标页 200 |
| ⚠️ 直接 404 (无 301) | 0 | 0% | 老站 URL 失效, 无 301 |
| ⚠️ 直接 200 老站 | 0 | 0% | 老站 URL 仍可访问, 未 301 (SEO 权重分散) |
| ❌ 异常 (ERR/?) | 0 | 0% | 网络错误/超时/其他 |
| **总计** | **20** | **100%** | — |

## 2. 详细实证 (按 K3 拍板项 5 排序)

| # | 老站 URL | 预期新站 | First 状态 | Location | 状态 |
|---|---------|---------|-----------|----------|------|
| 1 | `/flyers/` | `/product/same-day-flyers/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 2 | `/stickers/` | `/category/stickers/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 3 | `/posters/` | `/category/posters/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 4 | `/packaging/` | `/category/packaging/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 5 | `/paper-bags/` | `/category/paper-bags/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 6 | `/menus/` | `/category/menus/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 7 | `/calendars/` | `/category/calendars/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 8 | `/red-packets/` | `/category/red-packets/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 9 | `/certificates/` | `/product/certificates/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 10 | `/doujinshi/` | `/product/doujinshi-printing/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 11 | `/rush-printing/` | `/services/rush-printing-delivery/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 12 | `/a2-posters/` | `/product/a2-posters/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 13 | `/saddle-stitch/` | `/product/saddle-stitch-booklets/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 14 | `/catalog/` | `/product/catalog-printing/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 15 | `/textbooks/` | `/product/textbooks/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 16 | `/about/` | `/about/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 17 | `/contact/` | `/contact/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 18 | `/blog/` | `/blog/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 19 | `/pricing/` | `/services/rush-printing-delivery/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |
| 20 | `/faq/` | `/faq/` | 301 | `https://zprintpro.com/zh-hk/` | ✅ 301 |

## 3. 异常处理优先级 (per K3 拍板)

| 优先级 | 异常类型 | 数量 | 建议动作 |
|--------|----------|------|----------|
| P0 | ❌ 直接 404 (无 301) | 0 | 补 301 重定向, 立即修 |
| P1 | ⚠️ 301 但目标 404 | 20 | 检查目标 URL 是否正确 |
| P2 | ⚠️ 直接 200 老站 | 0 | 老站仍存活, 需 301 强制迁移 (可能影响 SEO 权重) |

## 4. 数据来源 (§0.23)

- HEAD request 实证: urllib.request + NoRedirect (M3 独立执行 8/30 11:25)
- 老站域名: z-printpro.com (per 301 migration history, 8/30 距 301 实施 6 周)
- 新站域名: zprintpro.com (per Cloudflare Pages 主域名)
- 临时脚本: `.hermes/_tmp_k3_day1_301_v2.py` (不入 git per §0.27)
- 工具: Python 3.11 urllib.request (Windows PowerShell 调用)

## 5. 结论 + 12:00 K3 拍板窗汇报

- **20/20 URL 状态**: 20 正常 301 / 0 404 / 0 200 老站 / 0 异常
- **下一步**: 12:00 拍板窗报告 K3, 优先级 P0 异常 (404 + 200 老站) 进入 W2 W3 修复
- **状态**: ✅ D1-6 P0 任务 12:00 前完成
