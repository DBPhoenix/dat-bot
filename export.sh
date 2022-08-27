#!/bin/bash
VERSION=$(npm version | grep 'dat-bot' | awk -F "'" '{print $4}')
FILE_NAME=dat-bot

cp -r ./dist ./$FILE_NAME
tar -czf $FILE_NAME-$VERSION.tar.gz ./$FILE_NAME
rm -r ./$FILE_NAME
