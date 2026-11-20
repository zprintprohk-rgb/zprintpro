# -*- coding: utf-8 -*-
# 2026-08-16 23:11 K3 拍板: A + B 一起修复
# A: AGENTS.md 加 4 节 (§0.16 拍板固化 / §0.17 push 台账 / §0.18.1 重定向 SOP / §0.20.8 工厂图 SOP / §0.20.9 22 figure 工序流 SOP)
# B-1: 新建 src/components/ProductLongDescription.tsx 共享 component 准备 (B-2 留 8/17 改 interface + 85 SKU 调用)

results = []

# ============ 1. AGENTS.md 加 4 节 ============
agents_path = r'F:\zprintpro-nextjs\AGENTS.md'
with open(agents_path, 'r', encoding='utf-8') as f:
    src = f.read()
# 插入点: line 956 `---` 之前
insert_marker = '5. K3 视觉确认前不部署到 PDP\n---\n\n<!-- autoclaw:feishu-lark-skill-guidance -->'
new_block = '''5. K3 视觉确认前不部署到 PDP

---

## 8/16 拍板固化 (Push 3 A 完整版)

### §0.16 SEO/GEO 拍板固化 (2026-08-13 11:50 K3 全推拍板, 8/12 03:41 战略 B 路线)

**3 阶段 SEO 拍板**:
- **§0.16.1 残留清理 batch 1 (8/12 拍板, commit f0dd885)**: 53 文件 101 类 旧 label 全清 (K3 8/12 11:50 "全推拍板")
- **§0.16.2 batch 2 (8/14 拍板, commit 27f0c7f)**: §11 名片清扫 32 hits 清零 (blog-data 3 locale) + 6 retrofit GA4 事件修复 + 16 files bundle (智印雲 cleanup + sitemaps + AGENTS.md hermes-evolution v6 + price-tables)
- **§0.16.3 batch 3 (8/16 拍板, 进行中)**: skill 抽离验收复查 (ProductLongDescription 共享 component 准备, B-1 commit 2026-08-16)

**核心 SOP**:
1. SEO 优化前拉 GSC 28 天 imps (zh-hk / en / ja 各一份)
2. 排序优化: 类目名 / h2 / 标题 选 GSC 高 imps 词
3. zh-hk 繁体守门 (制→製 / 后→後 / 实→實 / 对→對 / 发→發 / 开→開 / 内→內 / 种→種)
4. nav 顺序按业务权重 + GSC imps
5. 3 处同步修: products.ts + Header.tsx + category-seo-content.ts

**NAP 脱钩原则 (§13.10 拍板)**: 真实法律 NAP 仅 footer/contact/legal/Schema Organization, blog 标题/excerpt/hero/CTA/FAQ 不含 supplier origin 城市 (Shenzhen/深圳/深セン/中国).

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目 SEO 决策.

### §0.17 push 台账 (2026-08-08 15:35 K3 拍板, 8/16 16:51 升级豁免)

**核心**: 日/月配额以"git push 次数"计 (含 force-push amend), 每份报告必报同一数字; amend 止损月上限 2 次; push 前必跑 npm run build.

**计数口径 (单一台账)**:
- **日配额**: git push 次数 (含 force-with-lease amend push), 1 天 ≤ 5 push
- **月配额**: CF 账户级 500 build/月, 3 项目共享, zprintpro 单项目 ~150/月
- **amend push 也算 1 push**: force-with-lease 替代失败 commit, 节省 1 build 不节省 push 配额
- **cron auto 不算手动 push**: daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00

**报告必含数字** (每份部署报告 / 升级 K3 / 自我升级):
```
今日 push: X/5 (含 amend force-push)
月累计: Y/150 (CF 账户 500 内 3 项目共享)
buffer: 5-X (留紧急)
```

**amend 止损月上限 2 次**:
- 1 amend 1 build 节省 CF build 配额 (vs 2 commit 2 build)
- 但 amend force-push 也算 1 push, 节省 build 不节省 push
- 月上限 2 次 = 防止过度 amend 污染 git history
- 超 2 次 → revert + 重做 (干净 history)

**push 前必跑 npm run build** (8/8 4703262 教训固化):
- pre-commit hook 只查 encoding (UTF-16/CRLF) + 简体字守门
- **不查 TypeScript type error** (per zprintpro 8/8 4703262 失败)
- §0.7 production smoke 4 步 = encoding + 简体字 + tsc + **npm run build**
- TS 错误只该花在本地, 不该花在 CF 配额上 (4703262 浪费 1 CF build)

**K3 拍板豁免 (8/16 16:51 升级)**: 任何"重要内容"或"紧急修复"任务可豁免 §0.17 1 天 ≤ 5 push 限制, 但仍需在报告必含 push 配额数字, 方便月度审计.

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目 push 操作.

### §0.18.1 重定向上线 SOP (2026-08-08 15:35 K3 拍板, 8/16 9:18 部署 CF Bulk Redirects 拍板升级)

**核心**: 任何 301/410 重定向规则上线前 curl 验证目标 200; 禁止兜底规则覆盖多 locale 活路径; 禁止自指向规则.

**上线前 4 步 SOP** (per K3 8/8 15:35 拍板):
1. **curl 验证目标 200**: `curl -I https://zprintpro.com/<target>/` 必须返回 200, 任何 404/301/302 = 规则失败
2. **禁止兜底规则覆盖多 locale 活路径**:
   - ❌ `/blog/* → /zh-hk/` 覆盖 /en/blog/* + /ja/blog/* 活路径
   - ✅ `/blog/* (无前缀) → /zh-hk/blog/$1` 仅无前缀路径, 保留语言路径
   - ❌ `/services/* → /zh-hk/services/rush-printing-delivery/` 覆盖 /en/services/* + /ja/services/*
3. **禁止自指向规则**:
   - ❌ `kraft-paper-bags → kraft-paper-bags` (占位符 URL 实际指向正确 SKU, 不需 301)
   - ✅ 删自指向规则, 或 curl 验证目标真的不同
4. **m3u8 用 410 正确**:
   - ❌ `/upload/*.m3u8 → 410` 实际 CF Edge Rule 不是 Bulk Redirects
   - ✅ 用 CF Edge Rule (Ruleset) → 410 Gone, 不是 301

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目 CF Bulk Redirects 操作.

### §0.20.8 工厂图 K3 拍板 SOP (2026-08-16 8:53 K3 拍板 + 8/16 9:18 处理产出)

**核心**: K3 拍工厂图 → M3 处理 + 命名 SEO + 调色 + 嵌入板块 → 1 commit push.

**SOP 5 步**:
1. **K3 拍图 (F:\\工厂图片 47 张)**: K3 用手机拍 47 张真实工厂设备/工艺/成品图
2. **M3 处理 (Python Pillow)**:
   - 命名: 中文→英文 SEO (e.g. "烫金高档精品天地礼品盒" → "showcase-red-hot-foil-tian-di-gift-box-lunar-new-year")
   - 调色: 温和白平衡 (白点检测 strength=0.10) + 强饱和 +1.25 + 对比度 +1.10 + 锐化 50% (替代红变黑的灰度世界算法)
   - 压缩: 1400 长边 + q=70 (减 KB 至 ≤120KB)
   - 格式: webp
3. **3 locale alt/cap 写**: 繁中/英/日 3 locale 各 1 段 alt 描述 (per §13.10 NAP 脱钩, 不含 supplier origin 城市)
4. **板块嵌入 (about/page.tsx)**: 厂房与设备 section 加 22 figure 6 stage 工序流 (banner + 01 color mgmt + 02 offset + 03 digital+label + 04 post-press + 05 giftbox + 06 finished)
5. **1 commit + push**: encoding + 简体字 + npm run build 3 步 + 5 步真 verify

**事故背书 (2026-08-16)**: K3 8:53 拍板 47 张工厂图 → M3 8/16 9:18 9 张新图处理 (中文→英文 SEO + 调色) → commit 996c34a (23 files 4 块改动) → push → 5 步真 verify PASS.

**应用范围**: 任何 zprintpro 工厂/设备/工艺/成品图上线路线.

### §0.20.9 22 figure 工序流 SOP (2026-08-16 11:22 K3 拍板完整版)

**核心**: 6 stage × 22 figure 工序流画廊, 印刷机实拍 + 调亮 + 全工序展示, 转化基建 + 信任背书.

**SOP 6 步**:
1. **图分类** (按工序流): banner (整图) + color mgmt (1) + offset (3) + digital+label (3) + post-press binding (4) + giftbox (4) + finished (6) = 22 figure
2. **图排序** (按用户视觉流): banner hero (整图 + STAR badge) → 01 color (color chart + color story text card) → 02 offset (speedmaster 2x2 大图 + heidelberg-6plus1 + offset-press) → 03 digital+label (press-pano wide + label + hp) → 04 post-press (folding + gluing + craft-gluing + craft-triangle) → 05 giftbox (red tactile + tian-di + flip + conjoined) → 06 finished (cabinet + palletized + black + vending + textbook)
3. **调亮**: 全图 `brightness-110 saturate-[1.08] contrast-[1.02]` + 暗 gradient 蒙层 (`from-[#0A1F3C]/70 via-transparent to-transparent`), banner 略调低 `brightness-105 saturate-105`
4. **stage header**: 数字徽章 (w-7 h-7 圆形 bg-[#2873F5]) + 标题 (text-lg font-bold) + 横线 (flex-1 h-px bg-white/10)
5. **anchor + SEO 优化**: factorySectionSubtitle 加 6 stage 概览 + `#factory` anchor link; 行业 6 Tier A 加 /category/ + /blog/ internal link; processSteps step 4/5 加主营品类 link + wa.me/8619880851334 + /contact/
6. **1 commit + push**: encoding + 简体字 + npm run build 3 步 + 5 步真 verify (3 locale /about/ curl 22 figure/27 img/22 webp/6 stage)

**事故背书 (2026-08-16)**: K3 8/16 11:22 派活"印刷机的实拍, 实拍图要调高亮度, 再到轮转机, 再到印刷机长图, 再到印刷半成品, 后道的装订车间, 成品的盒子等" → M3 workspace 改 22 figure 6 stage → commit 717825f → push → 5 步真 verify PASS (3 locale 22 figure/27 img/22 webp/6 stage).

**placeholder 同步 (K3 16:04 拍板)**: imageSlotFactory / imageSlotTeam 占位标注 拍图后改 (commit 2e2bd76) - 拍图已完成, 标"已上线 22 figure 工序流 gallery" 状态.

**应用范围**: 任何 zprintpro 工厂/设备/工艺/成品图 工序流上线路线.

---

<!-- autoclaw:feishu-lark-skill-guidance -->'''
old_block = '''5. K3 视觉确认前不部署到 PDP\n---\n\n<!-- autoclaw:feishu-lark-skill-guidance -->'''
if old_block in src:
    src = src.replace(old_block, new_block, 1)
    results.append(('AGENTS.md 4 sections add', 'OK'))
else:
    results.append(('AGENTS.md 4 sections add', 'NOT FOUND'))
with open(agents_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(agents_path, 'rb') as f:
    raw = f.read()
results.append(('AGENTS.md size', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

# ============ 2. 新建 src/components/ProductLongDescription.tsx (B-1) ============
component_path = r'F:\zprintpro-nextjs\src\components\ProductLongDescription.tsx'
component_content = '''// 2026-08-16 23:11 K3 拍板 (Push 3 B-1): ProductLongDescription 共享 component 准备
// K3 拍板 §0.16 batch 3 skill 抽离验收复查 (2026-08-16)
// 目标: 把 src/data/products.ts 85 SKU × 3 locale = 255 处 longDescription 模板抽离到共享 component
// 当前进度: B-1 (新建 component + 共享 5 段结构), B-2 (改 Product interface + 85 SKU 调用) 留 8/17

import React from 'react';

export interface ProductLongDescriptionProps {
  /** 长描述 (含 HTML, 5 段结构) */
  html: string;
  /** locale (zh-hk / en / ja) */
  locale: 'zh-hk' | 'en' | 'ja';
  /** product slug (for anchor) */
  slug?: string;
  /** 5 段结构标识 (可选, 用于 SEO 分析) */
  sections?: {
    intro?: boolean;
    industry?: boolean;
    material?: boolean;
    design?: boolean;
    faq?: boolean;
  };
}

/**
 * 5 段结构 (per §0.16 batch 3 skill 抽离 SOP):
 * 1. <h3>引子 + <p> 核心卖点
 * 2. <h3>行业概況 + 适配行业列表
 * 3. <h3>材質工艺 + <table> 紙材/工藝對比
 * 4. <h3>設計細節 + <p> 印刷/設計建議
 * 5. <h3>常見問題 + FAQ (4 个)
 */
export function ProductLongDescription({ html, locale, slug, sections }: ProductLongDescriptionProps) {
  return (
    <div
      className="product-long-description prose prose-slate max-w-none"
      data-locale={locale}
      data-slug={slug}
      data-sections={sections ? JSON.stringify(sections) : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * 共享 5 段结构模板 (zh-hk / en / ja) - 用于 B-2 替换 85 SKU longDescription 模板字符串
 * K3 8/16 拍板: skill 抽离验收复查, 减少 ~85 SKU 重复代码
 */
export const PRODUCT_LONG_DESCRIPTION_TEMPLATES = {
  'zh-hk': {
    intro: '<h3>產品核心賣點</h3><p>{intro}</p>',
    industry: '<h3>適配行業與場景</h3><ul>{industries}</ul>',
    material: '<h3>材質與工藝對比</h3><table>{materialTable}</table>',
    design: '<h3>設計與印刷建議</h3><p>{designTip}</p>',
    faq: '<h3>常見問題</h3><div>{faqs}</div>',
  },
  'en': {
    intro: '<h3>Core Product Features</h3><p>{intro}</p>',
    industry: '<h3>Industries & Use Cases</h3><ul>{industries}</ul>',
    material: '<h3>Materials & Craft Comparison</h3><table>{materialTable}</table>',
    design: '<h3>Design & Print Recommendations</h3><p>{designTip}</p>',
    faq: '<h3>FAQ</h3><div>{faqs}</div>',
  },
  'ja': {
    intro: '<h3>製品の中核的特徴</h3><p>{intro}</p>',
    industry: '<h3>対応業界と用途</h3><ul>{industries}</ul>',
    material: '<h3>素材と工艺の比較</h3><table>{materialTable}</table>',
    design: '<h3>デザインと印刷の提案</h3><p>{designTip}</p>',
    faq: '<h3>よくある質問</h3><div>{faqs}</div>',
  },
} as const;
'''
with open(component_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(component_content)
with open(component_path, 'rb') as f:
    raw = f.read()
results.append(('ProductLongDescription.tsx created', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

print('changes: {0}'.format(len(results)))
for n, msg in results:
    print('  {0}: {1}'.format(n, msg))
