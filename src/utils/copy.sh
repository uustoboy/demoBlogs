#!/bin/sh
cd E:/git/demoBlogs/logs/access.log
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log

