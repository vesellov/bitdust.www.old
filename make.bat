@echo off

SETLOCAL ENABLEDELAYEDEXPANSION

set DEST_DIR=.


IF "%~1" == "" GOTO COPY_ALL
set fmd=%~1
set fhtml=!fmd!
@echo !fhtml! 
cp -rfv @build/!fhtml! !DEST_DIR!
GOTO END



:COPY_ALL



cp -rfv @build/*.html !DEST_DIR!
           

REM cp -rfv @build/automats         !DEST_DIR!
cp -rfv @build/chat             !DEST_DIR!
cp -rfv @build/customer         !DEST_DIR!
cp -rfv @build/main             !DEST_DIR!
cp -rfv @build/p2p              !DEST_DIR!
cp -rfv @build/raid             !DEST_DIR!
cp -rfv @build/services         !DEST_DIR!
cp -rfv @build/storage          !DEST_DIR!
cp -rfv @build/stun             !DEST_DIR!
cp -rfv @build/supplier         !DEST_DIR!
cp -rfv @build/transport        !DEST_DIR!
cp -rfv @build/userid           !DEST_DIR!


:END

@echo [DONE!]
