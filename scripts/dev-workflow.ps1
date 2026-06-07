#!/usr/bin/env pwsh
# ==============================================
# ZprintPro Quality Gate Script
# ==============================================
# Usage: powershell -File scripts/dev-workflow.ps1
# Exit: 0 = pass / 1 = fail
# Owner: opc-architecture-chief

[CmdletBinding()]
param(
    [switch]$SkipBuild,
    [switch]$SkipTsc,
    [switch]$ShowFullOutput
)

$ErrorActionPreference = 'Continue'

# Switch to project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

$tscLog = Join-Path $env:TEMP "zprintpro-tsc.log"
$buildLog = Join-Path $env:TEMP "zprintpro-build.log"
$tscExit = 0
$buildExit = 0

# ============ Output helpers ============
function Header($text) {
    Write-Host ""
    Write-Host "==== $text ====" -ForegroundColor Cyan
}
function Green($text)   { Write-Host "  [OK] $text" -ForegroundColor Green }
function Red($text)     { Write-Host "  [FAIL] $text" -ForegroundColor Red }
function Yellow($text)  { Write-Host "  [WARN] $text" -ForegroundColor Yellow }

# ============ Step 1: Git Status ============
Header "Step 1/5: Git Status"
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host $gitStatus
} else {
    Green "Working tree clean"
}

# ============ Step 2: TypeScript Check ============
if (-not $SkipTsc) {
    Header "Step 2/5: TypeScript Check (npx tsc --noEmit)"

    $tscOutput = npx tsc --noEmit 2>&1 | Out-String
    [System.IO.File]::WriteAllText($tscLog, $tscOutput, [System.Text.Encoding]::UTF8)
    $tscExit = $LASTEXITCODE

    if ($tscExit -eq 0) {
        Green "TypeScript passed (0 errors)"
    } else {
        Red "TypeScript failed (exit code: $tscExit)"
        if ($ShowFullOutput) {
            Write-Host $tscOutput
        }
    }
} else {
    Header "Step 2/5: TypeScript Check [SKIPPED]"
}

# ============ Step 3: Next.js Build ============
if (-not $SkipBuild) {
    Header "Step 3/5: Next.js Build (npm run build)"

    # Use `npm run build` (next build + sitemap) instead of `build:cf`
    # because `build:cf` uses `rm -rf` (Unix only) and `npx @cloudflare/next-on-pages`
    # CF Pages adapter is only needed at deploy time, not dev verification.
    $buildOutput = npm run build 2>&1 | Out-String
    [System.IO.File]::WriteAllText($buildLog, $buildOutput, [System.Text.Encoding]::UTF8)
    $buildExit = $LASTEXITCODE

    if ($buildExit -eq 0) {
        Green "Build passed"
    } else {
        Red "Build failed (exit code: $buildExit)"
    }

    # Always show last 30 lines of build output
    Write-Host ""
    Write-Host "  --- Build tail (last 30 lines) ---" -ForegroundColor DarkGray
    $buildOutput -split "`n" | Select-Object -Last 30 | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray }
} else {
    Header "Step 3/5: Build [SKIPPED]"
}

# ============ Step 4: Grep Errors ============
Header "Step 4/5: Grep Error Keywords"

$tscErrors = @()
$buildErrors = @()
$warnings = @()

if (Test-Path $tscLog) {
    $tscErrors = Select-String -Path $tscLog -Pattern "error TS\d+|\[Error\]" -ErrorAction SilentlyContinue
}
if (Test-Path $buildLog) {
    $buildErrors = Select-String -Path $buildLog -Pattern "Failed to compile|Module not found|SyntaxError|Build error|Cannot find module|Type error" -ErrorAction SilentlyContinue
    $warnings = Select-String -Path $buildLog -Pattern "warn |Warning:" -ErrorAction SilentlyContinue
}

Write-Host "  TypeScript errors:" -ForegroundColor Yellow
if ($tscErrors) {
    $tscErrors | Select-Object -First 20 | ForEach-Object {
        Write-Host "    L$($_.LineNumber): $($_.Line.Trim())" -ForegroundColor Red
    }
} else {
    Green "No TS errors"
}

Write-Host ""
Write-Host "  Build errors:" -ForegroundColor Yellow
if ($buildErrors) {
    $buildErrors | Select-Object -First 20 | ForEach-Object {
        Write-Host "    L$($_.LineNumber): $($_.Line.Trim())" -ForegroundColor Red
    }
} else {
    Green "No build errors"
}

Write-Host ""
Write-Host "  Warnings (review needed):" -ForegroundColor Yellow
if ($warnings) {
    $warnings | Select-Object -First 10 | ForEach-Object {
        Write-Host "    L$($_.LineNumber): $($_.Line.Trim())"
    }
} else {
    Green "No warnings"
}

# ============ Step 4.5: Browser Cache Audit (高频迭代期保护) ============
Write-Host ""
Write-Host "  Service Worker / Browser Cache:" -ForegroundColor Yellow
$swHits = @()
if (Test-Path "src") {
    $swHits = @(Get-ChildItem "src" -Recurse -Include "*.ts","*.tsx","*.js","*.jsx" -ErrorAction SilentlyContinue |
        Select-String -Pattern "serviceWorker\.register" -ErrorAction SilentlyContinue)
}
$swFiles = @()
if (Test-Path "public") {
    $swFiles = @(Get-ChildItem "public" -Include "sw.js","service-worker.js","serviceWorker.js" -ErrorAction SilentlyContinue)
}

# ============ Step 4.5: Untracked File Reference Check ============
Write-Host ""
Write-Host "  Untracked File Reference Check:" -ForegroundColor Yellow

$untrackedTsx = @(git ls-files --others --exclude-standard -- "src/**/*.ts" "src/**/*.tsx" 2>&1)
if ($untrackedTsx.Count -gt 0) {
    Red "Found $($untrackedTsx.Count) untracked .ts/.tsx file(s) in src/ - will cause CF Pages build to FAIL"
    $untrackedTsx | ForEach-Object {
        Write-Host "    ? $_" -ForegroundColor Red
    }
    Write-Host "    [FIX] Run: git add src/**/*.ts src/**/*.tsx" -ForegroundColor Yellow
} else {
    Green "All src/ .ts/.tsx files are tracked by git (CF Pages build-safe)"
}
if ($swHits -or $swFiles) {
    Red "Service Worker detected - browser will cache stale error pages during high-frequency deploys"
    $swHits | Select-Object -First 5 | ForEach-Object {
        Write-Host "    $($_.Path):$($_.LineNumber): $($_.Line.Trim())" -ForegroundColor Red
    }
    $swFiles | ForEach-Object {
        Write-Host "    public/$($_.Name) ($($_.Length) bytes)" -ForegroundColor Red
    }
    Write-Host "    [FIX] Replace layout.tsx serviceWorker.register" -ForegroundColor Yellow
    Write-Host "          with inline unregister and caches.delete" -ForegroundColor Yellow
    Write-Host "          Also delete public/sw.js" -ForegroundColor Yellow
} else {
    Green "No Service Worker (browser will not cache stale pages)"
}

# ============ Step 4.6: Quote Engine Boundary Tests ============
Write-Host ""
Write-Host "  Quote Engine Boundary Tests:" -ForegroundColor Yellow

$engineFile = "src/lib/quote-engine/core.ts"
$formulaFile = "src/lib/quote-engine/formulas/business-cards.ts"

if ((Test-Path $engineFile) -and (Test-Path $formulaFile)) {
    # 边界 1: GangCalculation 必须有 itemsPerSheet, sheetsNeeded, wasteRatio 字段
    $coreContent = Get-Content $engineFile -Raw -ErrorAction SilentlyContinue
    $requiredFields = @('itemsPerSheet', 'sheetsNeeded', 'wasteRatio', 'utilization')
    $missingFields = @()
    foreach ($field in $requiredFields) {
        # 匹配 interface/type 中的字段定义（如 "field: number;" 或 "field?:"）
        if ($coreContent -notmatch "$field\s*[?:]") {
            $missingFields += $field
        }
    }
    if ($missingFields.Count -gt 0) {
        Red "Quote Engine missing required fields: $($missingFields -join ', ')"
    } else {
        Green "Quote Engine has all required gang layout fields"
    }

    # 边界 2: 必须有混拼 (mix) 模式支持
    if ($coreContent -match "GANG_RUN_THRESHOLD|mixDensity|mode.*mix") {
        Green "Gang Run (混拼) mode is supported"
    } else {
        Red "Gang Run (混拼) mode is REQUIRED - e-print competitor advantage"
        Write-Host "    [FIX] Add GANG_RUN_THRESHOLD + mixDensity constants in core.ts" -ForegroundColor Yellow
        Write-Host "          Use mode 'mix' for quantity <= threshold, 'isolate' for larger" -ForegroundColor Yellow
    }

    # 边界 3: 极端尺寸边界检查
    $boundaryTests = @(
        @{ Test = "calculateGang.*itemWidthMM:\s*1"; Name = "1mm minimal sticker" },
        @{ Test = "calculateGang.*itemWidthMM:\s*1000"; Name = "1m maximal poster" },
        @{ Test = "isNaN|NaN"; Name = "NaN guard" },
        @{ Test = "quantity.*0|quantity.*<.*0"; Name = "Negative/zero quantity guard" }
    )
    $hasBoundaryTests = $false
    foreach ($bt in $boundaryTests) {
        if ($coreContent -match $bt.Test) {
            $hasBoundaryTests = $true
            break
        }
    }
    if ($hasBoundaryTests) {
        Green "Extreme size boundary tests present (1mm / 1m / NaN / neg)"
    } else {
        Yellow "Consider adding extreme size boundary tests (1mm / 1m / NaN / neg quantity)"
    }

    # 边界 4: 工艺起步价 (BaseCost) 必备
    if ((Test-Path "src/lib/quote-engine/finishings.ts") -and (Get-Content "src/lib/quote-engine/finishings.ts" -Raw -ErrorAction SilentlyContinue) -match "baseCost|base_cost") {
        Green "Finishing has base cost (起步价) - matches print industry reality"
    } else {
        Red "Missing finishing base cost logic (NOT multiplier)"
        Write-Host "    [FIX] Create finishings.ts with baseCost + perSheetCost per FinishingOption" -ForegroundColor Yellow
    }

    # 边界 5: Supabase material data source
    $sqlFiles = Get-ChildItem "supabase/migrations" -Filter "*.sql" -ErrorAction SilentlyContinue | Where-Object { $_.Name -match "004|material" }
    if ($sqlFiles.Count -gt 0) {
        Green "Material data source exists in Supabase migration: $($sqlFiles[0].Name)"
    } else {
        Yellow "Material data source not yet in Supabase (硬编码中)"
    }
} else {
    Yellow "Quote Engine files not found - skip boundary tests"
}

# ============ Step 5: Summary ============
Header "Step 5/5: Summary"

$totalErrors = @($tscErrors).Count + @($buildErrors).Count
$totalWarnings = @($warnings).Count

Write-Host ""
Write-Host "  TypeScript:  exit=$tscExit, errors=$(@($tscErrors).Count)" -ForegroundColor $(if ($tscExit -eq 0) {'Green'} else {'Red'})
Write-Host "  Build:       exit=$buildExit, errors=$(@($buildErrors).Count)" -ForegroundColor $(if ($buildExit -eq 0) {'Green'} else {'Red'})
Write-Host "  Warnings:    $totalWarnings" -ForegroundColor $(if ($totalWarnings -eq 0) {'Green'} else {'Yellow'})

Write-Host ""
if ($totalErrors -eq 0 -and $tscExit -eq 0 -and $buildExit -eq 0) {
    Green "[PASS] Build + Check all green"
    if ($totalWarnings -gt 0) {
        Yellow "[INFO] $totalWarnings warnings, recommend review (not blocking)"
    }
    Write-Host ""
    exit 0
} else {
    Red "[FAIL] Build + Check failed (errors: $totalErrors, warnings: $totalWarnings)"
    Write-Host ""
    Write-Host "  Log files:" -ForegroundColor Yellow
    Write-Host "    TS log:    $tscLog"
    Write-Host "    Build log: $buildLog"
    Write-Host ""
    Write-Host "  Debug: powershell -File scripts/dev-workflow.ps1 -ShowFullOutput" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}
