# .hermes/guarded-push.ps1 -- 30min hard-floor gate (AGENTS.md sec 0.25 / 0.25.8 / 0.25.9)
#
# ASCII-ONLY ON PURPOSE: Windows PowerShell 5.1 reads .ps1 as ANSI, so non-ASCII comments break
# parsing (hit twice on 2026-09-12: first mojibake parse error, then a CJK comment swallowed the
# $SourceRepo parameter line -> "no such parameter"). Do not add CJK text to this file.
#
# Roles: -Repo = destination clone that tracks main (e.g. F:\zprintpro-main-tmp)
#        -SourceRepo = dev repo holding the branch (default F:/zprintpro-nextjs)
# Refuses (exit 2) when the 30-minute floor since the last main push is not met, and never clamps.
#
# Usage:
#   & .hermes/guarded-push.ps1 -Repo "F:\zprintpro-main-tmp" -SourceBranch "redesign/plp-pdp-v9" -Mode check
#   & .hermes/guarded-push.ps1 -Repo "F:\zprintpro-main-tmp" -SourceBranch "redesign/plp-pdp-v9" -Mode push

param(
  [Parameter(Mandatory = $true)][string]$Repo,
  [string]$SourceRepo = 'F:/zprintpro-nextjs',
  [Parameter(Mandatory = $true)][string]$SourceBranch,
  [ValidateSet('check', 'push')][string]$Mode = 'check',
  [int]$MinIntervalSeconds = 1800,
  [switch]$AllowEmergency
)

$ErrorActionPreference = 'Continue'
# NOTE (2026-09-12 root cause): 'Stop' made git's normal stderr progress output ("From <url>")
# a terminating error, so the script died before fetching. Progress on stderr is NOT a failure;
# real failures are decided by $LASTEXITCODE checks below.
Set-Location -LiteralPath $Repo

$lastSha = (git rev-parse HEAD).Trim()
$lastEpoch = [int64](git log -1 --format='%ct').Trim()
$now = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$elapsed = $now - $lastEpoch
$remain = $MinIntervalSeconds - $elapsed

"last main commit: $($lastSha.Substring(0,8)) @ $([DateTimeOffset]::FromUnixTimeSeconds($lastEpoch).ToLocalTime().ToString('HH:mm:ss'))"
"now:              $([DateTimeOffset]::FromUnixTimeSeconds($now).ToLocalTime().ToString('HH:mm:ss'))"
"elapsed:          $elapsed s (floor $MinIntervalSeconds s)"

if ($remain -gt 0 -and -not $AllowEmergency) {
  "REFUSED: only $elapsed s elapsed; $([math]::Ceiling($remain / 60)) more minute(s) needed -> sec 0.25 blocks the push"
  exit 2
}
if ($AllowEmergency) { "WARN: -AllowEmergency used (sec 0.25.3); the outage and K3 confirmation must be reported" }
"GATE PASS: 30min floor satisfied"

if ($Mode -eq 'check') { exit 0 }

# file:// URL form: a bare Windows path made git treat it as a remote name
# ("no such remote or remote group: F:/zprintpro-nextjs", 2026-09-12). file:// is unambiguous.
$SourceUrl = 'file:///' + ($SourceRepo -replace '\\', '/')
# Clean any stale staging ref first: a leftover guarded-tmp made fetch a no-op and the merge
# silently produced "Everything up-to-date", so the script reported PUSHED while pushing 0 commits
# (hit 2026-09-12). Never reuse a stale ref.
git branch -D guarded-tmp 2>&1 | Out-Null

git fetch $SourceUrl $SourceBranch:guarded-tmp 2>&1 | Select-Object -Last 1
if ($LASTEXITCODE -ne 0) { "FAIL: git fetch exited $LASTEXITCODE - nothing merged or pushed"; exit 3 }

$srcHead = (git rev-parse guarded-tmp).Trim()
$beforeSha = (git rev-parse origin/main).Trim()
"source branch head: $($srcHead.Substring(0,8))   origin/main before: $($beforeSha.Substring(0,8))"

git merge guarded-tmp --no-edit 2>&1 | Select-Object -Last 1
if ($LASTEXITCODE -ne 0) { "FAIL: git merge exited $LASTEXITCODE"; exit 3 }
$conflicts = (git ls-files -u | Measure-Object).Count
if ($conflicts -gt 0) { git merge --abort; "ABORT: $conflicts merge conflict(s), nothing pushed"; exit 1 }

git push origin main 2>&1 | Select-Object -Last 1
if ($LASTEXITCODE -ne 0) { "FAIL: git push exited $LASTEXITCODE"; exit 3 }

# Post-push assertion: origin/main MUST have advanced. Without this the script can report success
# while the remote is unchanged (the 2026-09-12 no-op incident).
git fetch origin main 2>&1 | Out-Null
$afterSha = (git rev-parse origin/main).Trim()
if ($afterSha -eq $beforeSha) {
  "FAIL: NO-OP PUSH - origin/main still $($afterSha.Substring(0,8)); expected $($srcHead.Substring(0,8)) to land"
  exit 4
}
git merge-base --is-ancestor $srcHead origin/main
if ($LASTEXITCODE -ne 0) { "FAIL: origin/main advanced to $($afterSha.Substring(0,8)) but does NOT contain source head $($srcHead.Substring(0,8))"; exit 4 }
"PUSHED: origin/main $($beforeSha.Substring(0,8)) -> $($afterSha.Substring(0,8)) (contains source head $($srcHead.Substring(0,8)))"
"HEAD: $(git log --oneline -1)"
exit 0
