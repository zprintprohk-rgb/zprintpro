# CF step1 with NEW token: verify + zone id + list ratelimit ruleset
$ErrorActionPreference = 'Stop'
$t = 'cfut_VgoDlOPUaUnY6EOKDtSmRjSWci2SKlBnKARgFUD9a028083d'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }
$base = 'https://api.cloudflare.com/client/v4'

$v = Invoke-RestMethod -Uri "$base/user/tokens/verify" -Headers $h -Method GET
Write-Host ("VERIFY: {0}" -f $v.result.status)

$z = Invoke-RestMethod -Uri "$base/zones?name=zprintpro.com" -Headers $h -Method GET
if ($z.result.Count -lt 1) { Write-Host 'ZONE: still not found — stop'; exit 2 }
$zid = $z.result[0].id
$zid | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_zone_id.txt" -Encoding ascii -NoNewline
Write-Host ("ZONE OK: {0} | id={1}" -f $z.result[0].name, $zid)

# ratelimit entrypoint ruleset
try {
  $rl = Invoke-RestMethod -Uri "$base/zones/$zid/rulesets/phases/http_ratelimit/entrypoint" -Headers $h -Method GET
  Write-Host ("RATELIMIT ruleset: id={0} rules={1}" -f $rl.result.id, $rl.result.rules.Count)
  $rl.result.rules | ConvertTo-Json -Depth 12 | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_rl_rules.json" -Encoding utf8
  foreach ($r in $rl.result.rules) {
    Write-Host ("  rule {0}: enabled={1}" -f $r.id, $r.enabled)
    Write-Host ("    expr: {0}" -f $r.expression)
    Write-Host ("    action: {0} | ratelimit: {1}" -f $r.action, ($r.ratelimit | ConvertTo-Json -Compress))
  }
} catch {
  Write-Host ("RATELIMIT read fail: {0}" -f $_.Exception.Message.Substring(0, [Math]::Min(160, $_.Exception.Message.Length)))
}
