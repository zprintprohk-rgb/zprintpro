# Rush 页 Autoclaw 目录勘察 — 0 可执行代码 (K3 8/26 10:40 提醒固化)

> 触发: K3 8/26 10:40 问"autoclaw 目录下面没有执行的代码文件吗?"
> 答: 没有。autoclaw 全部产出 = 静态设计稿 + 规格 + 数据 + 资源,M3 必须自己转写 JSX

## 一、autoclaw 目录结构 (全量勘察 8/26 10:40)

```
C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\
├── agent\                                  # 运行时数据 (auth/models/sqlite/plugins)
├── sessions\                               # 历史 session jsonl
└── workspace\
    ├── .cluster\
    │   ├── m3-exec-20260811\                # 旧 cluster,无 .py/.ts
    │   ├── m3-v256-20260824\                # 旧 cluster,无 .py/.ts
    │   ├── rush-page-20260826\              # 本次任务 13 文件
    │   └── v259-5sku-20260825\              # 旧 cluster,无 .py/.ts
    ├── .hermes\                             # 0 个 .py / .mjs / .js
    ├── .openclaw\                           # workspace-state + tmp
    ├── .openclaw-attachments\
    ├── evolution-drafts\
    │   ├── approved\                        # 1 个 MD (image-crop-bottom-watermark-only.md)
    │   └── pending\                         # 空
    └── memory\
```

## 二、rush-page-20260826 全量文件清单 (13 文件, 0 可执行代码)

| # | 文件 | 大小 | 类型 | 说明 |
|---|------|------|------|------|
| 1 | deliverable-a-rush-page.html | 34KB | HTML 静态稿 | 8 Section 设计稿 (主交付物) |
| 2 | deliverable-b-home-hero-card.html | 2.7KB | HTML 静态稿 | 首页 Hero 卡 (交付物 B) |
| 3 | deliverable-c-category-banner.html | 2.4KB | HTML 静态稿 | 类目页横幅 (交付物 C) |
| 4 | rush-page.html | 95KB | HTML 完整页 | 8/26 06:31 抓取的现有 rush 页 (Step 0 现状) |
| 5 | home-page.html | 200KB | HTML 抓取 | 首页现状 (Step 0 现状) |
| 6 | category-flyers.html | 290KB | HTML 抓取 | 类目页现状 (Step 0 现状) |
| 7 | rush-delivery-overview.html | 7KB | HTML 抓取 | rush 页概览 (Step 0 现状) |
| 8 | rush-design-spec.md | 6.7KB | MD 规格 | 设计规格 + 验收 + 风险 |
| 9 | rush-nextjs-component-map.md | 4.7KB | MD 组件映射 | 每 Section → Next.js 组件名 + 埋点接口 |
| 10 | rush-m3-deploy-path.md | 6.5KB | MD 部署路径 | S1-S5 push 部署指引 (本次 M3 落地) |
| 11 | rush-m3-deploy-path.html | 7KB | MD HTML 版 | 同上 HTML 渲染版 |
| 12 | current-state-report.md | 17KB | MD 现状报告 | Step 0 三页抓取事实 + 真实设备图 |
| 13 | rush-jsonld.json | 3KB | JSON-LD 数据 | 3 块: FAQPage + Service + BreadcrumbList |
| 14 | images/factory-{hero,heidelberg,hpindigo}.webp | 3 张 <180KB | webp 资源 | 工厂实拍图 (海德堡 + HP Indigo) |
| 15 | shots/A-{desktop,mobile,form}-*.png + B-card + C-banner | 13 张 | png 截图 | 设计稿截图 |

## 三、核心结论

**autoclaw 目录的产出是「设计稿 + 规格 + 数据 + 资源」,M3 必须自己转写成 Next.js JSX 组件**。

- 0 个 .py / .mjs / .js 可执行代码
- 0 个 .tsx / .ts 组件代码
- 0 个 README / Makefile / 启动脚本

K3 8/26 10:40 提示"直接调用 autoclaw 成品部署上线" — 实际"成品" = 静态 HTML 设计稿,**不能**直接 import/调用。M3 工作流:

1. 读 HTML 提取结构 (8 Section 顺序 + 元素)
2. 读 MD 提取规格 (品牌色 #2873F5 / 橙 #F87314 / 文案约束)
3. 读 JSON 提取 JSON-LD (FAQPage 6 条 + Service + BreadcrumbList)
4. 转 webp 到 public/images/factory/
5. **手写 JSX** 4 个新组件 + page.tsx 集成 (本次 dad3d69 落地)

## 四、本次 dad3d69 commit 落地映射

| autoclaw 交付物 | M3 落地 |
|---|---|
| deliverable-A S4 车间图 + 数据 | src/components/services/RushCapacity.tsx (5KB) |
| deliverable-A S5 价目表 | src/components/services/RushPriceTable.tsx (7KB) |
| deliverable-A S7 双必填表单 | src/components/services/RushCtaForm.tsx (12KB) |
| deliverable-A S8 浮动元素 | src/components/services/RushFloating.tsx (5.5KB) |
| deliverable-A 整体 8 Section + Hero 加工厂图 | src/app/[locale]/services/rush-printing-delivery/page.tsx (24KB 替换) |
| rush-jsonld.json 3 块 | page.tsx 内联 3 块 JsonLd 组件 |
| images/factory/*.webp 3 张 | public/images/factory/ 已就位 (169KB + 145KB + 26KB) |
| 埋点 data-event 三件套 | src/components/services/zpTrack.ts (1.5KB util) |
| 3 locale 同步 (en/ja) | page.tsx + 4 组件均 locale-aware |

**6 文件 872 行新增,11 行删除** — 全部为新增/替换,F0 红线 8/19 5 件套全部保留。

## 五、教训固化源头

- zprintpro 8/26 10:40 K3 提醒"autoclaw 没有执行的代码文件吗?"
- 跨项目 P1: 任何 autoclaw 设计稿任务,M3 派活前必跑 3 问:
  1. autoclaw 目录有没有 .tsx/.ts/.py 可执行代码? → 没有 = 必转写
  2. 有没有现成 Python 脚本可调? → 没有 = M3 手写
  3. 静态 HTML 稿跟实际 Next.js 路由 1:1 吗? → 不一定,可能需合并 + locale 适配
- 误判反例:M3 8/26 10:30 拍板实施时未系统列出 autoclaw 全量文件,K3 10:40 提醒才补勘察

## 六、应用范围

- 任何项目 (zprintpro / aitoptools / togthr / stock-lab)
- 任何 autoclaw 设计稿任务 (.cluster/{name}-{date}/ 目录)
- 任何 brief 派活前 3 问自检

## 七、数据来源

- 勘察时间: 2026-08-26 10:40 (K3 当前 turn 提醒)
- 勘察命令: `Get-ChildItem -Path ... -Recurse -File -Force`
- 勘察结果: rush-page-20260826/ = 13 文件 + 3 webp + 13 png,0 可执行代码
- dad3d69 commit: 已 push 10:37,CF build 跑中
