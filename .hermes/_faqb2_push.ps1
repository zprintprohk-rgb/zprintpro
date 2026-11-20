# background: wait gate -> push FAQ batch2 -> verify -> probe
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1080
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 360
  node scripts\verify-deploy.mjs
  node .hermes\_probe_faqb2.mjs
  Write-Host 'FAQB2_PUSH_DONE'
} else {
  Write-Host 'FAQB2_GATE_BLOCKED'
}
