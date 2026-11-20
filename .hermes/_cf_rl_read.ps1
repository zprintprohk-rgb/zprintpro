# CF: read ratelimit ruleset by zone id
$ErrorActionPreference = 'Stop'
$t = 'cfut_VgoDlOPUaUnY6EOKDtSmRjSWci2SKlBnKARgFUD9a028083d'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }
$base = 'https://api.cloudflare.com/client/v4'
$zidFile = "F:\zprintpro-nextjs\.hermes\_cf_zone_id.txt"
$zid = if (Test-Path $zidFile) { (Get-Content $zidFile -Raw).Trim() } else { '' }
if (-not $zid) { $zid = '225b44dbbbc31d6cd4bc3ce8b8540f12' }
$zid | Out-File -FilePath $zidFile -Encoding ascii -NoNewline

$rl = Invoke-RestMethod -Uri "$base/zones/$zid/rulesets/phases/http_ratelimit/entrypoint" -Headers $h -Method GET
$rules = @($rl.result.rules)
Write-Host ("RATELIMIT ruleset id={0} | rules={1}" -f $rl.result.id, $rules.Count)
$rl.result | ConvertTo-Json -Depth 12 | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_rl_ruleset.json" -Encoding utf8
foreach ($r in $rules) {
  Write-Host ("  rule {0}: enabled={1} action={2}" -f $r.id, $r.enabled, $r.action)
  Write-Host ("    desc: {0}" -f $r.description)
  Write-Host ("    expr: {0}" -f $r.expression)
  Write-Host ("    ratelimit: {0}" -f ($r.ratelimit | ConvertTo-Json -Compress))
}
