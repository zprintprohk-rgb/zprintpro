# v9.8 首页知识栏破图修复 + 导航下拉图片框尺寸对齐 — 执行报告（2026-09-12）

> 老板反馈：① 首页「印刷知識」栏**打开图片是烂图**；② 导航「印刷知識」下拉**图片框尺寸应同其它产品分类下拉菜单**。

## 一、问题 ① 根因：`.avif` 候选源 404（真凶，非图片本身）

**代码链**：首页知识栏用 `src/components/picture-image.tsx`（`PictureImage`），该组件会自动「同路径推断替代格式」：

```ts
// picture-image.tsx inferSources()
'/images/blog-m3/x.webp'  →  [{ srcSet: '/images/blog-m3/x.avif', type: 'image/avif' },   // 首个 source
                              { srcSet: '/images/blog-m3/x.webp', type: 'image/webp' }]
```

**证据链**：

| 检查 | 结果 |
|---|---|
| `public/images/blog-m3/` 内 `.avif` 文件数 | **0（只有 .webp）** |
| `public/images/articles/`（旧图池）扩展名 | **.avif 4 / .jpg 4 / .webp 4**（三配套齐全） |
| 现代浏览器行为 | 命中首个可用 `<source>` → 请求 `/images/blog-m3/*.avif` → **404 → 破图** |
| `PictureImage` 使用点 | 仅 `KnowledgeSection.tsx`（范围精准：blog 列表/详情用 next/image，不受影响） |

→ **旧图（articles）能显示、新图（blog-m3）破图** 的差异由此完全解释：旧目录有 avif 配套，M3 目录没有。

### 修复
`KnowledgeSection.tsx`：使用 M3 图时显式传 `sources={[]}` 关闭格式推断（回落旧图时仍保留原有推断，不破坏既有行为）：

```tsx
<PictureImage
  src={m3ImageForHref(article.href) || article.image}
  sources={m3ImageForHref(article.href) ? [] : undefined}
  …
/>
```

## 二、顺带修：压缩画质（避免「低质量观感」）

原压缩阶梯在达标前可能一路降到 **q40 全尺寸**（观感差）。改为 4 阶梯，**优先「适度降分辨率 + 保较高画质」**：

1. 保分辨率轻中度降质 `q88→q60`
2. **降分辨率保画质 `w1080/1000/920/840 × q84/80/78`**（新增，主力路线）
3. 极低质量兜底 `q55→q40`
4. **深度降分辨率兜底 `w820/760/700/640 × q78/74/70`**（保证 0 篇无图）

**效果**：30 张压缩件路线分布 = `w1080q78×5 / w1000q78×3 / w920q78×3 / w920q80×3 / w820q74×3 / w840q78×2 / w1000q80×2 / q60×2` 等，**以保画质路线为主**；首页第 3 张由 `q50 97.6KB` → **`w1080q78 99.5KB`**。

## 三、问题 ② 导航下拉图片框尺寸对齐

| 下拉 | 改前 | 改后 |
|---|---|---|
| 热门产品（分类） | `<div className="flex-1 relative overflow-hidden rounded-t-lg">` + 文字区 `h-[60px]` | 不变（基准） |
| **印刷知識（blog）** | `<div className="relative overflow-hidden rounded-t-lg h-[120px]">` + 文字区 `h-[50px]` | **改为 `flex-1 relative overflow-hidden rounded-t-lg` + 文字区 `h-[60px]`** |

→ 两个下拉的右侧推荐位容器（`minHeight: 320` 的同一个 950px 面板）现使用**完全相同的 flex 结构**，图片框高度随面板自适应（去掉固定 120px），尺寸逐像素一致。

## 四、验收

| 门禁/验收 | 结果 |
|---|---|
| `npx tsc --noEmit` | **54 = 54 基线持平**（0 非基线命中） |
| `npm run build` | **Compiled successfully, exit 0** |
| 本地探针 `.hermes/v97-verify.mjs`（含新增 2 条破图断言） | **40 PASS / 0 FAIL — ALL GREEN** |
| 首页 M3 图 `.avif` 破图候选 | **0**（三语） |
| 首页 M3 图 `<source>` 覆盖 | **0**（三语） |
| 首页 4 张图实际请求 | 全部 **200**：99.9KB / 101.8KB / 110.6KB / 113.3KB（均 <115KB） |
| 图库落地体检 | 89 张全 `.webp`，最大 114.8KB，**0 张 ≥115KB**，字节级重复 0 |
| 变体分配（重跑后） | **hero 43 / variety 18 / multi-angle 7 / detail 13 / 其他 8**；无匹配 0 |

## 五、遗留

1. **首页知识栏卡片 `aspect-square` 裁切**：图片按 1:1 居中裁剪显示；若某张语义不适配方形（如宽幅传单/海报图），可换变体或改 `object-position`，请指出具体页/图我调整。
2. **`PictureImage` 的 AVIF 推断仍为默认行为**：本次只在 M3 段落关闭（`sources={[]}`）。若将来 M3 目录补齐 `.avif` 配套，可直接移除该参数；反之其他目录新增 webp-only 图片时需同样注意此坑（已写入技能 `zprintpro-blog-images` 建议补一条踩坑）。
3. 未真机截图（本环境无浏览器/图像输入能力），破图结论基于「avif 文件 0 + source 标签 0 + 图片 200」的三重代码/网络证据链。

## 数据来源

- `src/components/picture-image.tsx` L39-48（`inferSources` 实现）+ L69-75（source 渲染）
- 文件系统核查：`public/images/blog-m3/` `.avif` = 0；`public/images/articles/` = avif 4 / jpg 4 / webp 4
- `PictureImage` 使用点扫描：仅 `src/components/home/KnowledgeSection.tsx`
- 下拉容器类名：`src/components/layout/Header.tsx`（分类下拉 vs blog 下拉）
- 本地验收：`.hermes/v97-verify.mjs`（40 项 ALL GREEN，BASE=http://127.0.0.1:3005）
- 选图与压缩：`.hermes/build-blog-m3-images-v5.ts` + 日志 `.hermes/logs/2026-09-12-blog-m3-selection-v5.md`
