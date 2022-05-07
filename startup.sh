#!/bin/bash
/usr/src/emulator/bin/dsk2json -c "Game" -n "Untitled Word Game Pro" /usr/src/bot/disks/ugwp.dsk > /usr/src/emulator/json/disks/ugwp.json
/usr/src/emulator/bin/index
node index.js
