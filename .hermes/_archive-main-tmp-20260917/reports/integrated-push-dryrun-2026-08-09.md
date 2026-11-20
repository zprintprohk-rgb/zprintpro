# 整合 push dry-run 预验证报告 (T3, 8/9 23:50 Mavis 提前执行)

> **执行时间**: 2026-08-09 23:50 (Mavis 战略大脑, 提前执行 8/10 上午任务)
> **目的**: K3 回 "1-5 OK" 后 30 分钟内可 push, 不等验证
> **触发**: K3 9:00 拍 4 字+4 件 → M3 8/10 跑整合 push

## 5 步结果 (PARTIAL)

| Step | 项 | 结果 |
|------|---|------|
| 1 | encoding check (M + A files) | **FAIL** (200+ 临时文件 A staged, 污染检查) |
| 2 | 简体字守门 | PASS (pre-commit hook auto) |
| 3 | tsc --noEmit | DRY-RUN (信任 117f9fc 8/8 15:20 PASS) |
| 4 | npm run build | DRY-RUN (信任 117f9fc 8/8 15:20 PASS) |
| 5 | 12 files 清单核对 | PARTIAL (12 files 大部分未改, 待 K3 触发后实施) |

## 当前 working tree 状态 (8/9 23:50)

```
M  .hermes/cron-prompts/zprintpro-daily-content-1x7w.md  (v9.0 → v9.1, 68.0 KB, K3 8/9 18:23 升级)
M  src/app/[locale]/about/page.tsx  (工厂图 placeholder 隐藏, 8/8 14:43 K3 拍板)
A  200+ 临时 .py / .txt / __pycache__/  (M3 之前任务遗留, 8/10 M3 必跑 unstage)
```

**8/10 M3 必跑**: `git reset HEAD .hermes/__pycache__/ .hermes/*.txt .hermes/*-*.py` (清理 A 状态, 节省 200+ 临时文件 commit 噪音)

## 整合 push 12 files 状态

| # | 文件 | 状态 | 备注 |
|---|------|------|------|
| 1 | `src/lib/seo.ts` | 待改 | locale 切换 5 处 + `getSiteName(locale)` helper |
| 2 | `src/app/[locale]/blog/[slug]/page.tsx` | 待改 | `siteConfig.name` → `getSiteName(locale)` |
| 3 | `src/app/[locale]/about/page.tsx` | **部分改 M** (工厂图 placeholder 隐藏 L386-401) | siteName 改待加 |
| 4 | `src/app/[locale]/case-studies/page.tsx` | 待改 | `siteConfig.name` → `getSiteName(locale)` |
| 5 | `src/app/[locale]/press-kit/page.tsx` | 待改 | `siteConfig.name` → `getSiteName(locale)` |
| 6 | `src/data/products.ts` | **已改 568087a** (5 zh-hk brand 修复 in 2 SKU 块) | 14 SKU 改字待跑 |
| 7 | `src/lib/seo/schema-extensions.ts` | 待改 | `sku: product.slug` 补全 (PDP 实际 Product 段) |
| 8 | `AGENTS.md` | 待改 | §0.15/0.16 段新增 |
| 9 | `public/llms.txt` | 待改 | 8 locale 子文件 siteName locale 化 |
| 10 | `public/llms-full.txt` | 待改 | 同上 |
| 11 | `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` | **部分改 M** (v9.0 → v9.1, 68.0 KB) | 已升级 working tree |
| 12 | `.hermes/industry-keyword-matrix.json` | 待改 | v4 → v5 (7/12 已升级, working tree 状态待确认) |

## K3 必拍输入 (6 项, 阻塞 P0)

1. **X URL** — 9:00 K3 提供
2. **LinkedIn URL** — 9:00 K3 提供
3. **15 SKU 改字审字** (草稿: `k3-inbox/0400` + `0430` 两份)
4. **Org sameAs 改 diff 审字**
5. **locale 切换 5 处审字** (草稿: `k3-inbox/0712`)
6. **IndexNow key** — K3 8/8 15:35 拍板"提前到 8/9 必提供"

**K3 回 "1-5 OK" + 1/2/6** → M3 30 分钟内整合 push 1 effective (B 方案 1 amend 1 build)

## K3 手动 5 件 (5-10 分钟, 不耗 build 配额)

1. **CF Bulk Redirects 上线** (修正版, `k3-inbox/1535-cf-bulk-redirects-corrected.md`, 4 条 Bulk + 1 Edge Rule 410)
2. **formsubmit.co 激活邮件点链接** (8/7 18:45 触发)
3. **Supabase dashboard 查 4 链** (fae355ba / 4892080c / 360e8366 / 117f9fc f67b1991)
4. **3 设备端到端** (Desktop Chrome / Mobile Safari / Android Chrome)
5. **GMC 诊断页查被拒数** (整合 push 后 24h)

## K3 diff 草稿已就绪 (5 份)

- `.hermes/k3-inbox/2026-08-08-0712-8-9-locale-switch-diff-for-k3-review.md` (9.6 KB, locale 切换 5 处)
- `.hermes/k3-inbox/2026-08-08-1535-8-9-integrated-push-checklist.md` (9 KB, 7 项内容)
- `.hermes/k3-inbox/2026-08-08-1535-cf-bulk-redirects-corrected.md` (6.5 KB, 404 修正版)
- `.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md` (13.7 KB, v2 JA/EN)
- `.hermes/k3-inbox/2026-08-08-0430-zh-hk-sku-diff-for-k3-review.md` (15.4 KB, v3 zh-hk)

## M3 8/10 必跑 (T1-T8, per Mavis 战略 8/9 18:23 落盘 + 千问战略 8/9 18:18 落盘)

1. **T1 retrofit cmyk-guide** (千问战略 P1, 跟整合 push 独立, 8/10 10:15 daily cron 触发)
2. **T2 about 攒批合入** (跟 cmyk 同 push, 节省 1 push 配额)
3. **T3 整合 push** (本报告, K3 "1-5 OK" 触发后跑 src/ 改字 + npm run build + push, 1 amend 1 build)
4. **T4 台账与报告纪律** (按 git log 实际计数 + 转化验证 soft/hard 分层)
5. **T5 8/11 + 8/12 预排** (paper-materials + same-day-flyers + 8/12 复盘)
6. **T6 M3 自主抓取 m3-task-cards/ dry-run** (Mavis 战略, 8/10 验证 5 步全通)
7. **T7 cron v9.1 攒批** (跟整合 push 一起 1 push)
8. **T8 m3-task-cards/ 清理** (待 K3 拍板, 7/21-7/26 v6-v20 战略移到 `_archive/` 子目录)

## 风险

- K3 不拍 "1-5 OK" → M3 8/10 仍跑 T1+T2 retrofit 主线 (跟整合 push 解耦)
- 整合 push 12 files 部分 src/ 改字没实施 → K3 触发后实施 (预计 30-60 分钟)
- npm run build 失败 → 立即升级 K3, 不强行 commit (per K3 8/8 15:35 §0.17)
- §0.19 暂停信号 → K3 说"暂停"立即 `mavis cron delete`, 不发 progress tag
- 200+ A 状态临时文件 → 8/10 M3 跑前必 unstage, 节省 commit 噪音

## EOF · 8/9 23:50

报告: `.hermes/reports/integrated-push-dryrun-2026-08-09.md`
