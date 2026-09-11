# v9.7 Blog 图片切 M3（hero 优先）+ 首页知识栏/导航下拉同点更新 — 执行报告（2026-09-12）

> 老板指令：M3 图库（SKU 编号子目录，文件名带关键词）→ 选用 **hero 为主**（无适配 hero 才用 variety / multi-angle）；**webp 格式、体积 <115KB**；若仍 >115KB 则处理到 **<100KB** 再使用；blog 图片更新后**同步更新首页「印刷知識」栏的信息与图片、以及导航「印刷知識」下拉菜单的图片**。

## 一、源库与命名规则（先摸清再选）

- 源目录：`F:\zprintpro-en-us-images M3的模型生成的图片`（**注意**：不在 F:\ 根，也非仓库内 `zprintpro-en-us-images`）
- 结构：`{SKU 编号}/zprintpro-{category}-{productSlug}-{locale}-{variant}.webp`
  - SKU 编号示例：`ST-001`（貼紙）/ `PKG-008`（包裝）/ `FL-001`（傳單）/ `PO-002`（海報）/ `MN-005`（餐牌）/ `WI-001`（喜帖，category 段为 `foil-wedding-invitations`）/ `BC-003`（賀卡）/ `BK-001`（書刊）/ `BN-003`（橫幅）/ `CL-001`（月曆）/ `DJ-001`（同人）/ `ED-001`（教育）/ `EV-001`（信封）/ `PB-004`（紙袋）/ `RP-001`（利是）
  - locale：`en` / `ja`
  - 变体：`hero` / `variety` / `multi-angle` / `detail` / `spread` / `box-open` / `card-stand` / `calendar-open`
- live 池（排除 `_*` 归档目录）：**430 张 webp**，可解析 403 张；其中 <115KB 270 张
- 变体存量：detail 134 / hero 120 / variety 118 / multi-angle 118 / spread 35 / 其他 66

## 二、选图规则（脚本 `.hermes/build-blog-m3-images-v5.ts`）

1. **变体优先级（老板规则）**：`hero` → `variety` → `multi-angle` → `spread` → `detail` → 其他（box-open / card-stand / calendar-open）
2. **语义匹配**：文件名关键词（category + productSlug 词元）与文章 slug 词元做重合度评分，重合高者优先
3. **类目优先**：文章 categoryKey 映射到允许的图片类目（如 `packaging`→packaging；`wedding-envelope`→wedding-invitations/greeting-cards；`buying-guide` 按 slug 关键词判定）；类目耗尽才跨类目兜底 → 保证 **0 篇无图**
4. **全局唯一（含内容哈希）**：同一物理文件 + **同一图内容（md5）** 都只分配给一篇文章 → 线上卡片图**视觉不重复**（首轮有 3 组字节级重复，已修）
5. **三语同图**：1 篇 = 1 张物理图，zh-hk / en / ja 共用（沿用既有口径）

## 三、体积两档规则（老板追加指令）

| 源图体积 | 处理 |
|---|---|
| **< 115KB** | 直接选用（webp，**不二次压缩**，零画质损失） |
| **≥ 115KB** | 用 sharp 压到 **< 100KB** 后使用：先降质量（q85→q40），仍超标则降分辨率（w1100/1000/900/800 × q80/70/60/50），最后兜底 w700q70 |

> 实测发现：M3 源图多为已优化产物，重编码反而变大（如 FL-001 hero 117.9KB → q80 重编码 137KB），故必须走质量/分辨率递降阶梯；且 `withoutEnlargement` 会让「只放大不缩小」的 resize 步骤失效，已改为真实降分辨率。

## 四、选图结果（`.hermes/logs/2026-09-12-blog-m3-selection-v5.md`）

| 指标 | 结果 |
|---|---|
| 文章数（去重 slug） | 89 |
| **hero 命中** | **43 篇（48%）** ← 主要用 hero ✓ |
| variety（hero 不可用的首选回退） | 18 |
| multi-angle（次选回退） | 7 |
| detail / 其他（更深回退，池内该类目 hero/variety/multi-angle 已耗尽） | 13 / 8 |
| 跨类目兜底 | 0 |
| 压缩后使用（源自 ≥115KB 图） | 30 张（**全部落到 <100KB**，0 张 ≥100KB） |
| 无匹配 | **0** |
| 落地文件 | 89 张，最大 **114.8KB**，≥115KB 的 **0** 张；**字节级重复 0 组** |

## 五、三处消费点同点更新（老板核心要求）

| # | 位置 | 改前 | 改后 |
|---|---|---|---|
| ① | `/blog/` 列表卡 | 已用 `blogM3Images`（上轮） | ✅ 随本次映射重生成（新图 + hero 优先） |
| ② | `/blog/[slug]/` 详情 hero | 已用 `blogM3Images` | ✅ 同上 |
| ③ | **首页「印刷知識」栏** | 4 篇硬编码 + **旧 JPEG 封面 `/images/articles/*.jpg`** + 过期信息（写 2025-03-15，实际文章为 2024-04） | ✅ **信息 + 图片一并同步 blog**：改为取 blog **最新 4 篇**真实数据（标题 / 日期 / 摘要 / M3 图），卡片 tag 与配色沿用本栏既有 token，无映射时回落本栏既有封面 |
| ④ | **导航「印刷知識」下拉**（3 张推荐位） | `/images/blog/{locale}/{slug}.webp`（非 M3，且按语言分目录） | ✅ 改用 `blogM3Images[slug]`（三语同图），无映射回落原路径 |

- 改动文件：`src/data/blog-m3-images.ts`（重生成，89 条）、`src/components/home/KnowledgeSection.tsx`、`src/components/layout/Header.tsx`
- 文案零改动：KnowledgeSection 的栏目标题/副标/查看更多、卡片 tag 文案全部沿用；仅数据来源改为 blog 真值（这正是「同步更新信息」）

## 六、验收

### 门禁
| 门禁 | 结果 |
|---|---|
| `npx tsc --noEmit` | **54 = 54 基线持平**（0 命中本批文件） |
| `npm run build` | **Compiled successfully, exit 0** |
| 图片门禁 | 89 张全 `.webp`；**0 张 ≥115KB**（最大 114.8KB）；源自 ≥115KB 的 30 张**全部 <100KB**；字节级重复 0 |
| §0.25.9.2 旧图引用 | `src/`+`public/` 无 `zprintpro-en-us-images` / `v25_` 引用 |

### 本地验收（生产构建 `next start`，三语）
`.hermes/v97-verify.mjs` → **34 PASS / 0 FAIL（ALL GREEN）**

| 验收项 | 结果 |
|---|---|
| `/blog/` 三语 M3 图数 ≥40 且唯一 | ✅ zh-hk/en/ja |
| `/` 首页知识栏 M3 图 = 4 张 | ✅ 三语 |
| 首页知识栏已停用旧 `/images/articles/*.jpg` | ✅ 三语 |
| `/blog/{slug}/` 详情用 M3 图 | ✅ |
| 落地 89 张全 <115KB（最大 114.8KB） | ✅ |
| 导航下拉组件已接 M3 映射（客户端 bundle 含 `blog-m3`） | ✅ |
| 抽样 M3 图 HTTP 200 + <115KB | ✅ 5/5 |

## 七、遗留偏差

1. **首页知识栏由「4 篇固定策划文章」改为「blog 最新 4 篇」**：这是为满足「信息 + 图片同点更新」（原硬编码信息已过期：日期写 2025-03，实际文章为 2024-04；且 ja 栏目的标题与所链文章不符）。若老板希望恢复固定 4 篇，仅需指回固定 slug 列表（1 处常量）。
2. **hero 占比 48%**：其余为老板指定的回退变体（variety 18 / multi-angle 7）及更深回退（detail 13 / 其他 8）。原因：部分类目（packaging / posters / menus / wedding等）的 hero 多为 115-140KB，虽已压至 <100KB 但同篇已占用，或该类目 hero 数量少于文章数。
3. **压缩会带来画质损失**（30 张，q40-w800 区间）：若某张观感不佳，可按文件清单单独换图（日志已记录每张的来源 SKU + 变体 + 质量参数）。
4. **导航下拉为 hover 客户端渲染**，SSR HTML 中不含其 DOM，故以「客户端 bundle 含 M3 映射 + 源码接入」核验，未做浏览器实拍。
5. 未真机截图（本环境无浏览器/截图工具）；三视口/观感如需实拍复核，请提供截图或授权浏览器代理。

## 数据来源

- 源库：`F:\zprintpro-en-us-images M3的模型生成的图片`（live 430 webp / 可解析 403；SKU 目录 92 个 + 4 个 `_*` 归档）
- 选图脚本：`.hermes/build-blog-m3-images-v5.ts`（hero 优先 + 关键词评分 + 哈希唯一 + 两档体积）
- 选图日志：`.hermes/logs/2026-09-12-blog-m3-selection-v5.md`（逐篇：来源 SKU / 文件名 / 变体 / 原体积 → 落地体积 / 处理参数 / 重合度）
- 消费点代码：`src/app/[locale]/blog/page.tsx` L93、`src/app/[locale]/blog/[slug]/page.tsx` L943、`src/components/home/KnowledgeSection.tsx`、`src/components/layout/Header.tsx` L463
- 本地验收：`.hermes/v97-verify.mjs`（34 项 ALL GREEN）
- 门禁：`npx tsc --noEmit`（54=54）、`npm run build`（exit 0）
