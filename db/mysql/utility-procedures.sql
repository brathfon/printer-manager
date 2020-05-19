DROP PROCEDURE IF EXISTS insert_log_message;

CREATE PROCEDURE insert_log_message(IN in_user VARCHAR(65), IN in_logging_level VARCHAR(16), IN in_title VARCHAR(64), IN in_json_text VARCHAR(512))
INSERT INTO logs (
  user,
  logging_level,
  title,
  json_text)
VALUES(in_user, in_logging_level, in_title, in_json_text);
