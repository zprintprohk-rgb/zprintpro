@echo off
rem one-shot manual dispatch 2026-11-21: RUSH-PAGE-TRUTH-20261121 (K3 08:48 facts confirmed, dispatch Harness)
set PYTHONIOENCODING=utf-8
set PYTHONUTF8=1
if not defined DEEPSEEK_API_KEY for /f "usebackq delims=" %%K in (`powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY','Machine')"` ) do set "DEEPSEEK_API_KEY=%%K"
if not defined DEEPSEEK_API_KEY for /f "usebackq delims=" %%K in (`powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY','User')"` ) do set "DEEPSEEK_API_KEY=%%K"
cd /d "F:\zprintpro-nextjs"
echo ===== run start %DATE% %TIME% ===== >> "F:\zprintpro-nextjs\.hermes\logs\cron-RUSH-PAGE-TRUTH.log"
call "C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd" --profile headless "You are the Harness execution layer for ZprintPro. Read F:\zprintpro-nextjs\.hermes\cron-prompts\harness-task-rush-page-truth-20261121.md fully and execute it completely and exactly (no simplification, no deferral): touch only the 4 files in section 2, obey every rule in section 3, do NOT git commit or push. Work in repo root F:\zprintpro-nextjs. STEP 0 idempotency: before each edit check whether that change already exists on disk; skip and note if already applied. STEP 1 make the edits in section 2 order (A page.tsx, B RushDeliveryGrid.tsx, C RushDeliveryFAQ.tsx, D WhyChooseUs.tsx). STEP 2 run all four checks in section 3.6 (check-encoding, check-content-guard, npx tsc --noEmit, npm run build) and paste each exit code into the report; if any fail, stop and report FAILED honestly with the failing output. STEP 3 git diff --stat to confirm only the 4 files changed and paste it into the report. STEP 4 write the report to F:\zprintpro-nextjs\.hermes\logs\2026-11-21-RUSH-PAGE-TRUTH.md per section 4, then reply with just the report path and VERDICT. Environment: the pwsh tool is blocked in this sandbox, do NOT retry it; use file tools and web tools only." >> "F:\zprintpro-nextjs\.hermes\logs\cron-RUSH-PAGE-TRUTH.log" 2>&1
set RC=%ERRORLEVEL%
echo ===== dsh exit=%RC% run end %DATE% %TIME% ===== >> "F:\zprintpro-nextjs\.hermes\logs\cron-RUSH-PAGE-TRUTH.log"
exit /b %RC%
