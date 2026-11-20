# Step B live verification - ASCII ONLY (per AGENTS.md 0.35.5: powershell -File on a BOM-less
# UTF-8 file mis-decodes CJK as ANSI/GBK and the script aborts). No CJK literals here on purpose.
$ErrorActionPreference = 'Continue'
$repo = 'F:\zprintpro-nextjs'
Set-Location $repo
$log = Join-Path $repo '.hermes\logs\2026-09-19-stepB-live-verify.log'
function Log([string]$m) { ("[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $m) | Add-Content -Path $log -Encoding UTF8 }

"=== Step B live verify start $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Set-Content -Path $log -Encoding UTF8
$head = (git rev-parse --short HEAD)
Log "HEAD=$head"

$ok = $false
for ($i = 1; $i -le 50; $i++) {
  $out = (node scripts/verify-deploy.mjs 2>&1 | Out-String)
  if ($out -match 'PASS') { Log "verify-deploy: PASS (attempt $i)"; $ok = $true; break }
  Start-Sleep -Seconds 30
}
if (-not $ok) { Log "WARN: no verify-deploy PASS within 25 min" }

Start-Sleep -Seconds 60
Log "propagation wait done, running live probes"

Log "--- stepB-render-verify (live) ---"
$r1 = (node .hermes/_probe-pb/stepB-render-verify.cjs https://zprintpro.com 2>&1 | Out-String)
$r1 -split "`n" | ForEach-Object { if ($_.Trim()) { Log $_ } }

Log "--- 1B regression (decisive-1b-live) ---"
$r2 = (node .hermes/_probe-pb/decisive-1b-live.cjs 2>&1 | Out-String)
$r2 -split "`n" | Where-Object { $_ -match 'MOQ_DISPLAY|HTTP' } | ForEach-Object { if ($_.Trim()) { Log $_ } }

$passStepB = ($r1 -match 'FAIL 0')
$pass1B = ([regex]::Matches($r2, [char]0x2705)).Count -ge 3
Log ("RESULT: StepB_live={0} | 1B_regression={1}" -f $(if ($passStepB) { 'PASS' } else { 'FAIL' }), $(if ($pass1B) { 'PASS' } else { 'FAIL' }))
Log "=== done $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ==="
