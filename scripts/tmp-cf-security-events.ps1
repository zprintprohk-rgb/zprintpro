$env:CF_API_TOKEN = [Environment]::GetEnvironmentVariable('CF_API_TOKEN','User')
if (-not $env:CF_API_TOKEN) { Write-Host "NO_TOKEN"; exit 2 }
$H = @{ Authorization = "Bearer $env:CF_API_TOKEN"; "Content-Type" = "application/json" }
$ZoneId = "225b44dbbbc31d6cd4bc3ce8b8540f12"
$since = (Get-Date).ToUniversalTime().AddDays(-2).ToString("yyyy-MM-ddTHH:mm:ssZ")
try {
  $r = Invoke-RestMethod -Method Get -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/security/events?since=$since&per_page=50" -Headers $H
  $r.result | ForEach-Object {
    [pscustomobject]@{
      time = $_.occurred_at
      action = $_.action
      ua = ($_.userAgent -replace "\s+"," ").Substring(0, [Math]::Min(60, $_.userAgent.Length))
      asn = $_.clientASNDescription
      path = $_.clientRequestURI
      rule = $_.description
    }
  } | Format-Table -AutoSize | Out-String -Width 250 | Write-Host
  Write-Host ("total_returned=" + $r.result.Count)
} catch {
  Write-Host ("SECURITY_EVENTS_ERROR: " + $_.Exception.Message)
}
