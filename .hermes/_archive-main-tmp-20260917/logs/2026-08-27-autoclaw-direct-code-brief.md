# Autoclaw 直接写代码指令包: 首页 4 区块 + HeroBanner 修正 + contact 页 3 语言 (2026-08-27)

> **模式**: Autoclaw (GLM-5.3 / GLM-5.3-flash) 直接在 F:\zprintpro-nextjs 写代码 + commit + push, 不经过 M3
> **状态核实 (8/27 03:54 实测)**: 即日页 ✅ 已上线 (设计基准); **首页 HeroBanner「3 小時急件」假承诺仍 live** (源码 HeroBanner.tsx:67 + live grep 命中) — ① 号修正必须保留
> **截图不需要**: Autoclaw 直接读组件源码比截图准

## 能力前提 (5 条, 缺一则退回 M3 模式)
1. 工作目录 = F:\zprintpro-nextjs (git 仓库本体, 非沙盒)
2. 文件读写 + shell + git 权限
3. 验收闸门内嵌 (见提示词「完成闸门」)
4. 禁词 + 真实承诺白名单写死
5. 只准 1 commit

## 模型分工
- GLM-5.3: 设计决策 + 组件代码
- GLM-5.3-flash: 3 语言文案同步 + 验收 grep + 编码检查 (不碰设计决策)

---

## 定稿提示词 v2 (可直接投喂 Autoclaw) — 两级约束版: 红线焊死, 设计留白

```
你是资深 B2B 跨境电商 UI/UX 设计师 + Next.js 前端工程师。
执行模型分工: GLM-5.3 = 设计决策 + 组件代码 (有发挥空间, 见「你的设计自由度」);
GLM-5.3-flash = 3 语言文案同步 + 验收脚本 + 编码检查。

## 工作目录 (强制)
F:\zprintpro-nextjs  ← 真实 git 仓库, 直接改源码。禁止输出到任何其他目录。

## 背景 (已核实事实)
- 即日服务页已完成重设计并上线: /zh-hk/services/rush-printing-delivery/
  它是本站最新设计基准, 本次改动与它像同一品牌 (风格延续, 不是像素复制)
- 真实交付承诺唯一版本: 每日 18:00 截單 → 通宵印刷 → 翌日中午 12:00 前送達
- 首页 HeroBanner 目前仍写「3 小時急件印刷」「3 小時內取貨」= 假承诺, 最高优先修正

## Step 0: 读源码 (不写码前先读完)
src/components/home/ 下 HeroBanner / HowItWorks / StatsBar / WhyChooseUs /
TrustWaterfall; src/components/layout/Footer.tsx;
src/app/[locale]/contact/page.tsx + ContactFormWrapper.tsx;
设计基准 src/components/services/RushHero.tsx + RushTimeline.tsx;
messages/zh-hk.json / en.json / ja.json 中相关文案 key。

## Step 1: 先出设计方向 (GLM-5.3 发挥环节, 不写码)
输出 1 页《设计方向说明》: 整体视觉概念 (一句话) + 每块的布局思路 +
配色用法 + 1 个你认为能成为"记忆点"的设计决策。
要求: 方向必须让读者感到"这是一家高端、快、可信赖的印刷商",
而不是"又一个模板站"。我确认方向后你再进 Step 2 写码。

## Step 2: 只改这 7 块, 其他一律不动

### ① HeroBanner 假承诺修正 (最高优先, 文案焊死)
- 现状 (HeroBanner.tsx:67): 「3 小時急件印刷」「3 小時內取貨」「3hr 可取」
- 改后 verbatim:
  title: 「即日印刷・即日急件 — 今晚 6 點前落單，聽日中午 12 點前到」
  subtitle: 「傳單 / 海報 / 貼紙 100 張起印 · 順豐翌日中午前送達 · WhatsApp 30 秒報價」
  en: "Same-Day Printing: Order by 6pm, Delivered by 12pm Next Day"
  ja: 「即日印刷: 18:00締切・翌日12時着」
- 链接保持 /services/rush-printing-delivery; 视觉呈现由你设计

### ② HowItWorks 流程 5 步
目标: 现在 5 张白卡横排 + emoji 图标 + 灰箭头, 太平。
方向: 让"流程"读起来有推进感和时间感。布局/图标/连接方式由你定,
时长沿用现有文案, 禁编造。

### ③ StatsBar 数据条
目标: 现在浅灰框像表格, 数字没有存在感。
方向: 让 4 个数字成为视觉锤。数字值保持不变 (15000+/50+/99.5%/4.9),
其余 (底色/字级/动效/排布) 由你定。

### ④ WhyChooseUs 6 卡
目标: 6 张等大白卡同质化, 无主次。
方向: 建立主次层级, 主推「即日急件」(链接即日页)。布局结构由你定
(bento/大小混排/磁贴均可, 你选最合适的), 文案保持现有 key。

### ⑤ TrustWaterfall 8 卡
目标: 与 ④ 内容重叠, 8 卡信息过载。
方向: 本块只承载"信任背书"(物流/支付/品控/年限), 与 ④ 形成
"服务优势 vs 信任背书"的明确分工。精简方式由你定 (4 大卡/logo 墙/
评价条均可), 用现有文案, 禁编造新客户名与认证。

### ⑥ Footer 微调
目标: 链接层级扁平, CTA 不突出。
方向: 主次分层 + WhatsApp 查詢做成醒目按钮。
⛔ 公司地址/电话/邮箱保持现状 (NAP 法务层禁动)。

### ⑦ contact 页 3 语言重设计
目标: 这是询盘转化页, 要让人"敢留资料"。
方向: 表单与联系方式的空间关系、信任信号的位置由你设计。
固定要素: 电话 +86 198 8085 1334 / 邮箱 zprintpro@outlook.com /
地址 深圳市龍崗区平湖街道嘉城路1号 / 信任条「✓ 提交後 15 分鐘內專人回覆
✓ 30 秒 AI 報價 ✓ 自營工廠直印」/ 表单字段 (姓名/聯絡方式/產品類型/數量/留言/附件)
⛔ 表单提交逻辑禁改 (ContactFormWrapper 现有 Supabase + /api/quote-notify
是 8/26 刚验证的生产链路, 只改样式布局)
埋点: CTA 带 data-event (whatsapp_click/tel_click/form_submit) +
data-source="contact" + data-locale

## 你的设计自由度 (鼓励发挥)
- 布局结构、间距节奏、图标风格、动效细节、组件状态 — 全由你决定
- 允许你提出比本提示词更好的方案, 在《设计方向说明》里说明理由即可
- 唯一要求: 有"设计感"——大气的留白、克制的色彩、清晰的层级、
  一个能记住的记忆点。苹果/Stripe 级的克制, 不是淘宝级的热闹

## 真实性红线 (违反 = 作废重做, 这 4 条无发挥空间)
1. ⛔ 禁「3 小時」「4 小時出貨」「當日達」「今日落單今日到手」「14:00 截單」
   — 唯一真实承诺: 18:00 截單 → 翌日中午 12:00 前送達
2. ⛔ 禁「名片」「business cards」「咭片」任何字眼
3. ⛔ 禁编造客户名/认证/数字; 回覆时效只准写「15 分鐘內」
4. ⛔ en/ja 文案禁带 Shenzhen / Hong Kong 硬塞前缀 (NAP 层除外)

## i18n 要求
- 所有文案走 messages/zh-hk.json / en.json / ja.json 的 key, 禁组件内硬编码
- zh-hk 繁体港式 / en 美式 / ja 日本市场用语, 不机械互译
- 中文禁斜体; 字体栈须含中文字体 (PingFang SC/Microsoft YaHei/Noto Sans TC)

## 工程闸门 (GLM-5.3-flash 执行, 全过才允许 commit)
1. node scripts/check-encoding.js --fix   (UTF-8 + LF)
2. npx tsc --noEmit                       (54 个 test baseline 错误, 不新增即过)
3. npm run build                          (Compiled successfully)
4. git status 确认: 只含本任务 7 块相关文件 + messages 3 json + sitemap 自动产物
5. 1 个 commit: feat(home+contact): HeroBanner 真实承诺修正 + 首页 4 区块重设计
   + contact 页 3 语言重设计 (GLM-5.3)
6. 距上次 push ≥30 分钟; push 后 node scripts/verify-deploy.mjs, exit 0 才算完成
7. 移动优先: 375px 无横向滚动; 每块有且只有 1 个主询盘 CTA;
   CTA 用品牌橙 #F87314 (这条是转化纪律, 不是审美限制)

## 验收报告 (push 后输出)
- 《设计方向说明》+ 每块 1 句改动理由
- curl live 验收:
  grep -c '聽日中午 12 點前到' 首页 ≥1
  grep -c '3 小時' 首页 = 0
  contact 页 zh-hk/en/ja 全 200
  禁词 (名片|咭片|business cards|當日達) 首页+contact = 0
  contact 页 data-event ≥4
```

---

## 千问方案修正记录 (本指令包相对千问骨架的 3 处修正)
1. 「4 小時免費打稿」高亮卡 → 删除 (线上不存在该承诺, 千问臆造, 违反 §0.23)
2. 「平均回覆時間<5分鐘」→ 改「15 分鐘內專人回覆」(即日页 8/26 K3 拍板真值)
3. 新增 ① HeroBanner 修正 (千问未发现: 首页 live 假承诺与即日页矛盾)

## 风险与回滚
- Autoclaw 报无 F:\zprintpro-nextjs 写权限 → 修它的工作目录配置, 不退回沙盒输出
- build 失败 → 不 push, 报告失败原因, 禁盲修 (1 次修复原则)
- 回滚: git revert <commit> --no-edit (单 commit 设计保证一次 revert 全回)

*整理: 2026-08-27 / 事实来源: repo 源码实测 + live curl 实测 / 本文件替代口头转述*
