@echo off
setlocal

echo Deteniendo servidores de desarrollo...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do taskkill /F /PID %%a >nul 2>&1

echo.
echo Servidores detenidos.
pause
