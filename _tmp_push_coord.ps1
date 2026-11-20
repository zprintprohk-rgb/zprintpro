# Push coordinator (ASCII only - PS 5.1 parses BOM-less UTF-8 as ANSI)
# Wait for gsc-feedback lane (~20:20). If lane already pushed -> exit. Else push after 20:25.
$ErrorActionPreference = "Continue"
Set-Location F:\zprintpro-nextjs
$done = $false
for ($i = 1; $i -le 40; $i++) {
  git fetch origin --quiet 2>$null
  $origin = (git log -1 --format="%h" origin/main 2>$null)
  $head = (git log -1 --format="%h" HEAD)
  $ahead = (git rev-list --count origin/main..HEAD 2>$null)
  $ts = (Get-Date).ToString("HH:mm:ss")
  Write-Output ("[{0}] origin={1} head={2} ahead={3}" -f $ts, $origin, $head, $ahead)
  if ([int]$ahead -eq 0) { Write-Output "SYNCED: lane push already carried commits"; $done = $true; break }
  $now = Get-Date
  if (($now.Hour -eq 20 -and $now.Minute -ge 25) -or $now.Hour -gt 20) {
    $gate = node scripts/push-gate-check.mjs 2>&1 | Out-String
    if ($gate -match "OK:") {
      Write-Output "--- window open, pushing ---"
      $r = git push origin main 2>&1 | Out-String
      Write-Output $r
      Write-Output ("push_exit=" + $LASTEXITCODE)
      $done = $true
      break
    }
    Write-Output "gate blocked"
  }
  Start-Sleep -Seconds 60
}
if (-not $done) { Write-Output "TIMEOUT-NO-PUSH" }
