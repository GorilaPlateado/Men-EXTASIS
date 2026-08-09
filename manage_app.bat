@echo off
setlocal
set ROOT=%~dp0

:menu
cls
echo ========================================================
echo   Bar El Extasis - Gestor de la aplicacion
echo ========================================================
echo 1. Iniciar desarrollo
echo 2. Iniciar produccion
echo 3. Detener servidores
echo 4. Migrar base de datos
echo 5. Construir frontend
echo 6. Salir
set /p choice=Selecciona una opcion [1-6]: 

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto prod
if "%choice%"=="3" goto stop
if "%choice%"=="4" goto migrate
if "%choice%"=="5" goto build
if "%choice%"=="6" goto exit

echo Opcion no valida.
pause
goto menu

:dev
call "%ROOT%run_dev.bat"
goto menu

:prod
call "%ROOT%run_prod.bat"
goto menu

:stop
call "%ROOT%stop_servers.bat"
goto menu

:migrate
call "%ROOT%.venv\Scripts\activate.bat"
cd /d "%ROOT%backend"
python manage.py migrate
python manage.py loaddata menu_app/fixtures/seed_data.json
echo.
echo Base de datos actualizada.
pause
goto menu

:build
cd /d "%ROOT%frontend"
call npm run build
echo.
echo Build del frontend completado.
pause
goto menu

:exit
exit /b 0
