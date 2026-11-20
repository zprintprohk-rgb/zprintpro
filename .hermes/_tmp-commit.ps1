$ErrorActionPreference = 'Continue'
Set-Location F:\zprintpro-nextjs
git commit -F .hermes/_commit-msg-menus-locale-20260920.txt -- src/data/sku-seo-data.ts
Write-Output "COMMIT_EXIT=$LASTEXITCODE"
Write-Output "=== STAGED AFTER COMMIT (verify add actually happened) ==="
git diff --cached --name-status
Write-Output "=== HEAD ==="
git log -1 --format='%h %cI %s'
Write-Output "=== working tree src ==="
git status --porcelain -- src/
