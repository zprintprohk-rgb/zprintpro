# generated guard: run the lane wrapper under a wall-clock cap (K3 v9.4)
$cmd = Join-Path $PSScriptRoot 'ZP-weekly-meta.cmd'
$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $cmd -PassThru -WindowStyle Hidden
if (-not $p.WaitForExit(1800000)) { try { $p.Kill() } catch {} ; exit 124 }
exit $p.ExitCode
