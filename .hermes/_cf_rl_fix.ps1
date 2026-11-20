# CF: modify ratelimit rule (bot exclusion + threshold 60) and PUT back
$ErrorActionPreference = 'Stop'
$t = 'cfut_VgoDlOPUaUnY6EOKDtSmRjSWci2SKlBnKARgFUD9a028083d'
$h = @{ Authorization = "Bearer $t"; 'Content-Type' = 'application/json' }
$base = 'https://api.cloudflare.com/client/v4'
$zid = (Get-Content "F:\zprintpro-nextjs\.hermes\_cf_zone_id.txt" -Raw).Trim()

$rl = Invoke-RestMethod -Uri "$base/zones/$zid/rulesets/phases/http_ratelimit/entrypoint" -Headers $h -Method GET
$rules = @($rl.result.rules)
$target = $rules | Where-Object { $_.id -eq 'bda7867077444fd08819ad1ba747ed18' }
if (-not $target) { Write-Host 'TARGET RULE NOT FOUND'; exit 2 }

$target.expression = '((http.request.uri.path contains "/category/") or (http.request.uri.path contains "/product/")) and not cf.client.bot'
$target.ratelimit.requests_per_period = 60
$target.description = 'rate-html-60-per-10s (category/product; verified bots excluded 2026-10-29 - GMC manual review fix; anti-AI-scrape retained for unverified bots)'

$body = @{ rules = $rules } | ConvertTo-Json -Depth 12
$body | Out-File -FilePath "F:\zprintpro-nextjs\.hermes\_cf_rl_put_body.json" -Encoding utf8
$put = Invoke-RestMethod -Uri "$base/zones/$zid/rulesets/phases/http_ratelimit/entrypoint" -Headers $h -Method PUT -Body $body
$nrules = @($put.result.rules)
Write-Host ("PUT success={0} | rules={1}" -f $put.success, $nrules.Count)
foreach ($r in $nrules) {
  Write-Host ("  rule {0}: enabled={1}" -f $r.id, $r.enabled)
  Write-Host ("    expr: {0}" -f $r.expression)
  Write-Host ("    ratelimit: {0}" -f ($r.ratelimit | ConvertTo-Json -Compress))
}
