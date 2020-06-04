-- get the last set of color levels for each printer regardless if active or not
-- probably should not use this one directly since it has inactive printers in it
CREATE OR REPLACE VIEW all_current_color_levels AS
SELECT
   a.printer_id,
   a.collect_time,
   a.color,
   a.percent_full
FROM color_levels a
     INNER JOIN
     ( SELECT printer_id, MAX(collect_time) max_collect_time
       FROM color_levels GROUP BY printer_id
     ) b ON a.printer_id = b.printer_id AND
            a.collect_time = b.max_collect_time
ORDER BY a.printer_id, a.collect_time, a.color, a.percent_full;


-- get last set of color levels for each ACTIVE printer
CREATE OR REPLACE VIEW current_color_levels AS
SELECT a.printer_id,
       a.collect_time,
       a.color,
       a.percent_full
FROM all_current_color_levels AS a, printers AS p
WHERE a.printer_id = p.printer_id AND
      p.is_active = 1;


