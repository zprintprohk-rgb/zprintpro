# background push chain: wait out gate, push 2 local commits, verify, probe sitemap live
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 1800
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 420
  node scripts\verify-deploy.mjs
  node .hermes\_diag_sm.mjs
  Write-Host 'SM_PUSH_DONE'
} else {
  Write-Host 'SM_GATE_STILL_BLOCKED'
}
