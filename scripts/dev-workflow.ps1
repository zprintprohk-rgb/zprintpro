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
