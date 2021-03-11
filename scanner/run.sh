#!/bin/sh
cd /home/pi/rfid_project/scanner
nohup node app.js &
echo $! >./pid.txt