# background push chain: wait out the 30min gate, then push + verify + probe (§0.25.8 async pattern)
Set-Location F:\zprintpro-nextjs
Start-Sleep -Seconds 800
node scripts\push-gate-check.mjs origin_ssh
if ($LASTEXITCODE -eq 0) {
  git push origin_ssh main 2>&1 | Select-Object -Last 1
  Start-Sleep -Seconds 300
  node scripts\verify-deploy.mjs
  $z = (Invoke-WebRequest -Uri 'https://zprintpro.com/zh-hk/blog/eco-printing/' -UseBasicParsing -TimeoutSec 30).Content
  Write-Host ('ZH_ECO_LINK=' + ($z.Contains('/zh-hk/product/food-boxes/')))
  $m = (Invoke-WebRequest -Uri 'https://zprintpro.com/zh-hk/blog/restaurant-menu-printing-guide/' -UseBasicParsing -TimeoutSec 30).Content
  Write-Host ('ZH_MENU_LINK=' + ($m.Contains('/zh-hk/product/food-boxes/')))
  Write-Host 'BATCH2_PUSH_DONE'
} else {
  Write-Host 'BATCH2_GATE_STILL_BLOCKED'
}
