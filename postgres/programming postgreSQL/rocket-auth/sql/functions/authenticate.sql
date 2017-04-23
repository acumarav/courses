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
  can_login BOOLEAN := FALSE;
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
    SELECT * FROM users WHERE users.id = found_id INTO found_user;
    SELECT status.can_login from status where id=found_user.status_id into can_login;

    if(can_login) then
      INSERT INTO logs (user_id, subject, entry)
      VALUES (found_id, 'Authentication', 'Logged user in using ' || prov);
      --set last login
      UPDATE users
      SET last_login = now(), login_count = login_count + 1
      WHERE users.id = found_id;
      --set the display name
      display_name := display_name(found_user);
      success := TRUE;
      return_message := 'Welcome! '|| display_name;
      ELSE
        --log failed attempt
        insert into logs(user_id, subject, entry)
        values(found_id, 'Authentication', 'User tried to login, is locked out');

        success := false;
        return_message := 'This user is currently locked out';
      END IF;
  ELSE
    success := FALSE;
    return_message := 'Invalid login credentials';
  END IF;
  return query select found_id, found_user.email, display_name, success, return_message;
END;
$$ LANGUAGE plpgsql;

create or replace function authenticate_by_token(token varchar)
  returns table(
    return_id bigint,
    email varchar(255),
    display_name varchar(50),
    success boolean,
    message varchar(50)
  ) as $$
begin
  return query
  select * from authenticate('token',token,'token');
end;
$$
language plpgsql;


