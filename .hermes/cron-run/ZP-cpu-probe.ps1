# ZP-cpu-probe.ps1 - CF Workers CPU-limit abatement watcher (temp task, self-delete after 48h)
# Background: 2026-09-22 category-page staticisation shipped (commit 2e46b1f1).
# Each run: probe 11 representative URLs, log status/ms/bytes/cf-cache-status/marker to jsonl.
# On expiry: write SUMMARY row, then schtasks /delete self-cleanup (TTL rule).
# MUST stay pure ASCII: Windows PowerShell 5.1 parses this under schtasks (see AGENTS.md 0.35.5).
$ErrorActionPreference = 'Continue'
# PS 5.1 (.NET Framework) defaults to TLS1.0; zprintpro.com requires TLS1.2+ -> force it
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
$root = 'F:\zprintpro-nextjs'
$log = Join-Path $root '.hermes\logs\cpu-probe-2026-09-22.jsonl'
$expiryFile = Join-Path $root '.hermes\logs\cpu-probe-2026-09-22.expiry'
$lockFile = Join-Path $root '.hermes\logs\cpu-probe-2026-09-22.lock'
$taskName = 'ZP-cpu-probe-temp-20260922'
$now = Get-Date

# Mutex: only one probe instance at a time (session loop + K3 admin task may coexist)
# Stale lock (>15min) is treated as crash residue -> take over
if (Test-Path $lockFile) {
  $lockAge = (Get-Date) - (Get-Item $lockFile).LastWriteTime
  if ($lockAge.TotalMinutes -gt 15) { Remove-Item $lockFile -Force }
}
try {
  $lockStream = [System.IO.File]::Open($lockFile, [System.IO.FileMode]::CreateNew)
} catch {
  exit 0  # another instance is probing; skip this round silently
}

if (-not (Test-Path $expiryFile)) {
  (Get-Date).AddHours(48).ToString('o') | Set-Content $expiryFile -Encoding ASCII
}
$expiry = [datetime](Get-Content $expiryFile -Raw).Trim()
$isFinal = $now -ge $expiry

# category pages = the 39 URLs that went static in this fix; api/search stays dynamic by design
$targets = @(
  @{ u = 'https://zprintpro.com/zh-hk/category/packaging/';    m = 'food-boxes' },
  @{ u = 'https://zprintpro.com/en/category/packaging/';       m = 'food-boxes' },
  @{ u = 'https://zprintpro.com/ja/category/packaging/';       m = 'food-boxes' },
  @{ u = 'https://zprintpro.com/zh-hk/category/menus/';        m = 'pvc-menus' },
  @{ u = 'https://zprintpro.com/zh-hk/category/japan-doujin/'; m = 'can-badge' },
  @{ u = 'https://zprintpro.com/zh-hk/category/banners/';      m = 'outdoor-vinyl-banners' },
  @{ u = 'https://zprintpro.com/zh-hk/contact/';               m = 'WhatsApp' },
  @{ u = 'https://zprintpro.com/zh-hk/product/a2-posters/';    m = 'A2 ' },
  @{ u = 'https://zprintpro.com/zh-hk/';                       m = 'ZprintPro' },
  @{ u = 'https://zprintpro.com/api/search?q=sticker';         m = '' },
  @{ u = 'https://zprintpro.com/sitemap.xml';                  m = 'kraft-paper-bags' }
)

$rows = @()
$i = 0
foreach ($t in $targets) {
  # 串行 + 间隔 (AGENTS.md 0.23.2 三闸门: 突发请求会被边缘限流 -> 假 503, 每请求间隔 2.5s)
  if ($i -gt 0) { Start-Sleep -Milliseconds 2500 }
  $i++
  $sw = [Diagnostics.Stopwatch]::StartNew()
  $status = 0; $bytes = 0; $cf = ''; $ok = $false; $err = ''
  try {
    $resp = Invoke-WebRequest -Uri $t.u -UseBasicParsing -TimeoutSec 25
    $sw.Stop()
    $status = [int]$resp.StatusCode
    $bytes = $resp.RawContentLength
    $cf = $resp.Headers['cf-cache-status']
    if (-not $cf) { $cf = '' }
    if ($t.m) { $ok = $resp.Content.Contains($t.m) } else { $ok = $true }
  } catch {
    $sw.Stop()
    $resp = $null
    $status = 0
    $code = 0; $loc = ''
    if ($_.Exception.Response) {
      try { $code = [int]$_.Exception.Response.StatusCode } catch {}
      try { $loc = $_.Exception.Response.Headers['Location'] } catch {}
    }
    # PS5.1 .NET throws on 308 instead of following: follow Location once manually
    if ($code -eq 308 -and $loc) {
      if ($loc.StartsWith('/')) { $loc = 'https://zprintpro.com' + $loc }
      try {
        $resp = Invoke-WebRequest -Uri $loc -UseBasicParsing -TimeoutSec 25
        $status = [int]$resp.StatusCode
        $bytes = $resp.RawContentLength
        $cf = $resp.Headers['cf-cache-status']
        if (-not $cf) { $cf = '' }
        if ($t.m) { $ok = $resp.Content.Contains($t.m) } else { $ok = $true }
      } catch {
        $msg2 = ($_.Exception.Message -replace '\s+', ' ')
        if ($msg2.Length -gt 120) { $msg2 = $msg2.Substring(0, 120) }
        $err = '308-follow failed: ' + ($msg2 -replace '"', "'")
      }
    } else {
      $status = $code
      $msg = ($_.Exception.Message -replace '\s+', ' ')
      if ($msg.Length -gt 120) { $msg = $msg.Substring(0, 120) }
      $err = ($msg -replace '"', "'")
    }
  }
  $rows += [pscustomobject]@{
    t = $now.ToString('yyyy-MM-dd HH:mm')
    url = $t.u.Replace('https://zprintpro.com', '')
    status = $status
    ms = $sw.ElapsedMilliseconds
    bytes = $bytes
    cf = $cf
    ok = $ok
    err = $err
  }
}

$errCount = @($rows | Where-Object { $_.status -ne 200 }).Count
$avgMs = [int](($rows | Measure-Object ms -Average).Average)
$hitRatio = [math]::Round(((@($rows | Where-Object { $_.cf -eq 'HIT' }).Count) / $rows.Count) * 100)
$summary = [pscustomobject]@{
  t = $now.ToString('yyyy-MM-dd HH:mm')
  type = $(if ($isFinal) { 'FINAL' } else { 'probe' })
  errors = $errCount
  avgMs = $avgMs
  cacheHitPct = $hitRatio
  cf110x = @($rows | Where-Object { $_.status -ge 1100 }).Count
  note = 'cf110x=Workers resource-limit error count. avgMs/errors=primary signal. cacheHitPct stays 0 under next-on-pages (all HTML served by Pages worker as DYNAMIC) - informational only, not a failure signal. Authoritative abatement check = CF daily email to Zprintprohk@gmail.com'
}
New-Item -ItemType Directory -Force (Split-Path $log) | Out-Null
($summary | ConvertTo-Json -Compress) | Add-Content $log -Encoding UTF8
$rows | ForEach-Object { ($_ | ConvertTo-Json -Compress) | Add-Content $log -Encoding UTF8 }

if ($isFinal) {
  $all = Get-Content $log -Encoding UTF8 | Where-Object { $_ -match '"type"' } | ForEach-Object { $_ | ConvertFrom-Json }
  $first3 = @($all | Select-Object -First 3)
  $last3 = @($all | Select-Object -Last 3)
  $final = [pscustomobject]@{
    t = $now.ToString('yyyy-MM-dd HH:mm')
    type = 'SUMMARY'
    runs = $all.Count
    firstRun = $all[0].t
    lastRun = $all[-1].t
    avgErrorsPerRun = [math]::Round((($all | Measure-Object errors -Average).Average), 2)
    avgMsFirst3 = [int](($first3 | Measure-Object avgMs -Average).Average)
    avgMsLast3 = [int](($last3 | Measure-Object avgMs -Average).Average)
    cacheHitFirst3 = [int](($first3 | Measure-Object cacheHitPct -Average).Average)
    cacheHitLast3 = [int](($last3 | Measure-Object cacheHitPct -Average).Average)
  }
  ($final | ConvertTo-Json -Compress) | Add-Content $log -Encoding UTF8
  schtasks /delete /tn $taskName /f 2>&1 | Out-Null
}

# Release mutex
try {
  if ($lockStream) { $lockStream.Close() }
  Remove-Item $lockFile -Force -ErrorAction Stop
  Add-Content (Join-Path $root '.hermes\logs\cpu-probe-2026-09-22.lockdebug') ("released " + (Get-Date -Format 'HH:mm:ss')) -Encoding UTF8
} catch {
  Add-Content (Join-Path $root '.hermes\logs\cpu-probe-2026-09-22.lockdebug') ("RELEASE-ERR: " + $_.Exception.Message + " @ " + (Get-Date -Format 'HH:mm:ss')) -Encoding UTF8
}
