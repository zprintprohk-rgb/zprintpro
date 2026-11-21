@echo off
rem one-shot manual dispatch 2026-11-21: PRICE-DEBT-BIGBATCH-20261121 (K3 09:15 approved D1-D5)
set PYTHONIOENCODING=utf-8
set PYTHONUTF8=1
if not defined DEEPSEEK_API_KEY for /f "usebackq delims=" %%K in (`powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY','Machine')"` ) do set "DEEPSEEK_API_KEY=%%K"
if not defined DEEPSEEK_API_KEY for /f "usebackq delims=" %%K in (`powershell.exe -NoProfile -Command "[Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY','User')"` ) do set "DEEPSEEK_API_KEY=%%K"
cd /d "F:\zprintpro-nextjs"
echo ===== run start %DATE% %TIME% ===== >> "F:\zprintpro-nextjs\.hermes\logs\cron-PRICE-DEBT-BIGBATCH.log"
call "C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd" --profile headless "You are the Harness execution layer for ZprintPro. Read F:\zprintpro-nextjs\.hermes\cron-prompts\harness-task-price-debt-bigbatch-20261121.md fully and execute it completely and exactly (no simplification, no deferral): K3 approved D1-D5 on 2026-11-21 09:15, direction = LOWER the truth (certificates MOQ to 10, textbooks MOQ to 10, electronics-packaging-box MOQ to 100). Work in repo root F:\zprintpro-nextjs. STEP 0 idempotency: before each edit check whether already applied on disk; skip and note. STEP 1 execute P0 then P1 then P2 then P3 in the task sheet order. STEP 2 run all four checks in section 3.4 (check-encoding, check-content-guard, npx tsc --noEmit, npm run build) plus node scripts/guards/price-truth-guard.js; paste every exit code into the report; if any fail, stop and report FAILED honestly with the failing output. STEP 3 git diff --stat, confirm scope, paste into report. STEP 4 write the report to F:\zprintpro-nextjs\.hermes\logs\2026-11-21-PRICE-DEBT-BIGBATCH.md per section 4, then reply with just the report path and VERDICT. Environment: the pwsh tool is blocked in this sandbox, do NOT retry it; use file tools and web tools only. Do NOT git commit or push." >> "F:\zprintpro-nextjs\.hermes\logs\cron-PRICE-DEBT-BIGBATCH.log" 2>&1
set RC=%ERRORLEVEL%
echo ===== dsh exit=%RC% run end %DATE% %TIME% ===== >> "F:\zprintpro-nextjs\.hermes\logs\cron-PRICE-DEBT-BIGBATCH.log"
exit /b %RC%
