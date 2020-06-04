#!/bin/bash

db=$DB_DATABASE
user=$DB_DBA
pw=$DB_DBA_PASSWORD


mysql -v -u $user -p$pw $db < printer-manager-schema.sql
mysql -v -u $user -p$pw $db < collection-procedures.sql
mysql -v -u $user -p$pw $db < collection-views.sql
mysql -v -u $user -p$pw $db < reporting-views.sql
# data
mysql -v -u $user -p$pw $db < insertModels.sql
mysql -v -u $user -p$pw $db < ../xfer/populatePrintersTable.sql
mysql -v -u $user -p$pw $db < ../xfer/color-levels-647831.sql
mysql -v -u $user -p$pw $db < optimize-color-levels-after-load.sql



exit
