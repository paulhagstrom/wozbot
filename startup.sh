#!/bin/bash

Xvfb :1 &
DISPLAY=:1
export DISPLAY
/usr/bin/x11vnc -display :1 -bg -nopw -xkb -listen localhost &
fluxbox &
node index.js
