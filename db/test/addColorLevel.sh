#!/bin/bash

# color printer in b104

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode 'color=black' \
--data-urlencode 'level=25'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode 'color=yellow' \
--data-urlencode 'level=33'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode 'color=cyan' \
--data-urlencode 'level=87'


curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.83' \
--data-urlencode 'color=magenta' \
--data-urlencode 'level=21'

# color printer in e201

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode 'color=black' \
--data-urlencode 'level=35'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode 'color=yellow' \
--data-urlencode 'level=45'

curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode 'color=cyan' \
--data-urlencode 'level=55'


curl --location --request POST 'http://localhost:3004/api/addColorLevel' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'ip_address=10.177.200.76' \
--data-urlencode 'color=magenta' \
--data-urlencode 'level=75'


