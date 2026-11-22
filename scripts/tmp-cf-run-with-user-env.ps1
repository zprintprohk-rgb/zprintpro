param([switch]$Apply)
$env:CF_API_TOKEN = [Environment]::GetEnvironmentVariable('CF_API_TOKEN','User')
if (-not $env:CF_API_TOKEN) { Write-Host "TOKEN_NOT_FOUND_IN_USER_SCOPE"; exit 2 }
Write-Host ("token loaded from User scope, length=" + $env:CF_API_TOKEN.Length)
if ($Apply) {
  & "F:\zprintpro-nextjs\scripts\cf-apply-ai-and-waf-20261121.ps1" -Apply
} else {
  & "F:\zprintpro-nextjs\scripts\cf-apply-ai-and-waf-20261121.ps1"
}
