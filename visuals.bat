@echo off

SETLOCAL ENABLEDELAYEDEXPANSION

set SOURCE_DIR=../bitdust.visual

@echo [!SOURCE_DIR!/chat]
mkdir @build\chat
@echo !SOURCE_DIR!/chat/*.png


cp -rf !SOURCE_DIR!/chat/*.png  @build\chat
cp -rf !SOURCE_DIR!/chat/*.pdf  @build\chat
cp -rf !SOURCE_DIR!/chat/*.vsd  @build\chat

@echo [!SOURCE_DIR!/customer]
mkdir @build\customer
cp -rf !SOURCE_DIR!/customer/*.png  @build\customer
cp -rf !SOURCE_DIR!/customer/*.pdf  @build\customer
cp -rf !SOURCE_DIR!/customer/*.vsd  @build\customer

@echo [!SOURCE_DIR!/main]
mkdir @build\main
cp -rf !SOURCE_DIR!/main/*.png  @build\main
cp -rf !SOURCE_DIR!/main/*.pdf  @build\main
cp -rf !SOURCE_DIR!/main/*.vsd  @build\main

@echo [!SOURCE_DIR!/p2p]
mkdir @build\p2p
cp -rf !SOURCE_DIR!/p2p/*.png  @build\p2p
cp -rf !SOURCE_DIR!/p2p/*.pdf  @build\p2p
cp -rf !SOURCE_DIR!/p2p/*.vsd  @build\p2p

@echo [!SOURCE_DIR!/raid]
mkdir @build\raid
cp -rf !SOURCE_DIR!/raid/*.png  @build\raid
cp -rf !SOURCE_DIR!/raid/*.pdf  @build\raid
cp -rf !SOURCE_DIR!/raid/*.vsd  @build\raid

@echo [!SOURCE_DIR!/services]
mkdir @build\services
cp -rf !SOURCE_DIR!/services/*.png  @build\services
cp -rf !SOURCE_DIR!/services/*.pdf  @build\services
cp -rf !SOURCE_DIR!/services/*.vsd  @build\services

@echo [!SOURCE_DIR!/storage]
mkdir @build\storage
cp -rf !SOURCE_DIR!/storage/*.png  @build\storage
cp -rf !SOURCE_DIR!/storage/*.pdf  @build\storage
cp -rf !SOURCE_DIR!/storage/*.vsd  @build\storage

@echo [!SOURCE_DIR!/stun]
mkdir @build\stun
cp -rf !SOURCE_DIR!/stun/*.png  @build\stun
cp -rf !SOURCE_DIR!/stun/*.pdf  @build\stun
cp -rf !SOURCE_DIR!/stun/*.vsd  @build\stun

@echo [!SOURCE_DIR!/supplier]
mkdir @build\supplier
cp -rf !SOURCE_DIR!/supplier/*.png  @build\supplier
cp -rf !SOURCE_DIR!/supplier/*.pdf  @build\supplier
cp -rf !SOURCE_DIR!/supplier/*.vsd  @build\supplier

@echo [!SOURCE_DIR!/transport]
mkdir @build\transport
cp -rf !SOURCE_DIR!/transport/*.png  @build\transport
cp -rf !SOURCE_DIR!/transport/*.pdf  @build\transport
cp -rf !SOURCE_DIR!/transport/*.vsd  @build\transport

@echo [!SOURCE_DIR!/userid]
mkdir @build\userid
cp -rf !SOURCE_DIR!/userid/*.png  @build\userid
cp -rf !SOURCE_DIR!/userid/*.pdf  @build\userid
cp -rf !SOURCE_DIR!/userid/*.vsd  @build\userid


:END

@echo [DONE!]