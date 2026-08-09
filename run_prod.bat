@echo off
setlocal

echo ========================================================
echo   Bar El Éxtasis - Inicio de Producción
echo ========================================================

REM Activar entorno virtual
call "%~dp0\.venv\Scripts\activate.bat"

REM Variables de entorno para desarrollo temporal
set DEBUG=True
set USE_SQLITE=False
set ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

echo.
echo Iniciando servidor Django con Waitress...
cd /d "%~dp0backend"
python run_prod.py

echo.
echo =========================================================
echo   Servidor de producción activo en:
echo   - http://localhost:8000
echo   - Admin: http://localhost:8000/admin
echo =========================================================
pause