#!/bin/bash

scriptDir=`dirname $0`

export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

cd $scriptDir

# test data locations.  Comment out when installing in prod

# testing on bills desktop
export PRINTER_MONITOR_DIRECTORY=/Volumes/media1/testData/printermonitor-20170420/results
export PRINTER_MONITOR_INFO_FILE=/Volumes/media1/testData/printermonitor-20170420/printerInfo.txt
# testing on bills laptop
#export PRINTER_MONITOR_DIRECTORY=/Users/bill/test-data/printermonitor-20170201/results
#export PRINTER_MONITOR_INFO_FILE=/Users/bill/test-data/printermonitor-20170201/printerInfo.txt
export PORT="3004"
export DEBUG_PRINT_MONITOR=true

/usr/local/bin/nodemon
