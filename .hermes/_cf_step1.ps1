# CF API step1: verify token + zone id (token never echoed)
$ErrorActionPreference = 'Stop'
$t = 'cfut_eWi5gFhvOegT33lAQEwvEQ1evW6nVsbAOtFPvoAV128ee76b'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }

$v = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/user/tokens/verify' -Headers $h -Method GET
Write-Host ("VERIFY: success={0} status={1}" -f $v.success, $v.result.status)

$z = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/zones?name=zprintpro.com' -Headers $h -Method GET
if ($z.result.Count -ge 1) {
  Write-Host ("ZONE: {0} | id={1} | status={2}" -f $z.result[0].name, $z.result[0].id, $z.result[0].status)
  $z.result[0].id | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_zone_id.txt" -Encoding ascii -NoNewline
  Write-Host 'zone id cached -> .hermes/_cf_zone_id.txt'
} else {
  Write-Host 'ZONE: NOT FOUND (token scope may lack this zone)'
}
