$ErrorActionPreference = "Stop"
$PORT = 3131
$SUBDOMAIN = "pipixia-cyber-office"
$DIR = "C:\Users\Administrator\.qclaw\workspace\cyber-office"

Write-Host "[1/3] Starting local web server on port $PORT ..." -ForegroundColor Cyan
$server = Start-Process -FilePath "npx" -ArgumentList "--yes","serve","-p","$PORT","-s",$DIR -WindowStyle Hidden -PassThru

Start-Sleep 3

Write-Host "[2/3] Waiting for server ..." -ForegroundColor Cyan
$attempt = 0
while ($attempt -lt 15) {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:$PORT" -UseBasicParsing -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($r.StatusCode -eq 200) {
            Write-Host "Server ready!" -ForegroundColor Green
            break
        }
    } catch {}
    Start-Sleep 1
    $attempt++
}

Write-Host "[3/3] Creating public tunnel ..." -ForegroundColor Cyan
Write-Host "Using subdomain: $SUBDOMAIN" -ForegroundColor Yellow
$env:LT_SUBdomain = $SUBDOMAIN
$lt = Start-Process -FilePath "npx" -ArgumentList "--yes","localtunnel","--port","$PORT","--subdomain",$SUBDOMAIN -WindowStyle Hidden -PassThru -RedirectStandardOutput "$env:TEMP\lt_out.txt" -RedirectStandardError "$env:TEMP\lt_err.txt"

Start-Sleep 6

$out = Get-Content "$env:TEMP\lt_out.txt" -Raw -ErrorAction SilentlyContinue
$err = Get-Content "$env:TEMP\lt_err.txt" -Raw -ErrorAction SilentlyContinue

Write-Host "`n========== PUBLIC URL ==========" -ForegroundColor Magenta
if ($out -match "https://[\w\-\.]+\.loca\.lt") {
    $url = $Matches[0]
    Write-Host "OPEN THIS URL:" -ForegroundColor Yellow
    Write-Host $url -ForegroundColor White
    Write-Host "`nFirst visit: click 'Click to Continue' to pass through." -ForegroundColor Gray
    Write-Host "Server PID: $($server.Id) | LT PID: $($lt.Id)" -ForegroundColor Gray
} else {
    Write-Host "OUTPUT: $out" -ForegroundColor Red
    Write-Host "ERROR: $err" -ForegroundColor Red
}

Write-Host "`nPress Ctrl+C to stop server and tunnel." -ForegroundColor Yellow
