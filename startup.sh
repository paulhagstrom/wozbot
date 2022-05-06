#!/bin/bash
Xvfb :1 &
fluxbox &
/usr/bin/x11vnc -display :1 -bg -nopw -xkb -listen localhost &
node index.js
