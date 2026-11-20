# 2026-09-30 A/B/D batch live verification (pure ASCII; CJK data from verify-abd.json)
$ErrorActionPreference = 'SilentlyContinue'
$probes = Get-Content -Raw -Encoding UTF8 -Path '.hermes\verify-abd.json' | ConvertFrom-Json
foreach ($p in $probes) {
  try {
    $r = Invoke-WebRequest -Uri $p.url -UseBasicParsing -TimeoutSec 30
    $hasExpect = $r.Content -match [regex]::Escape($p.expect)
    $hasBad = ($p.bad -ne '') -and ($r.Content -match [regex]::Escape($p.bad))
    $status = if ($r.StatusCode -eq 200 -and $hasExpect -and -not $hasBad) { 'PASS' } else { 'FAIL' }
    Write-Output ("{0}  {1}  status={2} len={3}" -f $status, $p.url, $r.StatusCode, $r.Content.Length)
  } catch {
    Write-Output ("FAIL  {0}  ERROR: {1}" -f $p.url, $_.Exception.Message)
  }
}
try {
  $sm = (Invoke-WebRequest -Uri 'https://zprintpro.com/sitemap.xml' -UseBasicParsing -TimeoutSec 30).Content
  Write-Output ("sitemap has business-cards-printing: {0}" -f ($sm -match 'business-cards-printing'))
} catch { Write-Output ("sitemap ERROR: {0}" -f $_.Exception.Message) }
