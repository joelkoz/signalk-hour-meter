#!/bin/bash
node node_modules/globalize-compiler/bin/globalize-compiler -l $1 -m messages/$1.json -o src/i18n-$1.js i18n.js
