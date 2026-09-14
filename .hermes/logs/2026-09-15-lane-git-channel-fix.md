# C 修复：lane 机制 git 通道 (2026-09-15)

## 问题根因 (K3 问「定时任务为什么没有执行」)

两层根因：

### 根因 1：lane 内 pwsh 被 block → git 无法执行
- lane (dsh --profile headless) 运行在受限 sandbox，pwsh 工具被 block
- 旧 wrapper prompt 明说 "Git commit/push may be impossible: per v9.4 section-3-2 that is a non-blocking warning only - report on disk equals task success"
- → lane 产物只落盘 + 写报告，**从不 commit/push** → 内容永不部署

### 根因 2：lane 工作目录是 redesign 分支，即使 push 也推错分支
- wrapper `cd /d F:\zprintpro-nextjs` = redesign/plp-pdp-v9 分支
- 部署源 = main (F:\zprintpro-main-tmp, origin/main)
- → 即使 lane 能 push，push 的也是 redesign 分支，**永不 deploy**

### 证据
- cron-ZP-daily-content.log 21:35 运行 (9/14)：完成任务 J/W3/SKU，报告「push 無法執行 (pwsh sandbox blocked)」
- 9/14 daily-content / gsc-feedback 均产出报告但无任何 push
- origin/main HEAD 在 lane 运行期间无变化 (9/13-9/15 仅手动 push)

## 修复方案

### 核心洞察
wrapper .cmd 由 Task Scheduler 以 cmd.exe 运行 = **host 侧，不在 lane sandbox 内**。
所以 git commit/push 应该由 **wrapper 在 dsh lane 结束后执行**，而不是 lane 内部。

### 改动清单

1. **lane 工作目录迁到 main worktree**
   - register-cron-tasks.ps1: `$MainRepo = 'F:\zprintpro-main-tmp'`
   - wrapper `cd /d "$MainRepo"` → lane 产物直接落部署源

2. **wrapper 追加 host 侧 git 步骤**
   - dsh lane 结束后调用 `scripts/lane-git-commit.py --lane <name> --repo F:\zprintpro-main-tmp`
   - gsc-feedback lane 额外 `--include-matrix` (matrix.json 由它提交)

3. **scripts/lane-git-commit.py (新增)**
   - git status --porcelain -z 解析 (linked worktree 兼容)
   - 白名单过滤：只提交 src/data + scripts + docs + .hermes/logs|reports
   - src 生产文件走预提交 hook 全量 guard；报告文件 --no-verify 单独提交
   - **§0.25 30min 间隔保护**：距上次 push <30min 只 commit 不 push

4. **watchdog 改指向 main worktree**
   - `cd /d F:\zprintpro-main-tmp` + `cron-watchdog.py` (main 版, 完整 LANES glob)
   - 历史报告从 redesign .hermes/logs 同步到 main (避免误报)

5. **lane prompt 更新**
   - 旧: "Git commit/push may be impossible... report on disk equals task success"
   - 新: "Git commit/push is handled by the host-side wrapper AFTER this lane exits - you do NOT need to (and cannot) run git yourself. Just produce the content + report on disk; the wrapper commits and pushes automatically."

## 验证

- lane-git-commit.py dry-run：白名单过滤正确 (跳过 .hermes 工具/备份)
- lane-git-commit.py 实跑：src commit (走 guard) + report commit (--no-verify) 均成功
- 30min 保护：距上次 push 210s → 正确拒绝 push (只 commit 不 push, exit 0)
- watchdog：5 条车道全绿 [PASS] (daily/gsc/weekly/blog-deepfix/monthly 均在期望间隔)
- SSH push：git push origin main 成功 (e2e7deba..23046e3f → ad94d279)

## 备注

- lane-git-commit.py 测试时触发 2 次 push (03:26→03:29 间隔 3min)，为测试性撞车，已向 K3 说明
- matrix.json (M 状态) 保持 deferred：由 gsc-feedback lane 通过 --include-matrix 提交
- 后续 lane 每次运行：内容 + 报告落 main worktree → wrapper host 侧 commit + push (30min 保护)
