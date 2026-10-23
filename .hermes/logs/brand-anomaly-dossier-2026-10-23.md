# 品牌异常取证档案 — 2026-10-23（GEO 基线 #1 衍生活动）

> 取证人: deepseek hermes 会话（只读调查，web_fetch 一手）
> 结论分级: A = 已实证 · B = 高度疑似 · C = 待 K3 核实

## 异常 1: www.z-printpro.com（连字符域）— 结论 A: **K3 自有旧域/别名域**

**证据**: `web_fetch https://www.z-printpro.com/products/paper-bag-printing/stand-up-pouch-printing-food-grade-window-seal-hk.html`
→ 返回 **cross-origin redirect to https://zprintpro.com**（该页 301/302 至主站同源路径）。

**判读**: 非仿冒。这是 K3 自有的连字符变体域，整体重定向至 canonical `zprintpro.com`。Google 索引中显示其内容 = 重定向目标的抓取呈现（搜索结果正常）。

**建议动作（K3 一句话可决）**:
1. 确认该域返回 **301 永久**重定向（非 302）——fetch 层未暴露状态码，建议 K3 在 GSC/服务器面板确认；
2. 若已在 GSC 添加并验证该域属性则无需动作；
3. 可选：在 GSC 对 zprintpro.com 设置 `z-printpro.com` 为域名资产，监控其展示/点击（它出现在食品包装词簇 pos 4，说明有部分展示量在连字符域上归集）。

## 异常 2: hkprint58.com — 结论 B: **第三方站点内容抄袭 + 品牌冒用（高置信）**

**一手证据**（`web_fetch https://hkprint58.com/baozhuangheyinshua/food-boxes.html`，HTTP 200）:

| 维度 | 实测 |
|---|---|
| 自有品牌 | **鑫印吧**（logo `logo-zhiyingang.png` 但页面文案品牌为「鑫印吧」） |
| 自有联系方式 | 电话 852 25848612 · WhatsApp **+86 18926515048** · 邮箱 **shenzhentengsheng@foxmail.com**（深圳腾升） |
| 被抄袭的我方内容 | 同页同时出现：「智印港 ZprintPro」logo alt ·「ZprintPro 工廠橫幅 · 自家廠房實拍」·「累計 1,000+ 企業客戶 · 50+ 國家 · 15+ 年印刷經驗」·「12 大行業」·「海德堡 6+1」·「ISO 9001 + FSC 認證」· WhatsApp +86 198 8085 1334 文案段（在模板字串內）· zprintpro@outlook.com |
| 结构判读 | 整站 Next.js 静态导出，template 字串库混入我方旧站文案（含我方已撤下的 CRED 主张——说明抓的是我站 CRED 清扫**之前**的版本，约 9 月底前） |
| 业务定位 | 与我站完全同域竞争：包装盒/食品盒/传单/贴纸/信封全品类，「深圳生産,香港交貨」同口号 |

**判读**: 鑫印吧（深圳腾升）整站抓取了我站旧版内容（含我方 CRED 清扫前的 ISO 9001/FSC/1,000+ 等主张），属于**内容抄袭 + 品牌混用**。它不是我方资产（联系方式全不同）。

**建议动作（K3 裁决）**:
1. **Google 投诉**: 以版权侵权（DMCA）+ 商标滥用两条线对 hkprint58.com 提交 Google 移除申请（搜索面它在食品包装词簇 pos 7，直接抢我方 CTR 战场流量）；
2. **取证固化**: 本档案 + 建议保存页面截图/PDF 快照（web_fetch 全文已存 spill 档，可归档 .hermes/evidence/）；
3. **法律路径（可选）**: 律师函至深圳腾升（邮箱域 foxmail 反查主体）；
4. **监控**: 纳入 GEO 基线月度复测（已登记）。

## 对我方战略的反向启示
- 抄袭站证明我站旧内容在 SERP 有抓取价值；我方 CRED 清扫（9-10 月）反而拉开了与抄袭者的合规差距——坚持零编造主张是对的。
- 食品包装词簇（CTR 战场 #1）出现抄袭者分食展示位 → 排名冲刺（hub v2 内链 + 图重做 + B2 PAA 段）的紧迫性再 +1。
