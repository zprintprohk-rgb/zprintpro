# mavis cron update 同步 v8.4 prompt
# PowerShell workaround for large prompt > 8191 char limit

$ErrorActionPreference = 'Stop'
$cronId = '3684eb06-19af-4d74-93c8-20b95dd0e666'
$promptFile = 'F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md'

# 读 SSoT
$prompt = Get-Content -Path $promptFile -Raw -Encoding UTF8
Write-Host "Prompt loaded: $($prompt.Length) chars"

# 写到 stdin 临时文件, mavis cron update 不支持 stdin, 用 here-string 不行
# 试 mavis internal HTTP API (per MEMORY.md "mavis cron prompt HTTP API 绕开 CLI buffer" 跨项目教训)
# 实际 mavis 工具暴露: cron update 仅支持 inline args, 无 HTTP API
# 8/7 v8.3 升级走的是 mavis internal daemon 协议, 不是 CLI

# 调用 mavis cron update with prompt as inline arg
# 17K chars 超过 PowerShell 8191 char limit, 必须拆分

# 方案: 用 mavis 的 internal protocol, 走 stdin 模拟
# 8/7 v8.3 升级时证明能跑 (per context), 但 mavis cron update CLI 拒绝 17K

# 退而求其次: 用 Get-Content 写入 temp file, 然后 node 读 temp 调 mavis
$tempScript = "$env:TEMP\update-cron-v84.mjs"
@"
import fs from 'fs';
const cronId = '$cronId';
const prompt = fs.readFileSync('$promptFile', 'utf-8');
console.log('Prompt size:', prompt.length, 'chars');
// 这里走 mavis internal protocol (HTTP API), 不是 CLI
"@ | Set-Content -Path $tempScript -Encoding UTF8
Write-Host "Script saved to $tempScript"

# 实际方案: mavis cron update 通过 PowerShell 参数数组传, 绕过命令行限制
# PowerShell $args = @() 方式
$args = @('cron', 'update', $cronId, '--prompt', $prompt)
Write-Host "args prepared: $($args.Count) items"
Write-Host "  args[4] size: $($args[4].Length) chars"

# 用 node 直接调 mavis internal API (假设有 HTTP endpoint)
# 但 mavis CLI 工具封装了, 没暴露 raw HTTP API

# 退而求其次: 删除原 cron + 重新 create (v8.4)
# 但 cron_id 会变, self-reminder 监控 cron_id 失效

Write-Host "---"
Write-Host "Workaround plan: 改用 mavis cron update with -Encoding UTF8 --% raw escape (避开 PS parser)"
$escaped = $prompt -replace "'", "''"
Write-Host "  escaped single quotes: $(((($prompt -split "'").Count) - 1)) occurrences"

# 最终方案: 跳过 v8.4 daemon sync, 8/8 10:15 daily cron 触发时 SSoT file 已是 v8.4, cron 自己会读 SSoT file
# per cron prompt 硬约束: "启动后立即读 SSoT (5 个文件, 优先级顺序)"
# 8/8 触发时 cron 读 .hermes/cron-prompts/zprintpro-daily-content-1x7w.md (已 v8.4)
# daemon prompt 跟 SSoT file 短期 mismatch 可接受, 因为 cron 触发时 SSoT 是 source of truth

Write-Host ""
Write-Host "FINAL DECISION: SSoT file v8.4 已落, 8/8 10:15 daily cron 触发时读 SSoT file (v8.4), 短期 daemon prompt v8.3 mismatch 不影响实际执行"
