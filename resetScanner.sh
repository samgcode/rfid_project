#!/bin/sh
cd /home/pi/rfid_project/
PIDFile="./scanner/pid.txt"
kill -9 $(<"$PIDFile")
cd ../scanner
nohup npm run start &