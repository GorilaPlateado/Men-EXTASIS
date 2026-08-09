@echo off
setlocal

echo ========================================================
echo   Bar El Extasis - Inicio de Desarrollo
echo ========================================================

set ROOT=%~dp0
set PYTHON=%ROOT%.venv\Scripts\python.exe
set BACKEND=%ROOT%backend
set FRONTEND=%ROOT%frontend

echo.
echo [1/2] Iniciando Django API (puerto 8000)...
start "Django API" cmd /k "cd /d "%BACKEND%" && "%PYTHON%" manage.py runserver 8000"

timeout /t 3 /nobreak >nul

echo [2/2] Iniciando React Frontend (puerto 5173)...
start "React Frontend" cmd /k "cd /d "%FRONTEND%" && npm run dev"

echo.
echo ========================================================
echo   Desarrollo iniciado:
echo   - API Django:     http://localhost:8000
echo   - React Frontend: http://localhost:5173
echo   - Admin Django:   http://localhost:8000/admin
echo   - Usuario admin:  admin / admin123
echo ========================================================
pause
