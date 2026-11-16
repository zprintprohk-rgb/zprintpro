# 2026-11-18 决策窗整合简报（K3 五分钟拍板版）

> 汇总：`2026-11-16-comprehensive-inventory-gaps-upgrade.md` 九项清单中到达决策点的四项 · 证据全部已留档（引用见各项）· 执行层建议已标，**拍板后执行层 24h 内落地**

## 议程一｜价格口径全站拍板（最高优先——同时解决 GMC 风险 + 竞品明价压制 + 零点击根因）

**事实**（三源交叉）：
- 全站审计：20 锚定 SKU 中 **15 个 ≥5× 落差**（`.hermes/logs/price-scale-audit-20261116.json`）——「起价=批量档 as-low-as」与「MOQ 10」并读，custom-flyers **86.8×**、a5 58×、a4 44.6×
- 同页三面价：a4 hero(0.31) vs title(0.35) vs desc(0.3)；en schema **$0.04** 伪低价（Merchant 面可见）
- 竞品 snippet 卷明价：e-print 海報「HK$450」/ bmpack「100件起・網上即時見價」/ vistaprint「Try 10 starting at $10」——我方因多面价**报不出可信单价**（零点击 4 词的根因之一）

**选项**：
- **B（荐）**：schema 一律挂 **MOQ 数量档真实总价或单价**（如 a4 10 張=HK$140/14每張），标题保留「起」但补批量语境「HK$0.31 起（5,000 張）」；hero/desc 同步单源
- A：全站统一 as-low-as + 强制批量语境标注（改动面最大，4 面 × 3 语）
- C：维持现状（$0.04 伪价 + 45× 落差残留，GMC 风险不解决）

**推荐 B** · 验收：改后 5 SKU schema=页显示价=报价引擎价三面一致；GMC diagnostics 7 天零新增价格警告；audit 清单 15 SKU 逐个重跑 ratio 归一

## 议程二｜a2 poster remedy（七窗 −25.8，速度 +3.02 加速中）

**事实**：43.02（跌势不止）；11-08 H1 修复与 11-14 真值批均未咬合；789 imp @ 13.52 集中 a2-posters PDP。

- **A（荐）**：a2 PDP 承接升级（bounded 单变量）：首屏直答块（420×594mm/16.5×23.4in · 三材质 · MOQ 10 · 1-2 天）+ 2 条 PAA FAQ（A2 size in inches / A2 vs A1 cost）+ 与 poster-size-guide/price-guide 双向补链；**不动价格**
- B：维持至 11-28（跌出 top50 风险）

**推荐 A** · 验收：部署后 7d 窗 a2 poster 速度 ≤+1.0（减速），11-28 判定

## 议程三｜食品包裝印刷 snippet 单变量（页一 8.25 零点击）

**事实**：竞品首句 = 具体品项枚举 + MOQ + FSC（PackLab）；我方 = 通用服务句；根因与议程一同源。

- **提案**：仅改食品包裝落地 meta description 首句 =「外賣盒/餐盒/紙杯/烘焙盒 具體枚舉 + 低 MOQ + FSC + 30 秒報價」≤160 字符；title 不动；单变量，11-21/28 读 CTR
- 备选：维持观察一轮

**推荐提案** · 验收：7d 后该落地 CTR 方向（低展示词不判绝对值，只判方向）

## 议程四｜title 批 CTR 拆分（方法项，非拍板项）

11-13 上线的三页 title（en/ja stickers + zh flyers）效果需 query×page 拆分。**前置条件 = K3 恢复每日三档导出**（11-13/14/15 三批已缺；数据日 11-14 的 11-16 批是最新）。拆分动作执行层在导出到达后 24h 内完成，无需拍板——本项仅请求：**批准 query×page 导出纳入明日起的每日三档**。

## 附：执行面红灯（拍板外，请知悉）

1. **调度器 6/7 车道持续 0x800710E0**（S4U canary `repair-zp-scheduler-logon.ps1 -Apply` 待管理员运行；会话 Active 仍被拒 → 疑 RunAs 凭据，S4U 是首选解）
2. **数据供给**：11-13/14/15 三批缺 + 3mo 缺 4 批 + detector 缺 9 天
3. W4 第 3 轮（11-17）：0/11 三轮持稳；P6 月曆 SERP 被内容型结果挤出（11-24 第 4 轮观察，单轮不派单）；en small-batch meta 首句已随真值批达标（MOQ+价+免开版费前置 ✓，F1 顺带解决）
