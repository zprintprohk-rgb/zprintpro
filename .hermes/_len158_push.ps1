# background: wait gate -> push 158c length gate -> verify -> probe lengths
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1560
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 420
  node scripts\verify-deploy.mjs
  node .hermes\_probe_det2.mjs
  node .hermes\_probe_en.mjs
  Write-Host 'LEN158_DONE'
} else {
  Write-Host 'LEN158_GATE_BLOCKED'
}
