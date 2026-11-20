# background: wait gate -> push Buy Now batch1 -> verify -> probe PDP purchase block
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1100
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 330
  node scripts\verify-deploy.mjs
  node .hermes\_probe_purchase.mjs
  Write-Host 'PURCHASE_BATCH1_DONE'
} else {
  Write-Host 'PURCHASE_BATCH1_GATE_BLOCKED'
}
