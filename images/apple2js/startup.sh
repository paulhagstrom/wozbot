#!/bin/bash
./bin/dsk2json -c "Game" -n "Untitled Word Game Pro" ./disks/ugwp.dsk > ./json/disks/ugwp.json
./bin/index
./node_modules/http-server/bin/http-server
