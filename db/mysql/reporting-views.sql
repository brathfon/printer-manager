CREATE OR REPLACE VIEW color_level_statuses AS
SELECT
   p.room,
   p.mac_address,
   p.ip_address,
   ccl.collect_time,
   ccl.color,
   ccl.percent_full,
   m.name
FROM current_color_levels ccl, printers p, models m
WHERE ccl.printer_id = p.printer_id AND
      p.model_id = m.model_id
ORDER BY p.room, p.mac_address, ccl.collect_time, ccl.color;