#!/bin/bash
# sleep 1m
# DISPLAY=:0 chromium-browser -kiosk --no-sandbox http://localhost:8081
cd /home/pi/rfid_project/frontend
nohup npm run prod &
cd ../backend
nohup npm run mongo &
nohup npm run start &