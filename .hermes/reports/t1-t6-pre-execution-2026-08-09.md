# T1 + T6 提前执行报告 (8/9 23:50 Mavis 战略大脑)

> **执行时间**: 2026-08-09 23:50 (Mavis 提前执行 8/10 上午任务)
> **目标**: T1 cmyk retrofit + T6 M3 自主抓取 dry-run 准备
> **接收方**: M3 8/10 daily cron 10:15 触发时

## T1 · cmyk-guide retrofit 准备 (8/10 必跑)

### 现状 (8/9 23:50)

- **slug**: `cmyk-guide` (src/data/blog-posts.ts:366, src/data/blog-data/zh-hk.json:67)
- **6 篇 partial retrofit 进度 3/6** (per 千问 8/9 18:18 战略):
  - ✅ done: apparel-shopping-bag-printing-guide → **改装为 ecommerce-shipping-bag-printing-guide** (8/7)
  - ✅ done: cross-border-ecommerce-shipping-box-guide → **改装为 media-merchandise-box-printing-guide** (8/8)
  - ✅ done: baby-product-label-sticker-printing-guide (8/9, 0d46a4c retrofit)
  - ⏳ 待 retrofit: cmyk-guide (8/10)
  - ⏳ 待 retrofit: paper-materials (8/11)
  - ⏳ 待 retrofit: same-day-flyers-printing-hong-kong-guide (8/12)

### M3 8/10 retrofit SOP (per v8 模板 v2)

**前置 grep 必跑** (§0.1 双数据源教训):
```bash
grep -rn "cmyk-guide" src/data/  # 找全源文件
ls src/data/blog-data/{zh-hk,en,ja}.json  # 3 locale JSON
```

**9 段结构** (zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词):
1. 段 0 重點摘要 (zh-hk) / TL;DR (en) / 要約 (ja) — 蓝字 `text-[#1A56DB] font-medium`
2. 段 1 行业概況 (CMYK 印刷市场 2026 + 全球 $890B + 中国 30% 跨境增长)
3. 段 2 材質工藝 (4 大色域模式: CMYK / CMYK+OGV / CMYK+白光 / CMYK+UV)
4. 段 3 設計細節 (Pantone 對色 / ΔE ≤2 / 出血 3mm)
5. 段 4 選購決策 (5 FAQ H3 化: Q1:/Q2:/Q3:/Q4:/Q5: + A1:/A2:/A3:/A4:/A5:)
6. 段 5 黃 callout (Box) (Statista 2026 + $890B + 30% 跨境 + 4 色域模式分布)
7. 段 6 印刷流程 + 2 table (色域对比表 / 材質适配表)
8. 段 7 案例 + 末尾藍 CTA box (5 SKU: 包裝盒/標籤/海報/手冊/卡片 + 1 quote 入口)
9. 段 8-9 Author Bio + Sources + Disclaimer 3 块 (15+ 年色彩管理 + 100+ 国家 + ISO 12647-2 / GRACoL 7 认证)

**Tier A 跨境電商 / 美妝護膚 场景词** (per 千问 T1), 遵守 §13.10 NAP 脱钩 + §13.13 3 locale 铁律

**防 ja FAQ bug 复现 (8/9 教训)**: retrofit 脚本 FAQ 锚点匹配必须用**动态 H3 解析**, 禁止硬编码 anchor 字符串; ja 跑完立即 grep `A1:` 出现次数, >4 即判定重复, 当场修

### 5 步 verify (§0.7 production smoke 4 步 + R6 step 0)

1. encoding check (3 files UTF-8 LF, 排除 200+ A 临时文件)
2. 简体字守门 (zh-hk 0 简体)
3. `npx tsc --noEmit` (TypeScript 0 error)
4. `npm run build` (Compiled successfully, 5/5 static pages)
5. 1 commit 1 push + CF Pages build success + 3 locale 200 + schema ≥3

### Commit message 草稿

```
feat(blog-retrofit): 8/10 v8.3 retrofit cmyk-guide (8.0/15 → 100% v8_ready) + 5 步转化验证 + about 工厂图隐藏攒批

任务 B (retrofit): cmyk-guide 8.0/15 → v8_ready
- 3 locale (zh-hk/en/ja) blog-data/{zh-hk,en,ja}.json 改造:
  - 段 0 重點摘要 (zh-hk) / TL;DR (en) / 要約 (ja) — 蓝字 text-[#1A56DB] font-medium
  - 段 1 末尾黄 callout (Statista 2026 + $890B + 30% 跨境 + 4 色域模式分布)
  - 5 FAQ H3 化 (Q1:/Q2:/Q3:/Q4:/Q5: + A1:/A2:/A3:/A4:/A5:)
  - 末尾灰色 div → v8 蓝 CTA box (5 SKU: 包裝盒/標籤/海報/手冊/卡片 + 1 quote 入口)
  - 末尾 Author Bio + Sources + Disclaimer 3 块 (15+ 年色彩管理 + 100+ 国家 + ISO 12647-2 / GRACoL 7 认证)
- 3 locale chars: zh-hk 800-1000 / en 250-350 / ja 250-350 (估算)
- retrofit 必保留: slug / 主关键词 / 产品锚定 / NAP ✓

合入 about 工厂图 placeholder 隐藏 (8/8 14:43 K3 拍板):
- src/app/[locale]/about/page.tsx L386-401 {false && (...)} 包裹
- K3 拍图后改 {true && (}
- 节省 1 push 配额 (B 方案 1 amend 1 build, §0.1 攒批)
```

### 风险

- ja FAQ 重复 bug 复现 → 当场 v2 修, 不延后
- 触发任何封版文件 diff → 立即停手升级 (§0.3)
- CF build 失败 / push 报错 / curl 5xx → 立即升级 K3, 不报完成

---

## T6 · M3 自主抓取 m3-task-cards/ 目录机制 dry-run

### 机制 (per cron v9.1 §v9.1.A)

**M3 cron 启动必跑 5 步** (SOP, 8/10 验证全通):

1. `ls -t .hermes/m3-task-cards/ | head -1` 找最新 m3-task-cards 文件
2. 读 m3-task-cards 头部签发 + 角色 (Mavis / 千问 / K3)
3. 评估上次 cron 完成态 (`.hermes/reports/` + `.hermes/k3-inbox/` 最新日期)
4. 按 T1-T5 任务卡执行 (千问战略) + T6 自主抓取 (Mavis 战略)
5. 写本次 cron reports/ + k3-inbox/ + 标记 m3-task-cards/ 完成

### 8/10 dry-run 预期 (per Mavis 8/9 18:23 战略)

**Step 1 (ls 最新)**:
```bash
$ ls -t .hermes/m3-task-cards/ | head -1
2026-08-09-mavis-phase-strategy-8-10.md
```
预期: Mavis 战略 8/9 18:23 落盘 (7.6 KB)  ✅

**Step 2 (读 m3-task-cards)**:
- 签发: Mavis (战略规划大脑)
- 生效: 2026-08-09 → 2026-08-12 复盘日
- T1-T8 任务列表
- 抓取方: M3 (执行体)
预期: 全部读出 ✅

**Step 3 (评估完成态)**:
- `.hermes/reports/` 最新日期: `integrated-push-dryrun-2026-08-09.md` (8/9 23:50 dry-run)
- `.hermes/k3-inbox/` 最新日期: `2026-08-09-0930-v8.3-retrofit-baby-product.md` (8/9 16:40 retrofit done)
- 6 篇 partial retrofit 进度 3/6 (apparel + cross-border + baby-product done)
预期: M3 8/10 跑 retrofit 4/6 (cmyk done) ✅

**Step 4 (执行 T1-T8)**:
- T1: cmyk retrofit (本报告 §T1 SOP)
- T2: about 攒批 (跟 T1 同 push)
- T3: 整合 push (等 K3 "1-5 OK" 触发)
- T4: 台账纪律 (按 git log 实际 + soft/hard 分层)
- T5: 8/11 + 8/12 预排
- T6: 本任务 (M3 自主抓取 dry-run 验证)
- T7: cron v9.1 攒批 (跟整合 push 一起)
- T8: m3-task-cards/ 清理 (K3 拍板后)
预期: T1+T2 必跑, T3-T8 等触发 ✅

**Step 5 (写 reports/ + k3-inbox/ + 标记完成)**:
- `.hermes/logs/2026-08-10-日运营报告.md` (K3 14 章节格式)
- `.hermes/k3-inbox/2026-08-10-0930-v8.3-retrofit-cmyk.md` (retrofit done 升级 K3)
- `.hermes/reports/conversion-link-check-2026-08-10.json` (soft/hard 分层)
- m3-task-cards/2026-08-09-mavis-phase-strategy-8-10.md 标记完成 (8/10 retrofit done 后)
预期: 全部落盘 ✅

### 失败兜底

- M3 抓取机制 bug → M3 仍按 v9.0 cron prompt 跑, T1-T5 retrofit 主线
- 5 步任一失败 → 立即升级 K3, 不报完成
- 200+ A 临时文件污染 → M3 跑前必 `git reset HEAD .hermes/__pycache__/ .hermes/*.txt`

### dry-run 报告 (8/9 23:50 写)

- 本报告: `.hermes/reports/t1-t6-pre-execution-2026-08-09.md` ✅
- T3 dry-run 报告: `.hermes/reports/integrated-push-dryrun-2026-08-09.md` ✅
- Mavis 战略: `.hermes/m3-task-cards/2026-08-09-mavis-phase-strategy-8-10.md` ✅
- 千问战略: `.hermes/m3-task-cards/2026-08-09-qwen38-phase-strategy-8-10.md` ✅
- cron v9.1: `.hermes/cron-prompts/zprintpro-daily-content-1x7w.md` (68.0 KB) ✅
- MEMORY §0.17/0.18/0.19: 196.8 KB ✅

5 件 SSoT 落盘, M3 8/10 触发时所有材料就绪。

---

## EOF · 8/9 23:50 Mavis 战略大脑

报告: `.hermes/reports/t1-t6-pre-execution-2026-08-09.md`
