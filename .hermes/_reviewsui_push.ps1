# background: wait gate -> push reviews container fix -> verify -> probe container class
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1720
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 330
  node scripts\verify-deploy.mjs
  node .hermes\_probe_reviewsui.mjs
  Write-Host 'REVIEWSUI_PUSH_DONE'
} else {
  Write-Host 'REVIEWSUI_GATE_BLOCKED'
}
