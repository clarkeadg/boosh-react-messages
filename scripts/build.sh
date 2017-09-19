#!/bin/sh
rimraf lib/
./node_modules/.bin/babel src/ --out-dir lib/

