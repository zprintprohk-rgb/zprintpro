# Push coordinator: wait until 23:55 (let 23:47 lane push first), then push if still ahead
$ErrorActionPreference = "Continue"
Set-Location F:\zprintpro-nextjs
$done = $false
for ($i = 1; $i -le 50; $i++) {
  git fetch origin --quiet 2>$null
  $ahead = (git rev-list --count origin/main..HEAD 2>$null)
  $now = Get-Date
  $ts = $now.ToString("HH:mm:ss")
  Write-Output ("[{0}] ahead={1}" -f $ts, $ahead)
  if ([int]$ahead -eq 0) { Write-Output "SYNCED (lane carried commits)"; $done = $true; break }
  $after = ($now.Hour -gt 23) -or ($now.Hour -eq 23 -and $now.Minute -ge 55)
  if ($after) {
    $gate = node scripts/push-gate-check.mjs 2>&1 | Out-String
    if ($gate -match "OK:") {
      Write-Output "--- window open after 23:55, pushing ---"
      $r = git push origin main 2>&1 | Out-String
      Write-Output $r
      Write-Output ("push_exit=" + $LASTEXITCODE)
      $done = $true
      break
    }
    Write-Output "gate blocked, retry next minute"
  }
  Start-Sleep -Seconds 60
}
if (-not $done) { Write-Output "TIMEOUT-NO-PUSH" }
