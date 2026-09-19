@echo off
rem 2026-09-18 K3 decision: delete the leftover duplicate watchdog task ZprintPro-CronWatchdog-2125.
rem Reason: it points at .hermes/cron-check-tonight.cmd, which reads autoclaw jobs.json indices 5..9
rem         (historical one-shot jobs, NOT the ZP lanes) -> its PASS/FAIL is meaningless; it is also
rem         functionally superseded by \ZP-cron-watchdog.
rem Requires administrator rights (the deepseek-harness session is non-elevated: measured IsAdmin=False,
rem and both schtasks /delete and Unregister-ScheduledTask are denied there).
rem ASCII-only on purpose: cmd.exe reads this file in the OEM code page, so CJK would print as '?'.
rem Usage: right-click -> Run as administrator
setlocal
echo === delete ZprintPro-CronWatchdog-2125 ===
schtasks /query /tn "ZprintPro-CronWatchdog-2125" >nul 2>&1
if errorlevel 1 (
  echo [SKIP] task not present, nothing to delete
  goto :end
)
schtasks /delete /tn "ZprintPro-CronWatchdog-2125" /f
if errorlevel 1 (
  echo [FAIL] delete failed - confirm you are running as administrator
) else (
  echo [OK] deleted
)
:end
echo.
echo === verify: remaining ZP-* / ZprintPro tasks ===
schtasks /query /fo TABLE 2>nul | findstr /I "ZP- ZprintPro"
echo.
echo Prefer the richer script if you want evidence output: scripts\remove-legacy-cron-tasks.ps1
pause
