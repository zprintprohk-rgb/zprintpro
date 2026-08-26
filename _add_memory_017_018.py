# -*- coding: utf-8 -*-
"""Append §0.17 push 台账 + §0.18 重定向上线 SOP to MEMORY.md (跨项目 P0 固化)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

MEMORY_PATH = r'C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md'

APPENDED = r"""

### §0.17 push 台账单一口径 (2026-08-08 15:35 K3 拍板, 跨项目 P0 固化)

**核心**: 日/月配额以"git push 次数"计 (含 force-push), 每份报告必报同一数字; amend 止损月上限 2 次; push 前必跑 npm run build.

**计数口径 (单一台账)**:
- **日配额**: git push 次数 (含 force-with-lease amend push), 1 天 ≤ 5 push
- **月配额**: CF 账户级 500 build/月, 3 项目共享, zprintpro 单项目 ~150/月
- **amend push 也算 1 次**: force-with-lease 替代失败 commit, 节省 1 build 不节省 push 配额
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

**force-push 是否消耗 CF build 配额**:
- K3 8/8 15:35 拍板"force-push 是否消耗 CF build 配额需 8/9 查 CF Dashboard 确认"
- 待确认: 8/9 K3 查 CF Dashboard 实际确认

**应用范围**:
- 任何 zprintpro / aitoptools / togthr CF Pages 项目
- 任何 cron auto / 手动 / 紧急 push
- 任何 amend / force-with-lease / rebase push
- 任何跨项目 deploy (3 项目共享 CF 账户)

**实施硬约束**:
- 任何 commit push 前必跑 `npm run build` 验证 (4-5 min, 节省 CF build 18 min)
- 任何 amend force-push 必报 +1 push 配额 + 1 CF build 配额
- 任何报告 (deploy-PASS.md / upgrade-K3 / self-report) 必含 push 计数
- 月 amend 超 2 次 = revert + 重做 (干净 history)

**配套机制**:
- §0.7 production smoke 4 步 (加 npm run build 必跑)
- §0.14 CF Pages 配额校准 (1 天 ≤5 push + CF 账户 500/月 共享)
- §0.1 攒批 (1 push/天基线, 重要更新立即 push)
- §0.6 紧急修复 (P0 5xx 阻断, 不豁免 push 计数)

**教训固化源头**:
- zprintpro 8/8 15:00 4703262 失败 + 15:20 117f9fc amend 修复 (K3 8/8 15:35 拍板)
- 跨项目: 任何 push 必跑 npm run build 4 步验证, 节省 CF 配额 + 部署时间

### §0.18 重定向上线 SOP (2026-08-08 15:35 K3 拍板, 跨项目 P0 固化)

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

**CF Bulk Redirect List 草稿 (修正版, per K3 8/8 15:35 拍板)**:
```
# CF Dashboard → Bulk Redirects → Add rules (301 永久)
# 上线前 curl 验证每条目标 200

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

**反例 (zprintpro 8/8 15:00 草稿错误, per K3 8/8 15:35 拍板)**:
- ❌ `/blog/* → /zh-hk/` 覆盖多 locale 活路径
- ❌ `kraft-paper-bags → 自己` 自指向
- ❌ `/services/* → /zh-hk/services/rush-printing-delivery/` 覆盖 /en/services/* /ja/services/*

**判断 SOP** (任何重定向规则 commit 实施前自查):
1. 目标 URL 是不是活路径? 跑 `curl -I <target>` 验证 200
2. 规则是否覆盖多 locale? 跑 `curl -I /<other-locale>/<path>` 验证 200 (无规则命中)
3. 规则是否自指向? source 和 target 不一致
4. m3u8 等永久删除用 CF Edge Rule (410), 不是 Bulk Redirects (301)

**应用范围**:
- 任何 zprintpro / aitoptools / togthr CF Pages 项目
- 任何 CF Bulk Redirects 操作 (K3 真实身份)
- 任何 301/302/410 重定向规则

**实施硬约束**:
- 上线前 4 步 SOP 必跑 (curl 200 + 禁止覆盖 + 禁止自指向 + m3u8 用 410)
- 报告必含"每条 curl 验证目标 200"证据
- 兜底规则禁止 (任何 `/path/*` 规则必须明确非多 locale 活路径)

**配套机制**:
- §0.16 残留清理节奏 (840 残留按 3 天清完, 8/13/15/17)
- §0.15 品牌一致性 P0 (locale-aware 切换)
- §0.1 攒批 (1 push/天基线)

**教训固化源头**:
- zprintpro 8/8 15:00 草稿错误 (K3 8/8 15:35 纠偏)
- 跨项目: 任何重定向规则上线前 4 步 SOP

"""

with open(MEMORY_PATH, 'r', encoding='utf-8') as f:
    current = f.read()

if '§0.17 push 台账' in current and '§0.18 重定向上线 SOP' in current:
    print('SKIP: §0.17/0.18 already in MEMORY.md')
    sys.exit(0)

with open(MEMORY_PATH, 'a', encoding='utf-8') as f:
    f.write(APPENDED)

import os
size = os.path.getsize(MEMORY_PATH)
print(f'OK: §0.17 + §0.18 appended, MEMORY.md now {size/1024:.1f} KB')
