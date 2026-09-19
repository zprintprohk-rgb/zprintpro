# .hermes/cron-run/_check-deploy.ps1
# 2026-09-19: wait for the Cloudflare Pages build of the just-pushed commit, then report.
# Used after a push to satisfy AGENTS.md section 12 ("push 成功 != deploy 成功").
param(
  [string]$LogFile = '.hermes\logs\2026-09-19-deploy-verify.log',
  [int]$MaxAttempts = 10,
  [int]$SleepSeconds = 60
)
$repo = 'F:\zprintpro-nextjs'
Set-Location $repo
function Log([string]$m) { ("[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $m) | Add-Content -Path (Join-Path $repo $LogFile) -Encoding UTF8 }

Log "deploy verify start (max $MaxAttempts attempts x ${SleepSeconds}s)"
for ($i = 1; $i -le $MaxAttempts; $i++) {
  $out = node scripts/verify-deploy.mjs 2>&1 | Select-Object -Last 5
  $txt = ($out -join ' ')
  Log ("attempt $i : $txt")
  if ($txt -match 'CF Pages:\s*success') { Log "RESULT=DEPLOY_SUCCESS"; exit 0 }
  if ($txt -match 'CF Pages:\s*failure') { Log "RESULT=DEPLOY_FAILURE (立刻修 build 错, 不能算完成)"; exit 1 }
  if ($i -lt $MaxAttempts) { Start-Sleep -Seconds $SleepSeconds }
}
Log "RESULT=DEPLOY_TIMEOUT (仍在 build, 下轮再看)"
exit 2
