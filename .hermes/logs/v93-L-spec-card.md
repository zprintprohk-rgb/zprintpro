# L 批版式规格卡（v9.3.1 R2 · ≤3KB · 各 session 只读本卡，禁读模板全文）

> 抽取来源：`contact/page.tsx`（L240-288, L410）+ `blog/[slug]/page.tsx`（L1014-1050）实测令牌
> 用法：L1-L4 逐文件套用；与本卡不符处一律以本卡为准

## 1. 内页 Hero（Banner）— 三语言同结构
```
<section className="max-w-[1320px] mx-auto">                     // 宽度 = 导航栏色块(1320 居中), 禁 w-full
  <div className="relative w-full overflow-hidden flex min-h-[380px] md:min-h-[440px] text-white"
       style={{ background: 'var(--color-royal-navy-grad)' }}>   // 藏青渐变锁定
    <div aria-hidden className="hidden lg:block absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none"> …圆环装饰… </div>
    <div className="relative z-[1] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
      <nav aria-label="breadcrumb" className="text-[13px] text-white/75 mb-4">首頁 / <span className="text-white">當前頁</span></nav>
      <p className="inline-flex items-center gap-2 text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
        <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />EYEBROW</p>
      <h1 className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[720px] drop-shadow-sm">H1</h1>
      <p className="mt-2.5 text-[16.5px] text-white/85 max-w-[640px] leading-relaxed">副標</p>
      <div className="mt-6 flex flex-wrap gap-3"><WhatsAppCtaButton href label source locale /></div>   // 共享组件, 自适应宽度
      // 信任点胶囊(可选): bg-white/15 border border-white/30 backdrop-blur-[2px] px-3 py-1.5 rounded-full text-sm font-semibold
    </div>
  </div>
</section>
```

## 2. 正文容器与基线
- 容器：`<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">`
- **正文基线 17.5px**：`text-[17.5px] leading-[1.75]`
- H2：`text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3]`
- 段落：`text-[#3A4250] leading-relaxed`

## 3. 白 / 浅蓝交替
- 区块交替：`bg-white` ↔ **浅蓝块** `rounded-xl bg-[#F2F6FF] border border-blue-50 px-4 py-4`（大块用 `rounded-[18px] p-6 sm:p-8 md:p-9`）
- 强调橙：`#F87314`（纯橙，禁橙渐变，除首屏 Banner）；链接蓝 `#2873F5`；正文深灰 `#333333` / `#3A4250`

## 4. 尾 CTA 块（页尾统一）
```
<div className="rounded-2xl overflow-hidden text-white px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6"
     style={{ background: 'var(--color-royal-navy-grad)' }}>
  <div>標題 + 副標</div>
  <div className="flex gap-3">橙 CTA(#F87314) + WhatsApp 绿(#25D366)</div>
</div>
```

## 5. 铁律（每批自检）
- **R1**：>200 行既有文件**只用 Edit 定点改**，禁整文件 Write
- **R4**：Grep 定位 + Read ≤200 行/次，禁全文读
- **法务页（legal/隱私/條款/退換）**：**文字一字不改，只改排版**；改前改后抽全部中文文本节点做 diff，**diff 非空即 checkout 重来**
- 案例类内容：无真实案例处标「**待 008 案例库校准**」，禁编造（§0.23）
- NAP 按 §13.10（深圳实体写 NAP 层，SEO 内容层不塞供应商地名）
