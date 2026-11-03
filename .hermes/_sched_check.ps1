$tasks = Get-ScheduledTask -TaskName 'ZP-*' -ErrorAction SilentlyContinue
foreach ($t in $tasks) {
  $i = $t | Get-ScheduledTaskInfo
  $line = '{0} | State={1} | LastRun={2} | LastResult={3} | NextRun={4}' -f $t.TaskName, $t.State, $i.LastRunTime, $i.LastTaskResult, $i.NextRunTime
  Write-Output $line
}
