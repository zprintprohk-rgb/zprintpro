# C-fix 后续: wrapper call 前缀修复 (2026-09-15 22:10)

> 触发: K3 问「为什么今天 9 点多还是没有自定义任务执行」→ 排查发现 21:17 daily-content lane 产物落盘但未 commit/push

---

## 一、问题现象

- Task Scheduler: ZP-daily-content 9/15 21:17:01 触发, Result 0 (任务正常退出)
- lane 实际跑完: 日志 21:17:03 开始, 21:31 结束 (14 分钟), 产物落盘:
  - `src/data/blog-data/ja.json` (ジープリント brand embed, §13.16.1)
  - `.hermes/logs/2026-09-14-daily-content.md` (报告更新)
- **但**: 0 commit / 0 push → 内容未上线 (origin/main 最后 push = 04:18)

## 二、根因 (cmd.exe 批处理语义)

- wrapper .cmd 的 dsh 调用行 (L8): `"dsh.cmd" --profile headless ...` **无 `call` 前缀**
- dsh.cmd 以 `exit /b %errorlevel%` 结束
- **cmd.exe 语义**: 直接执行 (非 call) 一个 .bat, 该 .bat 的 `exit /b` 会**终止整个 cmd.exe 会话**
- → wrapper 的 L9-12 (dsh exit 回显 + lane-git-commit.py + run end) **从未执行**
- 日志证据: 21:17 段无 `dsh exit=` / `run end` / `host-side git` 任何标记

### 验证 (cmd 实测)
```
无 call:  WRAPPER-LINE-1 → SUB-BAT-RUNNING → [WRAPPER-LINE-2 缺失]  ← exit /b 终止会话
加 call:  WRAPPER-LINE-1 → SUB-BAT-RUNNING → WRAPPER-LINE-2 ✅
```

## 三、修复

1. **5 个 wrapper .cmd** (blog-deepfix / daily-content / gsc-feedback / monthly-matrix / weekly-meta): dsh 调用加 `call` 前缀
2. **源头 register-cron-tasks.ps1** L86: 生成模板加 `call` (commit 2bd46f4d)
3. **重新生成验证**: `-ArtifactsOnly` 后 5 wrapper 全部带 call, cd 路径仍指向 main worktree
4. **补跑 21:17 lane 产物**: lane-git-commit.py 手动执行 → 429cb9b6 (src) + 2e4f91f8 (报告) push 22:08

## 四、后续

- **22:43 gsc-feedback lane**: 修复后 wrapper 首次真实运行 → 预期 lane 完成后 git 步骤执行 (含 --include-matrix 提交 matrix)
- **验证点**: 日志应出现 `dsh exit=` → `lane-git-commit` 输出 → `run end`; origin/main 有新 push
- 备份: `F:\zprintpro-main-tmp\.hermes\backup-cronrun-callfix-20260915\`

## 五、数据来源
- Task Scheduler: schtasks /query ZP-* (21:17 Result 0)
- lane 日志: F:\zprintpro-nextjs\.hermes\logs\cron-ZP-daily-content.log (L7046 run start 21:17:03)
- git: main worktree reflog (最后 push 04:18 → 22:08 补跑)
- cmd 语义测试: 本机 %TEMP% 模拟 (无 call vs 加 call)
