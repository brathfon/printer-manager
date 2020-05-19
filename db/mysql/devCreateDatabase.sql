DROP DATABASE IF EXISTS dev_printer_manager;
CREATE DATABASE IF NOT EXISTS dev_printer_manager;
USE dev_printer_manager;

DROP USER IF EXISTS 'dev_printer_manager_dba'@'localhost';
CREATE USER 'dev_printer_manager_dba'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dev_dba_pw';
GRANT ALL ON dev_printer_manager.* TO 'dev_printer_manager_dba'@'localhost';

DROP USER IF EXISTS 'dev_printer_manager_user'@'localhost';
CREATE USER 'dev_printer_manager_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dev_user_pw';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON dev_printer_manager.* TO 'dev_printer_manager_user'@'localhost';
