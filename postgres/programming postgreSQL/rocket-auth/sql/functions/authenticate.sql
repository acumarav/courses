CREATE OR REPLACE FUNCTION authenticate(key VARCHAR, token VARCHAR, prov VARCHAR DEFAULT 'local')
  RETURNS TABLE(
    return_id           BIGINT,
    email        VARCHAR(255),
    display_name VARCHAR(50),
    success      BOOLEAN,
    message      VARCHAR(50)
  ) AS $$
DECLARE
  found_user     membership.users;
  return_message VARCHAR(50);
  success        BOOLEAN := false;
  found_id       BIGINT;
BEGIN
  SET SEARCH_PATH = membership;
  if(prov = 'local') then
      --find the user by token/provider and key
      SELECT user_id FROM logins
      WHERE provider = prov AND provider_key = key AND provider_token = crypt(token, provider_token )
      INTO found_id;
    ELSE
      --find the user by token/provider and key
      SELECT user_id FROM logins
      WHERE provider = prov AND provider_key = key AND provider_token = token
      INTO found_id;
  END IF;


  IF (found_id IS NOT NULL)
  THEN
    SELECT * FROM users
    WHERE users.id = found_id
    INTO found_user;
    INSERT INTO logs (user_id, subject, entry)
    VALUES (found_id, 'Authentication', 'Logged user in using ' || prov);
    --set last login
    UPDATE users
    SET last_login = now(), login_count = login_count + 1
    WHERE users.id = found_id;
    --set the display name
    IF (found_user.first IS NOT NULL)
    THEN
      display_name := concat(found_user.first, ' ', found_user.last);
    ELSE
      display_name := found_user.email;
    END IF;
    success := TRUE;
    return_message := "Welcome! " || display_name;
    --
  ELSE
    success := FALSE;
    return_message := "Invalid login credentials";
  END IF;
  return query select found_id, found_user.email, display_name, success, return_message;
END;
$$ LANGUAGE plpgsql;


--CREATE OR REPLACE FUNCTION authenticate(em VARCHAR, pass VARCHAR)
--  RETURNS TABLE(
--    return_id           BIGINT,
--    email        VARCHAR(255),
--    display_name VARCHAR(50),
--    success      BOOLEAN,
--    message      VARCHAR(50)
--  ) AS $$
--DECLARE
--  hashed_pw VARCHAR(128);
--BEGIN
--  SET SEARCH_PATH = membership;
--  hashed_pw = crypt(pass, gen_salt('bf', 10));
--  RETURN QUERY
--  SELECT *
--  FROM authenticate(em, hashed_pw, 'local');
--END;
--$$ LANGUAGE plpgsql;
