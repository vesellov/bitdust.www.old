@echo off

SETLOCAL ENABLEDELAYEDEXPANSION

set SOURCE_DIR=..\bitdust.docs.english

IF "%~1" == "" GOTO BUILD_ALL

set fhtml=%~1
set fmd=!fhtml:~0,-5!.md
@echo !fmd! 
python md2html.py !SOURCE_DIR!\!fmd! > @build\!fhtml!
python fix_html.py @build\!fhtml! @build\!fhtml! %~2
GOTO END


:BUILD_ALL


@echo [build all, clean @build folder]
if exist @build\NUL rmdir /S /Q @build
mkdir @build

for /f %%j in ('dir /b !SOURCE_DIR!\*.md') do (
    set filename=%%j
    set sourcepath=!SOURCE_DIR!\!filename!
    set destpath=@build\!filename:~0,-3!.html
    @echo !sourcepath!          !destpath! 
    python md2html.py !sourcepath! > !destpath!
    python fix_html.py !destpath! !destpath! 
)


:END

@echo [DONE!]