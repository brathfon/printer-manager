select 'Database sizes' AS '';
SELECT table_schema AS "Database", 
ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)" 
FROM information_schema.TABLES 
GROUP BY table_schema;


select 'Table status for dev_printer_manager' AS '';
show table status from dev_printer_manager;


select 'Table sizes for dev_printer_manager' AS '';
SELECT table_name AS "Table",
ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "dev_printer_manager"
ORDER BY (data_length + index_length) DESC;


select 'Index sizes for databases' AS '';
SELECT database_name, table_name, index_name,
ROUND(stat_value * @@innodb_page_size / 1024 / 1024, 2) size_in_mb
FROM mysql.innodb_index_stats
WHERE stat_name = 'size' AND index_name != 'PRIMARY' and database_name = "dev_printer_manager"
ORDER BY size_in_mb DESC;