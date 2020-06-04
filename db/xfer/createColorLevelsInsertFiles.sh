#!/bin/bash

##  This is to create the insert of the color levels for quickly loading 22339 color levels from the April 2017 capture of data.
##
##  extended-insert puts all the inserts into one command, which is much faster but makes the sql file one large line.
## 4 seconds vs .1 seconds

mysqldump --opt --extended-insert=TRUE -u $DB_DBA -p$DB_DBA_PASSWORD $DB_DATABASE color_levels > color-levels-647831.sql
