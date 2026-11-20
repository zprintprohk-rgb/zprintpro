# CF debug: raw zones response
$ErrorActionPreference = 'Stop'
$t = 'cfut_VgoDlOPUaUnY6EOKDtSmRjSWci2SKlBnKARgFUD9a028083d'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }
$base = 'https://api.cloudflare.com/client/v4'

$r1 = Invoke-RestMethod -Uri "$base/zones?name=zprintpro.com" -Headers $h -Method GET
Write-Host ("RAW named: success={0} result_count={1} errors={2}" -f $r1.success, $r1.result_count, ($r1.errors | ConvertTo-Json -Compress))

$r2 = Invoke-RestMethod -Uri "$base/zones" -Headers $h -Method GET
Write-Host ("RAW all: success={0} result_count={1} errors={2}" -f $r2.success, $r2.result_count, ($r2.errors | ConvertTo-Json -Compress))
if ($r2.result_count -gt 0) { foreach ($x in $r2.result) { Write-Host ("  zone: {0} | {1} | {2}" -f $x.name, $x.id, $x.status) } }

# memberships fallback (may 403 without user perms)
try {
  $m = Invoke-RestMethod -Uri "$base/memberships" -Headers $h -Method GET
  Write-Host ("MEMBERSHIPS: {0}" -f $m.result.Count)
  foreach ($x in $m.result) { Write-Host ("  account: {0} | id={1} | status={2}" -f $x.account.name, $x.account.id, $x.status) }
} catch {
  Write-Host ("MEMBERSHIPS fail: {0}" -f $_.Exception.Message.Substring(0, [Math]::Min(120, $_.Exception.Message.Length)))
}
