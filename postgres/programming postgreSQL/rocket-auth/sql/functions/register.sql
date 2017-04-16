CREATE OR REPLACE FUNCTION register(new_email VARCHAR, password VARCHAR)
  RETURNS TABLE(
  new_id BIGINT,
  validation_token VARCHAR (36),
  success BOOLEAN,
  MESSAGE VARCHAR(255)
) AS $$
DECLARE
BEGIN
  set search_path=membership;
  if not exists
    (select users.email from users where users.email = new_email)
    then
    insert into users(email, hashed_password)
    values(new_email, crypt(password, gen_salt('bf',10)))
    returning id into new_id;

    validation_token := random_string(36);
    success := true;
    message := 'Welcome!';
    else
      success := false;
    select 'This email is already registered' into message;
  end if;
    return query
    select new_id, validation_token, success, message;
    END;
$$ LANGUAGE plpgsql;