#!/bin/bash
# /usr/bin/x11vnc -create -env FD_PROG=/usr/bin/fluxbox -env X11VNC_FINDDISPLAY_ALWAYS_FAILS=1 -env X11VNC_CREATE_GEOM={1:-1024x768x16} -gone 'killall Xvfb' -bg -nopw -forever
export DISPLAY=:1
Xvfb :1 -screen 0 1280x960x16 &
fluxbox &
x11vnc -display :1 -bg -nopw -xkb
node index.js
