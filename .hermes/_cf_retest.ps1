# CF retest with @() array unwrap fix
$ErrorActionPreference = 'Stop'
$t = 'cfut_VgoDlOPUaUnY6EOKDtSmRjSWci2SKlBnKARgFUD9a028083d'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }
$base = 'https://api.cloudflare.com/client/v4'

$z = Invoke-RestMethod -Uri "$base/zones?name=zprintpro.com" -Headers $h -Method GET
$items = @($z.result)
Write-Host ("ZONES found: {0}" -f $items.Count)
foreach ($x in $items) { Write-Host ("  zone: {0} | id={1} | status={2}" -f $x.name, $x.id, $x.status) }
if ($items.Count -ge 1) {
  $items[0].id | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_zone_id.txt" -Encoding ascii -NoNewline
  Write-Host 'zone id cached'

  $zid = $items[0].id
  $rl = Invoke-RestMethod -Uri "$base/zones/$zid/rulesets/phases/http_ratelimit/entrypoint" -Headers $h -Method GET
  $rules = @($rl.result.rules)
  Write-Host ("RATELIMIT ruleset id={0} rules={1}" -f $rl.result.id, $rules.Count)
  $rl.result | ConvertTo-Json -Depth 12 | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_rl_ruleset.json" -Encoding utf8
  foreach ($r in $rules) {
    Write-Host ("  rule {0}: enabled={1} action={2}" -f $r.id, $r.enabled, $r.action)
    Write-Host ("    expr: {0}" -f $r.expression)
    Write-Host ("    ratelimit: {0}" -f ($r.ratelimit | ConvertTo-Json -Compress))
  }
}
