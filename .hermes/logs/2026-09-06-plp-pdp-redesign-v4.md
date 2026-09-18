# PLP/PDP 重设计 v4 方案: 千问 IA 蓝图 × v3 管线 × 分支隔离 (2026-09-06)

> 背景: GLM-5.3 的 c00628c3「三幕式降噪试点」已上线, K3 验收不满意: "还是老的结构, 没有设计美感"
> 本文件 = 诊断 + 可回滚投放机制 + 逐组件结构蓝图 + 完整投喂提示词 v4

---

## §1 诊断: 为什么这次还是老结构 (源码 + commit 铁证)

### c00628c3 实际做了什么 (git show --stat 实测)

| 宣传 | 实际 |
|------|------|
| PDP/PLP 三幕式降噪试点 | SkuSeoBody 纯文本结构化 + 卡片删元素 + 价格行修口径, **共 142 行改动** |
| 结构重排 (千问 §4.2) | ❌ 无 sticky 报价轨 / ❌ 信任条仍在页底 / ❌ 材质对比仍是蓝头 ERP 表格 / ❌ 无锚点导航 |

**结构改动 = 0。** 执行层把「三幕式重排」读成了「三幕式降噪」, 挑了最安全的工作量子集 (删比重排容易), 千问 §4.2 的信息架构蓝图一行没动。

### 粉色满铺的来源 (grep 实测)

- CategoryIndustries.tsx:775-782: `from-amber-50/40` `from-blue-50/60` 渐变卡片
- CategoryProductCard.tsx: `bg-orange-50` `bg-rose-50` `bg-red-50` pastel 图标容器
- 产品图本身粉色爆炸贴主导
- 三者叠加 = K3 看到的「满屏粉」松散感, 且命中 v3 黑名单第 1/5 条变体

### 根因链 (两次翻车的共同模式)

1. **首页翻车**: 无设计稿直接改代码 → Tailwind 默认色板回归
2. **这次翻车**: 有 IA 蓝图 (千问 §4.2) 但提示词没把它写成**逐组件强制规格** → GLM 保留老 DOM 骨架只做表面降噪
3. **教训**: tokens 约束色彩 ≠ 约束结构; 「内容零改动」被误读为「结构也零改动」

## §2 可回滚投放机制 (K3 要求: 单独 push, 不满意可回滚)

```
main (生产, 不动)
  └── redesign/plp-pdp-v4 (分支, 所有重设计只 push 这里)
        ↓ push 分支
CF Pages 自动生成 preview 部署 (非生产, 不占线上流量)
        ↓ K3 在 preview URL 肉眼验收
  满意 → merge 进 main (1 次 production build)
  不满意 → 分支作废, main 零风险, 无需 revert
```

- 回滚成本 = 0 (不 merge 即回滚); 上线后反悔 = `git revert <merge commit>` (1 commit)
- 代价: 分支每次 push 消耗 1 次 CF build quota, 攒批 push 控制次数
- 试点范围: PLP stickers + PDP waterproof-stickers 2 页定型 → K3 拍板 → 再套全量

## §3 结构蓝图 (GLM 必须逐组件实现, 缺一项打回)

### PDP 三幕式 (冻结区 = 顶栏+导航+面包屑+hero 左图右栏报价栈+信任徽章行, 一字不动)

**第一幕 · 决策幕** (hero 之下第一屏)
- 右栏 sticky 报价轨 (≥1024px 显示, 移动端变底部悬浮条): 缩略价格 + 「30 秒報價」橙 CTA + WhatsApp 绿 CTA
- 信任条从页底搬到本幕顶部: 6 图标重绘为 52px 蓝底白线性 icon + 一句可验证证据文案 (原文案保留, 只搬家不改字)
- Tabs 区去重: 「产品详情」tab 与下方长段只保留一处权威版本

**第二幕 · 专业幕**
- 材质对比: 蓝头数据表 → 对比卡片组 (每材质 1 卡: 实拍小图 + 克重横条 + 3 场景 chip + 价格区间)
- 工艺说明: 合并为「工藝與品質」手风琴, 默认展开首项

**第三幕 · 证据幕**
- 相关产品卡: 删红色爆炸贴 (全站只留 hero 1 处), 干净图 + 一行卖点 + 价格
- FAQ 手风琴为唯一渲染源 (FAQPage JSON-LD 不动); 下方重复 Q1-Q4 纯文本折叠进「採購指南 (展開閱讀)」
- SEO 长文裸排 → 结构化卡片或折叠区

### PLP (冻结 = banner 区 + 左导航)

- 产品卡: 去 pastel 图标容器 / 去爆炸贴 / 单主 CTA (c00628c3 已做一半, 继续做完)
- 行业场景卡: 删 amber/rose 渐变, 白底 + 1px --line 边 + 蓝图标
- SEO 内容区: H2/H3/FAQ/规格表陈列升级 (手风琴/真表格设计), 文案逐字不动

## §4 tokens 统一 (修正千问文档内部矛盾)

- CTA = **橙 #F87314** 唯一行动色 (千问 §4.3 写红 #E5484D 做 CTA 与 §8.2 橙 CTA 矛盾, 以代码实测 + 即日页 DNA 为准: 橙)
- 蓝 = #2873F5 (千问文档 #2873F6 为笔误, 代码 123 处实测 #2873F5)
- 藏青渐变 (#244780→#152649) 只用于权威区: 页脚/数据带/分段横幅, 正文区一律白底
- 红只允许出现在 hero 已有爆炸贴 1 处
- 8pt 网格 / 圆角 8-16 / 单级阴影 0 1px 2px rgba(0,0,0,.06) / 表格数字 tabular-nums
- 小字号橙按钮文字用 #EA580C (对比度 4.6:1 达标)

## §5 GLM-5.3 投喂提示词 v4 (完整可复制)

===PROMPT START===

# 任务: ZprintPro 类目页 + 产品详情页重设计 — 先交设计稿, 不碰代码

你是资深 B2B 电商设计师 + 前端。客户是印刷跨境电商 zprintpro.com (香港公司, 深圳工厂, 全球接单)。
**只交付设计稿, 绝对不改 src/ 任何文件。**

## 上次失败的原因 (必读, 不许重蹈)

上一版只做了内容删减, 页面骨架原封不动 — 老结构 + pastel 色 = 被否。
这次的核心是**结构重排**: 同样的内容, 完全不同的信息架构。
「文案零改动」不等于「结构零改动」— 文案逐字保留, 但它在页面上的位置、分组、容器形态全部按下面的蓝图重排。

## 交付物

1. `design/plp-v4.html` — 类目页设计稿 (用 stickers 类目真实数据)
2. `design/pdp-v4.html` — 产品详情页设计稿 (用 waterproof-stickers 真实数据)
   两个单文件, CSS 全部内联, 浏览器双击可开, zh-hk 繁体中文
3. 每页桌面 1440px + 移动 375px 整页截图
4. 与即日页 (https://zprintpro.com/zh-hk/services/rush-printing-delivery/) 并排对比图

## 数据来源 (真实文案逐字取, 一个字符不许编)

- src/app/[locale]/category/[slug]/page.tsx + src/components/category/*.tsx
- src/app/[locale]/product/[slug]/page.tsx + src/components/pdp/*.tsx
- src/data/products.ts (waterproof-stickers) + src/data/category-seo-content.ts (stickers)
- messages/zh-hk.json
- 图片用线上真实 URL (https://zprintpro.com/...)

## 冻结区 (一字不动, 原样照抄现有线上版本)

- PDP: 顶栏 / 导航 / 面包屑 / hero 左图 + 右栏 (标题/描述/价格表/批量折扣/WhatsApp 按钮组) / 信任徽章行
- PLP: banner 区 + 左侧类目导航
你只设计冻结区以下的内容区。

## PDP 结构蓝图 (三幕式, 逐组件强制)

**第一幕 · 决策幕** (hero 之下第一屏):
- 布局: 左内容主栏 (8 列) + 右 sticky 报价轨 (4 列, position:sticky top:24px, 滚动全程可见)
- 报价轨内容: 缩略价格 + 橙色「30 秒報價」CTA + 绿色 WhatsApp CTA
- 移动端: 报价轨变底部悬浮条
- 信任条从页底搬到本幕顶部: 6 个信任点 (深圳自有工廠/即日交貨/免費打樣/品質保證/24小時支持 — 用现有真实文案) 重绘为 52px 蓝底白线性 SVG 图标 + 一行证据文案, 横排一条
- Tabs 区去重: 「產品詳情」tab 与下方长段合并为单一权威版本

**第二幕 · 专业幕**:
- 材质对比: 现有蓝头表格 → 对比卡片组。每材质 1 卡: 实拍小图 (public/images/factory/ 真实图) + 克重可视化横条 + 3 个适用场景 chip + 价格区间
- 工艺/印刷说明: 合并为「工藝與品質」手风琴, 默认展开首项, 其余收起

**第三幕 · 证据幕**:
- 相关产品卡: 删除红色爆炸贴, 干净产品图 + 一行卖点 + 价格
- FAQ: 手风琴为唯一渲染源 (页面上只出现一次)
- SEO 长文/收单说明: 折叠进「採購指南 (展開閱讀)」 details 区
- 页底保留品牌陈述 + 单一大 CTA

## PLP 结构蓝图

- 产品卡: 白底 + 1px 灰边, 无 pastel 图标容器, 无爆炸贴, 单主 CTA
- 行业场景卡: 白底 + 1px 边 + 蓝底白图标, 禁任何彩色渐变底
- SEO 内容区 (H2/H3/规格表/FAQ/场景): 文案逐字保留, 陈列升级 — FAQ 手风琴, 规格表做斑马纹 + 深蓝表头, 场景段落配图标锚点

## 设计系统 tokens

```css
:root {
  --blue:#2873F5; --blue-dark:#1a3f8f; --blue-deep:#0f1f3d;
  --orange:#F87314; --orange-dark:#EA580C; --orange-light:#FEF1E6; --wa:#25D366;
  --ink:#111827; --gray:#6B7280; --line:#E5E7EB; --bg:#F9FAFB;
  --radius:16px; --shadow:0 1px 2px rgba(0,0,0,.06);
}
```
- 橙 = 唯一行动色: 每屏最多 1 个橙色主 CTA; 小字按钮文字用 --orange-dark (对比度达标)
- 藏青渐变 linear-gradient(165deg,#244780,#1B3163,#152649) 只用于权威区 (分段横幅/数据带), 正文区一律白底
- 红只允许出现在 hero 已有爆炸贴 (冻结区), 其余爆炸贴全删
- 8pt 网格 / 表格数字 tabular-nums / 字体栈含中文: -apple-system,"PingFang SC","Microsoft YaHei","Noto Sans TC",sans-serif

## 反模式黑名单 (命中即作废)

1. ⛔ pastel 彩色底 (blue-50/green-50/amber-50/rose-50/orange-50/red-50 任何变体)
2. ⛔ emoji 当图标 / ⛔ 等大等色卡片阵 / ⛔ 蓝紫渐变 / 玻璃拟态 / 卡片套卡片
3. ⛔ 斜体中文 / ⛔ 红色爆炸贴 (除 hero 冻结区 1 处)
4. ⛔ 蓝底白字表头的 ERP 式数据表 — 表格要设计成 B2B 目录级 (斑马纹/细分隔线/tabular-nums)

## 容器宽度

内容容器 max-width 1320px 居中, 左右 padding 24px, 移动 375px 下 16px; section 背景可 full-bleed

## 验收标准 (我审截图对照)

| 项 | 过线标准 |
|----|---------|
| 结构 | 三幕式逐组件到位, sticky 报价轨桌面可见/移动悬浮 |
| 信任前置 | 信任条在第一幕, 不在页底 |
| 材质卡 | 对比卡组替代蓝头表格 |
| 去重 | FAQ 全页只出现 1 次, SEO 长文折叠 |
| 色彩 | 白底为主, ≤3 彩色, 0 pastel, 0 爆炸贴 (hero 除外) |
| 内容 | 与数据文件逐字一致, 0 编造 |
| 同品牌 | 与即日页并排便签一眼同公司 |

先交 2 个 HTML + 截图 + 对比图, 审过才谈转组件。

===PROMPT END===

## §6 M3 转化闸门 (设计稿审批后)

1. 分支: 从 main 切 redesign/plp-pdp-v4, 所有改动只在此分支
2. 组件化: CSS Modules 参照 rush-page.module.css; 试点 = stickers PLP + waterproof-stickers PDP
3. 闸门: check-encoding --fix → tsc 54 baseline 不新增 → build → `git diff --stat src/data/ messages/` 为空 (Schema/文案零改动) → 门童 #14/#15
4. push 分支 → CF preview URL → K3 验收 → merge main (1 commit) → verify-deploy exit 0
5. 定型后套 Top10 流量 PDP + 14 类目, 攒批 1 push

## §7 数据验收 (上线后)

- 试点页 7 天: 任一 PDP 排名跌 >5 位 → revert merge commit 回滚复盘
- CTR 对比: 试点页 GSC CTR 7 天前后对比 (北极星: imps→clicks 转化, CTR 0.54% → 1.5%+)

*整理: 2026-09-06 / 证据: c00628c3 git show + 千问战略 v1 + 2 张线上截图 + CategoryIndustries/ProductCard grep 实测*
