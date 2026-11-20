# background: wait gate -> push doujin fix -> verify -> probe ja feed price
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1500
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 330
  node scripts\verify-deploy.mjs
  node .hermes\_probe_doujin.mjs
  Write-Host 'DOUJIN_PUSH_DONE'
} else {
  Write-Host 'DOUJIN_GATE_BLOCKED'
}
