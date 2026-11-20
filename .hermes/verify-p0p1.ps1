# Poll deploy then verify P0/P1 batch (pure ASCII driver)
$ErrorActionPreference = 'SilentlyContinue'
$deadline = (Get-Date).AddMinutes(12)
$deployed = $false
while ((Get-Date) -lt $deadline) {
  try {
    $r = Invoke-WebRequest -Uri 'https://zprintpro.com/zh-hk/category/menus/' -UseBasicParsing -TimeoutSec 25
    if ($r.Content -match '/zh-hk/category/posters/') { $deployed = $true; break }
  } catch { }
  Start-Sleep -Seconds 45
}
Write-Output ("DEPLOYED: {0}" -f $deployed)
if (-not $deployed) { exit 1 }
Start-Sleep -Seconds 20
$probes = Get-Content -Raw -Encoding UTF8 -Path '.hermes\verify-p0p1.json' | ConvertFrom-Json
foreach ($p in $probes) {
  try {
    $r = Invoke-WebRequest -Uri $p.url -UseBasicParsing -TimeoutSec 30
    $hit = $r.Content -match [regex]::Escape($p.expect)
    $status = if ($r.StatusCode -eq 200 -and $hit) { 'PASS' } else { 'FAIL' }
    Write-Output ("{0}  {1}  expect=[{2}]  {3}" -f $status, $p.url, $p.expect, $p.note)
  } catch {
    Write-Output ("FAIL  {0}  ERROR: {1}" -f $p.url, $_.Exception.Message)
  }
}
