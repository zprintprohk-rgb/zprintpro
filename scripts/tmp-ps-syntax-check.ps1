param([string]$File)
$tokens = $null
$errors = $null
$null = [System.Management.Automation.Language.Parser]::ParseFile($File, [ref]$tokens, [ref]$errors)
if ($errors.Count -eq 0) { Write-Host "PS SYNTAX OK: $File" } else { $errors | ForEach-Object { Write-Host $_.Message } }
