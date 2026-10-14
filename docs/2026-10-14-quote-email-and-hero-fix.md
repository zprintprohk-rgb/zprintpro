# 2026-10-14 询盘邮件通道断流修复 + 首页 Hero 改版 + 回信送达率诊断

> K3 三合一指令：① /contact 获取免费报价按钮 9/16 后断流，用 Gmail 测试/双收 ② 回信疑进垃圾箱 ③ 首页 H1 遮轮播图文案，去橙遮罩、525px 高、文字避让
> 执行：Kimi Work 人手会话 · SESSION_LOCK 04:2x 持有（双条件核验通过）

## 一、断流根因（实测定位）

- **线上实测**：POST `https://zprintpro.com/api/quote-notify/`（合法 Origin）返回
  `{"ok":true,"skipped":"RESEND_API_KEY not configured"}` HTTP 200。
- **根因**：Cloudflare Pages 生产环境 `RESEND_API_KEY` 未配置/丢失。路由按设计降级返回 200 skipped，
  前端无感知显示「提交成功」，但一封邮件都没发 → 9/16 后零收件。
- 9/16 收到的测试信 = 「印刷需求雷达」车道直调 Resend API（sales@zprintpro.com），不经网站表单链路。
- **询盘未真正丢失**：表单主流程先写 Supabase `quotes` 表（fire-and-forget 才是邮件），
  断流期间全部询盘可从 Supabase quotes 表补捞（含 ref / 电话 / 电邮 / 留言 / UTM）。

## 二、已落地修复（本批 commit）

| 文件 | 改动 |
|---|---|
| `src/app/api/quote-notify/route.ts` | 收件人改环境变量 `RESEND_NOTIFY_TO`（逗号分隔），默认 `zprintpro@outlook.com,zprintprohk@gmail.com` **双收冗余**；CF dashboard 改收件人无需改代码 |
| `src/components/home/HeroBanner.tsx` | ① 轮播高度 `md:h-[400px]` → `md:h-[525px]`（= 轮播图 1320×525 原生高度，零裁切）② 撤掉 9/10 裁决5 橙族渐变遮罩（K3 10/14 拍板撤销）③ 文字层从「图中左压字」改为**顶部居中 frosted 信息条**（白 85% + backdrop-blur：价格胶囊 + 标题 + 描述(xl) + 报价 CTA），完全避开图内左侧烘焙文案与右侧产品主体 ④ dots 指示器移右下角 frosted 胶囊 ⑤ slide 视觉标题 h1→h2，全页仅保留 1 个 sr-only SEO H1（HERO_H1_VARIANTS 原文未动，A/B 测试不受影响） |

## 三、K3 待办（不做则修复不生效）

1. **CF Pages → zprintpro 项目 → Settings → Environment variables → Production**：
   - 重新添加 `RESEND_API_KEY`（Resend dashboard → API Keys 取，原 key 若遗失就新建一把）
   - 可选 `RESEND_NOTIFY_TO` = `zprintpro@outlook.com,zprintprohk@gmail.com`（不配则代码默认同上）
   - **加完必须触发一次 redeploy**（push 本 commit 即触发，或 dashboard 手动 Retry deployment）
2. **DNS（Cloudflare）补邮件认证**（当前实测：无 SPF、无 DMARC、DKIM 在）：
   - `_dmarc.zprintpro.com` TXT：`v=DMARC1; p=none; rua=mailto:zprintprohk@gmail.com`（先 p=none 观察 2 周再升 quarantine）
   - SPF：按 Resend dashboard → Domains → zprintpro.com 页面提示补齐（通常含 send 子域 MX/TXT），
     主域若无其它发信服务可加 `v=spf1 include:amazonses.com ~all`（以 Resend 页面为准）
3. **验证**：配好 key 后在 /zh-hk/contact/ 提一笔测试单 → Outlook + Gmail 双箱都应收到
   （Gmail 若进垃圾箱，标「非垃圾」一次即训练放行）

## 四、回信进垃圾箱诊断（问题 2）

- 现回信路径 = 人工从 zprintpro@outlook.com（免费 Outlook 个人邮箱）回客户。
  免费 outlook.com 发 B2B 报价信（含链接/价格）进 Gmail/企业邮垃圾箱概率高；域名侧又缺 SPF/DMARC，雪上加霜。
- **建议分级**：
  - 短期：回信继续用 Outlook 或 Gmail（gmial 系笔误，实为 zprintprohk@gmail.com），首封回信少链接、少附件、纯文本为主；引导客户加 WhatsApp 作为主通道。
  - 中期：报价回函改走 `sales@zprintpro.com` 经 Resend 事务性发送（DKIM 签名 + DMARC 补齐后送达率质变），人工只在客户回复后介入。
  - 「接」询盘：本批已改 Outlook + Gmail 双收，单箱故障不再丢单。
- 注意：**发件人域名认证（SPF+DMARC）补齐前，换任何免费邮箱都只是缓解，不是根治**。

## 五、SEO/AEO/GEO 护栏自检（Hero 改版）

| 项 | 状态 |
|---|---|
| sr-only SEO H1（HERO_H1_VARIANTS 三语文案） | 原文未动，GSC 排名锚点零变化 |
| slide 标题/副标题/价格/alt 文案 | 逐字未动，仅视觉位置与标签层级变化（h1→h2，单 H1 净化为加分项） |
| URL / sitemap / 结构化数据 | 未触碰 |
| CTA/埋点（hero_cta_click / trackCtaClick / A/B variant） | 逻辑原样保留 |
| CLS/LCP | 高度固定 525px 消除布局位移；首图 priority 不变 |
| 移动端 | 布局不变（300px + 底部 CTA） |

## 六、门检

- tsc 54 = 基线 54（quote-engine/__tests__ 历史遗留），本批文件 0 错误、增量 0
- check-encoding ✓ · slideStyles 残留 0 · 对端 B1c 簇3 staged 文件未触碰（git add 仅本批 4 文件）

## 七、增补：folded-leaflets imageAlt 门童 #28 修复（2026-10-14 12:1x，K3 拍板方案②）

- **首 commit 被拦**：门童 #28 硬闸报 folded-leaflets imageAlt 2 处（zh-hk 段带 ZprintPro / en 段带 CJK）。
- **溯源**：坏 alt（zh-hk = MOQ 备注句「一般為100張起訂…」）为 HEAD 预存旧账；簇3 会话（03:2x，疑似中途死亡）**CSV 侧已写好正确三语 alt 但 regen 未落地到 ts**（其报告称 regen PASS，与 ts 实况不符）。
- **处置**：未改一行 CSV —— 直接 `node scripts/csv-to-sku-seo.mjs --apply`，断言 A-E PASS，字节级变化块 = folded-leaflets 唯一 1 块，ts alt 归位（智印港 / ZprintPro / 三つ折り対応 三语正解）。
- **批次边界**：regen 产物并入簇3 批次（re-staged），本批 commit 仍仅 4 文件；对端 staged 变更另有 patch 备份 `.hermes/_cluster3-staged-backup-20261014.patch` 兜底。
- **挂账（上报 K3，不拦）**：`eco-flyers` imageAlt zh-hk 同款 MOQ 备注句坏数据（ts=CSV 一致，非门童 #28 违例项），建议簇3/簇4 车道按同法修 CSV 源头 + regen。

数据来源：
- 线上实测 POST /api/quote-notify/ 响应 `skipped: RESEND_API_KEY not configured`（2026-10-14 04:1x）
- nslookup 8.8.8.8：zprintpro.com TXT 仅 google-site-verification（无 SPF）；_dmarc NXDOMAIN；resend._domainkey TXT 存在
- SESSION_LOCK.md 2026-10-14 04:2x / 12:1x 持有声明（双条件核验记录）
- csv-to-sku-seo.mjs dry-run + --apply 输出（断言 A-E PASS，变化块 folded-leaflets ×1）
