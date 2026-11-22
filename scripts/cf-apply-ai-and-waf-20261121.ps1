# cf-apply-ai-and-waf-20261121.ps1
# ZprintPro Cloudflare AI-allow + anti-scraper WAF automation (2026-11-21)
# Pure ASCII only (PS 5.1 GBK safety rule).
#
# What it does:
#   1. Resolve zone id for zprintpro.com
#   2. Backup current bot_management + WAF custom rules + rate limit rules to backup dir
#   3. Print current vs desired diff (read-only by default)
#   4. With -Apply: set fight_mode=false, ai_bots_protection="disabled",
#      upsert 2 WAF custom rules (verified-search skip + scraper UA managed challenge),
#      optional rate limit rule
#   5. Verify: GPTBot/Googlebot expect 200, python-requests expect 403/challenge,
#      robots.txt must not contain Cloudflare managed Disallow injection
#   6. Write apply-result.json into backup dir
#
# Prereq (ONE manual step, ~3 min):
#   dash.cloudflare.com -> My Profile -> API Tokens -> Create Custom Token:
#     Zone.Zone = Read, Zone.Bot Management = Edit, Zone.Zone WAF = Edit
#     Zone Resources = Include / Specific zone / zprintpro.com
#   Then in the SAME shell session:  $env:CF_API_TOKEN = "<token>"
#   NEVER write the token into any repo file (secret-leak guard).
#
# Usage:
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\cf-apply-ai-and-waf-20261121.ps1
#   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\cf-apply-ai-and-waf-20261121.ps1 -Apply

param(
  [switch]$Apply,
  [string]$BackupDir = "F:\zprintpro-nextjs\.hermes\backups\cf-ai-waf-20261121",
  [string]$ZoneName = "zprintpro.com"
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

if (-not $env:CF_API_TOKEN) {
  Write-Host "ERROR: CF_API_TOKEN env var not set. See header comments for token recipe." -ForegroundColor Red
  exit 2
}

$Headers = @{ Authorization = "Bearer $env:CF_API_TOKEN"; "Content-Type" = "application/json" }
$Api = "https://api.cloudflare.com/client/v4"
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

function CfGet($path) {
  return Invoke-RestMethod -Method Get -Uri "$Api$path" -Headers $Headers
}
function CfPut($path, $bodyObj) {
  $json = $bodyObj | ConvertTo-Json -Depth 20 -Compress
  return Invoke-RestMethod -Method Put -Uri "$Api$path" -Headers $Headers -Body ([Text.Encoding]::UTF8.GetBytes($json))
}

Write-Host "== 1. Resolve zone =="
$zoneResp = CfGet "/zones?name=$ZoneName"
if ($zoneResp.result.Count -lt 1) { Write-Host "ERROR: zone not found or token lacks Zone.Read"; exit 2 }
$ZoneId = $zoneResp.result[0].id
Write-Host "zone_id = $ZoneId"

Write-Host "== 2. Backup current config =="
$bm = CfGet "/zones/$ZoneId/bot_management"
$custom = CfGet "/zones/$ZoneId/rulesets/phases/http_request_firewall_custom/entrypoint"
$rl = $null
try { $rl = CfGet "/zones/$ZoneId/rulesets/phases/http_ratelimit/entrypoint" } catch { Write-Host "(rate limit phase empty or not permitted - ok)" }
$bm | ConvertTo-Json -Depth 20 | Out-File -Encoding ascii "$BackupDir\bot_management.before.json"
$custom | ConvertTo-Json -Depth 20 | Out-File -Encoding ascii "$BackupDir\waf-custom.before.json"
if ($rl) { $rl | ConvertTo-Json -Depth 20 | Out-File -Encoding ascii "$BackupDir\ratelimit.before.json" }
Write-Host "backup saved to $BackupDir"

Write-Host "== 3. Current vs desired =="
$b = $bm.result
$rows = @(
  [pscustomobject]@{ Field = "fight_mode (Bot Fight Mode)"; Current = $b.fight_mode; Desired = "False (OFF - free plan cannot be skipped)" },
  [pscustomobject]@{ Field = "ai_bots_protection (legacy Block AI bots)"; Current = $b.ai_bots_protection; Desired = "disabled (allow at edge)" },
  [pscustomobject]@{ Field = "ai_search"; Current = $b.ai_search; Desired = "(report only - keep current)" },
  [pscustomobject]@{ Field = "ai_training"; Current = $b.ai_training; Desired = "(report only - K3 policy)" },
  [pscustomobject]@{ Field = "ai_user"; Current = $b.ai_user; Desired = "(report only)" },
  [pscustomobject]@{ Field = "bot_preference_sync_enabled (robots.txt injection)"; Current = $b.bot_preference_sync_enabled; Desired = "verify served robots.txt below" },
  [pscustomobject]@{ Field = "crawler_protection (AI Labyrinth)"; Current = $b.crawler_protection; Desired = "(report only - do not enable against allowed AI)" }
)
$rows | Format-Table -AutoSize | Out-String | Write-Host

$RuleSkipDesc = "ZP 2026-11-21 Allow verified search crawlers (skip remaining custom rules)"
$RuleChallengeDesc = "ZP 2026-11-21 Challenge scraper UAs (AI crawlers + /api/ + WhatsApp exempt)"
$SkipExpr = '(cf.verified_bot_category eq "Search Engine Crawler")'
$ChallengeExpr = '(not cf.client.bot and not cf.verified_bot_category in {"Search Engine Crawler" "AI Crawler"} and not http.request.uri.path contains "/api/" and (http.user_agent contains "scrapy" or http.user_agent contains "python-requests" or http.user_agent contains "python-urllib" or http.user_agent contains "Go-http-client" or http.user_agent contains "curl/" or http.user_agent contains "Wget" or http.user_agent contains "HTTrack" or http.user_agent contains "SiteSucker" or http.user_agent contains "bot" and not http.user_agent contains "WhatsApp"))'

$existingRules = @()
if ($custom.result -and $custom.result.rules) { $existingRules = $custom.result.rules }
Write-Host ("existing custom rules: " + $existingRules.Count)
$existingRules | ForEach-Object { Write-Host ("  - " + $_.description + " [" + $_.action + "]") }

if (-not $Apply) {
  Write-Host "`nREAD-ONLY mode. Re-run with -Apply to enforce:" -ForegroundColor Yellow
  Write-Host "  fight_mode=false, ai_bots_protection=disabled"
  Write-Host "  rule 1 skip: $SkipExpr"
  Write-Host "  rule 2 challenge: $ChallengeExpr"
  exit 0
}

Write-Host "== 4. Apply bot_management =="
$bmApply = CfPut "/zones/$ZoneId/bot_management" @{ fight_mode = $false; ai_bots_protection = "disabled" }
Write-Host ("bot_management success=" + $bmApply.success + " fight_mode=" + $bmApply.result.fight_mode + " ai_bots_protection=" + $bmApply.result.ai_bots_protection)

Write-Host "== 5. Upsert 2 WAF custom rules (idempotent by description) =="
$kept = @($existingRules | Where-Object { $_.description -ne $RuleSkipDesc -and $_.description -ne $RuleChallengeDesc })
$rule1 = [pscustomobject]@{
  action = "skip"
  action_parameters = @{ ruleset = "current" }
  expression = $SkipExpr
  description = $RuleSkipDesc
  enabled = $true
}
$rule2 = [pscustomobject]@{
  action = "managed_challenge"
  expression = $ChallengeExpr
  description = $RuleChallengeDesc
  enabled = $true
}
$newRules = @($rule1) + @($rule2) + $kept
$wafApply = CfPut "/zones/$ZoneId/rulesets/phases/http_request_firewall_custom/entrypoint" @{ rules = $newRules }
Write-Host ("waf custom success=" + $wafApply.success + " total_rules=" + $wafApply.result.rules.Count)

Write-Host "== 6. Verify (live edge) =="
Start-Sleep -Seconds 10
$uaTests = @(
  @{ Name = "GPTBot(expect 200)"; UA = "Mozilla/5.0 (compatible; GPTBot/1.0)" },
  @{ Name = "Googlebot(expect 200)"; UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  @{ Name = "python-requests(expect 403/challenge)"; UA = "python-requests/2.31.0" }
)
$verify = @()
foreach ($t in $uaTests) {
  $code = & curl.exe -s -o NUL -w "%{http_code}" -A $t.UA "https://zprintpro.com/zh-hk/"
  Write-Host ("  " + $t.Name + " -> HTTP " + $code)
  $verify += [pscustomobject]@{ test = $t.Name; http = $code }
}
$robots = & curl.exe -s "https://zprintpro.com/robots.txt"
$injected = ($robots -match "Cloudflare Managed content")
Write-Host ("  robots.txt Cloudflare-injection present: " + $injected + " (expect False)")

$result = [pscustomobject]@{
  ts = (Get-Date).ToString("s")
  zone_id = $ZoneId
  applied = $true
  fight_mode = $bmApply.result.fight_mode
  ai_bots_protection = $bmApply.result.ai_bots_protection
  waf_rules_total = $wafApply.result.rules.Count
  verify = $verify
  robots_txt_injection = $injected
}
$result | ConvertTo-Json -Depth 10 | Out-File -Encoding ascii "$BackupDir\apply-result.json"
Write-Host "`nDONE. apply-result.json -> $BackupDir\apply-result.json" -ForegroundColor Green
Write-Host "Next: DMCA pack per execution sheet section 3 (manual, 2 channels)."
