# Poll CF Pages deploy: wait until new business-cards page returns 200, then run probe suite.
$ErrorActionPreference = 'SilentlyContinue'
$deadline = (Get-Date).AddMinutes(12)
$deployed = $false
while ((Get-Date) -lt $deadline) {
  try {
    $r = Invoke-WebRequest -Uri 'https://zprintpro.com/zh-hk/services/business-cards-printing/' -UseBasicParsing -TimeoutSec 25
    if ($r.StatusCode -eq 200) { $deployed = $true; break }
  } catch { }
  Start-Sleep -Seconds 45
}
Write-Output ("DEPLOYED: {0}" -f $deployed)
if (-not $deployed) { Write-Output 'TIMEOUT waiting for deploy'; exit 1 }
Start-Sleep -Seconds 20
powershell -NoProfile -ExecutionPolicy Bypass -File '.hermes\verify-abd.ps1'
