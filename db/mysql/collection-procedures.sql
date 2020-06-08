DROP PROCEDURE IF EXISTS get_snmp_printers;

CREATE PROCEDURE get_snmp_printers()
SELECT p.ip_address,
       p.room,
       m.name AS model_name
FROM printers AS p,
     models AS m
WHERE m.data_collection_method = "snmp" AND
      p.is_monitored = 1 AND
      p.is_active = 1 AND
      m.model_id = p.model_id;


DROP PROCEDURE IF EXISTS add_color_level;


CREATE PROCEDURE add_color_level(
  IN in_ip_address VARCHAR(15),
  IN in_collect_time DATETIME,
  IN in_color ENUM("black", "magenta", "yellow", "cyan"),
  IN in_percent_full INT)
  
INSERT INTO color_levels (printer_id, collect_time, color, percent_full)
VALUES ((SELECT printer_id
          FROM printers
          WHERE ip_address = in_ip_address),
        in_collect_time,
        in_color,
        in_percent_full);
