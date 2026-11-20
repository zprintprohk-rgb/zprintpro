# background: wait gate -> push category-meta fix -> verify -> deterministic desc probe
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1700
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 420
  node scripts\verify-deploy.mjs
  node .hermes\_probe_det.mjs
  node .hermes\_probe_catmeta.mjs
  Write-Host 'CATMETA_PUSH_DONE'
} else {
  Write-Host 'CATMETA_GATE_BLOCKED'
}
