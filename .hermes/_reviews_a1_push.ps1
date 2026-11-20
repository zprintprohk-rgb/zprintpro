# background: wait gate -> push reviews A1 -> verify -> probe
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 500
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 330
  node scripts\verify-deploy.mjs
  node .hermes\_probe_reviews_a1.mjs
  Write-Host 'REVIEWS_A1_DONE'
} else {
  Write-Host 'REVIEWS_A1_GATE_BLOCKED'
}
