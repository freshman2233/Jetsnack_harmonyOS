@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem  Hvigor wrapper script for the Jetsnack HarmonyOS project
@rem  Delegates to the DevEco Studio bundled hvigorw
@rem ##########################################################################

set HVIGOR_BIN=D:\Software\Huawei\DevEcoStudio\tools\hvigor\bin

if not exist "%HVIGOR_BIN%\hvigorw.bat" (
    echo ERROR: DevEco Studio hvigorw not found at %HVIGOR_BIN%
    echo Please set HVIGOR_BIN to your DevEco Studio hvigor bin directory.
    exit /b 1
)

call "%HVIGOR_BIN%\hvigorw.bat" %*
