create or REPLACE FUNCTION random_string(len int DEFAULT 36)
  returns text
  as $$
  select
    substring(md5(random()::text),0,len+1);
  $$ LANGUAGE sql;