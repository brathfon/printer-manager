
DROP PROCEDURE IF EXISTS get_example_data;

CREATE PROCEDURE get_example_data()

SELECT
  example_id,
  col_1,
  the_date,
  the_time,
  comments  
FROM example_data;
