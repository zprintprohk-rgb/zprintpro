# 事故与修复：pre-commit 门禁静默失效（2026-08-26 ~ 2026-09-13）

**发现**: 2026-09-13 18:40（执行层在修 hook 时做端到端测试发现）
**定级**: P0（过程级）—— 全线「commit 前门禁」在 18 天里没有运行
**数据来源**: `git config --show-origin --get core.hooksPath` + `git ls-files .githooks` + `.hermes/selftest-hook-integration.cjs`（真跑 `git commit` 端到端）+ `git log --since=2026-08-26 --oneline | Measure-Object`

---

## 1. 事故

| 项 | 事实 |
|---|---|
| 生效的 hooks 目录 | `core.hooksPath = .githooks`（来源 `F:/zprintpro-nextjs/.git/config`，8/26 为 submodule guard 设） |
| 该目录实际内容 | 只有 `.githooks/pre-push`（**tracked**）——**没有 pre-commit** |
| canonical hook 装在哪 | `scripts/canonical/pre-commit` → `scripts/setup-hooks.sh` 一直复制到 `.git/hooks/pre-commit`（**被 hooksPath 忽略**） |
| 结果 | **2026-08-26 ~ 09-13 的 pre-commit 门禁全部没跑**：encoding(UTF-16/CRLF) / 简体字 / blog-data JSON 严格校验 / 反审门童 v1（#1…#15）/ DoD 铁律 / 本轮新增的品牌全量基线 |
| 暴露面 | 该窗口内 **338 个 commit** 均未经 门禁 校验（人工/执行层自查仍有效，但机制保护为零） |

## 2. 取证（可复现）

```bash
git config --get core.hooksPath          # -> .githooks
git ls-files .githooks                   # -> 只有 .githooks/pre-push
git rev-parse --git-path hooks           # -> .githooks  (确认 git 读的就是这里)
```
端到端测试（`node .hermes/selftest-hook-integration.cjs`）：
- 修前：在 `src/` 注入一行 `智印港 ZprintPro` → `git commit` **成功（exit 0）** ⇒ 门禁未运行。
- 修后：同样注入 → `git commit` **被门童 #3 拦下（exit 1）**，清理后工作树干净 ⇒ 门禁真生效。

## 3. 修复（commit `98ad5136`）

1. `.githooks/pre-commit`（**新，受版本控制**）= `scripts/canonical/pre-commit` 的内容；同时同步 `.git/hooks/pre-commit` 作兜底。
2. `scripts/setup-hooks.sh` 改写：**先 `git config --get core.hooksPath`，装到该目录**（无则回落 `git rev-parse --git-path hooks`）+ 兜底副本 + 验证步骤改为「空 commit 通过」**且**「注入双品牌必须被拦」两条。
3. `AGENTS.md` §12：明确「hook 生效路径 = `core.hooksPath` 指向的目录」，并写入「端到端才算验证」口径。
4. 门禁自身可用性修复（否则修好后谁都提交不了）：
   - `scripts/guards/common.js` 新增 `FULL_EXEMPT_PATHS`：规则书（`AGENTS.md`）、证据日志（`.hermes/logs|reports|memory`）、门禁基础设施（`scripts/guards/`、`scripts/check-*`、`scripts/canonical/`、`.githooks/`）**全规则豁免** —— 这些文件必须能引用禁用形态作反例（实测：修前提交 AGENTS.md 触发 **223 命中**、日志 49 命中，全是引用性误报）。
   - `QUOTE_RULES`：`docs/` 等豁免路径上，品牌/跨语言/电话类「引用型规则」不再做字面拦截；**`src/` + `public/` 的强制扫描不变**。
   - `scripts/check-regression-guard.js`：DoD 判定排除上述全豁免路径（否则提交规则书必然被 DoD 拦）。
5. 端到端回归：修完后 ① 规则书/日志类 commit 可过（`98ad5136` 本身首次带着门禁全绿提交：`0 red / 0 orange / DoD 通过 / Encoding 通过`）；② `src/` 注入双品牌仍被拦。

## 4. 教训固化

`.hermes/logs/tool-lessons-2026-09-13.md` 教训 9（当日最严重）：
> **只测脚本的负向用例 ≠ 测通门禁。** 任何「闸门/守卫已生效」的结论必须有一条**端到端**证据（真触发一次被拦）；否则与「假零」同族 —— 都是把「工具没跑」当成「没有问题」。

## 5. 仍需 K3 知晓 / 拍板

1. **窗口暴露**：8/26–9/13 的 338 个 commit 未经门禁。执行层可对其中「内容类」改动做一次抽查补扫（成本：约 1 轮子代理），是否要做？
2. **hooksPath 是 local config**（不入库）：新 clone / 新 worktree 需手动 `git config core.hooksPath .githooks`，否则门禁静默失效 —— 建议把它写进新环境 checklist（已在 AGENTS §12 记录）。
3. 门禁豁免边界（规则书/日志/门禁基础设施全豁免）是否符合 K3 期望？如认为规则书也应被扫，需改为「规则书只允许在代码块内引用」的写法，可另行安排。
