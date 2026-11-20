# ASCII ONLY (AGENTS.md 0.35.5). Wait for CF deploy then run Etsy live probe.
$ErrorActionPreference = 'Continue'
$repo = 'F:\zprintpro-nextjs'
Set-Location $repo
$log = Join-Path $repo '.hermes\logs\2026-09-19-etsy-live-verify.log'
function Log([string]$m) { ("[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $m) | Add-Content -Path $log -Encoding UTF8 }

"=== etsy live verify start $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Set-Content -Path $log -Encoding UTF8
Log ("HEAD=" + (git rev-parse --short HEAD))

$ok = $false
for ($i = 1; $i -le 60; $i++) {
  $out = (node scripts/verify-deploy.mjs 2>&1 | Out-String)
  if ($out -match 'PASS') { Log "verify-deploy: PASS (attempt $i)"; $ok = $true; break }
  Start-Sleep -Seconds 30
}
if (-not $ok) { Log "WARN: no verify-deploy PASS within 30 min; running probe anyway" }

Start-Sleep -Seconds 60
Log "propagation wait done -> live probe"
$r = (node .hermes/_probe-pb/etsy-live-verify.cjs 2>&1 | Out-String)
$r -split "`n" | ForEach-Object { if ($_.Trim()) { Log $_ } }
if ($r -match 'FAIL 0') { Log "RESULT=PASS" } else { Log "RESULT=FAIL" }
Log "=== done $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ==="
