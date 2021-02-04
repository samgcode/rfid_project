#!/bin/bash
cd /home/pi/rfid_project/frontend
nohup npm run prod &
cd ../backend
nohup npm run mongo &
nohup npm run prod &