#!/bin/bash
/usr/bin/x11vnc -create -env FD_PROG=/usr/bin/fluxbox -env X11VNC_FINDDISPLAY_ALWAYS_FAILS=1 -env X11VNC_CREATE_GEOM={1:-1024x768x16} -gone 'killall Xvfb' -bg -nopw -forever
#izapple2sdl_linux 
