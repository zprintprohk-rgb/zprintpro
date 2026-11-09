# ZP-daily-content preflight BLOCKED (AUTO-FILL)

VERDICT: BLOCKED
CONSUMED: preflight only; dsh was not called
DELIVERED: NONE
NEXT: K3-admin resolve preflight blocker before retry: 锁被 ZP-gsc-feedback 持有 (5.4 min)

Blocked at: 2026-11-09 20:18:25
Reason: 锁被 ZP-gsc-feedback 持有 (5.4 min)

## Checks

- OK `repo_worktree_branch`: repo OK, branch=main
- OK `deps_tree_integrity`: 依赖树 OK (328 个包)
- OK `dsh_executable`: dsh CLI found
- OK `dsh_credential_environment`: DEEPSEEK_API_KEY present in process environment (value not inspected)
- OK `dsh_effective_provider_model`: effective provider=deepseek-official model=deepseek-flash; allowed
- FAIL `lock_free`: ZP-gsc-feedback 持锁 5.4 min (pid=32904)
- OK `prev_run_known`: 总线最近记录 verdict=OK @ 2026-11-08T21:45:00+08:00
- OK `lane_status_available`: verdict=ATTENTION problems=6
- FAIL `lock_acquired`: 前置检查未过, 未抢锁
