@echo off
echo ========================================
echo   Deploy to GitHub Pages
echo ========================================

:: Step 1: Build
echo [1/3] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo BUILD FAILED!
    pause
    exit /b 1
)

:: Step 2: Install gh-pages if not present
echo [2/3] Checking gh-pages...
call npx gh-pages --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing gh-pages...
    call npm install --save-dev gh-pages
)

:: Step 3: Deploy
echo [3/3] Deploying to gh-pages branch...
call npx gh-pages -d dist
if %errorlevel% neq 0 (
    echo DEPLOY FAILED!
    pause
    exit /b 1
)

echo ========================================
echo   Deploy successful!
echo   Check your GitHub Pages URL.
echo ========================================
pause