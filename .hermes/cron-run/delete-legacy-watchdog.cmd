@echo off
rem 2026-09-18 K3 拍板: 删除遗留重复 watchdog 任务 ZprintPro-CronWatchdog-2125
rem 原因: 指向 .hermes/cron-check-tonight.cmd, 9/17 运行 Result=2 失败, 且与 ZP-cron-watchdog 功能重叠
rem 需管理员权限 (deepseek harness 会话无权限, Unregister-ScheduledTask 亦被拒)
rem 用法: 右键"以管理员身份运行"
echo === 删除 ZprintPro-CronWatchdog-2125 ===
schtasks /query /tn "ZprintPro-CronWatchdog-2125" >nul 2>&1
if errorlevel 1 (
  echo [SKIP] 任务不存在, 无需删除
  goto :end
)
schtasks /delete /tn "ZprintPro-CronWatchdog-2125" /f
if errorlevel 1 (
  echo [FAIL] 删除失败 — 请确认以管理员身份运行
) else (
  echo [OK] 已删除
)
:end
echo.
echo === 验证: 剩余 ZP-* 任务 ===
schtasks /query /fo TABLE 2>nul | findstr /I "ZP- ZprintPro"
echo.
pause
