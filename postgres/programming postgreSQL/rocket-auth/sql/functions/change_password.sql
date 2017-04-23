create or REPLACE  FUNCTION change_password(em VARCHAR, old_pass VARCHAR, new_pass varchar)
  returns user_summary
  as $$
  DECLARE
    found_id BIGINT;
  BEGIN
    --found user by id
    select locate_user_by_password(em, old_pass) into found_id;
    if found_id is not null then
      update logins set provider_token = crypt(new_pass, gen_salt('bf',10))
      where user_id = found_id and provider = 'local';

      insert into logs(user_id, subject, entry)
        VALUES (found_id,'Authentication','Password changed');

      --add note
      insert into notes(user_id, note)
          values(found_id,'Successfully changed password');
      else

    END IF;
    return get_user(em);
  END;
  $$ LANGUAGE plpgsql;