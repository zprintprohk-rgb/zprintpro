# Push coordinator (ASCII only) - waits for 30min window then pushes
$ErrorActionPreference = "Continue"
Set-Location F:\zprintpro-nextjs
$done = $false
for ($i = 1; $i -le 40; $i++) {
  git fetch origin --quiet 2>$null
  $ahead = (git rev-list --count origin/main..HEAD 2>$null)
  $ts = (Get-Date).ToString("HH:mm:ss")
  Write-Output ("[{0}] ahead={1}" -f $ts, $ahead)
  if ([int]$ahead -eq 0) { Write-Output "SYNCED"; $done = $true; break }
  $gate = node scripts/push-gate-check.mjs 2>&1 | Out-String
  if ($gate -match "OK:") {
    Write-Output "--- window open, pushing ---"
    $r = git push origin main 2>&1 | Out-String
    Write-Output $r
    Write-Output ("push_exit=" + $LASTEXITCODE)
    $done = $true
    break
  }
  Start-Sleep -Seconds 60
}
if (-not $done) { Write-Output "TIMEOUT-NO-PUSH" }
