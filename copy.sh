#!/bin/bash
zip -r rfid_project.zip ../rfid_project/ -x */node_modules/**\* -x *package-lock.json* -x */.git/*
scp -r rfid_project.zip pi@192.168.0.139:/home/pi/