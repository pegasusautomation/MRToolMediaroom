::[Bat To Exe Converter]
::
::YAwzoRdxOk+EWAnk
::fBw5plQjdG8=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+IeA==
::cxY6rQJ7JhzQF1fEqQJhZksaHGQ=
::ZQ05rAF9IBncCkqN+0xwdVsFAlTMbAs=
::ZQ05rAF9IAHYFVzEqQIdGltnSRaUOXn6K7oS4fz0/eOJpQ0pW+0zGA==
::eg0/rx1wNQPfEVWB+kM9LVsJDGQ=
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWHSB8EsxAxJaSGQ=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATE100gMQldSwyWfEa/Arwdw+H166bH8B1PAK5/WYPXmoaHJ+gH+QXWcIUoxGxfnKs=
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJHS2wE0/JDZRSA2DLmS1C4kx2qja//qLq04cQOswdsHewrHu
::YB416Ek+ZW8=
::
::
::978f952a14a936cc963da21a135fa983
@echo off
setlocal enabledelayedexpansion
 
:: Get the directory of the script
set "projectDir=%~dp0"
 
:: Ensure the provided path ends with a backslash
if not "%projectDir:~-1%" == "\" set "projectDir=%projectDir%\"
 
:: Function to check if Node.js is installed
echo Checking if Node.js is installed...
node -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo Node.js is not installed. Downloading and installing Node.js...
    powershell -command "Invoke-WebRequest -Uri https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi -OutFile nodejs.msi"
    msiexec /i nodejs.msi /quiet /norestart
    echo Node.js installed successfully.
 
    :: Set Node.js path in the system environment variables
    echo Setting Node.js path in the system environment variables...
    setx PATH "%PATH%;C:\Program Files\nodejs\" /M
 
    :: Verify Node.js installation again
    node -v >nul 2>&1
    IF ERRORLEVEL 1 (
        echo DOUBLE CLICK ON MR Application.exe
        pause
        exit /b 1
    ) ELSE (
        echo Node.js path set successfully.
    )
) ELSE (
    echo Node.js is already installed.
)
 
:: Unblocking files if necessary
echo Checking if any files need to be unblocked in %projectDir%...
powershell -command "Get-ChildItem -Path '%projectDir%' -Recurse | Where-Object { $_.Attributes -band [System.IO.FileAttributes]::ReparsePoint -or $_.Attributes -band [System.IO.FileAttributes]::Offline -or $_.Attributes -band [System.IO.FileAttributes]::Encrypted -or $_.Attributes -band [System.IO.FileAttributes]::Temporary } | Unblock-File"
echo Files unblocked if necessary.
 
:: Install dependencies if node_modules does not exist
if not exist "%projectDir%node_modules" (
    echo Installing dependencies...
    pushd "%projectDir%"
    npm install
    popd
    IF %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies. Check the log for details.
        echo React app log: %projectDir%react_app.log
        pause
        exit /b 1
    ) ELSE (
        echo Dependencies installed successfully.
    )
) ELSE (
    echo Dependencies already installed.
)
 
:: Start the React app
echo Starting React app...
pushd "%projectDir%"
start "" /b cmd /c "npm start >> react_app.log 2>&1"
popd
 
:: Wait for the React app to start by monitoring the log file
echo Waiting for React app to start...
:waitForReactApp
timeout /t 5 /nobreak >nul
findstr /C:"Compiled successfully" "%projectDir%react_app.log" >nul
IF %ERRORLEVEL% NEQ 0 (
    goto waitForReactApp
) ELSE (
    echo React app started successfully.
)
 
:: Navigate to the server directory and start the server
echo Starting Node.js server...
pushd "%projectDir%src"
start "" /b cmd /c "node server.js > node_server.log 2>&1"
popd
 
:: Final messages
echo App Launched...
 
endlocal