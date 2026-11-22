@echo off
rem ZP one-shot: AI crawler 72h recheck via dsh headless (2026-11-24 13:37)
rem Pure ASCII only. Do not hand-edit beyond ASCII.
cd /d F:\zprintpro-nextjs
set LOG=.hermes\logs\ai-recheck-20261124-wrapper.log
echo run start %DATE% %TIME% > %LOG%
"C:\Users\Administrator\AppData\Roaming\DSH Desktop\host-commands\desktop\bin\dsh.cmd" --profile headless "Read .hermes/cron-prompts/ai-crawler-72h-recheck-20261124.md and execute every step; write the report in Chinese" >> %LOG% 2>&1
set RC=%ERRORLEVEL%
echo run end exit=%RC% %DATE% %TIME% >> %LOG%
exit /b %RC%
