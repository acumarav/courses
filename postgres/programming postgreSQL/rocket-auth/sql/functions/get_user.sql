CREATE OR REPLACE FUNCTION get_user(em VARCHAR)
  RETURNS TABLE(
    id BIGINT,
    email        VARCHAR(255),
    status       VARCHAR(25),
    member_for   INTERVAL,
    display_name VARCHAR(100)
  )
AS $$
DECLARE
  dname VARCHAR(255);
  found_user membership.users;
  member_for INTERVAL;
  return_status VARCHAR(25);
BEGIN
  set search_path=membership;
  if exists(SELECT users.id FROM users
            WHERE users.email = em) then
  SELECT *
  FROM users
  INTO found_user;
    if(found_user.first is not null) then
      select concat(found_user.first, ' ',found_user.last) into dname;
    else
      SELECT found_user.email into dname;
    end if;
  SELECT age(now(),found_user.created_at) into member_for;
  end if;
  return QUERY
  SELECT found_user.id, found_user.email, found_user.status,member_for,dname;

END;
$$ LANGUAGE plpgsql;