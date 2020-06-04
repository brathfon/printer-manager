#!/bin/bash

# color printer in b104

theDate=`date '+%Y-%m-%d %H:%M:%S'`

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=black' \
--data-urlencode 'percent_full=25'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=yellow' \
--data-urlencode 'percent_full=33'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=cyan' \
--data-urlencode 'percent_full=87'


curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=magenta' \
--data-urlencode 'percent_full=21'

# color printer in e201
theDate=`date '+%Y-%m-%d %H:%M:%S'`

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=black' \
--data-urlencode 'percent_full=35'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=yellow' \
--data-urlencode 'percent_full=45'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=cyan' \
--data-urlencode 'percent_full=55'


curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode "collect_time=${theDate}" \
--data-urlencode 'color=magenta' \
--data-urlencode 'percent_full=75'


