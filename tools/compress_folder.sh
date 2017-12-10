#!/usr/bin/env bash

echo -e "change directory to `dirname $0`"
cd `dirname $0`
version=`cat ../manifest.json | jq '.version' | cut -d'"' -f2`

echo -e "Creating ZIP file..."
echo -e "../../slack-view-optimizer-v${version}.zip ../* -x *.DS_Store ../tools\* ../README.md"
zip -r ../../slack-view-optimizer-v${version}.zip ../* -x *.DS_Store ../tools\* ../README.md

echo -e "Done."

