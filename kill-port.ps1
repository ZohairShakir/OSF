# Kill all processes using port 5000
$port = 5000
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($connections) {
    $connections | ForEach-Object {
        $processId = $_.OwningProcess
        Write-Host "Killing process $processId on port $port"
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
    Write-Host "✅ Port $port is now free!"
} else {
    Write-Host "✅ Port $port is already free!"
}
