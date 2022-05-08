#!/bin/bash
export DISPLAY=:1
Xvfb :1 -screen 0 1152x864x24 &
fluxbox &
x11vnc -display :1 -bg -nopw -xkb
node index.js
