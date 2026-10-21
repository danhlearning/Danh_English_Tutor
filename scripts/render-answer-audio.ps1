$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskPlan = Get-Content -LiteralPath (Join-Path $taskRoot 'artifacts/correct-answer-speech/audio-plan.json') -Raw | ConvertFrom-Json
$taskOutput = Join-Path $taskRoot 'shared/answer-audio'
New-Item -ItemType Directory -Path $taskOutput -Force | Out-Null
$taskSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $taskSynth.SelectVoice('Microsoft Zira Desktop')
  $taskSynth.Rate = -2
  $taskFormat = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
  $taskCount = 0
  foreach ($taskItem in $taskPlan) {
    $taskFile = Join-Path $taskOutput ($taskItem.id + '.wav')
    if (!(Test-Path -LiteralPath $taskFile) -or (Get-Item -LiteralPath $taskFile).Length -lt 1000) {
      $taskSynth.SetOutputToWaveFile($taskFile, $taskFormat)
      $taskSynth.Speak($taskItem.text)
      $taskSynth.SetOutputToNull()
    }
    $taskCount++
    if ($taskCount % 100 -eq 0) { Write-Output "Prepared $taskCount / $($taskPlan.Count)" }
  }
} finally { $taskSynth.Dispose() }
Write-Output "PASS $taskCount local English WAV files."
