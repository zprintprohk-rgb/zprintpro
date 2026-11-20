# background: wait gate -> push render-layer fix -> verify -> packaging category re-probe
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1680
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 330
  node scripts\verify-deploy.mjs
  node .hermes\_probe_pkgfaq.mjs
  Write-Host 'RENDER_PUSH_DONE'
} else {
  Write-Host 'RENDER_GATE_BLOCKED'
}
