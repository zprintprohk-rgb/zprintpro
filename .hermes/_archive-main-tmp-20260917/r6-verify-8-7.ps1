# R6 5 步 verify - 8/7 retrofit apparel
$slugs = @("zh-hk","en","ja")
$target = "apparel-shopping-bag-printing-guide"

Write-Output "=== R6 Step 0: check-runs API ==="
try {
    $runsJson = gh api "repos/zprintprohk-rgb/zprintpro/commits/2e28154/check-runs" -H "Accept: application/vnd.github+json" 2>$null
    if ($LASTEXITCODE -eq 0) {
        $runsObj = $runsJson | ConvertFrom-Json
        if ($runsObj.check_runs.Count -gt 0) {
            $run0 = $runsObj.check_runs[0]
            Write-Output "  Last check-run: $($run0.name) = $($run0.conclusion)"
        } else {
            Write-Output "  No check-runs found (CF Pages still building)"
        }
    } else {
        Write-Output "  gh API failed, skip"
    }
} catch {
    Write-Output "  gh API error, skip"
}

Write-Output ""
Write-Output "=== R6 Step 1: ahead/behind ==="
$ahead = (git rev-list --left-right --count origin_ssh/main...HEAD 2>$null).ToString().Trim()
Write-Output "  $ahead (should be 0 0)"

Write-Output ""
Write-Output "=== R6 Step 2: live URL HTTP 200 (3 locale) ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target/"
    $status = (curl.exe -sI $url | Select-Object -First 1).ToString().Trim()
    Write-Output "  [$loc] $url"
    Write-Output "    $status"
}

Write-Output ""
Write-Output "=== R6 Step 3: content 含 9 段结构 + Tailwind class ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target/"
    $body = (curl.exe -s $url)
    $summary = $body -match "(重點摘要|TL;DR|要約)"
    $callout = $body.Contains("bg-[#FFF8E6] border-l-4 border-[#F59E0B]")
    $cta = $body.Contains("bg-[#E0F2FE] border-l-4 border-[#1A56DB]")
    $author = $body -match "(作者團隊|Author Team|執筆チーム)"
    $sources = $body -match "(資料來源|Sources|資料ソース)"
    $disclaimer = $body -match "(免責聲明|Disclaimer|免責事項)"
    $faqCount = ([regex]::Matches($body, '<h3 class="text-lg font-bold text-\[#333333\] mt-4 mb-2">')).Count
    Write-Output "  [$loc] summary=$summary callout=$callout cta=$cta author=$author sources=$sources disclaimer=$disclaimer faqH3=$faqCount"
}

Write-Output ""
Write-Output "=== R6 Step 4: schema JSON-LD 存在 ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target/"
    $body = (curl.exe -s $url)
    $schemaCount = ([regex]::Matches($body, 'application/ld\+json')).Count
    Write-Output "  [$loc] schema count = $schemaCount"
}

Write-Output ""
Write-Output "=== R6 Step 5: sitemap mtime (今天) ==="
$today = Get-Date -Format "yyyy-MM-dd"
Get-ChildItem public/sitemap*.xml | ForEach-Object {
    $mtime = $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
    Write-Output "  $($_.Name) mtime=$mtime"
}

Write-Output ""
Write-Output "=== Done ==="
