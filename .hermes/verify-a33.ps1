param([string]$Data = ".hermes\verify-a33.json")
$ErrorActionPreference = "Continue"
$cfg = Get-Content -Raw -Encoding UTF8 $Data | ConvertFrom-Json
$results = @()
foreach ($u in $cfg.urls) {
  try {
    $r = Invoke-WebRequest -Uri $u.url -UseBasicParsing -TimeoutSec 40
    $html = $r.Content
    $title = ""
    if ($html -match '(?s)<title>(.*?)</title>') { $title = $Matches[1].Trim() }
    $h1 = ""
    if ($html -match '(?s)<h1[^>]*>(.*?)</h1>') { $h1 = ($Matches[1] -replace '<[^>]+>','').Trim() }
    $ok = $true; $miss = @(); $bad = @()
    foreach ($m in $u.must) { if ($html -notmatch [regex]::Escape($m)) { $ok=$false; $miss += $m } }
    foreach ($n in $u.not) { if ($html -match [regex]::Escape($n)) { $ok=$false; $bad += $n } }
    $results += [pscustomobject]@{ name=$u.name; ok=$ok; status=[int]$r.StatusCode; title=$title; h1=$h1; missing=($miss -join ","); forbidden=($bad -join ",") }
  } catch {
    $results += [pscustomobject]@{ name=$u.name; ok=$false; status=0; title="ERR"; h1=""; missing=$_.Exception.Message; forbidden="" }
  }
}
$results | ConvertTo-Json -Depth 4
