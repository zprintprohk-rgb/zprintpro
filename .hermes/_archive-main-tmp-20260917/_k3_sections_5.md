### §0.16 SEO/GEO 拍板固化 3 阶段 (2026-08-05/13/15 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: SEO/GEO 拍板必须分 3 阶段固化, 不一次性写完 (避免 840 处残留排 "9 月初" 战略误判, K3 8/8 07:12 纠偏).

**3 阶段节奏 (K3 8/8 07:12 + 8/13 + 8/15 拍板)**:
- **Batch 1 (8/13)**: longDescription 前 200 处高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU), 1 push
- **Batch 2 (8/15)**: description + faq 300 处中流量 SKU + 跨 8 locale, 1 push
- **Batch 3 (8/15)**: schema 剩余 340 处 JSON-LD Organization / Product / FAQPage 全 schema, 1 push
- **验收 (8/18)**: 全量 grep = 0 (除 k3-inbox 历史引用), src/ + public/ + AGENTS.md + 4 SSoT 报告允许

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目品牌 / 术语残留清理; 任何 "量大怕出错" 不能作为残留拖延理由.

**判断 SOP** (任何残留清理 commit 实施前自查):
1. 跑 `grep -r "旧 brand/术语" src/ public/ AGENTS.md` 算残留数
2. 残留 ≥ 100 处 → 按 ~170/天 3 天清完, 不分散到下月
3. 每批 commit 后跑 8 locale curl 验证 + grep 复检
4. 3 批全完成 = 前端 0 残留, 写入复盘硬指标

**反例 (zprintpro 8/8 05:00 教训, K3 8/8 07:12 纠偏)**:
- ❌ 840 处智印雲 残留排 "9 月初" = 战略误判
- ❌ "量大怕出错" 不能作为残留拖延理由
- ❌ 残留每多 1 天, branded search + 实体一致性 + AI 引用 多受损 1 天

**实施硬约束**: 残留清理必走 Python 脚本 (regex + line-based 找块), 不走 Edit/Write (per MEMORY "Edit/Write 大段 JSON 内容" §7); 每批 commit 前必跑 pre-commit 3 步 (encoding / 简体字 / i18n); 8/18 全量 grep 验收 = 0 是 8/21 复盘硬指标.

---

### §0.17 push 台账一口径 (2026-08-08 15:35 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: 日/月配额以 "git push 次数" 计 (含 force-push), 每份报告必报同一数字; amend 止损月上限 2 次; push 前必跑 npm run build.

**计数口径 (单一台账)**:
- **日配额**: git push 次数 (含 force-with-lease amend push), 1 天 ≤ 5 push
- **月配额**: CF 账户级 500 build/月, 3 项目共享, zprintpro 单项目 ~150/月
- **amend push 也算 1 次**: force-with-lease 替代失败 commit, 节省 1 build 不节省 push 配额
- **cron auto 不算手动 push**: daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00
- **重要内容豁免 (K3 8/16 16:51 拍板)**: 关于我们 / 联系 / 服务时间 / FAQ 等 "重要内容" 不受 1 天 ≤ 5 限制, 但月配额仍生效

**报告必含数字** (每份部署报告 / 升级 K3 / 自我升级):
```
今日 push: X/5 (含 amend force-push, 重要内容豁免)
月累计: Y/150 (CF 账户 500 内 3 项目共享)
buffer: 5-X (留紧急)
```

**amend 止损月上限 2 次**:
- 1 amend 1 build 节省 CF build 配额 (vs 2 commit 2 build)
- 但 amend force-push 也算 1 push, 节省 build 不节省 push
- 月上限 2 次 = 防止过度 amend 污染 git history
- 超 2 次 → revert + 重做 (干净 history)

**push 前必跑 npm run build** (4703262 教训固化):
- pre-commit hook 只查 encoding (UTF-16/CRLF) + 简体字守门
- **不查 TypeScript type error** (per zprintpro 8/8 4703262 失败)
- §0.7 production smoke 4 步 = encoding + 简体字 + tsc + **npm run build**
- TS 错误只该花在本地, 不该花在 CF 配额上 (4703262 浪费 1 CF build)

**反例 (zprintpro 8/8 15:00 教训)**:
- ❌ 4703262 push 前**没跑 npm run build**, TS duplicate property 报 错, CF build 失败
- ❌ 浪费 1 CF build (1/150 → 2/150), 浪费 18 min 监控 (cron + verify)
- ❌ amend 117f9fc 修, 实际 net 2 push (1 PASS + 1 FAIL 替代) 但 CF build 数 2 次
- 改进: 117f9fc push 前**跑了 npm run build PASS**, 1 次 build success

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目; 任何 cron auto / 手动 / 紧急 push; 任何 amend / force-with-lease / rebase push; 任何跨项目 deploy (3 项目共享 CF 账户).

**实施硬约束**: 任何 commit push 前必跑 `npm run build` 验证 (4-5 min, 节省 CF build 18 min); 任何 amend force-push 必报 +1 push 配额 + 1 CF build 配额; 任何报告必含 push 计数; 月 amend 超 2 次 = revert + 重做.

**待确认 (K3 8/8 15:35 拍板)**: force-push 是否消耗 CF build 配额 → K3 8/9 查 CF Dashboard 实际确认.

---

### §0.18.1 重定向上线 SOP (2026-08-08 15:35 K3 拍板, 跨项目 P0 · Batch A 8/16 写入)

**核心**: 任何 301/410 重定向规则上线前 curl 验证目标 200; 禁止兜底规则覆盖多 locale 活路径; 禁止自指向规则.

**上线前 4 步 SOP** (per K3 8/8 15:35 拍板):
1. **curl 验证目标 200**: `curl -I https://zprintpro.com/<target>/` 必须返回 200, 任何 404/301/302 = 规则失败
2. **禁止兜底规则覆盖多 locale 活路径**:
   - ❌ `/blog/* → /zh-hk/` 覆盖 /en/blog/* + /ja/blog/* 活路径
   - ✅ `/blog/* (无前缀) → /zh-hk/blog/$1` 仅无前缀路径, 保留语言路径
3. **禁止自指向规则**:
   - ❌ `kraft-paper-bags → kraft-paper-bags` (占位符 URL 实际指向正确 SKU, 不需 301)
   - ✅ 删自指向规则, 或 curl 验证目标真的不同
4. **m3u8 用 410 正确**:
   - ❌ `/upload/*.m3u8 → 410` 实际 CF Edge Rule 不是 Bulk Redirects
   - ✅ 用 CF Edge Rule (Ruleset) → 410 Gone, 不是 301

**CF Bulk Redirect List 草稿 (修正版, per K3 8/8 15:35 拍板)**:
```
# 双 locale 前缀 (per §Next.js as-needed 陷阱)
*/en/en/*                          → /en$1                    301
*/ja/ja/*                          → /ja$1                    301
*/zh-hk/zh-hk/*                    → /zh-hk$1                 301

# 类目错位
/zh-hk/product/packaging/          → /zh-hk/category/packaging/  301

# www 域 (裸域跳转, 5 分钟事)
www.zprintpro.com/個から            → zprintpro.com/            301
www.zprintpro.com/個起              → zprintpro.com/            301
www.zprintpro.com/枚から            → zprintpro.com/            301

# ❌ 删除 2 条问题规则:
# /blog/* → /zh-hk/                  (覆盖 /en/blog/* /ja/blog/* 活路径)
# /product/* → /zh-hk/               (覆盖 /en/product/* /ja/product/* 活路径)
# /services/* → /zh-hk/services/...  (覆盖 /en/services/* /ja/services/* 活路径)
# /license/ → /zh-hk/                 (low priority, 无流量)
# /ja/guide/ → /zh-hk/                (low priority)
# kraft-paper-bags → 自己             (自指向, 占位符 URL 实际指向正确 SKU)

# CF Edge Rules (Ruleset) → 410 Gone (永久删除)
/upload/*.m3u8                      → 410 Gone
```

**判断 SOP** (任何重定向规则 commit 实施前自查):
1. 目标 URL 是不是活路径? 跑 `curl -I <target>` 验证 200
2. 规则是否覆盖多 locale? 跑 `curl -I /<other-locale>/<path>` 验证 200 (无规则命中)
3. 规则是否自指向? source 和 target 不一致
4. m3u8 等永久删除用 CF Edge Rule (410), 不是 Bulk Redirects (301)

**应用范围**: 任何 zprintpro / aitoptools / togthr CF Pages 项目; 任何 CF Bulk Redirects 操作; 任何 301/302/410 重定向规则.

**实施硬约束**: 上线前 4 步 SOP 必跑 (curl 200 + 禁止覆盖 + 禁止自指向 + m3u8 用 410); 报告必含 "每条 curl 验证目标 200" 证据; 兜底规则禁止 (任何 `/path/*` 规则必须明确非多 locale 活路径).

**教训源头**: zprintpro 8/8 15:00 草稿错误 (K3 8/8 15:35 纠偏).

---

### §0.20.8 工厂图 K3 拍板 SOP (2026-08-16 08:53 K3 拍板, Batch A 8/16 写入)

**核心**: 工厂图全链路处理走 5 步 SOP, 任何 PDP hero / 关于我们板块 / 工艺图必须按此流程.

**5 步 SOP (K3 8/16 08:53 拍板)**:
1. **命名规则** (K3 8/16 9:18 拍板): 中文 → 英文 SEO, 全小写 + 连字符, **不含 supplier origin 城市** (Shenzhen / 深圳) (per §13.10 NAP 脱钩)
2. **命名分类**:
   - `factory-*` (设备) - 印刷机 / 轮转机 / 后道设备
   - `showcase-*` (成品) - 包装盒 / 礼盒 / 成品出货
   - `craft-*` (工艺) - 手工 / 装订 / 烫金 / UV
3. **红变黑根因 + 修复** (V20.5 教训固化):
   - ❌ 灰度世界算法 (gray-world) → 红图变黑图
   - ✅ 温和白平衡 (白点检测 strength=0.10) + 强饱和 +1.25 + 对比度 +1.10 + 锐化 50%
4. **alt 3 locale**: zh-hk / en / ja 三语种 alt 文本, 含设备名 + 工艺 + 场景 (e.g. "印刷機實拍 - 海德堡 6+1 柯式印刷機運行中 · 22 figure 工序流")
5. **5 步真验证**: 命名唯一性 + alt 3 locale + curl /images/factory/*.webp 200 + 工厂图 / 关于我们 / 工艺 section 引用 + grep 残留 = 0

**事故背书 (2026-08-16 8/16 8:53-09:42)**:
- K3 8/16 08:53 派活: 工厂图片处理 4 块 (blog 图替换 / 9 张新图命名 + 调色 / craft 重处理 / 改名)
- K3 8/16 09:42 选 D 全部 PASS (commit 996c34a, 23 files, factory/ 25 webp jpg 0)
- 命名规则 K3 9:18 拍板, 红变黑根因 K3 9:18 拍板温和白平衡修法

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目印刷设备图 / 工艺图 / 工厂实拍; 任何 AI 出图 / 设计师交付 / 工厂拍摄图片处理.

**判断 SOP** (任何工厂图 commit 实施前自查):
1. 命名: 全小写 + 连字符 + 不含 supplier origin 城市
2. 分类: factory-* / showcase-* / craft-* 三类明确
3. 调色: 不用灰度世界算法, 用温和白平衡
4. alt: 3 locale 完整, 含设备名 + 工艺 + 场景
5. verify: 5 步真验证 PASS 才算完成

**实施硬约束**: 任何工厂图 push 必走 5 步 SOP, 不省任何一步; 任何"量大图多"不能省 alt 3 locale 守门; 任何 V20.5 灰度世界算法红变黑教训必避免.

---

### §0.20.9 22 figure 工序流 SOP (2026-08-16 11:22 K3 拍板, Batch A 8/16 写入)

**核心**: 关于我们板块工厂图必须按 22 figure 6 stage 工序流结构组织, 任何升级 / 重构按此结构.

**6 stage 工序流 (K3 8/16 11:22 拍板 + 千问 15:48 thinking + K3 workspace 16:00 commit 717825f)**:
- **Stage 0 Banner**: factory-banner.webp (full-width hero, brightness-105)
- **Stage 01 色彩管理**: color-chart + colorStory text card
- **Stage 02 柯式印刷**: speedmaster-with-boxes (2x2 STAR badge) + heidelberg-6plus1 + offset-press
- **Stage 03 數碼 + 標籤**: press-pano (wide) + label-press + hp-digital
- **Stage 04 後道裝訂 + 半成品**: gluing + craft-gluing + weigang-uv + folding-line + craft-triangle
- **Stage 05 節慶禮盒工藝**: red-tactile + red-tian-di + red-flip + red-conjoined-interior
- **Stage 06 成品 & 包裝出貨**: cabinet + palletized + black + vending + textbook

**Total**: 22 figure (含 color text card), 21 figure (不含 color text card)

**事故背书 (2026-08-16 11:22-16:07)**:
- K3 8/16 11:22 拍板: 印刷机实拍 + 调亮 + 轮转机 + 印刷机长图 + 半成品 + 后道 + 成品
- 千问 1cda9f9 (8/16 15:05) 嵌入工厂图 section (7 figure) - 中间过渡版
- 千问 647eb25 (8/16 15:16) Bento UI 升级 (8 figure 4 列) - 千问最终版
- K3 8/16 15:48 让读千问 thinking + 分析研究后更新 → M3 commit 717825f (8/16 16:00, K3 workspace 22 figure 6 stage design, 261+/81-)
- M3 commit 2e2bd76 (8/16 16:07) imageSlotFactory/Team placeholder 标 22 figure 上线状态 (6+/6-)
- 5 步真验证 PASS: 22 figure / 27 img / 22 webp / 6 stage 全显

**应用范围**: 任何关于我们板块升级 / 重构; 任何 22 figure → 25 figure / 30 figure 扩展; 任何工厂图章节引用 22 figure 工序流.

**判断 SOP** (任何关于我们板块升级 commit 实施前自查):
1. 6 stage 工序流是否完整 (Stage 0-Stage 06)?
2. 22 figure 总数是否对得上 (含 color text card = 22, 不含 = 21)?
3. Stage 0 Banner 是否 full-width hero + brightness-105?
4. Stage 04-05 后道 + 礼盒工艺 是否齐 (核心差异化)?
5. Stage 06 成品出货 是否含 cabinet + palletized + black + vending + textbook 五类?

**实施硬约束**: 任何关于我们板块升级必走 6 stage 工序流结构, 不自由发挥; 任何"加点图"必须先确认加到哪个 stage; 22 figure 增减要 commit message 明确说; imageSlotFactory/Team placeholder 必带 commit SHA + 上线日期.

**K3 16:51 拍板重要内容**: 关于我们是重要内容, 不受 §0.17 push 配额 1 天 ≤ 5 限制.

---
