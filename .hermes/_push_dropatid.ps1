# 2026-11-02 background push chain #4: drop Product @id (c4605923)
$ErrorActionPreference = 'Continue'
$repo = 'F:\zprintpro-nextjs'
$log  = Join-Path $repo '.hermes\_push_dropatid.log'
Set-Location $repo
function W([string]$m) { Add-Content -Path $log -Value ("{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $m) -Encoding utf8 }

W 'PUSH_CHAIN4_START commit=c4605923'
$ok = $false
for ($i = 1; $i -le 40; $i++) {
  $out = (node scripts/push-gate-check.mjs origin_ssh 2>&1 | Out-String).Trim()
  W ("gate_attempt_{0}: {1}" -f $i, $out)
  if ($out -match 'OK:') { $ok = $true; break }
  Start-Sleep -Seconds 90
}
if (-not $ok) { W 'PUSH_CHAIN4_STILL_BLOCKED'; exit 2 }
W 'GATE_OPEN pushing'
$push = (git push origin main 2>&1 | Out-String)
W ("push_output: " + $push.Trim())
if ($push -notmatch 'main -> main') { W 'PUSH_CHAIN4_PUSH_FAILED'; exit 3 }
W 'PUSH_DONE'
$head = (git rev-parse --short HEAD).Trim()
W ("verify_deploy head=" + $head)
for ($j = 1; $j -le 12; $j++) {
  $v = (node scripts/verify-deploy.mjs 2>&1 | Out-String).Trim()
  W ("verify_attempt_{0}: {1}" -f $j, ($v -replace "`r?`n", ' | '))
  if ($v -match 'CF Pages: success') { W 'VERIFY_DEPLOY_SUCCESS'; break }
  if ($v -match 'CF Pages: failure') { W 'VERIFY_DEPLOY_FAILURE'; exit 4 }
  Start-Sleep -Seconds 60
}
W 'PUSH_CHAIN4_END'
