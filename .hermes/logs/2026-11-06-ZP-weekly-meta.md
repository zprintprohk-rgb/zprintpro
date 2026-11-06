# ZP-weekly-meta preflight BLOCKED (AUTO-FILL)

VERDICT: BLOCKED
CONSUMED: preflight only; dsh was not called
DELIVERED: NONE
NEXT: K3-admin resolve preflight blocker before retry: strategy-feedback exited 1; output suppressed

Blocked at: 2026-11-06 20:52:01
Reason: strategy-feedback exited 1; output suppressed

## Checks

- OK `repo_worktree_branch`: repo OK, branch=main
- OK `deps_tree_integrity`: 依赖树 OK (328 个包)
- OK `dsh_executable`: dsh CLI found
- OK `dsh_credential_environment`: DEEPSEEK_API_KEY present in process environment (value not inspected)
- OK `dsh_effective_provider_model`: effective provider=deepseek-official model=deepseek-flash; allowed
- OK `lock_free`: 无锁
- OK `prev_run_known`: 总线最近记录 verdict=OK @ 2026-10-30 20:57:55
- OK `lane_status_available`: verdict=ATTENTION problems=2
- FAIL `periodic_strategy_review`: strategy-feedback exited 1; output suppressed
- FAIL `lock_acquired`: 前置检查未过, 未抢锁
