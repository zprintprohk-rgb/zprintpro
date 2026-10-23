# B1 post-deploy verifier: wait for CF build then probe 5 new money-FAQ SKUs
$ErrorActionPreference = 'Continue'
$needle = 'HK$85-300 band by size and material'
$deadline = (Get-Date).AddMinutes(14)
$deployed = $false
while ((Get-Date) -lt $deadline) {
  try {
    $r = Invoke-WebRequest -Uri "https://zprintpro.com/en/product/roll-up-banners/" -UseBasicParsing -TimeoutSec 25 -UserAgent "Mozilla/5.0 Chrome/120"
    if ($r.Content.Contains($needle)) { $deployed = $true; break }
  } catch {}
  Start-Sleep -Seconds 60
}
$res = @()
if ($deployed) {
  $checks = @(
    @{u='https://zprintpro.com/en/product/roll-up-banners/'; p='HK$85-300 band by size and material'},
    @{u='https://zprintpro.com/en/product/exercise-books/'; p='HK$4-16 band by quantity and pages'},
    @{u='https://zprintpro.com/en/product/foil-greeting-cards/'; p='HK$180-320 per 100 pcs'},
    @{u='https://zprintpro.com/en/product/business-envelopes/'; p='HK$0.22-1.80/pc'},
    @{u='https://zprintpro.com/en/product/perfect-bound-books/'; p='HK$16-80 band by size and page count'}
  )
  foreach ($c in $checks) {
    try { $r = Invoke-WebRequest -Uri $c.u -UseBasicParsing -TimeoutSec 25 -UserAgent "Mozilla/5.0 Chrome/120"; $res += [PSCustomObject]@{ url=$c.u; render=$r.Content.Contains($c.p) } } catch { $res += [PSCustomObject]@{ url=$c.u; render='FAIL' } }
    Start-Sleep -Seconds 4
  }
}
$res | ConvertTo-Json | Set-Content -Path "F:\zprintpro-nextjs\.hermes\logs\b1-live-verify-2026-10-23.json" -Encoding UTF8
$res | Format-Table -AutoSize
Write-Host ("DEPLOYED: " + $deployed)
