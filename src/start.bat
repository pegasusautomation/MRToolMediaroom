@echo off
echo starting react app in the background...
start /b cmd /c "cd c:\mediaroom && npm start"

timeout /t 5 /nobreak

echo starting node.js server in the background...
start /b cmd /c "cd c:\mediaroom\src && node server.js"

echo both processes have been started in the background.
pause

REM @echo off
REM cd C:\Mediaroom
REM npm start
REM call cd C:\Mediaroom\src
REM call node server.js
