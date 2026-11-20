# Poll live sitemap until business-cards-printing appears (pure ASCII)
$ErrorActionPreference = 'SilentlyContinue'
$deadline = (Get-Date).AddMinutes(10)
$ok = $false
while ((Get-Date) -lt $deadline) {
  try {
    $sm = (Invoke-WebRequest -Uri 'https://zprintpro.com/sitemap-zh-hk.xml' -UseBasicParsing -TimeoutSec 25).Content
    if ($sm -match 'business-cards-printing') { $ok = $true; break }
  } catch { }
  Start-Sleep -Seconds 45
}
Write-Output ("SITEMAP LIVE: {0}" -f $ok)
if ($ok) {
  Write-Output ("zh-hk urlcount: {0}" -f ([regex]::Matches($sm, '<url>')).Count)
}
