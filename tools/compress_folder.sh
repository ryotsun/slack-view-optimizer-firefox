#!/usr/bin/env bash

cd `dirname $0`/../
version=`cat manifest.json | jq '.version' | cut -d'"' -f2`

echo -e "Creating ZIP file..."
zip -r ../slack-view-optimizer-v${version}.zip ./* -x *.DS_Store ./tools\* README.md

echo -e "Done."

