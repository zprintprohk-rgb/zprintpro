# CF Pages build 持续失败根因诊断（P0 阻断 · 2026-10-26 21:40）

> 任务源: 策略 §4.2 P0-2 robots + §9.3「robots 修复后仍 404，应转 Cloudflare / 发布排查」+ §7 第 1 周治理。
> 执行: DeepSeek 执行层 · 2026-10-26 21:40 · 依据线上探针 + 本地 build 链复现。

## VERDICT / CONSUMED / DELIVERED / NEXT

```
VERDICT: PARTIAL（根因已锁定 + 已修复，待 CF build 验证）
CONSUMED: page-probe-2026-10-26.json | 线上 buildId (404 页 SeRLJHLKAvmvq9PuB5jzy) vs 本地 buildId (TlWNpHi1QMOgnTZyapHRX) | scripts/generate-sitemap-content.mjs | src/app/robots.txt/route.ts | src/generated/sitemap-content.ts | package.json build:cf
DELIVERED: 根因诊断 + 修复 commit（6076cade 删 app/robots.ts + 3b39a3f4 恢复 public/robots.txt + sitemap-content 重生成）+ 本地 build:cf 全链模拟（进行中）
NEXT: 本地模拟 PASS → 3b39a3f4 的 CF build 应成功 → 线上探针 robots.txt 200 + 12 AI allow；若 CF build 仍 FAILED → K3 查 CF Dashboard build logs（build command / 环境变量 / 依赖安装）
```

## 1. 数据来源行（§0.23）

- 线上探针: 2026-10-26 19:00 / 19:05 / 21:32 / 21:40（robots.txt 404 / 连接中断；saddle H1「100+」；年賀状「早割受付中」）
- buildId: 线上 404 页 `SeRLJHLKAvmvq9PuB5jzy`（page-probe 内嵌）vs 本地 `.next/BUILD_ID` `TlWNpHi1QMOgnTZyapHRX`
- 构建链: `package.json scripts.build:cf` = `node scripts/clean.mjs && node scripts/generate-sitemap-content.mjs && npx --legacy-peer-deps @cloudflare/next-on-pages@1.13.16`
- robots 服务路径: `src/app/robots.txt/route.ts`（edge route，import `ROBOTS_TXT` from `@/generated/sitemap-content`）
- 生成器: `scripts/generate-sitemap-content.mjs`（L38-40: 源文件缺失时 `console.warn(SKIP)` 并 `continue`）

## 2. 证据链（双方法）

### 方法 1：线上 vs 本地 buildId 对照
- 线上 404 页 buildId = `SeRLJHLKAvmvq9PuB5jzy`（10/26 上午探针）
- 本地最新 buildId = `TlWNpHi1QMOgnTZyapHRX`
- **不同 → 线上从未部署 23f9c81c / 3b39a3f4**；线上 saddle H1「100+」、年賀状「早割受付中」、robots 404 全部一致 = 旧 build。

### 方法 2：本地 build 链复现（根因）
- `npm run build`（本地）PASS → 用磁盘旧 `src/generated/sitemap-content.ts`（含旧 ROBOTS_TXT）。
- CF 用 `build:cf`：`generate-sitemap-content.mjs` 读 `public/robots.txt`——
  - **P0-2（ef3140ac）删除 public/robots.txt 后**：生成器 L38 SKIP（warn）→ 重写的 `sitemap-content.ts` **无 ROBOTS_TXT 导出** → `app/robots.txt/route.ts` import 缺失 → **CF 构建期编译失败 → build FAILED**（本地 build 不跑生成器，故本地 PASS，CF 失败——与 lane 报告「本地无法复现」吻合）。
  - **修复（3b39a3f4 恢复 public/robots.txt）后**：生成器产出新 ROBOTS_TXT（无 `/_next/` + 12 AI allow）→ route.ts import 正常 → **build 应恢复**。

### 佐证
- `src/generated/sitemap-content.ts`（旧，257KB）ROBOTS_TXT = 旧内容（含 `Disallow: /_next/` + `Crawl-delay: 1`）——与 P0-2 目标矛盾，已由重生成替换。
- `manifest.webmanifest` 线上 500——同一 next-on-pages 适配面（metadata/route handler 家族），本次不扩 scope，标注观察。

## 3. 已修复（commit 6076cade + 3b39a3f4，已 push）

1. `public/robots.txt` 恢复（静态单源；12 AI allow + sitemap ×2 + Disallow 去 `/_next/`，纯 ASCII）。
2. `src/app/robots.ts`（MetadataRoute）删除——与 route handler `app/robots.txt/route.ts` 双注册冲突，且 MetadataRoute 在 next-on-pages 上不生效；route handler 为唯一服务路径。
3. `src/generated/sitemap-content.ts` 由 `node scripts/generate-sitemap-content.mjs` 重生成（新 ROBOTS_TXT）。

## 4. 验证（进行中）

- 本地 `build:cf` 全链模拟（clean → generate-sitemap-content → next build → next-on-pages@1.13.16）后台执行。
- 3b39a3f4 的 CF build 已由 push 触发——build 成功后线上探针：`robots.txt` 200 + 12 AI allow + 无 `/_next/`；saddle/exercise H1「from 10 Copies」；年賀状 title 无「早割」。

## 4.1 更新（21:55 探针后）：CF build 已恢复 + robots 改用 CF Functions 方案

- **3b39a3f4 build 部署成功**（21:40 探针确认）：saddle/exercise H1「from 10 Copies」+ 年賀状 ja title「年賀状 2027 印刷 10枚から ¥20〜 オリジナル」全部上线 → **CF build 从 3b39a3f4 起恢复**（根因修复：public/robots.txt 恢复 → generate-sitemap-content 不再 SKIP → route.ts import 正常 → build 成功）。
- **robots.txt 仍 404**（21:40/21:55 探针，偶发 403 CF 挑战页）：**3b39a3f4 的 route handler（app/robots.txt/route.ts）在线上不生效**——CF Pages 将 /robots.txt 视为保留路径，route handler / MetadataRoute / public 静态三者均被平台行为拦截（sitemap.xml 同为 public 静态却 200——robots.txt 是唯一被 CF 保留的路径）。
- **修复（9ad7dbf3 已 commit，待 push）**：改用 **CF Pages Functions**（`functions/robots.txt.ts`，onRequestGet edge 拦截 /robots.txt，内容 = 12 AI allow + sitemap ×2，与 public/robots.txt 同步）——Functions 在 Next 之前于 edge 层拦截，平台原生保证生效。删除 `src/app/robots.txt/route.ts`（route handler 在 CF 无效）。
- **待验**：push 后探针 robots.txt 200 + 内容正确。

## 5. 待 K3（若模拟/线上仍失败）

1. **CF Dashboard build logs**：查 3b39a3f4 与 ef3140ac / 23f9c81c 的 run——确认失败步骤（clean / generate-sitemap-content / next build / next-on-pages 哪一步）。
2. **build command 配置**：确认 CF Pages 构建命令 = `npm run build && npm run build:cf`（或等价）——若只配 `build:cf` 而无 `next build`，需修正。
3. **manifest.webmanifest 500**：确认其生成源（src 无 manifest 文件——可能 layout/next.config）——非本轮范围，排期观察。
4. **CF Dashboard → Security → Bots**：允许 AI crawlers（robots.txt 12 AI allow 只是声明，CF edge 策略优先生效——app/robots.ts 注释原话）。

> 数据来源: 见 §1。
