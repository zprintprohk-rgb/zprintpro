# 技能：生产发布管线（F:\zprintpro-nextjs）

铁律级纪律，违反任何一条都可能造成次级站点事故或污染并行车道（K3/M3 同时在这个仓库干活）。
来源实证：ff99f3d3 暂存卷入 30 文件事故、e67d1102 构建语法事故、多次探针假阴性复盘。

## 0. 多车道共存纪律
- **commit 前必须 `git diff --cached --name-only` 核对暂存集**：只允许出现本次改动的文件。
  事故案例：暂存被并行车道卷入 30 文件（ff99f3d3），push 前用 `git reset --mixed HEAD~1` 退回重提。
- 暂存被清空/异常：先查 `git reflog` + `git log origin/main` 定性（谁动了、有没有碰我的文件），再重新 `git add <明确文件>`。**严禁 `git add -A`**。
- 提交前核对并行提交是否触碰同一文件：`git log --oneline <mybase>..origin/main` + `git show --stat`；
  有交集必须先合并对方改动再提交——覆盖对方 title/meta/合规修复 = SEO 事故。
- **push 间隔：任何 push 距上次 push ≥30 分钟**（AGENTS.md §0.25）。

## 1. 三闸门（push 前全过）
1. `node scripts/check-encoding.js --fix` — 暂存文件 UTF-8 + LF（EXIT 0）。
2. `npx tsc --noEmit` — **基线是动态的**（54→53 变过），每次 push 前重测并落盘基线输出，
   只允许 0 新增错误；新旧错误集用 set 对比（新增与消失都要看）。
3. `npm run build` — EXIT=0。dev server 与 build 不能并行（.next 冲突），先停 dev。

## 2. commit 纪律
- message 用 UTF-8 文件 + `git commit -F`；PowerShell here-string `@"` 后必须立即换行；避免 `$` 字符。
- 一个主题一个 commit（视觉/文案/数据分开），保证可独立 revert。
- 中文 message 控制台显示乱码 ≠ 存储损坏：用 python subprocess 以 UTF-8 解码 `git log --format=%s` 确认。

## 3. push 后五步验收
1. `git status` 无 ahead/behind。
2. `node scripts/verify-deploy.mjs` 等 CF Pages；**脚本偶发轮询卡死 → 直接查 GitHub API**：
   `https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/<sha>/check-runs`
   （公开可读；status=completed 且 conclusion=success 即上线）。
3. 线上 URL 内容断言（关键新标记 present + 旧标记 absent，三语言）。
4. JSON-LD 解析（每页 ≥2 块合法 JSON）。
5. IndexNow 重提交受影响 URL（工具：agent workspace/.openclaw/tmp/indexnow_submit_home.py）。

## 4. 回滚
- `git revert <sha>`（每 commit 独立可回滚）或 apply 预验证过的 reverse 补丁。
- 补丁生成必须 `git diff --cached --output=<file>`（staged 记得 --cached）；
  **勿用 PowerShell Out-File 管道——会 CRLF 化损坏补丁**。
- 回滚属对外发布：重跑三闸门 + 30 分钟规则 + 五步验收。

## 5. 陷阱备忘
- 含 CJK 的脚本/搜索经 PowerShell 管道会被 cp936 损坏成 `?`（假阴性）——
  **必须落盘 UTF-8 再 `python file.py`**。
- 后台「sleep 到点再 push」会话会被终止（4h49m failed 实证）——准点手动推。

## 6. 一键检查清单
```
git fetch origin --quiet
git diff --cached --name-only          # 暂存集核对
node scripts/check-encoding.js --fix   # 闸门1
npx tsc --noEmit                       # 闸门2（对比基线）
npm run build                          # 闸门3
git push origin main                   # 30 分钟间隔后
node scripts/verify-deploy.mjs         # 或 GitHub check-runs API
# 线上断言 → JSON-LD → IndexNow
```
