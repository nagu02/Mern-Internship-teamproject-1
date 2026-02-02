@echo off
echo.
echo ========================================
echo  5RINGS SPORTS WEBSITE - SETUP SCRIPT
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node -v
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  Installation successful!
    echo ========================================
    echo.
    echo Quick Commands:
    echo   npm run dev      - Start development server
    echo   npm run build    - Build for production
    echo   npm run preview  - Preview production build
    echo.
    echo Documentation:
    echo   README.md        - Full documentation
    echo   QUICKSTART.md    - Quick start guide
    echo   DEPLOYMENT.md    - Deployment instructions
    echo.
    echo Ready to start? Run: npm run dev
    echo.
) else (
    echo.
    echo [ERROR] Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

pause
