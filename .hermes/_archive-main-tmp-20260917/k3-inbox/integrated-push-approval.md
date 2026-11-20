# 整合 push 审批文件 (K3 填写 → M3 自动感知, 无需转发)

STATUS: PENDING

> 用法: K3 确认后把 STATUS 改成 `1-5 OK` 并填下面 3 项。
> M3 每天 10:15 自动检查本文件: STATUS=1-5 OK 且 3 项均为真实值 (非"待填"占位) → 当日执行整合 push (前提 T3 dry-run 已 PASS, 见 qwen38 任务卡 T3)。
> 未填 = 不触发, M3 只跑 dry-run, 不阻塞其他任务。

## 3 项输入

- X URL: （待填）
- LinkedIn URL: （待填）
- IndexNow key: （待填）

## 已审/待审参照 (k3-inbox 草稿, 不需重发)

1. 15 SKU 改字审字: 2026-08-08-0400 + 2026-08-08-0430 两份草稿
2. Org sameAs 改 diff 审字
3. locale 切换 5 处审字: 2026-08-08-0712 草稿

EOF · .hermes/k3-inbox/integrated-push-approval.md
