# A-prime integrity probe (file script per §0.26.9 — no inline quoting)
$ErrorActionPreference = 'Stop'
$z = (Invoke-WebRequest -Uri 'https://zprintpro.com/zh-hk/category/packaging/' -UseBasicParsing -TimeoutSec 30).Content
$e = (Invoke-WebRequest -Uri 'https://zprintpro.com/en/category/packaging/' -UseBasicParsing -TimeoutSec 30).Content
$j = (Invoke-WebRequest -Uri 'https://zprintpro.com/ja/category/packaging/' -UseBasicParsing -TimeoutSec 30).Content
Write-Host ('ZH_WUDU_GONE='    + (-not $z.Contains('無毒')))
Write-Host ('ZH_SGS_KEPT='     + $z.Contains('SGS'))
Write-Host ('ZH_ECO_OPTION='   + $z.Contains('環保油墨選項'))
Write-Host ('EN_NOTOXIC_GONE=' + (-not $e.Contains('non-toxic soy')))
Write-Host ('EN_3DAY_GONE='    + (-not $e.Contains('3-Day Delivery')))
Write-Host ('EN_12SERIES='     + $e.Contains('12 professional series'))
Write-Host ('JA_WUDU_GONE='    + (-not $j.Contains('無毒')))
Write-Host ('JA_3DAY_GONE='    + (-not $j.Contains('3日納品')))
Write-Host ('JA_MOQ100='       + $j.Contains('全箱型100個から'))
