#!/bin/bash

#Xvfb :1 &
#DISPLAY=:1
#export DISPLAY
#/usr/bin/x11vnc -display :1 -forever -localhost -nopw -bg -xkb
/usr/bin/x11vnc -create -env FD_PROG=/usr/bin/fluxbox -env X11VNC_FINDDISPLAY_ALWAYS_FAILS=1 -env X11VNC_CREATE_GEOM={1:-1024x768x16} -gone 'killall Xvfb' -bg -nopw -forever
#fluxbox &
node index.js
