# -*- coding: utf-8 -*-
"""cron v8.9 → v9.0 升级 (per K3 8/8 07:12 战略纠偏)
新增: 8/9 push 1 locale 切换 + 8/13/15/17 残留清理 3 批 + 8/18 grep 验收 + B 方案
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

CRON_PATH = r'F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md'

V90_HEADER = """# zprintpro-daily-content-1x7w v9.0 (2026-08-08 07:12 K3 战略纠偏升级)

> **v8.9 → v9.0 核心变化** (per K3 8/8 07:12 6 段战略级反馈):
> 1. **P0 修正**: 8/9 1 push 内做 locale-aware siteName 切换 (`zh-hk=智印港 / ja=ジープリント / en=zprintpro`), 优先于所有 SKU 改字
> 2. **§0.15 品牌一致性 P0 固化**: 前端可见处 (title/OG/schema/H1) 品牌名必须 locale-aware 统一, 法律名仅限 footer/条款/发票
> 3. **§0.16 残留清理节奏固化**: 840 智印雲 残留从"9 月初"提前到 Week 2 (8/13/15/17) 3 天清完, 前端 0 残留是 8/21 复盘硬指标
> 4. **B 方案** (1 amend 1 build): small-batch-stickers P0 跟 14 SKU 合并 1 push, 省 1 build 配额给 8/9 locale 切换
> 5. **8/8 10:15 amend push**: 14 SKU 改字 + 5 zh-hk title 改 EN/JA 跑成功 + retrofit cross-border 末尾ジープリント 埋点
> 6. **8/8 22:00 GSC 抓强监控首跑** (cron once + delete_after_run, per §0.8 一次性)

---

"""

with open(CRON_PATH, 'r', encoding='utf-8') as f:
    current = f.read()

# Replace v8.9 header with v9.0
v89_markers = [
    '# zprintpro-daily-content-1x7w v8.9',
    '# zprintpro-daily-content-1x7w v8.8',
    '# zprintpro-daily-content-1x7w v8.7',
    '# zprintpro-daily-content-1x7w v8.6',
    '# zprintpro-daily-content-1x7w v8.5',
]
replaced = False
for marker in v89_markers:
    if marker in current:
        # Find the end of the existing header block (> ... ---)
        idx = current.find(marker)
        rest = current[idx:]
        # find next ---
        sep_idx = rest.find('\n---\n', 100)
        if sep_idx > 0:
            # Replace from marker to sep_idx+5 (the ---)
            old_block = rest[:sep_idx + 5]
            current = current[:idx] + V90_HEADER.lstrip('\n') + rest[sep_idx + 5:]
            replaced = True
            print(f'Replaced header at marker: {marker}')
            break

if not replaced:
    # No marker found, prepend v9.0 header
    current = V90_HEADER + current
    print('Appended v9.0 header (no prior marker found)')

# Append v9.0 changelog + new sections
V90_CHANGELOG = """

## v9.0 增补段 (2026-08-08 07:12 K3 战略纠偏)

### §v9.0.A 8/9 必跑 (P0, 2 push 上限)

**8/9 push 1 (P0 第 1 优先, locale-aware siteName 切换)**:
1. `src/lib/seo.ts` siteName 字段改 locale-aware:
   ```ts
   siteName: locale === 'zh-hk' ? '智印港' : (locale === 'ja' ? 'ジープリント' : 'zprintpro')
   ```
2. `src/lib/seo.ts` getSiteNAP() zh-hk branch name 改 `'智印港'`, alternateName 删 `'智印雲'`/`'智印雲(香港)'`/`'智印雲印刷'`, 加 `'智印港'`
3. `src/lib/seo.ts` en branch name 改 `'zprintpro'`, ja branch name 改 `'ジープリント'` + areaServed 加 JP
4. `src/lib/seo.ts` Organization sameAs: 加 X + LinkedIn (K3 9:00 提供 URL) + 30 JP 印刷目录 (8/10 AutoGLM 跑) + Startup Base + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]
5. `public/llms.txt` + `public/llms-full.txt` 副文件 8 locale siteName 同步
6. IndexNow ping: 99 URLs (8 locale 4 page types) 用 K3 9:00 提供的 key
7. §0.7 production smoke 3/3 PASS (8 locale curl <title> 验证 智印港/ジープリント/zprintpro)

**8/9 push 2 (按需, 14 SKU 改字余下)**:
- 8/8 10:15 amend push 已合入 14 SKU 改字 (per B 方案), push 2 主要补 K3 9:00 审字反馈的修正
- 如无修正, push 2 跳过, 配额留给 8/10/13 紧急

**M3 必跑 (per v9.0 SOP, 不需 K3 9:00 拍)**:
- 8/9 0:00 (cron daily) - retrofit cross-border-ecommerce-shipping-box-guide (per SSoT 8/8 10:15 amend push 落地)
- 8/9 22:00 (cron once + delete_after_run) - GSC 抓强监控 daily
- 8/9 22:00 报告 - 写 .hermes/k3-inbox/2026-08-09-2200-gsc-strong-signal-r1.md

**K3 9:00 必拍 (per §0.13 4 字+①②③ 模式)**:
- 4 字: X URL / LinkedIn URL / 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁) / 8/9 Org sameAs 改 K3 审 diff (新增 5th 字: locale-aware siteName 切换, per K3 8/8 07:12 P0)
- ① 校准值复盘 (per §0.10) / ② §0.15/0.16 入记忆 ✅ / ③ Week 2 排期 + 残留清理插入 ✅
- A/B 方案 → 采 B (1 amend 1 build, per §0.1 攒批, K3 8/8 07:12 拍板)
- 4 件自跑 (per §0.13 9:00 必跑): 3 设备端到端 / Supabase dashboard 查 3 记录链 (fae355ba + 4892080c + 360e8366) / formsubmit.co 激活 / 提供 X+LinkedIn+IndexNow key

### §v9.0.B 840 残留清理 Week 2 3 批 (per §0.16 节奏固化)

| 日期 | 范围 | 量 | 校验 |
|------|------|---|------|
| 8/13 (Wed) | longDescription 前 200 处 | 高流量 PDP 优先 (zh-hk 3 月 13759 imps 命中 SKU) | grep + §0.7 smoke |
| 8/15 (Fri) | description + faq 300 处 | 中流量 SKU + 跨 8 locale | pre-commit 简体字守门 |
| 8/17 (Sun) | schema 剩余 340 处 | JSON-LD Organization / Product / FAQPage 全 schema | JSON-LD validate |
| 8/18 (Mon) | 全量 grep 验收 = 0 (除 k3-inbox 历史引用) | src/ + public/ + AGENTS.md + 4 SSoT 报告允许 | grep 0 残留 + 复盘硬指标 |

**SOP (每批)**:
1. Python 脚本 (regex + line-based 找块) — 不走 Edit/Write (per MEMORY §7)
2. 跑 `grep -c "智印雲" src/data/products.ts` 算残留
3. block 内 brand 修复 (智印雲 → 智印港) + 5 zh-hk title 改 EN/JA 跑成功
4. pre-commit 3 步 (encoding / 简体字 / i18n)
5. commit + push (1 push/批, 8/13/15/17 = 3 push 总用)
6. CF Pages build success + curl 8 locale <title> 验证 + grep 残留 -= 期望数
7. 落盘 .hermes/k3-inbox/2026-08-{13,15,17}-residual-cleanup-batch-{1,2,3}-PASS.md

**8/18 验收硬指标**:
- `grep -c "智印雲" src/data/products.ts` = 0 (除 k3-inbox 历史引用)
- 8 locale <title> 全过 §0.15 公式
- 8/21 复盘必含 §0.15/0.16 2 段
- 不达标 = 扣 KPI, §0.11 资源分配降级

### §v9.0.C 8/8 10:15 amend push (B 方案, 1 amend 1 build)

**B 方案理由 (per K3 8/8 07:12)**:
- small-batch-stickers P0 单独 2 build 浪费 CF 配额 (1 push = 1 build, §0.14 配额 1 天 ≤5)
- 1 amend 1 build 把 small-batch-stickers P0 + 14 SKU 改字合并, §0.1 攒批合规
- 省 1 build 留给 8/9 locale 切换 P0 (per §0.15)
- small-batch-stickers 72h 后 GSC 抓强监控照样验 CTR, 不影响 4 天可兑现 ROI

**amend push 内容**:
1. 14 SKU 改字 (per 8/8 04:30 v3 zh-hk 草稿 + 8/8 04:00 v2 JA/EN 草稿):
   - 5 SKU JA: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks
   - 4 SKU EN: small-batch-stickers (P0 第 1) / a2-posters / waterproof-stickers / saddle-stitch-booklets
   - 5 SKU zh-hk: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes
   - 1 SKU 重复: a2 + kraft (3 locale 共享, 总 11 不同 SKU object)
2. 5 zh-hk title 改 EN/JA 跑成功 (per 8/8 05:00 Python 脚本第 2 次跑, line-based 找块 + 块内 title_xxx 改字)
3. retrofit cross-border-ecommerce-shipping-box-guide (per 8/8 10:15 daily cron 触发, 含 §0.7 production smoke + 末尾ジープリント 埋点 2-3 次)
4. AGENTS.md §0.15/0.16 段新增 (K3 9:00 拍后定稿)

**amend push 风险**:
- 9:00 K3 必拍 4 字 (X + LinkedIn + 15 SKU 审字 + locale 切换) 后才能 amend
- 9:00 K3 4 件自跑 (3 设备 + Supabase + formsubmit + key) 不阻塞 amend push
- amend push 包含 14 SKU 改字, K3 9:00 审字反馈可能要求改某些字 → M3 改后 amend

### §v9.0.D 8/8 22:00 GSC 抓强监控首跑 (cron once + delete_after_run)

**SOP (per §0.8 一次性, 触发即终止)**:
1. 拉 GSC 7d 数据 (8/1-8/7)
2. 筛 pos ≤ 10 但 0% CTR 的 query → "抓强信号" 列表
3. 写 .hermes/k3-inbox/2026-08-08-2200-gsc-strong-signal-r1.md
4. 升级 K3 (如发现新 P0 抓强, 立即 8/9 push)
5. cron self delete (per §0.8 防抖)
6. 8/9-8/21 daily 22:00 (cron once + delete_after_run)

**SLA**:
- 触发 ≤ 3 min 跑完 + 报告 + 自删
- 1h 内 >3 次无实质操作 = P0 故障 (per §0.8)

### §v9.0.E K3 9:00 必拍 (per §0.13 4 字+①②③ 模式 + 8/8 07:12 增补)

**4 字 + 1 增 (K3 必拍, M3 自主范围外)**:
1. X URL (per §0.13 4 字)
2. LinkedIn URL (per §0.13 4 字)
3. 15 SKU 改字 K3 审字 (重点 ja 自然度 + zh-hk 纯繁, per K3 8/8 07:12)
4. 8/9 Org sameAs 改 K3 审 diff (per §0.13 4 字)
5. **locale-aware siteName 切换 5 处改字 K3 审字** (per K3 8/8 07:12 新增 P0, src/lib/seo.ts 5 处 + 3 llms 副文件 8 locale + 1 footer 法律名保留)

**①②③ (per §0.13)**:
- ① 8/12 复盘改用校准值 (per §0.10) ✅
- ② §0.10-0.16 入记忆 ✅ (189.9 KB MEMORY.md)
- ③ Week 2 排期 OK (8/13-8/21) + 残留清理插入 (8/13/15/17 3 批, per §0.16)

**A/B 方案 (per K3 8/8 07:12 拍板)**: 采 B (1 amend 1 build, §0.1 攒批)

**4 件自跑 (P0 阻断 8/12 验收, per §0.13)**:
- 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
- Supabase dashboard 查 (期望 3 UUID 记录: fae355ba 8/7 + 4892080c 8/8 04:32 + 360e8366 8/8 05:22)
- formsubmit.co 激活 (8/7 18:45 触发, K3 点链接)
- 提供 X + LinkedIn URL + IndexNow key (per K3 8/8 07:12 4 字 5 增)

**回 "4 字 + 采 B + §0.15/0.16 OK + 4 件跑完"** → M3 立即 10:15 amend push (§0.1 攒批, B 方案 1 amend 1 build)。

### §v9.0.F 配额动态 (per §0.14 + K3 8/8 07:12 折中)

**今日 8/8 用量**: 1/5 push (568087a PASS, 4 buffer 留给 10:15 amend + 紧急)
**8/9 用量预期**: 1-2 push (locale 切换 P0 + 14 SKU 余下按需)
**Week 2 (8/13-8/21) 用量预期**: 3 push (残留清理 8/13/15/17) + 1 push (8/18 grep 验收) = 4 push

**月累计预期** (8/8-8/21 = 14 天): ~7 push = 7/150 = 4.7% (健康)

### §v9.0.G 教训固化 (跨项目)

- **zprintpro 8/8 07:12 K3 战略纠偏**: 部署可靠性 5/5 + 战略落地 5/5 + 护栏 5/5 + 优先级判断 3/5 (840 排 9 月初太晚 + title 品牌残留危害被低估)
- **跨项目 §0.15 品牌一致性 P0**: 任何多 locale 品牌分层项目必须 locale-aware siteName 切换
- **跨项目 §0.16 残留清理节奏**: 任何品牌/术语残留禁止"量大拖延", 必须按 ~170/天 节奏
- **§0.11 资源分配原则验证**: 1 个 locale 切换 P0 > 10 个 SKU 改字 P2 (per K3 8/8 07:12 战略级)

---

**SSoT 同步链**:
- v9.0 升级 → 8/8 10:15 amend push (1 amend 1 build, B 方案) → CF Pages build success → verify-deploy 流水线 (3/3 PASS)
- 8/9 push 1: locale-aware siteName 切换 + Org sameAs + IndexNow (per §0.15 + §0.13 4 字 5 增)
- Week 2 残留清理 8/13/15/17 (3 批, per §0.16)
- 8/18 grep 验收 = 0 (复盘硬指标, per §0.16)
- 8/21 双周复盘 (per §0.10 校准值 + §0.12 转化指标 + §0.15/0.16 2 段)

"""

if '§v9.0.A 8/9 必跑' in current:
    print('SKIP: v9.0 sections already present')
    sys.exit(0)

current = current.rstrip() + '\n' + V90_CHANGELOG

with open(CRON_PATH, 'w', encoding='utf-8') as f:
    f.write(current)

import os
size = os.path.getsize(CRON_PATH)
print(f'OK: cron v8.9 → v9.0 upgraded, {size/1024:.1f} KB')
