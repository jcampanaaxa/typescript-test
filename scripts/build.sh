#!/bin/bash
if [ -d ./dist ]; then
  echo Removing JSON files from ./dist...
  find ./dist -name \*.json | xargs rm
else
  echo "Creating ./dist ..."
  mkdir dist
fi
echo Copying JSON files from ./server to ./dist
cd server
find . -name \*.json | awk -F'.' '{print $2"."$3}' | while read i; do
  echo "./server$i => ./dist$i"
  cp .$i ../dist$i
done

