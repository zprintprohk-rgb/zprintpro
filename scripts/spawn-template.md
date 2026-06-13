# spawn-template.md — R4 idempotency preamble

> **作用**: 每次 mavis-team / mavis communication send --command spawn / 直接给用户的 long-running task 时,
> **首段必须 verbatim prepend** 这段 preamble。它强制 spawner 在派活前做 3 问自检,
> 避免重复派发、套通用默认值、跳过前置环境验证。
>
> **来源**: 2026-06-10 智印云 phase B verifier 孤儿事件复盘 + 2026-06-13 404 修复踩坑复盘。
> **维护人**: Mavis (orchestrator)。**任何 worker** 在 spawn prompt 里见到这段, 必须 verbatim 执行自检。

---

## Preamble (verbatim prepend, 中文+英文双语保险)

```text
═══════════════════════════════════════════════════════════════════════════
MANDATORY PRE-SPAWN IDEMPOTENCY CHECK (R4 — based on mavis-team discipline)
═══════════════════════════════════════════════════════════════════════════

BEFORE any other action (write code, deploy, claim completion, etc.), run
this 4-question check and reply with status line FIRST:

Q1. IDEMPOTENCY — Does the expected output file/symptom already exist?
    - File path: <specify the deliverable path, e.g. docs/<topic>.md,
      next.config.js, or "production site shows 404 on URL X">
    - If YES and mtime within <TTL> → return "ALREADY DONE" to parent and exit.
    - If YES but stale (>TTL) → consider redoing.
    - If NO → continue.

Q2. PEER CHECK — Is the same task already running in another worker?
    - Run: `mavis session info <candidate-worker-id>` and check status.
    - Run: `mavis communication peers` to see all live workers.
    - If a peer is `started`/`running` on the same task → DO NOT spawn.
      Reply "DUPLICATE — peer <id> already doing this".

Q3. ENVIRONMENT CHECK — Do you actually know the deployment/build/runtime
    context of this project?
    - DO NOT assume: package.json scripts, wrangler.toml presence, CF Pages
      Git integration status, deployment mode.
    - READ FIRST: package.json (for scripts), CF Dashboard Settings → Build
      (for "Automatic deployments: Enabled/Disabled"), git tree
      (`git ls-tree origin/main --name-only`).
    - If you have not read these in this turn → STOP and read them now
      before suggesting any deploy/build/install command.

Q4. NO-GENERIC-DEFAULTS — Are you about to suggest a default command name
    without verifying it?
    - Examples of FORBIDDEN defaults without verification:
      `npm run cf-deploy`, `npm run dev`, `python manage.py`, `cargo run`
    - READ package.json / setup.cfg / Makefile first, then quote the
      actual command found.
    - Wrong command = wasted user time + ticket reset.

═══════════════════════════════════════════════════════════════════════════
END OF PREAMBLE. Real task description starts below.
═══════════════════════════════════════════════════════════════════════════
```

---

## 用法 (How to use)

### 路径 A: mavis-team plan 派活
在 `mavis team plan` 的 task prompt 字段前 prepend 上面那段。worker 收到任务时**第一眼**看到的就是 R4 preamble。

### 路径 B: 单 worker spawn
`mavis communication send --command spawn --content '<real-task>'` 改成
`mavis communication send --command spawn --content '<R4-preamble> + \n\n + <real-task>'`

JSON payload 里:
```json
{
  "agent": "ai-coder",
  "prompt": "<R4-preamble>\n\n---\n\n<real-task>"
}
```

### 路径 C: 直接回答用户的长任务
本文件同样适用于 Mavis 自己回答用户时的"心理 preamble"——
**回答前先 Read** 关键文件、**先看截图/环境**、**先确认前置**。
不适用于闲聊 / 简单查文件 / 单步任务。

---

## 适用边界 (When NOT to use)

- **简单聊天** (用户问"我叫什么?" "今周怎么样?")
- **单步信息查询** (Read 一个文件、查一个变量)
- **明确无歧义的小任务** (改一行 config、删一个文件)
- **用户已经给完整指令 + 完整文件路径** (R4 的 idempotency 检查用户已经替我们做了)

---

## 自检示例 (Self-check examples)

### 错 (我昨晚就是这么栽的)
> 用户: "帮我部署 404 修复"
> Mavis: "跑 `npm run cf-deploy`"  ← 套默认名, 失败

### 对 (R4 强制后的样子)
> 用户: "帮我部署 404 修复"
> Mavis: "先 Read 一下 package.json scripts 段和 CF Dashboard Settings → Build
> 区域 Automatic deployments 状态, 我看到你截图说 Automatic deployments:
> Enabled (Git 集成) + Build command: npm run build:cf, 所以应该是
> `git push main` 触发自动 build, 不是 wrangler CLI。让我先帮你 cherry-pick
> 修复 commit 到 main, 你 push 后 CF 自动部署。"

---

## 历史 (Change log)

- **2026-06-13 08:50** — 初版。起因 2026-06-12 晚 zprintpro 404 修复
  连续 4 次踩坑: cf-deploy 套默认名 → git push main 推断错 →
  wrangler 预览撞 nodejs_compat → push 循环。所有错误都在 R4 自检
  范围里。如果昨晚有这模板, 至少能避免 3 个。
- **维护**: 任何一次真实踩坑后, 在本文档"自检示例"加一条 "错/对" 配对。
