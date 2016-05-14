@echo off
SET curpath=%cd%
git pull
git archive --format=zip -9 -v -o bitdust.www.english.zip HEAD
@echo created [bitdust.www.english.zip]