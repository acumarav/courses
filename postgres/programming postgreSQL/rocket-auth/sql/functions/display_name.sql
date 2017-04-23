create or REPLACE  FUNCTION  display_name(u users)
  RETURNS VARCHAR(255)
  AS $$
  DECLARE
  dname VARCHAR(100);
  BEGIN
  if(u.first is not null) then
    select concat(u.first, ' ',u.last) into dname;
  else
    SELECT u.email into dname;
  end if;
  RETURN dname;
  END;
  $$ LANGUAGE plpgsql;
