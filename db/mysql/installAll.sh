#!/bin/bash

db=$DB_DATABASE
user=$DB_DBA
pw=$DB_DBA_PASSWORD


#mysql -v -u $user -p$pw $db < generated-schema-01.sql
mysql -v -u $user -p$pw $db < printer-manager-schema.sql
mysql -v -u $user -p$pw $db < insertData.sql
mysql -v -u $user -p$pw $db < ../xfer/populate-printers-table.sql
mysql -v -u $user -p$pw $db < collection-procedures.sql
exit
mysql -v -u $user -p$pw $db < auth-procedures.sql
mysql -v -u $user -p$pw $db < example-procedures.sql
mysql -v -u $user -p$pw $db < utility-procedures.sql
mysql -v -u $user -p$pw $db < lookup-procedures.sql
mysql -v -u $user -p$pw $db < insertData.sql
exit
mysql -v -u $user -p$pw $db < views.sql
mysql -v -u $user -p$pw $db < auth-procedures.sql
mysql -v -u $user -p$pw $db < reporting-procedures.sql
mysql -v -u $user -p$pw $db < session-procedures.sql
mysql -v -u $user -p$pw $db < lookup-procedures.sql
mysql -v -u $user -p$pw < insertData.sql
mysql -v -u $user -p$pw $db < ../xfer/insert-webexport-legacy-data.1.first-sample-day-change.sql
mysql -v -u $user -p$pw $db < ../xfer/insert-data-sessions-28-39-1-15.2.fixed-double-dash-dates.sql
mysql -v -u $user -p$pw $db < ../xfer/update-nutrient-data.20180610.0.sessions-thru-36w-11s.sql
exit
