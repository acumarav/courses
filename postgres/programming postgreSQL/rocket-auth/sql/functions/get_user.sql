CREATE OR REPLACE FUNCTION get_user(em VARCHAR)
  RETURNS user_summary
AS $$
DECLARE
  dname VARCHAR(255);
  found_user membership.users;
  member_for INTERVAL;
  can_login BOOLEAN;
  is_admin BOOLEAN;
  return_status VARCHAR(25);
  user_key VARCHAR(18);
  profile jsonb;
  json_logs jsonb;
  json_notes jsonb;
  user_status membership.status;
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
  select name from status where id = found_user.status_id into return_status;

  select * from status where id=found_user.status_id into user_status;
  can_login := user_status.can_login;
  return_status := user_status.name;
  is_admin := (user_status.id=10);
  select json_agg(x) into json_logs from (select * from logs where logs.user_id = found_user.id) x;
  select json_agg(y) into json_notes from (select * from notes where notes.user_id = found_user.id) y;

  end if;
  return (found_user.id, found_user.email, return_status,
   can_login, is_admin, dname,
   found_user.user_key, found_user.validation_token, member_for,found_user.profile,
  json_logs, json_notes)::user_summary ;


END;
$$ LANGUAGE plpgsql;