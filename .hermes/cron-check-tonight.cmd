@echo off
rem ============================================================
rem ZprintPro cron watchdog runner (2026-09-13)
rem ASCII only. Purpose: run the K3 5-task checker and let the
rem python script append its own report to .hermes\logs\.
rem Register (elevated):
rem   schtasks /Create /TN "ZprintPro-CronWatchdog-2125" ^
rem     /TR "F:\zprintpro-nextjs\.hermes\cron-check-tonight.cmd" ^
rem     /SC DAILY /ST 21:25 /F
rem ============================================================
cd /d F:\zprintpro-nextjs
"C:\Users\Administrator\AppData\Roaming\uv\python\cpython-3.11-windows-x86_64-none\python.exe" "F:\zprintpro-nextjs\.hermes\cron-check-tonight.py"
exit /b %ERRORLEVEL%
