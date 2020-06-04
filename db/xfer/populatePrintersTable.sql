-- Database is connected

-- model_name to model_id
-- model_name Canon-MF4360 model_id 1
-- model_name Canon-MF4370dn model_id 2
-- model_name Canon-MG6200 model_id 3
-- model_name Canon-MG6220 model_id 4
-- model_name Dell-2130cn-Color-Laser model_id 5
-- model_name Dell-Laser-Printer-1720dn model_id 6
-- model_name HP-Color-LaserJet-3600 model_id 7
-- model_name HP-LaserJet-P3015 model_id 8
-- model_name HP-LaserJet-Pro-P1606dn model_id 9
-- model_name HP-OfficeJet-6000 model_id 10
-- model_name Lanier-LP127N model_id 11
-- model_name Lexmark-E250dn model_id 12
-- model_name Ricoh-SP3400N model_id 13
-- model_name Ricoh-SP3500N model_id 14
-- model_name Ricoh-SP3600N model_id 15
-- model_name Ricoh-SPC242SF model_id 16
-- model_name Ricoh-SPC252SF model_id 17
-- model_name Xerox-D95 model_id 18
-- model_name Xerox-WC7535 model_id 19

-- model_name to can_snmp_monitor
-- model_name Canon-MF4360 can_snmp_monitor null
-- model_name Canon-MF4370dn can_snmp_monitor null
-- model_name Canon-MG6200 can_snmp_monitor null
-- model_name Canon-MG6220 can_snmp_monitor null
-- model_name Dell-2130cn-Color-Laser can_snmp_monitor null
-- model_name Dell-Laser-Printer-1720dn can_snmp_monitor null
-- model_name HP-Color-LaserJet-3600 can_snmp_monitor null
-- model_name HP-LaserJet-P3015 can_snmp_monitor null
-- model_name HP-LaserJet-Pro-P1606dn can_snmp_monitor null
-- model_name HP-OfficeJet-6000 can_snmp_monitor null
-- model_name Lanier-LP127N can_snmp_monitor null
-- model_name Lexmark-E250dn can_snmp_monitor null
-- model_name Ricoh-SP3400N can_snmp_monitor snmp
-- model_name Ricoh-SP3500N can_snmp_monitor snmp
-- model_name Ricoh-SP3600N can_snmp_monitor snmp
-- model_name Ricoh-SPC242SF can_snmp_monitor snmp
-- model_name Ricoh-SPC252SF can_snmp_monitor snmp
-- model_name Xerox-D95 can_snmp_monitor null
-- model_name Xerox-WC7535 can_snmp_monitor null
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-14-38-4A-23-89", "10.177.200.10", 7, null, "e104", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-12-D4-52", "10.177.200.11", 13, null, "c103", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-12-C5-91", "10.177.200.12", 13, null, "c202", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-00-74-A9-4B-44", "10.177.200.13", 11, null, "c204", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("2C-9E-FC-13-DF-57", "10.177.200.14", 4, null, "c103", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-88-49", "10.177.200.15", 14, null, "e104", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-00-74-A9-4D-B7", "10.177.200.16", 14, "429-2903", "e203", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-76-2B-05", "10.177.200.17", 13, null, "p10", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("9C-93-4E-03-A7-21", "10.177.200.18", 19, null, "Admin-Front-Office", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("08-00-37-B3-FE-EE", "10.177.200.19", 18, null, "b102", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("08-00-37-91-5B-AB", "10.177.200.20", 5, null, "b102", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-12-D4-5B", "10.177.200.22", 13, null, "b204", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-12-D4-6A", "10.177.200.23", 13, "429-0845", "a101", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-1A-8F-0A-0D-6E", "10.177.200.24", 1, "429-0831", "a104", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-12-D7-4F", "10.177.200.25", 13, null, "a202", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-00-74-AE-E1-5B", "10.177.200.26", 11, null, "a201", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("AC-16-2D-CB-00-3A", "10.177.200.27", 9, null, "p4", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-04-00-29-A8-48", "10.177.200.28", 6, null, "p1b", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("68-B5-99-91-C4-B1", "10.177.200.29", 8, null, "e204", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-68-92-A5", "10.177.200.30", 16, null, "SSC", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("2C-9E-FC-14-BB-B0", "10.177.200.31", 3, null, "c104", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-87-0D", "10.177.200.32", 14, null, "c102", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("2C-9E-FC-06-E4-93", "10.177.200.33", 3, null, "e101", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("D8-D3-85-41-73-59", "10.177.200.34", 10, null, "p3", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-04-00-2E-45-27", "10.177.200.35", 12, null, "b202", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-8D-9D", "10.177.200.37", 17, null, "c101", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-88-4C", "10.177.200.38", 14, null, "e202", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-88-4E", "10.177.200.39", 14, null, "e102", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-88-47", "10.177.200.40", 14, "429-2628", "a103", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-88-4B", "10.177.200.41", 14, null, "p1A", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-89-55", "10.177.200.42", 14, null, "p7a", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-53-89-50", "10.177.200.43", 14, null, "p5", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-CA-BB-39", "10.177.200.44", 15, null, "VP", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-1E-8F-F5-30-6C", "10.177.200.45", 2, null, "p2", 0, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-97-BC-E8", "10.177.200.46", 17, null, "ELL", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-75-E4-00", "10.177.200.47", 14, null, "p11", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-86-B5", "10.177.200.48", 14, "429-2906", "aLounge", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-76-38-B6", "10.177.200.50", 14, null, "a204", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-86-BF", "10.177.200.51", 14, null, "b203", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-86-BA", "10.177.200.52", 14, null, "b202", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-76-38-C2", "10.177.200.53", 14, null, "c201", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-76-2B-0A", "10.177.200.54", 14, null, "e103", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-8A-E7", "10.177.200.55", 14, "429-2896", "e105", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-86-B7", "10.177.200.57", 14, null, "a104", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-87-7A", "10.177.200.58", 14, null, "p12", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-97-BB-0B", "10.177.200.59", 17, null, "b101a", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-83-90", "10.177.200.61", 17, null, "p3", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-98-E8", "10.177.200.62", 17, null, "p2", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-8D-9B", "10.177.200.63", 17, null, "c203", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-93-17", "10.177.200.64", 17, null, "a203", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-8E-15", "10.177.200.65", 17, "429-2911", "a102", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-8A-60", "10.177.200.66", 17, null, "p9", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-69-72-A1", "10.177.200.67", 17, null, "b201", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-88-87-81", "10.177.200.68", 14, null, "e201", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-97-8D-6E", "10.177.200.76", 17, "429-3108", "e201", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-98-67-73", "10.177.200.80", 17, null, "p8", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-B2-1F-27", "10.177.200.81", 17, null, "p5", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-98-67-5E", "10.177.200.82", 17, "429-3188", "p4", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-98-67-5F", "10.177.200.83", 17, null, "b104", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-B2-DE-7F", "10.177.200.86", 17, null, "c105", 1, 1);
INSERT INTO printers (mac_address, ip_address, model_id, tag_number, room, is_monitored, is_active) VALUES ("00-26-73-CA-BB-24", "10.177.200.87", 15, "429-3216", "nurse", 1, 1);
