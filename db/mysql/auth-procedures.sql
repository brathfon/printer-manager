DROP PROCEDURE IF EXISTS set_password;

delimiter //

CREATE PROCEDURE set_password(IN curr_user_id INT,IN curr_salt CHAR(32),IN curr_hash CHAR(128))
BEGIN

  DECLARE exit handler FOR sqlexception
  BEGIN
    SHOW ERRORS;
    ROLLBACK;
  END;

  START TRANSACTION;
  UPDATE users SET
    salt = curr_salt,
    hash = curr_hash
  WHERE user_id = curr_user_id;

  SELECT
    w.user_id,
    w.first_name,
    w.last_name,
    w.salt,
    w.hash,
    wr.role_id
  FROM users w,
       user_roles wr
  WHERE w.user_id = curr_user_id and
        w.user_id = wr.user_id and
        w.active    = 1;
  COMMIT;
END//

delimiter ;

DROP PROCEDURE IF EXISTS login;
delimiter //
CREATE PROCEDURE login(IN the_email varchar(64))
BEGIN
  SELECT
    w.user_id,
    w.first_name,
    w.last_name,
    w.salt,
    w.hash,
    wr.role_id
  FROM users w,
    user_roles wr
    WHERE w.user_id = wr.user_id AND
          w.active    = 1 AND
          w.email     = the_email;
END//

delimiter ;

DROP PROCEDURE IF EXISTS create_new_user;
delimiter //
CREATE PROCEDURE create_new_user(
  IN new_first_name varchar(32),
  IN new_last_name varchar(32),
  IN new_initials varchar(3),
  IN new_email varchar(64),
  IN new_phone_number varchar(32),
  IN new_salt char(32),
  IN new_hash char(128))
BEGIN

  INSERT INTO users(
    first_name,
    last_name,
    initials,
    email,
    phone_number,
    salt,
    hash)
  VALUES (
    new_first_name,
    new_last_name,
    new_initials,
    new_email,
    new_phone_number,
    new_salt,
    new_hash);

    -- according to documentation, this is safe because it is the last
    -- generated id on this connection.
    SELECT LAST_INSERT_ID() as new_user_id;
END//

delimiter ;
