# A3 tail: slow re-probe of 17 category pages (en 7 + ja 10), 3 rounds, 3s interval
$targets = @(
  @{loc='en'; cat='packaging'}, @{loc='en'; cat='paper-bags'}, @{loc='en'; cat='place-cards'},
  @{loc='en'; cat='posters'}, @{loc='en'; cat='red-packets'}, @{loc='en'; cat='stickers'},
  @{loc='en'; cat='wedding-invitations'},
  @{loc='ja'; cat='banners'}, @{loc='ja'; cat='books'}, @{loc='ja'; cat='calendars'},
  @{loc='ja'; cat='educational'}, @{loc='ja'; cat='envelopes'}, @{loc='ja'; cat='flyers'},
  @{loc='ja'; cat='greeting-cards'}, @{loc='ja'; cat='japan-doujin'}, @{loc='ja'; cat='menus'},
  @{loc='ja'; cat='packaging'}
)
$results = @()
foreach ($t in $targets) {
  $url = "https://zprintpro.com/$($t.loc)/category/$($t.cat)/"
  $desc = 0; $statuses = @(); $len = -1
  foreach ($round in 1..3) {
    try {
      $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120"
      $statuses += [int]$r.StatusCode
      $m = [regex]::Match($r.Content, '<meta name="description" content="([^"]*)"')
      if ($m.Success) { $desc++; if ($len -lt 0) { $len = $m.Groups[1].Value.Length } }
    } catch {
      $c = if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { 0 }
      $statuses += $c
    }
    Start-Sleep -Seconds 3
  }
  $results += [PSCustomObject]@{ loc=$t.loc; cat=$t.cat; s=($statuses -join '/'); desc=$desc; len=$len }
}
$out = $results | ConvertTo-Json -Depth 3
Set-Content -Path "F:\zprintpro-nextjs\.hermes\logs\cat-desc-tail-probe-2026-10-23.json" -Value $out -Encoding UTF8
$results | Format-Table -AutoSize
$bad = $results | Where-Object { $_.desc -lt 3 }
Write-Host ("TAIL_BAD: " + $bad.Count + "/" + $results.Count)
