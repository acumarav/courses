SELECT * from membership.users;


create or REPLACE  FUNCTION the_time()
  returns TIMESTAMPTZ
  as $$
    SELECT now();
  $$ LANGUAGE SQL;

SELECT the_time();

drop function the_time();

create or REPLACE FUNCTION  the_time_at(tz VARCHAR) returns TIMESTAMP
  as $$
  select now() at time zone tz;
  $$ LANGUAGE sql;

SELECT the_time_at('HST');

drop FUNCTION  the_time_at(VARCHAR);

create or REPLACE FUNCTION  the_time_at(tz VARCHAR DEFAULT 'HST',
  out TIMESTAMP,
  out TIMESTAMP )
  returns TIMESTAMP
as $$
select now() at time zone tz,
        now() at time ZONE  'PDT';--does not work somewhy...
$$ LANGUAGE sql;

SELECT the_time_at('HST');


create or REPLACE FUNCTION three_hours_from(inout the_time TIMESTAMPTZ) as $$
SELECT  the_time + '3 hours';
$$ LANGUAGE SQL;

select three_hours_from(now())

create or REPLACE  FUNCTION  hi_lo_av(
VARIADIC  nums int[],
  out int,
  out int,
  out NUMERIC
) as $$
SELECT max(nums[i]), min(nums[1]), avg(nums[i]) from generate_subscripts(nums,1) fx(i)
$$ LANGUAGE SQL;

SELECT hi_lo_av(1,2,3,4,5,65,7,8,923);


create or REPLACE FUNCTION  get_user(
email VARCHAR) RETURNS  membership.users
as $$
SELECT * from membership.users where email=email;
$$ LANGUAGE sql;

SELECT * from membership.users;
SELECT * from get_user('alex@test.com');
SELECT  get_user('alex@test.com');

drop FUNCTION all_users();
create or REPLACE FUNCTION all_users()
  returns table(email  VARCHAR(255),member_for INTERVAL, status VARCHAR(20))
as $$
 select email,
   age(now(),created_at) as member_for,
   status
 from membership.users;
  $$ LANGUAGE SQL;

select all_users();