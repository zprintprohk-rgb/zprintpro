# 自进化技能更新：blog 配图能力 + 09-10~12 执行沉淀（2026-09-12）

> 老板指令：把 blog 使用图片的规则写入自进化技能（后续新 blog 文章可直接调用）；并把这两三天执行中可自进化的能力也写进自进化技能。

## 一、写入位置（4 处）

| # | 目标 | 变更 |
|---|---|---|
| 1 | **新建技能** `C:\Users\Administrator\.openclaw-autoclaw\skills\zprintpro-blog-images\SKILL.md` | **136 行 / 10KB**：blog 配图专项技能，**可直接按名调用** |
| 2 | `...\skills\zprintpro-content-standards\SKILL.md`（统一入口） | 175 → **251 行**：新增 **§12 Blog 配图能力** + **§13 自进化能力台账（09-10~12）**；§8 技能清单登记新技能；frontmatter 触发词加「blog 配图」 |
| 3 | `...\skills\zprintpro-blog-writing-sop\SKILL.md` | 330 → **345 行**：新增 **§4.0 配图（必做）**，纳入 6 步写做流程；frontmatter 加配图触发词 |
| 4 | `F:\zprintpro-nextjs\.hermes\m3-self-evolution-patterns.md`（项目侧留档） | 180 → **约 230 行**：新增 **§10 2026-09-10~12 执行沉淀** |

三个技能文件均校验为 **UTF-8 无 BOM、无 CRLF**（node 权威读取）。

## 二、blog 配图技能内容（`zprintpro-blog-images`）

### 一条命令（新文章直接调用）
```bash
cd F:/zprintpro-nextjs && npx tsx .hermes/build-blog-m3-images-v5.ts
```
自动：扫图库 → 按规则选图 → 落地 `public/images/blog-m3/{slug}.webp` → 重生成 `src/data/blog-m3-images.ts`（四处消费点自动生效）→ 写选图日志。

### 收录的规则
1. **图库与命名**：`F:\zprintpro-en-us-images M3的模型生成的图片\{SKU编号}\zprintpro-{category}-{productSlug}-{locale}-{variant}.webp`；排除 `_*` 归档；喜帖类目段为 `foil-wedding-invitations`（解析须支持类目词在中间）
2. **变体优先级**：`hero` → `variety` → `multi-angle` → `spread` → `detail` → 其他（box-open / card-stand / calendar-open）；**hero 为主**
3. **语义匹配**：文件名关键词（category + productSlug 词元）× 文章 slug 词元；类目优先 + 跨类目兜底（保证 0 篇无图）
4. **唯一性**：物理文件 + **内容 md5** 双去重；**三语同图**（1 篇 1 张）
5. **体积两档**：<115KB 直接用；**≥115KB 必须压到 <100KB 再用**（质量阶梯 q85→q40 → 分辨率 w1100→w800）
6. **四处同点更新**：`/blog/` 列表卡 · `/blog/[slug]/` 详情 hero · **首页「印刷知識」栏**（信息+图片取 blog 真值）· **导航「印刷知識」下拉**
7. **新文章 5 步 SOP** + **7 条踩坑清单**（已优化源图重编码变大 / `withoutEnlargement` 失效 / `toFile('.tmp')` 报错 / tsx CJS 顶层 await / 同名不同目录 ≠ 同图 / 类目前缀匹配漏 `foil-` / 体积阈值严格 `<`）
8. **已判例**：2026-09-11 首轮 89 张；2026-09-12 v9.7 hero 43 / variety 18 / multi-angle 7 / detail 13 / 其他 8，无匹配 0，字节级重复 0，最大 114.8KB
9. **机器资产表**（脚本 / 映射 / 图目录 / 日志 / 探针 / 重复检测 / 池普查）
10. **红线**：不引用图库源路径进 src/public；不用非 webp；不落地 ≥115KB；不允许同图两用；只读源图；配图不改文案

## 三、自进化能力台账内容（入口技能 §13，8 组）

| 组 | 能力 | 关键拦截动作 |
|---|---|---|
| A | **线上真值优先**（最高性价比） | 布局/视觉工单先抓线上 HTML + 范本类名逐字节比对，再改代码；附 4 个实例（白条面包屑真因 / Navbar 1320 容器 / flex stretch / h-full 百分比高度） |
| B | **部署与边缘判据** | CDN 混服旧版 → 等 1-2 分钟复探；CF 平台 503 特征（自定义域 503 + pages.dev 正常 + 旧部署同现）→ 平台侧；恢复即验证脚本 |
| C | **CF 构建配额纪律** | 9 月实测 100 次 = prod 63 + preview 37；「分支+main 双推」=2 次 → **只推 main**（分支走本地路径 fetch）；CF API 核对单构建 |
| D | **合并冲突口径** | 他批改同区域 → 标题取 main、其余取本批；先列全标记；`git ls-files -u` 必为 0；PowerShell 无 heredoc → `git commit -F` |
| E | **死链防御** | 数据链接下线 → 渲染层存在性过滤 + 过滤后仍保证「≥1 分类 + ≥1 blog」 |
| F | **验收方法论** | 本地生产构建 + next start + 断言探针；探针期望值须取自**组件实际数据源**；环境标记串须一致；线上文件 md5 比对证明换新；客户端渲染区块的核验方式与声明 |
| G | **图片落地三件套 + sharp 踩坑** | webp + 体积两档 + 内容 md5 唯一；4 条 sharp/tsx 坑 |
| H | **资产化清单** | 探针/选图/恢复即验证/重复检测/池普查脚本入库；日志逐项留证；报告必含数据来源行 |

## 四、后续调用方式（给新 blog 文章）

1. 文章在 `src/data/blog-posts.ts` 注册
2. 跑 `npx tsx .hermes/build-blog-m3-images-v5.ts`
3. 看日志确认新 slug 的 `[hero, ...]` 命中
4. 门禁：`npx tsc --noEmit`（54=54）+ `npm run build`（exit 0）+ 图片体积门禁
5. 本地验收：`npx next start -p 3005` + `node .hermes/v97-verify.mjs`
6. 技能触发词已覆盖「blog 配图 / M3 图库选图 / 首页知识栏配图 / 导航下拉配图 / 图片体积治理」，新会话开工即自动读到

## 数据来源

- 技能文件（UTF-8 无 BOM 校验）：`zprintpro-blog-images/SKILL.md`（136 行/10048 字节）、`zprintpro-content-standards/SKILL.md`（251 行/19860 字节）、`zprintpro-blog-writing-sop/SKILL.md`（345 行/19013 字节）
- 项目侧留档：`.hermes/m3-self-evolution-patterns.md` §10
- 规则来源：老板 2026-09-11 + 2026-09-12 指令原文；本次配图批已上线验证 commit `3ab215b9`（CF `3ab215b`），线上 34 项断言 ALL GREEN
- 配额数据：CF Pages deployments API（9 月 100 条：production 63 / preview 37）
