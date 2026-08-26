# 5 步转化验证 - 8/7 retrofit apparel
$slugs = @("zh-hk","en","ja")
$target_slug = "apparel-shopping-bag-printing-guide"

Write-Output "=== Step 1: live URL HTTP 200 ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target_slug/"
    $status = (curl.exe -sI $url | Select-Object -First 1).ToString().Trim()
    Write-Output "  [$loc] $status"
}

Write-Output ""
Write-Output "=== Step 2: content 含 9 段结构 ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target_slug/"
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
Write-Output "=== Step 3: CTA 链接 (3 SKU + 1 quote) ==="
foreach ($loc in $slugs) {
    Write-Output "  [$loc]"
    $targets = @(
        "/$loc/product/kraft-paper-bags/",
        "/$loc/product/white-card-bags/",
        "/$loc/product/gift-bags/",
        "/$loc/quote/"
    )
    foreach ($t in $targets) {
        $url = "https://zprintpro.com$t"
        $status = (curl.exe -sI $url | Select-Object -First 1).ToString().Trim()
        $tag = if ($status -match "200") {"PASS"} else {"FAIL"}
        Write-Output "    [$tag] $url = $status"
    }
}

Write-Output ""
Write-Output "=== Step 4: schema JSON-LD 存在 ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target_slug/"
    $body = (curl.exe -s $url)
    $schemaCount = ([regex]::Matches($body, 'application/ld\+json')).Count
    $tag = if ($schemaCount -ge 1) {"PASS"} else {"FAIL"}
    Write-Output "  [$tag] [$loc] schema count = $schemaCount"
}

Write-Output ""
Write-Output "=== Step 5: 备选入口 (wa.me / mailto) ==="
foreach ($loc in $slugs) {
    $url = "https://zprintpro.com/$loc/blog/$target_slug/"
    $body = (curl.exe -s $url)
    $wa = $body -match "wa\.me"
    $mailto = $body -match "mailto:"
    Write-Output "  [$loc] wa.me=$wa mailto=$mailto"
}

Write-Output ""
Write-Output "=== Done ==="
