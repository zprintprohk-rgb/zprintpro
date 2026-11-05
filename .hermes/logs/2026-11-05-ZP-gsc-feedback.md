# ZP-gsc-feedback preflight BLOCKED (AUTO-FILL)

VERDICT: BLOCKED
CONSUMED: preflight only; dsh was not called
DELIVERED: NONE
NEXT: K3-admin resolve preflight blocker before retry: 锁被 ZP-daily-content 持有 (3.0 min)

Blocked at: 2026-11-05 20:13:03
Reason: 锁被 ZP-daily-content 持有 (3.0 min)

## Checks

- OK `repo_worktree_branch`: repo OK, branch=main
- OK `deps_tree_integrity`: 依赖树 OK (328 个包)
- OK `dsh_executable`: dsh CLI found
- OK `dsh_credential_environment`: DEEPSEEK_API_KEY present in process environment (value not inspected)
- OK `dsh_effective_provider_model`: effective provider=deepseek-official model=deepseek-flash; allowed
- FAIL `lock_free`: ZP-daily-content 持锁 3.0 min (pid=25932)
- OK `prev_run_known`: 总线最近记录 verdict=OK @ 2026-11-04 20:21:16
- OK `lane_status_available`: verdict=ATTENTION problems=2
- FAIL `lock_acquired`: 前置检查未过, 未抢锁
