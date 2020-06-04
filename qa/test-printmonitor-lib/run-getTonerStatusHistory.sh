#!/bin/bash

#these should be set by the env file
#export PRINTER_MONITOR_DIRECTORY
#export PRINTER_MONITOR_INFO_FILE

# This script gets not just the latest data for each printer, but the information for each day
# this was used for getting test data to populate the mySQL database.


node ./testGetTonerStatusHistory.js