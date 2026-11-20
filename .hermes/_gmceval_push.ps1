# background: wait gate -> push evaluation doc -> verify
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 290
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 300
  node scripts\verify-deploy.mjs
  Write-Host 'GMCEVAL_PUSH_DONE'
} else {
  Write-Host 'GMCEVAL_GATE_BLOCKED'
}
