create or REPLACE  FUNCTION change_password(em VARCHAR, old_pass VARCHAR, new_pass varchar)
  returns user_summary
  as $$
  DECLARE
    found_id BIGINT;
  BEGIN
    --found user by id
  END;
  $$ LANGUAGE plpgsql;