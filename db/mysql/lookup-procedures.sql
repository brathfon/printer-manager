
DROP PROCEDURE IF EXISTS get_roles;

CREATE PROCEDURE get_roles()
SELECT
  role_id,
  abrv,
  long_name 
FROM roles;
