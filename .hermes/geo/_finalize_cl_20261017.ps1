# v28_5 CL wave finalize (2026-10-17): wait for 30-min push window -> gate -> push -> verify -> probe -> indexnow
# ASCII-only on purpose (PS 5.1 parses BOM-less UTF-8 as ANSI; CJK would break parsing).
$ErrorActionPreference = 'Continue'
$log = 'F:\zprintpro-nextjs\.hermes\logs\v28_5-wave-finalize-2026-10-17.log'
function Log($msg) {
  $line = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $msg"
  Add-Content -Path $log -Value $line -Encoding UTF8
}
Set-Location 'F:\zprintpro-nextjs'
Log 'FINALIZE START (CL-1017 push pipeline)'

$pushed = $false
for ($i = 1; $i -le 8; $i++) {
  Start-Sleep -Seconds 240
  node scripts\push-gate-check.mjs *> $null
  $gate = $LASTEXITCODE
  Log "attempt $i gate_exit=$gate"
  if ($gate -eq 0) {
    git push *>> $log
    $pushExit = $LASTEXITCODE
    Log "push_exit=$pushExit"
    if ($pushExit -eq 0) { $pushed = $true; break }
    else { Log 'push failed (non-fast-forward or network) - stop, needs session review'; break }
  }
}
if (-not $pushed) { Log 'FINISH: not pushed (gate never opened or push failed). CL stays local per 0.25.8.'; exit 1 }

Log 'push OK - waiting for CF Pages build'
$verified = $false
for ($j = 1; $j -le 6; $j++) {
  Start-Sleep -Seconds 90
  $v = node scripts\verify-deploy.mjs 2>&1 | Out-String
  Log ("verify attempt $j : " + ($v -replace "`r?`n", ' | '))
  if ($v -match 'PASS') { $verified = $true; break }
}
Log "verify_ok=$verified"

if ($verified) {
  $p = node scripts\v28_5-image-deploy.mjs probe --wave=CL-1017-with-cluster7 2>&1 | Out-String
  Log ("probe_exit=$LASTEXITCODE :: " + (($p -split "`r?`n" | Select-Object -Last 4) -join ' | '))
  $n = node scripts\v28_5-image-deploy.mjs indexnow --wave=CL-1017-with-cluster7 2>&1 | Out-String
  Log ("indexnow_exit=$LASTEXITCODE :: " + ($n -replace "`r?`n", ' | '))
} else {
  Log 'verify not PASS yet - probe/indexnow skipped, re-run manually'
}
Log 'FINALIZE DONE'
