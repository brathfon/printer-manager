DROP DATABASE IF EXISTS printer_manager;
CREATE DATABASE IF NOT EXISTS printer_manager;
USE printer_manager;

DROP USER IF EXISTS 'printer_manager_dba'@'localhost';
CREATE USER 'printer_manager_dba'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dba_pw';
GRANT ALL ON printer_manager.* TO 'printer_manager_dba'@'localhost';

DROP USER IF EXISTS 'printer_manager_user'@'localhost';
CREATE USER 'printer_manager_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user_pw';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON printer_manager.* TO 'printer_manager_user'@'localhost';
