# CF API step1b: list visible zones + accounts
$ErrorActionPreference = 'Stop'
$t = 'cfut_eWi5gFhvOegT33lAQEwvEQ1evW6nVsbAOtFPvoAV128ee76b'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }

$z = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/zones?per_page=50' -Headers $h -Method GET
Write-Host ("ZONES visible: {0}" -f $z.result.Count)
foreach ($x in $z.result) { Write-Host ("  - {0} | id={1} | status={2}" -f $x.name, $x.id, $x.status) }

try {
  $a = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/accounts?per_page=20' -Headers $h -Method GET
  Write-Host ("ACCOUNTS visible: {0}" -f $a.result.Count)
  foreach ($x in $a.result) { Write-Host ("  - {0} | id={1}" -f $x.name, $x.id) }
} catch {
  Write-Host ("ACCOUNTS: fail — {0}" -f $_.Exception.Message.Substring(0, [Math]::Min(100, $_.Exception.Message.Length)))
}
