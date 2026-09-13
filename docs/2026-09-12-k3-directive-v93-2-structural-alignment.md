# K3 指令 v9.3.2 — 内页 8 页「结构级」模板对齐（纠偏 L 批令牌级执行）

> 2026-09-12 12:10 K3 大脑签发 · 执行层：deepseek hermes · 效力：替代 v9.3 任务 L 的验收口径
> 触发：老板实测预览 e4562498.zprintpro-19p.pages.dev，判定 about/help/payment/legal **未对齐** blog/contact 风格

## 一、根因诊断（K3 自责 + 执行层纠偏）

L1-L4 commit（992f684e / 9ea0eb4a）做的是**令牌级对齐**：只改了字号 17.5px、容器 1320px、交替底色、色值统一。
**结构原封不动**：

| 页 | 现状（实测源码） | 模板族应有 |
|---|---|---|
| about | 老式 factory-banner 照片 hero + py-20/32 + 居中 text-3xl/5xl（2026-07-31 旧设计）；stats 仍是灰底蓝字 4 格 | 藏青渐变 S1 Hero + 面包屑 + eyebrow + clamp H1 |
| payment-methods | 只换了色值 token，hero 结构未动 | 同左 |
| legal | **无 hero**，直接 h1 + amber 卡 | 精简版 S1 Hero（色块+面包屑+H1） |
| help-center | L3 加了 hero（最接近），需逐件核对 | 缺件补齐 |

**根因 2 条**：
1. K3 v9.3 任务 L 验收探针过松（Banner/17.5px/1320px/200）——执行层按探针打最低限度过关，是**验收标准设计失误**；
2. 指令说「模板基准：联络我们」但没给**结构骨架**，执行层自由发挥空间被压到最小 = 只敢动类名不敢动结构。

**纠正原则**：结构对齐 ≠ 文案改动。所有页面**正文/法务/数据文案一字不改**，只换骨架、迁入既有文案。

## 二、模板族结构规范（S1-S4，从 contact/page.tsx + BlogContent.tsx 实测提取）

### S1 Hero 骨架（唯一标准件，逐件不可省）

```tsx
<section className="max-w-[1320px] mx-auto">
  <div className="relative w-full overflow-hidden flex min-h-[380px] md:min-h-[440px] text-white"
       style={{ background: "var(--color-royal-navy-grad)" }}>
    {/* 装饰圆组（hidden lg:block，原样复制，禁改尺寸） */}
    <div aria-hidden className="hidden lg:block absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
      <div className="absolute -right-20 -top-24 w-[420px] h-[420px] rounded-full border-[3px] border-white/10" />
      <div className="absolute -right-6 -top-8 w-[300px] h-[300px] rounded-full border-2 border-white/10" />
      <div className="absolute right-44 bottom-6 w-[160px] h-[160px] rounded-full border-2 border-[#F87314]/30" />
      <div className="absolute inset-0 opacity-10"
           style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,.6) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
    </div>
    <div className="relative z-[1] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* ① 面包屑（13px white/75，链接下划线 decoration-white/40） */}
      {/* ② eyebrow：橙色 22px 横线 + text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase */}
      {/* ③ H1：text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[720px] */}
      {/* ④ 副标：mt-2.5 text-[16.5px] text-white/85 max-w-[640px] leading-relaxed */}
      {/* ⑤ CTA 槽位（可选，见各页映射） */}
    </div>
  </div>
</section>
```

**文案来源铁律**：H1/副标/eyebrow 全部**从该页既有文案迁入**（t.h1、t.subtitle 等），禁新编营销文案。面包屑是 UI chrome，三语言用既有词典词（首頁/ホーム/Home + 本页名）。

### S2 正文节奏
- 外层 `max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16`
- 正文基线 `text-[17.5px] leading-[1.75]`（法务长文列宽可保留内层 max-w-4xl）
- 区段白 / `#F2F6FF` 交替；卡片 `rounded-xl bg-[#F2F6FF] border border-blue-50` 或白卡 shadow-sm

### S3 尾 CTA 块（有 CTA 的页）
藏青渐变 `rounded-[18px] p-6 sm:p-8 md:p-9` + 纯橙 CTA `bg-[#F87314] shadow-lg shadow-orange-500/30 hover:brightness-105` + WhatsAppCtaButton（共享组件）

### S4 H2 区段头
`text-[clamp(20px,2vw,26px)] font-bold` + 可选 eyebrow 小标签（同 S1② 样式，蓝 `#2873F5` 用于正文区、橙 `#F87314` 用于 Hero/CTA）

## 三、分页映射（每页一个 session，守 v9.3.1 R1-R4）

### P1 about/page.tsx（988 行）
- 旧照片 hero（factory-banner.webp + 蒙层 + 居中标题，2026-07-31 旧设计）**整段拆除** → 换 S1（t.h1 迁入③、t.subtitle 迁入④；eyebrow 用既有「關於我們/About/会社概要」类词典词；CTA 槽位保留 WhatsAppCtaButton 若页面既有）
- **factory-banner.webp 图片不删**：下移到「品牌故事/工厂」正文段作配图（资产保留，SEO alt 文案不动）
- Stats Bar：4 格数字保留（数字是既有内容），卡片化：白卡 rounded-xl border 或 F2F6FF 底，数字色 `#2873F5`→ 维持
- 正文各 section → S2 节奏 + 白/浅蓝交替
- 页尾 CTA → S3（若既有）
- 案例区：无真实案例处标「待 008 案例库校准」（§0.23，既有红线重申）

### P2 payment-methods/page.tsx（894 行）
- hero 结构对齐 S1（加面包屑 + eyebrow + min-h-[380px]/[440px] + 装饰圆组）——L2 只换了色值，本批补结构件
- 收款安全卡等正文卡 → S2 卡片规范

### P3 help-center（page.tsx + HelpCenterClient.tsx，1066 行）
- L3 已加 hero，**逐件核对 S1 五件**：面包屑✓/eyebrow✓/H1 clamp✓/副标✓/装饰圆组✓——缺件补齐，尺寸类名与骨架逐字一致
- 落單須知/送貨安排/退換政策三段 → S2 节奏 + S4 段头

### P4 legal/page.tsx（553 行 · 法务红线页）
- **新增精简版 S1 Hero**：色块 + 面包屑 + H1（t.h1 迁入）——**无 eyebrow 营销语、无 CTA、无副标**（法务严肃性）；min-h 降为 [240px] md:[280px]
- 正文/法务文字**一字不改**，text-diff gate 沿用 v9.3.1 §四（改前快照 → 改后 diff 必须 IDENTICAL，非空即 checkout 重来）
- amber 跨境披露卡等结构保留，仅类名归族

## 四、验收（结构探针，替代 v9.3 旧探针）

每页必过 grep 探针（在各自文件内）：

```bash
# S1 Hero 五件（legal 免 ②⑤）
grep -c 'min-h-\[380px\]' <file>          # ≥1（legal 为 min-h-[240px]）
grep -c 'tracking-\[\.12em\]' <file>       # ≥1 eyebrow（legal 豁免）
grep -c 'clamp(24px,2.5vw,34px)' <file>    # ≥1 H1
grep -c 'aria-label="breadcrumb"\|首頁\|ホーム\|Home' <file>  # ≥1 面包屑
grep -c 'rounded-full border' <file>       # ≥2 装饰圆（legal ≥0，精简版可省圆组但留色块）
# 旧结构必须消失
grep -c 'factory-banner.webp' about/page.tsx  # hero 段外 ≤1（仅正文配图）
grep -c 'text-3xl md:text-5xl' <file>      # =0（旧居中大标题清零）
grep -c 'py-20 md:py-32' <file>            # =0
```

门禁 4 件（tsc 54=54 / build exit 0 / bc-ban diff 0 / encoding）+ 线上探针（8 页 200 + 首屏截图人工比对 contact 页）。

**批次**：P1+P2 合 1 push → P3+P4 合 1 push（2 次构建，守 30min 硬下限 + 攒批纪律）。

## 五、五视角裁决

- ① PM：支持。根因是验收标准失误，本卡把「结构」变成可 grep 的硬指标，堵死最低限度执行。
- ② UI/UX+CRO：支持。S1 骨架逐件锁定 = 8 页与 contact/blog 视觉同族，信任感一致。
- ③ 运营/转化：支持。about 工厂图下移正文 = 资产与 SEO alt 不丢；法务页免 CTA 保严肃。
- ④ 数据分析师：条件支持。结构探针 0/≥N 可机审；上线 7 天看这 4 页停留/跳出变化。
- ⑤ CEO 终裁：**P0 立即**。旧 L 批验收口径作废，按本卡执行；deepseek 直接续作，无需再发「继续」逐次确认——P1→P4 一口气跑完，撞 context 才停（v9.3.1 协议已防）。
