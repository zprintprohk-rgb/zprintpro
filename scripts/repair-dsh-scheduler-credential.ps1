# Audit or restore DeepSeek credentials for Windows Task Scheduler lanes.
# ASCII-only on purpose. Default mode is read-only and never prints secret values.
# Apply (admin): powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-dsh-scheduler-credential.ps1 -Apply
# Controlled smoke test: add -SmokeTest (does not run any production wrapper).
param(
  [switch]$Apply,
  [switch]$SmokeTest
)

$ErrorActionPreference = 'Stop'
$Name = 'DEEPSEEK_API_KEY'
$Dsh = 'C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd'

function Test-Admin {
  return ([System.Security.Principal.WindowsPrincipal][System.Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [System.Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-Scope([string]$Scope) {
  $value = [Environment]::GetEnvironmentVariable($Name, $Scope)
  return -not [string]::IsNullOrWhiteSpace($value)
}

Write-Host 'DSH scheduler credential audit (values are never displayed)'
Write-Host ('dsh executable : ' + (Test-Path $Dsh))
foreach ($scope in @('Process', 'User', 'Machine')) {
  Write-Host ($scope.PadRight(15) + ': ' + $(if (Test-Scope $scope) { 'PRESENT' } else { 'MISSING' }))
}

if (-not (Test-Path $Dsh)) {
  Write-Host 'FAIL: dsh CLI is missing. Repair the DSH Desktop installation first.'
  exit 2
}

$configText = (& $Dsh --profile headless --dump-config 2>$null | Out-String)
$provider = if ($configText -match '(?m)^\s*provider:\s*([^\s#]+)\s*$') { $Matches[1] } else { 'UNKNOWN' }
$model = if ($configText -match '(?m)^\s*model:\s*([^\s#]+)\s*$') { $Matches[1] } else { 'UNKNOWN' }
$modelOk = ($provider -eq 'deepseek-official' -and $model -match '^deepseek-flash(?:[-.][a-z0-9._-]+)?$')
Write-Host ("effective route: provider={0} model={1} allowed={2}" -f $provider, $model, $modelOk)
if (-not $modelOk) {
  Write-Host 'FAIL: select an allowed deepseek-flash variant in the headless profile; do not use the disallowed pro route.'
  exit 3
}

if ($Apply) {
  if (-not (Test-Admin)) {
    Write-Host 'FAIL: -Apply requires an elevated Administrator PowerShell.'
    exit 4
  }
  $credentialStored = $false
  $attempt = 0
  while ((-not $credentialStored) -and ($attempt -lt 3)) {
    $attempt++
    $secure = Read-Host ("Enter the full DeepSeek API key ({0}/3; input hidden; paste with Ctrl+V then Enter)" -f $attempt) -AsSecureString
    $bstr = [IntPtr]::Zero
    try {
      $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
      $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
      if ([string]::IsNullOrWhiteSpace($plain)) {
        Write-Host 'Empty input rejected. Please paste the full DeepSeek API key, not an empty line.'
        continue
      }
      [Environment]::SetEnvironmentVariable($Name, $plain, 'Machine')
      $env:DEEPSEEK_API_KEY = $plain
      $credentialStored = $true
      Write-Host 'Machine credential stored. Existing wrappers reload it without requiring a service restart.'
    } finally {
      if ($bstr -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
      $plain = $null
      if ($null -ne $secure) { $secure.Dispose() }
    }
  }
  if (-not $credentialStored) {
    Write-Host 'FAIL: no non-empty credential was entered after 3 attempts. Nothing was changed.'
    exit 5
  }
}

$available = (Test-Scope 'Process') -or (Test-Scope 'User') -or (Test-Scope 'Machine')
if (-not $available) {
  Write-Host 'BLOCKED: no scheduler-usable credential. Rerun elevated with -Apply.'
  Write-Host 'A saved reference in the DSH UI is not recovery evidence; the scheduled process must receive the key.'
  exit 10
}

if ($SmokeTest) {
  if (-not (Test-Scope 'Process')) {
    $env:DEEPSEEK_API_KEY = [Environment]::GetEnvironmentVariable($Name, 'Machine')
    if ([string]::IsNullOrWhiteSpace($env:DEEPSEEK_API_KEY)) {
      $env:DEEPSEEK_API_KEY = [Environment]::GetEnvironmentVariable($Name, 'User')
    }
  }
  # DSH writes informational model-list output to stderr. In PowerShell 5.1,
  # ErrorActionPreference=Stop turns that native stderr stream into a false
  # NativeCommandError even when dsh exits 0. Restore Continue for this call only.
  $previousEap = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    $smoke = (& $Dsh --profile headless 'Reply with exactly DSH_OK and nothing else.' 2>&1 | Out-String)
    $smokeExit = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousEap
  }
  if ($smokeExit -eq 0 -and $smoke -match 'DSH_OK') {
    Write-Host 'PASS: controlled dsh smoke test returned exit=0 and DSH_OK.'
    Write-Host 'Next evidence required: one real scheduled run with dsh=0, a valid same-day report, and four-way reconciliation.'
    exit 0
  }
  Write-Host ("FAIL: controlled dsh smoke test failed (exit={0} or DSH_OK absent); raw output suppressed." -f $smokeExit)
  exit 11
}

Write-Host 'Audit complete. No production wrapper was run and no scheduler setting was changed.'
exit 0
