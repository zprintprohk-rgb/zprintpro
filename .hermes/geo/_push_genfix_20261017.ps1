# 2026-10-17: push generator-fix commit at next 30-min window (CL push was 13:34:18)
# ASCII-only (PS 5.1).
$ErrorActionPreference = 'Continue'
$log = 'F:\zprintpro-nextjs\.hermes\logs\v28_5-genfix-push-2026-10-17.log'
function Log($m) { Add-Content -Path $log -Value ("[" + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + "] " + $m) -Encoding UTF8 }
Set-Location 'F:\zprintpro-nextjs'
Log 'GENFIX PUSH START'
$pushed = $false
for ($i = 1; $i -le 10; $i++) {
  Start-Sleep -Seconds 300
  node scripts\push-gate-check.mjs *> $null
  $gate = $LASTEXITCODE
  Log "attempt $i gate_exit=$gate"
  if ($gate -eq 0) {
    git push 2>&1 | Out-String | ForEach-Object { Log ("push_out: " + ($_ -replace "`r?`n", ' | ')) }
    $pe = $LASTEXITCODE
    Log "push_exit=$pe"
    if ($pe -eq 0) { $pushed = $true }
    break
  }
}
if (-not $pushed) { Log 'GENFIX PUSH: not pushed (gate blocked or push failed)'; exit 1 }
$ok = $false
for ($j = 1; $j -le 6; $j++) {
  Start-Sleep -Seconds 90
  $v = node scripts\verify-deploy.mjs 2>&1 | Out-String
  Log ("verify $j: " + ($v -replace "`r?`n", ' | '))
  if ($v -match 'PASS') { $ok = $true; break }
}
Log "verify_ok=$ok"
Log 'GENFIX PUSH DONE'
