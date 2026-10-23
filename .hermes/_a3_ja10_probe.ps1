# A3 ja 10-page desc re-probe: 1 req/5s, 3 rounds, validates 200 + desc<=158c in head
$pages = @(
  @{slug='banners';       l='ja'},
  @{slug='books';         l='ja'},
  @{slug='calendars';     l='ja'},
  @{slug='educational';   l='ja'},
  @{slug='envelopes';     l='ja'},
  @{slug='flyers';        l='ja'},
  @{slug='greeting-cards';l='ja'},
  @{slug='japan-doujin';  l='ja'},
  @{slug='menus';         l='ja'},
  @{slug='packaging';     l='ja'}
)
$out = @()
foreach ($round in 1..3) {
  foreach ($p in $pages) {
    $url = "https://zprintpro.com/$($p.l)/category/$($p.slug)/"
    try {
      $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 -UserAgent "Mozilla/5.0 Chrome/120"
      $html = $r.Content
      $m = [regex]::Match($html, '<meta name="description" content="([^"]*)"')
      $len = if ($m.Success) { $m.Groups[1].Value.Length } else { -1 }
      $out += [PSCustomObject]@{ round=$round; loc=$p.l; slug=$p.slug; status=[int]$r.StatusCode; desc_len=$len }
    } catch {
      $sc = 0; try { $sc = [int]$_.Exception.Response.StatusCode } catch {}
      $out += [PSCustomObject]@{ round=$round; loc=$p.l; slug=$p.slug; status=$sc; desc_len=-1 }
    }
    Start-Sleep -Seconds 5
  }
}
$out | ConvertTo-Json | Set-Content -Path "F:\zprintpro-nextjs\.hermes\logs\cat-desc-ja10-probe-2026-10-23.json" -Encoding UTF8
$out | Format-Table -AutoSize
